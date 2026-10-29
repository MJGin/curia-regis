import type { Authority } from "../types";

/**
 * Refugee-law authority drawn from a championship respondent's memorial (SC001,
 * Supreme Court of Kenya Moot 2025). Added so the matrix can support refugee and
 * migration moots. Principles are stated conservatively in our own words.
 */
export const REFUGEE_AUTHORITIES: Authority[] = [
  {
    id: "ngos-coord",
    title: "NGOs Co-ordination Board v EG & 4 others",
    citation: "[2023] KESC 17 (KLR)",
    court: "Supreme Court of Kenya",
    year: 2023,
    system: "KE",
    tags: ["reasonableness", "constitutional-interpretation", "legality", "proportionality"],
    principle:
      "Administrative action must be lawful, reasonable and procedurally fair; the analysis asks whether the decision was unreasonable, unlawful or disproportionate.",
    useFor: "respondent",
  },
  {
    id: "mbalu-mutava",
    title: "Judicial Service Commission v Mbalu Mutava & another",
    citation: "[2015] KECA 741 (KLR)",
    court: "Court of Appeal of Kenya",
    year: 2015,
    system: "KE",
    tags: ["natural-justice", "proportionality", "reasonableness", "legality"],
    principle:
      "Procedural fairness is preserved where the affected person is heard, reasons are given and independent review is available; fairness is balanced with the wider public interest.",
    useFor: "respondent",
  },
  {
    id: "saisi",
    title: "Saisi & 7 others v Director of Public Prosecutions & 2 others",
    citation: "[2023] KESC 6 (KLR)",
    court: "Supreme Court of Kenya",
    year: 2023,
    system: "KE",
    tags: ["natural-justice", "remedy", "access-to-justice", "legality"],
    principle:
      "Fairness is secured where parties retain meaningful access to remedies capable of review; an administrative process is not unfair merely because it is efficient.",
    useFor: "respondent",
  },
  {
    id: "john-florence",
    title: "John Florence Maritime Services Limited & another v Cabinet Secretary for Transport & Infrastructure & 3 others",
    citation: "[2021] KESC 39 (KLR)",
    court: "Supreme Court of Kenya",
    year: 2021,
    system: "KE",
    tags: ["natural-justice", "legality", "reasonableness"],
    principle:
      "The justiciable elements of a fair hearing are an opportunity to be heard that is reasonable; administrative determinations are governed by Article 47, not the full trial guarantees of Article 50.",
    useFor: "respondent",
  },
  {
    id: "kandie",
    title: "Kandie v Alassane BA & Another",
    citation: "[2017] KESC 13 (KLR) (Petition 2 of 2015)",
    court: "Supreme Court of Kenya",
    year: 2017,
    system: "KE",
    tags: ["proportionality", "reasonableness", "legality", "constitutional-interpretation"],
    principle:
      "The test for limiting rights is one of reasonableness and justification, requiring a balancing of competing interests rather than a mechanical approach.",
    useFor: "respondent",
  },
  {
    id: "mutheu-khimulu",
    title: "Mutheu Agatha Khimulu v Raheem Mehdi Aziz Azad & 4 others",
    citation: "Petition No 2 E003 of 2022",
    court: "High Court of Kenya",
    year: 2022,
    system: "KE",
    tags: ["human-rights", "remedy", "reasonableness"],
    principle:
      "The best interests of the child enshrine the right to parental care; the concept is a primary, not exclusive, consideration to be balanced against competing interests.",
    useFor: "respondent",
  },
  {
    id: "kituo-sheria",
    title: "Attorney General v Kituo Cha Sheria & 7 others",
    citation: "[2017] KECA 773 (KLR)",
    court: "Court of Appeal of Kenya",
    year: 2017,
    system: "KE",
    tags: ["proportionality", "reasonableness", "legality", "human-rights"],
    principle:
      "A security measure must be supported by concrete evidence; an encampment directive that is speculative and unsupported by evidence is unlawful.",
    useFor: "applicant",
    adverse: true,
  },
  {
    id: "rck-refugee",
    title: "Refugee Consortium of Kenya & Another (Suing on Behalf of DL (Minor) & 47 Others) v Attorney General & 2 Others",
    citation: "[2015] KEHC (Petition)",
    court: "High Court of Kenya",
    year: 2015,
    system: "KE",
    tags: ["human-rights", "remedy", "proportionality", "reasonableness"],
    principle:
      "The best interests of the child are not an absolute bar to implementing legitimate national security and refugee control measures; they are a primary consideration to be balanced.",
    useFor: "respondent",
  },
  {
    id: "chahal",
    title: "Chahal v United Kingdom",
    citation: "(1997) 23 EHRR 413 (ECtHR)",
    court: "European Court of Human Rights",
    year: 1997,
    system: "EU",
    tags: ["human-rights", "proportionality", "privacy", "remedy"],
    principle:
      "Non-refoulement under the European Convention is absolute, but the narrower protection under the Refugee Convention permits derogations on security grounds where procedural safeguards are respected.",
    useFor: "respondent",
  },
  {
    id: "suresh",
    title: "Suresh v Canada (Minister of Citizenship and Immigration)",
    citation: "[2002] 1 SCR 3 (Supreme Court of Canada)",
    court: "Supreme Court of Canada",
    year: 2002,
    system: "EU",
    tags: ["human-rights", "proportionality", "reasonableness", "remedy"],
    principle:
      "States may exclude individuals from refugee protection where they are implicated in terrorism or serious threats to national security, provided procedural safeguards are respected.",
    useFor: "respondent",
  },
  {
    id: "ihrrda-angola",
    title: "Institute for Human Rights and Development in Africa v Angola",
    citation: "(2008) AHRLR 43 (ACHPR 2008)",
    court: "African Commission on Human and Peoples' Rights",
    year: 2008,
    system: "AF",
    tags: ["human-rights", "remedy", "expression", "proportionality"],
    principle:
      "Expulsions and adverse immigration decisions must be subject to effective review mechanisms; the absence of review renders the measure unlawful.",
    useFor: "applicant",
    adverse: true,
  },
  {
    id: "mss-belgium",
    title: "M.S.S. v Belgium and Greece",
    citation: "App no 30696/09 (ECtHR, 21 January 2011) 53 EHRR 2",
    court: "European Court of Human Rights",
    year: 2011,
    system: "EU",
    tags: ["human-rights", "remedy", "proportionality", "reasonableness"],
    principle:
      "International protection systems must be practical and effective rather than theoretical or illusory; meaningful access to protection is the governing standard.",
    useFor: "applicant",
    adverse: true,
  },
  {
    id: "maaouia",
    title: "Maaouia v France",
    citation: "App no 39652/98 (ECtHR, 5 October 2000) 33 EHRR 42",
    court: "European Court of Human Rights",
    year: 2000,
    system: "EU",
    tags: ["human-rights", "legality", "reasonableness"],
    principle:
      "Disputes concerning the entry, stay and deportation of aliens do not generally fall within the scope of the right to a fair hearing, provided that effective remedies exist elsewhere in the legal system.",
    useFor: "respondent",
  },
  {
    id: "kudla",
    title: "Kudła v Poland (GC)",
    citation: "App no 30210/96, ECHR 2000-XI",
    court: "European Court of Human Rights (Grand Chamber)",
    year: 2000,
    system: "EU",
    tags: ["human-rights", "remedy", "proportionality"],
    principle:
      "Overcrowding and poor conditions of detention may amount to inhuman or degrading treatment where they exceed the threshold of severity, taking account of duration and cumulative effect.",
    useFor: "applicant",
    adverse: true,
  },
];
