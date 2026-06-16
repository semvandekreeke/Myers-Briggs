"use client";

import type { ReactNode } from "react";
import { useCurrentResult } from "@/lib/use-local";
import { EmptyState } from "./ui";

/**
 * Gate for platform pages that require a known personality type. Renders a
 * loading state until localStorage is read, a prompt to take the assessment
 * when there's no result, and otherwise the children with the resolved type.
 */
export function TypeGate({ children }: { children: (type: string) => ReactNode }) {
  const { result, hydrated } = useCurrentResult();

  if (!hydrated) {
    return (
      <div className="py-20 text-center text-slate-400" aria-live="polite">
        Loading your profile…
      </div>
    );
  }

  if (!result) {
    return (
      <EmptyState
        title="Take the assessment first"
        body="This part of the platform is personalized to your type. Complete the 60-question assessment to unlock it."
        cta={{ href: "/test", label: "Start the assessment" }}
      />
    );
  }

  return <>{children(result.type)}</>;
}
