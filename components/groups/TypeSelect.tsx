"use client";

import { ALL_TYPES } from "@/lib/mbti";
import { getPersonality } from "@/lib/personalities";

/** A labelled <select> of all 16 types (code + name). */
export function TypeSelect({
  value,
  onChange,
  id,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {ALL_TYPES.map((t) => (
        <option key={t} value={t}>
          {t} — {getPersonality(t)?.name}
        </option>
      ))}
    </select>
  );
}
