"use client";

import { getMatches } from "@/lib/matches";
import { scoreColor, type CompatibilityResult, type Facet } from "@/lib/compatibility";
import { getPersonality } from "@/lib/personalities";
import { TypeGate } from "@/components/platform/TypeGate";
import { PageHeader, Card, Meter, Badge } from "@/components/platform/ui";
import { TypeAvatar } from "@/components/results/TypeAvatar";

const FACET_LABEL: Record<Facet, string> = {
  communication: "Communication",
  work: "Work",
  friendship: "Friendship",
  relationship: "Relationship",
};

function MatchCard({ match }: { match: CompatibilityResult }) {
  const personality = getPersonality(match.b);
  const color = scoreColor(match.overall);

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <TypeAvatar code={match.b} size={52} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{personality?.name ?? match.b}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{match.b}</p>
        </div>
        <div className={`rounded-xl px-3 py-1.5 text-center ${color.bg} ${color.ring} ring-1`}>
          <span className={`text-lg font-bold ${color.text}`}>{match.overall}</span>
          <span className="block text-[10px] uppercase tracking-wide text-slate-400">match</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {(Object.keys(FACET_LABEL) as Facet[]).map((f) => (
          <div key={f}>
            <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{FACET_LABEL[f]}</span>
              <span className="font-medium">{match.facets[f]}</span>
            </div>
            <Meter value={match.facets[f]} colorClass={scoreColor(match.facets[f]).bar} />
          </div>
        ))}
      </div>

      <ul className="space-y-1.5 border-t border-slate-100 pt-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
        {match.reasons.slice(0, 2).map((r) => (
          <li key={r} className="flex gap-2">
            <span className="mt-1 text-brand-500" aria-hidden="true">•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>

      <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
        <span className="font-semibold">Make it work: </span>
        {match.tip}
      </p>
    </Card>
  );
}

const CATEGORY_STYLE: Record<string, string> = {
  "Strong Match": "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800",
  "Good Match": "bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:ring-teal-800",
  "Balanced Match": "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:ring-sky-800",
  "Growth Match": "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-800",
  "Potential Challenge": "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-800",
};

export default function MatchesPage() {
  return (
    <TypeGate>
      {(type) => {
        const groups = getMatches(type);
        const personality = getPersonality(type);
        return (
          <div className="animate-fade-in space-y-10">
            <PageHeader
              eyebrow="Personality Matches"
              title="How you connect with every type"
              subtitle={`Compatibility for ${personality?.name ?? type} (${type}), scored across communication, work, friendship, and romance. These are tendencies and starting points — every individual is more than their type.`}
            />

            {groups.map((group) => (
              <section key={group.category} className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={CATEGORY_STYLE[group.category]}>{group.category}</Badge>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{group.blurb}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.matches.map((m) => (
                    <MatchCard key={m.b} match={m} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        );
      }}
    </TypeGate>
  );
}
