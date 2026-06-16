"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import type { Answers, LikertValue } from "@/lib/types";
import { isComplete } from "@/lib/scoring";
import {
  loadAnswers,
  saveAnswers,
  loadCurrentIndex,
  saveCurrentIndex,
} from "@/lib/storage";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";

export default function TestPage() {
  const router = useRouter();
  const total = QUESTIONS.length;

  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  // Avoid hydration mismatch: only render saved state after mount.
  const [hydrated, setHydrated] = useState(false);

  // Restore persisted state on mount.
  useEffect(() => {
    setAnswers(loadAnswers());
    setIndex(Math.min(loadCurrentIndex(), total - 1));
    setHydrated(true);
  }, [total]);

  const current = QUESTIONS[index];
  const currentValue = answers[current.id];

  const answeredCount = useMemo(
    () => QUESTIONS.filter((q) => answers[q.id] !== undefined).length,
    [answers]
  );

  const complete = isComplete(answers);

  function handleAnswer(value: LikertValue) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    saveAnswers(next);

    // Auto-advance for a smooth flow, unless on the last question.
    if (index < total - 1) {
      const nextIndex = index + 1;
      // Small delay so the selection is visible before advancing.
      window.setTimeout(() => {
        setIndex(nextIndex);
        saveCurrentIndex(nextIndex);
      }, 220);
    }
  }

  function goTo(nextIndex: number) {
    const clamped = Math.max(0, Math.min(nextIndex, total - 1));
    setIndex(clamped);
    saveCurrentIndex(clamped);
  }

  function finish() {
    if (complete) router.push("/results");
  }

  if (!hydrated) {
    return (
      <div className="py-20 text-center text-slate-400">Loading…</div>
    );
  }

  return (
    <div className="space-y-8">
      <ProgressBar current={answeredCount} total={total} />

      <QuestionCard
        question={current}
        index={index}
        total={total}
        value={currentValue}
        onChange={handleAnswer}
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          ← Back
        </button>

        {index < total - 1 ? (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Skip / Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            disabled={!complete}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            See my results →
          </button>
        )}
      </div>

      {!complete && index === total - 1 && (
        <p className="text-center text-sm text-amber-600 dark:text-amber-400">
          You have {total - answeredCount} unanswered question
          {total - answeredCount === 1 ? "" : "s"}. Use Back to fill them in.
        </p>
      )}

      {/* Quick-jump grid lets users revisit and edit any answer. */}
      <details className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <summary className="cursor-pointer select-none text-sm font-medium text-slate-600 dark:text-slate-300">
          Jump to a question ({answeredCount}/{total} answered)
        </summary>
        <div className="mt-4 grid grid-cols-8 gap-2 sm:grid-cols-12">
          {QUESTIONS.map((q, i) => {
            const done = answers[q.id] !== undefined;
            const isCurrent = i === index;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to question ${i + 1}${done ? ", answered" : ""}`}
                aria-current={isCurrent ? "true" : undefined}
                className={[
                  "h-8 w-8 rounded-md text-xs font-medium transition",
                  isCurrent
                    ? "ring-2 ring-brand-500"
                    : "",
                  done
                    ? "bg-brand-600 text-white"
                    : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
                ].join(" ")}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}
