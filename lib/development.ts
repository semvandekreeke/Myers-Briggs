import { getPoles } from "./mbti";
import type { TopicId } from "./growth";

/**
 * Development topic content for /development/[topic].
 *
 * Topic-level content (overview, mistakes, action plan, examples, resources)
 * is authored per topic; the "Why this happens for you" section is generated
 * per personality type from the type's four poles, so every type sees an
 * explanation grounded in its own wiring rather than a generic blurb.
 */

export interface ResourceItem {
  title: string;
  by?: string;
  kind?: string;
}

export interface DevelopmentTopic {
  id: TopicId;
  title: string;
  tagline: string;
  accent: "brand" | "emerald" | "amber" | "rose" | "sky" | "violet";
  overview: string;
  commonMistakes: string[];
  actionPlan: {
    daily: string[];
    weekly: string[];
    reflection: string[];
    habits: string[];
  };
  examples: { title: string; text: string }[];
  checklist: string[];
  books: ResourceItem[];
  podcasts: ResourceItem[];
  resources: ResourceItem[];
}

export const TOPIC_IDS: TopicId[] = [
  "communication",
  "confidence",
  "emotional-awareness",
  "leadership",
  "relationships",
  "productivity",
];

export const TOPICS: Record<TopicId, DevelopmentTopic> = {
  communication: {
    id: "communication",
    title: "Communicate with Clarity & Impact",
    tagline: "Be understood the way you intend — every time.",
    accent: "rose",
    overview:
      "Communication is less about what you say and more about what the other person receives. Strong communicators adapt their message to their audience, lead with the point, and check for understanding instead of assuming it. This is a learnable skill, not a fixed trait — and small adjustments compound quickly.",
    commonMistakes: [
      "Assuming clarity in your own head equals clarity in theirs.",
      "Leading with context and detail before the main point.",
      "Mistaking 'I said it' for 'they understood it'.",
      "Avoiding a hard message until it becomes a bigger problem.",
      "Reacting to the story you inferred rather than checking what was meant.",
    ],
    actionPlan: {
      daily: [
        "Open one important message with your single key point in the first sentence.",
        "In one conversation, paraphrase what the other person said before replying.",
        "Notice one moment you assumed understanding — and confirm it instead.",
      ],
      weekly: [
        "Have one conversation you'd normally avoid, prepared but not scripted.",
        "Ask a colleague: 'Was anything I communicated this week unclear?'",
        "Review a message that didn't land and rewrite it for the listener.",
      ],
      reflection: [
        "When was I misunderstood this week, and what did the other person need that I didn't give?",
        "Do I talk to think, or think to talk — and which did this situation call for?",
        "Where did I soften or sharpen a message more than was useful?",
      ],
      habits: [
        "Lead with the headline, then support it.",
        "Pause three seconds before responding in group settings.",
        "End important conversations with 'What's your takeaway?'",
      ],
    },
    examples: [
      {
        title: "The buried headline",
        text: "You email five paragraphs of context before the ask. The reader skims, misses it, and nothing happens. Rewriting with the request up top gets a reply in an hour.",
      },
      {
        title: "The avoided conversation",
        text: "A small irritation with a teammate goes unspoken for weeks, then erupts over something trivial. Naming it early — calmly, specifically — would have taken two minutes.",
      },
    ],
    checklist: [
      "I can state my main point in one sentence before explaining it.",
      "I paraphrase others to confirm understanding.",
      "I've had a hard conversation I used to avoid.",
      "I adapt my level of detail to the listener.",
      "I ask for feedback on how I come across.",
    ],
    books: [
      { title: "Crucial Conversations", by: "Patterson, Grenny, McMillan & Switzler" },
      { title: "Nonviolent Communication", by: "Marshall Rosenberg" },
      { title: "Never Split the Difference", by: "Chris Voss" },
    ],
    podcasts: [
      { title: "WorkLife", by: "Adam Grant" },
      { title: "Think Fast, Talk Smart", by: "Matt Abrahams" },
    ],
    resources: [
      { title: "Toastmasters International", kind: "Practice community" },
      { title: "Coursera — Improving Communication Skills", kind: "Online course" },
    ],
  },

  confidence: {
    id: "confidence",
    title: "Build Authentic Confidence",
    tagline: "Trust your judgment without needing to be certain.",
    accent: "amber",
    overview:
      "Real confidence isn't the absence of doubt — it's the willingness to act and speak despite it. It grows from evidence: small, repeated experiences of doing the hard thing and surviving. The goal isn't to silence your inner critic but to stop letting it have the final vote.",
    commonMistakes: [
      "Waiting to feel ready before acting — readiness usually follows action, not the reverse.",
      "Treating one piece of critical feedback as a verdict on your worth.",
      "Comparing your inside (doubts) to others' outside (composure).",
      "Over-preparing as a way to postpone exposure.",
      "Dismissing your wins as luck while owning every setback as proof.",
    ],
    actionPlan: {
      daily: [
        "Do one small thing slightly outside your comfort zone.",
        "Write down one thing you did well — and why it wasn't luck.",
        "Voice one opinion you'd normally keep to yourself.",
      ],
      weekly: [
        "Take on one task before you feel fully ready.",
        "Revisit a past success and name the skill that made it work.",
        "Ask for feedback and practice receiving it without deflecting.",
      ],
      reflection: [
        "What did I avoid this week, and what was I really afraid of?",
        "Whose approval was I seeking, and was it worth the cost?",
        "What evidence contradicts my harshest self-judgment?",
      ],
      habits: [
        "Keep a running 'evidence log' of things you handled well.",
        "Reframe 'I'm not ready' as 'I'll learn by starting'.",
        "Separate the feedback on your work from your value as a person.",
      ],
    },
    examples: [
      {
        title: "The unsent idea",
        text: "You have a strong idea in a meeting but wait to be 'sure', and someone else voices a weaker version to applause. Speaking at 80% certainty would have put your idea on the table.",
      },
      {
        title: "The luck story",
        text: "After a big win you tell yourself the timing was lucky. A month later you face a similar challenge with no confidence — because you never let yourself bank the evidence.",
      },
    ],
    checklist: [
      "I've acted on something before feeling fully ready.",
      "I keep evidence of my wins, not just my mistakes.",
      "I can receive criticism without spiraling.",
      "I voice opinions even when unsure they're perfect.",
      "I no longer wait for permission to contribute.",
    ],
    books: [
      { title: "The Confidence Code", by: "Kay & Shipman" },
      { title: "Mindset", by: "Carol Dweck" },
      { title: "Daring Greatly", by: "Brené Brown" },
    ],
    podcasts: [
      { title: "The Tim Ferriss Show", by: "Tim Ferriss" },
      { title: "Unlocking Us", by: "Brené Brown" },
    ],
    resources: [
      { title: "CBT thought-record templates", kind: "Tool" },
      { title: "Coursera — Mindshift / Learning How to Learn", kind: "Online course" },
    ],
  },

  "emotional-awareness": {
    id: "emotional-awareness",
    title: "Deepen Emotional Awareness",
    tagline: "Read your emotions as signals, not noise.",
    accent: "violet",
    overview:
      "Emotional awareness is the ability to notice what you're feeling, name it accurately, and understand what it's telling you — before it drives your behavior. It's the foundation of self-regulation, empathy, and good decisions. Like any skill, it grows with deliberate attention.",
    commonMistakes: [
      "Treating emotions as problems to suppress rather than data to read.",
      "Labeling everything as 'fine' or 'stressed' instead of naming the specific feeling.",
      "Reacting from an emotion before recognizing it.",
      "Absorbing others' emotions so completely that your own disappear.",
      "Rushing to resolve discomfort instead of understanding it.",
    ],
    actionPlan: {
      daily: [
        "Name your dominant emotion three times a day, as specifically as you can.",
        "When you react strongly, pause and ask 'what is this feeling pointing at?'",
        "Notice one emotion in someone else and what might be behind it.",
      ],
      weekly: [
        "Journal one situation that triggered a strong reaction and trace its root.",
        "Identify one recurring emotional pattern and its usual trigger.",
        "Practice sitting with one uncomfortable feeling for 60 seconds before acting.",
      ],
      reflection: [
        "What feeling did I avoid this week, and why?",
        "Where did an emotion drive a decision before I noticed it?",
        "Whose emotions did I take on as my own?",
      ],
      habits: [
        "Expand your emotional vocabulary beyond 'good/bad/stressed'.",
        "Build a daily 30-second check-in with yourself.",
        "Name it to tame it — labeling a feeling reduces its grip.",
      ],
    },
    examples: [
      {
        title: "The misattributed mood",
        text: "You snap at a colleague and assume they annoyed you. Later you realize you were anxious about a deadline — the colleague was just nearby. Naming the real feeling would have changed the moment.",
      },
      {
        title: "The borrowed stress",
        text: "A friend vents for an hour and you carry their anxiety all evening. Recognizing 'this is theirs, not mine' lets you stay supportive without drowning.",
      },
    ],
    checklist: [
      "I can name what I feel with specific words.",
      "I pause between feeling and reacting.",
      "I can tell my emotions apart from others'.",
      "I treat uncomfortable feelings as information.",
      "I notice my recurring triggers.",
    ],
    books: [
      { title: "Permission to Feel", by: "Marc Brackett" },
      { title: "Emotional Intelligence", by: "Daniel Goleman" },
      { title: "Atlas of the Heart", by: "Brené Brown" },
    ],
    podcasts: [
      { title: "Ten Percent Happier", by: "Dan Harris" },
      { title: "The Happiness Lab", by: "Dr. Laurie Santos" },
    ],
    resources: [
      { title: "Mood / feelings wheel", kind: "Tool" },
      { title: "Headspace or Insight Timer", kind: "App" },
    ],
  },

  leadership: {
    id: "leadership",
    title: "Grow as a Leader",
    tagline: "Lead in a way that fits you and serves your team.",
    accent: "sky",
    overview:
      "Leadership isn't a personality type — it's a set of behaviors anyone can develop: setting direction, creating clarity, drawing out others, and holding the standard. The best leaders amplify their natural style while deliberately covering its blind spots. Your goal is to lead authentically, not to imitate someone else.",
    commonMistakes: [
      "Leading the way you'd want to be led, instead of how each person needs.",
      "Confusing being busy or being liked with being effective.",
      "Avoiding hard feedback to preserve harmony.",
      "Over-controlling the 'how' instead of owning the 'what' and 'why'.",
      "Forgetting that recognition fuels performance as much as logic does.",
    ],
    actionPlan: {
      daily: [
        "Give one piece of specific, genuine recognition.",
        "Ask one question instead of giving one answer.",
        "Make space for the quietest person in a conversation to contribute.",
      ],
      weekly: [
        "Have one developmental conversation with someone you lead.",
        "Delegate something you'd normally keep, and let them own the method.",
        "Communicate the 'why' behind a decision, not just the 'what'.",
      ],
      reflection: [
        "Did I adapt my style to people this week, or expect them to adapt to me?",
        "What hard feedback am I avoiding, and who is it costing?",
        "Where did I solve instead of coach?",
      ],
      habits: [
        "Lead with questions before conclusions.",
        "Separate the decision from the ego attached to it.",
        "Close the loop: people who give input deserve to hear what happened.",
      ],
    },
    examples: [
      {
        title: "The unspoken feedback",
        text: "A team member keeps missing the mark; you fix it quietly to avoid friction. Six months on, they're blindsided in a review. Early, kind, specific feedback was the actual kindness.",
      },
      {
        title: "The over-owned project",
        text: "You take back a task because it's faster to do it yourself. The team learns nothing and you become the bottleneck. Owning the outcome, not the steps, would scale you.",
      },
    ],
    checklist: [
      "I adapt how I lead to each person.",
      "I give specific recognition regularly.",
      "I deliver hard feedback early and kindly.",
      "I delegate outcomes, not just tasks.",
      "I explain the reasoning behind decisions.",
    ],
    books: [
      { title: "The Making of a Manager", by: "Julie Zhuo" },
      { title: "Radical Candor", by: "Kim Scott" },
      { title: "Leaders Eat Last", by: "Simon Sinek" },
    ],
    podcasts: [
      { title: "Coaching for Leaders", by: "Dave Stachowiak" },
      { title: "WorkLife", by: "Adam Grant" },
    ],
    resources: [
      { title: "Manager READMEs / user-manual exercise", kind: "Tool" },
      { title: "LinkedIn Learning — Leadership Foundations", kind: "Online course" },
    ],
  },

  relationships: {
    id: "relationships",
    title: "Strengthen Your Relationships",
    tagline: "Build closeness that respects how you and others are wired.",
    accent: "emerald",
    overview:
      "Strong relationships come from understanding — of yourself, of the other person, and of the gap between how you express care and how they receive it. Most relationship friction isn't about love or effort; it's about mismatched styles that, once named, become easy to bridge.",
    commonMistakes: [
      "Showing love the way you'd want to receive it, not the way they do.",
      "Expecting your partner to read needs you never voiced.",
      "Avoiding conflict until resentment builds.",
      "Trying to fix when the other person wants to be heard.",
      "Neglecting your own needs to keep the peace.",
    ],
    actionPlan: {
      daily: [
        "Express appreciation in the other person's preferred 'language', not yours.",
        "Ask one genuine question and listen without planning your reply.",
        "Name one need of your own out loud, however small.",
      ],
      weekly: [
        "Have one undistracted, device-free conversation.",
        "Address one small irritation before it grows.",
        "Do one thing that matters to them but not (yet) to you.",
      ],
      reflection: [
        "Did I listen to understand or to respond this week?",
        "What need did I expect someone to guess?",
        "Where did I keep score instead of communicating?",
      ],
      habits: [
        "Listen first; solve only if asked.",
        "State needs directly rather than hinting.",
        "Repair quickly after friction — don't let it set.",
      ],
    },
    examples: [
      {
        title: "The mismatched gesture",
        text: "You show love by handling chores; they crave words of affirmation. Both feel unappreciated despite real effort. Naming each other's 'language' dissolves it overnight.",
      },
      {
        title: "The silent scorecard",
        text: "You quietly tally who did more, expecting it to be noticed. It isn't — because you never said it. One honest sentence beats a month of keeping score.",
      },
    ],
    checklist: [
      "I express care in the other person's preferred way.",
      "I state my needs directly instead of hinting.",
      "I address friction early.",
      "I listen to understand before solving.",
      "I repair quickly after conflict.",
    ],
    books: [
      { title: "The 5 Love Languages", by: "Gary Chapman" },
      { title: "Hold Me Tight", by: "Sue Johnson" },
      { title: "Attached", by: "Levine & Heller" },
    ],
    podcasts: [
      { title: "Where Should We Begin?", by: "Esther Perel" },
      { title: "Together Apart / relationship science shows", by: "various" },
    ],
    resources: [
      { title: "The Gottman Institute — Card Decks app", kind: "App" },
      { title: "Love-languages quiz", kind: "Tool" },
    ],
  },

  productivity: {
    id: "productivity",
    title: "Master Focus & Productivity",
    tagline: "Get the right things done — in a way that fits how you work.",
    accent: "brand",
    overview:
      "Productivity isn't about doing more; it's about reliably finishing what matters with less friction. The right system is the one that works with your wiring rather than against it. Focus on a few high-leverage habits — prioritization, single-tasking, and follow-through — and let the rest go.",
    commonMistakes: [
      "Confusing being busy with making progress.",
      "Starting many things and finishing few.",
      "Optimizing the system instead of doing the work.",
      "Saying yes to everything and protecting nothing.",
      "Relying on motivation instead of structure.",
    ],
    actionPlan: {
      daily: [
        "Choose one 'must-do' before opening any inbox or feed.",
        "Work in one focused, distraction-free block.",
        "Close the day by writing tomorrow's single priority.",
      ],
      weekly: [
        "Review what you finished, not just what you did.",
        "Say no to (or drop) one low-value commitment.",
        "Schedule your hardest task into your highest-energy window.",
      ],
      reflection: [
        "What did I finish this week that actually mattered?",
        "Where did I mistake motion for progress?",
        "What did I avoid, and what made it feel heavy?",
      ],
      habits: [
        "Single-task in protected blocks.",
        "Define 'done' before you start.",
        "Capture every commitment in one trusted place.",
      ],
    },
    examples: [
      {
        title: "The endless setup",
        text: "You spend two hours building the perfect task system and zero hours on the task. A sticky note with three priorities would have shipped the work.",
      },
      {
        title: "The motivation trap",
        text: "You wait to 'feel like it'. The deadline arrives and panic does the work. A small scheduled block each day would have removed the drama entirely.",
      },
    ],
    checklist: [
      "I set one clear priority before reacting to inputs.",
      "I work in focused, single-task blocks.",
      "I define 'done' before starting.",
      "I protect time by saying no.",
      "I track commitments in one place.",
    ],
    books: [
      { title: "Deep Work", by: "Cal Newport" },
      { title: "Atomic Habits", by: "James Clear" },
      { title: "Getting Things Done", by: "David Allen" },
    ],
    podcasts: [
      { title: "Deep Questions", by: "Cal Newport" },
      { title: "The Productivity Show", by: "Asian Efficiency" },
    ],
    resources: [
      { title: "Time-blocking template", kind: "Tool" },
      { title: "Todoist / Things / Notion", kind: "App" },
    ],
  },
};

export function getTopic(id: string): DevelopmentTopic | undefined {
  return TOPICS[id as TopicId];
}

// --- Per-type "Why this happens for you" ------------------------------------

const WHY: Record<TopicId, Record<string, string>> = {
  communication: {
    E: "As an Extravert, you often think out loud, so others may hear half-formed ideas before you've landed.",
    I: "As an Introvert, you refine internally, so people sometimes miss the thinking you never voiced.",
    S: "Your Sensing side fills messages with concrete detail — valuable, but it can bury the headline.",
    N: "Your Intuitive side jumps to implications, which can leave concrete-minded listeners a step behind.",
    T: "Leading with Thinking, your candor is efficient but can read as cold without a little warmth.",
    F: "Leading with Feeling, you protect harmony, which can soften a message until the point gets lost.",
    J: "Your Judging side likes to conclude, which can close a conversation before others feel heard.",
    P: "Your Perceiving side keeps options open, which can come across as vague about where you stand.",
  },
  confidence: {
    E: "Your outward energy can mask private self-doubt, so others assume you need no reassurance.",
    I: "Your reserve can be misread as low confidence even when you're certain inside.",
    S: "You trust what's proven, so untested situations can feel riskier than they really are.",
    N: "You see every possibility — including all that could go wrong — which is fuel for overthinking.",
    T: "You hold yourself to a logical standard, and falling short of it can feel like personal failure.",
    F: "You absorb others' reactions, so criticism can dent your confidence more than it should.",
    J: "You prefer certainty, so ambiguity can feel like inadequacy rather than simply the unknown.",
    P: "You keep adapting, which can feel like never finishing — and 'unfinished' can erode confidence.",
  },
  "emotional-awareness": {
    E: "You externalize quickly, so feelings can be expressed before they're fully understood.",
    I: "You internalize deeply, so emotions can build quietly until they surface all at once.",
    S: "You focus on the tangible, so subtle emotional currents can go unnoticed.",
    N: "You live in interpretation, so you may react to the meaning you inferred rather than what occurred.",
    T: "Leading with logic, you may treat emotions as noise to solve rather than signals to read.",
    F: "Leading with feeling, you may absorb others' emotions so fully that your own get lost.",
    J: "You prefer resolution, so you may rush past an uncomfortable feeling to 'fix' it.",
    P: "You stay open, so feelings can drift unexamined without a deliberate check-in.",
  },
  leadership: {
    E: "Your visible energy sets the tone, but it can crowd out quieter contributors.",
    I: "Your considered style builds trust, but under-communicating can leave teams guessing.",
    S: "You excel at execution, but teams also need you to paint the longer-term picture.",
    N: "You inspire with vision, but people need it translated into concrete next steps.",
    T: "You decide on merit, but recognition and morale drive results just as much.",
    F: "You build loyalty, but leadership also demands hard feedback and accountability.",
    J: "You bring order, but over-planning can leave no room for emergent ideas.",
    P: "You bring adaptability, but teams need the structure and closure you can resist.",
  },
  relationships: {
    E: "You seek connection actively, which can overwhelm people who need quiet.",
    I: "You need space to recharge, which can be misread as distance or disinterest.",
    S: "You show love through practical acts, which can be missed by those wanting words.",
    N: "You bond over ideas and meaning, which can skip the everyday closeness others need.",
    T: "You show care by solving problems, when sometimes a person just wants to be heard.",
    F: "You attune to others so fully that your own needs can go unspoken.",
    J: "You like relationships settled and planned, which can feel like pressure to a partner.",
    P: "You keep things open and spontaneous, which can read as a lack of commitment.",
  },
  productivity: {
    E: "You gain energy from people, so solo deep work can feel like swimming upstream.",
    I: "You focus best alone, so open, interruptive environments quietly drain you.",
    S: "You handle detail well but can get lost in it and lose the priority.",
    N: "You start with enthusiasm but can abandon the unglamorous middle of a task.",
    T: "You optimize systems, sometimes perfecting the process instead of finishing the work.",
    F: "You take on others' needs, which can crowd out your own priorities.",
    J: "You love closure, which can tip into over-planning or deciding too early.",
    P: "You keep options open, which can delay starting until a deadline forces it.",
  },
};

/**
 * Generate the type-specific "Why this happens for you" explanation by
 * assembling the clauses for the type's four poles.
 */
export function getWhyForType(topicId: TopicId, type: string): string[] {
  const lib = WHY[topicId];
  if (!lib) return [];
  const p = getPoles(type);
  return [lib[p.EI], lib[p.SN], lib[p.TF], lib[p.JP]];
}
