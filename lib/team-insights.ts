import { getPoles, groupOf, GROUPS, type GroupName } from "./mbti";
import { computeCompatibility } from "./compatibility";
import type { DimensionId } from "./types";

/**
 * Team insights engine.
 *
 * Given the set of member types in a group, derive strengths, likely friction
 * points, missing perspectives, and concrete collaboration advice — all from
 * the distribution of preferences rather than from per-type clichés.
 */

export interface PoleDistribution {
  E: number; I: number;
  S: number; N: number;
  T: number; F: number;
  J: number; P: number;
}

export interface TeamInsights {
  memberCount: number;
  distribution: PoleDistribution;
  groupCounts: Record<GroupName, number>;
  /** Average pairwise overall compatibility (0–100), or null for <2 members. */
  cohesion: number | null;
  strengths: string[];
  conflicts: string[];
  missingPerspectives: string[];
  collaborationTips: string[];
}

const DIMS: { id: DimensionId; a: keyof PoleDistribution; b: keyof PoleDistribution }[] = [
  { id: "EI", a: "E", b: "I" },
  { id: "SN", a: "S", b: "N" },
  { id: "TF", a: "T", b: "F" },
  { id: "JP", a: "J", b: "P" },
];

function emptyDistribution(): PoleDistribution {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
}

export function analyzeTeam(types: string[]): TeamInsights {
  const members = types.map((t) => t.toUpperCase());
  const n = members.length;

  // --- Distribution ---
  const dist = emptyDistribution();
  for (const t of members) {
    const p = getPoles(t);
    dist[p.EI]++; dist[p.SN]++; dist[p.TF]++; dist[p.JP]++;
  }

  const groupCounts = { Analysts: 0, Diplomats: 0, Sentinels: 0, Explorers: 0 } as Record<GroupName, number>;
  for (const t of members) groupCounts[groupOf(t)]++;

  // --- Cohesion (average pairwise compatibility) ---
  let cohesion: number | null = null;
  if (n >= 2) {
    let sum = 0;
    let pairs = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        sum += computeCompatibility(members[i], members[j]).overall;
        pairs++;
      }
    }
    cohesion = Math.round(sum / pairs);
  }

  // --- Strengths (well-represented preferences) ---
  const strengths: string[] = [];
  const share = (count: number) => (n === 0 ? 0 : count / n);

  if (share(dist.N) >= 0.5) strengths.push("Strong appetite for ideas, vision, and long-range thinking.");
  if (share(dist.S) >= 0.5) strengths.push("Grounded, practical execution and attention to real-world detail.");
  if (share(dist.T) >= 0.5) strengths.push("Decisions held to a high bar of logic and objectivity.");
  if (share(dist.F) >= 0.5) strengths.push("Genuine attention to morale, people, and group harmony.");
  if (share(dist.J) >= 0.5) strengths.push("Reliable follow-through, structure, and a bias toward closing things out.");
  if (share(dist.P) >= 0.5) strengths.push("Flexibility, openness, and the ability to adapt when plans change.");
  if (share(dist.E) >= 0.5) strengths.push("Energy, momentum, and a willingness to drive conversations forward.");
  if (share(dist.I) >= 0.5) strengths.push("Depth, reflection, and considered input over reflexive reaction.");
  // A balanced T/F or J/P split is itself a strength.
  if (n >= 3 && Math.abs(dist.T - dist.F) <= 1) strengths.push("A rare balance of head and heart in how the team decides.");
  if (strengths.length === 0) strengths.push("A mix of preferences that gives the team a broad, balanced base.");

  // --- Conflicts (polarized or over-skewed dimensions) ---
  const conflicts: string[] = [];
  for (const { a, b } of DIMS) {
    const ca = dist[a];
    const cb = dist[b];
    if (n >= 4 && Math.min(ca, cb) / n >= 0.4) {
      conflicts.push(
        `The team is split fairly evenly between ${POLE_WORD[a]} and ${POLE_WORD[b]} — expect friction over ${FRICTION[a + b]} unless it's named explicitly.`
      );
    }
  }
  if (share(dist.T) >= 0.85 && n >= 3) conflicts.push("With almost everyone leading on logic, the human and morale impact of decisions can be overlooked.");
  if (share(dist.F) >= 0.85 && n >= 3) conflicts.push("With a strong harmony focus, the team may avoid necessary hard conversations or blunt trade-offs.");
  if (share(dist.J) >= 0.85 && n >= 3) conflicts.push("A heavily Judging team can lock plans too early and resist late but valuable changes.");
  if (share(dist.P) >= 0.85 && n >= 3) conflicts.push("A heavily Perceiving team may keep options open too long and struggle to converge on deadlines.");
  if (conflicts.length === 0 && n >= 2) conflicts.push("No major polarization detected — keep an eye on subtler differences in pace and priorities.");

  // --- Missing perspectives ---
  const missingPerspectives: string[] = [];
  (Object.keys(GROUPS) as GroupName[]).forEach((g) => {
    if (groupCounts[g] === 0 && n > 0) missingPerspectives.push(`${GROUP_PERSPECTIVE[g]} (no ${g} on the team).`);
  });
  if (dist.N === 0 && n > 0) missingPerspectives.push("No one is naturally pulling toward big-picture possibility and innovation.");
  if (dist.S === 0 && n > 0) missingPerspectives.push("No one is naturally grounding ideas in practical, concrete detail.");
  if (dist.F === 0 && n > 0) missingPerspectives.push("No one is naturally championing the people-and-morale side of decisions.");
  if (dist.T === 0 && n > 0) missingPerspectives.push("No one is naturally pushing for detached, objective analysis.");
  if (missingPerspectives.length === 0 && n > 0) missingPerspectives.push("All four temperaments are represented — a well-rounded mix of perspectives.");

  // --- Collaboration tips ---
  const tips: string[] = [];
  if (conflicts.some((c) => c.includes("logic"))) tips.push("Add an explicit 'who does this affect?' step before finalizing decisions.");
  if (conflicts.some((c) => c.includes("harmony"))) tips.push("Appoint a rotating 'devil's advocate' so hard trade-offs get voiced safely.");
  if (conflicts.some((c) => c.includes("lock plans"))) tips.push("Build a checkpoint to revisit plans midway, treating change as information rather than failure.");
  if (conflicts.some((c) => c.includes("open too long"))) tips.push("Agree on decision deadlines up front and timebox open exploration.");
  if (share(dist.E) >= 0.7) tips.push("Reserve quiet, async channels so reflective members can contribute fully.");
  if (share(dist.I) >= 0.7) tips.push("Share agendas in advance so members can prepare rather than think on the spot.");
  tips.push("Make each member's working style explicit early — most team friction is mismatched expectations, not mismatched people.");

  return {
    memberCount: n,
    distribution: dist,
    groupCounts,
    cohesion,
    strengths,
    conflicts,
    missingPerspectives,
    collaborationTips: Array.from(new Set(tips)),
  };
}

const POLE_WORD: Record<string, string> = {
  E: "Extraverts", I: "Introverts",
  S: "detail-focused members", N: "big-picture members",
  T: "logic-led members", F: "values-led members",
  J: "structure-seekers", P: "flexibility-seekers",
};

const FRICTION: Record<string, string> = {
  EI: "meeting pace and how airtime is shared",
  SN: "how much detail versus vision drives the conversation",
  TF: "whether logic or people-impact wins a close call",
  JP: "deadlines, structure, and how soon to commit",
};

const GROUP_PERSPECTIVE: Record<GroupName, string> = {
  Analysts: "Strategic, systems-level problem solving is under-represented",
  Diplomats: "Empathy, meaning, and people-development focus is under-represented",
  Sentinels: "Stability, process, and dependable execution is under-represented",
  Explorers: "Hands-on adaptability and in-the-moment problem solving is under-represented",
};
