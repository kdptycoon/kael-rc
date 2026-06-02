// Kael's voice: calm, precise, never performative. 1–3 short sentences.
// A tiny keyword matcher, enough to make the conversation feel responsive.

const RULES = [
  {
    test: /spiral|panic|anxious|overwhelm|can'?t stop|racing|obsess/i,
    reply:
      'Let’s slow it down. What part hurts most right now: the distance, the ambiguity, or what it seems to mean about you?',
  },
  {
    test: /fight|argued?|argument|yell|blew up|snapped/i,
    reply:
      'Fights usually aren’t about the thing you fought over. What did it feel like you were really asking for in that moment?',
  },
  {
    test: /distan|space|pulling away|cold|withdraw|drifting/i,
    reply:
      'Distance is loud when you care. Before we read it as rejection, what did they actually say, and what is your mind adding to it?',
  },
  {
    test: /reply|respond|text back|what.*say|should i send|how do i answer/i,
    reply:
      'Let’s find words that are honest without bargaining. What do you want them to understand, and what are you afraid they’ll think?',
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
      'Asking for clarity isn’t needy. It’s honest. What’s the smallest true thing you could say to open that door?',
  },
  {
    test: /overthink|reading too much|analy|every detail|what did.*mean/i,
    reply:
      'Overthinking is your mind trying to keep you safe. Let’s name the fear underneath it instead of the fortieth interpretation.',
  },
  {
    test: /over-?explain|misunderst|justify|defend myself/i,
    reply:
      'When you feel misunderstood, more words rarely fix it. What’s the one sentence underneath all the explaining that you actually need them to hear?',
  },
  {
    test: /detective|clue|checking their|last seen|stalk|investigat/i,
    reply:
      'Gathering evidence is how anxiety pretends to be in control. What’s the question you’re investigating instead of simply asking?',
  },
  {
    test: /paragraph|long (text|message)|essay|wall of text|huge (text|message)/i,
    reply:
      'A shorter, braver message usually travels further than a perfect one. What are you most afraid they’ll miss if you keep it simple?',
  },
  {
    test: /cool|pretend|act like|unbothered|play it|want less/i,
    reply:
      'Performing “fine with less” protects you and starves you at the same time. What would you ask for if you let yourself want it openly?',
  },
  {
    test: /numb|don'?t feel|feel nothing|empty|detached|shut down/i,
    reply:
      'Numbness is protection, not absence. Something decided feeling was unsafe for a while. What happened right before it went quiet?',
  },
  {
    test: /hope|hopeful|optimis|excited|good about|better lately/i,
    reply:
      'Hold onto that without gripping it. What’s the small sign that’s telling you this might be okay?',
  },
  {
    test: /chemistry|emotional safety|feels? safe|exciting|spark|intensity|drawn to/i,
    reply:
      'Chemistry is loud; safety is quiet, and you were taught to trust the loud one. What does calm actually feel like in your body when someone is steady with you?',
  },
  {
    test: /can'?t name|feel off|feeling off|something'?s off|no words for|can'?t put.*words/i,
    reply:
      'Not being able to name it is still information. When did the “off” feeling start, and what was happening right before it crept in?',
  },
  {
    test: /a choice|choices|decision|can'?t decide|avoid(ing)?|putting off|torn between/i,
    reply:
      'Avoidance usually means both options cost something. What are you afraid you’ll lose if you choose, and what are you already losing by not?',
  },
  {
    test: /too much|taking up space|apolog(y|ies|ise|ize|ising|izing)?|keep saying sorry|shrink/i,
    reply:
      'Notice who first taught you your needs were too much. Taking up space was never the problem. Being asked to disappear was.',
  },
  {
    test: /defensive|defensiveness|lash out|get sharp|turn sharp|snap at|feel dismissed/i,
    reply:
      'Sharpness is armor. When you feel dismissed, the jab is trying to protect something softer underneath. What were you most afraid they didn’t see in you?',
  },
  {
    test: /say yes (first|before)|can'?t say no|feel trapped|resentf|people-?please|obligat/i,
    reply:
      'Saying yes before you check with yourself keeps the peace and quietly builds the resentment. What would you have said if you trusted they could handle your no?',
  },
  {
    test: /thank|that help|makes sense|feel better|good point/i,
    reply: 'I’m glad. Sit with it for a moment. You don’t have to solve everything tonight.',
  },
]

const FALLBACK = [
  'Tell me more about that. What happened just before you started feeling this way?',
  'I’m here. Say it the way it actually feels. We can make sense of it together.',
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
      'Try something honest and low-pressure: “I want to give you space. I’d just love to know we’re okay. No rush.” It asks for clarity without making them wrong.',
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

// Moods you can bring to Kael from Home. Each opens chat with a felt acknowledgement.
const MOOD_EXCHANGES = {
  anxious: {
    user: 'I’m feeling really anxious right now.',
    kael:
      'I’m here. Anxiety usually means something matters and feels uncertain at the same time. What’s the thought your mind keeps circling back to?',
  },
  hurt: {
    user: 'I’m feeling hurt.',
    kael:
      'That’s worth taking seriously. Tell me what happened, and what it made you believe about where you stand with them.',
  },
  hopeful: {
    user: 'I’m feeling hopeful, actually.',
    kael:
      'Good. Hope is information too. What shifted, and what would you like to protect about this feeling?',
  },
  numb: {
    user: 'I feel kind of numb.',
    kael:
      'Numb is often a lot of feeling with the volume turned down. We don’t have to force it. When did you last feel something clearly?',
  },
  calm: {
    user: 'I feel calm right now.',
    kael:
      'Then this is a good moment to think clearly. What have you been avoiding looking at when the feelings were louder?',
  },
  overwhelmed: {
    user: 'I’m overwhelmed.',
    kael:
      'Let’s make it smaller. Name the one thing pressing on you most right now. We’ll start there, not everywhere.',
  },
}

export function moodExchange(id) {
  return MOOD_EXCHANGES[id] || MOOD_EXCHANGES.anxious
}
