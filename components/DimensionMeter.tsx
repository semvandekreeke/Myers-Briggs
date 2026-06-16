"use client";

import type { DimensionId, DimensionResult } from "@/lib/types";

const LABELS: Record<DimensionId, { left: string; right: string; title: string }> = {
  EI: { left: "Extraversion", right: "Introversion", title: "Energy" },
  SN: { left: "Sensing", right: "Intuition", title: "Information" },
  TF: { left: "Thinking", right: "Feeling", title: "Decisions" },
  JP: { left: "Judging", right: "Perceiving", title: "Structure" },
};

const FIRST_POLE: Record<DimensionId, string> = { EI: "E", SN: "S", TF: "T", JP: "J" };

interface Props {
  dimension: DimensionId;
  result: DimensionResult;
}

/**
 * Visualizes a single dimension. `rawScore` (0..100) measures lean toward the
 * first (left) pole, so the marker position maps directly onto the bar.
 */
export function DimensionMeter({ dimension, result }: Props) {
  const meta = LABELS[dimension];
  const leftActive = result.winner === FIRST_POLE[dimension];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {meta.title}
        </span>
        <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
          {result.confidence}% {result.winner}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm font-medium">
        <span className={leftActive ? "text-slate-900 dark:text-white" : "text-slate-400"}>
          {meta.left}
        </span>
        <span className={!leftActive ? "text-slate-900 dark:text-white" : "text-slate-400"}>
          {meta.right}
        </span>
      </div>

      <div className="relative h-2.5 w-full rounded-full bg-gradient-to-r from-brand-200 to-slate-200 dark:from-brand-900/50 dark:to-slate-800">
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-600 shadow dark:border-slate-900"
          style={{ left: `${result.rawScore}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
