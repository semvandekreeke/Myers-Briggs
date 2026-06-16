import type {
  Answers,
  DimensionId,
  DimensionResult,
  LikertValue,
  Pole,
  Question,
  ScoreResult,
} from "./types";
import { QUESTIONS } from "./questions";

/**
 * Scoring engine.
 *
 * Design goals:
 *  - Completely data-driven: it reads each question's `dimension` and
 *    `direction` from the bank. Adding/removing questions requires *no* changes
 *    here, as long as every question declares which pole it loads on.
 *  - Handles positive and negative keying uniformly via signed contributions.
 *  - Produces a normalized 0..100 score per dimension plus a 50..100 confidence.
 */

/**
 * The "first" pole of each dimension. The normalized `rawScore` measures
 * preference toward this pole: 100 = maximum toward the first pole,
 * 0 = maximum toward the second pole, 50 = perfectly balanced.
 */
const FIRST_POLE: Record<DimensionId, Pole> = {
  EI: "E",
  SN: "S",
  TF: "T",
  JP: "J",
};

const SECOND_POLE: Record<DimensionId, Pole> = {
  EI: "I",
  SN: "N",
  TF: "F",
  JP: "P",
};

/**
 * Convert a 1..5 Likert response into a signed value in [-2, +2].
 *   1 (Strongly Disagree) -> -2
 *   3 (Neutral)           ->  0
 *   5 (Strongly Agree)    -> +2
 * A positive value means "agreement"; we then orient it toward the right pole
 * based on the question's `direction`.
 */
function likertToSigned(value: LikertValue): number {
  return value - 3;
}

/**
 * For a single answered question, return its signed contribution toward the
 * dimension's FIRST pole.
 *
 * If the question points toward the first pole (e.g. "E" for EI), agreement
 * adds a positive contribution. If it points toward the second pole (e.g. "I"),
 * agreement is reverse-keyed and subtracts — agreement pulls away from the
 * first pole.
 */
function contributionTowardFirstPole(
  question: Question,
  value: LikertValue
): number {
  const signed = likertToSigned(value); // -2..+2
  const pointsToFirstPole = question.direction === FIRST_POLE[question.dimension];
  return pointsToFirstPole ? signed : -signed;
}

/**
 * Score a single dimension from the answered questions.
 *
 * Returns a normalized 0..100 score toward the first pole and the resolved
 * winner + confidence. Unanswered questions are simply skipped, so partial
 * results are still meaningful (the UI, however, requires completion).
 */
function scoreDimension(
  dimension: DimensionId,
  questions: Question[],
  answers: Answers
): DimensionResult {
  const items = questions.filter((q) => q.dimension === dimension);

  let sum = 0; // signed total toward first pole
  let answeredCount = 0;

  for (const q of items) {
    const value = answers[q.id];
    if (value === undefined) continue;
    sum += contributionTowardFirstPole(q, value);
    answeredCount += 1;
  }

  // Each answered item contributes within [-2, +2]; max magnitude is 2 * n.
  const maxMagnitude = answeredCount * 2;

  // Normalize the signed sum from [-max, +max] into [0, 100] toward the first
  // pole. With no answers we default to a perfectly balanced 50.
  const rawScore =
    maxMagnitude === 0 ? 50 : ((sum / maxMagnitude) * 50 + 50);

  const winner: Pole =
    rawScore >= 50 ? FIRST_POLE[dimension] : SECOND_POLE[dimension];

  // Confidence is the distance from the 50/50 midpoint, mapped to 50..100.
  // A perfectly balanced answer => 50% confidence; a maximal lean => 100%.
  const confidence = Math.round(50 + Math.abs(rawScore - 50));

  return {
    winner,
    confidence,
    rawScore: Math.round(rawScore),
  };
}

/**
 * Score the full assessment.
 *
 * @param answers  Map of questionId -> Likert response.
 * @param bank     Question bank (defaults to the shipped QUESTIONS). Injectable
 *                 so tests or alternate banks can be scored with the same engine.
 */
export function scoreAssessment(
  answers: Answers,
  bank: Question[] = QUESTIONS
): ScoreResult {
  const dimensions = {} as Record<DimensionId, DimensionResult>;
  const dimensionIds: DimensionId[] = ["EI", "SN", "TF", "JP"];

  for (const id of dimensionIds) {
    dimensions[id] = scoreDimension(id, bank, answers);
  }

  // The 4-letter code is assembled in canonical MBTI order: EI, SN, TF, JP.
  const type = dimensionIds.map((id) => dimensions[id].winner).join("");

  return { type, dimensions };
}

/**
 * Validate that every question in the bank has been answered.
 * Returns the list of unanswered question ids (empty when complete).
 */
export function getUnansweredIds(
  answers: Answers,
  bank: Question[] = QUESTIONS
): string[] {
  return bank.filter((q) => answers[q.id] === undefined).map((q) => q.id);
}

export function isComplete(
  answers: Answers,
  bank: Question[] = QUESTIONS
): boolean {
  return getUnansweredIds(answers, bank).length === 0;
}
