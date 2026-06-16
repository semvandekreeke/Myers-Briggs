"use client";

import { useEffect, useRef, useState } from "react";
import * as store from "./local-store";
import type { Goal, Group, GroupMember, LocalProfile } from "./local-store";
import type { TopicId } from "./growth";
import { loadAnswers } from "./storage";
import { isComplete, scoreAssessment } from "./scoring";
import type { ScoreResult } from "./types";

/**
 * Reactive hooks over the local store. Each subscribes to same-tab and
 * cross-tab change events, so any update is reflected everywhere immediately.
 *
 * Values initialize to an SSR-safe fallback and load the real value on mount,
 * avoiding hydration mismatches. `hydrated` lets pages distinguish "still
 * loading" from "genuinely empty".
 */
function useStoreValue<T>(reader: () => T, fallback: T): [T, boolean] {
  const readerRef = useRef(reader);
  readerRef.current = reader;
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setValue(readerRef.current());
      setHydrated(true);
    };
    refresh();
    window.addEventListener("local-store-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("local-store-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return [value, hydrated];
}

/** The user's current assessment result, derived from stored answers. */
export function useCurrentResult(): { result: ScoreResult | null; hydrated: boolean } {
  const [state, setState] = useState<{ result: ScoreResult | null; hydrated: boolean }>({
    result: null,
    hydrated: false,
  });

  useEffect(() => {
    const compute = () => {
      const answers = loadAnswers();
      setState({
        result: isComplete(answers) ? scoreAssessment(answers) : null,
        hydrated: true,
      });
    };
    compute();
    window.addEventListener("local-store-change", compute);
    window.addEventListener("storage", compute);
    return () => {
      window.removeEventListener("local-store-change", compute);
      window.removeEventListener("storage", compute);
    };
  }, []);

  return state;
}

export function useProfile() {
  const [profile, hydrated] = useStoreValue<LocalProfile>(() => store.getProfile(), {});
  return {
    profile,
    hydrated,
    setName: (name: string) => store.setProfileName(name),
    recordAssessment: (type: string) => store.recordAssessment(type),
  };
}

export function useGoals() {
  const [goals, hydrated] = useStoreValue<Goal[]>(() => store.listGoals(), []);
  return {
    goals,
    hydrated,
    addGoal: (title: string, topic?: TopicId) => store.addGoal(title, topic),
    toggleGoal: (id: string) => store.toggleGoal(id),
    removeGoal: (id: string) => store.removeGoal(id),
  };
}

export function useTopicProgress(topicId: TopicId) {
  const [checked, hydrated] = useStoreValue<number[]>(
    () => store.getTopicProgress(topicId),
    []
  );
  return {
    checked,
    hydrated,
    toggle: (index: number) => store.toggleChecklistItem(topicId, index),
  };
}

/**
 * All development progress, reactive. Returns the raw map plus a helper to
 * compute the overall completion percentage given each topic's item count.
 */
export function useAllProgress() {
  const [progress, hydrated] = useStoreValue<Record<string, number[]>>(
    () => store.getProgress(),
    {}
  );
  const overall = (totalsByTopic: Record<string, number>): number => {
    let done = 0;
    let total = 0;
    for (const [topicId, count] of Object.entries(totalsByTopic)) {
      total += count;
      done += Math.min((progress[topicId] ?? []).length, count);
    }
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };
  return { progress, hydrated, overall };
}

export function useGroups() {
  const [groups, hydrated] = useStoreValue<Group[]>(() => store.listGroups(), []);
  return {
    groups,
    hydrated,
    createGroup: (name: string, description: string, members?: GroupMember[]) =>
      store.createGroup(name, description, members),
    deleteGroup: (id: string) => store.deleteGroup(id),
  };
}

export function useGroup(id: string) {
  const [group, hydrated] = useStoreValue<Group | undefined>(
    () => store.getGroup(id),
    undefined
  );
  return {
    group,
    hydrated,
    addMember: (member: Omit<GroupMember, "id">) => store.addMember(id, member),
    removeMember: (memberId: string) => store.removeMember(id, memberId),
    leaveGroup: () => store.leaveGroup(id),
    deleteGroup: () => store.deleteGroup(id),
  };
}
