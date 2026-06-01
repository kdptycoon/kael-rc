import { motion } from 'framer-motion'
import { Sparkle } from '../components/Icons.jsx'

const GROUPS = [
  {
    date: 'Today',
    entries: [
      {
        now: true,
        title: 'You brought up the fight with A.',
        sub: 'Kael helped you separate the event, the trigger, and the story your mind was filling in.',
        time: '9:32 AM',
      },
    ],
  },
  {
    date: 'Yesterday',
    entries: [
      {
        title: 'You realized delayed replies trigger your fear of being deprioritized.',
        sub: 'You connected the pattern to past experiences and unmet needs.',
        time: '10:48 PM',
      },
    ],
  },
  {
    date: 'May 18',
    entries: [
      {
        title: 'You chose to ask for clarity instead of silently overthinking.',
        sub: 'You decided to lead with honesty, even if the outcome felt uncertain.',
        time: '6:37 PM',
      },
    ],
  },
  {
    date: 'May 16',
    entries: [
      {
        title: 'Learning to separate chemistry from emotional safety.',
        sub: 'You began noticing what feels safe, not just what feels exciting.',
        time: '7:22 PM',
      },
    ],
  },
]

export default function JourneyScreen({ onNavigate }) {
  return (
    <div className="screen-scroll journey-scroll">
      <header className="journey-head">
        <h1>Journey</h1>
        <p>What you’ve shared and understood.</p>
      </header>

      <div className="timeline">
        {GROUPS.map((group) => (
          <div key={group.date} className="j-group">
            <div className="j-date">{group.date}</div>
            {group.entries.map((e) => (
              <div key={e.title} className={`j-entry${e.now ? ' now' : ''}`}>
                <p className="j-title">{e.title}</p>
                <p className="j-sub">{e.sub}</p>
                <span className="j-meta">{e.time}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <motion.button
        className="j-foot"
        onClick={() => onNavigate?.('chat')}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <span className="jf-text">
          <b>Keep going.</b> Every share, insight, and choice shapes the next version of you.
        </span>
        <span className="jf-btn">
          <Sparkle size={15} sw={1.5} />
          Reflect
        </span>
      </motion.button>
    </div>
  )
}
