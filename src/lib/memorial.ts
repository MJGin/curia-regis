import type {
  Authority,
  CompetitionId,
  DocBlock,
  MemorialDoc,
  MemorialSection,
  ParsedCompromis,
  Side,
  StyleProfile,
} from "../types";
import { competitionById } from "../data/competitions";
import { matchAuthorities, stressTest } from "../data/authorities";
import type { MatchedAuthority } from "../data/authorities";
import { tintText } from "./style";
import { wordCount } from "./text";

const ROMAN = ["I", "II", "III", "IV", "V"];

function groupLabel(a: Authority): string {
  if (a.system === "INSTRUMENT") return "I. Treaties, Constitutions and Statutes";
  if (a.system === "KE") return "II. Kenyan Authority";
  if (a.system === "UK") return "III. English Authority (Persuasive)";
  if (a.system === "ICJ") return "IV. International Court of Justice";
  if (a.system === "WTO") return "V. WTO Dispute Settlement";
  if (a.system === "AF") return "VI. African Human Rights";
  if (a.system === "EU") return "VII. European Benchmarks";
  return "VIII. Other";
}

function asProposition(issue: string): string {
  let s = issue.trim();
  if (/^whether\b/i.test(s)) s = s.replace(/^whether\s+/i, "");
  if (s.length) s = s.charAt(0).toLowerCase() + s.slice(1);
  return s.replace(/\?$/, "");
}

function block(kind: DocBlock["kind"], text: string, cite?: string): DocBlock {
  return { kind, text, cite };
}

export interface MemorialInput {
  competition: CompetitionId;
  side: Side;
  parsed: ParsedCompromis;
  styleProfile?: StyleProfile | null;
  counsel?: string;
}

export function buildMemorial(input: MemorialInput): MemorialDoc {
  const { competition, side, parsed, styleProfile = null, counsel } = input;
  const comp = competitionById(competition);
  const sideParty = side === "applicant" ? "Applicant" : "Respondent";
  const opponent = side === "applicant" ? "Respondent" : "Applicant";
  const applicantName = parsed.parties.applicant;
  const respondentName = parsed.parties.respondent;
  const caseTitle = `${applicantName} v ${respondentName}`;

  const issues = (parsed.issues.length ? parsed.issues : ["Whether the impugned conduct is lawful."]).slice(0, 3);

  // matched authorities per contention
  const perIssue = issues.map((iss) => {
    const matched = matchAuthorities(iss, competition, side, 4);
    const st = stressTest(matched, competition);
    return { issue: iss, matched, stress: st };
  });

  const allAuth = new Map<string, MatchedAuthority>();
  for (const p of perIssue) for (const m of p.matched) allAuth.set(m.authority.id, m);

  const sections: MemorialSection[] = [];
  let toc: { label: string; depth: number }[] = [];

  function addSection(id: string, heading: string, blocks: DocBlock[], depth = 1) {
    const words = blocks.reduce((a, b) => a + wordCount(b.text), 0);
    sections.push({ id, heading, blocks, words });
    toc.push({ label: heading, depth });
  }

  // 1. Title block
  addSection("title", "", [
    block("title", comp.name.toUpperCase()),
    block("subtitle", `${comp.forum}`),
    block("h1", `MEMORIAL FOR THE ${sideParty.toUpperCase()}`),
    block("meta", `In the matter of ${caseTitle}`),
    block("meta", `Counsel for the ${sideParty}: ${counsel ?? "Counsel for the " + sideParty}`),
    block("meta", `Citation standard: ${comp.citationStandard}`),
    block("meta", `Word limit: ${comp.wordLimit.toLocaleString()} words`),
  ]);

  // 2. Table of contents
  const tocBlocks: DocBlock[] = [block("h1", "TABLE OF CONTENTS")];
  // placeholder; filled after sections known — we append later by re-running? Instead build list now from planned headings.
  // We'll push a placeholder section and patch its blocks after all sections are built.
  addSection("toc", "TABLE OF CONTENTS", [block("para", "…")]);

  // 3. Index of authorities
  const groups = new Map<string, { text: string; status: string }[]>();
  for (const m of allAuth.values()) {
    const g = groupLabel(m.authority);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push({ text: `${m.authority.title}, ${m.authority.citation}`, status: m.status });
  }
  const authBlocks: DocBlock[] = [block("h1", "INDEX OF AUTHORITIES")];
  for (const [g, entries] of groups) {
    authBlocks.push(block("h2", g));
    for (const e of entries) authBlocks.push(block("para", `${e.text} — ${e.status}`));
  }
  addSection("authorities", "INDEX OF AUTHORITIES", authBlocks);

  // 4. Jurisdiction
  const jurBlocks: DocBlock[] = [
    block("h1", comp.jurisdictionHeading.toUpperCase()),
    block(
      "para",
      tintText(
        `The ${sideParty} respectfully submits that this ${comp.forum} has jurisdiction over the dispute. ${comp.notes}`,
        styleProfile,
      ),
    ),
    block("para", `The governing law is ${comp.law}. The ${sideParty} relies on the authorities set out in the Index of Authorities.`),
  ];
  addSection("jurisdiction", comp.jurisdictionHeading.toUpperCase(), jurBlocks);

  // 5. Facts
  const factBlocks: DocBlock[] = [block("h1", comp.factsHeading.toUpperCase())];
  const agreed = parsed.agreed.length ? parsed.agreed : parsed.paragraphs.slice(0, 6);
  factBlocks.push(block("h2", "Agreed facts"));
  for (const p of agreed) factBlocks.push(block("para", `${p.text}`, `Compromis ¶ ${p.n}`));
  if (parsed.procedural.length) {
    factBlocks.push(block("h2", "Procedural history"));
    for (const p of parsed.procedural) factBlocks.push(block("para", `${p.text}`, `Compromis ¶ ${p.n}`));
  }
  const disputed = parsed.disputed.length ? parsed.disputed : [];
  if (disputed.length) {
    factBlocks.push(block("h2", "Disputed facts"));
    for (const p of disputed) factBlocks.push(block("para", `${p.text}`, `Compromis ¶ ${p.n}`));
  }
  addSection("facts", comp.factsHeading.toUpperCase(), factBlocks);

  // 6. Issues raised
  const issuesBlocks: DocBlock[] = [block("h1", "ISSUES RAISED")];
  issues.forEach((iss, i) => {
    const letter = String.fromCharCode(65 + i);
    issuesBlocks.push(block("para", `${letter}. ${iss}`));
  });
  addSection("issues-raised", "ISSUES RAISED", issuesBlocks);

  // 7. Summary
  const summaryBlocks: DocBlock[] = [block("h1", comp.summaryHeading.toUpperCase())];
  issues.forEach((iss, i) => {
    summaryBlocks.push(block("para", `${i + 1}. The ${sideParty} submits that ${asProposition(iss)}.`));
  });
  addSection("summary", comp.summaryHeading.toUpperCase(), summaryBlocks);

  // 7. Arguments
  let paraNo = 0;
  issues.forEach((iss, i) => {
    const pi = perIssue[i];
    const matched = pi.matched;
    const primary = matched[0];
    const adverse = matched.find((m) => m.adverse) ?? matched[matched.length - 1];
    const stress = pi.stress[0];
    const fallbackAuth = stress?.fallback?.authority;
    const agreedNums = agreed.map((p) => p.n).slice(0, 4).join(", ");
    const blocks: DocBlock[] = [];
    blocks.push(block("h1", `${comp.argumentLabel.toUpperCase()} ${ROMAN[i] ?? i + 1} — ${iss.replace(/\?$/, "")}`.toUpperCase()));
    blocks.push(block("h2", "A. The legal proposition"));
    blocks.push(
      block(
        "para",
        `[${++paraNo}]. The ${sideParty} respectfully submits that ${asProposition(iss)}. This contention is dispositive and is supported by the authorities that follow.`,
      ),
    );
    blocks.push(block("h2", "B. Application to the record"));
    blocks.push(
      block(
        "para",
        `[${++paraNo}]. The record establishes that ${agreed.slice(0, 3).map((p) => p.text).join(" ")} (Compromis ¶¶ ${agreedNums}). These facts are agreed and are not in dispute.`,
        `Compromis ¶¶ ${agreedNums}`,
      ),
    );
    blocks.push(block("h2", "C. Authority"));
    if (primary) {
      blocks.push(
        block(
          "para",
          `[${++paraNo}]. ${primary.authority.principle} (${primary.authority.title}, ${primary.authority.citation}). The present facts fall squarely within that principle, and the ${sideParty} relies on it.`,
          primary.authority.citation,
        ),
      );
    }
    if (matched[1]) {
      blocks.push(
        block(
          "para",
          `[${++paraNo}]. The same conclusion follows from ${matched[1].authority.title} (${matched[1].authority.citation}): ${matched[1].authority.principle}.`,
          matched[1].authority.citation,
        ),
      );
    }
    blocks.push(block("h2", "D. Distinguishing adverse authority"));
    if (adverse && adverse.authority.id !== primary?.authority.id) {
      blocks.push(
        block(
          "para",
          `[${++paraNo}]. The ${opponent} is likely to rely on ${adverse.authority.title} (${adverse.authority.citation}). That authority is distinguishable: ${adverse.authority.principle} is engaged on different facts. This is distinguishable from that case, where the conduct was speculative and unsupported by evidence; here the conduct was concrete and substantiated, and the conduct impugned does not fall within its ratio.`,
          adverse.authority.citation,
        ),
      );
    } else {
      blocks.push(block("para", `[${++paraNo}]. No adverse authority of comparable weight has been identified on this point.`));
    }
    blocks.push(block("h2", "E. In the alternative"));
    blocks.push(
      block(
        "para",
        `[${++paraNo}]. In the alternative, even if the Court were to accept the ${opponent}'s characterisation, the ${sideParty} submits that ${asProposition(iss)} on the basis of ${fallbackAuth ? fallbackAuth.title + " (" + fallbackAuth.citation + ")" : "the general principle and the text of the instrument"}.`,
      ),
    );
    blocks.push(block("para", `[${++paraNo}]. For these reasons, ${comp.argumentLabel} ${ROMAN[i] ?? i + 1} should be upheld.`));
    addSection(`arg-${i}`, `${comp.argumentLabel.toUpperCase()} ${ROMAN[i] ?? i + 1}`, blocks);
  });

  // 8. Prayer
  const prayerBlocks: DocBlock[] = [block("h1", comp.prayerHeading.toUpperCase())];
  for (const p of comp.prayer) {
    prayerBlocks.push(
      block(
        "para",
        p.replace(/\{applicant\}/g, applicantName).replace(/\{respondent\}/g, respondentName),
      ),
    );
  }
  prayerBlocks.push(block("para", "Thus, we humbly contend."));
  prayerBlocks.push(block("para", `DATED ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }).toUpperCase()}`));
  prayerBlocks.push(block("para", `ADVOCATES FOR THE ${sideParty.toUpperCase()}`));
  addSection("prayer", comp.prayerHeading.toUpperCase(), prayerBlocks);

  // Patch TOC section blocks
  const tocIndex = sections.findIndex((s) => s.id === "toc");
  const tocEntries = sections
    .filter((s) => s.id !== "toc" && s.heading)
    .map((s) => block("para", `${s.heading}`));
  if (tocIndex >= 0) sections[tocIndex].blocks = [block("h1", "TABLE OF CONTENTS"), ...tocEntries];

  // recompute toc list (labels already captured in toc array during addSection; keep)
  toc = sections.filter((s) => s.heading).map((s) => ({ label: s.heading, depth: s.id.startsWith("arg") ? 1 : 0 }));

  const wordCountTotal = sections.reduce((a, s) => a + s.words, 0);

  return {
    id: "mem_" + Math.random().toString(36).slice(2, 10),
    competition,
    side,
    title: caseTitle,
    subtitle: `${comp.name} · Memorial for the ${sideParty}`,
    sections,
    toc,
    authorities: [...groups.entries()].map(([group, entries]) => ({ group, entries })),
    wordCount: wordCountTotal,
    generatedAt: Date.now(),
    styleProfileId: styleProfile?.id,
  };
}

