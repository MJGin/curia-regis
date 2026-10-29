# Kenya Law Library — Authorities, Statutes, Treaties and Notes

A categorized, searchable library of case law, statutes, treaties, regulations, rules, guidance notes and study resources, focused on Kenyan jurisprudence and the international, regional and comparative authorities that Kenyan moots and research rely on.

## What's inside

- **~260 authorities** across 20 legal topics, each with citation, court, year, summary, tags and a link to the official source (Kenya Law, ICJ, WTO, AU, EUR-Lex, BAILII, HUDOC, CURIA, etc.).
- **60+ legal resources** — statutes, treaties, regulations, rules, guidance, competition rules, citation guides and databases.
- Topics: Jurisdiction & Admissibility, Constitutional Interpretation, Impeachment, Administrative Law, Human Rights, Privacy & Data Protection, Criminal Law, Contract, Tort, Equity & Trusts, International Law, Refugee & Migration, Evidence & Procedure, Land & Environment, Commercial & Corporate, Employment & Labour, Intellectual Property, Family Law, Tax, General.
- Save/bookmark authorities and add your own notes, linked to a topic (stored locally in your browser).

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

## Expand the library

Authorities live in `src/data/authorities*.ts`, resources in `src/data/resources.ts`. To add a new authority, append an object with `id, title, citation, court, year, system, tags, principle` (and optional `sourceUrl`). The topic is derived automatically from tags via `src/lib/topics.ts`.

To scrape Kenya Law for a new topic, use its search API:

```bash
curl -s "https://new.kenyalaw.org/search/api/documents/?search=YOUR+KEYWORD&page=1" \\
  -H "Accept: application/json"
```

Then verify the neutral citation and link, and append the entry. Or just tell me the topic and keywords and I'll scrape, verify and append.

## Disclaimer

Educational research aid only. Citations are recorded as found in the sources; always verify against the original report before relying on them. Principles are stated conservatively in our own words and are not legal advice.