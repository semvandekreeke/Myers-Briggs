"use client";

import { generateRoadmap, type RoadmapPhase } from "@/lib/roadmap";
import { getPersonality } from "@/lib/personalities";
import { TypeGate } from "@/components/platform/TypeGate";
import { PageHeader, Card } from "@/components/platform/ui";
import { BulletList } from "@/components/results/SectionCard";
import { IconTarget, IconStrength, IconSpark, IconCheck } from "@/components/results/icons";

function PhaseCard({ phase }: { phase: RoadmapPhase }) {
  return (
    <div className="relative pl-10">
      {/* Timeline node + line */}
      <span
        className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-brand-100 dark:ring-brand-900/40"
        aria-hidden="true"
      >
        {phase.index}
      </span>
      <span className="absolute left-[15px] top-10 h-[calc(100%-1rem)] w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />

      <Card className="mb-8 animate-fade-in">
        <h3 className="text-xl font-bold">{phase.title}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{phase.focus}</p>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
              <IconTarget width={16} height={16} /> Goals
            </h4>
            <BulletList items={phase.goals} accent="brand" />
          </div>
          <div className="space-y-5">
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                <IconSpark width={16} height={16} /> Skills to develop
              </h4>
              <BulletList items={phase.skills} accent="violet" />
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                <IconStrength width={16} height={16} /> Habits
              </h4>
              <BulletList items={phase.habits} accent="emerald" />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
            <IconCheck width={16} height={16} /> You'll know you're ready when…
          </h4>
          <BulletList items={phase.progressIndicators} accent="sky" />
        </div>
      </Card>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <TypeGate>
      {(type) => {
        const roadmap = generateRoadmap(type);
        const personality = getPersonality(type);
        if (!roadmap) return null;
        return (
          <div className="animate-fade-in">
            <PageHeader
              eyebrow="Personal Growth Roadmap"
              title="Your four-phase development plan"
              subtitle={`Built for ${personality?.name ?? type} (${type}) — from self-awareness to leadership. Move through the phases at your own pace.`}
            />
            <div>
              {roadmap.phases.map((phase) => (
                <PhaseCard key={phase.index} phase={phase} />
              ))}
            </div>
          </div>
        );
      }}
    </TypeGate>
  );
}
