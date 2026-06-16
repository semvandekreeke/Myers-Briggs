"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

type ProvidersMap = Awaited<ReturnType<typeof getProviders>>;

export default function SignInPage() {
  const [providers, setProviders] = useState<ProvidersMap | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    getProviders()
      .then(setProviders)
      .catch(() => setProviders(null))
      .finally(() => setLoaded(true));
  }, []);

  const list = providers ? Object.values(providers) : [];
  const hasGoogle = list.some((p) => p.id === "google");
  const hasEmail = list.some((p) => p.id === "email");
  const anyProvider = list.length > 0;

  return (
    <div className="mx-auto max-w-md animate-fade-in py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Sign in to Insight</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Save your results, sync progress across devices, and create shared groups.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {!loaded ? (
          <div className="py-8 text-center text-slate-400">Loading sign-in options…</div>
        ) : !anyProvider ? (
          <div className="space-y-3 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Authentication isn't configured on this deployment. The app is running in
              <span className="font-semibold"> local-only mode</span> — your results, goals, and groups
              are saved in this browser.
            </p>
            <p className="text-xs text-slate-400">
              To enable accounts, set the auth environment variables (see <code>.env.example</code>).
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {hasGoogle && (
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.4-.2-2H12v3.9h6c-.1 1-.8 2.5-2.2 3.5l3.5 2.7c2.1-1.9 3.2-4.8 3.2-8.1Z" />
                  <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.5-2.7c-1 .6-2.2 1-3.7 1-2.8 0-5.2-1.9-6.1-4.5H2.3v2.8C4.1 20.6 7.8 23 12 23Z" />
                  <path fill="#FBBC05" d="M5.9 14.2c-.2-.6-.4-1.3-.4-2.2s.1-1.5.4-2.2V7H2.3C1.6 8.5 1.2 10.2 1.2 12s.4 3.5 1.1 5l3.6-2.8Z" />
                  <path fill="#EA4335" d="M12 5.3c1.6 0 2.6.7 3.2 1.3l2.4-2.4C16.4 2.9 14.5 2 12 2 7.8 2 4.1 4.4 2.3 7l3.6 2.8C6.8 7.2 9.2 5.3 12 5.3Z" />
                </svg>
                Continue with Google
              </button>
            )}

            {hasEmail && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) signIn("email", { email, callbackUrl: "/dashboard" });
                }}
                className="space-y-2"
              >
                <label htmlFor="email" className="block text-sm font-medium">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                />
                <button type="submit" className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700">
                  Email me a sign-in link
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
