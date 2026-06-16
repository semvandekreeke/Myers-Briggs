"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getTopic, getWhyForType, TOPICS } from "@/lib/development";
import type { TopicId } from "@/lib/growth";
import { getPersonality } from "@/lib/personalities";
import { useTopicProgress, useGoals } from "@/lib/use-local";
import { TypeGate } from "@/components/platform/TypeGate";
import { Card, RingProgress, Badge } from "@/components/platform/ui";
import {
  Section,
  SectionCard,
  BulletList,
  CardGrid,
} from "@/components/results/SectionCard";
import {
  IconAlert, IconStrength, IconChat, IconBook, IconRocket, IconCheck, IconArrowRight,
} from "@/components/results/icons";

function Checklist({ topicId, items }: { topicId: TopicId; items: string[] }) {
  const { checked, toggle } = useTopicProgress(topicId);
  const set = new Set(checked);
  const pct = items.length ? Math.round((checked.length / items.length) * 100) : 0;

  return (
    <Card>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex justify-center">
          <RingProgress value={pct} label="complete" />
        </div>
        <div className="flex-1 space-y-2">
          {items.map((item, i) => {
            const done = set.has(i);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={done}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition",
                    done
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-slate-300 text-transparent dark:border-slate-600",
                  ].join(" ")}
                >
                  <IconCheck width={14} height={14} />
                </span>
                <span className={done ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-200"}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function AddGoalButton({ topicId, title }: { topicId: TopicId; title: string }) {
  const { addGoal } = useGoals();
  return (
    <button
      type="button"
      onClick={() => addGoal(`Work on: ${title}`, topicId)}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      Add to my goals
    </button>
  );
}

export default function DevelopmentTopicPage({ params }: { params: { topic: string } }) {
  const topic = getTopic(params.topic);
  if (!topic) notFound();

  const topicId = topic.id;

  return (
    <TypeGate>
      {(type) => {
        const personality = getPersonality(type);
        const why = getWhyForType(topicId, type);
        return (
          <div className="animate-fade-in space-y-12">
            {/* Hero */}
            <div>
              <Link
                href="/development"
                className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                ← All development tracks
              </Link>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-sm">
                <Badge className="bg-white/15 text-white ring-white/20">
                  Personalized for {type}
                </Badge>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{topic.title}</h1>
                <p className="mt-2 max-w-2xl text-brand-50/90">{topic.tagline}</p>
              </div>
            </div>

            {/* Overview */}
            <Section id="overview" title="Overview">
              <Card>
                <p className="leading-relaxed text-slate-700 dark:text-slate-200">{topic.overview}</p>
              </Card>
            </Section>

            {/* Why this happens — per type */}
            <Section
              id="why"
              title="Why this happens for you"
              intro={`How your ${personality?.name ?? type} (${type}) wiring shapes this — drawn from your four preferences.`}
            >
              <Card>
                <BulletList items={why} accent="violet" />
              </Card>
            </Section>

            {/* Common mistakes */}
            <Section id="mistakes" title="Common mistakes">
              <SectionCard title="Typical pitfalls" icon={<IconAlert />} accent="amber">
                <BulletList items={topic.commonMistakes} accent="amber" />
              </SectionCard>
            </Section>

            {/* Action plan */}
            <Section
              id="action-plan"
              title="Action plan"
              intro="Small, repeatable actions compound. Start with the daily list, layer in the weekly, and reflect to lock in the learning."
            >
              <CardGrid cols={2}>
                <SectionCard title="Daily actions" icon={<IconRocket />} accent="emerald">
                  <BulletList items={topic.actionPlan.daily} accent="emerald" />
                </SectionCard>
                <SectionCard title="Weekly actions" icon={<IconArrowRight />} accent="sky">
                  <BulletList items={topic.actionPlan.weekly} accent="sky" />
                </SectionCard>
                <SectionCard title="Reflection exercises" icon={<IconChat />} accent="violet">
                  <BulletList items={topic.actionPlan.reflection} accent="violet" />
                </SectionCard>
                <SectionCard title="Habits to build" icon={<IconStrength />} accent="brand">
                  <BulletList items={topic.actionPlan.habits} accent="brand" />
                </SectionCard>
              </CardGrid>
            </Section>

            {/* Real-life examples */}
            <Section id="examples" title="Real-life examples">
              <CardGrid cols={2}>
                {topic.examples.map((ex) => (
                  <SectionCard key={ex.title} title={ex.title}>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{ex.text}</p>
                  </SectionCard>
                ))}
              </CardGrid>
            </Section>

            {/* Progress checklist */}
            <Section
              id="checklist"
              title="Progress checklist"
              intro="Check items off as you build the habit. Your progress is saved automatically."
            >
              <Checklist topicId={topicId} items={topic.checklist} />
              <div className="mt-4">
                <AddGoalButton topicId={topicId} title={topic.title} />
              </div>
            </Section>

            {/* Resources */}
            <Section id="resources" title="Recommended resources">
              <CardGrid cols={3}>
                <SectionCard title="Books" icon={<IconBook />}>
                  <ul className="space-y-3">
                    {topic.books.map((b) => (
                      <li key={b.title} className="text-sm">
                        <p className="font-medium text-slate-800 dark:text-slate-100">{b.title}</p>
                        {b.by && <p className="text-slate-500 dark:text-slate-400">{b.by}</p>}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
                <SectionCard title="Podcasts" icon={<IconChat />} accent="rose">
                  <ul className="space-y-3">
                    {topic.podcasts.map((p) => (
                      <li key={p.title} className="text-sm">
                        <p className="font-medium text-slate-800 dark:text-slate-100">{p.title}</p>
                        {p.by && <p className="text-slate-500 dark:text-slate-400">{p.by}</p>}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
                <SectionCard title="Learning resources" icon={<IconRocket />} accent="sky">
                  <ul className="space-y-3">
                    {topic.resources.map((r) => (
                      <li key={r.title} className="text-sm">
                        <p className="font-medium text-slate-800 dark:text-slate-100">{r.title}</p>
                        {r.kind && <p className="text-slate-500 dark:text-slate-400">{r.kind}</p>}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              </CardGrid>
            </Section>
          </div>
        );
      }}
    </TypeGate>
  );
}
