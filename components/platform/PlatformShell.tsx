"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccountButton } from "@/components/AccountButton";
import {
  IconGrid,
  IconUser,
  IconRocket,
  IconCompass,
  IconHeart,
  IconUsers,
} from "@/components/results/icons";

interface NavItem {
  href: string;
  label: string;
  icon: (p: { width?: number; height?: number }) => JSX.Element;
}

const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: IconGrid },
  { href: "/profile", label: "My Profile", icon: IconUser },
  { href: "/development", label: "Development", icon: IconRocket },
  { href: "/roadmap", label: "Roadmap", icon: IconCompass },
  { href: "/matches", label: "Matches", icon: IconHeart },
  { href: "/groups", label: "Groups", icon: IconUsers },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1" aria-label="Platform">
      {NAV.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              active
                ? "bg-brand-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
            ].join(" ")}
          >
            <Icon width={18} height={18} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Premium SaaS-style shell: a fixed sidebar on desktop and a slide-in drawer on
 * mobile, with a sticky top bar. Wraps all platform pages.
 */
export function PlatformShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <Link href="/" className="mb-6 flex items-center gap-2 px-2 text-lg font-semibold tracking-tight">
          <span className="inline-block h-6 w-6 rounded-md bg-brand-600" aria-hidden="true" />
          Insight
        </Link>
        <NavLinks />
        <div className="mt-auto space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <Link href="/test" className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            Retake assessment
          </Link>
          <div className="flex items-center justify-between px-1">
            <ThemeToggle />
            <AccountButton />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="rounded-lg border border-slate-300 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-5 w-5 rounded bg-brand-600" aria-hidden="true" />
          Insight
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80%] flex-col border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 animate-slide-in">
            <div className="mb-6 flex items-center justify-between px-2">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setOpen(false)}>
                <span className="inline-block h-6 w-6 rounded-md bg-brand-600" aria-hidden="true" />
                Insight
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
            <div className="mt-auto flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
              <AccountButton />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
