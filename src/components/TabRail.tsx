import React from "react";
import { useApp } from "../store";
import type { TabId } from "../store";

const TABS: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "browse", label: "Browse" },
  { id: "saved", label: "Saved" },
  { id: "about", label: "About" },
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
