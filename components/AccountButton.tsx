"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

/**
 * Account control for headers/sidebars. Shows the signed-in user (with a sign
 * out action) or a "Sign in" link. Degrades gracefully in local-only mode,
 * where there is simply never a session.
 */
export function AccountButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="hidden text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white sm:block"
        >
          {session.user.name ?? session.user.email ?? "Profile"}
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/signin"
      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      Sign in
    </Link>
  );
}
