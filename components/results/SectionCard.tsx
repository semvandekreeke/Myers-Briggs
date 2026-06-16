"use client";

import type { ReactNode } from "react";

/**
 * Reusable presentation primitives for the results report.
 *
 * - `Section`     — a full report section with an anchor id and heading.
 * - `SectionCard` — a rounded, bordered content card.
 * - `CardGrid`    — responsive grid wrapper for cards.
 * - `BulletList`  — accent-dotted list for strengths/tips/etc.
 * - `ChipList`    — pill/tag list (e.g. recommended careers).
 * - `InfoBlock`   — labelled prose block (work style, conflict style, …).
 */

type Accent = "brand" | "emerald" | "amber" | "rose" | "sky" | "violet";

const ACCENT_TEXT: Record<Accent, string> = {
  brand: "text-brand-600 dark:text-brand-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  rose: "text-rose-600 dark:text-rose-400",
  sky: "text-sky-600 dark:text-sky-400",
  violet: "text-violet-600 dark:text-violet-400",
};

const ACCENT_CHIP: Record<Accent, string> = {
  brand:
    "bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-900/40 dark:text-brand-200 dark:ring-brand-800",
  emerald:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:ring-emerald-800",
  amber:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:ring-amber-800",
  rose: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:ring-rose-800",
  sky: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-900/30 dark:text-sky-200 dark:ring-sky-800",
  violet:
    "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-900/30 dark:text-violet-200 dark:ring-violet-800",
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      // scroll-mt offsets the sticky header so anchored sections aren't hidden.
      className="scroll-mt-24 space-y-6"
      aria-labelledby={`${id}-heading`}
    >
      <header className="space-y-2">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {eyebrow}
          </p>
        )}
        <h2
          id={`${id}-heading`}
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        {intro && (
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {intro}
          </p>
        )}
      </header>
      {children}
    </section>
  );
}

export function SectionCard({
  title,
  icon,
  accent = "brand",
  className = "",
  children,
}: {
  title?: string;
  icon?: ReactNode;
  accent?: Accent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {title && (
        <div className="mb-4 flex items-center gap-2.5">
          {icon && <span className={ACCENT_TEXT[accent]}>{icon}</span>}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

export function CardGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3;
}) {
  const map = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  } as const;
  return <div className={`grid grid-cols-1 gap-4 ${map[cols]}`}>{children}</div>;
}

export function BulletList({
  items,
  accent = "brand",
}: {
  items: string[];
  accent?: Accent;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
        >
          <span className={`mt-1.5 shrink-0 ${ACCENT_TEXT[accent]}`} aria-hidden="true">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
              <circle cx="3" cy="3" r="3" />
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ChipList({
  items,
  accent = "brand",
}: {
  items: string[];
  accent?: Accent;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset ${ACCENT_CHIP[accent]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </h4>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
}
