import { competitionById } from "./competitions";
import type { Authority, CompetitionId, Side } from "../types";
import { AUTHORITIES_A } from "./authorities-a";
import { KENYA_AUTHORITIES } from "./authorities-kenya";
import { AUTHORITIES_B } from "./authorities-b";
import { REFUGEE_AUTHORITIES } from "./authorities-refugee";
import { IHL_AUTHORITIES } from "./authorities-ihl";
import { EAC_AUTHORITIES } from "./authorities-eac";
import { ICC_AUTHORITIES } from "./authorities-icc";
import { EXPANSION_AUTHORITIES } from "./authorities-expansion";
import { IMPEACHMENT_AUTHORITIES } from "./authorities-impeachment";
import { TOPIC_AUTHORITIES } from "./authorities-topics";

export const AUTHORITIES: Authority[] = [...AUTHORITIES_A, ...KENYA_AUTHORITIES, ...AUTHORITIES_B, ...REFUGEE_AUTHORITIES, ...IHL_AUTHORITIES, ...EAC_AUTHORITIES, ...ICC_AUTHORITIES, ...EXPANSION_AUTHORITIES, ...IMPEACHMENT_AUTHORITIES, ...TOPIC_AUTHORITIES];

export const authorityById = (id: string): Authority | undefined =>
  AUTHORITIES.find((a) => a.id === id);

/** Tag vocabulary used to score authorities against an issue text. */
const KEYWORD_TAGS: { re: RegExp; tags: string[] }[] = [
  { re: /jurisdiction|standing|admissib|locus/i, tags: ["jurisdiction", "standing", "admissibility"] },
  { re: /treaty|interpret|article|convention/i, tags: ["treaty-interpretation", "sources"] },
  { re: /customary/i, tags: ["customary-law"] },
  { re: /state responsibility|attribution|effective control/i, tags: ["state-responsibility", "attribution", "effective-control"] },
  { re: /reparation|remedy|compensat|damages/i, tags: ["reparation", "remedy"] },
  { re: /provisional measur|interim/i, tags: ["provisional-measures"] },
  { re: /privacy|personal data|biometric|surveillance/i, tags: ["privacy", "data-protection", "surveillance"] },
  { re: /data transfer|cross.border|adequacy/i, tags: ["data-transfer"] },
  { re: /consent/i, tags: ["consent"] },
  { re: /proportion|necessary|least intrusive/i, tags: ["proportionality", "necessity"] },
  { re: /reasonableness|Wednesbury|unreasonable/i, tags: ["reasonableness"] },
  { re: /natural justice|fair hearing|due process/i, tags: ["natural-justice", "due-process"] },
  { re: /separation of powers|executive|legislature/i, tags: ["separation-of-powers"] },
  { re: /public participation/i, tags: ["public-participation"] },
  { re: /gender|women|equality/i, tags: ["gender-equality"] },
  { re: /expression|speech|media/i, tags: ["expression"] },
  { re: /trade|like product|discriminat/i, tags: ["trade-likeness", "trade-discrimination"] },
  { re: /sps|sanitary|phytosanitary/i, tags: ["sps"] },
  { re: /subsid/i, tags: ["subsidy"] },
  { re: /tbt|technical barrier/i, tags: ["tbt"] },
  { re: /gats|services/i, tags: ["gats"] },
  { re: /environment|climate|pollution/i, tags: ["environment"] },
  { re: /self.determination|decolonis/i, tags: ["self-determination"] },
  { re: /immunity/i, tags: ["immunity"] },
  { re: /use of force|armed/i, tags: ["use-of-force"] },
  { re: /human rights|charter/i, tags: ["human-rights"] },
  { re: /negligence|duty of care/i, tags: ["negligence"] },
  { re: /contract/i, tags: ["contract"] },
  { re: /equity|trust/i, tags: ["equity"] },
  { re: /legality|ultra vires/i, tags: ["legality"] },
  { re: /remedy|prayer|relief/i, tags: ["remedy"] },
  { re: /statutory purpose/i, tags: ["statutory-purpose"] },
  { re: /access to justice/i, tags: ["access-to-justice"] },
];

export function issueTags(text: string, competitionId: CompetitionId): string[] {
  const c = competitionById(competitionId);
  const tags = new Set<string>(c.doctrine);
  for (const k of KEYWORD_TAGS) if (k.re.test(text)) k.tags.forEach((t) => tags.add(t));
  return [...tags];
}

export function classifyStatus(a: Authority, competitionId: CompetitionId): string {
  if (a.system === "INSTRUMENT") return "Binding instrument";
  switch (competitionId) {
    case "jessup":
      if (a.system === "ICJ") return "Authoritative (ICJ Statute art. 59)";
      if (a.system === "WTO") return "Persuasive (comparative)";
      return "Persuasive (national/foreign)";
    case "jackson":
      if (a.system === "WTO") return "Authoritative (adopted reports)";
      if (a.system === "ICJ") return "Persuasive (comparative)";
      return "Persuasive (national/foreign)";
    case "african":
      if (a.system === "AF") return "Binding/Authoritative";
      if (a.system === "EU") return "Persuasive (comparative)";
      return "Persuasive";
    case "odpc":
    case "kenya-sc":
    case "kenya-moots":
      if (a.system === "KE")
        return /Supreme/.test(a.court) ? "Binding" : /Court of Appeal/.test(a.court) ? "Binding" : "Persuasive";
      if (a.system === "UK") return "Persuasive (Judicature Act s.3)";
      if (a.system === "EU") return "Persuasive benchmark";
      if (a.system === "ICJ") return "Persuasive";
      if (a.system === "AF") return "Persuasive/Contextual";
      if (a.system === "WTO") return "Persuasive/Contextual";
      return "Persuasive";
    default:
      if (a.system === "KE")
        return /Supreme/.test(a.court) ? "Binding" : /Court of Appeal/.test(a.court) ? "Binding" : "Persuasive";
      return "Persuasive";
  }
}

export interface MatchedAuthority {
  authority: Authority;
  score: number;
  status: string;
  adverse: boolean;
}

export function matchAuthorities(
  issueText: string,
  competitionId: CompetitionId,
  side: Side,
  limit = 6,
): MatchedAuthority[] {
  const tags = new Set(issueTags(issueText, competitionId));
  const comp = competitionById(competitionId);
  return AUTHORITIES.map((a) => {
    let score = 0;
    for (const t of a.tags) if (tags.has(t)) score += 2;
    for (const t of a.tags) if (comp.doctrine.includes(t)) score += 1;
    if (a.useFor === side || a.useFor === "both") score += 1;
    if (a.adverse) score += 0.5; // keep adverse authorities visible for distinguishing
    return { authority: a, score, status: classifyStatus(a, competitionId), adverse: !!a.adverse };
  })
    .filter((m) => m.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function stressTest(
  matched: MatchedAuthority[],
  competitionId: CompetitionId,
): { primary: MatchedAuthority; fallback: MatchedAuthority | null; distinguish: string }[] {
  return matched.map((m) => {
    const fallback =
      AUTHORITIES.map((a) => ({
        authority: a,
        score: a.tags.filter((t) => m.authority.tags.includes(t)).length,
        status: classifyStatus(a, competitionId),
        adverse: !!a.adverse,
      }))
        .filter((x) => x.authority.id !== m.authority.id && x.score >= 1)
        .sort((a, b) => b.score - a.score)[0] ?? null;
    const distinguish = m.adverse
      ? `Adverse authority — distinguish on ${m.authority.tags.slice(0, 2).join(" and ")}.`
      : `If rejected, fall back to ${fallback ? fallback.authority.title + " " + fallback.authority.citation : "the general principle and the instrument's text"}.`;
    return { primary: m, fallback, distinguish };
  });
}
