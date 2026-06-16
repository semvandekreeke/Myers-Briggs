import Link from "next/link";
import { TOTAL_QUESTIONS } from "@/lib/questions";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl animate-fade-in space-y-10">
      <section className="space-y-5 pt-6 text-center">
        <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          {TOTAL_QUESTIONS} questions · about 8 minutes
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Discover your personality type
        </h1>
        <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-300">
          A modern 16-type assessment across four dimensions. Answer honestly —
          there are no right or wrong responses — and get a detailed breakdown of
          how you think, decide, and work.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
          <Link
            href="/test"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Start the assessment
          </Link>
          <span className="text-sm text-slate-400">
            Your progress is saved automatically.
          </span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {[
          {
            t: "Four dimensions",
            d: "Energy (E/I), Information (S/N), Decisions (T/F), and Structure (J/P).",
          },
          {
            t: "Confidence scores",
            d: "See how strong each preference is, not just the final letters.",
          },
          {
            t: "Detailed results",
            d: "Strengths, blind spots, work, communication, and learning styles.",
          },
          {
            t: "Private by design",
            d: "Answers stay in your browser. Nothing is sent to a server.",
          },
        ].map((f) => (
          <div
            key={f.t}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="font-semibold">{f.t}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {f.d}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
