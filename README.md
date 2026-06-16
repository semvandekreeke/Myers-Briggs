# Insight — Personality Development Platform

A production-quality, 16-type personality platform built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. It administers a 60-question Likert assessment, runs a genuine data-driven scoring engine, renders a premium multi-section report, and layers on a full **development platform**: an interactive development center, a personalized growth roadmap, personality matches, group compatibility analysis, team insights, and a dashboard.

> For self-reflection and education only — not a clinical or diagnostic instrument.

**Runs with zero setup.** The whole platform works out of the box in **local-only mode** (everything persists in the browser via localStorage). Configure PostgreSQL + NextAuth to unlock accounts, multi-user groups, and cross-device sync — the same UI, now backed by a database.

## Features

**Assessment & report**
- **60 questions**, 15 per dimension (E/I, S/N, T/F, J/P), 5-point Likert with mixed positive/negative keying.
- **Genuine scoring engine** — data-driven, per-dimension confidence, no hardcoded outcomes.
- **Premium results report** — hero, sticky nav with scroll-spy, and four sections (Traits, Career, Growth, Relationships) for all 16 types.

**Development platform**
- **Personal Development Center** — seven growth areas (strengths, growth opportunities, blind spots, stress triggers, leadership / communication / relationship challenges) each linking to a dedicated track at `/development/[topic]` with overview, a per-type "why this happens", common mistakes, daily/weekly/reflection/habit action plans, real-life examples, an interactive progress checklist, and curated books/podcasts/resources.
- **Growth roadmap** (`/roadmap`) — a dynamically generated four-phase plan (Foundation → Expansion → Mastery → Leadership) built from the user's own blind spots, growth opportunities, and strengths.
- **Personality matches** (`/matches`) — every type ranked into Strong / Good / Balanced / Growth / Potential-Challenge, with nuanced, dimension-grounded explanations (no stereotypes).
- **Groups** (`/groups`) — create groups, add members by name + type, and get a **color-coded compatibility matrix** (overall + communication/work/friendship/relationship per pair) plus **team insights** (strengths, conflicts, missing perspectives, collaboration tips).
- **Dashboard** (`/dashboard`) and **Profile** (`/profile`) — type, growth progress, goals, group memberships, saved report, compatibility insights.
- **Accounts** — NextAuth (Google + passwordless email) with a Prisma/PostgreSQL persistence layer and REST API.

**UX** — SaaS-style sidebar shell, beautiful cards, progress bars and rings, animations, fully responsive (mobile drawer nav), accessible, dark mode with no flash.

## Project structure

```
.
├── app/
│   ├── layout.tsx          # Root layout: theme bootstrap + SessionProvider
│   ├── providers.tsx       # Client SessionProvider wrapper
│   ├── globals.css         # Tailwind layers + a11y/motion styles
│   ├── (site)/             # Marketing/assessment chrome (centered header)
│   │   ├── layout.tsx          # Header + footer + nav into the platform
│   │   ├── page.tsx            # Landing page
│   │   ├── test/page.tsx       # Assessment flow (progress, edit, autosave)
│   │   ├── results/page.tsx    # Premium report + Development Center
│   │   └── signin/page.tsx     # NextAuth sign-in (Google / email)
│   ├── (platform)/         # SaaS shell (sidebar nav) — the development platform
│   │   ├── layout.tsx          # PlatformShell (sidebar + mobile drawer)
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── development/page.tsx              # tracks hub
│   │   ├── development/[topic]/page.tsx      # one development track
│   │   ├── roadmap/page.tsx
│   │   ├── matches/page.tsx
│   │   ├── groups/page.tsx
│   │   ├── groups/create/page.tsx
│   │   └── groups/[groupId]/page.tsx         # members + matrix + insights
│   └── api/                # REST API (Prisma-backed; 503 in local-only mode)
│       ├── auth/[...nextauth]/route.ts
│       ├── assessments/route.ts
│       ├── goals/route.ts
│       ├── progress/route.ts
│       └── groups/… (route.ts, [groupId]/route.ts, [groupId]/members/route.ts)
├── prisma/
│   └── schema.prisma       # User, Assessment, Group, GroupMember, Compatibility,
│                           # DevelopmentProgress, Goal (+ NextAuth models)
├── components/
│   ├── platform/           # PlatformShell, ui primitives, TypeGate
│   ├── groups/             # CompatibilityMatrix, TeamInsightsView, TypeSelect
│   ├── AccountButton.tsx
│   ├── ThemeToggle.tsx     # Dark-mode toggle
│   ├── ProgressBar.tsx     # Accessible progress indicator
│   ├── LikertScale.tsx     # 5-point radio-group scale
│   ├── QuestionCard.tsx    # Single-question presentation
│   ├── DimensionMeter.tsx  # Per-dimension result visualization
│   └── results/            # The premium results report
│       ├── HeroSection.tsx       # Full-width hero (avatar, code, summary, stats)
│       ├── ReportNavigation.tsx  # Sticky sidebar (desktop) / tabs (mobile) + scroll-spy
│       ├── PersonalityTraits.tsx   # Section 1
│       ├── CareerPath.tsx          # Section 2
│       ├── DevelopmentCenter.tsx   # Section 3 — growth areas + "Learn more" links
│       ├── Relationships.tsx       # Section 4
│       ├── SectionCard.tsx       # Reusable Section/Card/BulletList/ChipList/InfoBlock
│       ├── TypeAvatar.tsx        # Generated per-type gradient monogram
│       ├── icons.tsx             # Inline stroke icons
│       └── useActiveSection.ts   # IntersectionObserver scroll-spy hook
├── lib/
│   ├── types.ts            # Shared domain types + report profile interfaces
│   ├── questions.ts        # 60-item question bank (DATA)
│   ├── scoring.ts          # Scoring engine (LOGIC)
│   ├── personalities.ts    # 16 type summaries/strengths/styles (CONTENT)
│   ├── report-content.ts   # 16 rich reports: career/growth/relationships (CONTENT)
│   ├── mbti.ts             # Shared type helpers (poles, groups, labels)
│   ├── compatibility.ts    # Pairwise compatibility engine (ENGINE)
│   ├── matches.ts          # Rank/bucket all 16 vs a type (ENGINE)
│   ├── team-insights.ts    # Group strengths/conflicts/gaps (ENGINE)
│   ├── roadmap.ts          # 4-phase roadmap generator (ENGINE)
│   ├── growth.ts           # Results-page growth areas (CONTENT)
│   ├── development.ts      # 6 development topics + per-type "why" (CONTENT)
│   ├── local-store.ts      # localStorage data layer (profile/goals/progress/groups)
│   ├── use-local.ts        # Reactive React hooks over the local store
│   ├── prisma.ts           # Prisma client singleton
│   ├── auth.ts             # NextAuth config (Google + email, conditional)
│   ├── api-helpers.ts      # requireUser() + graceful local-mode fallback
│   └── storage.ts          # SSR-safe localStorage helpers (answers/theme)
├── types/next-auth.d.ts    # Session type augmentation
├── examples/example-results.ts
└── (config: package.json, tsconfig.json, tailwind.config.ts, .env.example, ...)
```

Concerns are cleanly separated: **data** (`questions`), **logic/engines** (`scoring`, `compatibility`, `matches`, `team-insights`, `roadmap`), **content** (`personalities`, `report-content`, `growth`, `development`), **persistence** (`local-store` + `prisma`/API), and **UI components**.

## Architecture: local-first, DB-optional

Every personal feature (assessment, report, development tracks, roadmap, matches, goals, and even groups) works with **no backend** — state lives in `localStorage` via `lib/local-store.ts`, surfaced through reactive hooks in `lib/use-local.ts`. This keeps the platform fully usable and demoable with zero setup.

The **production persistence layer** (`prisma/schema.prisma`, `lib/auth.ts`, `app/api/*`) mirrors the same data model. When `DATABASE_URL` and auth providers are configured, accounts, multi-user groups, and sync activate; the API routes return `503` in local-only mode so clients fall back cleanly. `lib/local-store.ts` and the Prisma models intentionally share shapes so swapping the data source is straightforward.

### Engines (no stereotypes, fully data-driven)

- **Compatibility** (`lib/compatibility.ts`): scores each pair on four facets (communication, work, friendship, relationship). Each facet weights the four dimensions differently, and a *difference* on a dimension retains a tunable fraction of its weight rather than zeroing out — so some differences are complementary and only a few are costly. Produces an overall score, a category, constructive dimension-grounded reasons, and a "make it work" tip.
- **Matches** (`lib/matches.ts`): ranks all 16 types vs a given type into the five named buckets.
- **Team insights** (`lib/team-insights.ts`): derives strengths, conflicts, missing perspectives, and collaboration tips from the *distribution* of preferences across members, plus average pairwise cohesion.
- **Roadmap** (`lib/roadmap.ts`): assembles four phases from the type's own blind spots, growth opportunities, strengths, and dimension-specific skills/habits.

## Database & auth setup (optional)

```bash
cp .env.example .env          # then fill in values
# DATABASE_URL, NEXTAUTH_SECRET, and at least one provider
npx prisma migrate dev        # or: npm run db:push
npm run dev
```

- **PostgreSQL + Prisma.** Models: `User`, `Assessment`, `Group`, `GroupMember`, `Compatibility`, `DevelopmentProgress`, `Goal`, plus the NextAuth models (`Account`, `Session`, `VerificationToken`), with relations and indexes. `npm run db:studio` opens Prisma Studio.
- **NextAuth.** Providers are added conditionally from env: Google (`GOOGLE_CLIENT_ID`/`SECRET`) and passwordless email (`EMAIL_SERVER`/`EMAIL_FROM`). With none set, `/signin` explains that the app is in local-only mode.

### API endpoints

| Method | Route | Purpose |
| --- | --- | --- |
| `GET/POST` | `/api/assessments` | List / save assessments (updates `User.mbtiType`) |
| `GET/POST/PATCH/DELETE` | `/api/goals` | Manage goals |
| `GET/PUT` | `/api/progress` | Read / upsert development progress |
| `GET/POST` | `/api/groups` | List / create groups |
| `GET/DELETE` | `/api/groups/[groupId]` | Group detail / delete (owner) |
| `POST/DELETE` | `/api/groups/[groupId]/members` | Add/join / remove/leave |
| `*` | `/api/auth/[...nextauth]` | NextAuth handler |

All protected routes use `requireUser()`, returning `401` (no session) or `503` (no DB).

## Results report

The results page is a premium, multi-section report inspired by modern assessment platforms:

- **Hero banner** — generated gradient avatar, type name + code, one-line summary, and a four-up confidence strip.
- **Sticky navigation** — a vertical sidebar on desktop and a horizontal tab bar on mobile, both with **scroll-spy** that highlights the active section (`useActiveSection` via `IntersectionObserver`). Anchor clicks scroll smoothly and move focus for accessibility.
- **Four sections** — Personality Traits, Your Career Path, Your Personal Growth, Your Relationships.

Content lives in two data modules, keyed by the 4-letter code:

- `lib/personalities.ts` → `PersonalityType` (summary, strengths, blind spots, work/communication/learning styles, team contributions).
- `lib/report-content.ts` → `TypeReport` = `{ personality, career, growth, relationships }`, typed by the `PersonalityProfile`, `CareerProfile`, `GrowthProfile`, and `RelationshipProfile` interfaces in `lib/types.ts`. **All 16 types have unique content.**

To revise or extend a type's report, edit its entry in `report-content.ts` — no component or scoring changes are needed. To add a new section, add a `Section` in the relevant component and a field to the matching profile interface.

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
