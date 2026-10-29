import React, { useEffect } from "react";
import { useApp } from "./store";
import { TopBar } from "./components/TopBar";
import { TabRail } from "./components/TabRail";
import HomeTab from "./components/tabs/HomeTab";
import BrowseTab from "./components/tabs/BrowseTab";
import SavedTab from "./components/tabs/SavedTab";
import AboutTab from "./components/tabs/AboutTab";

export default function App() {
  const { state, setTab } = useApp();
  useEffect(() => {}, []);
  return (
    <div className="app-shell">
      <TopBar />
      <TabRail active={state.tab} onChange={setTab} />
      <main className="main">
        <div className="tab-content" key={state.tab}>
          {state.tab === "home" && <HomeTab />}
          {state.tab === "browse" && <BrowseTab />}
          {state.tab === "saved" && <SavedTab />}
          {state.tab === "about" && <AboutTab />}
        </div>
      </main>
      <footer className="footnote">
        Kenya Law Library · Curated authorities, statutes, treaties and notes · Synthetic/educational use · Verify every citation against the original source
      </footer>
    </div>
  );
}
