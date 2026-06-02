import { motion } from 'framer-motion'
import { Bulb, Cloud, Flag, Wave, Cycle } from '../components/Icons.jsx'

// Each moment carries a type (icon + label). Every node looks the same; we don't
// rank moments as big or small; the spine just holds them in order.
const TYPES = {
  breakthrough: { label: 'Breakthrough', Icon: Bulb },
  season: { label: 'Hard season', Icon: Cloud },
  milestone: { label: 'Milestone', Icon: Flag },
  shift: { label: 'Shift', Icon: Wave },
  turning: { label: 'Turning point', Icon: Cycle },
}

// Newest first. `body` uses line breaks for a short, journal-like stanza.
const MOMENTS = [
  {
    id: 'fight-a',
    type: 'season',
    mon: 'May',
    day: '30',
    title: 'The fight that’s still settling',
    body: 'It escalated faster than you could hold.\nYou’re still sorting what was yours to carry.',
    detail: {
      eyebrow: 'Hard season · May 30',
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
          text: 'What were you really asking for in that moment: to be heard, to be reassured, or simply not to be left?',
        },
      ],
      cta: {
        label: 'Reflect this with Kael',
        message: 'I want to go back to the fight with A. It’s still sitting with me.',
      },
    },
  },
  {
    id: 'delayed-replies',
    type: 'breakthrough',
    mon: 'May',
    day: '27',
    title: 'You named the fear out loud',
    body: 'A slow reply stopped meaning “busy.”\nYou caught the old story it feeds, and said it plainly.',
    detail: {
      eyebrow: 'Breakthrough · May 27',
      title: 'Delayed replies trigger your fear of being deprioritized.',
      sections: [
        {
          label: 'The pattern you named',
          text: 'A slow reply doesn’t stay a slow reply. Within seconds it becomes “I don’t matter to them.”',
        },
        {
          label: 'Where it comes from',
          text: 'You traced it back. This fear was learned long before this person, in places where your needs came last.',
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
    type: 'milestone',
    mon: 'May',
    day: '21',
    title: 'You asked instead of spiraling',
    body: 'You said the true thing out loud.\nNo bargaining, no waiting until you felt sure.',
    detail: {
      eyebrow: 'Milestone · May 21',
      title: 'You asked for clarity instead of silently overthinking.',
      sections: [
        {
          label: 'What you did',
          text: 'Instead of running the loop in your head, you said the true thing out loud and asked for what you needed to know.',
        },
        {
          label: 'Why it mattered',
          text: 'You led with honesty even though the answer wasn’t guaranteed, the opposite of bargaining for scraps of certainty.',
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
    type: 'shift',
    mon: 'May',
    day: '16',
    title: 'Chemistry stopped running the show',
    body: 'You started asking what feels calm,\nnot just what feels electric.',
    detail: {
      eyebrow: 'Shift · since May 16',
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
  {
    id: 'stopped-performing',
    type: 'turning',
    mon: 'May',
    day: '9',
    title: 'You stopped performing “fine”',
    body: 'One honest preference, said plainly.\nSomething in you stopped shrinking to fit.',
    detail: {
      eyebrow: 'Turning point · May 9',
      title: 'You stopped saying “I’m fine” when you weren’t.',
      sections: [
        {
          label: 'What shifted',
          text: 'For once you let a real preference be known instead of going quiet and agreeable. You stopped editing yourself down to stay easy to love.',
        },
        {
          label: 'Why it mattered',
          text: 'Every “I’m fine” had been a small disappearance. Saying the true thing was you betting you could be wanted as you actually are.',
        },
        {
          label: 'Keep going',
          text: 'Notice the next time “fine” rises automatically. One honest sentence is how you learn who can hold the real you.',
        },
      ],
      cta: {
        label: 'Reflect this with Kael',
        message: 'I want to stop saying I’m fine when I’m not and pretending I want less than I do.',
      },
    },
  },
]

function today() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export default function JourneyScreen({ onOpenSheet }) {
  return (
    <div className="screen-scroll journey-scroll">
      <section className="journey-intro">
        <span className="eyebrow">{today()}</span>
        <h1>Your journey</h1>
        <p>Everything Kael has watched unfold.</p>
      </section>

      <div className="timeline">
        {MOMENTS.map((m) => {
          const { label, Icon } = TYPES[m.type]
          return (
            <motion.button
              key={m.id}
              className="j-moment"
              onClick={() => onOpenSheet?.(m.detail)}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              <span className="j-rail">
                <span className="j-mon">{m.mon}</span>
                <span className="j-day">{m.day}</span>
              </span>
              <span className="j-node" />
              <span className="j-card">
                <span className="j-kind">
                  <Icon size={14} sw={1.6} />
                  {label}
                </span>
                <span className="j-title">{m.title}</span>
                <span className="j-body">{m.body}</span>
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
