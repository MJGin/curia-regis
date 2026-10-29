import type { BenchQuestion, BenchScore, BenchTurn, CompetitionId } from "../types";
import { competitionById } from "../data/competitions";
import { matchAuthorities } from "../data/authorities";

const JUDGE_NAMES = {
  hostile: "Hon. Justice K. Mwangi (The Hostile Interrupter)",
  academic: "Prof. A. Ochieng (The Academic Stickler)",
  policy: "Hon. Justice R. Wanjiku (The Pragmatic Policy Judge)",
};

export function generateBench(competition: CompetitionId, issues: string[]): BenchQuestion[] {
  const comp = competitionById(competition);
  const iss = (issues.length ? issues : ["Whether the impugned conduct is lawful."]).slice(0, 2);
  const out: BenchQuestion[] = [];
  let id = 0;
  for (const issue of iss) {
    const auth = matchAuthorities(issue, competition, "applicant", 1)[0]?.authority;
    out.push({
      id: `q${++id}`,
      judge: "hostile",
      judgeName: JUDGE_NAMES.hostile,
      question:
        "Counsel, before you go any further — does this Court even have jurisdiction? Answer yes or no, then give me your single best authority in twenty seconds.",
      issue,
      ideal: `Yes. Jurisdiction is established on the face of the instrument invoked (${comp.law}). The threshold is satisfied; the strongest authority is ${auth ? auth.title : "the governing instrument"}.`,
      authority: auth ? auth.citation : "",
      seconds: 20,
    });
    out.push({
      id: `q${++id}`,
      judge: "academic",
      judgeName: JUDGE_NAMES.academic,
      question: `How do you reconcile your position on "${issue.replace(/^whether\s+/i, "").toLowerCase()}" with the limits of the principle you urge? Where does it stop?`,
      issue,
      ideal: `The principle is confined to its ratio: ${auth ? auth.principle : "the instrument's text"}. It does not extend to ${"the hypothetical case"}.`,
      authority: auth ? auth.citation : "",
      seconds: 45,
    });
    out.push({
      id: `q${++id}`,
      judge: "policy",
      judgeName: JUDGE_NAMES.policy,
      question:
        "Counsel, if we accept your submission, what are the floodgates consequences? Who bears the cost, and is that a matter for this Court or for the legislature?",
      issue,
      ideal: `The floodgates concern is met by the narrowness of the holding and the proportionality of the remedy; the Court's role is to apply the law, and the remedy is tailored.`,
      authority: "",
      seconds: 40,
    });
  }
  // closing
  out.push({
    id: `q${++id}`,
    judge: "hostile",
    judgeName: JUDGE_NAMES.hostile,
    question: "Counsel, your time is up. In one sentence — why should we rule in your favour?",
    issue: iss[0],
    ideal: `Because the text, the record and the authorities all point the same way, and the remedy sought is proportionate.`,
    authority: "",
    seconds: 15,
  });
  return out;
}

const DIRECT_MARKERS = ["yes", "no", "indeed", "with respect", "may it please", "the answer is"];
const FILLERS = ["um", "uh", "like", "you know", "sort of", "kind of", "basically", "actually"];

export function scoreAnswer(answer: string, q: BenchQuestion, ms: number): BenchScore {
  const a = answer.trim();
  const lower = a.toLowerCase();
  const w = a.split(/\s+/).filter(Boolean).length;
  const notes: string[] = [];

  // directness: first 6 words contain a direct marker
  const first = lower.split(/\s+/).slice(0, 6).join(" ");
  let directness = 0;
  if (DIRECT_MARKERS.some((m) => first.includes(m))) {
    directness = 90;
    notes.push("Opened with a direct answer — good.");
  } else {
    directness = 30;
    notes.push("Did not open with a direct yes/no — the bench had to wait.");
  }

  // address
  let address = 0;
  if (/may it please|your honour|your lordship|your ladyship/.test(lower)) {
    address = 90;
    notes.push("Proper judicial address used.");
  } else {
    address = 25;
    notes.push("No judicial address — add 'May it please the Court'.");
  }

  // authority
  let authority = 0;
  if (q.authority && lower.includes(q.authority.split(",")[0].toLowerCase().slice(0, 12))) {
    authority = 85;
    notes.push("Cited the suggested authority.");
  } else if (/[A-Z][a-z]+ v [A-Z]/.test(a) || /\[[0-9]{4}\]/.test(a)) {
    authority = 70;
    notes.push("Cited an authority.");
  } else {
    authority = 25;
    notes.push("No authority cited — ground the answer in a case or instrument.");
  }

  // composure: filler ratio + length
  const fillerHits = FILLERS.reduce((n, f) => n + (lower.split(f).length - 1), 0);
  let composure = 80 - fillerHits * 8;
  if (w < 12) {
    composure -= 15;
    notes.push("Answer too short — develop the point.");
  }
  if (w > 130) {
    composure -= 15;
    notes.push("Answer too long — the bench will cut you off.");
  }
  composure = Math.max(10, Math.min(100, composure));

  // recovery: time
  let recovery = 85;
  if (ms > q.seconds * 1000) {
    recovery = 40;
    notes.push("Over time — the bench will lose patience.");
  } else if (ms < 3000) {
    recovery = 70;
    notes.push("Very fast — make sure you were heard.");
  }

  const total = Math.round(directness * 0.3 + composure * 0.25 + address * 0.2 + authority * 0.15 + recovery * 0.1);
  return { directness, composure, address, authority, recovery, total, notes };
}
