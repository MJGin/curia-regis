import type { StyleProfile } from "../types";
import {
  words,
  sentences,
  splitParagraphs,
  wordCount,
  uniqueWords,
  avgSentenceLength,
  avgParagraphWords,
  latinisms,
  formalityScore,
  citationDensity,
  deferenceCount,
  signpostCount,
  rhetoricalQuestions,
  concessionCount,
  extractOpeners,
  extractTransitions,
  extractSignaturePhrases,
} from "./text";

function uid(): string {
  return "sp_" + Math.random().toString(36).slice(2, 10);
}

export function extractStyle(name: string, kind: "memorial" | "oral", text: string, benchmark = false): StyleProfile {
  const w = words(text);
  const s = sentences(text);
  const p = splitParagraphs(text);
  return {
    id: uid(),
    name,
    kind,
    source: text.slice(0, 120).replace(/\s+/g, " "),
    createdAt: Date.now(),
    words: w.length,
    sentences: s.length,
    avgSentence: avgSentenceLength(text),
    avgParagraph: avgParagraphWords(text),
    lexicalDiversity: w.length ? Math.round((uniqueWords(text) / w.length) * 100) : 0,
    formality: formalityScore(text),
    citationDensity: citationDensity(text),
    latinisms: latinisms(text),
    deference: deferenceCount(text),
    signposts: signpostCount(text),
    rhetoricalQuestions: rhetoricalQuestions(text),
    concessions: concessionCount(text),
    openers: extractOpeners(text),
    transitions: extractTransitions(text),
    signaturePhrases: extractSignaturePhrases(text),
    benchmark,
  };
}

export interface StyleGap {
  metric: string;
  draft: number;
  target: number;
  advice: string;
}

export function compareStyle(draft: string, profile: StyleProfile): StyleGap[] {
  const gaps: StyleGap[] = [];
  const dAvg = avgSentenceLength(draft);
  gaps.push({
    metric: "Average sentence length (words)",
    draft: dAvg,
    target: profile.avgSentence,
    advice:
      dAvg > profile.avgSentence + 4
        ? "Shorten: split long sentences at semicolons and subordinate clauses to match the benchmark cadence."
        : dAvg < profile.avgSentence - 4
          ? "Lengthen: combine short sentences with subordination to match the benchmark cadence."
          : "On target.",
  });
  const dPara = avgParagraphWords(draft);
  gaps.push({
    metric: "Average paragraph length (words)",
    draft: dPara,
    target: profile.avgParagraph,
    advice:
      Math.abs(dPara - profile.avgParagraph) > 25
        ? "Rebalance paragraph size to mirror the benchmark's block rhythm."
        : "On target.",
  });
  const dForm = formalityScore(draft);
  gaps.push({
    metric: "Formality index (0–100)",
    draft: dForm,
    target: profile.formality,
    advice:
      dForm < profile.formality - 8
        ? "Increase formal register: replace colloquial phrasing with legal terminology and institutional address."
        : "On target.",
  });
  const dCit = citationDensity(draft);
  gaps.push({
    metric: "Citation density (per 1,000 words)",
    draft: dCit,
    target: profile.citationDensity,
    advice:
      dCit < profile.citationDensity - 2
        ? "Integrate more authorities per paragraph, as the benchmark does."
        : "On target.",
  });
  const dLat = latinisms(draft);
  gaps.push({
    metric: "Latinisms / legal maxims",
    draft: dLat,
    target: profile.latinisms,
    advice:
      dLat < profile.latinisms
        ? "Introduce the benchmark's maxims (inter alia, prima facie, ultra vires, restitutio in integrum) where precise."
        : "On target.",
  });
  const dDef = deferenceCount(draft);
  gaps.push({
    metric: "Judicial deference phrases",
    draft: dDef,
    target: profile.deference,
    advice:
      dDef < profile.deference
        ? "Add 'May it please the Court', 'with respect' and 'Your Honour' at structural points."
        : "On target.",
  });
  const dSig = signpostCount(draft);
  gaps.push({
    metric: "Signposting phrases",
    draft: dSig,
    target: profile.signposts,
    advice:
      dSig < profile.signposts
        ? "Add numbered submissions and 'Turning to' transitions to mirror the benchmark's roadmap."
        : "On target.",
  });
  return gaps;
}

/**
 * Applies a light cadence tint to generated text using the profile's openers and
 * transitions. Honest about its limits: it adjusts sentence boundaries and inserts
 * the profile's characteristic openers where the draft is thin, but it does not
 * rewrite substance.
 */
export function tintText(text: string, profile: StyleProfile | null): string {
  if (!profile) return text;
  let out = text;
  // Split over-long sentences at semicolons if the profile's average is shorter.
  if (profile.avgSentence > 0 && avgSentenceLength(out) > profile.avgSentence + 6) {
    out = out.replace(/; /g, ". ");
  }
  // Ensure a characteristic opener is present at the very start if missing.
  if (profile.openers.length && !profile.openers.some((o) => out.toLowerCase().startsWith(o.toLowerCase().slice(0, 12)))) {
    const opener = profile.openers[0];
    if (!out.toLowerCase().includes(opener.toLowerCase().slice(0, 20))) {
      out = opener + " " + out.charAt(0).toLowerCase() + out.slice(1);
    }
  }
  return out;
}

export function profileSummary(profile: StyleProfile): string {
  return `${profile.words} words · ${profile.sentences} sentences · avg ${profile.avgSentence} words/sentence · formality ${profile.formality}/100 · ${profile.latinisms} Latinisms · ${profile.deference} deference phrases`;
}
