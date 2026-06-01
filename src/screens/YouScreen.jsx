import { motion } from 'framer-motion'
import {
  Loop,
  Chat,
  Search,
  Paragraph,
  NeutralFace,
  Shades,
  Sparkle,
  ArrowUpRight,
} from '../components/Icons.jsx'

const LOOPS = [
  { text: 'Chasing clarity when someone becomes inconsistent', Icon: Loop },
  { text: 'Over-explaining when you feel misunderstood', Icon: Chat },
]

const MOVES = [
  { name: 'The detective move', Icon: Search },
  { name: 'The paragraph move', Icon: Paragraph },
  { name: 'The “I’m fine” move', Icon: NeutralFace },
  { name: 'The cool-girl move', Icon: Shades },
]

const TRIGGERS = ['Ambiguity', 'Slow replies', 'Feeling deprioritized']
const NEEDS = ['Clarity', 'Consistency', 'Repair', 'Emotional warmth']

export default function YouScreen({ onNavigate }) {
  return (
    <div className="screen-scroll you-scroll">
      <header className="you-head">
        <h1>Understand yourself.</h1>
        <p>Your patterns, moves, and growth.</p>
      </header>

      <section className="block pad">
        <span className="eyebrow">Your loops</span>
        <div className="loops block-gap">
          {LOOPS.map(({ text, Icon }) => (
            <div key={text} className="loop">
              <span className="tile lp-ic">
                <Icon size={20} />
              </span>
              <span className="lp-text">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="block pad">
        <span className="eyebrow">Your moves</span>
        <div className="move-grid block-gap">
          {MOVES.map(({ name, Icon }) => (
            <div key={name} className="move">
              <span className="mv-ic">
                <Icon size={19} />
              </span>
              <span className="mv-name">{name}</span>
            </div>
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
