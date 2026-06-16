"use client";

import Link from "next/link";
import { TOPICS, TOPIC_IDS } from "@/lib/development";
import { useTopicProgress } from "@/lib/use-local";
import { PageHeader, Card, Meter } from "@/components/platform/ui";
import { TypeGate } from "@/components/platform/TypeGate";
import {
  IconChat, IconScale, IconSpark, IconCompass, IconHeart, IconRocket, IconArrowRight,
} from "@/components/results/icons";
import type { TopicId } from "@/lib/growth";

const TOPIC_ICON: Record<TopicId, (p: { width?: number; height?: number }) => JSX.Element> = {
  communication: IconChat,
  confidence: IconScale,
  "emotional-awareness": IconSpark,
  leadership: IconCompass,
  relationships: IconHeart,
  productivity: IconRocket,
};

function TopicCard({ id }: { id: TopicId }) {
  const topic = TOPICS[id];
  const { checked } = useTopicProgress(id);
  const total = topic.checklist.length;
  const pct = total ? Math.round((checked.length / total) * 100) : 0;
  const Icon = TOPIC_ICON[id];

  return (
    <Link href={`/development/${id}`} className="group">
      <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:shadow-md">
        <div className="mb-4 flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
            <Icon width={22} height={22} />
          </span>
          <IconArrowRight width={18} height={18} />
        </div>
        <h3 className="text-lg font-semibold">{topic.title}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{topic.tagline}</p>
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{checked.length}/{total} steps</span>
            <span>{pct}%</span>
          </div>
          <Meter value={pct} />
        </div>
      </Card>
    </Link>
  );
}

export default function DevelopmentHubPage() {
  return (
    <TypeGate>
      {() => (
        <div className="animate-fade-in">
          <PageHeader
            eyebrow="Personal Development Center"
            title="Grow in the areas that matter most"
            subtitle="Each track turns a growth area into a concrete, guided practice — with action plans, real examples, a progress checklist, and curated resources."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPIC_IDS.map((id) => (
              <TopicCard key={id} id={id} />
            ))}
          </div>
        </div>
      )}
    </TypeGate>
  );
}
