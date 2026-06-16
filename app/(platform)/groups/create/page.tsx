"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGroups, useCurrentResult, useProfile } from "@/lib/use-local";
import { genId, type GroupMember } from "@/lib/local-store";
import { PageHeader, Card } from "@/components/platform/ui";
import { TypeSelect } from "@/components/groups/TypeSelect";
import { TypeAvatar } from "@/components/results/TypeAvatar";
import { IconPlus } from "@/components/results/icons";

export default function CreateGroupPage() {
  const router = useRouter();
  const { createGroup } = useGroups();
  const { result } = useCurrentResult();
  const { profile } = useProfile();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [memberName, setMemberName] = useState("");
  const [memberType, setMemberType] = useState("INTJ");

  const youAdded = members.some((m) => m.isYou);

  function addYou() {
    if (!result || youAdded) return;
    setMembers((prev) => [
      ...prev,
      { id: genId(), name: profile.name ?? "You", type: result.type, isYou: true },
    ]);
  }

  function addMember() {
    if (!memberName.trim()) return;
    setMembers((prev) => [...prev, { id: genId(), name: memberName.trim(), type: memberType }]);
    setMemberName("");
  }

  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function submit() {
    if (!name.trim()) return;
    const group = createGroup(name.trim(), description.trim(), members);
    router.push(`/groups/${group.id}`);
  }

  return (
    <div className="animate-fade-in mx-auto max-w-2xl">
      <PageHeader eyebrow="Groups" title="Create a group" subtitle="Name your group and add members by name and type. You can edit members anytime." />

      <Card className="space-y-5">
        <div>
          <label htmlFor="g-name" className="mb-1.5 block text-sm font-medium">Group name</label>
          <input
            id="g-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Product Team, Book Club, Family"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <div>
          <label htmlFor="g-desc" className="mb-1.5 block text-sm font-medium">Description <span className="text-slate-400">(optional)</span></label>
          <textarea
            id="g-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="What's this group for?"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        {/* Members */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium">Members</label>
            {result && !youAdded && (
              <button type="button" onClick={addYou} className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400">
                + Add yourself ({result.type})
              </button>
            )}
          </div>

          {members.length > 0 && (
            <ul className="mb-3 space-y-2">
              {members.map((m) => (
                <li key={m.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-800">
                  <TypeAvatar code={m.type} size={32} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{m.name} {m.isYou && <span className="text-xs text-brand-500">(you)</span>}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{m.type}</p>
                  </div>
                  <button type="button" onClick={() => removeMember(m.id)} className="text-slate-400 hover:text-rose-500" aria-label="Remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addMember(); } }}
              placeholder="Member name"
              className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
            <TypeSelect value={memberType} onChange={setMemberType} />
            <button type="button" onClick={addMember} className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              <IconPlus width={16} height={16} /> Add
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <button type="button" onClick={() => router.push("/groups")} className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={!name.trim()}
            className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create group
          </button>
        </div>
      </Card>
    </div>
  );
}
