import React from "react";
import { useApp } from "../store";
import type { TabId } from "../store";

const TABS: { id: TabId; label: string }[] = [
  { id: "start", label: "1 · Start" },
  { id: "results", label: "2 · Results" },
  { id: "practice", label: "3 · Practice" },
  { id: "tools", label: "4 · Tools (optional)" },
];

export function TabRail({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <nav className="tabrail">
      {TABS.map((t) => (
        <button key={t.id} className={`tab ${active === t.id ? "active" : ""}`} onClick={() => onChange(t.id)}>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
