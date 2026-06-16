"use client";

import type { DimensionId, DimensionResult, PersonalityType } from "@/lib/types";
import { TypeAvatar } from "./TypeAvatar";

const POLE_LABEL: Record<string, string> = {
  E: "Extraverted",
  I: "Introverted",
  S: "Observant",
  N: "Intuitive",
  T: "Thinking",
  F: "Feeling",
  J: "Judging",
  P: "Prospecting",
};

const DIMENSION_ORDER: DimensionId[] = ["EI", "SN", "TF", "JP"];

interface HeroSectionProps {
  personality: PersonalityType;
  dimensions: Record<DimensionId, DimensionResult>;
}

/**
 * Full-width hero banner: type code, name, one-line summary, generated avatar,
 * and a compact strip of the four preference results with confidence.
 */
export function HeroSection({ personality, dimensions }: HeroSectionProps) {
  return (
    <section className="animate-fade-in overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Banner */}
      <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-10 text-white sm:px-10 sm:py-14">
        {/* Decorative grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
          <TypeAvatar code={personality.code} size={104} />
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">
              Your personality type
            </p>
            <div className="flex flex-col items-center gap-x-4 gap-y-1 sm:flex-row sm:items-baseline">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {personality.name}
              </h1>
              <span className="rounded-lg bg-white/15 px-3 py-1 text-2xl font-bold tracking-widest backdrop-blur">
                {personality.code}
              </span>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-brand-50/90">
              {personality.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Preference strip */}
      <div className="grid grid-cols-2 divide-slate-200 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800 sm:grid-cols-4 sm:divide-x">
        {DIMENSION_ORDER.map((d) => {
          const res = dimensions[d];
          return (
            <div key={d} className="px-4 py-5 text-center">
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                {res.confidence}%
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                {POLE_LABEL[res.winner]}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
