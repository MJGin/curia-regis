import React from "react";

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "brass" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = "", title, subtitle, style }: { children: React.ReactNode; className?: string; title?: string; subtitle?: string; style?: React.CSSProperties }) {
  return (
    <section className={`card ${className}`} style={style}>
      {(title || subtitle) && (
        <header className="card-head">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-sub">{subtitle}</p>}
        </header>
      )}
      <div className="card-body">{children}</div>
    </section>
  );
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "danger" | "brass" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="empty">
      <div className="empty-title">{title}</div>
      <p className="empty-body">{body}</p>
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {hint && <div className="stat-hint">{hint}</div>}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <header className="section-head">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {body && <p className="section-body">{body}</p>}
    </header>
  );
}
