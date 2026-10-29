export type Side = "applicant" | "respondent";

export type CompetitionId =
  | "jessup"
  | "jackson"
  | "kenya-sc"
  | "odpc"
  | "african"
  | "kenya-moots"
  | "custom"
  | "ihl"
  | "eac";

export interface OralBlock {
  label: string;
  minutes: number;
  kind: "opening" | "contention" | "conclusion" | "rebuttal" | "prayer";
}

export interface Competition {
  id: CompetitionId;
  name: string;
  short: string;
  forum: string;
  law: string;
  citationStandard: string;
  wordLimit: number;
  oralPlan: OralBlock[];
  /** Heading used for the jurisdictional threshold section. */
  jurisdictionHeading: string;
  factsHeading: string;
  summaryHeading: string;
  argumentLabel: string;
  prayerHeading: string;
  /** Prayer paragraphs; {applicant} and {respondent} are substituted. */
  prayer: string[];
  /** Primary doctrine tags used to bias authority matching. */
  doctrine: string[];
  /** Formula for opening a submission. */
  appellateAddress: string;
  notes: string;
}

export interface Authority {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: number;
  system: "KE" | "UK" | "ICJ" | "WTO" | "AF" | "EU" | "INSTRUMENT";
  instrument?: boolean;
  tags: string[];
  /** One-sentence ratio, stated conservatively in our own words. */
  principle: string;
  useFor: Side | "both";
  /** True where the case is commonly deployed against the position it is matched to. */
  adverse?: boolean;
  note?: string;
  /** Official source (Kenya Law / BAILII / WTO / ICJ), where available. */
  sourceUrl?: string;
  /** Brief facts of the case (1-3 sentences). */
  facts?: string;
  /** Brief holding / ratio (1-3 sentences). */
  holding?: string;
  /** Judges who decided the case. */
  judges?: string;
}

export interface Para {
  n: number;
  text: string;
}

export interface FactItem {
  text: string;
  cite: string;
  weight: number;
}

export interface QAItem {
  question: string;
  answer: string;
  authority: string;
  cite: string;
  tag: string;
}

export interface FactAnalysis {
  side: Side;
  good: FactItem[];
  bad: FactItem[];
  qa: QAItem[];
}

export interface ParsedCompromis {
  raw: string;
  parties: { applicant: string; respondent: string };
  forum: string;
  paragraphs: Para[];
  agreed: Para[];
  disputed: Para[];
  procedural: Para[];
  issues: string[];
  prayers: string[];
  sections: { key: string; title: string; paras: Para[] }[];
  analysed: boolean;
}

export interface StyleProfile {
  id: string;
  name: string;
  kind: "memorial" | "oral";
  source: string;
  createdAt: number;
  words: number;
  sentences: number;
  avgSentence: number;
  avgParagraph: number;
  lexicalDiversity: number;
  formality: number;
  citationDensity: number;
  latinisms: number;
  deference: number;
  signposts: number;
  rhetoricalQuestions: number;
  concessions: number;
  openers: string[];
  transitions: string[];
  signaturePhrases: string[];
  benchmark: boolean;
}

export type BlockKind = "title" | "subtitle" | "h1" | "h2" | "h3" | "para" | "quote" | "meta";

export interface DocBlock {
  kind: BlockKind;
  text: string;
  cite?: string;
}

export interface MemorialSection {
  id: string;
  heading: string;
  blocks: DocBlock[];
  words: number;
}

export interface MemorialDoc {
  id: string;
  competition: CompetitionId;
  side: Side;
  title: string;
  subtitle: string;
  sections: MemorialSection[];
  toc: { label: string; depth: number }[];
  authorities: {
    group: string;
    entries: { text: string; status: string }[];
  }[];
  wordCount: number;
  generatedAt: number;
  styleProfileId?: string;
}

export interface OralSegment {
  label: string;
  minutes: number;
  kind: OralBlock["kind"];
  text: string[];
  cue?: string;
}

export interface OralScript {
  persona: PersonaId;
  segments: OralSegment[];
  rebuttals: { concession: string; response: string; authority: string }[];
  totalMinutes: number;
  styleProfileId?: string;
}

export type ResourceKind =
  | "constitution"
  | "statute"
  | "regulation"
  | "rules"
  | "treaty"
  | "guidance"
  | "competition"
  | "citation"
  | "database"
  | "secondary";

export interface LegalResource {
  id: string;
  title: string;
  kind: ResourceKind;
  citation: string;
  jurisdiction: string;
  competitions: CompetitionId[] | "all";
  url?: string;
  official?: boolean;
  note: string;
  provisions?: string[];
  facts?: string;
  holding?: string;
  judges?: string;
}

export type PersonaId = "textualist" | "diplomat" | "commander";

export interface BenchQuestion {
  id: string;
  judge: "hostile" | "academic" | "policy";
  judgeName: string;
  question: string;
  issue: string;
  ideal: string;
  authority: string;
  seconds: number;
}

export interface BenchScore {
  directness: number;
  composure: number;
  address: number;
  authority: number;
  recovery: number;
  total: number;
  notes: string[];
}

export interface BenchTurn {
  question: BenchQuestion;
  answer: string;
  ms: number;
  score: BenchScore;
}
