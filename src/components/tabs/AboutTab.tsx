import React from "react";
import { SectionHeader, Card, Button } from "../ui";

export default function AboutTab() {
  return (
    <div>
      <SectionHeader eyebrow="About" title="Sources, method and how to expand" body="How this library is built and how to grow it." />

      <Card title="Folders in the repository" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Each topic is also a real folder under <code>library/</code> in the repo, containing an <code>index.json</code> and a <code>README.md</code> listing every entry (citation, court, year, facts, holding, judges, source link). Browse them on GitHub: <a className="auth-link" href="https://github.com/MJGin/curia-regis/tree/main/library" target="_blank" rel="noreferrer">library/ ↗</a>.
        </p>
      </Card>

      <Card title="What's in the library" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          A curated collection of case law, statutes, treaties, regulations, rules, guidance notes and study resources, drawn from Kenya Law (new.kenyalaw.org), official treaty texts (UN, WTO, AU, Council of Europe, EUR-Lex), ICJ, WTO, BAILII, HUDOC, CURIA, and academic sources. Every entry carries a citation, court, year, topic, summary and a link to the official source where available.
        </p>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Topics: Jurisdiction & Admissibility, Constitutional Interpretation, Impeachment, Administrative Law, Human Rights, Privacy & Data Protection, Criminal Law, Contract, Tort, Equity & Trusts, International Law, Refugee & Migration, Evidence & Procedure, Land & Environment, Commercial & Corporate, Employment & Labour, Intellectual Property, Family Law, Tax, General.
        </p>
      </Card>

      <Card title="How to expand (scraper)" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          The library is data-driven. Authorities live in <code>src/data/authorities*.ts</code>, resources in <code>src/data/resources.ts</code>. To add a new authority, append an object with <code>id, title, citation, court, year, system, tags, principle</code> (and optional <code>sourceUrl</code>). The topic is derived automatically from tags via <code>src/lib/topics.ts</code>.
        </p>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          To scrape Kenya Law for a new topic, use the search API:
        </p>
        <pre style={{ background: "var(--mist)", padding: 12, borderRadius: 8, fontSize: 12, overflow: "auto" }}>
{`curl -s "https://new.kenyalaw.org/search/api/documents/?search=YOUR+KEYWORD&page=1" \\
  -H "Accept: application/json" | python3 -c "import json,sys,re,html; d=json.load(sys.stdin); [print(t,'|',u) for m in __import__('re').finditer(r'<a class=\\"h5 text-primary\\"\\\\s+href=\\"([^\\"]+)\\"[^>]*>(.*?)</a>', d['results_html'], __import__('re').S) for u,t in [(m.group(1), __import__('html').unescape(__import__('re').sub('<[^>]+>','',m.group(2))))] if '/judgment/' in u]"`}
        </pre>
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          Then verify the neutral citation and link, and add the entry. I can also do this for you: just tell me the topic and keywords and I'll scrape, verify and append.
        </p>
      </Card>

      <Card title="Disclaimer">
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
          This library is an educational research aid. Citations are recorded as found in the sources; always verify against the original report before relying on them in a real submission. Principles are stated conservatively in our own words and are not legal advice.
        </p>
      </Card>
    </div>
  );
}
