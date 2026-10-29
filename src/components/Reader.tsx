import React, { useState } from "react";
import { Button } from "./ui";

export default function Reader({ url, title }: { url: string | null; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!url) {
    return (
      <div className="empty">
        <div className="empty-title">No online source</div>
        <p className="empty-body">No link is recorded for this entry. Search for it on Kenya Law or the relevant database.</p>
      </div>
    );
  }

  const isPdf = /\.pdf($|\?)/i.test(url) || /\/source($|\?)/i.test(url);

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", background: "var(--white)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "var(--mist)", flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--ink-muted)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
        <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>
          {isPdf ? "PDF — use the viewer's Find (Ctrl+F / Cmd+F) to search and highlight." : "Document — use Ctrl+F / Cmd+F inside the reader to search."}
        </span>
        <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "var(--teal-dark)", textDecoration: "none" }}>Open in new tab ↗</a>
      </div>
      {!loaded && !error && (
        <div style={{ padding: 24, textAlign: "center", color: "var(--ink-muted)", fontSize: 13 }}>Loading document…</div>
      )}
      {error && (
        <div style={{ padding: 24, textAlign: "center", color: "var(--red)", fontSize: 13 }}>
          Could not load the document inline. <a href={url} target="_blank" rel="noreferrer" style={{ color: "var(--teal-dark)" }}>Open it in a new tab ↗</a>
        </div>
      )}
      <iframe
        src={url}
        title={title}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ width: "100%", height: "72vh", border: "none", display: loaded ? "block" : "none" }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
    </div>
  );
}
