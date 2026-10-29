import type { CompetitionId, OralScript, OralSegment, PersonaId, StyleProfile } from "../types";
import { competitionById } from "../data/competitions";
import { matchAuthorities } from "../data/authorities";
import { tintText } from "./style";

export const PERSONA_LABEL: Record<PersonaId, string> = {
  textualist: "The Surgical Textualist",
  diplomat: "The Strategic Diplomat",
  commander: "The Rhetorical Commander",
};

export function personaIntro(persona: PersonaId): string {
  switch (persona) {
    case "textualist":
      return "May it please the Court. The disposition of this case lies in the ordinary meaning of the text. I will anchor each submission to a defined term and invite the bench to test it against the record.";
    case "diplomat":
      return "May it please the Court. I am grateful for the Court's attention. I propose to make three submissions, the first of which the Court may find dispositive. I will concede where the record requires it and pivot where it does not.";
    case "commander":
      return "May it please the Court. This case is about whether the promise of the law survives contact with power. Three submissions: jurisdiction, breach, and remedy. Each is grounded in the text and in the record.";
  }
}

function personaTransform(persona: PersonaId, text: string): string {
  if (persona === "textualist") return text.replace(/we submit/gi, "the text requires");
  if (persona === "diplomat") return text.replace(/we submit/gi, "with respect, we submit");
  return text.replace(/we submit/gi, "the Court is urged");
}

export interface OralsInput {
  competition: CompetitionId;
  issues: string[];
  side: "applicant" | "respondent";
  persona: PersonaId;
  styleProfile?: StyleProfile | null;
}

export function buildOrals(input: OralsInput): OralScript {
  const { competition, issues, side, persona, styleProfile = null } = input;
  const comp = competitionById(competition);
  const sideParty = side === "applicant" ? "Applicant" : "Respondent";
  const topIssues = (issues.length ? issues : ["Whether the impugned conduct is lawful."]).slice(0, 2);

  const segments: OralSegment[] = [];
  // Opening
  segments.push({
    label: comp.oralPlan[0].label,
    minutes: comp.oralPlan[0].minutes,
    kind: "opening",
    text: [
      personaIntro(persona),
      `I appear for the ${sideParty}, ${sideParty === "Applicant" ? "Republic of Auralia" : "the Respondent"}.`,
      `This Court has jurisdiction under the instrument invoked. The threshold is satisfied on the face of the text.`,
      `Roadmap: first, jurisdiction; second, ${topIssues[0] ? topIssues[0].replace(/^whether\s+/i, "").toLowerCase() : "the merits"}; third, remedy.`,
    ],
    cue: "[Pause for judicial note-taking] [Eye contact check]",
  });

  topIssues.forEach((iss, i) => {
    const matched = matchAuthorities(iss, competition, side, 2);
    const auth = matched[0]?.authority;
    const mins = comp.oralPlan[i + 1]?.minutes ?? 5;
    const label = comp.oralPlan[i + 1]?.label ?? `Contention ${ROMAN(i)}`;
    const text = [
      `${comp.appellateAddress}. Turning to contention ${ROMAN(i)}.`,
      personaTransform(persona, `The ${sideParty} submits that ${iss.replace(/^whether\s+/i, "").toLowerCase()}.`),
      auth ? `The authority is ${auth.title}, ${auth.citation}: ${auth.principle}.` : "",
      `On the record, the agreed facts establish the point. (Compromis ¶¶ 1–4.)`,
      `The ${side === "applicant" ? "Respondent's" : "Applicant's"} contrary reading is distinguishable and would empty the provision of content.`,
    ].filter(Boolean);
    segments.push({
      label,
      minutes: mins,
      kind: "contention",
      text: text.map((t) => tintText(t, styleProfile)),
      cue: "[Pivot to sub-issue if interrupted on jurisdiction] [Pause for note-taking]",
    });
  });

  // Conclusion
  const concl = comp.oralPlan.find((b) => b.kind === "conclusion")!;
  segments.push({
    label: concl.label,
    minutes: concl.minutes,
    kind: "conclusion",
    text: [
      `${comp.appellateAddress}. For those reasons, the ${sideParty} respectfully requests the Court to grant the relief sought.`,
      `The ${sideParty} has established jurisdiction, breach and entitlement to reparation.`,
      `I am grateful for the Court's attention.`,
    ],
    cue: "[Final eye contact] [Bow]",
  });

  // Rebuttal reserve
  const reb = comp.oralPlan.find((b) => b.kind === "rebuttal")!;
  segments.push({
    label: reb.label,
    minutes: reb.minutes,
    kind: "rebuttal",
    text: [
      `Reserve for rebuttal: address the ${side === "applicant" ? "Respondent's" : "Applicant's"} strongest point on jurisdiction first, then on the merits.`,
    ],
    cue: "[Listen fully before responding] [No new arguments]",
  });

  const totalMinutes = segments.reduce((a, s) => a + s.minutes, 0);

  // Rebuttal matrix
  const rebuttals = [
    {
      concession: "The Respondent concedes the treaty applies but denies breach.",
      response: "Accept the concession; press the procedural breach (failure to assess and share), which is independent of the substantive outcome.",
      authority: topIssues[0] ? matchAuthorities(topIssues[0], competition, side, 1)[0]?.authority.title ?? "" : "",
    },
    {
      concession: "The Respondent argues the measure is justified by necessity.",
      response: "Put the burden on the Respondent to show the measure was the least restrictive alternative reasonably available.",
      authority: "Bank Mellat v HM Treasury (No 2)",
    },
    {
      concession: "The Respondent challenges attribution of the cyber operation.",
      response: "Accept that attribution requires effective control; the Respondent has not met its burden of showing Auralian control.",
      authority: "Nicaragua v United States",
    },
  ];

  return {
    persona,
    segments,
    rebuttals,
    totalMinutes,
    styleProfileId: styleProfile?.id,
  };
}

function ROMAN(i: number): string {
  return ["I", "II", "III", "IV"][i] ?? String(i + 1);
}
