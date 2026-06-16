import type { Answers } from "./types";

/**
 * Thin, SSR-safe wrappers around localStorage for persisting in-progress
 * answers. All access is guarded so the module is safe to import on the server.
 */

export const STORAGE_KEYS = {
  answers: "mbti.answers.v1",
  currentIndex: "mbti.currentIndex.v1",
  theme: "mbti.theme.v1",
} as const;

const isBrowser = (): boolean => typeof window !== "undefined";

export function loadAnswers(): Answers {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.answers);
    return raw ? (JSON.parse(raw) as Answers) : {};
  } catch {
    return {};
  }
}

export function saveAnswers(answers: Answers): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(answers));
  } catch {
    /* storage may be unavailable (private mode / quota) — fail silently */
  }
}

export function loadCurrentIndex(): number {
  if (!isBrowser()) return 0;
  const raw = window.localStorage.getItem(STORAGE_KEYS.currentIndex);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function saveCurrentIndex(index: number): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.currentIndex, String(index));
  } catch {
    /* ignore */
  }
}

export function clearProgress(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEYS.answers);
  window.localStorage.removeItem(STORAGE_KEYS.currentIndex);
}
