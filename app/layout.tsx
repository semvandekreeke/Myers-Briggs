import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insight — Personality Assessment",
  description:
    "A modern, research-inspired 16-type personality assessment. Discover your type across four dimensions.",
};

/**
 * Inline script that applies the saved/preferred theme before first paint,
 * preventing a flash of the wrong color scheme.
 */
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('mbti.theme.v1');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <span className="inline-block h-6 w-6 rounded-md bg-brand-600" aria-hidden="true" />
              Insight
            </Link>
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 py-8 text-center text-xs text-slate-400">
          For self-reflection and education. Not a clinical or diagnostic tool.
        </footer>
      </body>
    </html>
  );
}
