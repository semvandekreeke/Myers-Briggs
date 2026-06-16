/**
 * Example usage of the scoring engine — runnable demonstration.
 *
 * Run with:  npx tsx examples/example-results.ts
 * (or transpile with the TS compiler). This file does not touch React or the
 * DOM — the scoring engine is pure and framework-agnostic.
 */
import { QUESTIONS } from "../lib/questions";
import { scoreAssessment } from "../lib/scoring";
import { getPersonality } from "../lib/personalities";
import type { Answers, LikertValue } from "../lib/types";

/**
 * Build a synthetic answer set that leans toward a target pole on each
 * dimension. `strength` (1..2) controls how strongly: a respondent who leans
 * toward "I" will Agree(4)/Strongly-Agree(5) with I-keyed items and
 * Disagree(2)/Strongly-Disagree(1) with E-keyed items.
 */
function buildAnswers(
  leanings: Record<string, string>,
  strength: 1 | 2 = 2
): Answers {
  const agree: LikertValue = strength === 2 ? 5 : 4;
  const disagree: LikertValue = strength === 2 ? 1 : 2;
  const answers: Answers = {};
  for (const q of QUESTIONS) {
    const target = leanings[q.dimension];
    answers[q.id] = q.direction === target ? agree : disagree;
  }
  return answers;
}

// A respondent leaning I, N, T, J — but only weakly on J/P.
const mixed: Answers = {
  ...buildAnswers({ EI: "I", SN: "N", TF: "T", JP: "J" }, 2),
};
// Soften the JP dimension to demonstrate a lower-confidence result.
QUESTIONS.filter((q) => q.dimension === "JP").forEach((q, i) => {
  // Flip a few JP items to neutral/contrary so the lean is slight.
  if (i % 3 === 0) mixed[q.id] = 3;
});

const result = scoreAssessment(mixed);

console.log("=== Scoring result ===");
console.log(
  JSON.stringify(
    {
      type: result.type,
      dimensions: Object.fromEntries(
        Object.entries(result.dimensions).map(([k, v]) => [
          k,
          { winner: v.winner, confidence: v.confidence },
        ])
      ),
    },
    null,
    2
  )
);

const personality = getPersonality(result.type);
console.log("\n=== Type ===");
console.log(`${personality?.code} — ${personality?.name}`);
console.log(personality?.summary);
