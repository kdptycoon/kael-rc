import { motion } from 'framer-motion'
import {
  Person,
  Sparkle,
  ArrowUpRight,
  Clock,
  Spiral,
  Bolt,
  Distance,
  Reply,
  Fork,
  LoopText,
  TurnAway,
  Ellipsis,
  MoodAnxious,
  MoodHurt,
  MoodHopeful,
  MoodNumb,
  MoodCalm,
  MoodOverwhelmed,
} from '../components/Icons.jsx'
import { LESSONS } from '../lessons.js'

const MOODS = [
  { id: 'anxious', label: 'Anxious', Icon: MoodAnxious },
  { id: 'hurt', label: 'Hurt', Icon: MoodHurt },
  { id: 'hopeful', label: 'Hopeful', Icon: MoodHopeful },
  { id: 'numb', label: 'Numb', Icon: MoodNumb },
  { id: 'calm', label: 'Calm', Icon: MoodCalm },
  { id: 'overwhelmed', label: 'Overwhelmed', Icon: MoodOverwhelmed },
]

const PROMPTS = [
  { label: 'I’m spiraling', Icon: Spiral },
  { label: 'We had a fight', Icon: Bolt },
  { label: 'I feel distant from them', Icon: Distance },
  { label: 'I need to reply', Icon: Reply },
  { label: 'I’m confused about where this is going', Icon: Fork },
  { label: 'I keep overthinking their text', Icon: LoopText },
  { label: 'I feel rejected', Icon: TurnAway },
  { label: 'Something else', Icon: Ellipsis },
]

// Worded as first-person messages so a tap sends them straight into chat.
const THREADS = [
  'I keep chasing clarity every time R pulls back.',
  'I can’t stop overthinking his last text.',
  'I feel deprioritized, like I don’t really matter to them.',
]

export default function HomeScreen({ onPrompt, onStart, onMood, onOpenLesson }) {
  return (
    <div className="screen-scroll home-scroll">
      <header className="app-head">
        <div>
          <div className="id-name">Kael</div>
          <div className="id-sub">Your relationship intelligence</div>
        </div>
        <button className="avatar" aria-label="Profile">
          <Person size={20} sw={1.6} />
        </button>
      </header>

      <section className="hero">
        <h1>
          What are you <em>carrying</em> today?
        </h1>
        <p>Bring whatever’s weighing on you. We’ll make sense of it together.</p>
      </section>

      <section className="block pad">
        <div className="sec-head">
          <span className="eyebrow">Bring a mood to Kael</span>
        </div>
        <div className="mood-row block-gap">
          {MOODS.map(({ id, label, Icon }) => (
            <motion.button
              key={id}
              className="mood-chip"
              onClick={() => onMood?.(id)}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            >
              <span className="mc-ic">
                <Icon size={17} sw={1.6} />
              </span>
              {label}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="block pad">
        <div className="sec-head">
          <span className="eyebrow">What’s happening?</span>
        </div>
        <div className="prompt-grid block-gap">
          {PROMPTS.map(({ label, Icon }) => (
            <motion.button
              key={label}
              className="prompt"
              onClick={() => onPrompt?.(label)}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            >
              <span className="p-ic">
                <Icon size={22} />
              </span>
              <span className="p-label">{label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="block pad">
        <motion.button
          className="cta"
          onClick={() => onStart?.()}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        >
          <Sparkle size={19} sw={1.5} />
          Start a chat with Kael
        </motion.button>
      </section>

      <section className="block pad">
        <div className="sec-head">
          <span className="eyebrow">Pick up where you left off</span>
          <span className="sec-link">View all</span>
        </div>
        <div className="thread-pills block-gap">
          {THREADS.map((text) => (
            <motion.button
              key={text}
              className="thread-pill"
              onClick={() => onPrompt?.(text)}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            >
              {text}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="block pad">
        <div className="sec-head">
          <span className="eyebrow">Recommended reading</span>
          <span className="sec-link">Why these?</span>
        </div>
        <div className="lesson-list block-gap">
          {LESSONS.map((l, i) => (
            <motion.button
              key={l.id}
              className="lesson-row"
              onClick={() => onOpenLesson?.(l.id)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="lr-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="lr-body">
                <span className="lr-title">{l.title}</span>
                <span className="lr-meta">
                  <Clock size={12} sw={1.6} />
                  {l.read}
                </span>
              </span>
              <span className="lr-go">
                <ArrowUpRight size={16} sw={1.7} />
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  )
}
