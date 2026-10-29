import React, { useMemo, useState } from "react";
import { useApp } from "../../store";
import { SectionHeader, Button, Card, EmptyState, Badge } from "../ui";
import { competitionById } from "../../data/competitions";
import { matchAuthorities, stressTest, classifyStatus } from "../../data/authorities";
import { RESOURCES } from "../../data/resources";
import { issueTags } from "../../data/authorities";

export default function AuthoritiesTab() {
  const { state } = useApp();
  const comp = competitionById(state.competition);
  const [issueIdx, setIssueIdx] = useState(0);
  const [libFilter, setLibFilter] = useState<"all" | "competition" | "type">("competition");
  const [libType, setLibType] = useState<string>("all");

  const issues = state.parsed?.issues ?? [];
  const currentIssue = issues[issueIdx] ?? "Whether the impugned conduct is lawful.";
  const matched = useMemo(() => matchAuthorities(currentIssue, state.competition, state.side, 8), [currentIssue, state.competition, state.side]);
  const stress = useMemo(() => stressTest(matched, state.competition), [matched, state.competition]);
  const tags = useMemo(() => issueTags(currentIssue, state.competition), [currentIssue, state.competition]);

  const filteredResources = useMemo(() => {
    return RESOURCES.filter((r) => {
      if (libFilter === "competition") {
        if (r.competitions !== "all" && !r.competitions.includes(state.competition)) return false;
      }
      if (libType !== "all" && r.kind !== libType) return false;
      return true;
    });
  }, [libFilter, libType, state.competition]);

  return (
    <div>
      <SectionHeader eyebrow="Authority Matrix" title="Dual-jurisdiction synthesis and stress-testing" body="Kenyan jurisprudence as binding, English common law as persuasive under section 3 of the Judicature Act (Cap 8), and international, WTO and African authority as contextual. Each authority is labelled Binding, Persuasive or Distinguishable, with a fallback argument if the primary case is rejected." />

      {issues.length > 0 && (
        <Card title="Issue selector" subtitle="Authorities are matched to the selected issue." style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {issues.map((iss, i) => (
              <button key={i} className={`btn btn-sm ${i === issueIdx ? "btn-primary" : "btn-ghost"}`} onClick={() => setIssueIdx(i)}>
                {iss.length > 46 ? iss.slice(0, 46) + "…" : iss}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-400)" }}>
            Tags: {tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
          </div>
        </Card>
      )}

      <div className="grid-2">
        <Card title="Matched authorities" subtitle={`${matched.length} authorities for the ${state.side}.`}>
          {matched.length === 0 ? (
            <EmptyState title="No authorities matched" body="Adjust the issue text or competition mode." />
          ) : (
            matched.map((m) => (
              <div key={m.authority.id} className="auth-card">
                <div className="auth-title">{m.authority.title}</div>
                <div className="auth-cite">{m.authority.citation} · {m.authority.court} ({m.authority.year})</div>
                <div className="auth-principle">{m.authority.principle}</div>
                <div className="auth-meta">
                  <Badge tone={m.status.startsWith("Binding") ? "good" : m.status.startsWith("Authoritative") ? "good" : m.status.startsWith("Persuasive") ? "warn" : "neutral"}>{m.status}</Badge>
                  {m.adverse && <Badge tone="danger">Adverse</Badge>}
                  {m.authority.sourceUrl && (
                    <a className="auth-link" href={m.authority.sourceUrl} target="_blank" rel="noreferrer">source ↗</a>
                  )}
                </div>
              </div>
            ))
          )}
        </Card>

        <Card title="Authority stress-tester" subtitle="Fallback argument if the primary authority is rejected.">
          {stress.length === 0 ? (
            <EmptyState title="Nothing to stress-test" body="Match authorities first." />
          ) : (
            stress.map((s) => (
              <div key={s.primary.authority.id} className="auth-card">
                <div className="auth-title">{s.primary.authority.title}</div>
                <div className="auth-cite">{s.distinguish}</div>
                {s.fallback && (
                  <div style={{ marginTop: 8, fontSize: 12, color: "var(--ink-300)" }}>
                    <b>Fallback:</b> {s.fallback.authority.title} ({s.fallback.authority.citation}) — {s.fallback.authority.principle}
                  </div>
                )}
              </div>
            ))
          )}
        </Card>
      </div>

      <Card title="Legal resource library" subtitle="Statutes, treaties, rules, guidance and databases, filtered by competition." style={{ marginTop: 20 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <Button onClick={() => setLibFilter("competition")} variant={libFilter === "competition" ? "primary" : "ghost"} size="sm">This competition</Button>
          <Button onClick={() => setLibFilter("all")} variant={libFilter === "all" ? "primary" : "ghost"} size="sm">All</Button>
          <select value={libType} onChange={(e) => setLibType(e.target.value)} style={{ marginLeft: "auto" }}>
            <option value="all">All types</option>
            {["constitution", "statute", "regulation", "rules", "treaty", "guidance", "competition", "citation", "database", "secondary"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
          {filteredResources.map((r) => (
            <div key={r.id} className="auth-card" style={{ marginBottom: 0 }}>
              <div className="auth-title">{r.title}</div>
              <div className="auth-cite">{r.citation} · {r.jurisdiction}</div>
              <div className="auth-principle">{r.note}</div>
              {r.provisions && (
                <div style={{ marginTop: 6, fontSize: 11, color: "var(--ink-400)" }}>
                  {r.provisions.join(" · ")}
                </div>
              )}
              <div className="auth-meta">
                <Badge tone="neutral">{r.kind}</Badge>
                {r.official && <Badge tone="good">official</Badge>}
                {r.url && <a className="auth-link" href={r.url} target="_blank" rel="noreferrer">open ↗</a>}
              </div>
            </div>
          ))}
        </div>
        {filteredResources.length === 0 && <EmptyState title="No resources" body="Adjust the filters." />}
      </Card>
    </div>
  );
}
