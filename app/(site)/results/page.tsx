"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { DimensionId, ScoreResult } from "@/lib/types";
import { scoreAssessment, isComplete } from "@/lib/scoring";
import { getPersonality } from "@/lib/personalities";
import { getReport } from "@/lib/report-content";
import { loadAnswers, clearProgress } from "@/lib/storage";
import { ensureAssessmentRecorded } from "@/lib/local-store";
import { HeroSection } from "@/components/results/HeroSection";
import { ReportNavigation, type NavSection } from "@/components/results/ReportNavigation";
import { PersonalityTraits } from "@/components/results/PersonalityTraits";
import { CareerPath } from "@/components/results/CareerPath";
import { DevelopmentCenter } from "@/components/results/DevelopmentCenter";
import { Relationships } from "@/components/results/Relationships";

const DIMENSION_ORDER: DimensionId[] = ["EI", "SN", "TF", "JP"];

const SECTIONS: NavSection[] = [
  { id: "traits", label: "Personality Traits" },
  { id: "career", label: "Your Career Path" },
  { id: "growth", label: "Your Personal Growth" },
  { id: "relationships", label: "Your Relationships" },
];

export default function ResultsPage() {
  const router = useRouter();
  const [score, setScore] = useState<ScoreResult | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const answers = loadAnswers();
    if (!isComplete(answers)) {
      router.replace("/test");
      return;
    }
    const result = scoreAssessment(answers);
    setScore(result);
    setHydrated(true);
    // Persist the type + date so the dashboard, profile, and platform reflect it.
    ensureAssessmentRecorded(result.type);
  }, [router]);

  if (!hydrated || !score) {
    return (
      <div className="py-20 text-center text-slate-400">
        Calculating your results…
      </div>
    );
  }

  const personality = getPersonality(score.type);
  const report = getReport(score.type);

  if (!personality || !report) {
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
    <div className="space-y-8">
      <HeroSection personality={personality} dimensions={score.dimensions} />

      {/* Two-column layout: sticky nav + report body */}
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <aside className="lg:col-start-1">
          <ReportNavigation sections={SECTIONS} />
        </aside>

        <div className="min-w-0 space-y-16 pt-6 lg:col-start-2 lg:pt-0">
          <PersonalityTraits
            personality={personality}
            report={report}
            dimensions={score.dimensions}
          />
          <CareerPath personality={personality} report={report} />
          <DevelopmentCenter type={score.type} />
          <Relationships personality={personality} report={report} />

          {/* Transparency: raw scoring breakdown */}
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
        {
          winner: score.dimensions[d].winner,
          confidence: score.dimensions[d].confidence,
        },
      ])
    ),
  },
  null,
  2
)}
            </pre>
          </details>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-3 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Go to your dashboard
            </Link>
            <button
              type="button"
              onClick={retake}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
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
      </div>
    </div>
  );
}
