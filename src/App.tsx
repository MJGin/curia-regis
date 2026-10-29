import React, { useEffect } from "react";
import { useApp } from "./store";
import { COMPETITIONS, competitionById } from "./data/competitions";
import { TopBar } from "./components/TopBar";
import { TabRail } from "./components/TabRail";
import SetupTab from "./components/tabs/SetupTab";
import VaultTab from "./components/tabs/VaultTab";
import MemorialTab from "./components/tabs/MemorialTab";
import AuthoritiesTab from "./components/tabs/AuthoritiesTab";
import OralsTab from "./components/tabs/OralsTab";
import SparringTab from "./components/tabs/SparringTab";

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
          {state.tab === "setup" && <SetupTab />}
          {state.tab === "vault" && <VaultTab />}
          {state.tab === "memorial" && <MemorialTab />}
          {state.tab === "authorities" && <AuthoritiesTab />}
          {state.tab === "orals" && <OralsTab />}
          {state.tab === "sparring" && <SparringTab />}
        </div>
      </main>
      <footer className="footnote">
        Curia Regis — Moot Court Advocacy &amp; Championship Chambers · Synthetic, educational use only · No legal advice
      </footer>
    </div>
  );
}
