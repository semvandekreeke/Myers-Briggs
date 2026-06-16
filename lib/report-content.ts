import type { TypeReport } from "./types";

/**
 * Rich, section-specific report content for all 16 personality types.
 *
 * This module is pure data. It powers the premium multi-section results report
 * (Personality Traits, Career Path, Personal Growth, Relationships). The hero
 * banner and the strengths/blind-spots/work-comm-learning summaries continue to
 * come from `lib/personalities.ts`; this file adds the deeper narrative content.
 *
 * Each entry is unique to its type. To add or revise content, edit the relevant
 * `TypeReport` below — no component or engine changes are required.
 */
export const REPORTS: Record<string, TypeReport> = {
  // ===========================================================================
  // ANALYSTS (NT)
  // ===========================================================================
  INTJ: {
    personality: {
      overview:
        "INTJs are strategic, independent thinkers who see the world as a set of systems waiting to be understood and improved. They live a few steps ahead, mapping how today's decisions ripple into tomorrow, and they hold themselves to demanding internal standards. Privately driven and quietly confident, they would rather master a problem completely than appear busy solving it.",
      decisionMakingStyle:
        "Analytical and long-range. INTJs gather the relevant logic, model the second-order consequences, and commit decisively once the reasoning holds together. They weight competence and coherence over consensus, and they will revise a conclusion the moment better evidence appears.",
    },
    career: {
      idealEnvironments: [
        "Autonomy to design and own the approach end-to-end",
        "Complex, intellectually demanding problems",
        "A competence-based culture with minimal micromanagement",
        "Long horizons where strategy matters more than reaction",
      ],
      leadershipStyle:
        "Visionary and standards-driven. INTJs lead by setting a clear strategic direction, then trusting capable people to execute. They are decisive, fair, and more interested in being effective than in being liked.",
      motivators: [
        "Mastering difficult, meaningful problems",
        "Building systems that outlast them",
        "Continuous learning and competence",
        "Independence and intellectual respect",
      ],
      careerStrengths: [
        "Long-term strategic planning",
        "Cutting through complexity to the core issue",
        "Designing scalable systems and processes",
        "Independent, self-directed execution",
      ],
      recommendedCareers: [
        "Systems / Software Architect",
        "Strategy Consultant",
        "Research Scientist",
        "Product or Engineering Director",
        "Investment Analyst",
      ],
      challengingCareers: [
        "High-volume customer service",
        "Roles dominated by improvisation and small talk",
        "Rigidly scripted positions with no autonomy",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Inviting input before locking in a plan",
        "Valuing emotional context as real data",
        "Letting 'good enough' ship instead of chasing perfect",
      ],
      habitsToBuild: [
        "Schedule regular check-ins to share your thinking early",
        "Name the human impact of a decision, not just its logic",
        "Celebrate progress rather than fixating on the gap to ideal",
      ],
      habitsToAvoid: [
        "Dismissing ideas before others finish explaining them",
        "Isolating when stressed instead of asking for help",
        "Treating every disagreement as a competence test",
      ],
      emotionalGrowth:
        "Growth for INTJs often means treating feelings — their own and others' — as legitimate information rather than noise to be optimized away. Practicing curiosity about emotional reactions builds the warmth their competence already earns.",
      communicationTips: [
        "Lead with the conclusion, then offer reasoning if asked",
        "Acknowledge a point's merit before critiquing it",
        "Soften delivery without diluting the substance",
      ],
      stressManagement:
        "Under stress INTJs can over-control and withdraw into analysis. Recovery comes from stepping away from the problem, physical movement, and deliberately reconnecting with trusted people instead of going it alone.",
      roadmap: [
        "Pick one relationship to practice sharing half-formed ideas",
        "Add an explicit 'who does this affect?' step to decisions",
        "Set a 'done' threshold for projects and honor it",
        "Build a weekly habit of unstructured rest, not just productivity",
      ],
    },
    relationships: {
      friendshipStyle:
        "INTJs keep a small circle of trusted, intellectually engaging friends. They are loyal and low-maintenance, valuing depth and honesty far more than frequency of contact.",
      romanticTendencies:
        "In love, INTJs are selective, committed, and surprisingly devoted once they choose a partner. They show care through problem-solving, planning, and reliability rather than constant verbal affection.",
      familyDynamics:
        "They bring stability and high standards to family life, often acting as the long-term planner. They thrive when relatives respect their independence and direct communication.",
      communicationPreferences:
        "Direct, substantive, and efficient. INTJs appreciate partners who say what they mean and don't require them to decode hidden signals.",
      conflictResolution:
        "They prefer to step back, analyze the issue calmly, and resolve it logically. They grow by addressing the emotional layer rather than treating conflict as a purely technical fix.",
      strengths: [
        "Loyalty and dependability",
        "Honesty and clarity",
        "Commitment to a partner's long-term growth",
      ],
      growthOpportunities: [
        "Expressing affection more openly and often",
        "Tolerating emotional messiness without trying to fix it",
        "Making space for spontaneity",
      ],
    },
  },

  INTP: {
    personality: {
      overview:
        "INTPs are inventive, precise thinkers fascinated by how things work at the deepest level. They live largely in a world of ideas, building and refining mental models, and they prize logical consistency above almost everything else. Open-minded and intellectually honest, they are quick to follow a good argument wherever it leads — including away from their own prior position.",
      decisionMakingStyle:
        "Exploratory and logic-first. INTPs analyze a question from many angles, often resisting premature closure until the framework feels coherent. Their challenge is acting before the analysis becomes endless.",
    },
    career: {
      idealEnvironments: [
        "Open-ended problems with intellectual depth",
        "Flexible structure and autonomy over their time",
        "Colleagues who debate ideas without ego",
        "Freedom to explore before committing to a path",
      ],
      leadershipStyle:
        "Thought-leader rather than manager. INTPs lead through expertise and original ideas, empowering others with frameworks rather than directives. They prefer to influence the thinking than to run the logistics.",
      motivators: [
        "Understanding something completely",
        "Intellectual freedom and novelty",
        "Elegant, logically sound solutions",
        "Autonomy and minimal bureaucracy",
      ],
      careerStrengths: [
        "First-principles problem solving",
        "Spotting logical flaws and edge cases",
        "Generating original theories and approaches",
        "Deep technical and conceptual analysis",
      ],
      recommendedCareers: [
        "Software Engineer / Researcher",
        "Data Scientist",
        "Mathematician or Physicist",
        "Systems Analyst",
        "University Researcher",
      ],
      challengingCareers: [
        "Highly procedural administrative roles",
        "Emotionally intensive caretaking positions",
        "Rigid sales quotas with constant social pressure",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Converting ideas into finished, shipped work",
        "Following through on practical commitments",
        "Engaging the emotional side of decisions",
      ],
      habitsToBuild: [
        "Set small deadlines to force closure",
        "Keep a simple system for tracking commitments",
        "Share ideas before they feel fully complete",
      ],
      habitsToAvoid: [
        "Endless analysis as a way to avoid action",
        "Neglecting routine tasks until they pile up",
        "Withdrawing from people for too long",
      ],
      emotionalGrowth:
        "INTPs grow by recognizing that emotions are data with their own logic. Naming feelings and checking in with loved ones builds connection that pure analysis can't provide.",
      communicationTips: [
        "Translate abstract ideas into concrete examples",
        "State a conclusion, not only the qualifications around it",
        "Acknowledge others' feelings before debating their logic",
      ],
      stressManagement:
        "Under stress INTPs can spiral into overthinking or unexpected bursts of emotion. Grounding routines — exercise, sleep, and talking it through with one trusted person — restore balance.",
      roadmap: [
        "Choose one project and carry it fully to completion",
        "Build a lightweight daily structure you can keep",
        "Practice voicing feelings, not just thoughts",
        "Protect deep-focus time while honoring practical duties",
      ],
    },
    relationships: {
      friendshipStyle:
        "INTPs bond over shared curiosity and big questions. They prefer a few intellectually stimulating friends and give each other plenty of space.",
      romanticTendencies:
        "Loyal and low-drama, INTPs value a partner who respects their independence and engages their mind. They may struggle to verbalize emotions but care deeply.",
      familyDynamics:
        "They contribute calm rationality and creative problem-solving, and do best when family allows them autonomy and doesn't demand constant emotional display.",
      communicationPreferences:
        "Logical, candid, and unhurried. INTPs appreciate partners who don't take their analytical detachment personally.",
      conflictResolution:
        "They prefer to step back and reason through disagreements, sometimes needing reminders that timely emotional reassurance matters as much as being right.",
      strengths: [
        "Open-mindedness and fairness",
        "Respect for a partner's independence",
        "Calm, non-reactive problem solving",
      ],
      growthOpportunities: [
        "Expressing emotions more readily",
        "Following through on shared plans",
        "Staying present instead of retreating into thought",
      ],
    },
  },

  ENTJ: {
    personality: {
      overview:
        "ENTJs are natural commanders — decisive, organized, and energized by turning vision into results. They see inefficiency as a problem to solve and rally people, plans, and resources toward ambitious goals. Confident and strategic, they thrive when given the authority to lead and the scope to make a real impact.",
      decisionMakingStyle:
        "Fast, logical, and outcome-driven. ENTJs gather key facts, weigh them against the objective, and commit without agonizing. Their growth edge is slowing down enough to factor in people's feelings and quieter input.",
    },
    career: {
      idealEnvironments: [
        "Leadership roles with real authority",
        "Ambitious, goal-oriented organizations",
        "Fast decision-making and measurable results",
        "Opportunities to build and scale",
      ],
      leadershipStyle:
        "Commanding and strategic. ENTJs set bold goals, define clear ownership, and drive relentless momentum. They expect excellence and reward competence.",
      motivators: [
        "Achievement and visible impact",
        "Leading and building organizations",
        "Efficiency and continuous improvement",
        "Winning at meaningful challenges",
      ],
      careerStrengths: [
        "Strategic planning and execution",
        "Organizing people and resources",
        "Decisive leadership under pressure",
        "Driving accountability and results",
      ],
      recommendedCareers: [
        "Executive / CEO",
        "Management Consultant",
        "Entrepreneur / Founder",
        "Operations or Program Director",
        "Corporate Lawyer",
      ],
      challengingCareers: [
        "Roles with no decision-making authority",
        "Slow, highly bureaucratic environments",
        "Repetitive work with no growth path",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Listening fully before deciding",
        "Recognizing emotional needs on the team",
        "Tolerating ambiguity and slower processes",
      ],
      habitsToBuild: [
        "Ask one clarifying question before issuing a directive",
        "Acknowledge effort, not just outcomes",
        "Schedule reflection time, not only execution time",
      ],
      habitsToAvoid: [
        "Steamrolling quieter voices",
        "Treating people as means to an end",
        "Impatience that shuts down good ideas",
      ],
      emotionalGrowth:
        "ENTJs grow by valuing empathy as a leadership strength, not a soft add-on. Pausing to understand how decisions land emotionally multiplies their influence.",
      communicationTips: [
        "Invite input explicitly so others feel safe contributing",
        "Balance critique with genuine recognition",
        "Slow your pace to match the room",
      ],
      stressManagement:
        "Under pressure ENTJs may become controlling or blunt. Delegating, exercising, and stepping back to reconnect with the 'why' help them lead from a calmer place.",
      roadmap: [
        "Practice active listening in one meeting per day",
        "Build a feedback ritual that includes appreciation",
        "Delegate something you'd normally control",
        "Protect downtime to prevent burnout",
      ],
    },
    relationships: {
      friendshipStyle:
        "ENTJs gravitate toward driven, capable friends and enjoy debating ideas and pursuing goals together. They are loyal and generous with their networks.",
      romanticTendencies:
        "Committed and dependable, ENTJs invest in a relationship like a shared project — setting goals and solving problems. They grow by making room for vulnerability.",
      familyDynamics:
        "They take charge of planning and providing, and do best when they balance their drive with patience and warmth at home.",
      communicationPreferences:
        "Direct, candid, and efficient. ENTJs value partners who speak plainly and engage as equals.",
      conflictResolution:
        "They confront issues head-on and seek quick resolution, benefiting from slowing down to validate feelings before fixing the problem.",
      strengths: [
        "Loyalty and commitment",
        "Drive to help loved ones grow",
        "Reliability and decisiveness",
      ],
      growthOpportunities: [
        "Softening directness in tender moments",
        "Showing vulnerability",
        "Prioritizing connection over efficiency",
      ],
    },
  },

  ENTP: {
    personality: {
      overview:
        "ENTPs are quick, inventive, and energized by possibility. They love to challenge assumptions, connect unrelated ideas, and explore what could be. Charismatic debaters and natural improvisers, they thrive on novelty and intellectual sparring — sometimes more drawn to launching the next idea than finishing the last one.",
      decisionMakingStyle:
        "Rapid and possibility-driven. ENTPs generate many options, pressure-test them through debate, and pivot easily as new information arrives. Their challenge is committing and following through once the exciting part is over.",
    },
    career: {
      idealEnvironments: [
        "Fast-moving, idea-rich settings",
        "Variety and frequent new challenges",
        "Freedom to experiment and prototype",
        "Smart colleagues open to debate",
      ],
      leadershipStyle:
        "Visionary and energizing. ENTPs lead by reframing problems, inspiring possibility, and rallying people around bold ideas. They shine at the front end of ventures.",
      motivators: [
        "Novelty and intellectual challenge",
        "Building something new",
        "Freedom and flexibility",
        "Influence through ideas",
      ],
      careerStrengths: [
        "Innovative, lateral problem solving",
        "Persuasion and pitching",
        "Connecting disparate concepts",
        "Thriving in ambiguity and change",
      ],
      recommendedCareers: [
        "Entrepreneur / Startup Founder",
        "Product Manager",
        "Marketing or Brand Strategist",
        "Management Consultant",
        "Venture Capitalist",
      ],
      challengingCareers: [
        "Highly repetitive, detail-bound roles",
        "Rigid hierarchies with strict procedures",
        "Long-term maintenance with no novelty",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Finishing what they start",
        "Building consistent follow-through",
        "Considering emotional impact in debates",
      ],
      habitsToBuild: [
        "Pick a small number of priorities and protect them",
        "Pair with a finisher to close out projects",
        "Track commitments so ideas become outcomes",
      ],
      habitsToAvoid: [
        "Starting more than you can complete",
        "Arguing for sport at others' expense",
        "Chasing the new and abandoning the valuable",
      ],
      emotionalGrowth:
        "ENTPs grow by reading the room and recognizing when intellectual sparring lands as criticism. Tuning into feelings turns their energy into genuine connection.",
      communicationTips: [
        "Signal that you're exploring, not attacking",
        "Let others finish before countering",
        "Follow ideas with concrete next steps",
      ],
      stressManagement:
        "Under stress ENTPs can scatter or become argumentative. Grounding routines, finishing one thing, and talking with steady friends restore focus.",
      roadmap: [
        "Commit to completing one project before starting another",
        "Adopt a simple system to capture and prioritize ideas",
        "Practice empathetic listening in debates",
        "Build a consistent daily anchor habit",
      ],
    },
    relationships: {
      friendshipStyle:
        "ENTPs collect a wide, eclectic circle and keep friendships lively with banter, ideas, and adventures. They energize the people around them.",
      romanticTendencies:
        "Playful and engaging, ENTPs want a partner who is also a sparring partner and friend. They grow by offering steadiness and emotional reassurance.",
      familyDynamics:
        "They bring humor, spontaneity, and fresh thinking to family life, and do best when balancing exploration with reliability.",
      communicationPreferences:
        "Witty, candid, and exploratory. ENTPs value partners who don't take debate personally and can keep up with their pace.",
      conflictResolution:
        "They like to talk it out and explore angles, benefiting from staying on point emotionally rather than turning conflict into a debate to win.",
      strengths: [
        "Energy and adaptability",
        "Openness to a partner's ideas",
        "Keeping the relationship stimulating",
      ],
      growthOpportunities: [
        "Providing consistency and follow-through",
        "Softening the urge to debate",
        "Attending to emotional needs",
      ],
    },
  },

  // ===========================================================================
  // DIPLOMATS (NF)
  // ===========================================================================
  INFJ: {
    personality: {
      overview:
        "INFJs are insightful, principled, and quietly determined. They read people and situations with unusual depth and are guided by a strong inner sense of purpose. Idealistic but practical about pursuing their vision, they work persistently — and often behind the scenes — to make things meaningfully better.",
      decisionMakingStyle:
        "Values-driven and intuitive. INFJs weigh decisions against their principles and their read of human impact, often knowing what feels right before they can fully articulate why. Their growth edge is not over-sacrificing their own needs.",
    },
    career: {
      idealEnvironments: [
        "Mission-driven, purposeful work",
        "Calm, low-conflict atmospheres",
        "Autonomy and meaningful one-on-one impact",
        "Alignment between values and the organization",
      ],
      leadershipStyle:
        "Quiet and inspiring. INFJs lead through vision, integrity, and deep care for people, drawing others toward a shared purpose rather than commanding from the front.",
      motivators: [
        "Making a meaningful difference",
        "Helping others grow",
        "Living in line with their values",
        "Creative, purposeful expression",
      ],
      careerStrengths: [
        "Deep insight into people and motives",
        "Creative, big-picture vision",
        "Empathy paired with determination",
        "Writing and one-on-one guidance",
      ],
      recommendedCareers: [
        "Counselor / Psychologist",
        "Writer / Editor",
        "HR or Organizational Development",
        "Nonprofit Program Lead",
        "UX Researcher",
      ],
      challengingCareers: [
        "Cutthroat, purely transactional sales",
        "High-conflict, combative environments",
        "Impersonal, high-volume processing roles",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Setting boundaries to prevent burnout",
        "Accepting good enough over perfect",
        "Addressing conflict before it builds up",
      ],
      habitsToBuild: [
        "Schedule recovery time as non-negotiable",
        "Voice needs and disagreements early",
        "Celebrate progress, not just the ideal",
      ],
      habitsToAvoid: [
        "Over-giving until you're depleted",
        "Bottling up frustration",
        "Withdrawing entirely when overwhelmed",
      ],
      emotionalGrowth:
        "INFJs grow by extending to themselves the compassion they give others. Honoring their own needs is not selfish — it's what makes their care sustainable.",
      communicationTips: [
        "Say what you need directly, not just what others need",
        "Don't wait for problems to become crises",
        "Let people in before you're at your limit",
      ],
      stressManagement:
        "Under stress INFJs may withdraw or experience uncharacteristic outbursts. Solitude to recharge, journaling, and confiding in a trusted person help them reset.",
      roadmap: [
        "Set one clear boundary you've been avoiding",
        "Build a weekly solitude-and-recharge ritual",
        "Practice voicing small disagreements promptly",
        "Track wins to counter perfectionism",
      ],
    },
    relationships: {
      friendshipStyle:
        "INFJs form deep, lasting friendships with a select few. They are devoted listeners who crave authenticity and meaningful conversation over surface socializing.",
      romanticTendencies:
        "INFJs seek a soulmate-level connection built on trust, depth, and shared values. Deeply loyal, they invest fully and need a partner who reciprocates emotionally.",
      familyDynamics:
        "They are nurturing, attuned, and protective, often the emotional anchor of the family. They thrive when their own needs are seen too.",
      communicationPreferences:
        "Warm, thoughtful, and meaning-rich. INFJs prefer depth and sincerity and dislike superficial or combative exchanges.",
      conflictResolution:
        "They seek harmony and understanding, preferring calm, honest dialogue. Growth means confronting issues directly rather than avoiding them until they overflow.",
      strengths: [
        "Deep empathy and devotion",
        "Insight into a partner's needs",
        "Commitment to growing together",
      ],
      growthOpportunities: [
        "Setting boundaries without guilt",
        "Voicing needs as clearly as they hear others'",
        "Tolerating imperfection in relationships",
      ],
    },
  },

  INFP: {
    personality: {
      overview:
        "INFPs are compassionate idealists guided by deeply held values and a longing for authenticity. They see potential everywhere — in people, ideas, and themselves — and want their lives to mean something. Imaginative and gentle, they bring quiet creativity and a strong moral compass to whatever they care about.",
      decisionMakingStyle:
        "Values-centered and reflective. INFPs check choices against their inner sense of right and meaning, sometimes wrestling with options that look fine logically but feel off. Their growth edge is acting amid practical constraints.",
    },
    career: {
      idealEnvironments: [
        "Work aligned with personal values",
        "Creative freedom and flexibility",
        "Supportive, non-competitive culture",
        "Meaningful impact on people or ideas",
      ],
      leadershipStyle:
        "Authentic and people-centered. INFPs lead by example and shared values, inspiring through sincerity and care rather than authority.",
      motivators: [
        "Living authentically",
        "Helping others and a cause",
        "Creative self-expression",
        "Personal meaning and growth",
      ],
      careerStrengths: [
        "Creativity and imagination",
        "Empathy and people insight",
        "Strong values and integrity",
        "Adaptability to individuals",
      ],
      recommendedCareers: [
        "Writer / Author",
        "Counselor / Therapist",
        "Graphic or UX Designer",
        "Teacher / Educator",
        "Nonprofit Advocate",
      ],
      challengingCareers: [
        "Cutthroat corporate sales",
        "Rigid, rules-bound bureaucracy",
        "Impersonal, purely quantitative roles",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Turning ideals into concrete action",
        "Handling practical logistics and details",
        "Building resilience to criticism",
      ],
      habitsToBuild: [
        "Break dreams into small, doable steps",
        "Set deadlines to move from idea to action",
        "Separate feedback on work from self-worth",
      ],
      habitsToAvoid: [
        "Procrastinating on unappealing practical tasks",
        "Idealizing to the point of paralysis",
        "Internalizing every critique",
      ],
      emotionalGrowth:
        "INFPs grow by accepting imperfection — in themselves and the world — and by channeling deep feeling into steady action rather than rumination.",
      communicationTips: [
        "Share your perspective even when it risks disagreement",
        "Ask for what you need explicitly",
        "Ground abstract values in concrete examples",
      ],
      stressManagement:
        "Under stress INFPs can retreat, self-criticize, or feel overwhelmed by emotion. Creative outlets, time in nature, and confiding in someone safe help them recenter.",
      roadmap: [
        "Choose one value and act on it this week",
        "Adopt a gentle structure for practical tasks",
        "Practice receiving criticism without self-judgment",
        "Build a regular creative or reflective ritual",
      ],
    },
    relationships: {
      friendshipStyle:
        "INFPs are warm, accepting friends who form deep bonds with a trusted few. They cherish authenticity and meaningful, heart-to-heart connection.",
      romanticTendencies:
        "Romantic and devoted, INFPs seek a soulful partnership rooted in shared values. They love deeply and need a partner who honors their sensitivity.",
      familyDynamics:
        "They bring compassion and acceptance, championing each person's individuality. They thrive when family respects their need for harmony and authenticity.",
      communicationPreferences:
        "Gentle, sincere, and considerate. INFPs prefer harmony and may need encouragement to voice their own needs.",
      conflictResolution:
        "They find conflict painful and seek peaceful resolution, growing by addressing issues directly instead of withdrawing or over-accommodating.",
      strengths: [
        "Deep empathy and acceptance",
        "Loyalty and devotion",
        "Bringing out a partner's best",
      ],
      growthOpportunities: [
        "Voicing needs and boundaries",
        "Facing conflict instead of avoiding it",
        "Staying grounded under emotional strain",
      ],
    },
  },

  ENFJ: {
    personality: {
      overview:
        "ENFJs are warm, charismatic mentors who naturally bring out the best in others. Attuned to people's needs and motivated by a desire to help them flourish, they combine genuine empathy with organization and drive. They build community wherever they go and feel most alive when uniting people around a shared, worthwhile goal.",
      decisionMakingStyle:
        "People-centered and values-guided. ENFJs weigh how choices affect others and seek solutions that move the group forward together. Their growth edge is including their own needs in the equation.",
    },
    career: {
      idealEnvironments: [
        "People-focused, collaborative settings",
        "Mission-driven organizations",
        "Opportunities to develop and lead others",
        "Positive, harmonious culture",
      ],
      leadershipStyle:
        "Inspiring and supportive. ENFJs lead by motivating, coaching, and aligning people around a shared vision. They build morale and draw out everyone's potential.",
      motivators: [
        "Helping people grow",
        "Building community and harmony",
        "Meaningful, shared purpose",
        "Positive impact on others",
      ],
      careerStrengths: [
        "Inspiring and motivating teams",
        "Reading and meeting people's needs",
        "Organizing people toward goals",
        "Building consensus and warmth",
      ],
      recommendedCareers: [
        "Teacher / Professor",
        "HR or People Leader",
        "Coach / Mentor",
        "Nonprofit Director",
        "Public Relations Lead",
      ],
      challengingCareers: [
        "Isolated, purely technical roles",
        "Highly impersonal, transactional work",
        "Cynical, conflict-ridden environments",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Setting boundaries and avoiding over-giving",
        "Receiving criticism without taking it personally",
        "Addressing conflict directly",
      ],
      habitsToBuild: [
        "Schedule time for your own needs",
        "Separate feedback from self-worth",
        "Name problems early instead of smoothing over",
      ],
      habitsToAvoid: [
        "Neglecting yourself while caring for others",
        "Avoiding hard conversations to keep peace",
        "Over-identifying with others' approval",
      ],
      emotionalGrowth:
        "ENFJs grow by tending to their own emotional needs as diligently as they tend to others', and by accepting that not everyone can be pleased.",
      communicationTips: [
        "Ask for support, not just offer it",
        "Allow space for healthy disagreement",
        "Don't sacrifice candor to preserve harmony",
      ],
      stressManagement:
        "Under stress ENFJs may overextend and burn out or become hypersensitive to criticism. Rest, boundaries, and confiding in trusted friends help them recover.",
      roadmap: [
        "Block weekly time purely for yourself",
        "Practice saying no without guilt",
        "Address one avoided conflict honestly",
        "Build a habit of seeking support, not only giving it",
      ],
    },
    relationships: {
      friendshipStyle:
        "ENFJs are generous, devoted friends who invest deeply and keep their circle connected. They remember details and show up when it matters.",
      romanticTendencies:
        "Affectionate and committed, ENFJs pour energy into nurturing the relationship. They grow by ensuring their own needs are met, not only their partner's.",
      familyDynamics:
        "They are warm, organizing forces who keep family bonds strong. They thrive when appreciated and when they remember to rest.",
      communicationPreferences:
        "Expressive, encouraging, and attentive. ENFJs value open emotional exchange and dislike cold or dismissive responses.",
      conflictResolution:
        "They seek harmony and work hard to mend rifts, growing by addressing issues candidly rather than over-accommodating.",
      strengths: [
        "Warmth and devotion",
        "Attunement to a partner's needs",
        "Commitment to mutual growth",
      ],
      growthOpportunities: [
        "Setting boundaries",
        "Voicing their own needs",
        "Not taking conflict personally",
      ],
    },
  },

  ENFP: {
    personality: {
      overview:
        "ENFPs are enthusiastic, imaginative free spirits who see life as a canvas of possibility. Warm and endlessly curious, they connect easily with people and ideas, and they bring contagious energy to everything that captures their heart. They crave authenticity and meaning, and resist anything that feels confining or routine.",
      decisionMakingStyle:
        "Values-driven and possibility-led. ENFPs follow their enthusiasm and their read of what feels meaningful, exploring many options before committing. Their growth edge is following through once the initial spark fades.",
    },
    career: {
      idealEnvironments: [
        "Creative, flexible, people-rich settings",
        "Variety and frequent new challenges",
        "Alignment with personal values",
        "Collaborative, encouraging culture",
      ],
      leadershipStyle:
        "Inspiring and inclusive. ENFPs lead with vision, enthusiasm, and genuine care, energizing teams and championing everyone's ideas.",
      motivators: [
        "Meaning and authenticity",
        "Creative freedom",
        "Connection with people",
        "Novelty and growth",
      ],
      careerStrengths: [
        "Creativity and idea generation",
        "Warmth and relationship-building",
        "Enthusiasm that mobilizes others",
        "Adaptability and curiosity",
      ],
      recommendedCareers: [
        "Marketing / Communications",
        "Entrepreneur / Creative Founder",
        "Journalist / Content Creator",
        "Counselor or Coach",
        "Designer",
      ],
      challengingCareers: [
        "Repetitive, detail-bound data work",
        "Rigid, rule-heavy bureaucracy",
        "Isolated roles with little human contact",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Following through to completion",
        "Building focus and prioritization",
        "Managing practical details",
      ],
      habitsToBuild: [
        "Limit active projects to protect focus",
        "Use simple systems to track follow-through",
        "Break big visions into next actions",
      ],
      habitsToAvoid: [
        "Overcommitting out of enthusiasm",
        "Abandoning projects when novelty fades",
        "Avoiding necessary routine tasks",
      ],
      emotionalGrowth:
        "ENFPs grow by building consistency and sitting with the unglamorous middle of a project — the stretch where real results are made.",
      communicationTips: [
        "Finish ideas with concrete commitments",
        "Stay present in less exciting conversations",
        "Balance optimism with realistic expectations",
      ],
      stressManagement:
        "Under stress ENFPs can scatter or feel overwhelmed by options. Grounding routines, finishing one task, and time with supportive people restore their spark.",
      roadmap: [
        "Commit to completing one meaningful project",
        "Adopt a lightweight focus and follow-through system",
        "Practice consistency with one daily habit",
        "Build in reflection to channel energy purposefully",
      ],
    },
    relationships: {
      friendshipStyle:
        "ENFPs make friends easily and keep a wide, warm circle. They are spontaneous, affirming, and quick to celebrate others.",
      romanticTendencies:
        "Passionate and devoted, ENFPs seek a deep, growth-oriented partnership full of connection and adventure. They grow by offering steadiness alongside passion.",
      familyDynamics:
        "They bring warmth, fun, and encouragement, nurturing each person's individuality. They thrive when balancing spontaneity with reliability.",
      communicationPreferences:
        "Open, expressive, and affirming. ENFPs value emotional honesty and dislike coldness or rigidity.",
      conflictResolution:
        "They prefer to talk things through warmly and seek understanding, growing by staying focused and consistent through hard conversations.",
      strengths: [
        "Warmth and enthusiasm",
        "Deep care for a partner's growth",
        "Keeping the relationship alive and exciting",
      ],
      growthOpportunities: [
        "Providing consistency",
        "Following through on commitments",
        "Staying grounded during conflict",
      ],
    },
  },

  // ===========================================================================
  // SENTINELS (SJ)
  // ===========================================================================
  ISTJ: {
    personality: {
      overview:
        "ISTJs are responsible, thorough, and dependable — the people who keep commitments and keep things running. They value accuracy, order, and proven methods, and they take quiet pride in doing things properly. Steady and trustworthy, they prefer clear expectations and follow through on what they say.",
      decisionMakingStyle:
        "Logical, factual, and methodical. ISTJs base decisions on concrete evidence and past experience, weighing options carefully before committing. Their growth edge is staying open to new approaches.",
    },
    career: {
      idealEnvironments: [
        "Clear structure and defined expectations",
        "Stable, well-organized institutions",
        "Roles rewarding accuracy and reliability",
        "Proven processes over constant change",
      ],
      leadershipStyle:
        "Dependable and methodical. ISTJs lead by example, setting clear standards and ensuring commitments are honored. They value consistency and accountability.",
      motivators: [
        "Doing work correctly and thoroughly",
        "Stability and order",
        "Meeting responsibilities",
        "Earning trust through reliability",
      ],
      careerStrengths: [
        "Accuracy and attention to detail",
        "Reliability and follow-through",
        "Organized, systematic execution",
        "Strong sense of duty",
      ],
      recommendedCareers: [
        "Accountant / Auditor",
        "Operations Manager",
        "Logistics or Supply-Chain Analyst",
        "Lawyer / Compliance Officer",
        "Database Administrator",
      ],
      challengingCareers: [
        "Highly ambiguous, ever-shifting startups",
        "Improvisation-heavy creative roles",
        "Chaotic, unstructured environments",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Embracing change and new methods",
        "Considering the emotional dimension",
        "Balancing rules with flexibility",
      ],
      habitsToBuild: [
        "Try one new approach before defaulting to the proven one",
        "Check in on how decisions affect people",
        "Ask whether a rule still serves its purpose",
      ],
      habitsToAvoid: [
        "Rigidly resisting change",
        "Overlooking feelings in pursuit of correctness",
        "Over-committing out of duty",
      ],
      emotionalGrowth:
        "ISTJs grow by recognizing that people's feelings are facts too, and by allowing flexibility where strict procedure isn't actually required.",
      communicationTips: [
        "Acknowledge emotions, not just logistics",
        "Explain the reasoning behind your standards",
        "Stay open when others propose new ideas",
      ],
      stressManagement:
        "Under stress ISTJs may become rigid or fixate on worst cases. Structured downtime, physical activity, and trusted conversation help restore perspective.",
      roadmap: [
        "Experiment with one new method this month",
        "Add a 'people impact' check to decisions",
        "Practice flexibility on low-stakes choices",
        "Schedule genuine rest, not just tasks",
      ],
    },
    relationships: {
      friendshipStyle:
        "ISTJs are loyal, steady friends who show care through dependability and practical support. They keep a smaller circle and honor their commitments to it.",
      romanticTendencies:
        "Devoted and reliable, ISTJs take commitment seriously and express love through consistency and acts of service. They grow by voicing affection more openly.",
      familyDynamics:
        "They provide stability, structure, and dependable support, often the family's reliable backbone. They thrive when their efforts are recognized.",
      communicationPreferences:
        "Clear, factual, and honest. ISTJs prefer straightforward communication and dislike vagueness or drama.",
      conflictResolution:
        "They address conflict calmly and practically, growing by attending to the emotional layer rather than only the facts.",
      strengths: [
        "Loyalty and dependability",
        "Practical, consistent support",
        "Honesty and commitment",
      ],
      growthOpportunities: [
        "Expressing affection openly",
        "Being flexible with a partner's needs",
        "Acknowledging emotions",
      ],
    },
  },

  ISFJ: {
    personality: {
      overview:
        "ISFJs are caring, conscientious, and steady — quietly devoted to the people and responsibilities in their charge. They combine warmth with practicality, remembering the small things that matter and showing up reliably. Modest and loyal, they find deep satisfaction in being genuinely helpful.",
      decisionMakingStyle:
        "Considerate and practical. ISFJs weigh how decisions affect people and lean on experience and proven approaches. Their growth edge is factoring in their own needs and staying open to change.",
    },
    career: {
      idealEnvironments: [
        "Supportive, people-centered settings",
        "Clear roles and stable structure",
        "Opportunities to help others directly",
        "Harmonious, appreciative culture",
      ],
      leadershipStyle:
        "Supportive and conscientious. ISFJs lead by serving, organizing details, and caring for their team's wellbeing. They model reliability and consideration.",
      motivators: [
        "Helping and caring for others",
        "Stability and security",
        "Being needed and appreciated",
        "Maintaining harmony",
      ],
      careerStrengths: [
        "Reliability and conscientiousness",
        "Attention to practical detail",
        "Genuine care for people",
        "Patience and loyalty",
      ],
      recommendedCareers: [
        "Nurse / Healthcare Provider",
        "Teacher / Support Educator",
        "Administrative or Office Manager",
        "Social Worker",
        "Customer Success Specialist",
      ],
      challengingCareers: [
        "Cutthroat, high-conflict roles",
        "Highly abstract, impersonal work",
        "Constant ambiguity with no structure",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Prioritizing their own needs",
        "Setting boundaries",
        "Embracing change and saying no",
      ],
      habitsToBuild: [
        "Schedule self-care as a real commitment",
        "Practice declining requests when stretched",
        "Try small changes to build flexibility",
      ],
      habitsToAvoid: [
        "Over-accommodating until depleted",
        "Avoiding conflict at any cost",
        "Clinging to routine when change is needed",
      ],
      emotionalGrowth:
        "ISFJs grow by valuing themselves as much as they value others, and by recognizing that healthy boundaries deepen rather than threaten their relationships.",
      communicationTips: [
        "State your needs directly",
        "Voice disagreement before resentment builds",
        "Accept help as readily as you give it",
      ],
      stressManagement:
        "Under stress ISFJs may overwork or dwell on negatives. Rest, gentle routines, and confiding in trusted people help them recover their warmth.",
      roadmap: [
        "Set one personal boundary this week",
        "Schedule regular self-care time",
        "Practice saying no kindly but firmly",
        "Try one small change to build adaptability",
      ],
    },
    relationships: {
      friendshipStyle:
        "ISFJs are devoted, attentive friends who remember the details and show up reliably. They invest deeply in a trusted few.",
      romanticTendencies:
        "Loyal and nurturing, ISFJs express love through care, attentiveness, and acts of service. They grow by voicing their own needs and accepting support.",
      familyDynamics:
        "They are the warm caretakers of the family, attentive to everyone's wellbeing. They thrive when their devotion is noticed and reciprocated.",
      communicationPreferences:
        "Warm, considerate, and practical. ISFJs prefer kindness and harmony and dislike harshness or conflict.",
      conflictResolution:
        "They seek to smooth things over and keep the peace, growing by addressing their own needs and concerns directly.",
      strengths: [
        "Devotion and attentiveness",
        "Practical, caring support",
        "Loyalty and patience",
      ],
      growthOpportunities: [
        "Expressing personal needs",
        "Setting boundaries",
        "Confronting issues directly",
      ],
    },
  },

  ESTJ: {
    personality: {
      overview:
        "ESTJs are organized, decisive, and grounded — natural administrators who bring order and accountability wherever they go. They respect structure, clear rules, and proven ways of doing things, and they get results by setting expectations and following through. Dependable and direct, they take responsibility seriously and expect the same from others.",
      decisionMakingStyle:
        "Practical, decisive, and logic-based. ESTJs assess the facts, apply sound standards, and commit quickly. Their growth edge is weighing emotional impact and staying flexible.",
    },
    career: {
      idealEnvironments: [
        "Clear structure and defined goals",
        "Roles with authority and accountability",
        "Results-oriented organizations",
        "Established processes and standards",
      ],
      leadershipStyle:
        "Decisive and organized. ESTJs lead by setting clear expectations, defining roles, and holding everyone accountable. They drive efficient, reliable execution.",
      motivators: [
        "Achieving concrete results",
        "Order and efficiency",
        "Responsibility and leadership",
        "Recognition for competence",
      ],
      careerStrengths: [
        "Organizing people and processes",
        "Decisiveness and accountability",
        "Practical, results-focused execution",
        "Consistency and dependability",
      ],
      recommendedCareers: [
        "Operations / General Manager",
        "Project Manager",
        "Financial Officer",
        "Military / Law Enforcement Officer",
        "Administrator",
      ],
      challengingCareers: [
        "Loosely structured creative roles",
        "Highly ambiguous research with no closure",
        "Positions requiring constant emotional nuance",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Considering feelings alongside facts",
        "Staying flexible with new approaches",
        "Tolerating ambiguity",
      ],
      habitsToBuild: [
        "Pause to read the emotional room",
        "Invite input before deciding",
        "Try a new method before defaulting to the standard",
      ],
      habitsToAvoid: [
        "Being inflexible about process",
        "Overlooking people's feelings",
        "Impatience with different working styles",
      ],
      emotionalGrowth:
        "ESTJs grow by treating empathy as a practical leadership tool and by recognizing that not every problem has a single correct procedure.",
      communicationTips: [
        "Acknowledge feelings before solutions",
        "Soften directness in sensitive moments",
        "Stay open to ideas that differ from yours",
      ],
      stressManagement:
        "Under stress ESTJs may become rigid or controlling. Delegating, exercising, and stepping back help them regain perspective.",
      roadmap: [
        "Add an empathy check to key decisions",
        "Practice flexibility on low-stakes choices",
        "Delegate and trust others' methods",
        "Schedule downtime to prevent burnout",
      ],
    },
    relationships: {
      friendshipStyle:
        "ESTJs are dependable, loyal friends who organize gatherings and show up reliably. They value tradition, honesty, and shared activities.",
      romanticTendencies:
        "Committed and steady, ESTJs take relationships seriously and show love through reliability and providing. They grow by expressing warmth and flexibility.",
      familyDynamics:
        "They are dependable providers and organizers who uphold family structure and traditions. They thrive when balancing standards with warmth.",
      communicationPreferences:
        "Direct, clear, and matter-of-fact. ESTJs value straight answers and dislike vagueness or evasion.",
      conflictResolution:
        "They confront issues directly and seek practical resolution, growing by validating emotions before fixing the problem.",
      strengths: [
        "Reliability and commitment",
        "Practical support and stability",
        "Honesty and dependability",
      ],
      growthOpportunities: [
        "Expressing warmth and affection",
        "Being flexible with loved ones",
        "Attending to emotional needs",
      ],
    },
  },

  ESFJ: {
    personality: {
      overview:
        "ESFJs are warm, sociable, and conscientious — devoted to taking care of people and keeping their communities running smoothly. They thrive on cooperation, remember what matters to those around them, and create welcoming, harmonious environments. Generous and dependable, they feel best when they're helping others feel included and supported.",
      decisionMakingStyle:
        "People-focused and practical. ESFJs weigh how choices affect others and lean on shared values and established norms. Their growth edge is balancing others' approval with their own judgment.",
    },
    career: {
      idealEnvironments: [
        "Collaborative, people-centered settings",
        "Clear expectations and supportive structure",
        "Direct opportunities to help others",
        "Appreciative, harmonious culture",
      ],
      leadershipStyle:
        "Caring and organized. ESFJs lead by supporting their team, coordinating details, and fostering a positive, cooperative atmosphere.",
      motivators: [
        "Helping and supporting others",
        "Belonging and harmony",
        "Appreciation and recognition",
        "Stability and order",
      ],
      careerStrengths: [
        "Building cooperation and morale",
        "Attentiveness to people's needs",
        "Organized, dependable execution",
        "Warmth and interpersonal skill",
      ],
      recommendedCareers: [
        "Healthcare / Nursing",
        "Teacher / School Administrator",
        "Human Resources Specialist",
        "Event or Office Manager",
        "Customer Relations Lead",
      ],
      challengingCareers: [
        "Isolated, impersonal technical roles",
        "Highly competitive, low-empathy environments",
        "Abstract work with no human contact",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Acting on their own judgment, not just approval",
        "Handling criticism gracefully",
        "Setting boundaries",
      ],
      habitsToBuild: [
        "Check decisions against your own values too",
        "Separate feedback from self-worth",
        "Practice saying no when overextended",
      ],
      habitsToAvoid: [
        "Over-pleasing at your own expense",
        "Avoiding necessary hard truths",
        "Taking criticism too personally",
      ],
      emotionalGrowth:
        "ESFJs grow by valuing their own opinions as much as others' approval and by recognizing they cannot make everyone happy.",
      communicationTips: [
        "Voice your own needs and views",
        "Don't avoid hard conversations to keep peace",
        "Receive feedback as information, not rejection",
      ],
      stressManagement:
        "Under stress ESFJs may over-give or become sensitive to criticism. Rest, boundaries, and reassurance from trusted people help them recover.",
      roadmap: [
        "Make one decision based on your own judgment",
        "Practice setting a boundary this week",
        "Reframe criticism as useful data",
        "Schedule time for your own needs",
      ],
    },
    relationships: {
      friendshipStyle:
        "ESFJs are generous, attentive friends who keep their circle connected and cared for. They remember birthdays, check in often, and create belonging.",
      romanticTendencies:
        "Devoted and affectionate, ESFJs invest fully in nurturing the relationship. They grow by ensuring their own needs are met too.",
      familyDynamics:
        "They are the warm hearts of their families, organizing traditions and caring for everyone. They thrive when appreciated and reciprocated.",
      communicationPreferences:
        "Friendly, supportive, and warm. ESFJs value emotional openness and dislike coldness or conflict.",
      conflictResolution:
        "They seek harmony and work to repair rifts, growing by addressing issues honestly rather than smoothing them over.",
      strengths: [
        "Warmth and devotion",
        "Attentiveness to a partner's needs",
        "Loyalty and dependability",
      ],
      growthOpportunities: [
        "Voicing personal needs",
        "Setting boundaries",
        "Not over-relying on approval",
      ],
    },
  },

  // ===========================================================================
  // EXPLORERS (SP)
  // ===========================================================================
  ISTP: {
    personality: {
      overview:
        "ISTPs are practical, observant problem-solvers who love to understand how things work by getting their hands on them. Calm and adaptable, they stay cool under pressure and prefer action to theory. Independent and resourceful, they thrive on concrete challenges they can tackle in their own efficient way.",
      decisionMakingStyle:
        "Pragmatic and analytical. ISTPs assess a situation in the moment, apply efficient logic, and act. Their growth edge is considering longer-term consequences and others' feelings.",
    },
    career: {
      idealEnvironments: [
        "Hands-on, practical problem-solving",
        "Autonomy and freedom from micromanagement",
        "Variety and real-world challenges",
        "Minimal bureaucracy and red tape",
      ],
      leadershipStyle:
        "Lead-by-doing. ISTPs guide through competence and calm troubleshooting rather than speeches, giving people room to solve problems their own way.",
      motivators: [
        "Solving concrete problems",
        "Independence and autonomy",
        "Mastering tools and skills",
        "Variety and hands-on action",
      ],
      careerStrengths: [
        "Hands-on troubleshooting",
        "Composure under pressure",
        "Efficient, practical logic",
        "Adaptability and resourcefulness",
      ],
      recommendedCareers: [
        "Engineer / Mechanic",
        "Pilot or Field Technician",
        "Software Developer",
        "Emergency Responder",
        "Forensic or Data Analyst",
      ],
      challengingCareers: [
        "Highly social, talk-heavy roles",
        "Rigid, procedure-bound desk jobs",
        "Long-range abstract planning with no action",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Thinking longer-term, not just in the moment",
        "Expressing thoughts and feelings",
        "Following through on commitments",
      ],
      habitsToBuild: [
        "Set longer-term goals and revisit them",
        "Share your reasoning with others",
        "Communicate before going quiet",
      ],
      habitsToAvoid: [
        "Avoiding planning and commitment",
        "Withdrawing emotionally",
        "Acting impulsively without weighing impact",
      ],
      emotionalGrowth:
        "ISTPs grow by putting feelings into words and recognizing that connection requires more than competence — it requires presence and openness.",
      communicationTips: [
        "Say what you're thinking instead of going silent",
        "Acknowledge others' feelings",
        "Explain decisions rather than just acting",
      ],
      stressManagement:
        "Under stress ISTPs may detach or act impulsively. Physical activity, hands-on projects, and brief check-ins with trusted people help them reset.",
      roadmap: [
        "Set one longer-term goal and track it",
        "Practice voicing thoughts and feelings",
        "Communicate plans before acting alone",
        "Balance independence with connection",
      ],
    },
    relationships: {
      friendshipStyle:
        "ISTPs are easygoing, low-maintenance friends who bond over shared activities and skills. They value independence and dislike clinginess.",
      romanticTendencies:
        "Loyal but independent, ISTPs show love through action and practical help more than words. They grow by opening up emotionally.",
      familyDynamics:
        "They contribute calm competence and hands-on help, doing best when family respects their need for space and autonomy.",
      communicationPreferences:
        "Direct, concise, and action-oriented. ISTPs prefer straight talk and dislike emotional pressure or drama.",
      conflictResolution:
        "They prefer to address problems practically or take space to cool off, growing by staying engaged rather than withdrawing.",
      strengths: [
        "Calm, steady presence",
        "Practical, reliable help",
        "Respect for a partner's independence",
      ],
      growthOpportunities: [
        "Expressing emotions",
        "Staying engaged during conflict",
        "Committing to long-term plans",
      ],
    },
  },

  ISFP: {
    personality: {
      overview:
        "ISFPs are gentle, aesthetic, and present-focused — quiet artists who experience the world vividly through their senses and values. Warm and unassuming, they express themselves through action and craft more than words. They cherish freedom, authenticity, and beauty, and they bring a calm, accepting presence to those around them.",
      decisionMakingStyle:
        "Values-based and experiential. ISFPs choose what feels authentic and aligns with their personal values, often in the moment. Their growth edge is longer-term planning and voicing their views.",
    },
    career: {
      idealEnvironments: [
        "Creative, hands-on work",
        "Autonomy and flexibility",
        "Low-pressure, supportive culture",
        "Alignment with personal values",
      ],
      leadershipStyle:
        "Quiet and example-setting. ISFPs lead through craft, authenticity, and a calm, accepting presence rather than command.",
      motivators: [
        "Creative self-expression",
        "Authenticity and freedom",
        "Helping in tangible ways",
        "Beauty and sensory experience",
      ],
      careerStrengths: [
        "Aesthetic and creative sensibility",
        "Adaptability and calm presence",
        "Hands-on, practical care",
        "Strong personal values",
      ],
      recommendedCareers: [
        "Designer / Artist",
        "Chef or Artisan",
        "Veterinary or Healthcare Tech",
        "Photographer",
        "Physical Therapist",
      ],
      challengingCareers: [
        "Rigid corporate hierarchies",
        "High-conflict, combative roles",
        "Abstract, impersonal analytical work",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Planning for the longer term",
        "Asserting opinions and needs",
        "Building resilience to criticism",
      ],
      habitsToBuild: [
        "Set small goals with gentle deadlines",
        "Practice voicing your perspective",
        "Separate feedback from self-worth",
      ],
      habitsToAvoid: [
        "Avoiding conflict entirely",
        "Procrastinating on long-term plans",
        "Internalizing criticism",
      ],
      emotionalGrowth:
        "ISFPs grow by trusting that their voice matters and by channeling deep feeling into steady action rather than withdrawal.",
      communicationTips: [
        "Share your views even when they differ",
        "Ask for what you need directly",
        "Address tension instead of avoiding it",
      ],
      stressManagement:
        "Under stress ISFPs may withdraw or become self-critical. Creative outlets, nature, and time with safe people help them recenter.",
      roadmap: [
        "Set one longer-term goal you care about",
        "Practice voicing an opinion this week",
        "Address a small conflict directly",
        "Build a regular creative practice",
      ],
    },
    relationships: {
      friendshipStyle:
        "ISFPs are warm, accepting friends who show care through actions and shared experiences. They value authenticity and give others space.",
      romanticTendencies:
        "Affectionate and devoted, ISFPs love deeply and quietly, showing it through thoughtful gestures. They grow by communicating needs openly.",
      familyDynamics:
        "They bring warmth, creativity, and a calming presence, doing best when family honors their need for freedom and authenticity.",
      communicationPreferences:
        "Gentle, sincere, and action-oriented. ISFPs prefer harmony and may need encouragement to express their needs.",
      conflictResolution:
        "They find conflict uncomfortable and seek peace, growing by addressing issues directly rather than withdrawing.",
      strengths: [
        "Warmth and authenticity",
        "Thoughtful, caring gestures",
        "Acceptance of a partner as they are",
      ],
      growthOpportunities: [
        "Voicing needs and opinions",
        "Facing conflict",
        "Planning together for the future",
      ],
    },
  },

  ESTP: {
    personality: {
      overview:
        "ESTPs are energetic, pragmatic, and bold — thriving in the here and now and acting fast when it counts. Perceptive and resourceful, they read situations quickly and excel where quick thinking and nerve are rewarded. They learn by doing, love a challenge, and bring a charismatic, can-do energy to everything they take on.",
      decisionMakingStyle:
        "Fast, practical, and adaptive. ESTPs assess the real-time situation and act decisively, trusting experience over deliberation. Their growth edge is weighing long-term consequences.",
    },
    career: {
      idealEnvironments: [
        "Fast-paced, dynamic settings",
        "Hands-on action and real results",
        "Autonomy and room to improvise",
        "Tangible rewards for performance",
      ],
      leadershipStyle:
        "Energetic and decisive. ESTPs lead from the front in the moment, rallying people to act and adapting quickly as conditions change.",
      motivators: [
        "Action and immediate results",
        "Challenge and competition",
        "Freedom and variety",
        "Tangible rewards",
      ],
      careerStrengths: [
        "Quick, decisive action",
        "Composure in high-pressure situations",
        "Practical, real-world problem solving",
        "Persuasion and energy",
      ],
      recommendedCareers: [
        "Sales Executive",
        "Entrepreneur",
        "Paramedic / First Responder",
        "Project or Site Manager",
        "Trader",
      ],
      challengingCareers: [
        "Slow, theory-heavy research",
        "Repetitive, detail-bound desk work",
        "Rigid bureaucracy with no autonomy",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Thinking through long-term consequences",
        "Building patience and follow-through",
        "Considering others' feelings",
      ],
      habitsToBuild: [
        "Pause to weigh consequences before acting",
        "Set longer-term goals and track them",
        "Check how decisions affect others",
      ],
      habitsToAvoid: [
        "Impulsive, high-risk decisions",
        "Boredom-driven jumping between things",
        "Overlooking emotional impact",
      ],
      emotionalGrowth:
        "ESTPs grow by slowing down enough to reflect, and by recognizing that patience and empathy expand the impact of their natural drive.",
      communicationTips: [
        "Consider the emotional read, not just the facts",
        "Think before delivering blunt feedback",
        "Follow quick action with follow-through",
      ],
      stressManagement:
        "Under stress ESTPs may act rashly or seek distraction. Physical activity, decisive problem-solving, and grounding routines help them refocus.",
      roadmap: [
        "Add a brief 'consequences' pause to big decisions",
        "Set and track one longer-term goal",
        "Practice empathetic feedback",
        "Build follow-through into your routine",
      ],
    },
    relationships: {
      friendshipStyle:
        "ESTPs are fun, spontaneous friends who bring energy and adventure. They make companions quickly and enjoy shared action and excitement.",
      romanticTendencies:
        "Charming and lively, ESTPs keep relationships exciting and grounded in the present. They grow by building emotional depth and consistency.",
      familyDynamics:
        "They bring energy, humor, and hands-on help, doing best when balancing spontaneity with reliability and presence.",
      communicationPreferences:
        "Direct, lively, and pragmatic. ESTPs value straight talk and dislike over-analysis or drama.",
      conflictResolution:
        "They tackle conflict head-on and want quick resolution, growing by slowing down to address feelings, not just facts.",
      strengths: [
        "Energy and spontaneity",
        "Practical, in-the-moment support",
        "Confidence and adaptability",
      ],
      growthOpportunities: [
        "Building emotional depth",
        "Providing consistency",
        "Thinking long-term together",
      ],
    },
  },

  ESFP: {
    personality: {
      overview:
        "ESFPs are spontaneous, warm, and full of life — natural performers who bring energy and fun wherever they go. They live fully in the present, connect easily with people, and have a gift for making experiences enjoyable. Generous and playful, they thrive on novelty, sensory richness, and genuine human connection.",
      decisionMakingStyle:
        "Practical and people-centered, in the moment. ESFPs follow what feels good and works now, guided by values and the people involved. Their growth edge is planning ahead and following through.",
    },
    career: {
      idealEnvironments: [
        "Lively, people-rich settings",
        "Variety and hands-on action",
        "Immediate feedback and recognition",
        "Flexible, positive culture",
      ],
      leadershipStyle:
        "Energetic and inclusive. ESFPs lead by inspiring enthusiasm, building rapport, and keeping morale high in the moment.",
      motivators: [
        "Connection and fun",
        "Variety and novelty",
        "Helping people enjoy life",
        "Recognition and appreciation",
      ],
      careerStrengths: [
        "Warmth and people skills",
        "Adaptability and spontaneity",
        "Practical, in-the-moment problem solving",
        "Energy that lifts a team",
      ],
      recommendedCareers: [
        "Event Planner",
        "Sales or Hospitality Lead",
        "Performer / Entertainer",
        "Nurse or Care Professional",
        "Tour or Brand Representative",
      ],
      challengingCareers: [
        "Isolated, solitary analytical roles",
        "Highly repetitive data work",
        "Rigid, rule-heavy bureaucracy",
      ],
    },
    growth: {
      developmentOpportunities: [
        "Planning for the future",
        "Following through on commitments",
        "Handling criticism and routine",
      ],
      habitsToBuild: [
        "Set simple goals and break them into steps",
        "Use light structure to follow through",
        "Separate feedback from self-worth",
      ],
      habitsToAvoid: [
        "Avoiding long-term planning",
        "Overcommitting in the moment",
        "Taking criticism too personally",
      ],
      emotionalGrowth:
        "ESFPs grow by building consistency and learning to sit with discomfort rather than seeking the next distraction.",
      communicationTips: [
        "Follow enthusiasm with concrete commitments",
        "Stay present in serious conversations",
        "Hear feedback as guidance, not rejection",
      ],
      stressManagement:
        "Under stress ESFPs may avoid problems or seek distraction. Movement, connection with supportive people, and small structured steps restore balance.",
      roadmap: [
        "Set one longer-term goal with steps",
        "Adopt a light system for follow-through",
        "Practice consistency with a daily habit",
        "Reframe criticism as useful input",
      ],
    },
    relationships: {
      friendshipStyle:
        "ESFPs are vivacious, generous friends who keep life fun and bring people together. They are spontaneous, affectionate, and quick to celebrate others.",
      romanticTendencies:
        "Warm and playful, ESFPs make relationships exciting and affectionate. They grow by adding consistency and planning for the future together.",
      familyDynamics:
        "They bring joy, warmth, and spontaneity, lifting the family's mood. They thrive when balancing fun with reliability.",
      communicationPreferences:
        "Open, expressive, and warm. ESFPs value affection and positivity and dislike coldness or heavy criticism.",
      conflictResolution:
        "They prefer to keep things light and may sidestep conflict, growing by facing issues directly and following through on resolutions.",
      strengths: [
        "Warmth and fun",
        "Generosity and affection",
        "Practical, present support",
      ],
      growthOpportunities: [
        "Providing consistency",
        "Facing conflict directly",
        "Planning for the future together",
      ],
    },
  },
};

/** Look up the rich report content for a type code. */
export function getReport(code: string): TypeReport | undefined {
  return REPORTS[code.toUpperCase()];
}
