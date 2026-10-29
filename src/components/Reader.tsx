import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "./ui";

interface Props { url: string | null; title: string; entryId: string; }

const CACHE_PREFIX = "reader-cache:";

export default function Reader({ url, title, entryId }: Props) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // load cached text on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_PREFIX + entryId);
      if (cached) setText(cached);
    } catch {}
  }, [entryId]);

  const load = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://r.jina.ai/" + url, { headers: { "Accept": "text/plain" } });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const t = await res.text();
      if (!t || t.length < 50) throw new Error("No readable text returned.");
      setText(t);
      try { localStorage.setItem(CACHE_PREFIX + entryId, t); } catch {}
    } catch (e: any) {
      setError((e && e.message) ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    try { localStorage.removeItem(CACHE_PREFIX + entryId); } catch {}
    setText(null);
    setError(null);
  };

  const matchCount = useMemo(() => {
    if (!text || !activeQuery) return 0;
    const re = new RegExp(escapeRegex(activeQuery), "gi");
    return (text.match(re) || []).length;
  }, [text, activeQuery]);

  const renderText = useMemo(() => {
    if (!text) return null;
    const paragraphs = text.split(/\n{2,}/);
    if (!activeQuery) {
      return paragraphs.map((p, i) => (
        <p key={i} style={{ whiteSpace: "pre-wrap", marginBottom: 10, lineHeight: 1.6 }}>{p}</p>
      ));
    }
    const re = new RegExp("(" + escapeRegex(activeQuery) + ")", "gi");
    return paragraphs.map((p, i) => {
      const parts = p.split(re);
      return (
        <p key={i} style={{ whiteSpace: "pre-wrap", marginBottom: 10, lineHeight: 1.6 }}>
          {parts.map((part, j) => {
            if (j % 2 === 1) return <mark key={j} style={{ background: "#fde047", color: "#17202a", padding: "0 2px", borderRadius: 2 }}>{part}</mark>;
            return <React.Fragment key={j}>{part}</React.Fragment>;
          })}
        </p>
      );
    });
  }, [text, activeQuery]);

  if (!url) {
    return (
      <div className="empty">
        <div className="empty-title">No online source</div>
        <p className="empty-body">No link is recorded for this entry.</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", background: "var(--white)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "var(--mist)", flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--ink-muted)", flex: 1, minWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
        <form onSubmit={(e) => { e.preventDefault(); setActiveQuery(query.trim()); }} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find in document…" style={{ width: 180, padding: "4px 8px", fontSize: 12 }} />
          <Button type="submit" variant="ghost" size="sm">Find</Button>
          {activeQuery && <span style={{ fontSize: 11, color: "var(--ink-muted)" }}>{matchCount} match{matchCount === 1 ? "" : "es"}</span>}
          {activeQuery && <Button onClick={() => { setQuery(""); setActiveQuery(""); }} variant="ghost" size="sm">Clear</Button>}
        </form>
        <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "var(--teal-dark)", textDecoration: "none" }}>Open in new tab ↗</a>
      </div>

      {!text && !loading && !error && (
        <div style={{ padding: 24, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 12 }}>
            Load the full text of this judgment to read and search it here (no new tab).
          </p>
          <Button onClick={load} variant="primary" size="sm">Load full text</Button>
        </div>
      )}

      {loading && (
        <div style={{ padding: 24, textAlign: "center", color: "var(--ink-muted)", fontSize: 13 }}>Loading full text…</div>
      )}

      {error && (
        <div style={{ padding: 24, textAlign: "center", color: "var(--red)", fontSize: 13 }}>
          {error}. <a href={url} target="_blank" rel="noreferrer" style={{ color: "var(--teal-dark)" }}>Open on source site ↗</a>
        </div>
      )}

      {text && (
        <div ref={containerRef} style={{ padding: "16px 20px", maxHeight: "70vh", overflow: "auto", fontSize: 13, lineHeight: 1.6, color: "var(--ink)" }}>
          {renderText}
          <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <Button onClick={clearCache} variant="ghost" size="sm">Clear cached text</Button>
            <span style={{ fontSize: 11, color: "var(--ink-faint)", alignSelf: "center" }}>Text fetched from the source and cached locally.</span>
          </div>
        </div>
      )}
    </div>
  );
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
