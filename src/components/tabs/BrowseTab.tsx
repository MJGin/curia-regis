import React from "react";
import { useApp } from "../../store";
import { SectionHeader, Button, Card, EmptyState, Badge } from "../ui";
import { topicById } from "../../lib/topics";
import Reader from "../Reader";

export default function BrowseTab() {
  const { state, filteredEntries, topics, setTopic, setSearch, setTypeFilter, setCourtFilter, setYearFrom, setYearTo, clearFilters, toggleSaved, isSaved, setSelected } = useApp();
  const selected = filteredEntries.find((e) => e.id === state.selectedId) ?? filteredEntries[0];
  const [showReader, setShowReader] = React.useState(false);

  return (
    <div>
      <SectionHeader eyebrow="Browse" title={state.topic ? topicById(state.topic).name : "All authorities"} body="Filter by type, court, year or search text. Click an entry for details and the source link." />

      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <input value={state.search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" style={{ flex: 1, minWidth: 180 }} />
        <select value={state.typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="all">All types</option>
          {["case", "statute", "treaty", "regulation", "rules", "guidance", "citation", "database", "secondary", "instrument"].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input value={state.courtFilter} onChange={(e) => setCourtFilter(e.target.value)} placeholder="Court / jurisdiction" style={{ width: 160 }} />
        <input value={state.yearFrom} onChange={(e) => setYearFrom(e.target.value)} placeholder="From year" style={{ width: 90 }} />
        <input value={state.yearTo} onChange={(e) => setYearTo(e.target.value)} placeholder="To year" style={{ width: 90 }} />
        <Button onClick={clearFilters} variant="ghost" size="sm">Clear</Button>
        {state.topic && <Button onClick={() => setTopic(null)} variant="ghost" size="sm">All topics</Button>}
      </div>

      <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 12 }}>
        {filteredEntries.length} entries
        {state.topic && <> · topic: <b>{topicById(state.topic).name}</b></>}
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        <div style={{ maxHeight: "70vh", overflow: "auto", paddingRight: 6 }}>
          {filteredEntries.length === 0 ? (
            <EmptyState title="No entries" body="Adjust the filters or search term." />
          ) : (
            filteredEntries.map((e) => (
              <div
                key={e.id}
                onClick={() => setSelected(e.id)}
                className="auth-card"
                style={{ cursor: "pointer", background: state.selectedId === e.id ? "var(--teal-soft)" : "var(--mist)", borderColor: state.selectedId === e.id ? "var(--teal)" : "var(--border)" }}
              >
                <div className="auth-title">{e.title}</div>
                <div className="auth-cite">{e.citation}{e.year ? " · " + e.year : ""} · {e.court}</div>
                <div className="auth-meta">
                  <Badge tone="neutral">{e.type}</Badge>
                  <Badge tone="brass">{topicById(e.topic).name}</Badge>
                  {isSaved(e.id) && <Badge tone="good">saved</Badge>}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ position: "sticky", top: 12 }}>
          {selected ? (
            <Card title={selected.title} subtitle={selected.citation}>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 8 }}>
                {selected.court}{selected.year ? " · " + selected.year : ""} · {selected.type}
              </div>
              {selected.summary && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--teal-dark)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Principle (ratio)</div>
                  <div className="auth-principle">{selected.summary}</div>
                </div>
              )}
              {selected.facts && (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--teal-dark)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Facts</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{selected.facts}</div>
                </div>
              )}
              {selected.holding && (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--teal-dark)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Holding</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{selected.holding}</div>
                </div>
              )}
              {selected.judges && (
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--teal-dark)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Judges</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>{selected.judges}</div>
                </div>
              )}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {selected.tags.map((t) => <Badge key={t} tone="neutral">{t}</Badge>)}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {selected.url && (
                  <Button onClick={() => setShowReader((v) => !v)} variant={showReader ? "primary" : "outline"} size="sm">
                    {showReader ? "Hide reader" : "Read in page"}
                  </Button>
                )}
                {selected.url && <a className="auth-link" href={selected.url} target="_blank" rel="noreferrer" style={{ alignSelf: "center" }}>Open in new tab ↗</a>}
                <Button onClick={() => toggleSaved(selected.id)} variant={isSaved(selected.id) ? "primary" : "ghost"} size="sm">
                  {isSaved(selected.id) ? "Saved" : "Save"}
                </Button>
              </div>
              {showReader && selected.url && (
                <div style={{ marginTop: 12 }}>
                  <Reader url={selected.url} title={selected.title} />
                </div>
              )}
            </Card>
          ) : (
            <EmptyState title="Select an entry" body="Click an entry on the left to see details and the source link." />
          )}
        </div>
      </div>
    </div>
  );
}
