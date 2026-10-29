import React from "react";
import { useApp } from "../../store";
import { SectionHeader, Card, EmptyState, Badge, Button, Stat } from "../ui";
import { topicById } from "../../lib/topics";

export default function HomeTab() {
  const { state, entries, topics, topicCounts, setTopic, setSearch, setTab } = useApp();
  return (
    <div>
      <SectionHeader eyebrow="Kenya Law Library" title="Authorities, statutes, treaties and notes" body="A categorized library of case law, statutes, treaties and study notes. Click a topic to browse, or search across everything." />

      <div style={{ marginBottom: 20 }}>
        <input
          value={state.search}
          onChange={(e) => { setSearch(e.target.value); if (e.target.value) setTab("browse"); }}
          placeholder="Search across all authorities, statutes, treaties and notes…"
          style={{ width: "100%", fontSize: 15, padding: "12px 16px" }}
        />
      </div>

      <div className="grid-4" style={{ marginBottom: 20 }}>
        <Stat label="Authorities" value={entries.length} />
        <Stat label="Topics" value={topics.length} />
        <Stat label="Saved" value={state.saved.length} />
        <Stat label="Notes" value={state.notes.length} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => setTopic(t.id)}
            className="card"
            style={{ textAlign: "left", cursor: "pointer", padding: 0, border: "1px solid var(--border)" }}
          >
            <div className="card-body">
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 8, lineHeight: 1.4 }}>{t.blurb}</div>
              <Badge tone="brass">{topicCounts[t.id] || 0} entries</Badge>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
