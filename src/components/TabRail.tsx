import React from "react";
import { useApp } from "../store";
import type { TabId } from "../store";

const TABS: { id: TabId; label: string }[] = [
  { id: "setup", label: "1 · Setup & Compromis" },
  { id: "vault", label: "2 · Benchmark Vault" },
  { id: "memorial", label: "3 · Memorial Drafter" },
  { id: "authorities", label: "4 · Authority Matrix" },
  { id: "orals", label: "5 · Oral Scripts" },
  { id: "sparring", label: "6 · Bench Sparring" },
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
