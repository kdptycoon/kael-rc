import { motion } from 'framer-motion'
import {
  Person,
  Sparkle,
  ChevronRight,
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
  Loop,
  Compass,
  Pulse,
  Book,
} from '../components/Icons.jsx'

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

const THREADS = [
  { title: 'The inconsistency loop with R', meta: 'Last updated today', Icon: Loop },
  { title: 'Your fear of asking for clarity', meta: 'Last updated yesterday', Icon: Compass },
  { title: 'The anxious pursuit cycle', meta: 'Last updated 2 days ago', Icon: Pulse },
]

export default function HomeScreen({ onPrompt, onStart }) {
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
          How are you, <em>really?</em>
        </h1>
        <p>Bring whatever is on your mind. I’ll help you make sense of it.</p>
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
          <span className="eyebrow">Active threads</span>
          <span className="sec-link">View all</span>
        </div>
        <div className="thread-card block-gap">
          {THREADS.map(({ title, meta, Icon }) => (
            <button key={title} className="thread" onClick={() => onStart?.()}>
              <span className="tile t-ic">
                <Icon size={20} />
              </span>
              <span className="t-body">
                <span className="t-title">{title}</span>
                <span className="t-meta">{meta}</span>
              </span>
              <span className="t-go">
                <ChevronRight size={18} sw={1.7} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="block pad">
        <div className="sec-head">
          <span className="eyebrow">Recommended for you</span>
          <span className="sec-link">Why these?</span>
        </div>
        <button className="lesson block-gap" onClick={() => onStart?.()}>
          <span className="tile l-ic">
            <Book size={24} />
          </span>
          <span className="l-body">
            <span className="l-title">Why inconsistent warmth feels addictive</span>
            <span className="l-meta">
              <Clock size={13} sw={1.6} />
              3 min read
            </span>
          </span>
          <span className="l-go">
            <ArrowUpRight size={18} sw={1.7} />
          </span>
        </button>
      </section>
    </div>
  )
}
