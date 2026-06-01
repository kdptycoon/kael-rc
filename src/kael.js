// Kael's voice: calm, precise, never performative. 1–3 short sentences.
// A tiny keyword matcher — enough to make the conversation feel responsive.

const RULES = [
  {
    test: /spiral|panic|anxious|overwhelm|can'?t stop|racing|obsess/i,
    reply:
      'Let’s slow it down. What part hurts most right now — the distance, the ambiguity, or what it seems to mean about you?',
  },
  {
    test: /fight|argued?|argument|yell|blew up|snapped/i,
    reply:
      'Fights usually aren’t about the thing you fought over. What did it feel like you were really asking for in that moment?',
  },
  {
    test: /distan|space|pulling away|cold|withdraw|drifting/i,
    reply:
      'Distance is loud when you care. Before we read it as rejection — what did they actually say, and what is your mind adding to it?',
  },
  {
    test: /reply|respond|text back|what.*say|should i send|how do i answer/i,
    reply:
      'Let’s find words that are honest without bargaining. What do you want them to understand — and what are you afraid they’ll think?',
  },
  {
    test: /reject|unwanted|not enough|deprioriti|abandon|left out/i,
    reply:
      'That fear is old, and it’s heavy. Let’s separate the moment that triggered it from the story it’s confirming for you.',
  },
  {
    test: /confus|where.*going|unclear|mixed signal|don'?t know what.*are|undefined/i,
    reply:
      'Confusion is information. Where are you waiting for them to define something you could ask for directly?',
  },
  {
    test: /ignor|left on read|seen|no reply|hasn'?t answered|ghost/i,
    reply:
      'A silence can mean many things, and your mind will pick the cruelest one. What would change if you didn’t decide its meaning yet?',
  },
  {
    test: /clarity|ask for|need to know|certainty|reassur/i,
    reply:
      'Asking for clarity isn’t needy — it’s honest. What’s the smallest true thing you could say to open that door?',
  },
  {
    test: /overthink|reading too much|analy|every detail|what did.*mean/i,
    reply:
      'Overthinking is your mind trying to keep you safe. Let’s name the fear underneath it instead of the fortieth interpretation.',
  },
  {
    test: /thank|that help|makes sense|feel better|good point/i,
    reply: 'I’m glad. Sit with it for a moment — you don’t have to solve everything tonight.',
  },
]

const FALLBACK = [
  'Tell me more about that. What happened just before you started feeling this way?',
  'I’m here. Say it the way it actually feels — we can make sense of it together.',
  'Let’s start where it’s heaviest. What’s the part you keep coming back to?',
]

let fbIndex = 0

export function kaelReply(text = '') {
  const hit = RULES.find((r) => r.test.test(text))
  if (hit) return hit.reply
  const line = FALLBACK[fbIndex % FALLBACK.length]
  fbIndex += 1
  return line
}

// The three action chips on the chat screen. Each returns a scripted exchange.
const CHIP_EXCHANGES = {
  decode: {
    user: 'Decode this for me.',
    kael:
      'Here’s what I notice: a small, recent event is landing on an old fear of being deprioritized. The event is ordinary. The ache is historic. They’re not the same size.',
  },
  reply: {
    user: 'Help me reply.',
    kael:
      'Try something honest and low-pressure: “I want to give you space — I’d just love to know we’re okay. No rush.” It asks for clarity without making them wrong.',
  },
  pattern: {
    user: 'Find the pattern.',
    kael:
      'This is your inconsistency loop: warmth, then a gap, then you chase to close it. The chase feels like love, but it’s really you managing fear. We can interrupt it earlier.',
  },
}

export function chipExchange(type) {
  return CHIP_EXCHANGES[type] || CHIP_EXCHANGES.decode
}
