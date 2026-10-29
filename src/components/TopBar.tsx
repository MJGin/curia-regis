import React from "react";

export function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M32 12v34" />
            <path d="M20 20h24" />
            <path d="M20 20l-6 12a8 8 0 0 0 12 0z" />
            <path d="M44 20l-6 12a8 8 0 0 0 12 0z" />
            <path d="M24 50h16" />
            <path d="M28 46h8" />
            <circle cx="32" cy="12" r="2.4" fill="currentColor" />
          </svg>
          <div>
            <div className="brand-name">KENYA LAW LIBRARY</div>
            <div className="brand-sub">Authorities · Statutes · Treaties · Notes</div>
          </div>
        </div>
      </div>
    </header>
  );
}
