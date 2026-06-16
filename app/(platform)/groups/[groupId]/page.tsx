"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGroup, useCurrentResult, useProfile } from "@/lib/use-local";
import { getPersonality } from "@/lib/personalities";
import { PageHeader, Card, EmptyState } from "@/components/platform/ui";
import { TypeSelect } from "@/components/groups/TypeSelect";
import { CompatibilityMatrix } from "@/components/groups/CompatibilityMatrix";
import { TeamInsightsView } from "@/components/groups/TeamInsightsView";
import { TypeAvatar } from "@/components/results/TypeAvatar";
import { Section } from "@/components/results/SectionCard";
import { IconPlus } from "@/components/results/icons";

export default function GroupDetailPage({ params }: { params: { groupId: string } }) {
  const router = useRouter();
  const { group, hydrated, addMember, removeMember, leaveGroup, deleteGroup } = useGroup(params.groupId);
  const { result } = useCurrentResult();
  const { profile } = useProfile();

  const [memberName, setMemberName] = useState("");
  const [memberType, setMemberType] = useState("INTJ");

  if (!hydrated) {
    return <div className="py-20 text-center text-slate-400">Loading group…</div>;
  }

  if (!group) {
    return (
      <div className="animate-fade-in">
        <PageHeader eyebrow="Groups" title="Group not found" />
        <EmptyState
          title="This group doesn't exist"
          body="It may have been deleted, or the link is from another device (groups are stored locally until you sign in)."
          cta={{ href: "/groups", label: "Back to groups" }}
        />
      </div>
    );
  }

  const youInGroup = group.members.some((m) => m.isYou);

  return (
    <div className="animate-fade-in space-y-10">
      <div>
        <Link href="/groups" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
          ← All groups
        </Link>
        <PageHeader
          title={group.name}
          subtitle={group.description || `${group.members.length} member${group.members.length === 1 ? "" : "s"}`}
          action={
            <div className="flex gap-2">
              {youInGroup && (
                <button type="button" onClick={() => leaveGroup()} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                  Leave
                </button>
              )}
              <button
                type="button"
                onClick={() => { deleteGroup(); router.push("/groups"); }}
                className="rounded-xl border border-rose-300 bg-white px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-800 dark:bg-slate-800 dark:text-rose-400 dark:hover:bg-rose-900/20"
              >
                Delete
              </button>
            </div>
          }
        />
      </div>

      {/* Members */}
      <Section id="members" title="Members">
        <Card>
          {group.members.length === 0 ? (
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">No members yet. Add people below to build the compatibility matrix.</p>
          ) : (
            <ul className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {group.members.map((m) => (
                <li key={m.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-800">
                  <TypeAvatar code={m.type} size={40} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.name} {m.isYou && <span className="text-xs text-brand-500">(you)</span>}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{m.type} · {getPersonality(m.type)?.name}</p>
                  </div>
                  <button type="button" onClick={() => removeMember(m.id)} className="text-slate-400 hover:text-rose-500" aria-label={`Remove ${m.name}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Add member */}
          <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row sm:items-center">
            <input
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && memberName.trim()) { addMember({ name: memberName.trim(), type: memberType }); setMemberName(""); } }}
              placeholder="Member name"
              className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <TypeSelect value={memberType} onChange={setMemberType} />
            <button
              type="button"
              onClick={() => { if (memberName.trim()) { addMember({ name: memberName.trim(), type: memberType }); setMemberName(""); } }}
              className="inline-flex items-center justify-center gap-1 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              <IconPlus width={16} height={16} /> Add member
            </button>
            {result && !youInGroup && (
              <button type="button" onClick={() => addMember({ name: profile.name ?? "You", type: result.type, isYou: true })} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                Add yourself
              </button>
            )}
          </div>
        </Card>
      </Section>

      {/* Compatibility matrix */}
      <Section id="matrix" title="Compatibility matrix" intro="Overall compatibility for every pair, color-coded. Tap a cell for the full breakdown.">
        <CompatibilityMatrix members={group.members} />
      </Section>

      {/* Team insights */}
      <Section id="insights" title="Team insights" intro="What this group does well, where friction may arise, and what's missing.">
        <TeamInsightsView members={group.members} />
      </Section>
    </div>
  );
}
