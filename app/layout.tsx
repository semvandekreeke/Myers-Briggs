import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Insight — Personality Development Platform",
  description:
    "Discover your personality type, then grow with a personalized development center, roadmap, matches, and team compatibility insights.",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
