import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../../store";
import { SectionHeader, Button, Card, EmptyState, Badge } from "../ui";
import { scoreAnswer } from "../../lib/bench";

export default function SparringTab() {
  const { state, startBench, recordBenchAnswer, resetBench } = useApp();
  const b = state.bench;
  const [answer, setAnswer] = useState("");
  const [remaining, setRemaining] = useState(0);
  const startRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  const current = b.started && !b.finished ? b.questions[b.index] : null;

  useEffect(() => {
    if (!current) return;
    setAnswer("");
    setRemaining(current.seconds);
    startRef.current = Date.now();
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [current?.id]);

  const submit = () => {
    if (!current) return;
    const ms = Date.now() - startRef.current;
    if (timerRef.current) window.clearInterval(timerRef.current);
    recordBenchAnswer(answer, ms);
  };

  const lastTurn = b.turns.length ? b.turns[b.turns.length - 1] : null;
  const lastQ = lastTurn ? b.questions.find((q) => q.id === lastTurn.questionId) : null;
  const lastScore = lastTurn && lastQ ? scoreAnswer(lastTurn.answer, lastQ, lastTurn.ms) : null;

  // final scorecard
  if (b.finished) {
    const scores = b.turns.map((t) => {
      const q = b.questions.find((x) => x.id === t.questionId)!;
      return scoreAnswer(t.answer, q, t.ms);
    });
    const avg = (k: "directness" | "composure" | "address" | "authority" | "recovery" | "total") =>
      Math.round(scores.reduce((a, s) => a + s[k], 0) / scores.length);
    return (
      <div>
        <SectionHeader eyebrow="Bench Sparring" title="Session complete" body="Scorecard across all three judicial archetypes." />
        <Card title="Final scorecard" style={{ marginBottom: 16 }}>
          <div className="score-grid">
            {(["directness", "composure", "address", "authority", "recovery", "total"] as const).map((k) => (
              <div key={k} className="score-cell">
                <div className="score-num">{avg(k)}</div>
                <div className="score-lbl">{k}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 13, color: "var(--ink-300)" }}>
            {avg("total") >= 75
              ? "Strong performance: direct, composed and well-supported. Polish the weaker subscores above."
              : avg("total") >= 55
                ? "Competent but uneven. Drill the subscores below 60 with targeted practice."
                : "Needs work. Re-read the ideal answer skeletons and practise opening with a direct yes/no."}
          </div>
        </Card>
        <Card title="Turn-by-turn review">
          {b.turns.map((t, i) => {
            const q = b.questions.find((x) => x.id === t.questionId)!;
            const sc = scoreAnswer(t.answer, q, t.ms);
            return (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 12, color: "var(--brass-400)", marginBottom: 4 }}>{q.judgeName}</div>
                <div style={{ fontSize: 13, color: "var(--ink-100)", marginBottom: 6 }}>{q.question}</div>
                <div style={{ fontSize: 13, color: "var(--ink-200)", marginBottom: 6 }}><b>Your answer:</b> {t.answer || "(no answer)"}</div>
                <div style={{ fontSize: 12, color: "var(--ink-400)" }}>Score {sc.total}/100 · {sc.notes.join(" ")}</div>
                <details style={{ marginTop: 4 }}>
                  <summary style={{ cursor: "pointer", color: "var(--brass-400)", fontSize: 12 }}>Ideal skeleton</summary>
                  <div style={{ fontSize: 12.5, color: "var(--ink-300)", marginTop: 4 }}>{q.ideal}</div>
                </details>
              </div>
            );
          })}
        </Card>
        <div style={{ marginTop: 14 }}>
          <Button onClick={resetBench} variant="primary">Restart session</Button>
        </div>
      </div>
    );
  }

  if (!b.started) {
    return (
      <div>
        <SectionHeader eyebrow="Bench Sparring" title="Interactive 3-judge sparring simulator" body="Face a hostile interrupter, an academic stickler and a pragmatic policy judge. Scored on directness, composure, judicial address, authority use and recovery." />
        {!state.parsed ? (
          <EmptyState title="No compromis parsed" body="Parse a compromis first so the bench can generate issue-specific questions." />
        ) : (
          <Card title="Ready to spar">
            <p style={{ fontSize: 13, color: "var(--ink-200)", marginBottom: 12 }}>
              The simulator will generate {issuesCount(state)} questions across the three judicial archetypes, based on your parsed issues. Each question is timed.
            </p>
            <Button onClick={startBench} variant="primary">Begin sparring session</Button>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div>
      <SectionHeader eyebrow="Bench Sparring" title={`Question ${b.index + 1} of ${b.questions.length}`} body="Answer directly, address the bench, cite authority, and watch the clock." />

      {current && (
        <div className="bench-judge">
          <div className="bench-name">{current.judgeName}</div>
          <div className="bench-q">{current.question}</div>
          <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="bench-timer">Time remaining: {remaining}s</span>
            <Badge tone={remaining <= 5 ? "danger" : "warn"}>{current.seconds}s limit</Badge>
          </div>
        </div>
      )}

      <Card title="Your answer">
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer the bench directly. Open with 'Yes/No, Your Honour…'" style={{ minHeight: 140 }} />
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Button onClick={submit} variant="primary" disabled={!answer.trim()}>Submit answer</Button>
          <Button onClick={() => { if (current) { setAnswer(""); } }} variant="ghost">Clear</Button>
        </div>
      </Card>

      {lastScore && lastQ && (
        <Card title="Last turn score" style={{ marginTop: 16 }}>
          <div className="score-grid">
            {(["directness", "composure", "address", "authority", "recovery", "total"] as const).map((k) => (
              <div key={k} className="score-cell">
                <div className="score-num">{lastScore[k]}</div>
                <div className="score-lbl">{k}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-300)", lineHeight: 1.55 }}>
            {lastScore.notes.map((n, i) => <div key={i}>· {n}</div>)}
          </div>
          <details style={{ marginTop: 8 }}>
            <summary style={{ cursor: "pointer", color: "var(--brass-400)", fontSize: 12 }}>Ideal skeleton</summary>
            <div style={{ fontSize: 12.5, color: "var(--ink-300)", marginTop: 4 }}>{lastQ.ideal}</div>
          </details>
        </Card>
      )}
    </div>
  );
}

function issuesCount(state: any) {
  return (state.parsed?.issues?.length ?? 1) * 3 + 1;
}
