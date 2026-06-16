"use client";

import Link from "next/link";
import { getPersonality } from "@/lib/personalities";
import { getTopMatch } from "@/lib/matches";
import { TOPICS, TOPIC_IDS } from "@/lib/development";
import { scoreColor } from "@/lib/compatibility";
import {
  useCurrentResult,
  useProfile,
  useGoals,
  useGroups,
  useAllProgress,
} from "@/lib/use-local";
import { PageHeader, Card, StatTile, Meter, RingProgress, EmptyState } from "@/components/platform/ui";
import { TypeAvatar } from "@/components/results/TypeAvatar";
import { IconArrowRight, IconUsers, IconCheck } from "@/components/results/icons";

const TOPIC_TOTALS: Record<string, number> = Object.fromEntries(
  TOPIC_IDS.map((id) => [id, TOPICS[id].checklist.length])
);

export default function DashboardPage() {
  const { result, hydrated } = useCurrentResult();
  const { profile } = useProfile();
  const { goals } = useGoals();
  const { groups } = useGroups();
  const { progress, overall } = useAllProgress();

  if (!hydrated) {
    return <div className="py-20 text-center text-slate-400">Loading your dashboard…</div>;
  }

  if (!result) {
    return (
      <div className="animate-fade-in">
        <PageHeader eyebrow="Dashboard" title="Welcome to Insight" />
        <EmptyState
          title="Take the assessment to begin"
          body="Your dashboard tracks your type, growth progress, goals, and compatibility insights — all unlocked by your first assessment."
          cta={{ href: "/test", label: "Start the assessment" }}
        />
      </div>
    );
  }

  const type = result.type;
  const personality = getPersonality(type);
  const progressPct = overall(TOPIC_TOTALS);
  const activeGoals = goals.filter((g) => !g.done);
  const topMatch = getTopMatch(type);
  const topMatchColor = scoreColor(topMatch.overall);

  // Development recommendations: topics with the least progress.
  const recommendations = [...TOPIC_IDS]
    .sort((a, b) => (progress[a]?.length ?? 0) - (progress[b]?.length ?? 0))
    .slice(0, 3);

  const assessmentDate = profile.assessmentDate
    ? new Date(profile.assessmentDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader
        eyebrow="Dashboard"
        title={profile.name ? `Welcome back, ${profile.name}` : "Your dashboard"}
        subtitle="Everything in one place — your type, growth, goals, and connections."
      />

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Your type" value={type} hint={personality?.name} />
        <StatTile label="Growth progress" value={`${progressPct}%`} hint="across all tracks" accent="emerald" />
        <StatTile label="Active goals" value={activeGoals.length} hint={`${goals.length} total`} accent="amber" />
        <StatTile label="Groups" value={groups.length} hint="you belong to" accent="sky" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Latest assessment */}
        <Card className="lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <TypeAvatar code={type} size={84} />
            <div className="flex-1">
              <p className="text-sm text-slate-500 dark:text-slate-400">Latest assessment · {assessmentDate}</p>
              <h2 className="text-2xl font-bold">
                {personality?.name} <span className="text-slate-400">· {type}</span>
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{personality?.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/results" className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
                  View full report <IconArrowRight width={16} height={16} />
                </Link>
                <Link href="/roadmap" className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                  Open roadmap
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Growth ring */}
        <Card className="flex flex-col items-center justify-center gap-3 text-center">
          <RingProgress value={progressPct} label="developed" />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {progressPct === 0 ? "Start a development track to build momentum." : "Keep going — small steps compound."}
          </p>
          <Link href="/development" className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
            Go to Development Center →
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active goals */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Active goals</h3>
            <Link href="/profile" className="text-sm text-brand-600 hover:underline dark:text-brand-400">Manage</Link>
          </div>
          {activeGoals.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No active goals yet. Add one from any development track to start tracking.
            </p>
          ) : (
            <ul className="space-y-2">
              {activeGoals.slice(0, 5).map((g) => (
                <li key={g.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm dark:border-slate-800">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-slate-300 text-transparent dark:border-slate-600">
                    <IconCheck width={12} height={12} />
                  </span>
                  <span className="text-slate-700 dark:text-slate-200">{g.title}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Top compatibility */}
        <Card>
          <h3 className="mb-3 font-semibold">Top compatibility</h3>
          <div className="flex items-center gap-3">
            <TypeAvatar code={topMatch.b} size={48} />
            <div className="flex-1">
              <p className="font-medium">{getPersonality(topMatch.b)?.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{topMatch.b}</p>
            </div>
            <span className={`rounded-lg px-2.5 py-1 text-sm font-bold ${topMatchColor.bg} ${topMatchColor.text}`}>
              {topMatch.overall}
            </span>
          </div>
          <Link href="/matches" className="mt-4 block text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
            See all matches →
          </Link>
        </Card>
      </div>

      {/* Development recommendations */}
      <Card>
        <h3 className="mb-4 font-semibold">Recommended for you</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {recommendations.map((id) => {
            const total = TOPICS[id].checklist.length;
            const done = progress[id]?.length ?? 0;
            const pct = total ? Math.round((done / total) * 100) : 0;
            return (
              <Link key={id} href={`/development/${id}`} className="group rounded-xl border border-slate-200 p-4 transition hover:border-brand-300 hover:bg-brand-50/50 dark:border-slate-800 dark:hover:border-brand-700 dark:hover:bg-brand-900/10">
                <p className="font-medium group-hover:text-brand-700 dark:group-hover:text-brand-300">{TOPICS[id].title}</p>
                <p className="mt-0.5 mb-3 text-xs text-slate-500 dark:text-slate-400">{TOPICS[id].tagline}</p>
                <Meter value={pct} />
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Group activity */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Group activity</h3>
          <Link href="/groups" className="text-sm text-brand-600 hover:underline dark:text-brand-400">All groups</Link>
        </div>
        {groups.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You're not in any groups yet. Create one to see team compatibility and insights.
          </p>
        ) : (
          <ul className="space-y-2">
            {groups.slice(0, 4).map((grp) => (
              <li key={grp.id}>
                <Link href={`/groups/${grp.id}`} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">
                    <IconUsers width={18} height={18} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{grp.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{grp.members.length} members</p>
                  </div>
                  <IconArrowRight width={16} height={16} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
