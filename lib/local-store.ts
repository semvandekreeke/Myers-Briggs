import type { TopicId } from "./growth";

/**
 * Local persistence layer.
 *
 * The platform runs fully client-side out of the box: profile, goals,
 * development progress, and groups are stored in localStorage. This keeps the
 * app usable with zero backend setup. The Prisma + NextAuth + API layer
 * (see prisma/schema.prisma and app/api/*) is the drop-in production
 * persistence path; these functions mirror that data model so swapping the
 * implementation is straightforward.
 *
 * All functions are SSR-safe (guarded against a missing `window`).
 */

export const LOCAL_KEYS = {
  profile: "mbti.profile.v1",
  goals: "mbti.goals.v1",
  progress: "mbti.progress.v1",
  groups: "mbti.groups.v1",
} as const;

export interface LocalProfile {
  name?: string;
  type?: string;
  assessmentDate?: string; // ISO string
}

export interface Goal {
  id: string;
  title: string;
  topic?: TopicId;
  done: boolean;
  createdAt: string;
}

export interface GroupMember {
  id: string;
  name: string;
  type: string;
  /** True for the member representing the current user. */
  isYou?: boolean;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: GroupMember[];
  createdAt: string;
}

/** Map of topicId -> checked checklist item indices. */
export type TopicProgress = Record<string, number[]>;

const isBrowser = (): boolean => typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Notify same-tab listeners (the native 'storage' event only fires cross-tab).
    window.dispatchEvent(new CustomEvent("local-store-change", { detail: { key } }));
  } catch {
    /* quota / private mode — fail silently */
  }
}

/** Generate a reasonably unique id without external deps. */
export function genId(): string {
  if (isBrowser() && typeof window.crypto?.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e9).toString(36)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

// --- Profile ----------------------------------------------------------------

export function getProfile(): LocalProfile {
  return read<LocalProfile>(LOCAL_KEYS.profile, {});
}

export function setProfileName(name: string): LocalProfile {
  const next = { ...getProfile(), name };
  write(LOCAL_KEYS.profile, next);
  return next;
}

/**
 * Record (or refresh) the user's assessment. Updates the stored type and the
 * assessment date. Called when results are computed.
 */
export function recordAssessment(type: string): LocalProfile {
  const next: LocalProfile = {
    ...getProfile(),
    type: type.toUpperCase(),
    assessmentDate: nowIso(),
  };
  write(LOCAL_KEYS.profile, next);
  return next;
}

/**
 * Record an assessment only if it's new (no prior record, or the type changed).
 * Safe to call on every results-page view without churning the date.
 */
export function ensureAssessmentRecorded(type: string): LocalProfile {
  const profile = getProfile();
  if (profile.type === type.toUpperCase() && profile.assessmentDate) return profile;
  return recordAssessment(type);
}

// --- Goals ------------------------------------------------------------------

export function listGoals(): Goal[] {
  return read<Goal[]>(LOCAL_KEYS.goals, []);
}

export function addGoal(title: string, topic?: TopicId): Goal[] {
  const goal: Goal = { id: genId(), title, topic, done: false, createdAt: nowIso() };
  const next = [goal, ...listGoals()];
  write(LOCAL_KEYS.goals, next);
  return next;
}

export function toggleGoal(id: string): Goal[] {
  const next = listGoals().map((g) => (g.id === id ? { ...g, done: !g.done } : g));
  write(LOCAL_KEYS.goals, next);
  return next;
}

export function removeGoal(id: string): Goal[] {
  const next = listGoals().filter((g) => g.id !== id);
  write(LOCAL_KEYS.goals, next);
  return next;
}

// --- Development progress (checklists) --------------------------------------

export function getProgress(): TopicProgress {
  return read<TopicProgress>(LOCAL_KEYS.progress, {});
}

export function getTopicProgress(topicId: TopicId): number[] {
  return getProgress()[topicId] ?? [];
}

export function toggleChecklistItem(topicId: TopicId, index: number): TopicProgress {
  const progress = getProgress();
  const current = new Set(progress[topicId] ?? []);
  if (current.has(index)) current.delete(index);
  else current.add(index);
  const next = { ...progress, [topicId]: Array.from(current).sort((a, b) => a - b) };
  write(LOCAL_KEYS.progress, next);
  return next;
}

/** Overall development progress as a 0–100 percentage across given topics. */
export function overallProgress(totalsByTopic: Record<string, number>): number {
  const progress = getProgress();
  let done = 0;
  let total = 0;
  for (const [topicId, count] of Object.entries(totalsByTopic)) {
    total += count;
    done += Math.min((progress[topicId] ?? []).length, count);
  }
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

// --- Groups -----------------------------------------------------------------

export function listGroups(): Group[] {
  return read<Group[]>(LOCAL_KEYS.groups, []);
}

export function getGroup(id: string): Group | undefined {
  return listGroups().find((g) => g.id === id);
}

export function createGroup(
  name: string,
  description: string,
  initialMembers: GroupMember[] = []
): Group {
  const group: Group = {
    id: genId(),
    name,
    description,
    members: initialMembers,
    createdAt: nowIso(),
  };
  write(LOCAL_KEYS.groups, [group, ...listGroups()]);
  return group;
}

function updateGroup(id: string, updater: (g: Group) => Group): Group[] {
  const next = listGroups().map((g) => (g.id === id ? updater(g) : g));
  write(LOCAL_KEYS.groups, next);
  return next;
}

export function addMember(groupId: string, member: Omit<GroupMember, "id">): Group[] {
  return updateGroup(groupId, (g) => ({
    ...g,
    members: [...g.members, { ...member, id: genId() }],
  }));
}

export function removeMember(groupId: string, memberId: string): Group[] {
  return updateGroup(groupId, (g) => ({
    ...g,
    members: g.members.filter((m) => m.id !== memberId),
  }));
}

export function leaveGroup(groupId: string): Group[] {
  return updateGroup(groupId, (g) => ({
    ...g,
    members: g.members.filter((m) => !m.isYou),
  }));
}

export function deleteGroup(id: string): Group[] {
  const next = listGroups().filter((g) => g.id !== id);
  write(LOCAL_KEYS.groups, next);
  return next;
}
