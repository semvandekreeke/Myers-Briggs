"use client";

import Link from "next/link";
import { useGroups } from "@/lib/use-local";
import { analyzeTeam } from "@/lib/team-insights";
import { PageHeader, Card, EmptyState, Badge } from "@/components/platform/ui";
import { IconPlus, IconUsers, IconArrowRight } from "@/components/results/icons";

export default function GroupsPage() {
  const { groups, hydrated } = useGroups();

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow="Groups"
        title="Personality groups"
        subtitle="Create a group for your team, family, or friends to see compatibility and shared insights."
        action={
          <Link
            href="/groups/create"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            <IconPlus width={18} height={18} /> Create group
          </Link>
        }
      />

      {!hydrated ? (
        <div className="py-20 text-center text-slate-400">Loading groups…</div>
      ) : groups.length === 0 ? (
        <EmptyState
          title="No groups yet"
          body="Create your first group and add members by name and type. You'll instantly get a color-coded compatibility matrix and team insights."
          cta={{ href: "/groups/create", label: "Create your first group" }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => {
            const cohesion = g.members.length >= 2 ? analyzeTeam(g.members.map((m) => m.type)).cohesion : null;
            return (
              <Link key={g.id} href={`/groups/${g.id}`} className="group">
                <Card className="h-full transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">
                      <IconUsers width={22} height={22} />
                    </span>
                    {cohesion !== null && (
                      <Badge className="bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
                        {cohesion}% cohesion
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold group-hover:text-brand-700 dark:group-hover:text-brand-300">{g.name}</h3>
                  {g.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{g.description}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.members.slice(0, 6).map((m) => (
                      <span key={m.id} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {m.type}
                      </span>
                    ))}
                    {g.members.length > 6 && (
                      <span className="text-xs text-slate-400">+{g.members.length - 6}</span>
                    )}
                    {g.members.length === 0 && (
                      <span className="text-xs text-slate-400">No members yet</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                    Open <IconArrowRight width={15} height={15} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
