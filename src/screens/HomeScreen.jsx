import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Send,
  Spiral,
  Bolt,
  Distance,
  TurnAway,
  Fork,
  LoopText,
  MoodAnxious,
  MoodHurt,
  MoodHopeful,
  MoodLonely,
  MoodCalm,
  MoodOverwhelmed,
  Quote,
  ArrowUpRight,
  Sparkle,
} from '../components/Icons.jsx'

const MOODS = [
  { id: 'anxious', label: 'Anxious', Icon: MoodAnxious },
  { id: 'hurt', label: 'Hurt', Icon: MoodHurt },
  { id: 'hopeful', label: 'Hopeful', Icon: MoodHopeful },
  { id: 'lonely', label: 'Lonely', Icon: MoodLonely },
  { id: 'calm', label: 'Calm', Icon: MoodCalm },
  { id: 'overwhelmed', label: 'Overwhelmed', Icon: MoodOverwhelmed },
]

// Relationship-specific entry points — short label shown, fuller message sent to Kael.
const WAYS = [
  { label: 'I’m spiraling', msg: 'I’m spiraling and I can’t stop.', Icon: Spiral },
  { label: 'We had a fight', msg: 'We had a fight and it’s still sitting with me.', Icon: Bolt },
  { label: 'They’re distant', msg: 'They’re pulling away and it scares me.', Icon: Distance },
  { label: 'I feel rejected', msg: 'I feel rejected, like I don’t matter to them.', Icon: TurnAway },
  { label: 'Mixed signals', msg: 'I’m getting mixed signals and I’m confused about us.', Icon: Fork },
  { label: 'Overthinking it', msg: 'I keep overthinking their last text.', Icon: LoopText },
]

// Proactive nudges — Kael noticing things between sessions. Tapping continues the thread in chat.
const FROM_KAEL = [
  {
    kind: 'prompt',
    text: 'You replayed the fight with A twice yesterday. What shifted the second time?',
    action: 'Reflect',
    msg: 'I keep replaying the fight with A. The second time felt different, and I want to look at why.',
  },
  {
    kind: 'prompt',
    text: 'When a reply goes quiet, where do you feel it in your body first?',
    action: 'Check in',
    msg: 'When someone goes quiet on me I spiral before I even understand why.',
  },
  {
    kind: 'quote',
    text: 'You keep apologising for taking up space in your own life. I’d like us to question that one together.',
    action: 'A moment from Kael',
    msg: 'I keep apologising for who I am and shrinking to fit.',
  },
]

function greeting() {
  return 'Good morning'
}

function today() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function HomeScreen({ onPrompt, onMood }) {
  const [draft, setDraft] = useState('')

  function submitDraft(e) {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return
    onPrompt?.(t)
    setDraft('')
  }

  return (
    <div className="screen-scroll home-scroll">
      <header className="home-top">
        <div className="home-greeting">
          <span className="hg-date">{today()}</span>
          <h1>
            {greeting()},
            <br />
            Maya
          </h1>
          <span className="hg-sub">Day 142 with Kael · 6-day streak</span>
        </div>
        <span className="hg-avatar" aria-hidden="true">
          M
        </span>
      </header>

      <section className="block pad">
        <div className="pickup">
          <span className="pickup-q">What’s alive right now?</span>
          <form className="pickup-field" onSubmit={submitDraft}>
            <input
              className="pickup-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Say it out loud, or just start typing…"
              aria-label="What’s alive right now"
            />
            <motion.button
              type="submit"
              className="pickup-send"
              disabled={!draft.trim()}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 500, damping: 26 }}
              aria-label="Send to Kael"
            >
              <Send size={18} sw={1.7} />
            </motion.button>
          </form>
        </div>
      </section>

      <section className="block pad">
        <span className="eyebrow">Bring a mood to Kael</span>
        <div className="mood-grid block-gap">
          {MOODS.map(({ id, label, Icon }) => (
            <motion.button
              key={id}
              className="mood-tile"
              onClick={() => onMood?.(id)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            >
              <span className="mt-ic">
                <Icon size={22} sw={1.5} />
              </span>
              <span className="mt-name">{label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="block pad">
        <span className="eyebrow">Bring a situation to Kael</span>
        <div className="ways block-gap">
          {WAYS.map(({ label, msg, Icon }) => (
            <motion.button
              key={label}
              className="way-pill"
              onClick={() => onPrompt?.(msg)}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 26 }}
            >
              <span className="way-ic">
                <Icon size={16} sw={1.6} />
              </span>
              {label}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="block">
        <span className="eyebrow pad">From Kael</span>
        <div className="fromkael block-gap">
          {FROM_KAEL.map((c) => (
            <motion.button
              key={c.text}
              className={`fk-card${c.kind === 'quote' ? ' fk-quote' : ''}`}
              onClick={() => onPrompt?.(c.msg)}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="fk-mark">
                {c.kind === 'quote' ? <Quote size={18} sw={1.5} /> : <Sparkle size={15} sw={1.5} />}
              </span>
              <span className="fk-text">{c.text}</span>
              <span className="fk-action">
                {c.action}
                <ArrowUpRight size={14} sw={1.7} />
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  )
}
