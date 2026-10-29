import React, { useEffect } from "react";
import { useApp } from "./store";
import { COMPETITIONS, competitionById } from "./data/competitions";
import { TopBar } from "./components/TopBar";
import { TabRail } from "./components/TabRail";
import SetupTab from "./components/tabs/SetupTab";
import ResultsTab from "./components/ResultsTab";
import SparringTab from "./components/tabs/SparringTab";
import ToolsTab from "./components/ToolsTab";

export default function App() {
  const { state, setTab, setCompetition, seedBenchmarks } = useApp();
  useEffect(() => { seedBenchmarks(); }, [seedBenchmarks]);

  // keep custom competition fields in sync when custom mode selected
  const comp = competitionById(state.competition);

  return (
    <div className="app-shell">
      <TopBar
        competition={state.competition}
        onChange={setCompetition}
        custom={state.custom}
      />
      <TabRail active={state.tab} onChange={setTab} />
      <main className="main">
        <div className="tab-content" key={state.tab}>
          {state.tab === "start" && <SetupTab />}
          {state.tab === "results" && <ResultsTab />}
          {state.tab === "practice" && <SparringTab />}
          {state.tab === "tools" && <ToolsTab />}
        </div>
      </main>
      <footer className="footnote">
        Curia Regis — Moot Court Advocacy &amp; Championship Chambers · Synthetic, educational use only · No legal advice
      </footer>
    </div>
  );
}
