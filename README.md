# Insight — MBTI-style Personality Assessment

A production-quality, 16-type personality assessment built with **Next.js (App Router) + TypeScript + Tailwind CSS**. It administers a 60-question Likert assessment, runs a genuine data-driven scoring engine, and renders a rich results experience.

> For self-reflection and education only — not a clinical or diagnostic instrument.

## Features

- **60 questions**, 15 per dimension (E/I, S/N, T/F, J/P).
- **5-point Likert scale** with mixed positive/negative keying to reduce acquiescence bias.
- **Genuine scoring engine** — fully data-driven, computes per-dimension confidence and the final 4-letter type. No hardcoded outcomes.
- **All 16 type definitions** with summary, strengths, blind spots, work/communication/learning styles, team contributions, and career tendencies.
- **Clean, mobile-first, responsive UI**, smooth transitions, accessible radio-group inputs and focus states.
- **Progress indicator**, **go back / edit any answer** (quick-jump grid), **localStorage persistence**.
- **Dark mode** with no flash of incorrect theme.

## Project structure

```
.
├── app/
│   ├── layout.tsx          # Root layout, header, theme bootstrap
│   ├── globals.css         # Tailwind layers + a11y/motion styles
│   ├── page.tsx            # Landing page
│   ├── test/page.tsx       # Assessment flow (progress, edit, autosave)
│   └── results/page.tsx    # Results experience + JSON breakdown
├── components/
│   ├── ThemeToggle.tsx     # Dark-mode toggle
│   ├── ProgressBar.tsx     # Accessible progress indicator
│   ├── LikertScale.tsx     # 5-point radio-group scale
│   ├── QuestionCard.tsx    # Single-question presentation
│   └── DimensionMeter.tsx  # Per-dimension result visualization
├── lib/
│   ├── types.ts            # Shared domain types
│   ├── questions.ts        # The 60-item question bank (DATA)
│   ├── scoring.ts          # Scoring engine (LOGIC)
│   ├── personalities.ts    # 16 type descriptions (CONTENT)
│   └── storage.ts          # SSR-safe localStorage helpers
├── examples/
│   └── example-results.ts  # Runnable scoring demonstration
└── (config: package.json, tsconfig.json, tailwind.config.ts, ...)
```

The four concerns the spec asked to separate — **question bank**, **scoring logic**, **type descriptions**, and **UI components** — live in distinct modules.

## Setup

Requires Node.js 18.18+.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## How scoring works

The engine (`lib/scoring.ts`) is intentionally generic so questions can be added or removed without touching it:

1. **Signed responses.** Each Likert answer 1..5 becomes a signed value in `[-2, +2]` (`value - 3`). Neutral (3) contributes 0.
2. **Keying via `direction`.** Every question declares the `Pole` an *Agree* response pushes toward. The engine orients each contribution toward each dimension's **first pole** (E, S, T, J): if the question already points at the first pole, the contribution keeps its sign; otherwise it's negated (reverse-keyed). This handles positive and negative keying uniformly.
3. **Normalization.** Per dimension, the signed sum is mapped from `[-max, +max]` to a `0..100` `rawScore` toward the first pole (50 = perfectly balanced).
4. **Winner + confidence.** `rawScore >= 50` → first pole, else second pole. **Confidence** is the distance from the midpoint mapped to `50..100%` (a coin-flip answer ≈ 50%, a maximal lean = 100%).
5. **Type.** The four winners are concatenated in canonical order EI·SN·TF·JP.

Because the engine reads `dimension` and `direction` from the data, **adding new questions is purely a data change** in `lib/questions.ts`.

### Example output

`scoreAssessment(answers)` returns:

```json
{
  "type": "INTJ",
  "dimensions": {
    "EI": { "winner": "I", "confidence": 72 },
    "SN": { "winner": "N", "confidence": 65 },
    "TF": { "winner": "T", "confidence": 81 },
    "JP": { "winner": "J", "confidence": 58 }
  }
}
```

(The full `DimensionResult` also includes `rawScore` for visualization.)

## Example test results

Run the bundled demonstration (uses [`tsx`](https://github.com/privatenumber/tsx)):

```bash
npx tsx examples/example-results.ts
```

It synthesizes a respondent leaning I/N/T with a deliberately weak J/P lean, then prints the scored type, per-dimension confidence, and the matched type description — illustrating that confidence falls toward 50% when answers are mixed.

## Extending

- **More questions:** append `Question` objects to `QUESTIONS`. Set `dimension` and `direction`; the engine adapts automatically. (Keep dimensions reasonably balanced for fair confidence.)
- **New scales/instruments:** `scoreAssessment(answers, bank)` accepts an injected bank, so alternate question sets can be scored with the same engine.
- **Tweak copy:** all human-facing type content lives in `lib/personalities.ts`.

## Accessibility

- Likert options are native radio inputs inside a `fieldset`/`legend` (keyboard + screen-reader friendly).
- Progress uses `role="progressbar"` with `aria-valuenow`.
- Visible focus rings; `prefers-reduced-motion` disables transitions/animations.
- Color is never the sole signal (text labels accompany meters and states).
