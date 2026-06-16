import { getPoles } from "./mbti";
import type { DimensionId } from "./types";

/**
 * Compatibility engine.
 *
 * Rather than hardcoding 256 pair outcomes or leaning on "opposites attract"
 * folklore, this models compatibility as the blend of four facets
 * (communication, work, friendship, relationship). Each facet weights the four
 * dimensions differently, and — crucially — a difference on a dimension does
 * NOT zero out its contribution: every dimension retains a tunable fraction of
 * its weight when the two types differ (`diff`). This produces nuanced,
 * non-deterministic-feeling scores where some differences are complementary and
 * only a few are genuinely costly.
 */

export type Facet = "communication" | "work" | "friendship" | "relationship";

export interface CompatibilityResult {
  a: string;
  b: string;
  overall: number;
  facets: Record<Facet, number>;
  category: MatchCategory;
  /** Short, constructive, non-stereotyped explanations for the pairing. */
  reasons: string[];
  /** One actionable tip for making the pairing work. */
  tip: string;
}

export type MatchCategory =
  | "Strong Match"
  | "Good Match"
  | "Balanced Match"
  | "Growth Match"
  | "Potential Challenge";

/**
 * Per-facet model. For each dimension: `w` is its weight (weights sum to 100
 * within a facet) and `diff` is the fraction of that weight retained when the
 * two types differ on the dimension (1 = difference is harmless/complementary,
 * low = difference is costly for this facet).
 */
type FacetModel = Record<DimensionId, { w: number; diff: number }>;

const MODELS: Record<Facet, FacetModel> = {
  // How easily two people exchange and interpret each other's meaning.
  communication: {
    EI: { w: 15, diff: 0.6 },
    SN: { w: 35, diff: 0.25 }, // shared information style matters most
    TF: { w: 30, diff: 0.4 },
    JP: { w: 20, diff: 0.7 },
  },
  // How smoothly two people coordinate and get things done together.
  work: {
    EI: { w: 15, diff: 0.7 },
    SN: { w: 20, diff: 0.5 },
    TF: { w: 30, diff: 0.45 },
    JP: { w: 35, diff: 0.3 }, // structure vs. flexibility clashes on execution
  },
  // Shared worldview, interests, and ease of casual connection.
  friendship: {
    EI: { w: 20, diff: 0.6 },
    SN: { w: 35, diff: 0.4 },
    TF: { w: 25, diff: 0.55 },
    JP: { w: 20, diff: 0.8 },
  },
  // Deeper romantic partnership — where complement and shared values both help.
  relationship: {
    EI: { w: 20, diff: 0.7 },
    SN: { w: 30, diff: 0.4 },
    TF: { w: 25, diff: 0.5 },
    JP: { w: 25, diff: 0.55 },
  },
};

const DIMS: DimensionId[] = ["EI", "SN", "TF", "JP"];

function sameOnDimension(a: string, b: string, dim: DimensionId): boolean {
  const pa = getPoles(a);
  const pb = getPoles(b);
  return pa[dim] === pb[dim];
}

function scoreFacet(a: string, b: string, facet: Facet): number {
  const model = MODELS[facet];
  let score = 0;
  for (const dim of DIMS) {
    const { w, diff } = model[dim];
    score += sameOnDimension(a, b, dim) ? w : w * diff;
  }
  return Math.round(score);
}

export function categorize(overall: number): MatchCategory {
  if (overall >= 85) return "Strong Match";
  if (overall >= 76) return "Good Match";
  if (overall >= 67) return "Balanced Match";
  if (overall >= 58) return "Growth Match";
  return "Potential Challenge";
}

// --- Explanation generation -------------------------------------------------
// Constructive, dimension-grounded sentences. Differences are framed as
// division-of-labor or growth, never as "incompatible".

const SAME_REASON: Record<DimensionId, string> = {
  EI: "You recharge in similar ways, so neither has to constantly translate their need for stimulation or quiet.",
  SN: "You take in the world through the same lens — concrete detail or big-picture pattern — so you rarely have to spell out the obvious to each other.",
  TF: "You weigh decisions on the same basis, which means your priorities tend to line up without much negotiation.",
  JP: "You share a rhythm for planning versus improvising, so day-to-day coordination feels effortless.",
};

const DIFF_REASON: Record<DimensionId, string> = {
  EI: "One of you leans outward and the other inward — handled well, this becomes a natural balance of initiating and reflecting.",
  SN: "One anchors in concrete reality while the other reaches for possibility; named openly, that gap is a powerful division of labor rather than a wall.",
  TF: "One leads with logic and the other with values — a difference that, with patience, makes your combined decisions far more complete.",
  JP: "One prefers things settled and the other prefers them open; this can chafe on timing, but it also keeps you from being either rigid or rudderless.",
};

function buildReasons(a: string, b: string): string[] {
  // Order dimensions by how much they shape the overall feel, then narrate the
  // two most salient same-traits and the most salient difference.
  const reasons: string[] = [];
  const sames = DIMS.filter((d) => sameOnDimension(a, b, d));
  const diffs = DIMS.filter((d) => !sameOnDimension(a, b, d));

  // Lead with shared ground (priority SN, TF, then EI, JP).
  const priority: DimensionId[] = ["SN", "TF", "EI", "JP"];
  for (const d of priority) {
    if (sames.includes(d) && reasons.length < 2) reasons.push(SAME_REASON[d]);
  }
  // Then surface the most consequential difference.
  for (const d of priority) {
    if (diffs.includes(d)) {
      reasons.push(DIFF_REASON[d]);
      break;
    }
  }
  // If they are identical, add a note about the shared blind spot.
  if (diffs.length === 0) {
    reasons.push(
      "Being so alike makes mutual understanding easy, but watch for shared blind spots — you may both overlook the same things."
    );
  }
  // If wildly different, acknowledge the effort honestly.
  if (sames.length === 0) {
    reasons.push(
      "You approach almost everything differently. That demands real effort to understand each other — and offers the widest perspective when you do."
    );
  }
  return reasons;
}

function buildTip(a: string, b: string): string {
  const diffs = DIMS.filter((d) => !sameOnDimension(a, b, d));
  if (diffs.length === 0)
    return "Deliberately invite outside perspectives — your similarity can become an echo chamber.";
  if (diffs.includes("TF"))
    return "Before deciding together, name both the logic and the human impact out loud — each of you sees half the picture.";
  if (diffs.includes("SN"))
    return "Agree on who owns the details and who owns the vision, and check in where they meet.";
  if (diffs.includes("JP"))
    return "Set shared deadlines explicitly; don't assume the other person reads timing the way you do.";
  return "Talk about how you each like to recharge, and protect that for one another.";
}

/** Compute the full compatibility result for an ordered pair. */
export function computeCompatibility(a: string, b: string): CompatibilityResult {
  const facets: Record<Facet, number> = {
    communication: scoreFacet(a, b, "communication"),
    work: scoreFacet(a, b, "work"),
    friendship: scoreFacet(a, b, "friendship"),
    relationship: scoreFacet(a, b, "relationship"),
  };

  // Overall weights communication and relationship slightly higher — they're
  // the strongest predictors of a durable connection across contexts.
  const overall = Math.round(
    facets.communication * 0.3 +
      facets.work * 0.2 +
      facets.friendship * 0.2 +
      facets.relationship * 0.3
  );

  return {
    a: a.toUpperCase(),
    b: b.toUpperCase(),
    overall,
    facets,
    category: categorize(overall),
    reasons: buildReasons(a, b),
    tip: buildTip(a, b),
  };
}

/** Tailwind classes for a score, used by color-coded cards. */
export function scoreColor(score: number): {
  text: string;
  bg: string;
  ring: string;
  bar: string;
} {
  if (score >= 85)
    return { text: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-900/30", ring: "ring-emerald-200 dark:ring-emerald-800", bar: "bg-emerald-500" };
  if (score >= 76)
    return { text: "text-teal-700 dark:text-teal-300", bg: "bg-teal-50 dark:bg-teal-900/30", ring: "ring-teal-200 dark:ring-teal-800", bar: "bg-teal-500" };
  if (score >= 67)
    return { text: "text-sky-700 dark:text-sky-300", bg: "bg-sky-50 dark:bg-sky-900/30", ring: "ring-sky-200 dark:ring-sky-800", bar: "bg-sky-500" };
  if (score >= 58)
    return { text: "text-amber-700 dark:text-amber-300", bg: "bg-amber-50 dark:bg-amber-900/30", ring: "ring-amber-200 dark:ring-amber-800", bar: "bg-amber-500" };
  return { text: "text-rose-700 dark:text-rose-300", bg: "bg-rose-50 dark:bg-rose-900/30", ring: "ring-rose-200 dark:ring-rose-800", bar: "bg-rose-500" };
}
