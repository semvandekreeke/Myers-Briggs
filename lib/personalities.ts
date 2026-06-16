import type { PersonalityType } from "./types";

/**
 * Rich descriptions for all 16 personality types.
 *
 * These are original descriptions written for this product. They are keyed by
 * the 4-letter code so the results page can look one up directly from the
 * scoring engine's output.
 */
export const PERSONALITIES: Record<string, PersonalityType> = {
  INTJ: {
    code: "INTJ",
    name: "The Strategist",
    summary:
      "Independent, future-focused, and driven by a clear vision, INTJs combine long-range thinking with the discipline to make ideas real. They prefer to understand systems deeply and improve them.",
    strengths: [
      "Long-term strategic thinking",
      "Decisiveness backed by analysis",
      "High personal standards and self-direction",
      "Comfort with complex, abstract problems",
    ],
    blindSpots: [
      "Can dismiss input that feels illogical, even when it carries useful context",
      "May come across as aloof or overly critical",
      "Impatience with repetition and slower-moving processes",
    ],
    workStyle:
      "Thrives with autonomy and a clear mandate. Prefers to design the plan, then execute it methodically with minimal supervision.",
    communicationStyle:
      "Direct, precise, and idea-centric. Values substance over small talk and expects reasoning to be stated explicitly.",
    learningStyle:
      "Self-directed and conceptual; learns best by building a mental model of the whole system before drilling into specifics.",
    teamContributions: [
      "Sets a coherent long-term direction",
      "Spots structural flaws others miss",
      "Holds the team to high standards",
    ],
    careerTendencies: [
      "Systems architecture and engineering",
      "Strategy and planning roles",
      "Research, analysis, and product leadership",
    ],
  },
  INTP: {
    code: "INTP",
    name: "The Analyst",
    summary:
      "Curious and rigorously logical, INTPs are drawn to understanding how things work at a fundamental level. They generate original ideas and prize internal consistency above convention.",
    strengths: [
      "Original, first-principles thinking",
      "Objective analysis of complex problems",
      "Intellectual honesty and open-mindedness",
      "Ability to spot logical inconsistencies",
    ],
    blindSpots: [
      "May over-analyze and delay action",
      "Can neglect practical follow-through and routine details",
      "Sometimes overlooks the emotional side of decisions",
    ],
    workStyle:
      "Prefers flexible, problem-rich environments with room to explore. Works in bursts of deep focus rather than rigid schedules.",
    communicationStyle:
      "Precise and qualified; enjoys debating ideas and refining definitions. Can seem detached when absorbed in a problem.",
    learningStyle:
      "Exploratory and theoretical; learns by questioning assumptions and reconstructing concepts from the ground up.",
    teamContributions: [
      "Provides clear-eyed analysis",
      "Generates novel approaches",
      "Stress-tests ideas for logical soundness",
    ],
    careerTendencies: [
      "Software and systems development",
      "Scientific research and academia",
      "Data analysis and theoretical work",
    ],
  },
  ENTJ: {
    code: "ENTJ",
    name: "The Commander",
    summary:
      "Goal-oriented and organized, ENTJs naturally take charge, mobilize people, and drive toward results. They see the path to a goal and marshal resources to reach it efficiently.",
    strengths: [
      "Decisive leadership and execution",
      "Strategic planning at scale",
      "Confidence under pressure",
      "Ability to organize people and resources",
    ],
    blindSpots: [
      "Can steamroll quieter perspectives",
      "May undervalue emotional needs of the team",
      "Impatience with inefficiency or indecision",
    ],
    workStyle:
      "Results-driven and structured. Sets ambitious goals, defines clear ownership, and pushes momentum relentlessly.",
    communicationStyle:
      "Assertive and direct. States expectations clearly and expects the same candor in return.",
    learningStyle:
      "Goal-anchored; learns quickly when knowledge connects to a concrete objective and can be applied immediately.",
    teamContributions: [
      "Drives alignment and momentum",
      "Makes tough calls others avoid",
      "Builds efficient processes and structures",
    ],
    careerTendencies: [
      "Executive and management roles",
      "Entrepreneurship",
      "Operations and program leadership",
    ],
  },
  ENTP: {
    code: "ENTP",
    name: "The Innovator",
    summary:
      "Quick, inventive, and energized by possibility, ENTPs love to challenge assumptions and explore new angles. They thrive on intellectual sparring and turning ideas into opportunities.",
    strengths: [
      "Inventive, lateral problem-solving",
      "Persuasive and quick-witted",
      "Comfort with ambiguity and change",
      "Ability to connect disparate ideas",
    ],
    blindSpots: [
      "May start more than they finish",
      "Can argue for sport and overlook feelings",
      "Restlessness with routine maintenance",
    ],
    workStyle:
      "Flexible and fast-moving. Excels at the front end of problems — framing, ideating, and prototyping — more than long maintenance.",
    communicationStyle:
      "Playful, challenging, and idea-rich. Enjoys debate and uses it to sharpen thinking.",
    learningStyle:
      "Exploratory and conversational; learns by debating, connecting concepts, and testing ideas against others.",
    teamContributions: [
      "Generates fresh options",
      "Challenges groupthink",
      "Spots opportunities others miss",
    ],
    careerTendencies: [
      "Entrepreneurship and startups",
      "Product, marketing, and strategy",
      "Consulting and creative roles",
    ],
  },
  INFJ: {
    code: "INFJ",
    name: "The Advocate",
    summary:
      "Insightful and principled, INFJs combine deep empathy with a clear sense of purpose. They seek meaning and work quietly but persistently toward a vision of how things could be better.",
    strengths: [
      "Deep insight into people and motives",
      "Strong, values-driven sense of purpose",
      "Creative and big-picture thinking",
      "Quiet determination",
    ],
    blindSpots: [
      "Prone to burnout from over-giving",
      "Can be perfectionistic and self-critical",
      "May avoid conflict until it builds up",
    ],
    workStyle:
      "Purpose-driven and focused. Prefers meaningful projects with a degree of autonomy and a calm working environment.",
    communicationStyle:
      "Warm, thoughtful, and reserved at first. Communicates with care and prefers depth over breadth.",
    learningStyle:
      "Reflective and meaning-oriented; learns best when material connects to values and a larger purpose.",
    teamContributions: [
      "Brings empathy and perspective",
      "Anchors work to a clear purpose",
      "Mediates and harmonizes quietly",
    ],
    careerTendencies: [
      "Counseling and psychology",
      "Writing and the arts",
      "Mission-driven organizations and HR",
    ],
  },
  INFP: {
    code: "INFP",
    name: "The Idealist",
    summary:
      "Compassionate and imaginative, INFPs are guided by deeply held values and a desire for authenticity. They see potential everywhere and want their work to mean something.",
    strengths: [
      "Strong values and authenticity",
      "Empathy and care for others",
      "Creative and imaginative",
      "Open-minded and adaptable to people",
    ],
    blindSpots: [
      "Can be overly idealistic or self-critical",
      "May struggle with harsh practical constraints",
      "Tendency to avoid conflict or hard logistics",
    ],
    workStyle:
      "Values-led and flexible. Does best on work that aligns with personal meaning, with freedom in how to approach it.",
    communicationStyle:
      "Gentle, sincere, and considerate. Prefers harmony and chooses words with care.",
    learningStyle:
      "Personal and exploratory; learns through stories, meaning, and connecting ideas to their own values.",
    teamContributions: [
      "Champions people and purpose",
      "Brings creative perspective",
      "Fosters an inclusive, caring tone",
    ],
    careerTendencies: [
      "Writing and creative fields",
      "Counseling and education",
      "Nonprofit and advocacy work",
    ],
  },
  ENFJ: {
    code: "ENFJ",
    name: "The Mentor",
    summary:
      "Warm, organized, and people-focused, ENFJs naturally bring out the best in others. They combine empathy with drive, rallying groups toward shared goals.",
    strengths: [
      "Inspiring and motivating others",
      "Strong interpersonal awareness",
      "Organized and goal-oriented",
      "Building consensus and warmth",
    ],
    blindSpots: [
      "Can over-extend caring for others",
      "May take criticism personally",
      "Tendency to avoid necessary conflict",
    ],
    workStyle:
      "Collaborative and structured. Excels at coordinating people, setting a positive tone, and keeping work aligned to shared goals.",
    communicationStyle:
      "Expressive, encouraging, and attentive. Reads the room well and tailors the message to the audience.",
    learningStyle:
      "Social and applied; learns well in discussion and by teaching others.",
    teamContributions: [
      "Builds cohesion and morale",
      "Develops and coaches teammates",
      "Drives toward shared goals",
    ],
    careerTendencies: [
      "Teaching and coaching",
      "Team leadership and HR",
      "Community and nonprofit leadership",
    ],
  },
  ENFP: {
    code: "ENFP",
    name: "The Champion",
    summary:
      "Enthusiastic, creative, and people-loving, ENFPs see life as full of possibilities. They connect easily with others and bring energy and imagination to whatever they pursue.",
    strengths: [
      "Contagious enthusiasm and energy",
      "Creativity and idea generation",
      "Warmth and ability to connect",
      "Adaptability and curiosity",
    ],
    blindSpots: [
      "Can lose focus and leave things unfinished",
      "May overcommit out of enthusiasm",
      "Struggles with routine and fine detail",
    ],
    workStyle:
      "Energetic and flexible. Thrives on variety, collaboration, and projects that allow creative freedom.",
    communicationStyle:
      "Warm, expressive, and idea-rich. Builds rapport quickly and communicates with genuine enthusiasm.",
    learningStyle:
      "Exploratory and social; learns by connecting ideas to people and possibilities.",
    teamContributions: [
      "Energizes and inspires the group",
      "Generates creative options",
      "Builds bridges between people",
    ],
    careerTendencies: [
      "Marketing and communications",
      "Creative and media roles",
      "Coaching, training, and entrepreneurship",
    ],
  },
  ISTJ: {
    code: "ISTJ",
    name: "The Inspector",
    summary:
      "Responsible, thorough, and dependable, ISTJs value accuracy and follow-through. They honor commitments and keep things running through careful, consistent effort.",
    strengths: [
      "Reliability and follow-through",
      "Attention to detail and accuracy",
      "Strong sense of duty",
      "Practical, organized execution",
    ],
    blindSpots: [
      "Can resist change and new methods",
      "May be overly rigid about rules",
      "Sometimes overlooks the emotional dimension",
    ],
    workStyle:
      "Methodical and orderly. Prefers clear expectations, proven procedures, and the time to do things properly.",
    communicationStyle:
      "Clear, factual, and concise. Says what is needed and follows through on what is said.",
    learningStyle:
      "Sequential and practical; learns best through structured, step-by-step instruction with concrete examples.",
    teamContributions: [
      "Delivers consistently and on time",
      "Maintains standards and accuracy",
      "Provides stability and continuity",
    ],
    careerTendencies: [
      "Accounting, finance, and audit",
      "Operations and administration",
      "Law, logistics, and quality assurance",
    ],
  },
  ISFJ: {
    code: "ISFJ",
    name: "The Protector",
    summary:
      "Caring, conscientious, and steady, ISFJs quietly look after the people and responsibilities in their charge. They combine practicality with genuine warmth.",
    strengths: [
      "Dependability and conscientiousness",
      "Genuine care for others' wellbeing",
      "Attention to practical detail",
      "Loyalty and patience",
    ],
    blindSpots: [
      "Can neglect their own needs",
      "May avoid conflict and overaccommodate",
      "Reluctance to embrace change",
    ],
    workStyle:
      "Supportive and detail-oriented. Excels at reliable execution and quietly keeping people and processes cared for.",
    communicationStyle:
      "Considerate, warm, and practical. Listens carefully and prefers a harmonious tone.",
    learningStyle:
      "Concrete and supportive; learns well with clear structure and real-world relevance.",
    teamContributions: [
      "Supports teammates attentively",
      "Keeps details and logistics on track",
      "Sustains a stable, caring atmosphere",
    ],
    careerTendencies: [
      "Healthcare and nursing",
      "Education and support roles",
      "Administration and customer care",
    ],
  },
  ESTJ: {
    code: "ESTJ",
    name: "The Director",
    summary:
      "Organized, decisive, and practical, ESTJs bring order and accountability. They value clear structures and get things done by setting and enforcing expectations.",
    strengths: [
      "Strong organizational ability",
      "Decisiveness and accountability",
      "Practical, results-focused execution",
      "Dependability and consistency",
    ],
    blindSpots: [
      "Can be inflexible about process",
      "May overlook feelings in pursuit of results",
      "Impatience with ambiguity",
    ],
    workStyle:
      "Structured and efficient. Sets clear goals, defines roles, and holds everyone — including themselves — accountable.",
    communicationStyle:
      "Direct, clear, and matter-of-fact. States expectations plainly and values straightforward answers.",
    learningStyle:
      "Practical and structured; learns by doing within an organized, goal-oriented framework.",
    teamContributions: [
      "Establishes clear structure and roles",
      "Drives execution and accountability",
      "Keeps work organized and on schedule",
    ],
    careerTendencies: [
      "Management and operations",
      "Administration and project management",
      "Law enforcement, finance, and logistics",
    ],
  },
  ESFJ: {
    code: "ESFJ",
    name: "The Provider",
    summary:
      "Warm, organized, and community-minded, ESFJs take care of people and keep groups running smoothly. They value cooperation, loyalty, and a harmonious environment.",
    strengths: [
      "Strong interpersonal warmth",
      "Organized and dependable",
      "Attentive to others' needs",
      "Builds cooperation and morale",
    ],
    blindSpots: [
      "Can be sensitive to criticism",
      "May prioritize harmony over hard truths",
      "Tendency to over-please",
    ],
    workStyle:
      "Cooperative and practical. Excels at coordinating people, supporting teammates, and keeping things welcoming and organized.",
    communicationStyle:
      "Friendly, supportive, and tactful. Attuned to others and quick to offer encouragement.",
    learningStyle:
      "Social and concrete; learns well in supportive group settings with clear, practical relevance.",
    teamContributions: [
      "Builds a positive, cooperative culture",
      "Coordinates people and details",
      "Supports and includes everyone",
    ],
    careerTendencies: [
      "Healthcare and education",
      "Human resources and customer relations",
      "Event and office management",
    ],
  },
  ISTP: {
    code: "ISTP",
    name: "The Craftsman",
    summary:
      "Practical, observant, and cool under pressure, ISTPs love to understand how things work by taking them apart. They solve concrete problems with efficient, hands-on logic.",
    strengths: [
      "Hands-on problem solving",
      "Calm and adaptable in a crisis",
      "Efficient, practical logic",
      "Independent and resourceful",
    ],
    blindSpots: [
      "Can seem detached or hard to read",
      "May resist long-term planning",
      "Impatience with abstract talk",
    ],
    workStyle:
      "Independent and pragmatic. Prefers concrete challenges, autonomy, and the freedom to solve problems their own way.",
    communicationStyle:
      "Economical and factual. Says little until there's something useful to add; prefers action to discussion.",
    learningStyle:
      "Hands-on and experimental; learns by doing, tinkering, and reverse-engineering.",
    teamContributions: [
      "Troubleshoots problems quickly",
      "Stays composed under pressure",
      "Delivers practical, working solutions",
    ],
    careerTendencies: [
      "Engineering and the skilled trades",
      "Emergency and field response",
      "Technology, mechanics, and analysis",
    ],
  },
  ISFP: {
    code: "ISFP",
    name: "The Artist",
    summary:
      "Gentle, aesthetic, and present-focused, ISFPs experience the world through their senses and values. They express themselves through action and craft rather than words.",
    strengths: [
      "Aesthetic and creative sensibility",
      "Warmth and authenticity",
      "Adaptability and a calm presence",
      "Strong personal values",
    ],
    blindSpots: [
      "Can avoid conflict and confrontation",
      "May struggle with long-term planning",
      "Tendency to be overly self-critical",
    ],
    workStyle:
      "Flexible and hands-on. Prefers practical, creative work with autonomy and a pleasant, low-pressure environment.",
    communicationStyle:
      "Quiet, considerate, and genuine. Shows care through actions more than declarations.",
    learningStyle:
      "Experiential and sensory; learns by doing in a supportive, low-pressure setting.",
    teamContributions: [
      "Brings creativity and craft",
      "Eases tension with a calm presence",
      "Stays flexible and practical",
    ],
    careerTendencies: [
      "Design and the arts",
      "Healthcare and personal care",
      "Culinary, craft, and hands-on fields",
    ],
  },
  ESTP: {
    code: "ESTP",
    name: "The Dynamo",
    summary:
      "Energetic, pragmatic, and bold, ESTPs live in the moment and excel at acting fast when it counts. They learn by doing and thrive where quick thinking is rewarded.",
    strengths: [
      "Quick, decisive action",
      "Comfort with risk and pressure",
      "Practical, real-world problem solving",
      "Persuasive and energetic",
    ],
    blindSpots: [
      "Can be impatient and impulsive",
      "May overlook long-term consequences",
      "Restlessness with theory and routine",
    ],
    workStyle:
      "Fast-paced and hands-on. Excels in dynamic situations that reward initiative, adaptability, and immediate results.",
    communicationStyle:
      "Direct, lively, and persuasive. Gets to the point and is comfortable taking the lead in the moment.",
    learningStyle:
      "Active and experiential; learns fastest by jumping in and figuring it out through practice.",
    teamContributions: [
      "Drives quick action and momentum",
      "Handles pressure and change well",
      "Finds pragmatic solutions on the fly",
    ],
    careerTendencies: [
      "Sales and negotiation",
      "Entrepreneurship",
      "Emergency response and operations",
    ],
  },
  ESFP: {
    code: "ESFP",
    name: "The Performer",
    summary:
      "Spontaneous, warm, and full of life, ESFPs bring energy and fun wherever they go. They live in the present and connect easily, making experiences enjoyable for everyone.",
    strengths: [
      "Infectious energy and warmth",
      "Strong people skills",
      "Adaptability and spontaneity",
      "Practical, in-the-moment problem solving",
    ],
    blindSpots: [
      "Can avoid long-term planning",
      "May get distracted or overcommit",
      "Sensitive to criticism and conflict",
    ],
    workStyle:
      "Lively and collaborative. Thrives in people-facing, hands-on roles with variety and immediate feedback.",
    communicationStyle:
      "Expressive, friendly, and engaging. Builds rapport instantly and keeps the mood positive.",
    learningStyle:
      "Hands-on and social; learns best through doing, interacting, and real-world experience.",
    teamContributions: [
      "Lifts morale and energy",
      "Connects easily with people",
      "Keeps work practical and engaging",
    ],
    careerTendencies: [
      "Sales, hospitality, and events",
      "Performing arts and media",
      "Healthcare and customer-facing roles",
    ],
  },
};

/** Look up a personality type by its 4-letter code. */
export function getPersonality(code: string): PersonalityType | undefined {
  return PERSONALITIES[code.toUpperCase()];
}
