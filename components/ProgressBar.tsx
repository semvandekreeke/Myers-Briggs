"use client";

interface ProgressBarProps {
  current: number; // number answered (or current position)
  total: number;
}

/** Accessible progress indicator for the assessment. */
export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          Question {Math.min(current + 1, total)} of {total}
        </span>
        <span>{pct}% complete</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Assessment progress"
      >
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
