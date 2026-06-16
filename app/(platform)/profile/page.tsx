"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getPersonality } from "@/lib/personalities";
import { TOPICS, TOPIC_IDS } from "@/lib/development";
import {
  useCurrentResult,
  useProfile,
  useGoals,
  useGroups,
  useAllProgress,
} from "@/lib/use-local";
import { PageHeader, Card, StatTile, Meter, Badge } from "@/components/platform/ui";
import { TypeAvatar } from "@/components/results/TypeAvatar";
import { IconUsers, IconArrowRight, IconCheck, IconPlus } from "@/components/results/icons";

const TOPIC_TOTALS: Record<string, number> = Object.fromEntries(
  TOPIC_IDS.map((id) => [id, TOPICS[id].checklist.length])
);

function NameEditor() {
  const { profile, setName } = useProfile();
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) setName(value.trim());
          setEditing(false);
        }}
        className="flex items-center gap-2"
      >
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Your name"
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
        />
        <button type="submit" className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white">Save</button>
        <button type="button" onClick={() => setEditing(false)} className="text-sm text-slate-500">Cancel</button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setValue(profile.name ?? "");
        setEditing(true);
      }}
      className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
    >
      {profile.name ? "Edit name" : "Add your name"}
    </button>
  );
}

function GoalsManager() {
  const { goals, addGoal, toggleGoal, removeGoal } = useGoals();
  const [title, setTitle] = useState("");

  return (
    <Card>
      <h3 className="mb-4 font-semibold">Your goals</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (title.trim()) {
            addGoal(title.trim());
            setTitle("");
          }
        }}
        className="mb-4 flex gap-2"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a personal goal…"
          className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
        />
        <button type="submit" className="inline-flex items-center gap-1 rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">
          <IconPlus width={16} height={16} /> Add
        </button>
      </form>
      {goals.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No goals yet — add one above or from a development track.</p>
      ) : (
        <ul className="space-y-2">
          {goals.map((g) => (
            <li key={g.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-800">
              <button
                type="button"
                onClick={() => toggleGoal(g.id)}
                aria-pressed={g.done}
                aria-label={g.done ? "Mark incomplete" : "Mark complete"}
                className={[
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition",
                  g.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent dark:border-slate-600",
                ].join(" ")}
              >
                <IconCheck width={14} height={14} />
              </button>
              <span className={`flex-1 text-sm ${g.done ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-200"}`}>
                {g.title}
              </span>
              <button type="button" onClick={() => removeGoal(g.id)} aria-label="Delete goal" className="text-slate-400 hover:text-rose-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default function ProfilePage() {
  const { result, hydrated } = useCurrentResult();
  const { profile } = useProfile();
  const { groups } = useGroups();
  const { overall } = useAllProgress();
  const { data: session } = useSession();

  if (!hydrated) {
    return <div className="py-20 text-center text-slate-400">Loading your profile…</div>;
  }

  const type = result?.type;
  const personality = type ? getPersonality(type) : undefined;
  const progressPct = overall(TOPIC_TOTALS);
  const assessmentDate = profile.assessmentDate
    ? new Date(profile.assessmentDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
    : "Not taken yet";

  return (
    <div className="animate-fade-in space-y-8">
      <PageHeader eyebrow="Profile" title="Your profile" />

      {/* Identity card */}
      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {type ? <TypeAvatar code={type} size={88} /> : (
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-3xl bg-slate-200 text-slate-400 dark:bg-slate-800" aria-hidden="true">?</div>
          )}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold">{profile.name ?? "Anonymous"}</h2>
              <NameEditor />
            </div>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              {personality ? `${personality.name} · ${type}` : "No assessment yet"}
            </p>
            <p className="mt-0.5 text-sm text-slate-400">Assessment date: {assessmentDate}</p>
            {session?.user ? (
              <Badge className="mt-3 bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800">
                Synced · {session.user.email ?? session.user.name}
              </Badge>
            ) : (
              <p className="mt-3 text-xs text-slate-400">
                Stored on this device.{" "}
                <Link href="/signin" className="font-medium text-brand-600 hover:underline dark:text-brand-400">Sign in</Link>{" "}
                to save and sync across devices.
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Type" value={type ?? "—"} hint={personality?.name} />
        <StatTile label="Growth progress" value={`${progressPct}%`} accent="emerald" />
        <StatTile label="Groups" value={groups.length} accent="sky" />
        <StatTile label="Saved report" value={type ? "1" : "0"} accent="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Growth progress detail */}
        <Card>
          <h3 className="mb-4 font-semibold">Growth progress</h3>
          {type ? (
            <div className="space-y-3">
              {TOPIC_IDS.map((id) => {
                const total = TOPICS[id].checklist.length;
                return <ProgressRow key={id} topicId={id} total={total} />;
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">Take the assessment to start tracking growth.</p>
          )}
        </Card>

        {/* Goals */}
        <GoalsManager />
      </div>

      {/* Saved reports */}
      <Card>
        <h3 className="mb-4 font-semibold">Saved reports</h3>
        {type ? (
          <Link href="/results" className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
            <TypeAvatar code={type} size={44} />
            <div className="flex-1">
              <p className="font-medium">{personality?.name} · {type}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{assessmentDate}</p>
            </div>
            <IconArrowRight width={18} height={18} />
          </Link>
        ) : (
          <Link href="/test" className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">Take the assessment →</Link>
        )}
      </Card>

      {/* Group memberships */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Group memberships</h3>
          <Link href="/groups" className="text-sm text-brand-600 hover:underline dark:text-brand-400">Manage groups</Link>
        </div>
        {groups.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">You haven't joined any groups yet.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {groups.map((grp) => (
              <li key={grp.id}>
                <Link href={`/groups/${grp.id}`} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300">
                    <IconUsers width={18} height={18} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{grp.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{grp.members.length} members</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function ProgressRow({ topicId, total }: { topicId: (typeof TOPIC_IDS)[number]; total: number }) {
  // Reads reactively via the shared progress hook through a small wrapper.
  const { progress } = useAllProgress();
  const done = progress[topicId]?.length ?? 0;
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <Link href={`/development/${topicId}`} className="text-slate-700 hover:text-brand-600 dark:text-slate-200">{TOPICS[topicId].title}</Link>
        <span className="text-slate-500 dark:text-slate-400">{pct}%</span>
      </div>
      <Meter value={pct} />
    </div>
  );
}
