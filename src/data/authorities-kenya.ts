import type { Authority } from "../types";

/**
 * Kenyan authority — names, neutral citations and links verified against Kenya Law
 * (new.kenyalaw.org) on 29 October 2026. Where a decision pre-dates the neutral-citation
 * collection (e.g. Mukisa Biscuit), the traditional report citation is used and the entry
 * is marked as not linkable.
 */
export const KENYA_AUTHORITIES: Authority[] = [
  {
    id: "anarita",
    title: "Anarita Karimi Njeru v Republic",
    citation: "[1979] KEHC 30 (KLR) (29 January 1979) (Misc Criminal Application 4 of 1979)",
    court: "High Court of Kenya",
    year: 1979,
    system: "KE",
    tags: ["constitutional-interpretation", "standing", "evidence"],
    principle:
      "A constitutional petition must set out, with a reasonable degree of precision, the provision infringed, the manner of infringement and the relief sought, so that the respondent can understand and answer the case.",
    useFor: "respondent",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kehc/1979/30/eng@1979-01-29",
    note: "Frequently cited as (1979) KLR 154. Kenya Law records the decision as a High Court judgment.",
  },
  {
    id: "karume",
    title: "Speaker of the National Assembly v Karume",
    citation: "[1992] KECA 42 (KLR) (29 May 1992) (Civil Application 92 of 1992)",
    court: "Court of Appeal of Kenya",
    year: 1992,
    system: "KE",
    tags: ["constitutional-interpretation", "separation-of-powers", "jurisdiction"],
    principle:
      "Where the Constitution prescribes a specific procedure or forum, that procedure must be followed; the court will not permit a party to achieve indirectly, through a different route, what the Constitution requires to be done another way.",
    useFor: "respondent",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/keca/1992/42/eng@1992-05-29",
  },
  {
    id: "trusted-society",
    title: "Trusted Society of Human Rights Alliance v Attorney General & 2 others",
    citation: "[2012] KEHC 2480 (KLR) (20 September 2012) (Petition 229 of 2012)",
    court: "High Court of Kenya (Constitutional and Human Rights Division)",
    year: 2012,
    system: "KE",
    tags: ["constitutional-interpretation", "separation-of-powers", "public-participation", "reasonableness"],
    principle:
      "Constitutional interpretation begins with the text and structure and is informed by the values in Article 10; substantive review asks whether the process and outcome comport with the Constitution, not merely whether legal power existed.",
    useFor: "applicant",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kehc/2012/2480/eng@2012-09-20",
  },
  {
    id: "mumo-matemu",
    title: "Matemu v Trusted Society of Human Rights Alliance & 5 others",
    citation: "[2013] KECA 445 (KLR) (26 July 2013) (Civil Appeal 290 of 2012)",
    court: "Court of Appeal of Kenya",
    year: 2013,
    system: "KE",
    tags: ["constitutional-interpretation", "evidence", "standing", "separation-of-powers"],
    principle:
      "A constitutional challenge must be pleaded with precision and proved by evidence; where the Constitution entrusts a decision to another organ, the court reviews legality and process rather than substituting its own assessment of merit.",
    useFor: "respondent",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/keca/2013/445/eng@2013-07-26",
  },
  {
    id: "iiec-advisory",
    title: "In the Matter of the Interim Independent Electoral Commission",
    citation: "[2011] KESC 1 (KLR) (20 December 2011) (Advisory Opinion Application 2 of 2011)",
    court: "Supreme Court of Kenya",
    year: 2011,
    system: "KE",
    tags: ["constitutional-interpretation", "separation-of-powers", "jurisdiction", "public-participation"],
    principle:
      "The Supreme Court's advisory jurisdiction is a special jurisdiction, exercisable only within Article 163(6) and confined to matters of public importance concerning devolved government; it is not a general consultative power.",
    useFor: "respondent",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kesc/2011/1/eng@2011-12-20",
  },
  {
    id: "gender-advisory",
    title:
      "In the Matter of the Principle of Gender Representation in the National Assembly and the Senate",
    citation: "[2012] KESC 5 (KLR) (11 December 2012) (Advisory Opinion Application 2 of 2012)",
    court: "Supreme Court of Kenya",
    year: 2012,
    system: "KE",
    tags: ["gender-equality", "constitutional-interpretation", "public-participation", "remedy"],
    principle:
      "Article 81(b) creates a binding constitutional obligation to secure the two-thirds gender principle; its realisation is progressive and requires legislative and policy measures, not judicial legislation.",
    useFor: "applicant",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kesc/2012/5/eng@2012-12-11",
  },
  {
    id: "royal-media",
    title:
      "Communications Commission of Kenya & 5 others v Royal Media Services Ltd & 5 others",
    citation:
      "[2014] KESC 53 (KLR) (29 September 2014) (Petitions 14, 14A, 14B and 14C of 2014, Consolidated)",
    court: "Supreme Court of Kenya",
    year: 2014,
    system: "KE",
    tags: ["constitutional-interpretation", "expression", "separation-of-powers", "legality"],
    principle:
      "Regulatory action affecting media freedom must be anchored in law and pursue a legitimate aim; the Court emphasised pluralism and freedom of expression while affirming the regulator's statutory mandate.",
    useFor: "both",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kesc/2014/53/eng@2014-09-29",
  },
  {
    id: "fida",
    title: "Federation of Women Lawyers Kenya (FIDA-K) & 5 others v Attorney General & 3 others",
    citation: "[2011] KEHC 2099 (KLR) (25 August 2011) (Petition 102 of 2011)",
    court: "High Court of Kenya",
    year: 2011,
    system: "KE",
    tags: ["gender-equality", "constitutional-interpretation", "customary-law", "remedy"],
    principle:
      "Customary law is subordinate to the Constitution; customary practices that deny women equal protection in succession and family matters cannot survive the guarantees of equality and non-discrimination.",
    useFor: "applicant",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kehc/2011/2099/eng@2011-08-25",
  },
  {
    id: "creaw",
    title: "Centre for Rights Education and Awareness (CREAW) & 7 others v Attorney General",
    citation: "[2011] KEHC 4297 (KLR) (3 February 2011) (Petition 16 of 2011)",
    court: "High Court of Kenya",
    year: 2011,
    system: "KE",
    tags: ["gender-equality", "constitutional-interpretation", "remedy", "public-participation"],
    principle:
      "Articles 27 and 81(b) permit, and in appropriate circumstances require, temporary special measures to remedy structural inequality; administrative inconvenience does not justify indefinite delay.",
    useFor: "applicant",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kehc/2011/4297/eng@2011-02-03",
  },
  {
    id: "nubian",
    title: "Nubian Rights Forum & 2 others v Attorney General & 15 others",
    citation:
      "[2020] KEHC 8772 (KLR) (30 January 2020) (Consolidated Petitions 56, 58 and 59 of 2019)",
    court: "High Court of Kenya (Constitutional and Human Rights Division)",
    year: 2020,
    system: "KE",
    tags: ["privacy", "data-protection", "public-participation", "proportionality", "remedy"],
    principle:
      "A national biometric identification programme requires a clear statutory basis, a data protection impact assessment, safeguards against function creep and meaningful public participation before rollout; privacy limits must be necessary and proportionate.",
    useFor: "applicant",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kehc/2020/8772/eng@2020-01-30",
  },
  {
    id: "worldcoin",
    title:
      "Office of the Data Protection Commissioner v Tools for Humanity Corporation (Worldcoin) & 2 others",
    citation: "[2024] KEHC 312 (KLR) (25 January 2024) (Miscellaneous Criminal Application E315 of 2023)",
    court: "High Court of Kenya",
    year: 2024,
    system: "KE",
    tags: ["data-protection", "privacy", "data-transfer", "consent", "remedy"],
    principle:
      "Processing of biometric and financial data must satisfy the Data Protection Act's lawful-basis, transparency, security and transfer safeguards; the Commissioner may take enforcement action where the controller has not demonstrated compliance.",
    useFor: "applicant",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kehc/2024/312/eng@2024-01-25",
  },
  {
    id: "lillian-s",
    title: 'Owners of the Motor Vessel "Lillian S" v Caltex Oil (Kenya) Ltd',
    citation: "[1989] KECA 48 (KLR) (17 November 1989) (Civil Appeal 50 of 1989)",
    court: "Court of Appeal of Kenya",
    year: 1989,
    system: "KE",
    tags: ["jurisdiction", "standing", "evidence"],
    principle:
      "Jurisdiction is everything: a court must satisfy itself of jurisdiction at the threshold, because a decision reached without jurisdiction is a nullity however well reasoned.",
    useFor: "both",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/keca/1989/48/eng@1989-11-17",
  },
  {
    id: "ndii",
    title: "Ndii & others v Attorney General & others",
    citation:
      "[2021] KEHC 9746 (KLR) (13 May 2021) (Consolidated Petitions E282, 397, E400, E401, E402, E416 and E426 of 2020)",
    court: "High Court of Kenya (Constitutional and Human Rights Division)",
    year: 2021,
    system: "KE",
    tags: ["constitutional-interpretation", "public-participation", "separation-of-powers", "remedy"],
    principle:
      "A constitutional amendment process must comply with the Constitution's own architecture, including the requirement of public participation and the allocation of constituent power; a process that bypasses those requirements is invalid.",
    useFor: "applicant",
    sourceUrl: "https://new.kenyalaw.org/akn/ke/judgment/kehc/2021/9746/eng@2021-05-13",
    note: "Popularly known as the BBI judgment. Verify the current appellate status before relying on it.",
  },
  {
    id: "mukisa",
    title: "Mukisa Biscuit Manufacturing Co Ltd v West End Distributors Ltd",
    citation: "(1969) EA 696 (East African Court of Appeal)",
    court: "East African Court of Appeal",
    year: 1969,
    system: "KE",
    tags: ["jurisdiction", "evidence"],
    principle:
      "A preliminary objection must raise a pure point of law capable of disposing of the matter without contesting the facts; anything requiring evidence is not a proper preliminary objection.",
    useFor: "both",
    note: "Pre-dates Kenya Law's neutral-citation collection; ex tempore ruling, reported in the East Africa Law Reports.",
  },
];
