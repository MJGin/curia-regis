import React, { useState, useRef } from "react";
import { useApp } from "../../store";
import { SAMPLE_COMPROMISES } from "../../data/samples";
import { competitionById } from "../../data/competitions";
import { SectionHeader, Button, Card, EmptyState, Badge } from "../ui";
import { extractTextFromFile } from "../../lib/text";
import { detectCompetition } from "../../data/competitions";

export default function SetupTab() {
  const { state, setCompetition, setCustom, setSide, setCounsel, setCompromisText, parseNow, runAnalysis, runPipeline, generateMemorialBoth, generateOralsBoth } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const comp = competitionById(state.competition);
  const [sampleId, setSampleId] = useState(SAMPLE_COMPROMISES[0].id);

  const loadSample = () => {
    const s = SAMPLE_COMPROMISES.find((x) => x.id === sampleId);
    if (s) {
      setCompromisText(s.text);
      setCompetition(s.competition);
    }
  };

  const onUpload = async (f: File) => {
    setUploadStatus("Reading " + f.name + "…");
    try {
      const t = await extractTextFromFile(f);
      if (!t || !t.trim()) {
        setUploadStatus("No text found in " + f.name + ". It may be a scanned/image PDF. Paste the text instead.");
        return;
      }
      setCompromisText(t);
      setCompetition(detectCompetition(t));
      setUploadStatus("Loaded " + t.trim().split(/\s+/).length + " words from " + f.name + ".");
    } catch (e: any) {
      setUploadStatus("Could not read " + f.name + ": " + (e?.message ?? "unknown error") + ". Paste the text instead.");
    }
  };

  return (
    <div>
      <SectionHeader eyebrow="Start" title="Upload your fact pattern and generate everything" body="One upload. One click. Memorials for both sides, oral scripts, bench questions, and the authority matrix — all built on your uploaded benchmarks as the standard." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {["1. Upload or paste your moot question", "2. Pick the moot type (auto-detected)", "3. Click Run full pipeline"].map((t, i) => (
          <div key={i} style={{ padding: 12, background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 13, color: "var(--ink-soft)", textAlign: "center" }}>{t}</div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <Card title="Competition parameters" subtitle="The selector in the top bar drives everything below.">
          <div style={{ display: "grid", gap: 10 }}>
            <div className="stat"><div className="stat-value" style={{ fontSize: 16 }}>{comp.forum}</div><div className="stat-label">Forum</div></div>
            <div className="stat"><div className="stat-value" style={{ fontSize: 16 }}>{comp.citationStandard}</div><div className="stat-label">Citation standard</div></div>
            <div className="stat"><div className="stat-value" style={{ fontSize: 16 }}>{comp.wordLimit.toLocaleString()}</div><div className="stat-label">Word limit</div></div>
            <div className="stat"><div className="stat-value" style={{ fontSize: 16 }}>{comp.oralPlan.reduce((a, b) => a + b.minutes, 0)} min</div><div className="stat-label">Oral time</div></div>
          </div>
          {state.competition === "custom" && (
            <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
              <label className="field"><span className="field-label">Forum</span><input value={state.custom.forum} onChange={(e) => setCustom({ ...state.custom, forum: e.target.value })} /></label>
              <label className="field"><span className="field-label">Governing law</span><input value={state.custom.law} onChange={(e) => setCustom({ ...state.custom, law: e.target.value })} /></label>
              <label className="field"><span className="field-label">Citation standard</span><input value={state.custom.citation} onChange={(e) => setCustom({ ...state.custom, citation: e.target.value })} /></label>
              <label className="field"><span className="field-label">Word limit</span><input type="number" value={state.custom.wordLimit} onChange={(e) => setCustom({ ...state.custom, wordLimit: Number(e.target.value) })} /></label>
            </div>
          )}
        </Card>

        <Card title="Your side and counsel" subtitle="Set once; applies to memorials and oral scripts.">
          <div style={{ display: "grid", gap: 12 }}>
            <div className="field">
              <span className="field-label">Side</span>
              <select value={state.side} onChange={(e) => setSide(e.target.value as any)}>
                <option value="applicant">Applicant / Petitioner / Complainant</option>
                <option value="respondent">Respondent</option>
              </select>
            </div>
            <div className="field">
              <span className="field-label">Counsel line</span>
              <input value={state.counsel} onChange={(e) => setCounsel(e.target.value)} />
            </div>
            <div className="field">
              <span className="field-label">Load a sample compromis</span>
              <div style={{ display: "flex", gap: 8 }}>
                <select value={sampleId} onChange={(e) => setSampleId(e.target.value)} style={{ flex: 1 }}>
                  {SAMPLE_COMPROMISES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
                <Button onClick={loadSample} variant="ghost">Load</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Compromis / fact pattern ingestion" subtitle="Paste the problem, or load a sample above. The parser extracts agreed facts, disputed facts, procedural history, issues and prayers, and identifies good and bad facts for each side.">
        <textarea
          value={state.compromisText}
          onChange={(e) => setCompromisText(e.target.value)}
          placeholder="Paste the compromis or fact pattern here…"
          style={{ width: "100%", minHeight: 220 }}
        />
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <Button onClick={() => fileRef.current?.click()} variant="ghost">Upload fact pattern (.txt/.md/.pdf)</Button>
          <input ref={fileRef} type="file" accept=".txt,.md,.pdf" style={{ position: "absolute", opacity: 0, width: 1, height: 1, pointerEvents: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = ""; }} />
          <Button onClick={parseNow} variant="primary">Parse</Button>
          <Button onClick={() => { setCompromisText(""); }} variant="ghost">Clear</Button>
        </div>
        {uploadStatus && <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 6, marginBottom: 0 }}>{uploadStatus}</p>}

        <div style={{ marginTop: 16, padding: 14, background: "rgba(11,18,32,0.45)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
          <div style={{ fontSize: 12, color: "var(--brass-400)", fontWeight: 600, marginBottom: 8, letterSpacing: "0.12em", textTransform: "uppercase" }}>Generate (rely on uploaded benchmarks as the standard)</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button onClick={runPipeline} variant="brass" disabled={!state.compromisText.trim()}>Run full pipeline</Button>
            <Button onClick={generateMemorialBoth} variant="primary" disabled={!state.parsed}>Generate memorial (both sides)</Button>
            <Button onClick={generateOralsBoth} variant="ghost" disabled={!state.parsed}>Generate oral scripts (both sides)</Button>
          </div>
          <p style={{ fontSize: 11.5, color: "var(--ink-500)", marginTop: 8, marginBottom: 0 }}>
            Run full pipeline = parse + detect mode + analyse both sides + memorial (both) + oral script + bench questions. The memorial and oral style follow your active benchmark profile in the Vault.
          </p>
        </div>
      </Card>

      {state.parsed && (
        <>
          <details style={{ marginTop: 20 }} open>
            <summary style={{ cursor: "pointer", color: "var(--teal-dark)", fontWeight: 600, marginBottom: 12 }}>Parsed details (optional)</summary>
            <div className="grid-2" style={{ marginTop: 12 }}>
              <Card title="Parsed structure" subtitle={`${state.parsed.parties.applicant} v ${state.parsed.parties.respondent}`}>
                <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
                  <div><Badge tone="brass">Parties</Badge> {state.parsed.parties.applicant} (Applicant) v {state.parsed.parties.respondent} (Respondent)</div>
                  {state.parsed.forum && <div><Badge tone="brass">Forum</Badge> {state.parsed.forum}</div>}
                  <div><Badge tone="brass">Agreed facts</Badge> {state.parsed.agreed.length}</div>
                  <div><Badge tone="brass">Disputed facts</Badge> {state.parsed.disputed.length}</div>
                  <div><Badge tone="brass">Procedural</Badge> {state.parsed.procedural.length}</div>
                  <div><Badge tone="brass">Issues</Badge> {state.parsed.issues.length}</div>
                  <div><Badge tone="brass">Prayers</Badge> {state.parsed.prayers.length}</div>
                </div>
              </Card>
              <Card title="Issues identified" subtitle="These drive the memorial, authority matching and oral scripts.">
                <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6 }}>
                  {state.parsed.issues.map((iss, i) => <li key={i}>{iss}</li>)}
                </ol>
              </Card>
            </div>

            <Card title="Fact analysis" subtitle="Identify good and bad facts for each side, then generate questions with direct answers and supporting authority." style={{ marginTop: 20 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <Button onClick={() => runAnalysis("applicant")} variant="outline">Analyse for Applicant</Button>
                <Button onClick={() => runAnalysis("respondent")} variant="outline">Analyse for Respondent</Button>
              </div>
              {(["applicant", "respondent"] as const).map((side) => {
                const a = state.analyses[side];
                if (!a) return null;
                return (
                  <div key={side} style={{ marginBottom: 18 }}>
                    <h4 style={{ fontFamily: "Playfair Display, serif", color: "var(--teal-dark)", marginBottom: 8 }}>
                      {side === "applicant" ? "Applicant" : "Respondent"} — fact analysis
                    </h4>
                    <div className="grid-2">
                      <div>
                        <div style={{ fontSize: 12, color: "var(--green)", fontWeight: 600, marginBottom: 6 }}>Good facts</div>
                        <div className="fact-list">
                          {a.good.map((f, i) => <div key={i} className="fact-item fact-good">{f.text}<span className="cite">{f.cite}</span></div>)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--red)", fontWeight: 600, marginBottom: 6 }}>Bad facts</div>
                        <div className="fact-list">
                          {a.bad.map((f, i) => <div key={i} className="fact-item fact-bad">{f.text}<span className="cite">{f.cite}</span></div>)}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 12, color: "var(--teal-dark)", fontWeight: 600, marginBottom: 6 }}>Questions and direct answers</div>
                      {a.qa.map((q, i) => (
                        <div key={i} className="qa">
                          <div className="qa-q">Q. {q.question}</div>
                          <div className="qa-a">A. {q.answer}</div>
                          <div className="qa-meta">{q.authority} {q.cite && `· ${q.cite}`}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </Card>
          </details>
        </>
      )}

      {!state.parsed && (
        <EmptyState title="No compromis parsed yet" body="Paste a fact pattern above and click Parse, or load one of the pre-loaded samples to see the parser at work." />
      )}
    </div>
  );
}
