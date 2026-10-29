import React, { useState } from "react";
import { useApp } from "../../store";
import { SectionHeader, Button, Card, EmptyState, Badge, Stat } from "../ui";
import { compareStyle } from "../../lib/style";
import { exportDocx, exportPdf, downloadBlob } from "../../lib/export";
import { competitionById } from "../../data/competitions";

export default function MemorialTab() {
  const { state, generateMemorial, setActiveMemorial, deleteMemorial } = useApp();
  const [exporting, setExporting] = useState(false);
  const active = state.memorials.find((m) => m.id === state.activeMemorialId) ?? state.memorials[0];

  const onGenerate = () => {
    if (!state.parsed) return;
    generateMemorial();
  };

  const onExportDocx = async () => {
    if (!active) return;
    setExporting(true);
    try {
      const blob = await exportDocx(active);
      downloadBlob(blob, `${active.title.replace(/[^a-z0-9]+/gi, "_")}_memorial.docx`);
    } finally {
      setExporting(false);
    }
  };
  const onExportPdf = () => {
    if (!active) return;
    exportPdf(active);
  };

  const profile = state.styleProfiles.find((p) => p.id === active?.styleProfileId) ?? state.styleProfiles.find((p) => p.id === state.activeStyleId) ?? null;
  const gaps = active && profile ? compareStyle(active.sections.map((s) => s.blocks.map((b) => b.text).join(" ")).join(" "), profile) : null;

  return (
    <div>
      <SectionHeader eyebrow="Memorial Drafter" title="Multi-tier IRAC / CRAC submissions" body="Generates a structured, persuasive memorial with nested headings, propositions, fact integration, distinguishing of adverse authority and fallback arguments. Includes an automated table of contents and index of authorities, grouped by instrument hierarchy." />

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <Button onClick={onGenerate} variant="primary" disabled={!state.parsed}>
          Generate memorial
        </Button>
        {active && (
          <>
            <Button onClick={onExportDocx} variant="brass" disabled={exporting}>{exporting ? "Exporting…" : "Export .docx"}</Button>
            <Button onClick={onExportPdf} variant="ghost">Export PDF</Button>
          </>
        )}
        {!state.parsed && <span style={{ fontSize: 12, color: "var(--ink-400)" }}>Parse a compromis first (Setup tab).</span>}
      </div>

      {state.memorials.length > 0 && (
        <Card title="Saved memorials" subtitle="Up to 12 retained locally." style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {state.memorials.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMemorial(m.id)}
                className={`btn btn-sm ${active?.id === m.id ? "btn-primary" : "btn-ghost"}`}
              >
                {m.side === "applicant" ? "App" : "Resp"} · {m.wordCount}w · {new Date(m.generatedAt).toLocaleTimeString()}
              </button>
            ))}
            {active && (
              <Button onClick={() => deleteMemorial(active.id)} variant="danger" size="sm">Delete</Button>
            )}
          </div>
        </Card>
      )}

      {active ? (
        <>
          <div className="grid-4" style={{ marginBottom: 16 }}>
            <Stat label="Word count" value={active.wordCount.toLocaleString()} hint={`Limit ${competitionById(active.competition).wordLimit.toLocaleString()}`} />
            <Stat label="Sections" value={active.sections.length} />
            <Stat label="Authorities" value={active.authorities.reduce((a, g) => a + g.entries.length, 0)} />
            <Stat label="Style" value={active.styleProfileId ? "Cloned" : "Default"} />
          </div>

          {gaps && (
            <Card title="Style gap analysis" subtitle={`Compared to ${profile?.name}.`} style={{ marginBottom: 16 }}>
              <div style={{ display: "grid", gap: 6 }}>
                {gaps.map((g, i) => (
                  <div key={i} className="bar-row">
                    <span>{g.metric}</span>
                    <div className="bar"><span style={{ width: `${Math.min(100, (g.draft / Math.max(1, g.target)) * 60)}%` }} /></div>
                    <span>{g.draft}/{g.target}</span>
                  </div>
                ))}
              </div>
              <details style={{ marginTop: 10 }}>
                <summary style={{ cursor: "pointer", color: "var(--brass-400)", fontSize: 12.5 }}>Advice</summary>
                <ul style={{ marginTop: 8, paddingLeft: 18, fontSize: 12.5, color: "var(--ink-300)", lineHeight: 1.55 }}>
                  {gaps.map((g, i) => <li key={i}><b>{g.metric}:</b> {g.advice}</li>)}
                </ul>
              </details>
            </Card>
          )}

          <div className="paper">
            {active.sections.map((s) => (
              <div key={s.id}>
                {s.blocks.map((b, i) => {
                  if (b.kind === "title") return <div key={i} className="t-title">{b.text}</div>;
                  if (b.kind === "subtitle") return <div key={i} className="t-sub">{b.text}</div>;
                  if (b.kind === "h1") return <div key={i} className="h1">{b.text}</div>;
                  if (b.kind === "h2") return <div key={i} className="h2">{b.text}</div>;
                  if (b.kind === "h3") return <div key={i} className="h2" style={{ fontStyle: "italic" }}>{b.text}</div>;
                  if (b.kind === "meta") return <div key={i} className="t-meta">{b.text}</div>;
                  if (b.kind === "quote") return <div key={i} className="quote">{b.text}</div>;
                  return <div key={i} className="para">{b.text}{b.cite && <span className="cite"> ({b.cite})</span>}</div>;
                })}
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyState title="No memorial generated yet" body="Generate a memorial from a parsed compromis. It will appear here as a formatted paper preview, ready to export to .docx or PDF." />
      )}
    </div>
  );
}
