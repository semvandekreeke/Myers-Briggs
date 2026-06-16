import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccountButton } from "@/components/AccountButton";

/**
 * Marketing / assessment chrome: centered header with the brand, a link into
 * the platform (Dashboard), the theme toggle, and the account control.
 * Used for the landing page, the assessment, and the results report.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="inline-block h-6 w-6 rounded-md bg-brand-600" aria-hidden="true" />
            Insight
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:block"
            >
              Dashboard
            </Link>
            <ThemeToggle />
            <AccountButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      <footer className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-slate-400">
        For self-reflection and education. Not a clinical or diagnostic tool.
      </footer>
    </>
  );
}
