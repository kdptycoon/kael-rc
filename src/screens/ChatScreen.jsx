import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkle, Sliders, Plus, Send, Mic, Reply, Pattern, Back } from '../components/Icons.jsx'

const CHIPS = [
  { type: 'decode', label: 'Decode this', Icon: Sparkle },
  { type: 'reply', label: 'Help me reply', Icon: Reply },
  { type: 'pattern', label: 'Find the pattern', Icon: Pattern },
]

export default function ChatScreen({ messages = [], typing = false, onSend, onChip, onBack }) {
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function submit(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setDraft('')
    onSend?.(text)
  }

  return (
    <div className="chat-root">
      <header className="chat-head">
        <button className="ch-back" onClick={() => onBack?.()} aria-label="Back to home">
          <Back size={22} sw={1.7} />
        </button>
        <span className="ch-name">Kael</span>
        <span className="ch-sub">
          <span className="live" />
          Present
        </span>
        <button className="ch-set" aria-label="Settings">
          <Sliders size={20} sw={1.6} />
        </button>
      </header>

      <div className="chat-scroll" ref={scrollRef}>
        <div className="chat-day">Today</div>

        {messages.map((m) =>
          m.who === 'user' ? (
            <motion.div
              key={m.id}
              className="msg user"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="bubble-user">{m.text}</div>
              {m.time && <span className="stamp">{m.time}</span>}
            </motion.div>
          ) : (
            <motion.div
              key={m.id}
              className="msg kael"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="kmark">
                <Sparkle size={16} sw={1.5} />
              </span>
              <div className="bubble-kael">{m.text}</div>
            </motion.div>
          )
        )}

        <AnimatePresence>
          {typing && (
            <motion.div
              className="msg kael"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
            >
              <span className="kmark">
                <Sparkle size={16} sw={1.5} />
              </span>
              <div className="bubble-kael typing" aria-label="Kael is typing">
                <span className="d" />
                <span className="d" />
                <span className="d" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!typing && (
          <div className="chips">
            {CHIPS.map(({ type, label, Icon }) => (
              <motion.button
                key={type}
                className="chip"
                onClick={() => onChip?.(type)}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 26 }}
              >
                <span className="c-ic">
                  <Icon size={14} sw={1.6} />
                </span>
                {label}
              </motion.button>
            ))}
          </div>
        )}

      </div>

      <form className="composer" onSubmit={submit}>
        <div className="composer-field">
          <button type="button" className="plus" aria-label="Add">
            <Plus size={20} sw={1.7} />
          </button>
          <input
            className="field-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message Kael…"
            aria-label="Message Kael"
          />
          {draft.trim() ? (
            <motion.button
              type="submit"
              className="send"
              aria-label="Send"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 24 }}
            >
              <Send size={18} sw={1.8} />
            </motion.button>
          ) : (
            <button type="button" className="mic" aria-label="Voice message">
              <Mic size={20} sw={1.6} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
