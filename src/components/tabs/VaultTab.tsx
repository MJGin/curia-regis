import React, { useRef, useState } from "react";
import { useApp } from "../../store";
import { SectionHeader, Button, Card, EmptyState, Badge } from "../ui";
import { extractStyle, compareStyle, profileSummary } from "../../lib/style";
import { BENCHMARK_MEMORIAL, BENCHMARK_ORAL } from "../../data/samples";

async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt") || name.endsWith(".md")) {
    return await file.text();
  }
  if (name.endsWith(".pdf")) {
    const pdfjs = await import("pdfjs-dist");
    const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
    (pdfjs as any).GlobalWorkerOptions.workerSrc = worker.default;
    const buf = await file.arrayBuffer();
    const doc = await (pdfjs as any).getDocument({ data: buf }).promise;
    let out = "";
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      out += content.items.map((it: any) => it.str).join(" ") + "\n\n";
    }
    return out;
  }
  throw new Error("Unsupported file type. Use .txt, .md or .pdf.");
}

export default function VaultTab() {
  const { state, addStyleProfile, deleteStyleProfile, setActiveStyle, setActiveOralStyle } = useApp();
  const [name, setName] = useState("");
  const [kind, setKind] = useState<"memorial" | "oral">("memorial");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (f: File) => {
    setBusy(true);
    try {
      const t = await extractText(f);
      setText(t);
      if (!name) setName(f.name.replace(/\.[^.]+$/, ""));
    } catch (e: any) {
      alert(e?.message ?? "Could not read file.");
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    if (!text.trim()) return;
    addStyleProfile(name || "Untitled profile", kind, text, false);
    setName("");
    setText("");
  };

  const seed = () => {
    addStyleProfile("Championship Memorial (demo)", "memorial", BENCHMARK_MEMORIAL, true);
    addStyleProfile("Championship Oralist (demo)", "oral", BENCHMARK_ORAL, true);
  };

  const memorialProfiles = state.styleProfiles.filter((p) => p.kind === "memorial");
  const oralProfiles = state.styleProfiles.filter((p) => p.kind === "oral");

  return (
    <div>
      <SectionHeader
        eyebrow="Benchmark Vault"
        title="Style DNA cloning"
        body="Upload past winning memorials or mooter oral scripts. The system extracts a measurable style fingerprint — cadence, formality, citation density, deference, signposting, Latinisms — and applies it to future drafts. Everything is processed locally in your browser; nothing leaves your machine."
      />

      <div className="grid-2">
        <Card title="Upload a benchmark" subtitle="Accepted: .txt, .md and .pdf (text-based).">
          <div style={{ display: "grid", gap: 10 }}>
            <div className="field">
              <span className="field-label">Profile name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jessup 2024 Alona E. Evans winner" />
            </div>
            <div className="field">
              <span className="field-label">Type</span>
              <select value={kind} onChange={(e) => setKind(e.target.value as any)}>
                <option value="memorial">Memorial</option>
                <option value="oral">Oral script</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={() => fileRef.current?.click()} variant="ghost" disabled={busy}>
                {busy ? "Reading…" : "Choose file"}
              </Button>
              <input ref={fileRef} type="file" accept=".txt,.md,.pdf" style={{ position: "absolute", opacity: 0, width: 1, height: 1, pointerEvents: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} />
              <Button onClick={seed} variant="ghost">Load demo benchmarks</Button>
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="…or paste the text of the memorial / script here" style={{ minHeight: 160 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={save} variant="primary" disabled={!text.trim()}>Save profile</Button>
              <Button onClick={() => { setName(""); setText(""); }} variant="ghost">Clear</Button>
            </div>
          </div>
        </Card>

        <Card title="How cloning works" subtitle="Measurable, not magical.">
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: "var(--ink-200)" }}>
            <li><b>Cadence</b> — average sentence and paragraph length; the draft is re-balanced to match.</li>
            <li><b>Register</b> — formality index from legal terminology and institutional address.</li>
            <li><b>Authority</b> — citation density and the mix of instruments, binding and persuasive cases.</li>
            <li><b>Rhetoric</b> — Latinisms, deference phrases, signposting and rhetorical questions.</li>
            <li><b>Openers &amp; transitions</b> — characteristic phrases are extracted and echoed.</li>
            <li><b>Gap analysis</b> — every generated memorial is scored against the active profile, with concrete advice.</li>
          </ul>
          <p style={{ fontSize: 12, color: "var(--ink-400)", marginTop: 12 }}>
            Demo profiles are clearly labelled. Replace them with real winning memorials and mooter scripts as you collect them.
          </p>
        </Card>
      </div>

      <div className="grid-2" style={{ marginTop: 20 }}>
        <Card title={`Memorial profiles (${memorialProfiles.length})`} subtitle="Choose one as the active drafting style.">
          {memorialProfiles.length === 0 ? (
            <EmptyState title="No memorial profiles yet" body="Upload a winning memorial or load the demo benchmark to begin." />
          ) : (
            memorialProfiles.map((p) => (
              <div key={p.id} className="profile-card">
                <div className="profile-name">{p.name} {p.benchmark && <Badge tone="brass">demo</Badge>}</div>
                <div className="profile-meta">{profileSummary(p)}</div>
                <div className="bar-row"><span>Avg sentence</span><div className="bar"><span style={{ width: `${Math.min(100, p.avgSentence * 3)}%` }} /></div><span>{p.avgSentence}</span></div>
                <div className="bar-row"><span>Formality</span><div className="bar"><span style={{ width: `${p.formality}%` }} /></div><span>{p.formality}</span></div>
                <div className="bar-row"><span>Citation density</span><div className="bar"><span style={{ width: `${Math.min(100, p.citationDensity * 10)}%` }} /></div><span>{p.citationDensity}</span></div>
                <div className="bar-row"><span>Latinisms</span><div className="bar"><span style={{ width: `${Math.min(100, p.latinisms * 12)}%` }} /></div><span>{p.latinisms}</span></div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <Button onClick={() => setActiveStyle(p.id)} variant={state.activeStyleId === p.id ? "primary" : "ghost"} size="sm">
                    {state.activeStyleId === p.id ? "Active" : "Set active"}
                  </Button>
                  <Button onClick={() => deleteStyleProfile(p.id)} variant="danger" size="sm">Delete</Button>
                </div>
              </div>
            ))
          )}
        </Card>

        <Card title={`Oral script profiles (${oralProfiles.length})`} subtitle="Choose one as the active oral style.">
          {oralProfiles.length === 0 ? (
            <EmptyState title="No oral profiles yet" body="Upload a mooter's script or load the demo benchmark." />
          ) : (
            oralProfiles.map((p) => (
              <div key={p.id} className="profile-card">
                <div className="profile-name">{p.name} {p.benchmark && <Badge tone="brass">demo</Badge>}</div>
                <div className="profile-meta">{profileSummary(p)}</div>
                <div className="bar-row"><span>Deference phrases</span><div className="bar"><span style={{ width: `${Math.min(100, p.deference * 20)}%` }} /></div><span>{p.deference}</span></div>
                <div className="bar-row"><span>Signposting</span><div className="bar"><span style={{ width: `${Math.min(100, p.signposts * 20)}%` }} /></div><span>{p.signposts}</span></div>
                <div className="bar-row"><span>Rhetorical questions</span><div className="bar"><span style={{ width: `${Math.min(100, p.rhetoricalQuestions * 20)}%` }} /></div><span>{p.rhetoricalQuestions}</span></div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <Button onClick={() => setActiveOralStyle(p.id)} variant={state.activeOralStyleId === p.id ? "primary" : "ghost"} size="sm">
                    {state.activeOralStyleId === p.id ? "Active" : "Set active"}
                  </Button>
                  <Button onClick={() => deleteStyleProfile(p.id)} variant="danger" size="sm">Delete</Button>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}
