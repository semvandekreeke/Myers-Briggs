"use client";

import type { PersonalityType, TypeReport } from "@/lib/types";
import {
  Section,
  SectionCard,
  CardGrid,
  BulletList,
} from "./SectionCard";
import {
  IconRocket,
  IconStrength,
  IconAlert,
  IconHeart,
  IconChat,
  IconShield,
} from "./icons";

interface Props {
  personality: PersonalityType;
  report: TypeReport;
}

export function PersonalGrowth({ personality, report }: Props) {
  const { growth } = report;
  return (
    <Section
      id="growth"
      eyebrow="03 — Your personal growth"
      title="Your Personal Growth"
      intro={`Practical, ${personality.code}-specific ways to grow — the habits to build, the patterns to watch, and a roadmap to put it into motion.`}
    >
      {/* Development opportunities */}
      <SectionCard title="Development opportunities" icon={<IconRocket />}>
        <BulletList items={growth.developmentOpportunities} />
      </SectionCard>

      {/* Habits build vs avoid */}
      <CardGrid cols={2}>
        <SectionCard title="Habits to build" icon={<IconStrength />} accent="emerald">
          <BulletList items={growth.habitsToBuild} accent="emerald" />
        </SectionCard>
        <SectionCard title="Habits to avoid" icon={<IconAlert />} accent="rose">
          <BulletList items={growth.habitsToAvoid} accent="rose" />
        </SectionCard>
      </CardGrid>

      {/* Emotional growth, communication tips, stress */}
      <CardGrid cols={2}>
        <SectionCard title="Emotional growth" icon={<IconHeart />} accent="rose">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {growth.emotionalGrowth}
          </p>
        </SectionCard>
        <SectionCard title="Communication tips" icon={<IconChat />} accent="sky">
          <BulletList items={growth.communicationTips} accent="sky" />
        </SectionCard>
      </CardGrid>

      <SectionCard title="Stress management" icon={<IconShield />} accent="amber">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {growth.stressManagement}
        </p>
      </SectionCard>

      {/* Roadmap — ordered, actionable */}
      <SectionCard title="Your development roadmap" icon={<IconRocket />} accent="brand">
        <ol className="space-y-3">
          {growth.roadmap.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="pt-0.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </SectionCard>
    </Section>
  );
}
