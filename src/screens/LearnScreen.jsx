import { motion } from 'framer-motion'
import { Sparkle, Bookmark } from '../components/Icons.jsx'
import { LESSONS } from '../lessons.js'

// Every read is chosen for where the user is — so the whole screen is one
// personalized stack: a spark-tagged personal framing, a title, a description.
export default function LearnScreen({ onOpenLesson }) {
  return (
    <div className="screen-scroll learn-scroll">
      <header className="learn-head">
        <span className="eyebrow">Reading room</span>
        <h1>Learn</h1>
        <p>In-depth reads, chosen for where you are right now.</p>
      </header>

      <section className="block pad">
        <div className="lessons-stack">
          {LESSONS.map((l) => (
            <motion.button
              key={l.id}
              className="lcard"
              onClick={() => onOpenLesson?.(l.id)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="lc-tag">
                <Sparkle size={13} sw={1.6} />
                {l.tag}
              </span>
              <span className="lc-title">{l.title}</span>
              <span className="lc-desc">{l.dek}</span>
              <span className="lc-foot">
                <span className="lc-meta">{l.read}</span>
                <span className="lc-save" aria-hidden="true">
                  <Bookmark size={16} sw={1.6} />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  )
}
