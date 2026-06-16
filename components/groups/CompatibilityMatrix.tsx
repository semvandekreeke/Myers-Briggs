"use client";

import { useState } from "react";
import { computeCompatibility, scoreColor, type Facet } from "@/lib/compatibility";
import type { GroupMember } from "@/lib/local-store";
import { Card, Meter } from "@/components/platform/ui";

const FACET_LABEL: Record<Facet, string> = {
  communication: "Communication",
  work: "Work",
  friendship: "Friendship",
  relationship: "Relationship",
};

function firstName(name: string): string {
  return name.split(" ")[0];
}

/**
 * Color-coded compatibility matrix for a group, plus expandable pairwise detail
 * cards (overall + four facet scores + a constructive note for every pair).
 */
export function CompatibilityMatrix({ members }: { members: GroupMember[] }) {
  const [selected, setSelected] = useState<{ i: number; j: number } | null>(null);

  if (members.length < 2) {
    return (
      <Card>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Add at least two members to see the compatibility matrix.
        </p>
      </Card>
    );
  }

  // All unique pairs for the detail cards.
  const pairs: { i: number; j: number }[] = [];
  for (let i = 0; i < members.length; i++)
    for (let j = i + 1; j < members.length; j++) pairs.push({ i, j });

  const active = selected ?? pairs[0];
  const activeResult = computeCompatibility(members[active.i].type, members[active.j].type);
  const activeColor = scoreColor(activeResult.overall);

  return (
    <div className="space-y-6">
      {/* Grid */}
      <Card className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white p-2 dark:bg-slate-900" />
              {members.map((m) => (
                <th key={m.id} className="p-2 align-bottom">
                  <div className="mx-auto w-16 truncate text-xs font-medium text-slate-600 dark:text-slate-300" title={`${m.name} · ${m.type}`}>
                    {firstName(m.name)}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400">{m.type}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((rowM, i) => (
              <tr key={rowM.id}>
                <th className="sticky left-0 bg-white p-2 text-right dark:bg-slate-900">
                  <div className="w-20 truncate text-xs font-medium text-slate-600 dark:text-slate-300" title={`${rowM.name} · ${rowM.type}`}>
                    {firstName(rowM.name)}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400">{rowM.type}</div>
                </th>
                {members.map((colM, j) => {
                  if (i === j)
                    return (
                      <td key={colM.id} className="p-1">
                        <div className="mx-auto flex h-11 w-14 items-center justify-center rounded-lg bg-slate-100 text-slate-300 dark:bg-slate-800 dark:text-slate-600">—</div>
                      </td>
                    );
                  const score = computeCompatibility(rowM.type, colM.type).overall;
                  const color = scoreColor(score);
                  const isActive = (active.i === i && active.j === j) || (active.i === j && active.j === i);
                  return (
                    <td key={colM.id} className="p-1">
                      <button
                        type="button"
                        onClick={() => setSelected(i < j ? { i, j } : { i: j, j: i })}
                        className={`mx-auto flex h-11 w-14 items-center justify-center rounded-lg text-sm font-bold ring-1 transition ${color.bg} ${color.text} ${color.ring} ${isActive ? "ring-2 ring-offset-1 ring-brand-500 dark:ring-offset-slate-900" : ""}`}
                        aria-label={`${rowM.name} and ${colM.name}: ${score}% compatible`}
                      >
                        {score}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-400">Tap any cell to see the full breakdown for that pair.</p>
      </Card>

      {/* Selected pair detail */}
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-semibold">
            {firstName(members[active.i].name)} ({members[active.i].type}){" "}
            <span className="text-slate-400">×</span>{" "}
            {firstName(members[active.j].name)} ({members[active.j].type})
          </h4>
          <span className={`rounded-lg px-3 py-1 text-sm font-bold ${activeColor.bg} ${activeColor.text}`}>
            {activeResult.overall}% · {activeResult.category}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {(Object.keys(FACET_LABEL) as Facet[]).map((f) => (
            <div key={f}>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{FACET_LABEL[f]}</span>
                <span className="font-medium">{activeResult.facets[f]}</span>
              </div>
              <Meter value={activeResult.facets[f]} colorClass={scoreColor(activeResult.facets[f]).bar} />
            </div>
          ))}
        </div>

        <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
          {activeResult.reasons.map((r) => (
            <li key={r} className="flex gap-2">
              <span className="mt-1 text-brand-500" aria-hidden="true">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
          <span className="font-semibold">Make it work: </span>{activeResult.tip}
        </p>
      </Card>
    </div>
  );
}
