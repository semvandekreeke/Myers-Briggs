import { getPoles } from "./mbti";
import { getPersonality } from "./personalities";
import { getReport } from "./report-content";

/**
 * Growth areas for the results-page Development Center.
 *
 * Combines existing per-type content (strengths, blind spots, relationship
 * growth) with dimension-grounded libraries for stress, leadership, and
 * communication. Each area links to a development topic ("Learn More").
 */

export type TopicId =
  | "communication"
  | "confidence"
  | "emotional-awareness"
  | "leadership"
  | "relationships"
  | "productivity";

export interface GrowthArea {
  id: string;
  title: string;
  topic: TopicId;
  summary: string;
  items: string[];
  /** Visual accent for the card. */
  accent: "emerald" | "amber" | "rose" | "sky" | "brand" | "violet";
}

// --- Dimension-grounded libraries (keyed by pole) ---------------------------

const STRESS_TRIGGERS: Record<string, string> = {
  E: "Long stretches of isolation with little interaction or feedback.",
  I: "Back-to-back social demands with no time alone to recharge.",
  S: "Vague, abstract problems with no concrete starting point.",
  N: "Repetitive, detail-heavy work with no room for ideas or change.",
  T: "Decisions driven by politics or emotion rather than merit.",
  F: "Cold, impersonal conflict or having to deliver harsh news.",
  J: "Last-minute changes that upend a settled, agreed-upon plan.",
  P: "Rigid schedules that force you to commit before you're ready.",
};

const LEADERSHIP_CHALLENGES: Record<string, string> = {
  E: "Drawing out quieter team members instead of filling the silence yourself.",
  I: "Staying visible and sharing your thinking enough for the team to follow.",
  S: "Lifting your gaze from execution to articulate a longer-term vision.",
  N: "Translating vision into concrete, near-term steps people can act on.",
  T: "Remembering that recognition and morale drive performance as much as logic.",
  F: "Holding people accountable and giving tough feedback without over-softening.",
  J: "Staying flexible when circumstances shift and the plan needs to bend.",
  P: "Providing the structure and follow-through your team needs to feel secure.",
};

const COMMUNICATION_CHALLENGES: Record<string, string> = {
  E: "Thinking out loud can crowd out quieter voices — leave deliberate space.",
  I: "Processing internally can leave others guessing what you actually think.",
  S: "Rich detail can bury the headline; lead with the point, then support it.",
  N: "Big-picture leaps can lose people who need the concrete specifics first.",
  T: "Directness can land as cold; a little acknowledgment goes a long way.",
  F: "Softening too much can blur the message; state the hard part plainly.",
  J: "Deciding early can shut down input before it has been fully heard.",
  P: "Leaving things open can read as indecision; signal where you've landed.",
};

function poleItems(type: string, lib: Record<string, string>): string[] {
  const p = getPoles(type);
  return [lib[p.EI], lib[p.SN], lib[p.TF], lib[p.JP]];
}

/**
 * Build the ordered list of growth areas for a type. Returns an empty array
 * for unknown types.
 */
export function getGrowthAreas(type: string): GrowthArea[] {
  const personality = getPersonality(type);
  const report = getReport(type);
  if (!personality || !report) return [];

  return [
    {
      id: "strengths",
      title: "Top strengths",
      topic: "confidence",
      accent: "emerald",
      summary: "What comes naturally to you — the foundation to build on and lead from.",
      items: personality.strengths,
    },
    {
      id: "growth-opportunities",
      title: "Growth opportunities",
      topic: "productivity",
      accent: "brand",
      summary: "The highest-leverage areas where focused effort will pay off most.",
      items: report.growth.developmentOpportunities,
    },
    {
      id: "blind-spots",
      title: "Blind spots",
      topic: "emotional-awareness",
      accent: "violet",
      summary: "Patterns that are easy to miss from the inside — worth watching for.",
      items: personality.blindSpots,
    },
    {
      id: "stress-triggers",
      title: "Stress triggers",
      topic: "emotional-awareness",
      accent: "amber",
      summary: "Conditions that tend to drain you — recognizing them is the first defense.",
      items: poleItems(type, STRESS_TRIGGERS),
    },
    {
      id: "leadership-challenges",
      title: "Leadership challenges",
      topic: "leadership",
      accent: "sky",
      summary: "Where your natural style can trip you up when you're responsible for others.",
      items: poleItems(type, LEADERSHIP_CHALLENGES),
    },
    {
      id: "communication-challenges",
      title: "Communication challenges",
      topic: "communication",
      accent: "rose",
      summary: "How your default wiring can be misread — and how to be understood.",
      items: poleItems(type, COMMUNICATION_CHALLENGES),
    },
    {
      id: "relationship-challenges",
      title: "Relationship challenges",
      topic: "relationships",
      accent: "rose",
      summary: "Where close relationships ask the most growth of your type.",
      items: report.relationships.growthOpportunities,
    },
  ];
}
