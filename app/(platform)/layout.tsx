import { PlatformShell } from "@/components/platform/PlatformShell";

/**
 * Layout for the authenticated/platform area (dashboard, profile, development,
 * roadmap, matches, groups). Wraps pages in the sidebar shell.
 */
export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return <PlatformShell>{children}</PlatformShell>;
}
