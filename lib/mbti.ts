import type { DimensionId } from "./types";

/**
 * Core MBTI helpers shared across the platform's analytical engines.
 * Pure, dependency-free, and framework-agnostic.
 */

/** The 16 types in canonical order. */
export const ALL_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP",
] as const;

export type MbtiType = (typeof ALL_TYPES)[number];

/** The resolved pole for each dimension of a given type. */
export interface Poles {
  EI: "E" | "I";
  SN: "S" | "N";
  TF: "T" | "F";
  JP: "J" | "P";
}

/** Split a 4-letter code into its four poles. */
export function getPoles(type: string): Poles {
  const t = type.toUpperCase();
  return {
    EI: t[0] === "E" ? "E" : "I",
    SN: t[1] === "S" ? "S" : "N",
    TF: t[2] === "T" ? "T" : "F",
    JP: t[3] === "J" ? "J" : "P",
  };
}

export const DIMENSION_IDS: DimensionId[] = ["EI", "SN", "TF", "JP"];

/** The four temperament groups (used for visuals and team analysis). */
export const GROUPS = {
  Analysts: ["INTJ", "INTP", "ENTJ", "ENTP"],
  Diplomats: ["INFJ", "INFP", "ENFJ", "ENFP"],
  Sentinels: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
  Explorers: ["ISTP", "ISFP", "ESTP", "ESFP"],
} as const;

export type GroupName = keyof typeof GROUPS;

export function groupOf(type: string): GroupName {
  const t = type.toUpperCase();
  return (Object.keys(GROUPS) as GroupName[]).find((g) =>
    (GROUPS[g] as readonly string[]).includes(t)
  ) as GroupName;
}

/** Tailwind gradient per temperament group — keeps visuals consistent. */
export const GROUP_GRADIENT: Record<GroupName, string> = {
  Analysts: "from-violet-400 to-fuchsia-500",
  Diplomats: "from-emerald-400 to-teal-500",
  Sentinels: "from-sky-400 to-blue-600",
  Explorers: "from-amber-400 to-orange-500",
};

/** Friendly full-word labels for each pole. */
export const POLE_NAME: Record<string, string> = {
  E: "Extraversion", I: "Introversion",
  S: "Sensing", N: "Intuition",
  T: "Thinking", F: "Feeling",
  J: "Judging", P: "Perceiving",
};

/** Friendly adjective for each pole (for compact UI). */
export const POLE_ADJECTIVE: Record<string, string> = {
  E: "Extraverted", I: "Introverted",
  S: "Observant", N: "Intuitive",
  T: "Thinking", F: "Feeling",
  J: "Judging", P: "Prospecting",
};

export function isValidType(type: string | undefined | null): type is MbtiType {
  return !!type && (ALL_TYPES as readonly string[]).includes(type.toUpperCase());
}
