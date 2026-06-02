import { motion } from 'framer-motion'
import { ChevronRight, ArrowUpRight, Sparkle, Anchor, HandHeart, Shield, Quote } from '../components/Icons.jsx'

// "Kael's read of you" — a visual summary where every section is a tappable card
// that opens a bottom sheet to go deeper and talk to Kael. Curated data stands in
// for real extraction; copy stays specific (receipts) so it never feels generic.

const READ = {
  essence: 'You reach for clarity when what you really need is to feel safe.',
  support:
    'The fight with A, the slow replies, the midnight rereads. Different scenes, the same moment repeating.',
  detail: {
    eyebrow: 'Kael’s read · updated today',
    title: 'You reach for clarity when you need to feel safe.',
    sections: [
      {
        label: 'What I keep seeing',
        text: 'The instant closeness feels uncertain, you reach for clarity to make the fear go away. The fight with A, the six-hour reply, the reread thread are all the same moment.',
      },
      {
        label: 'What’s underneath',
        text: 'The need isn’t another answer. It’s reassurance, and the trust that distance doesn’t mean you’re being left.',
      },
      {
        label: 'What’s shifting',
        text: 'You’re starting to tell the rush of intensity apart from the quiet of feeling safe.',
      },
    ],
    cta: { label: 'Talk to Kael about this', message: 'I reach for clarity when what I really need is to feel safe. Can we explore that?' },
  },
}

const LOVE = {
  detail: {
    eyebrow: 'How you love',
    title: 'Anxious-leaning, learning to feel safe.',
    sections: [
      { label: 'What it means', text: 'You move toward closeness and read distance as risk. A cooler tone or a slower reply registers as danger before the facts catch up.' },
      { label: 'Why it makes sense', text: 'Somewhere love felt conditional or unpredictable, so your system learned to stay alert for the next change in weather.' },
      { label: 'Where you’re headed', text: 'Toward earned security: trusting that a gap in contact isn’t the beginning of being left.' },
    ],
    cta: { label: 'Talk to Kael about this', message: 'I’m anxious in relationships and I read distance as rejection. Help me feel more secure.' },
  },
}

const PATTERNS = [
  {
    name: 'Reassurance loop',
    count: 8,
    short: 'You seek clarity fast when closeness feels uncertain.',
    detail: {
      eyebrow: 'A recurring pattern · seen 8 times',
      title: 'Reassurance loop',
      sections: [
        { label: 'How it shows up', text: 'You reread messages, track tone changes, and ask for clarity before your nervous system has settled. The relief lands, then the worry comes back.' },
        { label: 'The need underneath', text: 'To feel chosen without having to chase certainty.' },
        { label: 'What to practice', text: 'Ask once, then watch. Let consistency answer what words can’t.' },
      ],
      cta: { label: 'Work through this with Kael', message: 'I get stuck in a reassurance loop. I want to work through it.' },
    },
  },
  {
    name: 'Meaning-making spiral',
    count: 6,
    short: 'You turn small signals into big conclusions.',
    detail: {
      eyebrow: 'A recurring pattern · seen 6 times',
      title: 'Meaning-making spiral',
      sections: [
        { label: 'How it shows up', text: 'A pause or a flatter reply, and your mind writes the whole ending before any evidence arrives. The silence becomes a verdict.' },
        { label: 'What it costs you', text: 'You end up answering a story you authored, not the situation that actually happened.' },
        { label: 'What to practice', text: 'Name it: “I’m writing a story.” Let the silence stay undecided until there’s something real to answer.' },
      ],
      cta: { label: 'Work through this with Kael', message: 'I turn small signals into big conclusions and spiral. Help me catch it.' },
    },
  },
  {
    name: 'Defensive strike',
    count: 3,
    short: 'When hurt, you can turn sharp to regain control.',
    detail: {
      eyebrow: 'A recurring pattern · seen 3 times',
      title: 'Defensive strike',
      sections: [
        { label: 'How it shows up', text: 'When you feel dismissed, the softness flips to an edge. You get precise, a little cold, and aim to win the moment back.' },
        { label: 'The need underneath', text: 'To be taken seriously, and to not feel powerless.' },
        { label: 'What to practice', text: 'Name the hurt before the defense: “that landed harder than you might think.”' },
      ],
      cta: { label: 'Work through this with Kael', message: 'When I feel dismissed I get sharp to regain control. Can we work on it?' },
    },
  },
]
const MAX = 8

const TRIGGERS = ['Delayed replies', 'Mixed signals', 'Feeling dismissed', 'Not being chosen', 'Silence after conflict']
const TRIGGERS_DETAIL = {
  eyebrow: 'What activates you',
  title: 'The small gaps that set you off.',
  sections: [
    { label: 'What they are', text: 'Delayed replies, vague plans, mixed signals, the silence after a conflict, the sense of not being chosen.' },
    { label: 'Why they’re powerful', text: 'Each is minor on its own. The power is in the meaning your system assigns it in the half-second before you think.' },
    { label: 'What to practice', text: 'Name the trigger as a trigger. That sliver between the feeling and the reaction is where the change lives.' },
  ],
  cta: { label: 'Talk to Kael about this', message: 'I overthink and react fast to small things like slow replies. Help me catch it.' },
}

const BELIEFS = [
  {
    belief: 'My needs are too much.',
    truth: 'They were never too much. Being asked to shrink them was.',
    detail: {
      eyebrow: 'A belief you carry',
      title: '“My needs are too much.”',
      sections: [
        { label: 'Where it comes from', text: 'Somewhere, having a need was met with distance or disappointment, so you learned to make yourself low-maintenance to stay safe.' },
        { label: 'When it runs you', text: 'You go quiet about what you want, say you’re fine when you’re not, and feel like a burden the moment you ask for something.' },
        { label: 'The truth', text: 'Your needs were never the problem. Being asked to disappear was. The right people can hold them.' },
        { label: 'What to practice', text: 'Name one real preference out loud, and let their response be information.' },
      ],
      cta: { label: 'Challenge this with Kael', message: 'I believe my needs are too much, so I shrink them to keep people. Can we work on it?' },
    },
  },
  {
    belief: 'If someone pulls away, I did something wrong.',
    truth: 'Most distance is about their day, not your worth.',
    detail: {
      eyebrow: 'A belief you carry',
      title: '“If someone pulls away, I did something wrong.”',
      sections: [
        { label: 'Where it comes from', text: 'You learned to scan for what you might have done, because once, someone’s distance really was held against you.' },
        { label: 'When it runs you', text: 'A cooler tone sends you back through the tape, auditing yourself for the mistake that would explain it.' },
        { label: 'The truth', text: 'Most distance is weather, not a verdict. People get tired, busy, and avoidant for reasons that have nothing to do with your worth.' },
        { label: 'What to practice', text: 'Before you assign blame, ask: what do I actually know happened, versus what am I adding?' },
      ],
      cta: { label: 'Challenge this with Kael', message: 'When someone goes distant I assume I did something wrong. Help me challenge that.' },
    },
  },
  {
    belief: 'I have to earn love by being easy.',
    truth: 'Love that needs you to disappear is a performance, not love.',
    detail: {
      eyebrow: 'A belief you carry',
      title: '“I have to earn love by being easy.”',
      sections: [
        { label: 'Where it comes from', text: 'If love once arrived only when you were agreeable and undemanding, you learned that being easy was the price of being kept.' },
        { label: 'When it runs you', text: 'You over-give, swallow preferences, and perform “low-maintenance,” then quietly resent it.' },
        { label: 'The truth', text: 'Love that requires you to disappear is a performance, not love. The bond worth keeping can hold the real you.' },
        { label: 'What to practice', text: 'Let one true preference be known, and notice that the relationship survives it.' },
      ],
      cta: { label: 'Challenge this with Kael', message: 'I feel I have to earn love by being easy and never too much. Can we look at it?' },
    },
  },
  {
    belief: 'Distance means I’m being left.',
    truth: 'A gap in contact is not the start of goodbye.',
    detail: {
      eyebrow: 'A belief you carry',
      title: '“Distance means I’m being left.”',
      sections: [
        { label: 'Where it comes from', text: 'If closeness once vanished without warning, your body learned to treat any gap as the first sign of goodbye.' },
        { label: 'When it runs you', text: 'A slow reply tips you straight into bracing for the end, and you chase to close the gap before it can grow.' },
        { label: 'The truth', text: 'A pause is not an ending. Distance and abandonment are different things, even when they feel the same in your body.' },
        { label: 'What to practice', text: 'Let one silence stay open without deciding what it means. See what actually arrives.' },
      ],
      cta: { label: 'Challenge this with Kael', message: 'I read any distance as the start of being left. Help me challenge that belief.' },
    },
  },
]

const VALUES = [
  { label: 'Consistency', gloss: 'actions matching words', Icon: Anchor },
  { label: 'Closeness', gloss: 'depth, not surface', Icon: HandHeart },
  { label: 'Emotional safety', gloss: 'room to be real', Icon: Shield },
  { label: 'Honesty', gloss: 'no mixed signals', Icon: Quote },
]
const VALUES_DETAIL = {
  eyebrow: 'What you value',
  title: 'What you’re really drawn to.',
  sections: [
    { label: 'What this is', text: 'Not a list of traits, but the conditions that let you feel safe enough to love well: steadiness, closeness, room to be yourself, and the truth said plainly.' },
    { label: 'Why it matters', text: 'When you can name what you actually value, you stop mistaking intensity for fit. You start noticing whether someone meets you here, instead of hoping they will.' },
    { label: 'What to practice', text: 'Notice who already offers these quietly, without being asked. Let that count for more than chemistry.' },
  ],
  cta: { label: 'Talk to Kael about this', message: 'I want to value consistency and emotional safety over intensity. Help me hold to that.' },
}

const DYNAMICS = [
  {
    who: 'With A',
    summary: 'Warmth, then distance. You chase clarity when it turns inconsistent.',
    feel: 'Hopeful · Anxious · Hyper-alert',
    detail: {
      eyebrow: 'A dynamic · based only on what you’ve shared',
      title: 'With A',
      sections: [
        { label: 'What seems to happen', text: 'Warmth, then distance. When the connection turns inconsistent, you start trying to earn the clarity back.' },
        { label: 'What you tend to do', text: 'Reread the thread, look for signs of interest, and ask for clarity quickly.' },
        { label: 'What Kael isn’t assuming', text: 'This isn’t a read on A or their intentions. Only on how you’ve described feeling with them.' },
        { label: 'Your growth edge', text: 'Let consistency, not a single warm moment, tell you where this is going.' },
      ],
      cta: { label: 'Talk to Kael about this dynamic', message: 'With A, I chase clarity every time things run hot and cold. Help me see it.' },
    },
  },
  {
    who: 'With your ex',
    summary: 'Intensity, then the pull to repair. You confuse the pain with love.',
    feel: 'Guilty · Attached · Looping',
    detail: {
      eyebrow: 'A dynamic · based only on what you’ve shared',
      title: 'With your ex',
      sections: [
        { label: 'What seems to happen', text: 'Intensity and conflict, then the fantasy of repair. The ache gets read as proof it was a love worth returning to.' },
        { label: 'The truth underneath', text: 'Pain is not the same as compatibility. Missing someone is a feeling, not an instruction.' },
        { label: 'What Kael isn’t assuming', text: 'This isn’t a verdict on your ex, only the pattern you’ve described in yourself.' },
        { label: 'Your growth edge', text: 'Let the missing exist without obeying it.' },
      ],
      cta: { label: 'Talk to Kael about this dynamic', message: 'I can’t stop looping on my ex. I keep confusing the pain with love.' },
    },
  },
  {
    who: 'With family',
    summary: 'Expectation, then resentment. You say yes before checking with yourself.',
    feel: 'Responsible · Unseen · Defensive',
    detail: {
      eyebrow: 'A dynamic · based only on what you’ve shared',
      title: 'With family',
      sections: [
        { label: 'What seems to happen', text: 'Expectation arrives and you agree before you’ve checked with yourself. The resentment shows up later.' },
        { label: 'The need underneath', text: 'To be loved without having to earn it by over-giving.' },
        { label: 'What Kael isn’t assuming', text: 'This isn’t about who they are, only the pattern in how you respond.' },
        { label: 'Your growth edge', text: 'Set the boundary before resentment builds. “Let me think and come back to you” is a full answer.' },
      ],
      cta: { label: 'Talk to Kael about this dynamic', message: 'With my family I say yes first, then feel trapped and resentful.' },
    },
  },
]

const GROWTH = {
  edge: 'Choose consistency over chemistry. Ask once, then watch what they do. And offer yourself the steadiness you keep hoping to find in someone else.',
  message:
    'I’m trying to choose consistency over chemistry and offer myself steadiness. Can we keep working on it?',
}

export default function YouScreen({ onOpenSheet, onPrompt }) {
  const open = (detail) => () => onOpenSheet?.(detail)

  return (
    <div className="screen-scroll mirror-scroll">
      <header className="mirror-head">
        <div className="mirror-head-l">
          <h1>Kael’s read of you</h1>
          <span className="mirror-status">
            <span className="live-dot" />
            Updated today
          </span>
        </div>
        <div className="read-ring" role="img" aria-label="64% to your next read">
          <svg viewBox="0 0 44 44" className="rr-svg">
            <circle className="rr-track" cx="22" cy="22" r="19" />
            <circle className="rr-arc" cx="22" cy="22" r="19" />
          </svg>
          <span className="rr-pct">
            64<span className="rr-unit">%</span>
          </span>
        </div>
      </header>
      <p className="read-cadence">Your read rebuilds every 100 chats, so it always reflects who you are now. 36 conversations until your next one.</p>

      {/* Hero */}
      <section className="block pad">
        <motion.button
          className="mhero"
          onClick={open(READ.detail)}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <span className="mhero-eyebrow">The shape of it</span>
          <span className="mhero-headline">{READ.essence}</span>
          <span className="mhero-support">{READ.support}</span>
          <span className="mhero-go">
            Read the full picture
            <ChevronRight size={15} sw={1.7} />
          </span>
        </motion.button>
      </section>

      {/* How you love */}
      <section className="block pad">
        <motion.button
          className="mcard"
          onClick={open(LOVE.detail)}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <span className="mcard-head">
            <span className="mcard-title">How you love</span>
            <span className="mcard-go">
              <ChevronRight size={16} sw={1.6} />
            </span>
          </span>
          <div className="snap-track">
            <span className="snap-marker" />
          </div>
          <div className="snap-ends">
            <span>Anxious</span>
            <span>Secure</span>
            <span>Avoidant</span>
          </div>
          <span className="mcard-detail">
            Anxious-leaning: you move toward closeness and read distance as risk.
          </span>
        </motion.button>
      </section>

      {/* What you value */}
      <section className="block pad">
        <motion.button
          className="mcard"
          onClick={open(VALUES_DETAIL)}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <span className="mcard-head">
            <span className="mcard-title">What you value</span>
            <span className="mcard-go">
              <ChevronRight size={16} sw={1.6} />
            </span>
          </span>
          <div className="snap-values">
            {VALUES.map(({ label, gloss, Icon }) => (
              <span className="value-tile" key={label}>
                <span className="vt-ic">
                  <Icon size={16} sw={1.6} />
                </span>
                <span className="vt-text">
                  <span className="vt-label">{label}</span>
                  <span className="vt-gloss">{gloss}</span>
                </span>
              </span>
            ))}
          </div>
        </motion.button>
      </section>

      {/* Patterns */}
      <section className="block pad">
        <span className="msection">Patterns Kael sees most</span>
        <div className="mlist block-gap">
          {PATTERNS.map((p) => (
            <motion.button
              key={p.name}
              className="mcard"
              onClick={open(p.detail)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="mcard-head">
                <span className="mcard-title">{p.name}</span>
                <span className="mcard-count">{p.count}×</span>
              </span>
              <div className="snap-bar-track">
                <div className="snap-bar-fill" style={{ width: `${(p.count / MAX) * 100}%` }} />
              </div>
              <span className="mcard-detail">{p.short}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* What activates you */}
      <section className="block pad">
        <motion.button
          className="mcard"
          onClick={open(TRIGGERS_DETAIL)}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <span className="mcard-head">
            <span className="mcard-title">What activates you</span>
            <span className="mcard-go">
              <ChevronRight size={16} sw={1.6} />
            </span>
          </span>
          <div className="snap-chips">
            {TRIGGERS.map((t) => (
              <span className="snap-chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </motion.button>
      </section>

      {/* Beliefs you carry */}
      <section className="block pad">
        <span className="msection">Beliefs you carry</span>
        <div className="mlist block-gap">
          {BELIEFS.map((b) => (
            <motion.button
              key={b.belief}
              className="mcard"
              onClick={open(b.detail)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="belief-head">
                <span className="belief-quote">“{b.belief}”</span>
                <span className="mcard-go">
                  <ChevronRight size={16} sw={1.6} />
                </span>
              </span>
              <span className="belief-truth">
                <span className="bt-label">The truth</span>
                <span className="bt-text">{b.truth}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Who you become with them */}
      <section className="block pad">
        <span className="msection">Who you become with them</span>
        <div className="kread-callout block-gap">
          <span className="kread-callout-mark">
            <Sparkle size={15} sw={1.5} />
          </span>
          <p className="kread-callout-text">
            A note: Kael never reads the other person, only who you become around them.
          </p>
        </div>
        <div className="mlist block-gap">
          {DYNAMICS.map((d) => (
            <motion.button
              key={d.who}
              className="mcard"
              onClick={open(d.detail)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="mcard-head">
                <span className="mcard-title">{d.who}</span>
                <span className="mcard-go">
                  <ChevronRight size={16} sw={1.6} />
                </span>
              </span>
              <span className="mcard-detail">{d.summary}</span>
              <span className="mcard-feel">{d.feel}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Growth edge */}
      <section className="block pad">
        <div className="growth-edge">
          <span className="ge-eyebrow">Your growth edge</span>
          <p className="ge-text">{GROWTH.edge}</p>
          <motion.button
            className="ge-cta"
            onClick={() => onPrompt?.(GROWTH.message)}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          >
            Practice with Kael
            <ArrowUpRight size={16} sw={1.7} />
          </motion.button>
        </div>
      </section>
    </div>
  )
}
