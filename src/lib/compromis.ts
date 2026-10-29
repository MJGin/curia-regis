import type { CompetitionId, FactAnalysis, FactItem, ParsedCompromis, QAItem } from "../types";
import { competitionById } from "../data/competitions";
import { matchAuthorities, issueTags } from "../data/authorities";
import { splitParagraphs, sentences, words } from "./text";

const SECTION_KEYS: { key: string; title: string; test: (l: string) => boolean }[] = [
  { key: "agreed", title: "Agreed statement of facts", test: (l) => /agreed/.test(l) },
  { key: "disputed", title: "Disputed facts", test: (l) => /disputed/.test(l) },
  { key: "procedural", title: "Procedural history", test: (l) => /procedural|history/.test(l) },
  { key: "issues", title: "Questions presented", test: (l) => /question|issue|presented/.test(l) },
  { key: "prayers", title: "Prayers for relief", test: (l) => /prayer|relief/.test(l) },
  { key: "facts", title: "Statement of facts", test: (l) => /statement of facts|facts\b/.test(l) },
  { key: "jurisdiction", title: "Jurisdiction", test: (l) => /jurisdiction/.test(l) },
  { key: "abbrev", title: "Abbreviations", test: (l) => /abbrev/.test(l) },
  { key: "authorities", title: "Index of authorities", test: (l) => /authorit|index of/.test(l) },
];

function sectionKey(header: string): string | null {
  const l = header.toLowerCase();
  for (const s of SECTION_KEYS) if (s.test(l)) return s.key;
  return null;
}

function stripNumber(p: string): { n: number | null; text: string } {
  const m = p.match(/^(\d+)\.\s+(.*)$/s);
  if (m) return { n: Number(m[1]), text: m[2].trim() };
  return { n: null, text: p };
}

export function parseCompromis(raw: string): ParsedCompromis {
  const paras = splitParagraphs(raw);
  const parties = { applicant: "", respondent: "" };
  const pm = raw.match(/Between:\s*(.+?)\s*\((?:Applicant|Petitioner|Complainant|Appellants?)\)\s*(?:and|v\.?|versus)\s*(.+?)\s*\((?:Respondent|Respondents|Defendant)\)/i);
  if (pm) {
    parties.applicant = pm[1].trim();
    parties.respondent = pm[2].trim();
  } else {
    const pm2 = raw.match(/(.+?)\s+v\.?\s+(.+?)(?:\n|$)/i);
    if (pm2 && pm2[1].length < 80 && pm2[2].length < 80) {
      parties.applicant = pm2[1].trim();
      parties.respondent = pm2[2].trim();
    } else {
      const pm3 = raw.match(/Between:\s*(.+?)\s+and\s+(.+?)(?:\n|$)/i);
      if (pm3) {
        parties.applicant = pm3[1].trim();
        parties.respondent = pm3[2].trim();
      }
    }
  }
  if (!parties.applicant) parties.applicant = "the Applicant";
  if (!parties.respondent) parties.respondent = "the Respondent";

  const forumMatch = raw.match(/(?:before|before the|forum:)\s*([A-Z][^\n]{4,60})/i);
  const forum = forumMatch ? forumMatch[1].trim() : "";

  const sections: { key: string; title: string; paras: { n: number; text: string }[] }[] = [];
  let current: { key: string; title: string; paras: { n: number; text: string }[] } | null = null;
  let autoN = 0;
  let headerSeen = false;
  for (const p of paras) {
    const headerMatch = p.match(/^([IVXLC]+)\.\s+(.+)$/s);
    const isHeader = !!headerMatch && sectionKey(headerMatch[2]) !== null && p.length < 120;
    if (isHeader) { headerSeen = true;
      const key = sectionKey(headerMatch![2])!;
      current = { key, title: headerMatch![2].trim(), paras: [] };
      sections.push(current);
      continue;
    }
    if (!current) {
      current = { key: "facts", title: "Statement of facts", paras: [] };
      sections.push(current);
    }
    const { n, text } = stripNumber(p);
    autoN = n ?? autoN + 1;
    current.paras.push({ n: autoN, text });
  }

  if (!headerSeen || sections.length === 0) {
    sections.length = 0;
    sections.push({ key: "facts", title: "Statement of facts", paras: paras.map((p, i) => {
      const { n, text } = stripNumber(p);
      return { n: n ?? i + 1, text };
    }) });
  }
  const byKey = (k: string) => sections.filter((s) => s.key === k).flatMap((s) => s.paras);
  const agreed = byKey("agreed");
  const disputed = byKey("disputed");
  const procedural = byKey("procedural");
  const facts = byKey("facts");

  // issues
  const issueParas = byKey("issues");
  const issues: string[] = [];
  for (const p of issueParas) {
    const text = p.text;
    const letters = text.match(/^[A-Z]\.\s+(.+?)(?=\n[A-Z]\.\s|$)/gs);
    if (letters && letters.length > 1) {
      for (const l of letters) issues.push(l.replace(/^[A-Z]\.\s+/, "").trim());
    } else {
      const lines = text.split(/\n/).map((x) => x.trim()).filter(Boolean);
      for (const l of lines) {
        const m = l.match(/^[A-Z]\.\s+(.+)$/);
        if (m) issues.push(m[1].trim());
      }
      if (issues.length === 0) {
        for (const s of sentences(text)) if (/\bwhether\b/i.test(s)) issues.push(s);
      }
    }
  }
  if (issues.length === 0) {
    // fallback: pull "whether" sentences from whole text
    for (const s of sentences(raw)) if (/\bwhether\b/i.test(s)) issues.push(s);
  }
  if (issues.length === 0) issues.push("Whether the Respondent's conduct is lawful.");

  // prayers
  const prayerParas = byKey("prayers");
  const prayers = prayerParas.map((p) => p.text).filter(Boolean);
  if (prayers.length === 0) {
    const m = raw.match(/(?:PRAYERS?|RELIEF)[\s\S]{0,400}/i);
    if (m) prayers.push(m[0].trim());
  }

  const allParas = sections.flatMap((s) => s.paras);
  const paragraphs = allParas.map((p, i) => ({ n: p.n || i + 1, text: p.text }));

  return {
    raw,
    parties,
    forum,
    paragraphs,
    agreed,
    disputed,
    procedural,
    issues,
    prayers,
    sections: sections.map((s) => ({ key: s.key, title: s.title, paras: s.paras })),
    analysed: false,
  };
}

const GOOD_FOR_APPLICANT = [
  "failed",
  "refused",
  "violated",
  "unlawful",
  "without consent",
  "exceeded",
  "discriminat",
  "arbitrary",
  "breach",
  "harm",
  "damage",
  "delay",
  "denied",
  "evicted",
  "destroyed",
  "no consultation",
  "no assessment",
  "outside kenya",
  "not shared",
];
const BAD_FOR_APPLICANT = [
  "complied",
  "consented",
  "notified",
  "reasonable",
  "justified",
  "authorised",
  "authorized",
  "policy",
  "emergency",
  "necessary",
];

function scoreFact(text: string, side: "applicant" | "respondent"): number {
  const l = text.toLowerCase();
  let score = 0;
  for (const w of GOOD_FOR_APPLICANT) if (l.includes(w)) score += side === "applicant" ? 2 : -1;
  for (const w of BAD_FOR_APPLICANT) if (l.includes(w)) score += side === "applicant" ? -1 : 2;
  return score;
}

function makeQuestion(fact: string, side: "applicant" | "respondent", comp: CompetitionId, n: number): QAItem {
  const tags = issueTags(fact, comp);
  const matched = matchAuthorities(fact, comp, side, 1);
  const auth = matched[0]?.authority;
  const cite = auth ? auth.citation : "";
  const authName = auth ? auth.title : "the governing instrument";
  const direct = side === "applicant" ? "Yes" : "No";
  const answer =
    `${direct}. The record at paragraph ${n} establishes that ${fact.replace(/\.$/, "")}. ` +
    `That conduct engages ${tags.slice(0, 2).join(" and ")} under ${authName} (${cite}), ` +
    `which supports the ${side === "applicant" ? "applicant's" : "respondent's"} position.`;
  const question = `Is it established on the record that ${fact.replace(/\.$/, "").toLowerCase()}?`;
  return { question, answer, authority: authName, cite, tag: tags[0] ?? "general" };
}

export function analyseFacts(parsed: ParsedCompromis, side: "applicant" | "respondent", competition: CompetitionId): FactAnalysis {
  const pool = [...parsed.agreed, ...parsed.disputed];
  const good: FactItem[] = [];
  const bad: FactItem[] = [];
  for (const p of pool) {
    const w = scoreFact(p.text, side);
    const item = { text: p.text, cite: `Compromis ¶ ${p.n}`, weight: Math.abs(w) || 1 };
    if (w >= 1) good.push(item);
    else if (w <= -1) bad.push(item);
  }
  // ensure non-empty
  if (good.length === 0 && pool.length) good.push({ text: pool[0].text, cite: `Compromis ¶ ${pool[0].n}`, weight: 1 });
  if (bad.length === 0 && pool.length > 1) bad.push({ text: pool[pool.length - 1].text, cite: `Compromis ¶ ${pool[pool.length - 1].n}`, weight: 1 });

  const qa: QAItem[] = [];
  const opponent = side === "applicant" ? "respondent" : "applicant";
  const disputed = parsed.disputed.length ? parsed.disputed : parsed.agreed;
  for (const p of disputed.slice(0, 6)) {
    qa.push(makeQuestion(p.text, side, competition, p.n));
  }
  // add a catch-all
  qa.push({
    question: `Does the ${opponent} bear the burden of justifying the impugned conduct?`,
    answer: `Yes. The ${side === "applicant" ? "applicant" : "respondent"} submits that the burden rests on the party asserting the lawfulness of the conduct, and the record does not discharge it.`,
    authority: competitionById(competition).name,
    cite: "",
    tag: "burden",
  });

  return { side, good: good.slice(0, 8), bad: bad.slice(0, 8), qa: qa.slice(0, 7) };
}
