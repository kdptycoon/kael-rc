import { useState } from 'react'
import { Eye, HandHeart, ArrowsClockwise, Wind, Quotes, ChatCircleDots, ArrowRight, Sparkle } from '@phosphor-icons/react'

/* ──────────────────────────────────────────────────────────────────────────
   Reflection cards — a calm, finite daily "reading" that lives on Home,
   below Bring a mood. Each card is a complete micro-reflection (it pays off
   on its own) with a soft doorway into a personalized conversation with Kael.
   ────────────────────────────────────────────────────────────────────────── */

const CARDS = [
  {
    id: 'reframe',
    kind: 'Reframe',
    icon: Eye,
    title: 'Distance isn’t always rejection.',
    body: 'When someone pulls back, your mind reaches for the worst reading — they’re done, you did something wrong. But distance is often a nervous system asking for room, not the start of an ending. The story you add is the part that hurts.',
    door: 'Talk it through with Kael',
    opener: 'You’re reading their distance as rejection. Want to look at what it might actually be — and where that fear comes from for you?',
  },
  {
    id: 'permission',
    kind: 'Permission',
    icon: HandHeart,
    title: 'Needing reassurance isn’t needy.',
    body: 'Reaching for closeness when you’re unsure isn’t a flaw — it’s a bid for connection, the most human thing there is. The work isn’t to need less. It’s to ask in a way that doesn’t cost you your steadiness.',
    door: 'Where does this show up for you?',
    opener: 'When do you find yourself reaching for reassurance? Let’s look at the moment right before it.',
  },
  {
    id: 'pattern',
    kind: 'Your pattern',
    icon: ArrowsClockwise,
    personalized: true,
    title: 'You reach for clarity when you need safety.',
    body: 'When things feel uncertain, you go looking for a definite answer — a clear text, a label, a reason. The certainty calms you for a minute. But the reaching can crowd the closeness you actually want.',
    door: 'Catch it earlier with Kael',
    opener: 'Next time you feel the pull for clarity — what would it look like to reach for steadiness instead? Let’s practice.',
  },
  {
    id: 'practice',
    kind: 'Tiny practice',
    icon: Wind,
    tag: '2 min',
    title: 'Before you re-text, name the feeling — not the fix.',
    body: 'The urge to send one more message is rarely about the message. Pause. Say the feeling out loud: “I feel unseen.” Naming it gives you back the two seconds where you get to choose.',
    door: 'Try it with Kael now',
    opener: 'Bring me the text you’re about to send. Let’s find the feeling under it first.',
  },
  {
    id: 'question',
    kind: 'A question',
    icon: Quotes,
    question: true,
    title: 'What would you do differently if you trusted they were coming back?',
    body: 'Not as a promise — as an experiment. Notice how much of your reaction is bracing against a loss that hasn’t happened yet.',
    door: 'Sit with it, with Kael',
    opener: 'What came up when you read that? Start anywhere.',
  },
]

export default function ReflectionCards() {
  const [open, setOpen] = useState(null)
  return (
    <div className="lib-page rc-page">
      <h1 className="lib-title">Cards</h1>
      <p className="lib-sub">Micro-reflections — a finite daily reading that sits on Home, below Bring a mood. Each pays off on its own, then opens a conversation. Tap a card’s doorway to see Kael’s opener.</p>

      <div className="rc-feed">
        <div className="rc-feedhead">
          <span className="rc-feedhead-k">Today’s reading</span>
          <span className="rc-feedhead-n">5 cards · for you</span>
        </div>

        {CARDS.map((c) => (
          <article key={c.id} className={`rc-card${c.question ? ' rc-card-q' : ''}${c.personalized ? ' rc-card-you' : ''}`}>
            <header className="rc-head">
              <span className="rc-motif"><c.icon size={20} weight="duotone" /></span>
              <span className="rc-kicker">{c.kind}</span>
              {c.personalized && <span className="rc-foryou"><Sparkle size={10} weight="fill" /> For you</span>}
              {c.tag && <span className="rc-tag">{c.tag}</span>}
            </header>

            <h2 className="rc-title">{c.title}</h2>
            <p className="rc-body">{c.body}</p>

            <button className="rc-door" data-open={open === c.id || undefined} onClick={() => setOpen(open === c.id ? null : c.id)}>
              <ChatCircleDots size={17} weight="duotone" />
              <span>{c.door}</span>
              <ArrowRight size={15} weight="bold" className="rc-door-arrow" />
            </button>

            {open === c.id && (
              <div className="rc-handoff">
                <span className="rc-handoff-label">Kael opens with</span>
                <div className="rc-bubble"><span className="rc-bubble-mark"><Sparkle size={12} weight="fill" /></span><p>{c.opener}</p></div>
              </div>
            )}
          </article>
        ))}

        <div className="rc-closer">
          <span className="rc-closer-rule" />
          <p className="rc-closer-text">That’s your reading for today.</p>
          <span className="rc-closer-sub">Come back tomorrow for more.</span>
        </div>
      </div>
    </div>
  )
}
