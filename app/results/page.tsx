"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { DimensionId, ScoreResult } from "@/lib/types";
import { scoreAssessment, isComplete } from "@/lib/scoring";
import { getPersonality } from "@/lib/personalities";
import { loadAnswers, clearProgress } from "@/lib/storage";
import { DimensionMeter } from "@/components/DimensionMeter";

const DIMENSION_ORDER: DimensionId[] = ["EI", "SN", "TF", "JP"];

export default function ResultsPage() {
  const router = useRouter();
  const [score, setScore] = useState<ScoreResult | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const answers = loadAnswers();
    if (!isComplete(answers)) {
      // Not finished — send the user back to the test.
      router.replace("/test");
      return;
    }
    setScore(scoreAssessment(answers));
    setHydrated(true);
  }, [router]);

  if (!hydrated || !score) {
    return <div className="py-20 text-center text-slate-400">Calculating your results…</div>;
  }

  const personality = getPersonality(score.type);

  if (!personality) {
    return (
      <div className="py-20 text-center text-slate-500">
        Unexpected type code: {score.type}.
      </div>
    );
  }

  function retake() {
    clearProgress();
    router.push("/test");
  }

  return (
    <div className="animate-fade-in space-y-10">
      {/* Hero */}
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-center text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-widest text-brand-100">
          Your type
        </p>
        <h1 className="mt-2 text-6xl font-bold tracking-tight">{personality.code}</h1>
        <p className="mt-1 text-2xl font-semibold text-brand-50">{personality.name}</p>
        <p className="mx-auto mt-4 max-w-xl text-brand-50/90">{personality.summary}</p>
      </section>

      {/* Dimension breakdown */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Your preferences</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {DIMENSION_ORDER.map((d) => (
            <DimensionMeter key={d} dimension={d} result={score.dimensions[d]} />
          ))}
        </div>
      </section>

      {/* Detail sections */}
      <section className="grid gap-4 sm:grid-cols-2">
        <DetailList title="Strengths" items={personality.strengths} accent="green" />
        <DetailList title="Potential blind spots" items={personality.blindSpots} accent="amber" />
        <DetailList title="Team contributions" items={personality.teamContributions} accent="brand" />
        <DetailList title="Career tendencies" items={personality.careerTendencies} accent="brand" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <DetailText title="Work style" text={personality.workStyle} />
        <DetailText title="Communication style" text={personality.communicationStyle} />
        <DetailText title="Learning style" text={personality.learningStyle} />
      </section>

      {/* Raw JSON breakdown (transparency / the spec's example output) */}
      <details className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <summary className="cursor-pointer select-none text-sm font-medium text-slate-600 dark:text-slate-300">
          View detailed scoring breakdown
        </summary>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
{JSON.stringify(
  {
    type: score.type,
    dimensions: Object.fromEntries(
      DIMENSION_ORDER.map((d) => [
        d,
        { winner: score.dimensions[d].winner, confidence: score.dimensions[d].confidence },
      ])
    ),
  },
  null,
  2
)}
        </pre>
      </details>

      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={retake}
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Retake the assessment
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

const ACCENTS: Record<string, string> = {
  green: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  brand: "text-brand-600 dark:text-brand-400",
};

function DetailList({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: keyof typeof ACCENTS | string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className={`mt-0.5 ${ACCENTS[accent] ?? ACCENTS.brand}`} aria-hidden="true">
              ●
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailText({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  );
}
