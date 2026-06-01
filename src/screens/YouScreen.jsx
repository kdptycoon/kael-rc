import { motion } from 'framer-motion'
import {
  Detective,
  Paragraph,
  NeutralFace,
  Shades,
  Sparkle,
  ArrowUpRight,
  ChevronRight,
} from '../components/Icons.jsx'

// The full "how Kael reads you" portrait lives in a bottom sheet — the screen
// only shows a short, decorated hook so the profile feels like a snapshot, not an essay.
const PORTRAIT = {
  eyebrow: 'How Kael sees you · Updated 2 days ago',
  title: 'You’re not too much — you’ve been asking the wrong people to prove you’re enough.',
  sections: [
    {
      label: 'How you’re wired',
      text: 'You feel things early and deeply, often before you have words for them. You read people closely — a shift in tone, a slower reply — and your mind moves fast to protect you, sometimes faster than the facts.',
    },
    {
      label: 'What you do with it',
      text: 'When you care, you pursue; when you’re unsure, you explain. Underneath the strategies is a steady, generous person who simply wants to know they matter and won’t be left.',
    },
    {
      label: 'Where you’re heading',
      text: 'The work now is to ask sooner — and to offer yourself the steadiness you keep hoping to find in someone else.',
    },
  ],
  cta: {
    label: 'Go deeper with Kael',
    message: 'I want to stop feeling like I’m too much or not enough for people.',
  },
}

// `data` is a coarse frequency-over-time series rendered as a tiny bar graph,
// so each loop reads as a living, recurring pattern rather than a static label.
const LOOPS = [
  {
    name: 'Chasing clarity',
    desc: 'When someone runs hot-and-cold, you pursue to close the gap.',
    count: 8,
    recent: 'last seen May 18',
    data: [2, 1, 3, 2, 4, 3, 5, 4],
    detail: {
      eyebrow: 'A loop · seen 8 times',
      title: 'Chasing clarity',
      sections: [
        {
          label: 'What it is',
          text: 'When warmth becomes unpredictable, you try to resolve the uncertainty by pursuing — texts, check-ins, over-functioning. The chase feels like closeness, but it’s really anxiety management.',
        },
        {
          label: 'When it shows up',
          text: 'Right after a hot-and-cold stretch: a delayed reply, a cooler tone, plans that go vague. The gap opens and you rush to close it.',
        },
        {
          label: 'What to try',
          text: 'Let one silence exist without a strategy. Ask a single clear question instead of ten small reassurance-seeking ones.',
        },
      ],
      cta: {
        label: 'Work on this with Kael',
        message: 'I keep chasing clarity when someone becomes inconsistent. Help me break the loop.',
      },
    },
  },
  {
    name: 'Over-explaining',
    desc: 'When you feel misread, you pile on words to fix it.',
    count: 5,
    recent: 'last seen May 16',
    data: [1, 2, 2, 1, 3, 2, 3, 2],
    detail: {
      eyebrow: 'A loop · seen 5 times',
      title: 'Over-explaining',
      sections: [
        {
          label: 'What it is',
          text: 'When you sense someone has the wrong read on you, you pile on words to fix it — paragraphs, justifications, proof. The volume rises as the fear of being misjudged grows.',
        },
        {
          label: 'When it shows up',
          text: 'After a small conflict or a flat reaction, when you can’t tell if they’re upset. The ambiguity feels unbearable, so you explain it away.',
        },
        {
          label: 'What to try',
          text: 'Say the one true sentence and stop. Let them sit with it. Your worth isn’t something you have to argue for.',
        },
      ],
      cta: {
        label: 'Work on this with Kael',
        message: 'I over-explain whenever I feel misunderstood. Can we work on it?',
      },
    },
  },
  {
    name: 'Filling the silence',
    desc: 'A gap in replies becomes a verdict before you’ve asked.',
    count: 6,
    recent: 'last seen May 20',
    data: [1, 2, 1, 3, 2, 3, 2, 4],
    detail: {
      eyebrow: 'A loop · seen 6 times',
      title: 'Filling the silence',
      sections: [
        {
          label: 'What it is',
          text: 'When a reply doesn’t come, you don’t wait — you decide what the quiet means, and it’s almost always the cruelest reading.',
        },
        {
          label: 'When it shows up',
          text: 'A left-on-read message, a “seen” with no answer, a day that goes quiet. The blank space fills with worst-case stories.',
        },
        {
          label: 'What to try',
          text: 'Let the silence stay undecided. Ask one real question instead of writing their answer for them.',
        },
      ],
      cta: {
        label: 'Work on this with Kael',
        message: 'I got left on read and I’ve already decided what it means.',
      },
    },
  },
]

const MOVES = [
  {
    name: 'The detective move',
    Icon: Detective,
    detail: {
      eyebrow: 'A move',
      title: 'The detective move',
      sections: [
        {
          label: 'What it is',
          text: 'Scanning for clues — last-seen times, story views, who liked what — to answer a question you’re afraid to ask out loud.',
        },
        {
          label: 'What it’s really asking',
          text: '“Do I still matter to you?” Investigation feels like control, but it usually feeds the very anxiety it’s trying to soothe.',
        },
        {
          label: 'What to try',
          text: 'Notice the urge to gather evidence, then ask the actual question instead. One honest sentence beats an hour of forensics.',
        },
      ],
      cta: {
        label: 'Talk to Kael about this',
        message: 'I go into detective mode and look for clues instead of just asking. Help me stop.',
      },
    },
  },
  {
    name: 'The paragraph move',
    Icon: Paragraph,
    detail: {
      eyebrow: 'A move',
      title: 'The paragraph move',
      sections: [
        {
          label: 'What it is',
          text: 'Composing the long, perfectly-worded message that explains everything you feel — then re-editing it ten times, or never sending it at all.',
        },
        {
          label: 'What it’s really asking',
          text: 'To be understood so completely there’s no room left to be rejected. The length is a hedge against being misread.',
        },
        {
          label: 'What to try',
          text: 'Send the two-sentence version. Honesty lands harder when it isn’t armored in qualifiers.',
        },
      ],
      cta: {
        label: 'Talk to Kael about this',
        message: 'I always write huge paragraphs when I’m hurt. Can we make it simpler?',
      },
    },
  },
  {
    name: 'The “I’m fine” move',
    Icon: NeutralFace,
    detail: {
      eyebrow: 'A move',
      title: 'The “I’m fine” move',
      sections: [
        {
          label: 'What it is',
          text: 'Saying you’re okay when you’re not — going low-maintenance and agreeable so you stay easy to be around.',
        },
        {
          label: 'What it’s really asking',
          text: '“Will you still stay if I have needs?” It protects the bond, but it slowly erases you from it.',
        },
        {
          label: 'What to try',
          text: 'Name one real preference out loud. Small honesty is how you find out if a relationship can hold the actual you.',
        },
      ],
      cta: {
        label: 'Talk to Kael about this',
        message: 'I always say I’m fine when I’m not. I want to stop abandoning myself.',
      },
    },
  },
  {
    name: 'The cool-girl move',
    Icon: Shades,
    detail: {
      eyebrow: 'A move',
      title: 'The cool-girl move',
      sections: [
        {
          label: 'What it is',
          text: 'Performing unbothered — matching their energy, pretending you want less than you do so you never look like the one who cares more.',
        },
        {
          label: 'What it’s really asking',
          text: '“If I need nothing, I can’t be too much.” But pretending not to care keeps you from the closeness you actually want.',
        },
        {
          label: 'What to try',
          text: 'Let yourself want what you want, plainly. Caring isn’t a weakness to hide — it’s the whole point.',
        },
      ],
      cta: {
        label: 'Talk to Kael about this',
        message: 'I keep playing it cool and pretending I want less than I do. Help me drop the act.',
      },
    },
  },
]

const TRIGGERS = ['Ambiguity', 'Slow replies', 'Feeling deprioritized']
const NEEDS = ['Clarity', 'Consistency', 'Repair', 'Emotional warmth']

// Tiny monochrome bar graph — the final bar is highlighted as "most recent".
function Bars({ data }) {
  const max = Math.max(...data)
  return (
    <span className="bars" aria-hidden="true">
      {data.map((v, i) => (
        <span
          key={i}
          className={`bar${i === data.length - 1 ? ' on' : ''}`}
          style={{ height: `${Math.round((v / max) * 100)}%` }}
        />
      ))}
    </span>
  )
}

export default function YouScreen({ onNavigate, onOpenSheet }) {
  return (
    <div className="screen-scroll you-scroll">
      <header className="you-head">
        <h1>Understand yourself.</h1>
        <p>A living read on how you love — it deepens as you and Kael talk.</p>
      </header>

      <section className="block pad">
        <button className="portrait-hero" onClick={() => onOpenSheet?.(PORTRAIT)}>
          <span className="ph-top">
            <span className="eyebrow">How Kael sees you</span>
            <span className="ph-updated">
              <span className="ph-dot" />
              Updated 2 days ago
            </span>
          </span>
          <span className="ph-quote">
            You feel things early and deeply — and your mind races to protect you long before
            the facts catch up.
          </span>
          <span className="ph-more">
            Read your full portrait
            <ArrowUpRight size={16} sw={1.7} />
          </span>
        </button>
      </section>

      <section className="block pad">
        <span className="eyebrow">Your loops</span>
        <div className="loops block-gap">
          {LOOPS.map(({ name, desc, count, recent, data, detail }) => (
            <motion.button
              key={name}
              className="loop"
              onClick={() => onOpenSheet?.(detail)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="loop-top">
                <span className="loop-name">{name}</span>
                <Bars data={data} />
              </span>
              <span className="loop-desc">{desc}</span>
              <span className="loop-foot">
                <span className="loop-count">
                  Seen {count} times · {recent}
                </span>
                <span className="lp-go">
                  <ChevronRight size={16} sw={1.6} />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="block pad">
        <span className="eyebrow">Your moves</span>
        <div className="move-grid block-gap">
          {MOVES.map(({ name, Icon, detail }) => (
            <motion.button
              key={name}
              className="move"
              onClick={() => onOpenSheet?.(detail)}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            >
              <span className="mv-ic">
                <Icon size={19} />
              </span>
              <span className="mv-name">{name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="block pad">
        <span className="eyebrow">Your triggers</span>
        <div className="pillrow block-gap">
          {TRIGGERS.map((t) => (
            <span key={t} className="pill pill-out">
              <span className="dot" />
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="block pad">
        <span className="eyebrow">Your needs</span>
        <div className="pillrow block-gap">
          {NEEDS.map((n) => (
            <span key={n} className="pill pill-fill">
              <span className="dot" />
              {n}
            </span>
          ))}
        </div>
      </section>

      <section className="block pad">
        <span className="eyebrow">Growth work</span>
        <motion.button
          className="growth block-gap"
          onClick={() => onNavigate?.('chat')}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        >
          <span className="g-mark">
            <Sparkle size={18} sw={1.5} />
          </span>
          <h3>Ask earlier. Don’t negotiate with inconsistency for too long.</h3>
          <p>You teach people how to treat you. Your timing matters.</p>
          <span className="g-go">
            Work on this
            <ArrowUpRight size={16} sw={1.7} />
          </span>
        </motion.button>
      </section>
    </div>
  )
}
