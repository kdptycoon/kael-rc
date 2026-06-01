import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PhoneFrame from './components/PhoneFrame.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ChatScreen from './screens/ChatScreen.jsx'
import YouScreen from './screens/YouScreen.jsx'
import JourneyScreen from './screens/JourneyScreen.jsx'
import { Sparkle, Sun, Moon } from './components/Icons.jsx'
import { kaelReply, chipExchange } from './kael.js'

function nowTime() {
  return new Date()
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    .toLowerCase()
}

const SEED = [
  { id: 1, who: 'user', text: 'He said he needs space and now I’m spiraling.', time: '9:32 am' },
  {
    id: 2,
    who: 'kael',
    text: 'Let’s slow it down. What part hurts most right now: the distance, the ambiguity, or what it seems to mean about you?',
  },
]

function ScreenView({ tab, messages, typing, handlers }) {
  switch (tab) {
    case 'chat':
      return (
        <ChatScreen
          messages={messages}
          typing={typing}
          onSend={handlers.sendText}
          onChip={handlers.sendChip}
        />
      )
    case 'you':
      return <YouScreen onNavigate={handlers.goChat} />
    case 'journey':
      return <JourneyScreen onNavigate={handlers.goChat} />
    default:
      return <HomeScreen onPrompt={handlers.startFromPrompt} onStart={handlers.goChat} />
  }
}

export default function App() {
  const [theme, setTheme] = useState('light')
  const [tab, setTab] = useState('home')
  const [messages, setMessages] = useState(SEED)
  const [typing, setTyping] = useState(false)
  const [scale, setScale] = useState(0.72)

  useLayoutEffect(() => {
    const fit = () => {
      const topH = document.querySelector('.stage-top')?.offsetHeight ?? 52
      const avail = window.innerHeight - topH - 20
      const s = Math.min(avail / 954, (window.innerWidth - 28) / 452, 1)
      setScale(Math.max(0.4, s))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const idRef = useRef(SEED.length + 1)
  const timerRef = useRef(null)
  const ease = [0.22, 0.61, 0.36, 1]

  const nextId = () => idRef.current++

  function respond(replyText) {
    setTyping(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId(), who: 'kael', text: replyText }])
      setTyping(false)
    }, 950)
  }

  function sendText(text) {
    const clean = text.trim()
    if (!clean) return
    setMessages((m) => [...m, { id: nextId(), who: 'user', text: clean, time: nowTime() }])
    respond(kaelReply(clean))
  }

  function sendChip(type) {
    const { user, kael } = chipExchange(type)
    setMessages((m) => [...m, { id: nextId(), who: 'user', text: user, time: nowTime() }])
    respond(kael)
  }

  function startFromPrompt(label) {
    setTab('chat')
    sendText(label)
  }

  const handlers = { sendText, sendChip, goChat: () => setTab('chat'), startFromPrompt }

  return (
    <div className="stage" data-theme={theme}>
      <motion.header
        className="stage-top"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="brand-mark">
          <span className="brand-glyph">
            <Sparkle size={24} sw={1.5} />
          </span>
          <div>
            <div className="brand-name">Kael</div>
            <div className="brand-caption">Relationship intelligence</div>
          </div>
        </div>
        <div className="toggle" role="group" aria-label="Theme">
          <button data-on={theme === 'light'} onClick={() => setTheme('light')} aria-label="Light">
            <Sun size={17} />
          </button>
          <button data-on={theme === 'dark'} onClick={() => setTheme('dark')} aria-label="Dark">
            <Moon size={17} />
          </button>
        </div>
      </motion.header>

      <main className="stage-main">
        <motion.div
          className="stage-device"
          style={{ '--scale': scale }}
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <PhoneFrame theme={theme} active={tab} onSelect={setTab}>
            <ScreenView tab={tab} messages={messages} typing={typing} handlers={handlers} />
          </PhoneFrame>
        </motion.div>
      </main>
    </div>
  )
}
