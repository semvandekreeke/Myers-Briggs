"use client";

import Link from "next/link";
import { getGrowthAreas, type GrowthArea } from "@/lib/growth";
import { Section, SectionCard, BulletList, CardGrid } from "./SectionCard";
import { IconArrowRight, IconRocket, IconCompass } from "./icons";

const ACCENT_BTN: Record<GrowthArea["accent"], string> = {
  emerald: "text-emerald-700 dark:text-emerald-400",
  amber: "text-amber-700 dark:text-amber-400",
  rose: "text-rose-700 dark:text-rose-400",
  sky: "text-sky-700 dark:text-sky-400",
  brand: "text-brand-700 dark:text-brand-400",
  violet: "text-violet-700 dark:text-violet-400",
};

/**
 * The interactive Development Center shown on the results page. Renders the
 * seven growth areas as cards, each linking to a dedicated development track
 * ("Learn More" → /development/[topic]).
 */
export function DevelopmentCenter({ type }: { type: string }) {
  const areas = getGrowthAreas(type);

  return (
    <Section
      id="growth"
      eyebrow="03 — Your personal growth"
      title="Personal Development Center"
      intro="Your growth areas, made actionable. Open any track for a plain-language explanation, an action plan, real examples, a progress checklist, and curated resources."
    >
      {/* CTAs */}
      <div className="flex flex-col gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-900/20 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-brand-900 dark:text-brand-100">Ready to go deeper?</h3>
          <p className="text-sm text-brand-800/80 dark:text-brand-200/80">
            Follow your personalized four-phase roadmap or browse all development tracks.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/roadmap" className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
            <IconCompass width={16} height={16} /> My roadmap
          </Link>
          <Link href="/development" className="inline-flex items-center gap-1.5 rounded-xl border border-brand-300 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 dark:border-brand-700 dark:bg-slate-900 dark:text-brand-300">
            <IconRocket width={16} height={16} /> All tracks
          </Link>
        </div>
      </div>

      {/* Growth area cards */}
      <CardGrid cols={2}>
        {areas.map((area) => (
          <SectionCard key={area.id} title={area.title} accent={area.accent}>
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">{area.summary}</p>
            <BulletList items={area.items} accent={area.accent} />
            <Link
              href={`/development/${area.topic}`}
              className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2 transition-all ${ACCENT_BTN[area.accent]}`}
            >
              Learn more <IconArrowRight width={15} height={15} />
            </Link>
          </SectionCard>
        ))}
      </CardGrid>
    </Section>
  );
}
