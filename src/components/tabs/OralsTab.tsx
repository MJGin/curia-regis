import React from "react";
import { useApp } from "../../store";
import { SectionHeader, Button, Card, EmptyState } from "../ui";
import { PERSONA_LABEL } from "../../lib/orals";

export default function OralsTab() {
  const { state, setPersona, setOralIssueIndices, generateOrals } = useApp();
  const o = state.orals;

  return (
    <div>
      <SectionHeader eyebrow="Oralist Persona" title="Timed appearance scripts and rebuttal matrix" body="Choose a persona, generate a timed roadmap with bracketed oral cues, and a quick-fire rebuttal matrix targeting typical opposing concessions." />

      <Card title="Persona selector" style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {(["textualist", "diplomat", "commander"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPersona(p)}
              className={`btn ${state.persona === p ? "btn-primary" : "btn-ghost"}`}
              style={{ flexDirection: "column", alignItems: "flex-start", padding: 14 }}
            >
              <span style={{ fontFamily: "Playfair Display, serif", fontSize: 15 }}>{PERSONA_LABEL[p]}</span>
              <span style={{ fontSize: 11.5, opacity: 0.8, marginTop: 4, textAlign: "left" }}>
                {p === "textualist" && "Anchors to strict statutory and treaty definitions; impervious to hostile policy hypotheticals."}
                {p === "diplomat" && "Masters judicial rapport, graceful concessions and seamless pivots."}
                {p === "commander" && "Passionate constitutional and systemic-justice advocate."}
              </span>
            </button>
          ))}
        </div>
        {state.parsed && state.parsed.issues.length > 0 && (
          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 6, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Tackle which issues?</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {state.parsed.issues.map((iss, i) => {
                const selected = state.oralIssueIndices.length === 0 || state.oralIssueIndices.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      const cur = state.oralIssueIndices.length ? [...state.oralIssueIndices] : state.parsed!.issues.map((_, j) => j);
                      const next = selected ? cur.filter((x) => x !== i) : [...cur, i];
                      // if all selected, store empty (means all)
                      const all = state.parsed!.issues.map((_, j) => j);
                      const isAll = next.length === all.length;
                      setOralIssueIndices(isAll ? [] : next);
                    }}
                    className={`btn btn-sm ${selected ? "btn-primary" : "btn-ghost"}`}
                  >
                    Issue {i + 1}{selected ? " ✓" : ""}
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: 11.5, color: "var(--ink-faint)", marginTop: 6, marginBottom: 0 }}>
              {state.oralIssueIndices.length === 0 ? "All issues selected." : `Selected: ${state.oralIssueIndices.map((i) => i + 1).join(", ")}.`}
            </p>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button onClick={generateOrals} variant="primary" disabled={!state.parsed}>Generate oral script</Button>
          {!state.parsed && <span style={{ fontSize: 12, color: "var(--ink-400)" }}>Parse a compromis first.</span>}
        </div>
      </Card>

      {o ? (
        <>
          <Card title={`Oral script — ${PERSONA_LABEL[o.persona]}`} subtitle={`Total ${o.totalMinutes} minutes.`} style={{ marginBottom: 16 }}>
            {o.segments.map((seg, i) => (
              <div key={i} className="segment">
                <div className="segment-head">
                  <span className="segment-label">{seg.label}</span>
                  <span className="segment-time">{seg.minutes} min · {seg.kind}</span>
                </div>
                {seg.text.map((t, j) => <p key={j}>{t}</p>)}
                {seg.cue && <div className="cue">{seg.cue}</div>}
              </div>
            ))}
          </Card>

          <Card title="Rebuttal and sur-rebuttal matrix">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid var(--border)", color: "var(--brass-400)" }}>Opposing concession</th>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid var(--border)", color: "var(--brass-400)" }}>Quick response</th>
                  <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid var(--border)", color: "var(--brass-400)" }}>Authority</th>
                </tr>
              </thead>
              <tbody>
                {o.rebuttals.map((r, i) => (
                  <tr key={i}>
                    <td style={{ padding: 8, verticalAlign: "top" }}>{r.concession}</td>
                    <td style={{ padding: 8, verticalAlign: "top" }}>{r.response}</td>
                    <td style={{ padding: 8, verticalAlign: "top", color: "var(--brass-400)", fontSize: 12 }}>{r.authority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </>
      ) : (
        <EmptyState title="No oral script generated yet" body="Select a persona and generate a script from a parsed compromis." />
      )}
    </div>
  );
}
