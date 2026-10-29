import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { AUTHORITIES } from "./data/authorities";
import { RESOURCES } from "./data/resources";
import { topicOf, topicById, TOPICS } from "./lib/topics";
import type { Authority, LegalResource } from "./types";

export type TabId = "home" | "browse" | "saved" | "about";

export interface Note { id: string; title: string; text: string; topic: string; createdAt: number; }

export interface LibraryEntry {
  id: string;
  kind: "authority" | "resource";
  title: string;
  citation: string;
  court: string;
  year: number;
  type: string;
  topic: string;
  url?: string;
  official?: boolean;
  summary: string;
  tags: string[];
  sourceType: "case" | "statute" | "treaty" | "regulation" | "rules" | "guidance" | "citation" | "database" | "secondary" | "instrument";
}

function authorityToEntry(a: Authority): LibraryEntry {
  return {
    id: "a:" + a.id,
    kind: "authority",
    title: a.title,
    citation: a.citation,
    court: a.court,
    year: a.year,
    type: a.system === "INSTRUMENT" ? "instrument" : "case",
    topic: topicOf(a.tags),
    url: a.sourceUrl,
    official: a.system === "INSTRUMENT",
    summary: a.principle + (a.note ? " " + a.note : ""),
    tags: a.tags,
    sourceType: a.system === "INSTRUMENT" ? "instrument" : "case",
  };
}

function resourceToEntry(r: LegalResource): LibraryEntry {
  return {
    id: "r:" + r.id,
    kind: "resource",
    title: r.title,
    citation: r.citation,
    court: r.jurisdiction,
    year: 0,
    type: r.kind,
    topic: mapResourceTopic(r),
    url: r.url,
    official: r.official,
    summary: r.note + (r.provisions ? " " + r.provisions.join("; ") : ""),
    tags: r.competitions === "all" ? [] : r.competitions,
    sourceType: r.kind as any,
  };
}

function mapResourceTopic(r: LegalResource): string {
  const t = (r.title + " " + r.note).toLowerCase();
  if (/impeach/.test(t)) return "impeachment";
  if (/data protection|privacy|gdpr/.test(t)) return "privacy";
  if (/refugee/.test(t)) return "refugee";
  if (/evidence/.test(t)) return "evidence";
  if (/constitution/.test(t)) return "constitutional";
  if (/judicature|civil procedure|court of appeal rules|supreme court act|mutunga/.test(t)) return "administrative";
  if (/wto|gatt|gats|dsu/.test(t)) return "international";
  if (/african charter|african court/.test(t)) return "international";
  if (/oscola|bluebook|citation/.test(t)) return "general";
  if (/kenya law|bailii|hudoc|curia/.test(t)) return "general";
  return "general";
}

const ALL_ENTRIES: LibraryEntry[] = [
  ...AUTHORITIES.map(authorityToEntry),
  ...RESOURCES.map(resourceToEntry),
];

interface State {
  tab: TabId;
  search: string;
  topic: string | null;
  typeFilter: string;
  courtFilter: string;
  yearFrom: string;
  yearTo: string;
  saved: string[];
  notes: Note[];
  selectedId: string | null;
}

const defaultState: State = {
  tab: "home",
  search: "",
  topic: null,
  typeFilter: "all",
  courtFilter: "",
  yearFrom: "",
  yearTo: "",
  saved: [],
  notes: [],
  selectedId: null,
};

const STORAGE_KEY = "kenya-law-library-v1";

interface Ctx {
  state: State;
  entries: LibraryEntry[];
  topics: typeof TOPICS;
  setTab: (t: TabId) => void;
  setSearch: (s: string) => void;
  setTopic: (t: string | null) => void;
  setTypeFilter: (s: string) => void;
  setCourtFilter: (s: string) => void;
  setYearFrom: (s: string) => void;
  setYearTo: (s: string) => void;
  clearFilters: () => void;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  addNote: (title: string, text: string, topic: string) => void;
  deleteNote: (id: string) => void;
  setSelected: (id: string | null) => void;
  filteredEntries: LibraryEntry[];
  topicCounts: Record<string, number>;
}

const Ctx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw) as State;
        return { ...defaultState, ...p };
      }
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  const setTab = useCallback((t: TabId) => setState((s) => ({ ...s, tab: t })), []);
  const setSearch = useCallback((s: string) => setState((st) => ({ ...st, search: s })), []);
  const setTopic = useCallback((t: string | null) => setState((st) => ({ ...st, topic: t, tab: t ? "browse" : st.tab })), []);
  const setTypeFilter = useCallback((s: string) => setState((st) => ({ ...st, typeFilter: s })), []);
  const setCourtFilter = useCallback((s: string) => setState((st) => ({ ...st, courtFilter: s })), []);
  const setYearFrom = useCallback((s: string) => setState((st) => ({ ...st, yearFrom: s })), []);
  const setYearTo = useCallback((s: string) => setState((st) => ({ ...st, yearTo: s })), []);
  const clearFilters = useCallback(() => setState((st) => ({ ...st, search: "", topic: null, typeFilter: "all", courtFilter: "", yearFrom: "", yearTo: "" })), []);
  const toggleSaved = useCallback((id: string) => setState((st) => ({
    ...st,
    saved: st.saved.includes(id) ? st.saved.filter((x) => x !== id) : [...st.saved, id],
  })), []);
  const isSaved = useCallback((id: string) => state.saved.includes(id), [state.saved]);
  const addNote = useCallback((title: string, text: string, topic: string) => {
    const note: Note = { id: "n_" + Math.random().toString(36).slice(2, 10), title, text, topic, createdAt: Date.now() };
    setState((st) => ({ ...st, notes: [note, ...st.notes] }));
  }, []);
  const deleteNote = useCallback((id: string) => setState((st) => ({ ...st, notes: st.notes.filter((n) => n.id !== id) })), []);
  const setSelected = useCallback((id: string | null) => setState((st) => ({ ...st, selectedId: id })), []);

  const filteredEntries = useMemo(() => {
    const q = state.search.trim().toLowerCase();
    return ALL_ENTRIES.filter((e) => {
      if (state.topic && e.topic !== state.topic) return false;
      if (state.typeFilter !== "all" && e.type !== state.typeFilter && e.sourceType !== state.typeFilter) return false;
      if (state.courtFilter && !e.court.toLowerCase().includes(state.courtFilter.toLowerCase())) return false;
      if (state.yearFrom && e.year && e.year < Number(state.yearFrom)) return false;
      if (state.yearTo && e.year && e.year > Number(state.yearTo)) return false;
      if (q) {
        const hay = (e.title + " " + e.citation + " " + e.summary + " " + e.tags.join(" ")).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [state.search, state.topic, state.typeFilter, state.courtFilter, state.yearFrom, state.yearTo]);

  const topicCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of ALL_ENTRIES) c[e.topic] = (c[e.topic] || 0) + 1;
    return c;
  }, []);

  const value: Ctx = {
    state, entries: ALL_ENTRIES, topics: TOPICS,
    setTab, setSearch, setTopic, setTypeFilter, setCourtFilter, setYearFrom, setYearTo, clearFilters,
    toggleSaved, isSaved, addNote, deleteNote, setSelected, filteredEntries, topicCounts,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}
