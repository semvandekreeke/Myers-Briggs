"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

/**
 * Client providers wrapping the whole app. SessionProvider works even when no
 * auth is configured — `useSession` simply reports an unauthenticated state,
 * which the UI treats as local-only mode.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
