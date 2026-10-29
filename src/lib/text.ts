export function splitParagraphs(text: string): string[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function sentences(text: string): string[] {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function words(text: string): string[] {
  return (text.match(/[A-Za-z][A-Za-z'-]*/g) ?? []).map((w) => w.toLowerCase());
}

export function wordCount(text: string): number {
  return words(text).length;
}

export function uniqueWords(text: string): number {
  return new Set(words(text)).size;
}

export function avgSentenceLength(text: string): number {
  const ss = sentences(text);
  if (!ss.length) return 0;
  return Math.round(ss.reduce((a, s) => a + words(s).length, 0) / ss.length);
}

export function avgParagraphWords(text: string): number {
  const ps = splitParagraphs(text);
  if (!ps.length) return 0;
  return Math.round(ps.reduce((a, p) => a + words(p).length, 0) / ps.length);
}

export function latinisms(text: string): number {
  const latin = [
    "inter alia",
    "prima facie",
    "ultra vires",
    "ratio decidendi",
    "obiter",
    "res judicata",
    "pacta sunt servanda",
    "restitutio in integrum",
    "erga omnes",
    "opinio juris",
    "ex parte",
    "amicus",
    "a fortiori",
    "mutatis mutandis",
    "per se",
    "ipso facto",
  ];
  const lower = text.toLowerCase();
  return latin.reduce((a, l) => a + (lower.split(l).length - 1), 0);
}

export function formalityScore(text: string): number {
  const formal = [
    "respectfully",
    "submit",
    "honourable",
    "jurisdiction",
    "obligation",
    "interpretation",
    "proportionate",
    "necessary",
    "pursuant",
    "therefore",
    "furthermore",
    "moreover",
    "accordingly",
  ];
  const informal = ["I think", "really", "just", "stuff", "thing", "kind of", "sort of"];
  const lower = text.toLowerCase();
  const f = formal.reduce((a, w) => a + (lower.split(w).length - 1), 0);
  const i = informal.reduce((a, w) => a + (lower.split(w).length - 1), 0);
  const total = words(text).length || 1;
  return Math.min(100, Math.round((f / total) * 1000) + 40 - Math.min(20, i * 4));
}

export function citationDensity(text: string): number {
  const cites = text.match(/\[[0-9]{4}\]|\([0-9]{4}\)|WT\/DS\d+|UNT[Ss]/g) ?? [];
  const w = words(text).length || 1;
  return Math.round((cites.length / w) * 1000) / 10;
}

export function deferenceCount(text: string): number {
  const markers = [
    "may it please",
    "with respect",
    "your honour",
    "your lordship",
    "your ladyship",
  ];
  const lower = text.toLowerCase();
  return markers.reduce((a, m) => a + (lower.split(m).length - 1), 0);
}

export function signpostCount(text: string): number {
  const markers = [
    "firstly",
    "secondly",
    "thirdly",
    "first,",
    "second,",
    "third,",
    "turning to",
    "in conclusion",
    "for the foregoing",
    "by way of",
  ];
  const lower = text.toLowerCase();
  return markers.reduce((a, m) => a + (lower.split(m).length - 1), 0);
}

export function rhetoricalQuestions(text: string): number {
  return (text.match(/\?/g) ?? []).length;
}

export function concessionCount(text: string): number {
  const markers = [
    "we accept",
    "we concede",
    "it is accepted",
    "with respect, we accept",
    "even if",
    "in the alternative",
  ];
  const lower = text.toLowerCase();
  return markers.reduce((a, m) => a + (lower.split(m).length - 1), 0);
}

export function extractOpeners(text: string, n = 6): string[] {
  const ss = sentences(text).filter((s) => words(s).length >= 6 && words(s).length <= 28);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of ss) {
    const key = words(s).slice(0, 4).join(" ");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
    if (out.length >= n) break;
  }
  return out;
}

export function extractTransitions(text: string, n = 8): string[] {
  const markers = [
    "turning to",
    "on the merits",
    "by contrast",
    "in the alternative",
    "furthermore",
    "moreover",
    "accordingly",
    "in conclusion",
    "for the foregoing",
    "on jurisdiction",
  ];
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const m of markers) if (lower.includes(m)) found.push(m);
  return found.slice(0, n);
}

export function extractSignaturePhrases(text: string, n = 6): string[] {
  const phrases = [
    "may it please",
    "with respect",
    "it is submitted",
    "the applicant submits",
    "the respondent submits",
    "for the foregoing reasons",
    "in the alternative",
    "with one vital qualification",
  ];
  const lower = text.toLowerCase();
  return phrases.filter((p) => lower.includes(p)).slice(0, n);
}


export async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt") || name.endsWith(".md")) return await file.text();
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
