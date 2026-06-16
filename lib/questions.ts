import type { Question } from "./types";

/**
 * The question bank: 60 items, 15 per dimension.
 *
 * Each dimension mixes positively- and negatively-keyed items (via the
 * `direction` field) so that "agreeing with everything" does not bias the
 * result toward one pole. The scoring engine reads `direction` to know which
 * way each item points — questions can be added or removed freely without
 * touching the engine.
 *
 * Wording aims to be natural and applicable to both professional and personal
 * life, and to avoid the most obvious MBTI stereotypes.
 */
export const QUESTIONS: Question[] = [
  // ---------------------------------------------------------------------------
  // Extraversion (E) vs Introversion (I)
  // ---------------------------------------------------------------------------
  { id: "ei01", dimension: "EI", direction: "E", text: "Spending time in a lively group of people tends to energize me." },
  { id: "ei02", dimension: "EI", direction: "I", text: "After a busy social day, I need significant alone time to recharge." },
  { id: "ei03", dimension: "EI", direction: "E", text: "I often think out loud, working through ideas by talking them over with others." },
  { id: "ei04", dimension: "EI", direction: "I", text: "I usually prefer to reflect privately before sharing my conclusions." },
  { id: "ei05", dimension: "EI", direction: "E", text: "In meetings, I tend to speak up early rather than waiting to be invited." },
  { id: "ei06", dimension: "EI", direction: "I", text: "I find small talk with strangers more draining than rewarding." },
  { id: "ei07", dimension: "EI", direction: "E", text: "I enjoy being introduced to new people at social events." },
  { id: "ei08", dimension: "EI", direction: "I", text: "I'd rather have a few deep conversations than many brief ones." },
  { id: "ei09", dimension: "EI", direction: "E", text: "I feel comfortable being the center of attention when the moment calls for it." },
  { id: "ei10", dimension: "EI", direction: "I", text: "My best thinking happens in quiet, uninterrupted settings." },
  { id: "ei11", dimension: "EI", direction: "E", text: "When I have free time, I'm inclined to reach out and make plans with others." },
  { id: "ei12", dimension: "EI", direction: "I", text: "I keep much of my inner life private, even from people I'm close to." },
  { id: "ei13", dimension: "EI", direction: "E", text: "I tend to process emotions by talking about them with someone." },
  { id: "ei14", dimension: "EI", direction: "I", text: "Large gatherings often leave me wanting to slip away early." },
  { id: "ei15", dimension: "EI", direction: "E", text: "I'm comfortable striking up conversations with people I don't know." },

  // ---------------------------------------------------------------------------
  // Sensing (S) vs Intuition (N)
  // ---------------------------------------------------------------------------
  { id: "sn01", dimension: "SN", direction: "S", text: "I trust concrete facts and direct experience more than theories." },
  { id: "sn02", dimension: "SN", direction: "N", text: "I'm drawn to patterns and possibilities more than to present details." },
  { id: "sn03", dimension: "SN", direction: "S", text: "I prefer instructions that are specific and step-by-step." },
  { id: "sn04", dimension: "SN", direction: "N", text: "I often find myself imagining how things could be different in the future." },
  { id: "sn05", dimension: "SN", direction: "S", text: "I notice practical details that others tend to overlook." },
  { id: "sn06", dimension: "SN", direction: "N", text: "I enjoy abstract or hypothetical discussions for their own sake." },
  { id: "sn07", dimension: "SN", direction: "S", text: "When learning something, I want to know how to apply it right away." },
  { id: "sn08", dimension: "SN", direction: "N", text: "I tend to focus on the big picture and let the details follow." },
  { id: "sn09", dimension: "SN", direction: "S", text: "I rely on proven methods rather than experimenting with untested ideas." },
  { id: "sn10", dimension: "SN", direction: "N", text: "I often read between the lines and look for underlying meaning." },
  { id: "sn11", dimension: "SN", direction: "S", text: "I describe events in terms of what literally happened, with specifics." },
  { id: "sn12", dimension: "SN", direction: "N", text: "I'm energized by brainstorming new concepts, even impractical ones." },
  { id: "sn13", dimension: "SN", direction: "S", text: "I'm more comfortable with what is real and present than with what might be." },
  { id: "sn14", dimension: "SN", direction: "N", text: "I tend to jump ahead to implications before all the facts are in." },
  { id: "sn15", dimension: "SN", direction: "S", text: "I value realistic, grounded plans over visionary ones." },

  // ---------------------------------------------------------------------------
  // Thinking (T) vs Feeling (F)
  // ---------------------------------------------------------------------------
  { id: "tf01", dimension: "TF", direction: "T", text: "When deciding, I prioritize logical consistency over how people will feel." },
  { id: "tf02", dimension: "TF", direction: "F", text: "I weigh the impact on people heavily when making a tough call." },
  { id: "tf03", dimension: "TF", direction: "T", text: "I find it easy to give critical feedback when it's warranted." },
  { id: "tf04", dimension: "TF", direction: "F", text: "Maintaining harmony in a group matters a great deal to me." },
  { id: "tf05", dimension: "TF", direction: "T", text: "I'm convinced more by sound reasoning than by personal appeals." },
  { id: "tf06", dimension: "TF", direction: "F", text: "I naturally tune into the emotions of people around me." },
  { id: "tf07", dimension: "TF", direction: "T", text: "I try to stay objective and detached when analyzing a problem." },
  { id: "tf08", dimension: "TF", direction: "F", text: "I'd rather be tactful than blunt, even at some cost to precision." },
  { id: "tf09", dimension: "TF", direction: "T", text: "Fairness to me means applying the same rule consistently to everyone." },
  { id: "tf10", dimension: "TF", direction: "F", text: "Fairness to me means accounting for each person's circumstances." },
  { id: "tf11", dimension: "TF", direction: "T", text: "I can set my feelings aside to reach the most rational outcome." },
  { id: "tf12", dimension: "TF", direction: "F", text: "I feel uncomfortable when a decision leaves someone hurt, even if it's correct." },
  { id: "tf13", dimension: "TF", direction: "T", text: "I enjoy debating ideas critically, even with people I like." },
  { id: "tf14", dimension: "TF", direction: "F", text: "Praise and encouragement bring out my best work more than critique." },
  { id: "tf15", dimension: "TF", direction: "T", text: "I tend to point out flaws in an argument before acknowledging its merits." },

  // ---------------------------------------------------------------------------
  // Judging (J) vs Perceiving (P)
  // ---------------------------------------------------------------------------
  { id: "jp01", dimension: "JP", direction: "J", text: "I like to have things decided and settled well ahead of time." },
  { id: "jp02", dimension: "JP", direction: "P", text: "I prefer to keep my options open rather than commit early." },
  { id: "jp03", dimension: "JP", direction: "J", text: "I feel satisfied checking items off a clear to-do list." },
  { id: "jp04", dimension: "JP", direction: "P", text: "I often do my best work in a last-minute burst of energy." },
  { id: "jp05", dimension: "JP", direction: "J", text: "A messy or unstructured schedule makes me uneasy." },
  { id: "jp06", dimension: "JP", direction: "P", text: "I adapt easily when plans change at the last moment." },
  { id: "jp07", dimension: "JP", direction: "J", text: "I prefer to finish one task completely before starting another." },
  { id: "jp08", dimension: "JP", direction: "P", text: "I enjoy improvising and figuring things out as I go." },
  { id: "jp09", dimension: "JP", direction: "J", text: "I plan my days in advance and like to stick to the plan." },
  { id: "jp10", dimension: "JP", direction: "P", text: "Strict routines tend to feel confining to me." },
  { id: "jp11", dimension: "JP", direction: "J", text: "I'm uncomfortable leaving decisions open-ended for long." },
  { id: "jp12", dimension: "JP", direction: "P", text: "I'm happy to start a project before all the details are worked out." },
  { id: "jp13", dimension: "JP", direction: "J", text: "Deadlines motivate me to work steadily rather than cram." },
  { id: "jp14", dimension: "JP", direction: "P", text: "I like to gather more information rather than conclude too soon." },
  { id: "jp15", dimension: "JP", direction: "J", text: "I prefer clear structure and defined expectations at work." },
];

/** Number of items per dimension — handy for validation/UI. */
export const QUESTIONS_PER_DIMENSION = 15;

/** Total item count. */
export const TOTAL_QUESTIONS = QUESTIONS.length;
