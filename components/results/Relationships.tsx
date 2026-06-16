"use client";

import type { PersonalityType, TypeReport } from "@/lib/types";
import {
  Section,
  SectionCard,
  CardGrid,
  BulletList,
} from "./SectionCard";
import {
  IconUsers,
  IconHeart,
  IconHome,
  IconChat,
  IconShield,
  IconStrength,
  IconSpark,
} from "./icons";

interface Props {
  personality: PersonalityType;
  report: TypeReport;
}

export function Relationships({ personality, report }: Props) {
  const { relationships: r } = report;
  return (
    <Section
      id="relationships"
      eyebrow="04 — Your relationships"
      title="Your Relationships"
      intro={`How ${personality.name}s tend to connect — in friendships, love, and family — and where there's room to grow.`}
    >
      {/* Friendship / romance / family */}
      <CardGrid cols={3}>
        <SectionCard title="Friendships" icon={<IconUsers />} accent="sky">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {r.friendshipStyle}
          </p>
        </SectionCard>
        <SectionCard title="Romantic relationships" icon={<IconHeart />} accent="rose">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {r.romanticTendencies}
          </p>
        </SectionCard>
        <SectionCard title="Family dynamics" icon={<IconHome />} accent="emerald">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {r.familyDynamics}
          </p>
        </SectionCard>
      </CardGrid>

      {/* Communication + conflict */}
      <CardGrid cols={2}>
        <SectionCard title="Communication preferences" icon={<IconChat />}>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {r.communicationPreferences}
          </p>
        </SectionCard>
        <SectionCard title="Conflict resolution style" icon={<IconShield />} accent="amber">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {r.conflictResolution}
          </p>
        </SectionCard>
      </CardGrid>

      {/* Strengths + growth */}
      <CardGrid cols={2}>
        <SectionCard title="Relationship strengths" icon={<IconStrength />} accent="emerald">
          <BulletList items={r.strengths} accent="emerald" />
        </SectionCard>
        <SectionCard title="Growth opportunities" icon={<IconSpark />} accent="brand">
          <BulletList items={r.growthOpportunities} accent="brand" />
        </SectionCard>
      </CardGrid>
    </Section>
  );
}
