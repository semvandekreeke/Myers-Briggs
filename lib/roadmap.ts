import { getPoles } from "./mbti";
import { getPersonality } from "./personalities";
import { getReport } from "./report-content";

/**
 * Personal development roadmap generator.
 *
 * Produces a four-phase plan that is dynamically assembled from the type's own
 * blind spots, growth opportunities, and strengths plus dimension-grounded
 * skills and habits. Early phases focus on self-awareness and the type's
 * specific gaps; later phases focus on leveraging strengths and leading others.
 */

export interface RoadmapPhase {
  index: number;
  title: string;
  focus: string;
  goals: string[];
  skills: string[];
  habits: string[];
  progressIndicators: string[];
}

export interface Roadmap {
  type: string;
  phases: RoadmapPhase[];
}

const SKILL_BY_POLE: Record<string, string> = {
  E: "Active listening — drawing others out before adding your own view",
  I: "Visible communication — narrating your thinking so others can follow",
  S: "Strategic zoom-out — connecting today's work to a longer horizon",
  N: "Concrete execution — turning ideas into specific next steps",
  T: "Emotional attunement — reading and naming the human side of a situation",
  F: "Principled detachment — holding a hard line when logic requires it",
  J: "Adaptive planning — treating change as information, not failure",
  P: "Reliable follow-through — closing loops and honoring commitments",
};

const HABIT_BY_POLE: Record<string, string> = {
  E: "Pause for three seconds before responding in group conversations.",
  I: "Share one in-progress thought per meeting instead of waiting for the finished version.",
  S: "End each week by writing how this week's work serves a 6-month goal.",
  N: "Break one idea into its first three concrete actions before moving on.",
  T: "Ask 'how will this land for people?' before finalizing a decision.",
  F: "State the hard truth first, then the reassurance — not the reverse.",
  J: "Leave one plan deliberately open and notice what new information arrives.",
  P: "Set and keep one self-imposed deadline each week.",
};

export function generateRoadmap(type: string): Roadmap | null {
  const personality = getPersonality(type);
  const report = getReport(type);
  if (!personality || !report) return null;

  const p = getPoles(type);
  const skills = [SKILL_BY_POLE[p.EI], SKILL_BY_POLE[p.SN], SKILL_BY_POLE[p.TF], SKILL_BY_POLE[p.JP]];
  const habits = [HABIT_BY_POLE[p.EI], HABIT_BY_POLE[p.SN], HABIT_BY_POLE[p.TF], HABIT_BY_POLE[p.JP]];
  const blind = personality.blindSpots;
  const opps = report.growth.developmentOpportunities;
  const strengths = personality.strengths;

  const phases: RoadmapPhase[] = [
    {
      index: 1,
      title: "Foundation — Self-Awareness",
      focus: "See your own patterns clearly before trying to change them.",
      goals: [
        `Recognize your top blind spot in real time: ${blind[0] ?? "watch where your instinct overreaches."}`,
        "Name the situations that reliably drain or energize you.",
        "Establish a short daily reflection practice.",
      ],
      skills: [skills[2]],
      habits: ["Keep a 2-minute end-of-day note: one thing that went well, one pattern you noticed.", habits[2]],
      progressIndicators: [
        "You can catch a blind-spot moment as it happens, not just after.",
        "You've logged reflections at least 5 days in a row.",
      ],
    },
    {
      index: 2,
      title: "Expansion — Closing Gaps",
      focus: "Deliberately practice the skills that don't come naturally.",
      goals: [
        `Make progress on a key growth opportunity: ${opps[0] ?? "the area that stretches you most."}`,
        opps[1] ? `Begin work on: ${opps[1]}` : "Pick one underused skill to practice weekly.",
        "Ask one trusted person for candid feedback on a blind spot.",
      ],
      skills: [skills[0], skills[3]],
      habits: [habits[0], habits[3]],
      progressIndicators: [
        "You've practiced a non-default behavior in a real situation.",
        "You've acted on at least one piece of feedback you received.",
      ],
    },
    {
      index: 3,
      title: "Mastery — Leverage Your Strengths",
      focus: "Turn what you're already good at into a deliberate, reliable edge.",
      goals: [
        `Apply a core strength intentionally to a stretch project: ${strengths[0] ?? "your strongest natural ability."}`,
        "Build a routine that compounds your strengths over time.",
        "Mentor or help someone using a strength that comes easily to you.",
      ],
      skills: [skills[1]],
      habits: [habits[1], "Schedule weekly deep-work time protecting your highest-value strength."],
      progressIndicators: [
        "Others have begun to rely on you for this strength.",
        "You can describe your strength as a repeatable process, not just a talent.",
      ],
    },
    {
      index: 4,
      title: "Leadership — Influence & Contribution",
      focus: "Extend your growth outward — to teams, relationships, and impact.",
      goals: [
        "Adapt your communication style to people unlike you.",
        "Take responsibility for an outcome that depends on others.",
        "Turn your hardest-won lesson into guidance you can give others.",
      ],
      skills: ["Cross-type communication — flexing your style to your audience", skills[0]],
      habits: ["Before leading a discussion, plan how to include the people least like you.", habits[2]],
      progressIndicators: [
        "You've led a group through something and adjusted your style to fit it.",
        "People seek your perspective on growth, not just on tasks.",
      ],
    },
  ];

  return { type: type.toUpperCase(), phases };
}
