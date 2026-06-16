"use client";

import { useActiveSection } from "./useActiveSection";

export interface NavSection {
  id: string;
  label: string;
}

interface ReportNavigationProps {
  sections: NavSection[];
}

/**
 * Report navigation.
 *  - Desktop: a sticky vertical list (rendered inside a sticky sidebar column)
 *    that highlights the active section while scrolling.
 *  - Mobile: a sticky horizontal, scrollable tab bar.
 *
 * Anchor clicks use smooth scrolling (native, with a JS fallback) and move
 * focus to the target for accessibility.
 */
export function ReportNavigation({ sections }: ReportNavigationProps) {
  const ids = sections.map((s) => s.id);
  const active = useActiveSection(ids);

  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Move focus for keyboard/screen-reader users without an extra scroll jump.
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <>
      {/* Desktop: sticky vertical nav */}
      <nav
        aria-label="Report sections"
        className="hidden lg:block lg:sticky lg:top-24"
      >
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          On this page
        </p>
        <ul className="space-y-1">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition",
                      isActive
                        ? "bg-brand-600 text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: sticky horizontal tabs */}
      <nav
        aria-label="Report sections"
        className="sticky top-[57px] z-[5] -mx-4 border-b border-slate-200 bg-slate-50/90 px-2 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:hidden"
      >
        <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  onClick={(e) => handleClick(e, s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-brand-600 text-white"
                      : "bg-white text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700",
                  ].join(" ")}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
