"use client";

import type { DimensionId, DimensionResult, PersonalityType, TypeReport } from "@/lib/types";
import { DimensionMeter } from "@/components/DimensionMeter";
import {
  Section,
  SectionCard,
  CardGrid,
  BulletList,
} from "./SectionCard";
import { IconStrength, IconAlert, IconChat, IconScale, IconBriefcase, IconBook } from "./icons";

const DIMENSION_ORDER: DimensionId[] = ["EI", "SN", "TF", "JP"];

interface Props {
  personality: PersonalityType;
  report: TypeReport;
  dimensions: Record<DimensionId, DimensionResult>;
}

export function PersonalityTraits({ personality, report, dimensions }: Props) {
  return (
    <Section
      id="traits"
      eyebrow="01 — Who you are"
      title="Personality Traits"
      intro={report.personality.overview}
    >
      {/* Dimension breakdown */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Your four preferences</h3>
        <CardGrid cols={2}>
          {DIMENSION_ORDER.map((d) => (
            <DimensionMeter key={d} dimension={d} result={dimensions[d]} />
          ))}
        </CardGrid>
      </div>

      {/* Strengths & challenges */}
      <CardGrid cols={2}>
        <SectionCard title="Core strengths" icon={<IconStrength />} accent="emerald">
          <BulletList items={personality.strengths} accent="emerald" />
        </SectionCard>
        <SectionCard title="Potential blind spots" icon={<IconAlert />} accent="amber">
          <BulletList items={personality.blindSpots} accent="amber" />
        </SectionCard>
      </CardGrid>

      {/* Styles */}
      <CardGrid cols={2}>
        <SectionCard title="Communication style" icon={<IconChat />}>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {personality.communicationStyle}
          </p>
        </SectionCard>
        <SectionCard title="Decision-making style" icon={<IconScale />}>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {report.personality.decisionMakingStyle}
          </p>
        </SectionCard>
        <SectionCard title="Work style" icon={<IconBriefcase />}>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {personality.workStyle}
          </p>
        </SectionCard>
        <SectionCard title="Learning style" icon={<IconBook />}>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {personality.learningStyle}
          </p>
        </SectionCard>
      </CardGrid>
    </Section>
  );
}
