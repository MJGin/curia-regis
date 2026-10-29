export interface Topic {
  id: string;
  name: string;
  blurb: string;
  icon: string;
}

export const TOPICS: Topic[] = [
  { id: "jurisdiction", name: "Jurisdiction & Admissibility", blurb: "Locus standi, jurisdiction, admissibility, preliminary objections.", icon: "⚖" },
  { id: "constitutional", name: "Constitutional Interpretation", blurb: "Constitutional supremacy, values, separation of powers, public participation.", icon: "📜" },
  { id: "impeachment", name: "Impeachment", blurb: "Removal of governors, deputy presidents and other state officers.", icon: "🏛" },
  { id: "administrative", name: "Administrative Law", blurb: "Judicial review, reasonableness, natural justice, proportionality.", icon: "📋" },
  { id: "human-rights", name: "Human Rights", blurb: "Fundamental rights, limitations, remedies, equality.", icon: "🕊" },
  { id: "privacy", name: "Privacy & Data Protection", blurb: "Data protection, surveillance, cross-border transfers, consent.", icon: "🔒" },
  { id: "criminal", name: "Criminal Law", blurb: "Offences, defences, procedure, sentencing.", icon: "🔍" },
  { id: "contract", name: "Contract", blurb: "Formation, interpretation, breach, remedies.", icon: "📝" },
  { id: "tort", name: "Tort", blurb: "Negligence, duty of care, defamation, privacy torts.", icon: "⚠" },
  { id: "equity", name: "Equity & Trusts", blurb: "Trusts, tracing, fiduciary duties, remedies.", icon: "⚖" },
  { id: "international", name: "International Law", blurb: "Treaties, custom, state responsibility, ICJ, WTO, human rights.", icon: "🌐" },
  { id: "refugee", name: "Refugee & Migration", blurb: "Non-refoulement, asylum, refugee status determination.", icon: "🛂" },
  { id: "evidence", name: "Evidence & Procedure", blurb: "Admissibility, burden of proof, civil and criminal procedure.", icon: "📂" },
  { id: "land-env", name: "Land & Environment", blurb: "Land rights, environment, evictions, planning.", icon: "🌳" },
  { id: "commercial", name: "Commercial & Corporate", blurb: "Companies, insolvency, commercial disputes.", icon: "💼" },
  { id: "employment", name: "Employment & Labour", blurb: "Employment rights, labour disputes, workplace privacy.", icon: "👷" },
  { id: "ip", name: "Intellectual Property", blurb: "Copyright, patents, trademarks, IP enforcement.", icon: "💡" },
  { id: "family", name: "Family Law", blurb: "Marriage, children, succession, family property.", icon: "👨‍👩‍👧" },
  { id: "tax", name: "Tax", blurb: "Taxation, revenue, customs.", icon: "💰" },
  { id: "general", name: "General / Other", blurb: "Authorities not yet categorised.", icon: "📚" },
];

const TAG_TO_TOPIC: Record<string, string> = {
  jurisdiction: "jurisdiction",
  standing: "jurisdiction",
  admissibility: "jurisdiction",
  "constitutional-interpretation": "constitutional",
  "separation-of-powers": "constitutional",
  "public-participation": "constitutional",
  "gender-equality": "human-rights",
  impeachment: "impeachment",
  reasonableness: "administrative",
  legality: "administrative",
  "natural-justice": "administrative",
  "statutory-purpose": "administrative",
  deference: "administrative",
  "access-to-justice": "administrative",
  "human-rights": "human-rights",
  expression: "human-rights",
  "self-determination": "human-rights",
  "remedy": "human-rights",
  privacy: "privacy",
  "data-protection": "privacy",
  "data-transfer": "privacy",
  surveillance: "privacy",
  consent: "privacy",
  "criminal-law": "criminal",
  contract: "contract",
  negligence: "tort",
  tort: "tort",
  equity: "equity",
  "treaty-interpretation": "international",
  "customary-law": "international",
  "state-responsibility": "international",
  reparation: "international",
  "use-of-force": "international",
  immunity: "international",
  "provisional-measures": "international",
  sources: "international",
  precedent: "international",
  "good-faith": "international",
  attribution: "international",
  "effective-control": "international",
  "trade-likeness": "commercial",
  "trade-discrimination": "commercial",
  necessity: "international",
  sps: "commercial",
  subsidy: "commercial",
  tbt: "commercial",
  gats: "commercial",
  environment: "land-env",
  "evidence": "evidence",
  "common-law": "general",
  "open-justice": "administrative",
  refugee: "refugee",
};

export function topicOf(tags: string[]): string {
  for (const t of tags) {
    if (TAG_TO_TOPIC[t]) return TAG_TO_TOPIC[t];
  }
  return "general";
}

export const topicById = (id: string): Topic => TOPICS.find((t) => t.id === id) ?? TOPICS[TOPICS.length - 1];
