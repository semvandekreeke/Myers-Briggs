import { ALL_TYPES } from "./mbti";
import {
  computeCompatibility,
  type CompatibilityResult,
  type MatchCategory,
} from "./compatibility";

/**
 * Personality matches: rank all 16 types against the user's type and bucket
 * them into the five named categories. Explanations come from the compatibility
 * engine (dimension-grounded, not stereotyped).
 */

export const MATCH_CATEGORIES: MatchCategory[] = [
  "Strong Match",
  "Good Match",
  "Balanced Match",
  "Growth Match",
  "Potential Challenge",
];

export const CATEGORY_BLURB: Record<MatchCategory, string> = {
  "Strong Match":
    "Natural ease — you understand each other quickly and align across most contexts.",
  "Good Match":
    "Comfortable and complementary, with small differences that are easy to bridge.",
  "Balanced Match":
    "A healthy mix of common ground and contrast that keeps things interesting.",
  "Growth Match":
    "Meaningful differences that stretch you both — rewarding with mutual effort.",
  "Potential Challenge":
    "Very different defaults. The most growth potential, and the most translation required.",
};

export interface MatchesByCategory {
  category: MatchCategory;
  blurb: string;
  matches: CompatibilityResult[];
}

/**
 * Compute and group matches for a type. Excludes the type itself from the
 * ranking by default (you can include it to show "same-type" dynamics).
 */
export function getMatches(
  type: string,
  { includeSelf = false }: { includeSelf?: boolean } = {}
): MatchesByCategory[] {
  const results = ALL_TYPES.filter(
    (t) => includeSelf || t !== type.toUpperCase()
  )
    .map((t) => computeCompatibility(type, t))
    .sort((x, y) => y.overall - x.overall);

  return MATCH_CATEGORIES.map((category) => ({
    category,
    blurb: CATEGORY_BLURB[category],
    matches: results.filter((r) => r.category === category),
  })).filter((group) => group.matches.length > 0);
}

/** The single best match for a type — handy for dashboards. */
export function getTopMatch(type: string): CompatibilityResult {
  return ALL_TYPES.filter((t) => t !== type.toUpperCase())
    .map((t) => computeCompatibility(type, t))
    .sort((x, y) => y.overall - x.overall)[0];
}
