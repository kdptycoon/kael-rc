import { motion } from 'framer-motion'
import { Back, Clock, Bookmark, ArrowUpRight } from '../components/Icons.jsx'

export default function LessonScreen({ lesson, onBack, onDiscuss }) {
  if (!lesson) return null
  return (
    <div className="reader">
      <header className="reader-head">
        <button className="reader-back" onClick={() => onBack?.()} aria-label="Back">
          <Back size={20} sw={1.7} />
        </button>
        <span className="reader-kicker">Reading</span>
        <button className="reader-save" aria-label="Save">
          <Bookmark size={19} sw={1.6} />
        </button>
      </header>

      <div className="reader-scroll">
        <div className="reader-meta">
          <Clock size={13} sw={1.6} />
          {lesson.read}
        </div>
        <h1 className="reader-title">{lesson.title}</h1>
        <p className="reader-dek">{lesson.dek}</p>

        <div className="reader-rule" />

        <article className="reader-body">
          {lesson.body.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.04 * i, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {para}
            </motion.p>
          ))}
        </article>

        <button className="reader-cta" onClick={() => onDiscuss?.(lesson)}>
          <span>
            Talk this through with Kael
            <em>Bring what this stirred up into a conversation.</em>
          </span>
          <ArrowUpRight size={18} sw={1.7} />
        </button>
      </div>
    </div>
  )
}
