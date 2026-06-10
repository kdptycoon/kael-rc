import { useEffect, useRef, useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import BottomNav from '../components/BottomNav.jsx'
import HomeScreen from './HomeScreen.jsx'
import ChatScreen from './ChatScreen.jsx'
import YouScreen from './YouScreen.jsx'
import JourneyScreen from './JourneyScreen.jsx'
import {
  Sparkle,
  ArrowLeft,
  X,
  CheckCircle,
  Check,
  Lock,
  Heart,
  Wind,
  House,
  UserCircle,
  Brain,
  Lightning,
  ArrowsSplit,
  ShieldCheck,
  BellSimple,
  ArrowsClockwise,
  Quotes,
  Waves,
  Anchor,
  ChatCircleDots,
  PencilSimple,
  MagnifyingGlass,
  Compass,
  NotePencil,
  ListChecks,
  HandHeart,
  Star,
  MoonStars,
  MaskHappy,
  PaperPlaneTilt,
  ClockCounterClockwise,
  Flask,
  Shield,
  HandsPraying,
  ListNumbers,
  HeartBreak,
  UserMinus,
  SpeakerSimpleSlash,
  CloudSun,
  PauseCircle,
  Megaphone,
  Plant,
  DoorOpen,
  Power,
  Flame,
  Target,
} from '@phosphor-icons/react'

/* ──────────────────────────────────────────────────────────────────────────
   Kael onboarding — premium pass.
   · Intro screens showcase the REAL app (live screens in a scaled phone).
   · Quiz screens: icon cards, satisfying selection, auto-advance.
   · Progress bar lives ONLY on quiz screens ("n of 10").
   · Six answers score into one of five named patterns → mini-read.
   ────────────────────────────────────────────────────────────────────────── */

// Messages for the in-the-moment chat screenshot.
const SHOT_MSGS = [
  { id: 1, who: 'user', text: 'She read it an hour ago and nothing. I’m spiraling.', time: '9:41 pm' },
  { id: 2, who: 'kael', text: 'Before we draft anything: what are you afraid the silence means?' },
  { id: 3, who: 'user', text: 'That she’s already half out the door.', time: '9:43 pm' },
]

// Quiz answer → pattern scoring. Top-scoring pattern drives the mini-read.
const SCORE = {
  q1: {
    'Someone feels distant': ['guarded_distance'],
    'We keep fighting': ['defensive_strike'],
    'I overthink replies': ['reassurance_loop', 'meaning_making_spiral'],
    'I feel too much': ['self_abandonment', 'reassurance_loop'],
    'I want healthier patterns': ['meaning_making_spiral'],
  },
  q2: {
    'I replay everything': ['meaning_making_spiral'],
    'I want reassurance fast': ['reassurance_loop'],
    'I go quiet': ['guarded_distance'],
    'I get sharp': ['defensive_strike'],
    'I pretend I’m fine': ['self_abandonment'],
  },
  q3: {
    'Send too much': ['reassurance_loop'],
    'Look for evidence': ['meaning_making_spiral'],
    Withdraw: ['guarded_distance'],
    'Test them': ['defensive_strike'],
    'People-please': ['self_abandonment'],
  },
  q4: {
    'I need resolution now': ['reassurance_loop', 'meaning_making_spiral'],
    'I defend myself fast': ['defensive_strike'],
    'I shut down': ['guarded_distance'],
    'I apologize too quickly': ['self_abandonment'],
    'I keep score silently': ['defensive_strike', 'guarded_distance'],
  },
  q5: {
    'I’m too much': ['self_abandonment', 'reassurance_loop'],
    'I’ll be left': ['reassurance_loop', 'guarded_distance'],
    'I’m not chosen': ['meaning_making_spiral'],
    'I can’t ask for needs': ['self_abandonment'],
    'Calm means boring': ['defensive_strike'],
  },
  q6: {
    'I pause before reacting': ['meaning_making_spiral', 'defensive_strike'],
    'I ask clearly': ['self_abandonment'],
    'I stop chasing mixed signals': ['reassurance_loop'],
    'I trust myself more': ['self_abandonment', 'meaning_making_spiral'],
    'I choose steadier love': ['guarded_distance'],
  },
}
const PATTERN_ORDER = ['reassurance_loop', 'meaning_making_spiral', 'self_abandonment', 'defensive_strike', 'guarded_distance']

const PATTERNS = {
  reassurance_loop: {
    name: 'The Reassurance Loop',
    line: 'You reach for clarity when what you need is safety.',
    explain:
      'When connection feels uncertain, your system reads it as danger, so you chase a clear answer to calm down. The relief is real but brief, and the reaching can crowd the closeness you actually want.',
    starts: ['Name the fear before you send the text', 'A 90-second pause that drops the urgency', 'One secure line that asks without chasing'],
    trigger: 'Slow replies and silence',
    move: 'Reaching for reassurance',
    fear: 'Being slowly abandoned',
  },
  meaning_making_spiral: {
    name: 'The Meaning-Making Spiral',
    line: 'Your mind fills the silence with the worst story.',
    explain:
      'A small ambiguity becomes a full narrative before you notice. You are not dramatic, you are trying to feel prepared. But the story often becomes the thing you react to, not what actually happened.',
    starts: ['Separate the event from the story you added', 'Catch the first catastrophic thought', 'Reality-test before you decide what it means'],
    trigger: 'Ambiguity and mixed signals',
    move: 'Building a story',
    fear: 'Being blindsided',
  },
  self_abandonment: {
    name: 'The Self-Abandonment Pattern',
    line: 'You keep the peace by disappearing a little.',
    explain:
      'You read the room, soften, and over-give to stay connected. People feel easy around you, but the cost is that your own needs go quiet, until resentment or burnout speaks for them.',
    starts: ['Notice when you’re managing their feelings', 'Find the need you just minimized', 'Ask for one small thing, clearly'],
    trigger: 'Tension or someone’s disappointment',
    move: 'People-pleasing',
    fear: 'Being too much, or not enough',
  },
  defensive_strike: {
    name: 'The Defensive Strike',
    line: 'You protect yourself by getting there first.',
    explain:
      'When you feel cornered or unseen, defending or pushing back feels safer than being vulnerable. It guards you in the moment, but it can turn a rupture into a standoff.',
    starts: ['Spot the threat signal before you fire', 'Name the need under the defense', 'One repair line that lowers the heat'],
    trigger: 'Feeling blamed or unseen',
    move: 'Defending fast',
    fear: 'Being controlled or one-down',
  },
  guarded_distance: {
    name: 'The Guarded Distance',
    line: 'You go quiet to feel safe, and it reads as gone.',
    explain:
      'When things get intense, withdrawing restores your control. It calms you, but the people who want you can feel it as a door closing, which can create the distance you were bracing for.',
    starts: ['Notice the urge to withdraw in real time', 'Stay ten percent longer than is comfortable', 'Say you need space without vanishing'],
    trigger: 'Pressure or too much closeness',
    move: 'Withdrawing',
    fear: 'Being engulfed, or let down',
  },
}

function scorePattern(picks) {
  const tally = {}
  ;['q1', 'q2', 'q3', 'q4', 'q5', 'q6'].forEach((id) => {
    const ans = picks[id]
    const tags = ans && SCORE[id] ? SCORE[id][ans] : null
    if (tags) tags.forEach((p) => (tally[p] = (tally[p] || 0) + 1))
  })
  let best = PATTERN_ORDER[0]
  let bestN = -1
  PATTERN_ORDER.forEach((p) => {
    if ((tally[p] || 0) > bestN) {
      bestN = tally[p] || 0
      best = p
    }
  })
  return best
}

const TESTIMONIALS = [
  { text: 'It named the loop I’d been calling intuition. I stopped spiraling mid-text for the first time in years.', who: 'Maya, 29', ctx: 'dating' },
  { text: 'We’d had the same fight for two years. Kael showed me what I was actually asking for underneath it.', who: 'Jordan, 34', ctx: 'married' },
  { text: 'The only app that didn’t tell me to “communicate better” and leave it there.', who: 'Sam, 27', ctx: 'situationship' },
]

const SCREENS = [
  // ── Act 1 · "Kael has what I want" — show the real product ──
  {
    id: 'welcome',
    type: 'hero',
    icon: Sparkle,
    kicker: 'Relationship intelligence',
    title: 'Meet Kael',
    sub: 'A personal coach for the moments relationships make you spiral, overthink, or lose yourself.',
    shot: { tab: 'home', h: 250, scale: 0.56 },
    cta: 'Begin',
  },
  {
    id: 'moment',
    type: 'statement',
    kicker: 'In the moment',
    title: 'Bring Kael the exact moment.',
    lede: 'The read receipt, the fight, the silence. Decode it, draft the reply, or find the pattern underneath.',
    shot: { tab: 'chat', h: 392, scale: 0.78 },
    cta: 'Continue',
  },
  {
    id: 'read',
    type: 'statement',
    kicker: 'A read of you',
    title: 'Kael learns how you love.',
    lede: 'Your patterns, triggers, and the beliefs running underneath, mapped and updated as you go.',
    shot: { tab: 'you', h: 392, scale: 0.78, lift: 64 },
    cta: 'Continue',
  },
  {
    id: 'transformation',
    type: 'statement',
    kicker: 'The point of it all',
    title: 'Watch yourself actually change.',
    lede: 'Not just advice. Proof of the moments you handled differently.',
    shot: { tab: 'journey', h: 392, scale: 0.78, lift: 50 },
    cta: 'Continue',
  },
  {
    id: 'transition',
    type: 'reflect',
    icon: Sparkle,
    lead: 'Let’s shape your first read.',
    body: 'A few honest answers help Kael understand the relationship you’re actually in. No right answers, just yours.',
    cta: 'Start',
  },

  // ── Context (quiz portion begins — progress bar on) ──
  { id: 'name', type: 'input', kind: 'name', quiz: true, kicker: 'Introductions', title: 'What should Kael call you?', placeholder: 'Your name', micro: 'It helps Kael speak to you, not at you.', cta: 'Continue' },
  {
    id: 'status',
    type: 'question',
    quiz: true,
    kicker: 'Your love life',
    title: 'What does your love life look like right now?',
    pickOne: true,
    options: [
      { icon: UserCircle, name: 'Single' },
      { icon: Sparkle, name: 'Dating' },
      { icon: ArrowsSplit, name: 'A situationship' },
      { icon: Heart, name: 'In a relationship' },
      { icon: ArrowsClockwise, name: 'On and off' },
      { icon: Wind, name: 'Recently ended' },
      { icon: House, name: 'Long-term or married' },
      { icon: Waves, name: 'It’s complicated' },
    ],
  },
  { id: 'age', type: 'input', kind: 'age', quiz: true, kicker: 'A little context', title: 'How old are you?', placeholder: 'Your age', micro: 'Kael is built for adults navigating adult relationships.', cta: 'Continue' },
  {
    id: 'gender',
    type: 'question',
    quiz: true,
    kicker: 'A little context',
    title: 'How do you identify?',
    pickOne: true,
    options: [{ name: 'Woman' }, { name: 'Man' }, { name: 'Non-binary' }, { name: 'Another identity' }, { name: 'Prefer not to say' }],
  },
  {
    id: 'q1',
    type: 'question',
    quiz: true,
    kicker: 'Right now',
    title: 'What brings you here most right now?',
    pickOne: true,
    options: [
      { icon: Wind, name: 'Someone feels distant' },
      { icon: Lightning, name: 'We keep fighting' },
      { icon: Brain, name: 'I overthink replies' },
      { icon: Waves, name: 'I feel too much' },
      { icon: Plant, name: 'I want healthier patterns' },
    ],
  },
  {
    id: 'trustBoundary',
    type: 'statement',
    kicker: 'How this works',
    title: 'Kael reads your patterns, not their mind.',
    lede: 'It works from what you share, then helps separate what actually happened from what your nervous system added.',
    note: 'You control what you bring. Nothing here is judged.',
    cta: 'Continue',
  },
  {
    id: 'q2',
    type: 'question',
    quiz: true,
    kicker: 'Under pressure',
    title: 'When someone pulls away, what happens first?',
    pickOne: true,
    options: [
      { icon: ClockCounterClockwise, name: 'I replay everything' },
      { icon: ChatCircleDots, name: 'I want reassurance fast' },
      { icon: MoonStars, name: 'I go quiet' },
      { icon: Flame, name: 'I get sharp' },
      { icon: MaskHappy, name: 'I pretend I’m fine' },
    ],
  },
  { id: 'eduInsight', type: 'reflect', lead: 'Uncertainty can feel like danger.', body: 'A delayed reply can land on an old fear. Kael helps you notice the difference before you react.', cta: 'Continue' },
  {
    id: 'q3',
    type: 'question',
    quiz: true,
    kicker: 'The loop',
    title: 'What do you usually do when you feel unsure?',
    pickOne: true,
    options: [
      { icon: PaperPlaneTilt, name: 'Send too much' },
      { icon: MagnifyingGlass, name: 'Look for evidence' },
      { icon: DoorOpen, name: 'Withdraw' },
      { icon: Flask, name: 'Test them' },
      { icon: HandHeart, name: 'People-please' },
    ],
  },
  {
    id: 'proof',
    type: 'proof',
    kicker: 'From early users',
    title: 'It tends to name the thing you couldn’t.',
    cta: 'Continue',
  },
  {
    id: 'q4',
    type: 'question',
    quiz: true,
    kicker: 'Conflict',
    title: 'In conflict, what feels most familiar?',
    pickOne: true,
    options: [
      { icon: Target, name: 'I need resolution now' },
      { icon: Shield, name: 'I defend myself fast' },
      { icon: Power, name: 'I shut down' },
      { icon: HandsPraying, name: 'I apologize too quickly' },
      { icon: ListNumbers, name: 'I keep score silently' },
    ],
  },
  {
    id: 'method',
    type: 'method',
    kicker: 'How Kael helps',
    title: 'Three moves, every time.',
    steps: [
      { k: 'Separate', v: 'the event from the story' },
      { k: 'Name', v: 'the need underneath' },
      { k: 'Choose', v: 'the next secure move' },
    ],
    cta: 'Continue',
  },
  {
    id: 'q5',
    type: 'question',
    quiz: true,
    variant: 'belief',
    kicker: 'Underneath',
    title: 'What fear shows up most in relationships?',
    sub: 'No one sees this but you.',
    pickOne: true,
    options: [
      { icon: Waves, name: 'I’m too much' },
      { icon: HeartBreak, name: 'I’ll be left' },
      { icon: UserMinus, name: 'I’m not chosen' },
      { icon: SpeakerSimpleSlash, name: 'I can’t ask for needs' },
      { icon: CloudSun, name: 'Calm means boring' },
    ],
  },
  {
    id: 'q6',
    type: 'question',
    quiz: true,
    kicker: 'Thirty days out',
    title: 'A month from now, what would feel different?',
    pickOne: true,
    options: [
      { icon: PauseCircle, name: 'I pause before reacting' },
      { icon: Megaphone, name: 'I ask clearly' },
      { icon: ArrowsSplit, name: 'I stop chasing mixed signals' },
      { icon: Compass, name: 'I trust myself more' },
      { icon: Anchor, name: 'I choose steadier love' },
    ],
  },

  // ── Permission → build-up → reveal → gap → unlock → paywall ──
  { id: 'notify', type: 'hero', icon: BellSimple, kicker: 'One small thing', title: 'Want Kael to check in gently?', sub: 'A nudge to reflect, or a pause before an old pattern takes over.', cta: 'Turn on reminders', cta2: 'Not now', micro: 'You can change this anytime.' },
  { id: 'analysis', type: 'loading', title: 'Building your relationship read', steps: ['Finding your loop', 'Mapping your triggers', 'Matching your first 7-day plan'] },
  { id: 'miniRead', type: 'reveal', cta: 'See what unlocks' },
  {
    id: 'gap',
    type: 'beforeafter',
    title: 'The pattern doesn’t change just because you saw it once.',
    spiralKicker: 'The old loop',
    spiral: ['Why haven’t they replied?', 'I’ll just delete it and go quiet.', 'Clearly they don’t care.'],
    shiftKicker: 'With Kael',
    shiftRead: '“You’re anxious because you value this. What’s the secure thing to say?”',
    shiftMsg: 'Hey, I felt a little distant today, can we check in tonight?',
    cta: 'Continue',
  },
  {
    id: 'unlock',
    type: 'unlock',
    kicker: 'Your full read is ready',
    title: 'Here’s everything that unlocks.',
    modules: [
      { icon: ListChecks, label: 'Full pattern breakdown' },
      { icon: Target, label: 'Your triggers map' },
      { icon: PencilSimple, label: 'Secure reply scripts' },
      { icon: ArrowsClockwise, label: 'Your 7-day practice plan' },
      { icon: NotePencil, label: 'Lessons matched to you' },
      { icon: ChatCircleDots, label: 'Talk to Kael anytime' },
    ],
    cta: 'Continue',
  },
  { id: 'paywall', type: 'paywall', title: 'Start your 7-day trial with Kael', cta: 'Start my 7-day trial' },
]

const QUIZ_IDS = SCREENS.filter((s) => s.quiz).map((s) => s.id)

function PhoneShot({ tab = 'home', h = 320, scale = 0.7, lift = 0 }) {
  const noop = () => {}
  let screen
  if (tab === 'chat') screen = <ChatScreen messages={SHOT_MSGS} typing onSend={noop} onChip={noop} onBack={noop} />
  else if (tab === 'you') screen = <YouScreen onNavigate={noop} onOpenSheet={noop} onPrompt={noop} />
  else if (tab === 'journey') screen = <JourneyScreen onNavigate={noop} onOpenSheet={noop} />
  else screen = <HomeScreen onPrompt={noop} onMood={noop} />
  return (
    <div className="ob-shot" style={{ height: h }}>
      <div className="ob-shotphone" style={{ transform: `scale(${scale}) translateY(-${lift}px)` }}>
        <div className="phone-screen" data-theme="light">
          <StatusBar />
          <div className="screen-body">{screen}</div>
          {tab !== 'chat' && <BottomNav active={tab} onSelect={noop} />}
          <div className="home-indicator" />
        </div>
      </div>
    </div>
  )
}

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [plan, setPlan] = useState('annual')
  const [picks, setPicks] = useState({})
  const bodyRef = useRef(null)
  const advanceRef = useRef(null)

  const s = SCREENS[step]
  const total = SCREENS.length
  const last = step === total - 1
  const nm = name.trim()
  const under18 = age !== '' && Number(age) > 0 && Number(age) < 18

  const go = (n) => {
    const t = Math.max(0, Math.min(total - 1, n))
    setDir(t >= step ? 1 : -1)
    setStep(t)
  }
  const next = () => (last ? go(0) : go(step + 1))

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    clearTimeout(advanceRef.current)
    if (s.type === 'loading') {
      const t = setTimeout(() => go(step + 1), 4400)
      return () => clearTimeout(t)
    }
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  const pickSingle = (id, v) => setPicks((p) => ({ ...p, [id]: v }))
  function pickAndAdvance(id, v) {
    pickSingle(id, v)
    clearTimeout(advanceRef.current)
    advanceRef.current = setTimeout(() => {
      setDir(1)
      setStep((st) => Math.min(total - 1, st + 1))
    }, 430)
  }

  const ready = (() => {
    if (s.pickOne) return !!picks[s.id]
    if (s.kind === 'name') return nm.length > 0
    if (s.kind === 'age') return age !== '' && Number(age) >= 13 && Number(age) < 120
    return true
  })()

  const isHero = s.type === 'hero'
  const isPaywall = s.type === 'paywall'
  const isQuiz = !!s.quiz
  const quizIdx = QUIZ_IDS.indexOf(s.id)
  const showHead = !isHero && s.type !== 'loading' && !isPaywall
  const showFoot = s.type !== 'loading' && !s.pickOne && !(isPaywall && under18)

  return (
    <div className="lib-page ob-page">
      <div className="ob-devbar">
        <span className="ob-dev-title">
          Onboarding · {step + 1}/{total} · {s.id}
        </span>
        <div className="ob-dev-controls">
          <button className="ob-dev-btn" onClick={() => go(step - 1)} disabled={step === 0}>Prev</button>
          <button className="ob-dev-btn" onClick={() => go(step + 1)} disabled={last}>Next</button>
          <select className="ob-dev-jump" value={step} onChange={(e) => go(Number(e.target.value))}>
            {SCREENS.map((sc, i) => (
              <option key={sc.id} value={i}>
                {i + 1}. {sc.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ob-stage">
        <div className="ob-screen" data-theme="light">
          {showHead && (
            <header className={`ob-head${isQuiz ? '' : ' ob-head-min'}`}>
              <button className="ob-back" onClick={() => go(step - 1)} aria-label="Back">
                <ArrowLeft size={22} weight="regular" />
              </button>
              {isQuiz && (
                <>
                  <div className="ob-prog">
                    <div className="ob-prog-fill" style={{ width: `${((quizIdx + 1) / QUIZ_IDS.length) * 100}%` }} />
                  </div>
                  <span className="ob-step">
                    {quizIdx + 1} of {QUIZ_IDS.length}
                  </span>
                </>
              )}
            </header>
          )}
          {isPaywall && (
            <header className="ob-head ob-head-pw">
              <button className="ob-x" onClick={next} aria-label="Close">
                <X size={22} weight="regular" />
              </button>
            </header>
          )}

          <div className="ob-body" ref={bodyRef}>
            <div key={step} data-dir={dir} className={`ob-anim${isHero ? ' ob-anim-center' : ''}`}>
              <Body s={s} nm={nm} name={name} setName={setName} age={age} setAge={setAge} under18={under18} picks={picks} pickSingle={pickSingle} onPickOne={pickAndAdvance} plan={plan} setPlan={setPlan} />
            </div>
          </div>

          {showFoot && (
            <footer className="ob-foot">
              <button className="ob-cta" onClick={next} disabled={!ready}>
                {s.cta}
              </button>
              {s.cta2 && (
                <button className="ob-cta-2" onClick={next}>
                  {s.cta2}
                </button>
              )}
              {s.micro && isHero && <p className="ob-fine">{s.micro}</p>}
            </footer>
          )}
        </div>
      </div>
    </div>
  )
}

function Body({ s, nm, name, setName, age, setAge, under18, picks, pickSingle, onPickOne, plan, setPlan }) {
  switch (s.type) {
    case 'hero':
      return (
        <div className="ob-hero">
          <span className="ob-badge ob-badge-pop">
            <s.icon size={26} weight={s.id === 'welcome' ? 'fill' : 'duotone'} />
          </span>
          {s.kicker && <p className="ob-kicker">{s.kicker}</p>}
          <h1 className={`ob-h1${s.id === 'welcome' ? ' ob-h1-xl' : ''}`}>{s.title}</h1>
          <p className="ob-lede">{s.sub}</p>
          {s.shot && <PhoneShot {...s.shot} />}
        </div>
      )

    case 'statement':
      return (
        <>
          <Heading s={s} />
          {s.shot && <PhoneShot {...s.shot} />}
          {s.note && (
            <div className="ob-note">
              <ShieldCheck size={18} weight="duotone" />
              <span>{s.note}</span>
            </div>
          )}
        </>
      )

    case 'input': {
      const isAge = s.kind === 'age'
      return (
        <>
          <Heading s={s} />
          <input
            className="ob-input"
            value={isAge ? age : name}
            onChange={(e) => (isAge ? setAge(e.target.value.replace(/[^0-9]/g, '').slice(0, 3)) : setName(e.target.value))}
            placeholder={s.placeholder}
            inputMode={isAge ? 'numeric' : 'text'}
            autoComplete="off"
            spellCheck={false}
          />
          <p className="ob-micro">{s.micro}</p>
        </>
      )
    }

    case 'reflect': {
      const Icon = s.icon || Quotes
      return (
        <div className="ob-reflect">
          <span className="ob-quote-mark">
            <Icon size={28} weight="fill" />
          </span>
          <p className="ob-reflect-lead">{s.lead}</p>
          <p className="ob-reflect-body">{s.body}</p>
        </div>
      )
    }

    case 'method':
      return (
        <>
          <Heading s={s} />
          <div className="ob-steps">
            {s.steps.map((st, i) => (
              <div className="ob-stepc" key={st.k}>
                <span className="ob-stepc-n">{i + 1}</span>
                <span className="ob-stepc-t">
                  <b>{st.k}</b> {st.v}
                </span>
              </div>
            ))}
          </div>
        </>
      )

    case 'proof':
      return (
        <>
          <Heading s={s} />
          <div className="ob-quotes">
            {TESTIMONIALS.map((q) => (
              <div className="ob-quotec" key={q.who}>
                <span className="ob-stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={13} weight="fill" />
                  ))}
                </span>
                <p className="ob-quotec-t">“{q.text}”</p>
                <span className="ob-quotec-w">
                  {q.who} · {q.ctx}
                </span>
              </div>
            ))}
          </div>
          <p className="ob-placeholder">Sample quotes · replace with real reviews before launch</p>
        </>
      )

    case 'loading':
      return <Loading s={s} nm={nm} />

    case 'reveal': {
      const key = scorePattern(picks)
      const p = PATTERNS[key]
      return (
        <>
          <span className="ob-patternchip">
            <Sparkle size={14} weight="fill" />
            Your read · {p.name}
          </span>
          <h1 className="ob-h1">{p.line}</h1>
          <p className="ob-reveal-read">{nm ? `${cap(nm)}, ${lower(p.explain)}` : p.explain}</p>
          <div className="ob-insights">
            {[
              { icon: Lightning, k: 'Likely trigger', v: p.trigger },
              { icon: ArrowsClockwise, k: 'Default move', v: p.move },
              { icon: Anchor, k: 'Hidden fear', v: p.fear },
            ].map((i) => (
              <div className="ob-insight" key={i.k}>
                <span className="ob-insight-ic">
                  <i.icon size={18} weight="duotone" />
                </span>
                <span>
                  <span className="ob-insight-k">{i.k}: </span>
                  <span className="ob-insight-v">{i.v}</span>
                </span>
              </div>
            ))}
          </div>
          <span className="ob-starts-head">Where you’d start</span>
          <div className="ob-starts">
            {p.starts.map((st) => (
              <div className="ob-start" key={st}>
                <CheckCircle size={18} weight="fill" />
                <span>{st}</span>
              </div>
            ))}
          </div>
        </>
      )
    }

    case 'beforeafter':
      return (
        <div className="ob-ba">
          {s.title && <p className="ob-ba-title">{s.title}</p>}
          <div className="ob-ba-spiral">
            <span className="ob-ba-kick ob-ba-kick-red">{s.spiralKicker}</span>
            <div className="ob-ba-msgs ob-ba-right">
              {s.spiral.map((m, i) => (
                <div className="ob-bubble ob-bubble-user" key={i}>
                  {m}
                </div>
              ))}
            </div>
          </div>
          <div className="ob-ba-pill">Relationship Intelligence</div>
          <div className="ob-ba-shift">
            <span className="ob-ba-kick">{s.shiftKicker}</span>
            <div className="ob-ba-msgs">
              <div className="ob-bubble ob-bubble-read">{s.shiftRead}</div>
              <div className="ob-bubble ob-bubble-dark">{s.shiftMsg}</div>
            </div>
          </div>
        </div>
      )

    case 'unlock':
      return (
        <>
          <Heading s={s} />
          <div className="ob-modules">
            {s.modules.map((m) => (
              <div className="ob-module" key={m.label}>
                <span className="ob-module-ic">
                  <m.icon size={20} weight="duotone" />
                </span>
                <span className="ob-module-label">{m.label}</span>
                <Lock size={15} weight="fill" className="ob-module-lock" />
              </div>
            ))}
          </div>
        </>
      )

    case 'paywall': {
      const key = scorePattern(picks)
      const p = PATTERNS[key]
      if (under18) {
        return (
          <div className="ob-pw ob-pw-block">
            <span className="ob-badge ob-badge-sm ob-badge-pop">
              <HandHeart size={20} weight="duotone" />
            </span>
            <h1 className="ob-h1 ob-center">Kael isn’t available for you just yet.</h1>
            <p className="ob-lede ob-center">Kael is built for adults navigating adult relationships. Thank you for your honesty, please come back when you’re 18.</p>
          </div>
        )
      }
      return (
        <div className="ob-pw">
          <span className="ob-badge ob-badge-sm ob-badge-pop">
            <Sparkle size={20} weight="fill" />
          </span>
          <h1 className="ob-h1 ob-center">{s.title}</h1>
          <p className="ob-lede ob-center">Unlock everything built from your read: coaching, scripts, lessons, and your plan for steadier love.</p>
          <div className="ob-checks">
            {[`${p.name}, fully mapped`, 'In-the-moment chat with Kael', 'Secure reply scripts', 'Your 7-day practice plan', 'Lessons matched to your pattern', 'Progress you can actually see'].map((v) => (
              <div className="ob-checkrow" key={v}>
                <CheckCircle size={22} weight="fill" />
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="ob-tl">
            <span className="ob-tl-head">How your 7-day trial works</span>
            <div className="ob-tl-row">
              <span className="ob-tl-d">Today</span>
              <span className="ob-tl-t">Full access to your read, plan, and Kael chat.</span>
            </div>
            <div className="ob-tl-row">
              <span className="ob-tl-d">Day 5</span>
              <span className="ob-tl-t">We’ll remind you the trial is ending.</span>
            </div>
            <div className="ob-tl-row">
              <span className="ob-tl-d">Day 7</span>
              <span className="ob-tl-t">It renews, only if you stay.</span>
            </div>
          </div>
          <button className="ob-plan" data-on={plan === 'annual' || undefined} onClick={() => setPlan('annual')}>
            <span className="ob-plan-tag">Most popular</span>
            <div className="ob-plan-l">
              <span className="ob-plan-name">Annual</span>
              <span className="ob-plan-sub">7 days free, then billed yearly</span>
            </div>
            <span className="ob-plan-price">$X.XX/wk</span>
          </button>
          <button className="ob-plan" data-on={plan === 'monthly' || undefined} onClick={() => setPlan('monthly')}>
            <div className="ob-plan-l">
              <span className="ob-plan-name">Monthly</span>
              <span className="ob-plan-sub">Flexible, no free trial</span>
            </div>
            <span className="ob-plan-price">$XX.XX/mo</span>
          </button>
          <p className="ob-pw-foot">No charge today · Cancel anytime · Restore · Terms</p>
        </div>
      )
    }

    default:
      return (
        <>
          <Heading s={s} />
          <div className="ob-opts">
            {s.options.map((o) => {
              const val = o.name
              const on = picks[s.id] === val
              const onClick = s.pickOne ? () => onPickOne(s.id, val) : () => pickSingle(s.id, val)
              return (
                <button key={val} className={`ob-opt ob-opt-card${s.variant === 'belief' ? ' ob-opt-belief' : ''}`} data-on={on || undefined} onClick={onClick}>
                  {o.icon && (
                    <span className="ob-opt-ic">
                      <o.icon size={20} weight="duotone" />
                    </span>
                  )}
                  <span className="ob-opt-main">
                    <span className="ob-opt-name">{o.name}</span>
                    {o.desc && <span className="ob-opt-desc">{o.desc}</span>}
                  </span>
                  <span className="ob-opt-check">
                    <Check size={13} weight="bold" />
                  </span>
                </button>
              )
            })}
          </div>
          {s.hint && <p className="ob-hint">{s.hint}</p>}
        </>
      )
  }
}

function Heading({ s }) {
  return (
    <>
      {s.kicker && <p className="ob-kicker">{s.kicker}</p>}
      <h1 className="ob-h1">{s.title}</h1>
      {s.lede && <p className="ob-lede">{s.lede}</p>}
      {s.sub && <p className="ob-qsub">{s.sub}</p>}
    </>
  )
}

function Loading({ s, nm }) {
  const [done, setDone] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setDone((d) => Math.min(s.steps.length, d + 1)), 1050)
    return () => clearInterval(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="ob-loading">
      <span className="ob-loadring">
        <span className="ob-badge ob-badge-pop">
          <Sparkle size={24} weight="fill" />
        </span>
      </span>
      <h1 className="ob-h1 ob-center">
        {s.title}
        {nm ? `, ${cap(nm)}` : ''}
      </h1>
      <div className="ob-loadsteps">
        {s.steps.map((st, i) => (
          <div className="ob-loadstep" data-done={i < done || undefined} key={st}>
            <span className="ob-loadcheck">{i < done ? <Check size={13} weight="bold" /> : <span className="ob-loaddot" />}</span>
            {st}
          </div>
        ))}
      </div>
    </div>
  )
}

function cap(w) {
  return w ? w.charAt(0).toUpperCase() + w.slice(1) : w
}
function lower(t) {
  return t ? t.charAt(0).toLowerCase() + t.slice(1) : t
}
