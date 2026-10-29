import React, { useState } from "react";
import { useApp } from "../../store";
import { SectionHeader, Button, Card, EmptyState, Badge } from "../ui";
import { topicById } from "../../lib/topics";

export default function SavedTab() {
  const { state, entries, toggleSaved, isSaved, addNote, deleteNote } = useApp();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("general");
  const savedEntries = entries.filter((e) => state.saved.includes(e.id));

  return (
    <div>
      <SectionHeader eyebrow="Saved" title="Your bookmarks and notes" body="Save authorities for quick access, and add your own notes linked to a topic." />

      <Card title={`Saved authorities (${savedEntries.length})`} style={{ marginBottom: 20 }}>
        {savedEntries.length === 0 ? (
          <EmptyState title="Nothing saved yet" body="Click 'Save' on any authority in Browse to bookmark it." />
        ) : (
          savedEntries.map((e) => (
            <div key={e.id} className="auth-card">
              <div className="auth-title">{e.title}</div>
              <div className="auth-cite">{e.citation}{e.year ? " · " + e.year : ""}</div>
              {e.url && <a className="auth-link" href={e.url} target="_blank" rel="noreferrer">source ↗</a>}
              <div style={{ marginTop: 6 }}>
                <Button onClick={() => toggleSaved(e.id)} variant="danger" size="sm">Remove</Button>
              </div>
            </div>
          ))
        )}
      </Card>

      <div className="grid-2">
        <Card title="Add a note" subtitle="Save your own research notes, linked to a topic.">
          <div style={{ display: "grid", gap: 10 }}>
            <div className="field">
              <span className="field-label">Topic</span>
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                {useApp().topics.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="field">
              <span className="field-label">Title</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
            </div>
            <div className="field">
              <span className="field-label">Text</span>
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Your note…" style={{ minHeight: 120 }} />
            </div>
            <Button onClick={() => { if (title.trim() && text.trim()) { addNote(title, text, topic); setTitle(""); setText(""); } }} variant="primary" disabled={!title.trim() || !text.trim()}>Save note</Button>
          </div>
        </Card>

        <Card title={`My notes (${state.notes.length})`}>
          {state.notes.length === 0 ? (
            <EmptyState title="No notes yet" body="Add a note on the left to build your own research library." />
          ) : (
            state.notes.map((n) => (
              <div key={n.id} className="auth-card">
                <div className="auth-title">{n.title}</div>
                <div className="auth-cite">{topicById(n.topic).name} · {new Date(n.createdAt).toLocaleDateString()}</div>
                <div className="auth-principle" style={{ whiteSpace: "pre-wrap" }}>{n.text}</div>
                <div style={{ marginTop: 6 }}>
                  <Button onClick={() => deleteNote(n.id)} variant="danger" size="sm">Delete</Button>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}
