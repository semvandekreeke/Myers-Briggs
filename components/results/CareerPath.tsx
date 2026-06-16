"use client";

import type { PersonalityType, TypeReport } from "@/lib/types";
import {
  Section,
  SectionCard,
  CardGrid,
  BulletList,
  ChipList,
} from "./SectionCard";
import {
  IconCompass,
  IconUsers,
  IconSpark,
  IconStrength,
  IconBriefcase,
  IconAlert,
} from "./icons";

interface Props {
  personality: PersonalityType;
  report: TypeReport;
}

export function CareerPath({ personality, report }: Props) {
  const { career } = report;
  return (
    <Section
      id="career"
      eyebrow="02 — Your career path"
      title="Your Career Path"
      intro={`Where ${personality.name}s tend to thrive professionally — the environments, roles, and motivators that bring out their best work.`}
    >
      {/* Environments + leadership/motivators */}
      <CardGrid cols={2}>
        <SectionCard title="Ideal work environments" icon={<IconCompass />}>
          <BulletList items={career.idealEnvironments} />
        </SectionCard>
        <div className="space-y-4">
          <SectionCard title="Leadership style" icon={<IconUsers />} accent="sky">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {career.leadershipStyle}
            </p>
          </SectionCard>
          <SectionCard title="What motivates you" icon={<IconSpark />} accent="amber">
            <BulletList items={career.motivators} accent="amber" />
          </SectionCard>
        </div>
      </CardGrid>

      {/* Strengths + team contributions */}
      <CardGrid cols={2}>
        <SectionCard title="Career strengths" icon={<IconStrength />} accent="emerald">
          <BulletList items={career.careerStrengths} accent="emerald" />
        </SectionCard>
        <SectionCard title="Team contributions" icon={<IconUsers />}>
          <BulletList items={personality.teamContributions} />
        </SectionCard>
      </CardGrid>

      {/* Fit vs challenging careers */}
      <CardGrid cols={2}>
        <SectionCard title="Careers that fit well" icon={<IconBriefcase />} accent="emerald">
          <ChipList items={career.recommendedCareers} accent="emerald" />
        </SectionCard>
        <SectionCard title="Careers that may challenge you" icon={<IconAlert />} accent="rose">
          <ChipList items={career.challengingCareers} accent="rose" />
        </SectionCard>
      </CardGrid>
    </Section>
  );
}
