"use client";

import { analyzeTeam } from "@/lib/team-insights";
import { GROUPS, type GroupName } from "@/lib/mbti";
import type { GroupMember } from "@/lib/local-store";
import { Card, Meter, StatTile } from "@/components/platform/ui";
import { BulletList } from "@/components/results/SectionCard";
import { IconStrength, IconAlert, IconCompass, IconSpark } from "@/components/results/icons";

const DICHOTOMIES: { left: keyof ReturnType<typeof analyzeTeam>["distribution"]; right: keyof ReturnType<typeof analyzeTeam>["distribution"]; label: string }[] = [
  { left: "E", right: "I", label: "Energy" },
  { left: "S", right: "N", label: "Information" },
  { left: "T", right: "F", label: "Decisions" },
  { left: "J", right: "P", label: "Structure" },
];

const POLE_FULL: Record<string, string> = {
  E: "Extravert", I: "Introvert", S: "Sensing", N: "Intuition",
  T: "Thinking", F: "Feeling", J: "Judging", P: "Perceiving",
};

export function TeamInsightsView({ members }: { members: GroupMember[] }) {
  const insights = analyzeTeam(members.map((m) => m.type));

  if (members.length === 0) {
    return (
      <Card>
        <p className="text-sm text-slate-500 dark:text-slate-400">Add members to generate team insights.</p>
      </Card>
    );
  }

  const { distribution: d } = insights;

  return (
    <div className="space-y-6">
      {/* Overview tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Members" value={insights.memberCount} />
        <StatTile label="Team cohesion" value={insights.cohesion !== null ? `${insights.cohesion}%` : "—"} hint="avg. compatibility" accent="emerald" />
        <StatTile label="Temperaments" value={`${(Object.keys(GROUPS) as GroupName[]).filter((g) => insights.groupCounts[g] > 0).length}/4`} accent="sky" />
        <StatTile label="Perspectives" value={insights.missingPerspectives.length === 0 ? "Full" : "Gaps"} accent="amber" />
      </div>

      {/* Distribution */}
      <Card>
        <h4 className="mb-4 font-semibold">Preference balance</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DICHOTOMIES.map((dim) => {
            const total = d[dim.left] + d[dim.right];
            const leftPct = total ? (d[dim.left] / total) * 100 : 50;
            return (
              <div key={dim.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{POLE_FULL[dim.left]} ({d[dim.left]})</span>
                  <span className="uppercase tracking-wide text-slate-400">{dim.label}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">({d[dim.right]}) {POLE_FULL[dim.right]}</span>
                </div>
                <Meter value={leftPct} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Strengths & conflicts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h4 className="mb-3 flex items-center gap-2 font-semibold">
            <span className="text-emerald-600 dark:text-emerald-400"><IconStrength /></span> Team strengths
          </h4>
          <BulletList items={insights.strengths} accent="emerald" />
        </Card>
        <Card>
          <h4 className="mb-3 flex items-center gap-2 font-semibold">
            <span className="text-amber-600 dark:text-amber-400"><IconAlert /></span> Potential conflicts
          </h4>
          <BulletList items={insights.conflicts} accent="amber" />
        </Card>
      </div>

      {/* Missing & collaboration */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <h4 className="mb-3 flex items-center gap-2 font-semibold">
            <span className="text-violet-600 dark:text-violet-400"><IconSpark /></span> Missing perspectives
          </h4>
          <BulletList items={insights.missingPerspectives} accent="violet" />
        </Card>
        <Card>
          <h4 className="mb-3 flex items-center gap-2 font-semibold">
            <span className="text-sky-600 dark:text-sky-400"><IconCompass /></span> Collaboration suggestions
          </h4>
          <BulletList items={insights.collaborationTips} accent="sky" />
        </Card>
      </div>
    </div>
  );
}
