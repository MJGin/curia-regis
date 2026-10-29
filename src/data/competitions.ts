import type { Competition, CompetitionId } from "../types";

const JESSUP: Competition = {
  id: "jessup",
  name: "Philip C. Jessup International Law Moot Court Competition",
  short: "Jessup",
  forum: "International Court of Justice",
  law: "Public international law — ICJ Statute, VCLT, customary international law, UN treaty regimes",
  citationStandard: "OSCOLA / Bluebook; 9,000-word memorial ceiling (confirm against the current Rules)",
  wordLimit: 9000,
  oralPlan: [
    { label: "Opening appearance & roadmap", minutes: 2, kind: "opening" },
    { label: "Contention I", minutes: 5, kind: "contention" },
    { label: "Contention II", minutes: 5, kind: "contention" },
    { label: "Conclusion & prayers", minutes: 2, kind: "conclusion" },
    { label: "Rebuttal / sur-rebuttal reserve", minutes: 2, kind: "rebuttal" },
  ],
  jurisdictionHeading: "Statement of Jurisdiction",
  factsHeading: "Statement of Facts",
  summaryHeading: "Summary of Pleadings",
  argumentLabel: "Pleading",
  prayerHeading: "Prayer for Relief",
  prayer: [
    "For the foregoing reasons, the {applicant} respectfully requests the Court to adjudge and declare that the conduct of the {respondent} is inconsistent with its obligations under international law.",
    "The {applicant} further requests the Court to order cessation of the wrongful acts and full reparation for the injury caused, in the form and amount to be determined by the Court in a subsequent phase.",
    "The {applicant} reserves the right to supplement the present pleadings should new facts or authorities emerge.",
  ],
  doctrine: [
    "jurisdiction",
    "treaty-interpretation",
    "customary-law",
    "state-responsibility",
    "reparation",
    "provisional-measures",
  ],
  appellateAddress: "May it please the Court",
  notes:
    "Judges sit as the ICJ. Every submission should open with the jurisdictional threshold, treat the VCLT as the interpretive master-key, and distinguish PCIJ authority from modern practice.",
};

const JACKSON: Competition = {
  id: "jackson",
  name: "John H. Jackson Moot Court Competition (WTO)",
  short: "Jackson (WTO)",
  forum: "WTO Dispute Settlement — Panel and Appellate Body simulation",
  law: "International trade law — GATT 1994, GATS, SPS, TBT, SCM and the DSU",
  citationStandard: "OSCOLA; WTO document symbols (WT/DS…/AB/R) with paragraph pinpoints",
  wordLimit: 7000,
  oralPlan: [
    { label: "Opening statement & roadmap", minutes: 2, kind: "opening" },
    { label: "Contention I — measures & likeness", minutes: 5, kind: "contention" },
    { label: "Contention II — justification & necessity", minutes: 5, kind: "contention" },
    { label: "Conclusion & request for findings", minutes: 2, kind: "conclusion" },
    { label: "Rebuttal reserve", minutes: 2, kind: "rebuttal" },
  ],
  jurisdictionHeading: "Statement of the Case and Jurisdiction",
  factsHeading: "Statement of Facts",
  summaryHeading: "Summary of Arguments",
  argumentLabel: "Submission",
  prayerHeading: "Request for Findings and Recommendations",
  prayer: [
    "For the foregoing reasons, the {applicant} requests the Panel to find that the measures at issue are inconsistent with the covered agreements identified above.",
    "The {applicant} further requests the Panel to recommend that the {respondent} bring its measures into conformity with its WTO obligations pursuant to Article 19.1 of the DSU.",
    "The {applicant} reserves the right to refine its request for findings in light of the Panel's rulings on preliminary matters.",
  ],
  doctrine: ["trade-likeness", "trade-discrimination", "necessity", "sps", "subsidy", "tbt", "gats", "environment"],
  appellateAddress: "Mr Chairman, Members of the Panel",
  notes:
    "The DSU is the procedural spine: Articles 3.2, 11, 17.6 and 19 frame every remedial ask. Adopted AB reports are treated as authoritative, not formally binding as precedent.",
};

const KENYA_SC: Competition = {
  id: "kenya-sc",
  name: "Supreme Court of Kenya / National Constitutional Moot",
  short: "Kenya Constitutional",
  forum: "Supreme Court of Kenya (appellate) or High Court (constitutional petition)",
  law: "Constitution of Kenya 2010 (arts 10, 20, 22, 23, 159, 163, 165); Judicature Act (Cap 8); binding Supreme Court and Court of Appeal authority",
  citationStandard: "eKLR with neutral citation; KALCI for institutional writing",
  wordLimit: 6000,
  oralPlan: [
    { label: "Opening & jurisdictional roadmap", minutes: 2, kind: "opening" },
    { label: "Contention I — constitutional interpretation", minutes: 5, kind: "contention" },
    { label: "Contention II — rights & remedy", minutes: 5, kind: "contention" },
    { label: "Conclusion & prayers", minutes: 2, kind: "conclusion" },
    { label: "Rebuttal reserve", minutes: 2, kind: "rebuttal" },
  ],
  jurisdictionHeading: "Statement of Jurisdiction",
  factsHeading: "Statement of Facts",
  summaryHeading: "Summary of Issues and Arguments",
  argumentLabel: "Ground",
  prayerHeading: "Prayers Sought",
  prayer: [
    "For the foregoing reasons, the {applicant} prays that this Honourable Court be pleased to declare that the impugned conduct violates Articles 10, 27 and 47 of the Constitution.",
    "The {applicant} further prays for an order of certiorari quashing the impugned decision, and for such consequential orders as the Court considers just and expedient.",
    "The {applicant} prays for costs of and incidental to this petition.",
  ],
  doctrine: [
    "constitutional-interpretation",
    "proportionality",
    "public-participation",
    "separation-of-powers",
    "legality",
    "remedy",
    "gender-equality",
  ],
  appellateAddress: "May it please this Honourable Court",
  notes:
    "Anchor every ground in a constitutional text and a binding Supreme Court decision. Treat UK authority as persuasive under section 3 of the Judicature Act, never as binding.",
};

const ODPC: Competition = {
  id: "odpc",
  name: "ODPC / Privacy Moot Court",
  short: "ODPC Privacy",
  forum: "Office of the Data Protection Commissioner / Data Protection Tribunal",
  law: "Data Protection Act 2019 (Kenya); GDPR and CJEU/ECtHR benchmarks; digital rights and cross-border transfer",
  citationStandard: "eKLR and OSCOLA; DPA section pinpoints and GDPR article references",
  wordLimit: 5000,
  oralPlan: [
    { label: "Opening & statutory roadmap", minutes: 2, kind: "opening" },
    { label: "Contention I — lawful basis & necessity", minutes: 5, kind: "contention" },
    { label: "Contention II — transfer safeguards & remedies", minutes: 5, kind: "contention" },
    { label: "Conclusion & prayers", minutes: 2, kind: "conclusion" },
    { label: "Rebuttal reserve", minutes: 2, kind: "rebuttal" },
  ],
  jurisdictionHeading: "Jurisdiction of the Commissioner",
  factsHeading: "Statement of Facts",
  summaryHeading: "Summary of Submissions",
  argumentLabel: "Submission",
  prayerHeading: "Relief Sought",
  prayer: [
    "For the foregoing reasons, the {applicant} respectfully submits that the Commissioner should find the processing to be unlawful and in breach of the Act.",
    "The {applicant} invites the Commissioner to issue an enforcement notice requiring the {respondent} to suspend the impugned transfers, erase the data unlawfully held, and submit to an audit.",
    "The {applicant} seeks such further or other relief as the Commissioner considers just.",
  ],
  doctrine: ["privacy", "data-protection", "data-transfer", "surveillance", "proportionality", "legality", "remedy"],
  appellateAddress: "Mr Commissioner, Members of the Tribunal",
  notes:
    "The DPA is the primary instrument; GDPR and Strasbourg/Luxembourg authority are benchmarks of best practice, not binding law in Kenya. Section 31 (DPIA) and Part VI (transfers) should be addressed expressly.",
};

const AFRICAN: Competition = {
  id: "african",
  name: "All-African Human Rights Moot Court Competition",
  short: "African Human Rights",
  forum: "African Court on Human and Peoples' Rights (or the African Commission)",
  law: "African Charter on Human and Peoples' Rights; ACHPR decisions; African Court jurisprudence; universality and systemic interpretation",
  citationStandard: "OSCOLA with AHRLR/ACtHPR citations",
  wordLimit: 7000,
  oralPlan: [
    { label: "Opening & admissibility map", minutes: 2, kind: "opening" },
    { label: "Contention I — admissibility & standing", minutes: 5, kind: "contention" },
    { label: "Contention II — substantive rights", minutes: 5, kind: "contention" },
    { label: "Conclusion & prayers", minutes: 2, kind: "conclusion" },
    { label: "Rebuttal reserve", minutes: 2, kind: "rebuttal" },
  ],
  jurisdictionHeading: "Admissibility and Jurisdiction",
  factsHeading: "Statement of Facts",
  summaryHeading: "Summary of Submissions",
  argumentLabel: "Submission",
  prayerHeading: "Prayers",
  prayer: [
    "For the foregoing reasons, the {applicant} respectfully requests the Court to find that the {respondent} has violated Articles 1, 2, 4, 5, 7 and 24 of the African Charter.",
    "The {applicant} requests the Court to order restitution, compensation and guarantees of non-repetition, together with any provisional measures the Court considers necessary.",
    "The {applicant} seeks such further relief as the Court deems just and equitable.",
  ],
  doctrine: ["human-rights", "admissibility", "standing", "expression", "privacy", "self-determination", "remedy"],
  appellateAddress: "May it please the Court",
  notes:
    "Admissibility under Article 56 of the Charter is a compulsory gateway. Cite ACHPR soft-law and African Court judgments ahead of ECtHR comparisons.",
};

const KENYA_MOOTS: Competition = {
  id: "kenya-moots",
  name: "All Kenyan Moot Court Competitions",
  short: "Kenyan Moots",
  forum: "Kenyan national moot forums (High Court, Court of Appeal and specialist tribunals)",
  law: "Constitution of Kenya 2010; Kenyan statutes and subsidiary legislation; common law and equity as received under the Judicature Act (Cap 8)",
  citationStandard: "eKLR with neutral citations; KALCI for institutional writing",
  wordLimit: 5000,
  oralPlan: [
    { label: "Opening & roadmap", minutes: 2, kind: "opening" },
    { label: "Contention I", minutes: 4, kind: "contention" },
    { label: "Contention II", minutes: 4, kind: "contention" },
    { label: "Conclusion & prayers", minutes: 2, kind: "conclusion" },
    { label: "Rebuttal reserve", minutes: 2, kind: "rebuttal" },
  ],
  jurisdictionHeading: "Statement of Jurisdiction",
  factsHeading: "Statement of Facts",
  summaryHeading: "Summary of Arguments",
  argumentLabel: "Ground",
  prayerHeading: "Prayers",
  prayer: [
    "For the foregoing reasons, the {applicant} prays that this Honourable Tribunal be pleased to grant the reliefs sought herein.",
    "The {applicant} prays for such further or other orders as the Tribunal may deem just and expedient.",
  ],
  doctrine: ["constitutional-interpretation", "legality", "reasonableness", "proportionality", "natural-justice", "remedy"],
  appellateAddress: "May it please the Court",
  notes:
    "Use for any Kenyan national moot (KSL, Kabarak, Kenyatta, Strathmore and specialist tribunal moots). Adjust the forum line to match the competition's own rules.",
};

const CUSTOM: Competition = {
  id: "custom",
  name: "Custom Moot Mode",
  short: "Custom",
  forum: "Forum defined by the team",
  law: "Governing law defined by the team",
  citationStandard: "Citation standard defined by the team",
  wordLimit: 6000,
  oralPlan: [
    { label: "Opening & roadmap", minutes: 2, kind: "opening" },
    { label: "Contention I", minutes: 5, kind: "contention" },
    { label: "Contention II", minutes: 5, kind: "contention" },
    { label: "Conclusion & prayers", minutes: 2, kind: "conclusion" },
    { label: "Rebuttal reserve", minutes: 2, kind: "rebuttal" },
  ],
  jurisdictionHeading: "Statement of Jurisdiction",
  factsHeading: "Statement of Facts",
  summaryHeading: "Summary of Arguments",
  argumentLabel: "Submission",
  prayerHeading: "Prayer for Relief",
  prayer: [
    "For the foregoing reasons, the {applicant} respectfully requests the Tribunal to grant the relief sought.",
    "The {applicant} seeks such further or other relief as the Tribunal considers just.",
  ],
  doctrine: ["jurisdiction", "treaty-interpretation", "proportionality", "legality", "remedy"],
  appellateAddress: "May it please the Tribunal",
  notes:
    "Set your own forum, governing law, procedural rules and citation standard. Detection and authority matching fall back to general principles.",
};

export const COMPETITIONS: Competition[] = [
  JESSUP,
  JACKSON,
  KENYA_SC,
  ODPC,
  AFRICAN,
  KENYA_MOOTS,
  CUSTOM,
];

export const competitionById = (id: CompetitionId): Competition =>
  COMPETITIONS.find((c) => c.id === id) ?? JESSUP;
