// Reading material surfaced on Home and opened full-screen in the reader.
// `dek` is the one-line teaser; `body` is an array of paragraphs (rendered serif).

export const LESSONS = [
  {
    id: 'inconsistent-warmth',
    title: 'Why inconsistent warmth feels addictive',
    topic: 'Attachment',
    tag: 'For the hot-and-cold',
    read: '9 min read',
    dek: 'The science of why “sometimes” hooks you harder than “always.”',
    body: [
      'When affection arrives on an unpredictable schedule, the brain doesn’t relax. It leans in. Reward that comes at random intervals is the most compelling pattern there is. It’s the same mechanism that keeps a hand on a slot machine.',
      'So when someone is warm, then distant, then warm again, you’re not weak for being pulled along. Your nervous system is doing exactly what it evolved to do: chase the resolution of uncertainty.',
      'The cruel part is that consistency starts to feel boring by comparison. Calm reads as “no spark.” But what you’re calling spark is often just anxiety wearing a more flattering name.',
      'Naming the mechanism is how you get a choice back. The next time the warmth returns after a gap, you can feel the pull and still ask: is this closeness, or is this relief?',
    ],
  },
  {
    id: 'protest-behavior',
    title: 'The protest behaviors no one warns you about',
    topic: 'Patterns',
    tag: 'For when you chase',
    read: '8 min read',
    dek: 'Double-texting, scorekeeping, going quiet to be noticed, and what they’re really asking for.',
    body: [
      'When connection feels threatened, most people don’t calmly state the need. They protest. They text again. They withdraw to provoke a reaction. They bring up an old grievance that isn’t really the point.',
      'Protest behavior is a bid for reassurance in disguise. Underneath “why didn’t you call” is almost always “I got scared I don’t matter to you.”',
      'The behaviors aren’t shameful, but they rarely work. They tend to invite the exact distance you feared. The other person feels managed, not met.',
      'The repair is to find the sentence under the strategy. Not the test, not the silence, but the true thing: “I missed you and it made me anxious.” It’s more vulnerable, and far more likely to bring someone closer.',
    ],
  },
  {
    id: 'ask-for-clarity',
    title: 'How to ask for clarity without bargaining',
    topic: 'Communication',
    tag: 'For when you need to know',
    read: '7 min read',
    dek: 'A way to ask the real question that doesn’t hand away your dignity.',
    body: [
      'Most requests for clarity are smuggled inside hints, tests, and over-explaining. We circle the question because asking it directly feels like risking the answer.',
      'But ambiguity is a cost you keep paying. Every day you don’t ask, you fund the not-knowing with your peace.',
      'A clean ask has three parts: name what you observe, name what you feel, name what you’d like to know. “We’ve been talking for two months. I really enjoy it, and I’d like to know what you’re looking for.”',
      'You’re not demanding a particular answer. You’re giving them the dignity of honesty and giving yourself the dignity of a real choice.',
    ],
  },
  {
    id: 'what-silence-means',
    title: 'What a silence actually means',
    topic: 'Overthinking',
    tag: 'For a silent phone',
    read: '6 min read',
    dek: 'Your mind will pick the cruelest interpretation. Here’s how to slow it down.',
    body: [
      'A delay in a reply is a blank space, and an anxious mind fills blank spaces with worst cases. The silence becomes a verdict before any evidence arrives.',
      'But silence is rarely a message. People get busy, tired, avoidant, distracted. Most of the time the quiet is about their day, not your worth.',
      'Try this: when you notice yourself assigning meaning, label it. “I’m writing a story.” You don’t have to believe it or fight it, just see that it’s a draft, not a fact.',
      'You can hold the question open until there’s something real to respond to. Not deciding is a skill, and it protects you from reacting to a fiction.',
    ],
  },
  {
    id: 'self-abandonment',
    title: 'The quiet cost of abandoning yourself to be chosen',
    topic: 'Self-worth',
    tag: 'For when you shrink',
    read: '11 min read',
    dek: 'Shrinking to keep someone is a debt that always comes due.',
    body: [
      'It often starts small. You don’t mention the thing that bothered you. You say you’re fine. You make yourself easy to be around, agreeable, low-maintenance.',
      'Each small self-edit feels like generosity. But repeated enough, it becomes self-abandonment, and resentment grows quietly underneath the niceness.',
      'The relationship that survives only because you disappeared isn’t actually choosing you. It’s choosing the version of you that asked for nothing.',
      'Coming back to yourself is uncomfortable, because it means risking the relationship to be honest in it. But the only connection worth keeping is one that can hold the real you.',
      'Start with one true preference, said out loud. Watch what happens. Their response is information you’ve been avoiding collecting.',
    ],
  },
  {
    id: 'calm-the-body',
    title: 'Calming the body before the conversation',
    topic: 'Regulation',
    tag: 'Before a hard talk',
    read: '6 min read',
    dek: 'You can’t think clearly while your nervous system is bracing for impact.',
    body: [
      'Hard conversations fail less often because of the words and more often because of the state we’re in when we say them. A flooded body can’t hear reassurance or offer it.',
      'Before you raise the thing, settle the body first. A long exhale, longer than the inhale, tells your nervous system the threat has passed. A few minutes of it changes what you’re capable of saying.',
      'Notice the urge to resolve everything immediately. Urgency is the anxiety talking, and it rarely produces your clearest self.',
      'Approach from regulation, not from panic. The same sentence lands completely differently depending on whether your hands are shaking when you say it.',
    ],
  },
]

export function getLesson(id) {
  return LESSONS.find((l) => l.id === id) || null
}
