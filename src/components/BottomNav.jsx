import { motion } from 'framer-motion'
import { Home, Chat, Person, Route } from './Icons.jsx'

const TABS = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'chat', label: 'Chat', Icon: Chat },
  { id: 'you', label: 'You', Icon: Person },
  { id: 'journey', label: 'Journey', Icon: Route },
]

export default function BottomNav({ active, onSelect }) {
  return (
    <nav className="nav">
      {TABS.map(({ id, label, Icon }) => (
        <motion.button
          key={id}
          className="nav-item"
          data-active={active === id}
          onClick={() => onSelect?.(id)}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Icon size={24} sw={active === id ? 1.9 : 1.6} />
          <span className="nav-label">{label}</span>
          <span className="nav-dot" />
        </motion.button>
      ))}
    </nav>
  )
}
