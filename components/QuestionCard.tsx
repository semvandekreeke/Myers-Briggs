"use client";

import type { LikertValue, Question } from "@/lib/types";
import { LikertScale } from "./LikertScale";

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
}

/** Presents a single question with its Likert scale. */
export function QuestionCard({
  question,
  index,
  total,
  value,
  onChange,
}: QuestionCardProps) {
  return (
    <div
      key={question.id}
      className="animate-fade-in rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
    >
      <p className="mb-1 text-sm font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
        Statement {index + 1} of {total}
      </p>
      <h2 className="mb-6 text-xl font-semibold leading-snug sm:text-2xl">
        {question.text}
      </h2>
      <LikertScale name={question.id} value={value} onChange={onChange} />
    </div>
  );
}
