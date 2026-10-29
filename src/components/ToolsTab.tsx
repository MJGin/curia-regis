import React, { useState } from "react";
import { SectionHeader, Button } from "./ui";
import VaultTab from "./tabs/VaultTab";
import AuthoritiesTab from "./tabs/AuthoritiesTab";

export default function ToolsTab() {
  const [sub, setSub] = useState<"vault" | "authorities">("vault");
  return (
    <div>
      <SectionHeader eyebrow="Tools" title="Benchmarks and authorities" body="Upload example memorials/scripts to clone their style, and browse the legal resource library. Optional — the generator works without these." />
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <Button onClick={() => setSub("vault")} variant={sub === "vault" ? "primary" : "ghost"} size="sm">Benchmark vault</Button>
        <Button onClick={() => setSub("authorities")} variant={sub === "authorities" ? "primary" : "ghost"} size="sm">Authorities & library</Button>
      </div>
      {sub === "vault" ? <VaultTab /> : <AuthoritiesTab />}
    </div>
  );
}
