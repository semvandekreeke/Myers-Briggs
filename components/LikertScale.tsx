"use client";

import type { LikertValue } from "@/lib/types";

interface LikertScaleProps {
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
  /** Stable name for the radiogroup (e.g. question id). */
  name: string;
}

const OPTIONS: { value: LikertValue; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

/**
 * A 5-point Likert scale rendered as an accessible radio group.
 * Keyboard- and screen-reader-friendly via native radio inputs.
 */
export function LikertScale({ value, onChange, name }: LikertScaleProps) {
  return (
    <fieldset>
      <legend className="sr-only">Choose your level of agreement</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={[
                "flex cursor-pointer items-center justify-center rounded-xl border p-3 text-center text-sm font-medium transition",
                "sm:flex-col sm:gap-2",
                selected
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:bg-brand-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:bg-slate-700",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={[
                  "hidden h-5 w-5 shrink-0 rounded-full border-2 sm:block",
                  selected
                    ? "border-white bg-white/30"
                    : "border-slate-400 dark:border-slate-500",
                ].join(" ")}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
