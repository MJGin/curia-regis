import React, { useState } from "react";
import { useApp } from "../store";
import { SectionHeader, Button } from "./ui";
import MemorialTab from "./tabs/MemorialTab";
import OralsTab from "./tabs/OralsTab";

export default function ResultsTab() {
  const { state } = useApp();
  const [sub, setSub] = useState<"memorial" | "orals">("memorial");
  return (
    <div>
      <SectionHeader eyebrow="Results" title="Your generated documents" body="Memorials and oral scripts produced from your fact pattern. Switch between them below." />
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button onClick={() => setSub("memorial")} variant={sub === "memorial" ? "primary" : "ghost"} size="sm">Memorial</Button>
        <Button onClick={() => setSub("orals")} variant={sub === "orals" ? "primary" : "ghost"} size="sm">Oral script</Button>
      </div>
      {sub === "memorial" ? <MemorialTab /> : <OralsTab />}
    </div>
  );
}
