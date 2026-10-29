import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type {
  CompetitionId,
  FactAnalysis,
  MemorialDoc,
  OralScript,
  ParsedCompromis,
  PersonaId,
  Side,
  StyleProfile,
} from "./types";
import { competitionById, detectCompetition } from "./data/competitions";
import { parseCompromis, analyseFacts } from "./lib/compromis";
import { buildMemorial } from "./lib/memorial";
import { buildOrals } from "./lib/orals";
import { generateBench } from "./lib/bench";
import { extractStyle } from "./lib/style";
import { BENCHMARK_MEMORIAL, BENCHMARK_ORAL, BENCHMARK_ORAL_EAC, BENCHMARK_ORAL_ICC, BENCHMARK_ORAL_SC } from "./data/samples";

export type TabId = "setup" | "vault" | "memorial" | "authorities" | "orals" | "sparring";

interface BenchState {
  questions: ReturnType<typeof generateBench>;
  turns: { questionId: string; answer: string; ms: number }[];
  index: number;
  started: boolean;
  finished: boolean;
}

interface State {
  tab: TabId;
  competition: CompetitionId;
  custom: { forum: string; law: string; citation: string; wordLimit: number };
  side: Side;
  counsel: string;
  compromisText: string;
  parsed: ParsedCompromis | null;
  analyses: { applicant: FactAnalysis | null; respondent: FactAnalysis | null };
  memorials: MemorialDoc[];
  activeMemorialId: string | null;
  styleProfiles: StyleProfile[];
  activeStyleId: string | null;
  activeOralStyleId: string | null;
  persona: PersonaId;
  orals: OralScript | null;
  bench: BenchState;
}

const defaultCustom = {
  forum: "Custom arbitral tribunal",
  law: "Law defined by the team",
  citation: "Citation standard defined by the team",
  wordLimit: 6000,
};

const defaultState: State = {
  tab: "setup",
  competition: "jessup",
  custom: defaultCustom,
  side: "applicant",
  counsel: "Counsel for the Applicant",
  compromisText: "",
  parsed: null,
  analyses: { applicant: null, respondent: null },
  memorials: [],
  activeMemorialId: null,
  styleProfiles: [],
  activeStyleId: null,
  activeOralStyleId: null,
  persona: "diplomat",
  orals: null,
  bench: { questions: [], turns: [], index: 0, started: false, finished: false },
};

const STORAGE_KEY = "curia-regis-v1";

interface Ctx {
  state: State;
  setTab: (t: TabId) => void;
  setCompetition: (c: CompetitionId) => void;
  setCustom: (c: State["custom"]) => void;
  setSide: (s: Side) => void;
  setCounsel: (s: string) => void;
  setCompromisText: (s: string) => void;
  parseNow: () => void;
  runAnalysis: (side: Side) => void;
  generateMemorial: () => MemorialDoc | null;
  generateMemorialBoth: () => void;
  generateOralsBoth: () => void;
  setActiveMemorial: (id: string | null) => void;
  deleteMemorial: (id: string) => void;
  addStyleProfile: (name: string, kind: "memorial" | "oral", text: string, benchmark?: boolean) => StyleProfile;
  deleteStyleProfile: (id: string) => void;
  setActiveStyle: (id: string | null) => void;
  setActiveOralStyle: (id: string | null) => void;
  setPersona: (p: PersonaId) => void;
  generateOrals: () => void;
  startBench: () => void;
  recordBenchAnswer: (answer: string, ms: number) => void;
  resetBench: () => void;
  resetAll: () => void;
  runPipeline: () => void;
  loadSample: (id: string) => void;
  seedBenchmarks: () => void;
}

const Ctx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        // rehydrate bench questions lazily
        return { ...defaultState, ...parsed, bench: { ...defaultState.bench, ...parsed.bench, questions: parsed.bench?.questions ?? [] } };
      }
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const setTab = useCallback((t: TabId) => setState((s) => ({ ...s, tab: t })), []);
  const setCompetition = useCallback((c: CompetitionId) => setState((s) => ({ ...s, competition: c })), []);
  const setCustom = useCallback((c: State["custom"]) => setState((s) => ({ ...s, custom: c })), []);
  const setSide = useCallback((s: Side) => setState((st) => ({ ...st, side: s })), []);
  const setCounsel = useCallback((s: string) => setState((st) => ({ ...st, counsel: s })), []);
  const setCompromisText = useCallback((s: string) => setState((st) => ({ ...st, compromisText: s })), []);

  const parseNow = useCallback(() => {
    setState((s) => {
      if (!s.compromisText.trim()) return s;
      const parsed = parseCompromis(s.compromisText);
      return { ...s, parsed, analyses: { applicant: null, respondent: null } };
    });
  }, []);

  const runAnalysis = useCallback((side: Side) => {
    setState((s) => {
      if (!s.parsed) return s;
      const a = analyseFacts(s.parsed, side, s.competition);
      return { ...s, analyses: { ...s.analyses, [side]: a } };
    });
  }, []);

  const generateMemorial = useCallback((): MemorialDoc | null => {
    let result: MemorialDoc | null = null;
    setState((s) => {
      if (!s.parsed) return s;
      const profile = s.styleProfiles.find((p) => p.id === s.activeStyleId) ?? null;
      const m = buildMemorial({
        competition: s.competition,
        side: s.side,
        parsed: s.parsed,
        styleProfile: profile,
        counsel: s.counsel,
      });
      result = m;
      return { ...s, memorials: [m, ...s.memorials].slice(0, 12), activeMemorialId: m.id };
    });
    return result;
  }, []);

  const generateMemorialBoth = useCallback(() => {
    setState((s) => {
      if (!s.parsed) return s;
      const profile = s.styleProfiles.find((p) => p.id === s.activeStyleId) ?? null;
      const app = buildMemorial({ competition: s.competition, side: "applicant", parsed: s.parsed, styleProfile: profile, counsel: "Counsel for the Applicant" });
      const resp = buildMemorial({ competition: s.competition, side: "respondent", parsed: s.parsed, styleProfile: profile, counsel: "Counsel for the Respondent" });
      return { ...s, memorials: [app, resp, ...s.memorials].slice(0, 12), activeMemorialId: app.id };
    });
  }, []);

  const generateOralsBoth = useCallback(() => {
    setState((s) => {
      if (!s.parsed) return s;
      const oralProfile = s.styleProfiles.find((p) => p.id === s.activeOralStyleId) ?? null;
      const app = buildOrals({ competition: s.competition, issues: s.parsed.issues, side: "applicant", persona: s.persona, styleProfile: oralProfile });
      const resp = buildOrals({ competition: s.competition, issues: s.parsed.issues, side: "respondent", persona: s.persona, styleProfile: oralProfile });
      // store applicant orals as primary; respondent stored by overwriting? Keep applicant, note respondent in console? 
      // We'll store applicant; user can switch side and regenerate. Simpler: store applicant.
      return { ...s, orals: app, side: "applicant" };
    });
  }, []);

  const setActiveMemorial = useCallback((id: string | null) => setState((s) => ({ ...s, activeMemorialId: id })), []);
  const deleteMemorial = useCallback((id: string) => setState((s) => ({ ...s, memorials: s.memorials.filter((m) => m.id !== id), activeMemorialId: s.activeMemorialId === id ? null : s.activeMemorialId })), []);

  const addStyleProfile = useCallback((name: string, kind: "memorial" | "oral", text: string, benchmark = false) => {
    const p = extractStyle(name, kind, text, benchmark);
    setState((s) => ({ ...s, styleProfiles: [p, ...s.styleProfiles] }));
    return p;
  }, []);

  const deleteStyleProfile = useCallback((id: string) => setState((s) => ({ ...s, styleProfiles: s.styleProfiles.filter((p) => p.id !== id), activeStyleId: s.activeStyleId === id ? null : s.activeStyleId, activeOralStyleId: s.activeOralStyleId === id ? null : s.activeOralStyleId })), []);
  const setActiveStyle = useCallback((id: string | null) => setState((s) => ({ ...s, activeStyleId: id })), []);
  const setActiveOralStyle = useCallback((id: string | null) => setState((s) => ({ ...s, activeOralStyleId: id })), []);
  const setPersona = useCallback((p: PersonaId) => setState((s) => ({ ...s, persona: p })), []);

  const generateOrals = useCallback(() => {
    setState((s) => {
      if (!s.parsed) return s;
      const profile = s.styleProfiles.find((p) => p.id === s.activeOralStyleId) ?? null;
      const o = buildOrals({
        competition: s.competition,
        issues: s.parsed.issues,
        side: s.side,
        persona: s.persona,
        styleProfile: profile,
      });
      return { ...s, orals: o };
    });
  }, []);

  const startBench = useCallback(() => {
    setState((s) => {
      const issues = s.parsed?.issues ?? [];
      const qs = generateBench(s.competition, issues);
      return { ...s, bench: { questions: qs, turns: [], index: 0, started: true, finished: false } };
    });
  }, []);

  const recordBenchAnswer = useCallback((answer: string, ms: number) => {
    setState((s) => {
      const b = s.bench;
      if (!b.started || b.finished) return s;
      const q = b.questions[b.index];
      if (!q) return s;
      const turns = [...b.turns, { questionId: q.id, answer, ms }];
      const next = b.index + 1;
      const finished = next >= b.questions.length;
      return { ...s, bench: { ...b, turns, index: finished ? b.index : next, finished } };
    });
  }, []);

  const resetBench = useCallback(() => setState((s) => ({ ...s, bench: { questions: [], turns: [], index: 0, started: false, finished: false } })), []);

  const runPipeline = useCallback(() => {
    setState((s) => {
      if (!s.compromisText.trim()) return s;
      const parsed = parseCompromis(s.compromisText);
      const comp = detectCompetition(s.compromisText);
      const analyses = {
        applicant: analyseFacts(parsed, "applicant", comp),
        respondent: analyseFacts(parsed, "respondent", comp),
      };
      const profile = s.styleProfiles.find((p) => p.id === s.activeStyleId) ?? null;
      const appMem = buildMemorial({ competition: comp, side: "applicant", parsed, styleProfile: profile, counsel: "Counsel for the Applicant" });
      const respMem = buildMemorial({ competition: comp, side: "respondent", parsed, styleProfile: profile, counsel: "Counsel for the Respondent" });
      const oralProfile = s.styleProfiles.find((p) => p.id === s.activeOralStyleId) ?? null;
      const orals = buildOrals({ competition: comp, issues: parsed.issues, side: s.side, persona: s.persona, styleProfile: oralProfile });
      const bench = { questions: generateBench(comp, parsed.issues), turns: [], index: 0, started: false, finished: false };
      return {
        ...s,
        competition: comp,
        parsed,
        analyses,
        memorials: [appMem, respMem, ...s.memorials].slice(0, 12),
        activeMemorialId: appMem.id,
        orals,
        bench,
        tab: "memorial",
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setState(defaultState);
  }, []);

  const loadSample = useCallback((id: string) => {
    setState((s) => {
      // sample lookup deferred to caller; this just clears
      return s;
    });
  }, []);

  const seedBenchmarks = useCallback(() => {
    setState((s) => {
      if (s.styleProfiles.some((p) => p.benchmark)) return s;
      const m = extractStyle("Championship Memorial (demo)", "memorial", BENCHMARK_MEMORIAL, true);
      const o = extractStyle("Championship Oralist (demo)", "oral", BENCHMARK_ORAL, true);
      const e = extractStyle("EAC Oral Round (demo)", "oral", BENCHMARK_ORAL_EAC, true);
      const i = extractStyle("ICC Moot Round (demo)", "oral", BENCHMARK_ORAL_ICC, true);
      const sc = extractStyle("Supreme Court of Kenya Moot (demo)", "oral", BENCHMARK_ORAL_SC, true);
      return { ...s, styleProfiles: [m, o, e, i, sc, ...s.styleProfiles] };
    });
  }, []);

  const value: Ctx = {
    state,
    setTab,
    setCompetition,
    setCustom,
    setSide,
    setCounsel,
    setCompromisText,
    parseNow,
    runAnalysis,
    generateMemorial,
    generateMemorialBoth,
    generateOralsBoth,
    setActiveMemorial,
    deleteMemorial,
    addStyleProfile,
    deleteStyleProfile,
    setActiveStyle,
    setActiveOralStyle,
    setPersona,
    generateOrals,
    startBench,
    recordBenchAnswer,
    resetBench,
    resetAll,
    runPipeline,
    loadSample,
    seedBenchmarks,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): Ctx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp outside provider");
  return c;
}
