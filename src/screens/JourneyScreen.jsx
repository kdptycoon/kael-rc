import { motion } from 'framer-motion'
import { Chat, Bulb, Balance, Wave, ChevronRight } from '../components/Icons.jsx'

// Each moment carries a type (icon + label) and stays in chronological order,
// so the spine reads as a timeline rather than a grouped-by-category list.
const TYPES = {
  shared: { label: 'Shared with Kael', Icon: Chat },
  breakthrough: { label: 'Breakthrough', Icon: Bulb },
  decision: { label: 'Decision', Icon: Balance },
  chapter: { label: 'Active chapter', Icon: Wave },
}

const MOMENTS = [
  {
    id: 'fight-a',
    type: 'shared',
    now: true,
    title: 'The fight with A',
    sub: 'It escalated faster than you expected, and you were left holding the aftermath on your own.',
    date: 'Today',
    detail: {
      eyebrow: 'Shared with Kael · Today',
      title: 'You told Kael about the fight with A.',
      sections: [
        {
          label: 'What you brought',
          text: 'The tension with A escalated faster than you expected, and you were left holding the aftermath on your own.',
        },
        {
          label: 'What Kael noticed',
          text: 'You moved quickly from the event to what it might mean about you. The fight was one moment; the fear it touched is much older.',
        },
        {
          label: 'Worth sitting with',
          text: 'What were you really asking for in that moment — to be heard, to be reassured, or simply not to be left?',
        },
      ],
      cta: {
        label: 'Reflect this with Kael',
        message: 'I want to go back to the fight with A — it’s still sitting with me.',
      },
    },
  },
  {
    id: 'delayed-replies',
    type: 'breakthrough',
    title: 'Why slow replies sting',
    sub: 'A delay stopped being a delay — within seconds it became “I don’t matter to them.” You traced where that comes from.',
    date: 'Yesterday',
    detail: {
      eyebrow: 'Breakthrough · Yesterday',
      title: 'Delayed replies trigger your fear of being deprioritized.',
      sections: [
        {
          label: 'The pattern you named',
          text: 'A slow reply doesn’t stay a slow reply. Within seconds it becomes “I don’t matter to them.”',
        },
        {
          label: 'Where it comes from',
          text: 'You traced it back — this fear was learned long before this person, in places where your needs came last.',
        },
        {
          label: 'What changes now',
          text: 'Naming the trigger is what lets you catch it next time, before it rewrites the whole story.',
        },
      ],
      cta: {
        label: 'Reflect this with Kael',
        message: 'I keep feeling deprioritized when someone takes a while to reply. Can we go deeper on it?',
      },
    },
  },
  {
    id: 'ask-clarity',
    type: 'decision',
    title: 'You asked for clarity',
    sub: 'Instead of running the loop in your head, you said the true thing out loud and asked for what you needed.',
    date: 'May 18',
    detail: {
      eyebrow: 'Decision · May 18',
      title: 'You asked for clarity instead of silently overthinking.',
      sections: [
        {
          label: 'What you did',
          text: 'Instead of running the loop in your head, you said the true thing out loud and asked for what you needed to know.',
        },
        {
          label: 'Why it mattered',
          text: 'You led with honesty even though the answer wasn’t guaranteed — the opposite of bargaining for scraps of certainty.',
        },
        {
          label: 'Keep practising',
          text: 'Clarity asked for directly is rarely as costly as the silence you’d have carried instead.',
        },
      ],
      cta: {
        label: 'Reflect this with Kael',
        message: 'I want to keep practising asking for clarity instead of overthinking in silence.',
      },
    },
  },
  {
    id: 'chemistry-safety',
    type: 'chapter',
    title: 'Chemistry vs. safety',
    sub: 'Learning to tell the rush of intensity apart from the quiet of actually feeling safe with someone.',
    date: 'May 16',
    detail: {
      eyebrow: 'Active chapter · Since May 16',
      title: 'Separating chemistry from emotional safety.',
      sections: [
        {
          label: 'What you’re working on',
          text: 'Noticing the difference between the rush of intensity and the quiet of feeling genuinely safe with someone.',
        },
        {
          label: 'Why it’s hard',
          text: 'Chemistry is loud and familiar; safety can feel boring at first if you learned that love should be a little anxious.',
        },
        {
          label: 'The shift',
          text: 'You’re starting to ask what feels calm in your body, not just what feels exciting in your head.',
        },
      ],
      cta: {
        label: 'Reflect this with Kael',
        message: 'I want to keep learning to tell chemistry apart from real emotional safety.',
      },
    },
  },
]

export default function JourneyScreen({ onOpenSheet }) {
  return (
    <div className="screen-scroll journey-scroll">
      <section className="journey-intro">
        <span className="eyebrow">Your story with Kael</span>
        <h1>Journey</h1>
        <p>The moments you’ve lived, shared, and understood.</p>
      </section>

      <div className="timeline">
        {MOMENTS.map((m) => {
          const { label, Icon } = TYPES[m.type]
          return (
            <motion.button
              key={m.id}
              className={`j-moment${m.now ? ' now' : ''}`}
              onClick={() => onOpenSheet?.(m.detail)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="j-node">
                <Icon size={16} />
              </span>
              <span className="j-head">
                <span className="j-kind">{label}</span>
                <span className="j-date">{m.date}</span>
              </span>
              <span className="j-card">
                <span className="j-text">
                  <span className="j-title">{m.title}</span>
                  <span className="j-sub">{m.sub}</span>
                </span>
                <span className="j-go">
                  <ChevronRight size={16} sw={1.6} />
                </span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
