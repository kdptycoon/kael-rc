import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Search } from '../components/Icons.jsx'
import { LESSONS } from '../lessons.js'

function LessonRow({ lesson, saved, onToggleSave, onOpen }) {
  return (
    <div className="litem">
      <motion.button
        className="li-open"
        onClick={() => onOpen?.(lesson.id)}
        whileTap={{ scale: 0.995 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <span className="li-kicker">{lesson.tag}</span>
        <span className="li-title">{lesson.title}</span>
        <span className="li-dek">{lesson.dek}</span>
        <span className="li-meta">{lesson.read}</span>
      </motion.button>
      <motion.button
        className="li-save"
        data-saved={saved}
        onClick={() => onToggleSave?.(lesson.id)}
        whileTap={{ scale: 0.84 }}
        transition={{ type: 'spring', stiffness: 500, damping: 26 }}
        aria-label={saved ? 'Remove from saved' : 'Save for later'}
      >
        <Bookmark size={16} weight={saved ? 'fill' : 'regular'} />
      </motion.button>
    </div>
  )
}

export default function LearnScreen({ onOpenLesson }) {
  const [query, setQuery] = useState('')
  const [view, setView] = useState('for-you')
  const [saved, setSaved] = useState(() => new Set())

  const toggleSave = (id) =>
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const q = query.trim().toLowerCase()
  let list = view === 'saved' ? LESSONS.filter((l) => saved.has(l.id)) : LESSONS
  if (q) {
    list = list.filter((l) =>
      `${l.title} ${l.topic} ${l.tag} ${l.dek} ${l.quote}`.toLowerCase().includes(q),
    )
  }

  const empty =
    list.length > 0
      ? null
      : view === 'saved' && saved.size === 0
        ? 'Nothing saved yet. Tap the ribbon on any read to keep it here.'
        : 'No readings match that. Try another word.'

  return (
    <div className="screen-scroll learn-scroll">
      <header className="learn-head">
        <h1>The Reading Room</h1>
        <p>In-depth reads, chosen for where you are right now.</p>
      </header>

      <div className="learn-bar">
        <div className="learn-search">
          <Search size={17} sw={1.7} />
          <input
            className="learn-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search readings…"
            aria-label="Search readings"
          />
        </div>
        <motion.button
          className="learn-filter"
          data-active={view === 'saved'}
          onClick={() => setView((v) => (v === 'saved' ? 'for-you' : 'saved'))}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          aria-pressed={view === 'saved'}
          aria-label={view === 'saved' ? 'Show all readings' : 'Show saved readings'}
        >
          <Bookmark size={18} weight={view === 'saved' ? 'fill' : 'regular'} />
        </motion.button>
      </div>

      <div className="learn-body">
        {empty ? (
          <p className="learn-empty">{empty}</p>
        ) : (
          <div className="lessons-list">
            {list.map((l) => (
              <LessonRow
                key={l.id}
                lesson={l}
                saved={saved.has(l.id)}
                onToggleSave={toggleSave}
                onOpen={onOpenLesson}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
