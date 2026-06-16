/**
 * Shared domain types for the MBTI assessment.
 *
 * The four MBTI dichotomies. Each `Dimension` is identified by its two-letter
 * code (e.g. "EI") and resolves to one of its two poles (e.g. "E" or "I").
 */

export type DimensionId = "EI" | "SN" | "TF" | "JP";

/** The eight possible preference poles across all four dimensions. */
export type Pole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

/**
 * A single Likert response, 1..5.
 *   1 = Strongly Disagree ... 5 = Strongly Agree
 */
export type LikertValue = 1 | 2 | 3 | 4 | 5;

/**
 * A question in the bank.
 *
 * `dimension`  — which dichotomy the item loads on.
 * `direction`  — which pole an *Agree* response pushes toward. This makes
 *                positive/negative keying explicit and data-driven: the scoring
 *                engine never needs to know anything about a specific question.
 *
 * Example: a question whose `dimension` is "EI" and `direction` is "E" means
 * "agreeing pushes the respondent toward Extraversion". A question with the
 * same dimension but `direction: "I"` is reverse-keyed relative to E.
 */
export interface Question {
  id: string;
  text: string;
  dimension: DimensionId;
  direction: Pole;
}

/** Map of questionId -> Likert response. Partial while the test is in progress. */
export type Answers = Record<string, LikertValue>;

/** Result for one dimension after scoring. */
export interface DimensionResult {
  /** The winning pole, e.g. "I". */
  winner: Pole;
  /** Confidence 50..100 (how strongly the winner is preferred). */
  confidence: number;
  /** Raw normalized score in 0..100 toward the *first* pole of the dimension. */
  rawScore: number;
}

/** Full scoring breakdown returned by the engine. */
export interface ScoreResult {
  /** The 4-letter type, e.g. "INTJ". */
  type: string;
  dimensions: Record<DimensionId, DimensionResult>;
}

/** Rich, human-facing description of a personality type. */
export interface PersonalityType {
  code: string;
  name: string;
  summary: string;
  strengths: string[];
  blindSpots: string[];
  workStyle: string;
  communicationStyle: string;
  learningStyle: string;
  teamContributions: string[];
  careerTendencies: string[];
}

// ---------------------------------------------------------------------------
// Rich report profiles — power the multi-section premium results report.
// Each of the 16 types supplies one `TypeReport` (see lib/report-content.ts).
// ---------------------------------------------------------------------------

/** Personality Traits section content. */
export interface PersonalityProfile {
  /** A multi-sentence narrative overview of the type. */
  overview: string;
  /** How this type tends to make decisions. */
  decisionMakingStyle: string;
}

/** Your Career Path section content. */
export interface CareerProfile {
  idealEnvironments: string[];
  leadershipStyle: string;
  motivators: string[];
  careerStrengths: string[];
  /** Careers that tend to fit well. */
  recommendedCareers: string[];
  /** Careers that may feel draining or misaligned. */
  challengingCareers: string[];
}

/** Your Personal Growth section content. */
export interface GrowthProfile {
  developmentOpportunities: string[];
  habitsToBuild: string[];
  habitsToAvoid: string[];
  emotionalGrowth: string;
  communicationTips: string[];
  stressManagement: string;
  /** An ordered, actionable development roadmap. */
  roadmap: string[];
}

/** Your Relationships section content. */
export interface RelationshipProfile {
  friendshipStyle: string;
  romanticTendencies: string;
  familyDynamics: string;
  communicationPreferences: string;
  conflictResolution: string;
  strengths: string[];
  growthOpportunities: string[];
}

/**
 * The complete rich report for a single type. The hero/strengths/blind-spots
 * etc. continue to come from `PersonalityType`; this adds the deeper,
 * section-specific narrative content.
 */
export interface TypeReport {
  personality: PersonalityProfile;
  career: CareerProfile;
  growth: GrowthProfile;
  relationships: RelationshipProfile;
}
