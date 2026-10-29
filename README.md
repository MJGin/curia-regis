# Curia Regis — Moot Court Advocacy & Championship Chambers

An elite moot-court preparation platform for law students and counsel, built for dual-jurisdiction analysis across **Kenyan jurisprudence** and **English common law**, and for the major international dispute forums.

## Features

- **Competition Mode Switcher** — Jessup, John H. Jackson (WTO), Supreme Court of Kenya / national constitutional moots, ODPC privacy moots, All-African Human Rights moot, all Kenyan moots, and a fully custom mode. The selector drives the drafting engine, citation rules, headings and judicial benchmarks.
- **Compromis ingestion** — parses a pasted or uploaded problem into agreed facts, disputed facts, procedural history, questions presented and prayers; identifies good and bad facts for each side; generates questions with direct answers and supporting authority.
- **Memorial Drafter** — multi-tier IRAC/CRAC submissions with nested headings, fact integration, distinguishing of adverse authority and fallback arguments; automated table of contents and index of authorities grouped by instrument hierarchy; one-click export to `.docx` and PDF.
- **Benchmark Vault (style cloning)** — upload past winning memorials or mooter oral scripts (`.txt`, `.md`, `.pdf`); extracts a measurable style fingerprint (cadence, register, citation density, deference, signposting, Latinisms) and applies it to future drafts, with a gap analysis.
- **Dual-jurisdiction Authority Matrix** — Kenyan authority labelled Binding, English common law labelled Persuasive under section 3 of the Judicature Act (Cap 8), with international, WTO and African authority as contextual; includes an authority stress-tester with fallback arguments.
- **Oralist persona engine** — Textualist, Diplomat and Commander personas; timed appearance scripts with bracketed oral cues; rebuttal and sur-rebuttal matrix.
- **3-judge bench sparring** — hostile interrupter, academic stickler and pragmatic policy judge, scored on directness, composure, judicial address, authority use and recovery.
- **Legal resource library** — statutes, treaties, rules, guidance and databases for every moot, with verified links (Kenya Law, WTO, ICJ, AU, EUR-Lex, BAILII, HUDOC, etc.).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

The repository includes a workflow (`.github/workflows/deploy.yml`) that builds and deploys `dist/` to GitHub Pages on every push to `main`.

## Data and sourcing

- Kenyan case law and statutes are sourced from **Kenya Law** (new.kenyalaw.org), with neutral citations and links recorded in `src/data/authorities-kenya.ts` and `src/data/resources.ts`.
- International instruments, WTO reports, African and European authority are cited from their official texts.
- All compromis, benchmarks and sample memorials shipped with the app are **fictional and synthetic**. No real personal data is processed.

## Disclaimer

Curia Regis is an educational preparation tool. It does not constitute legal advice, and every citation should be verified against the original report before use in a real submission.