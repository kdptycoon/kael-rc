import { useEffect, useRef, useState } from 'react'
import {
  Sparkle,
  ArrowLeft,
  X,
  Check,
  CheckCircle,
  Lock,
  LockSimpleOpen,
  Anchor,
  Brain,
  Heart,
  Wind,
  House,
  UserCircle,
  ArrowsSplit,
  Waves,
  Lightning,
  ArrowsClockwise,
  BellSimple,
  Quotes,
  Scales,
  Eye,
  ChatCircle,
  GraduationCap,
  Path,
  CaretDown,
  ArrowCounterClockwise,
} from '@phosphor-icons/react'

/* ──────────────────────────────────────────────────────────────────────────
   Kael onboarding — v3. The 25-screen flow, every screen bespoke (ob2/ob3).
   Six quiz answers score into one of five named patterns → the reveal.
   ────────────────────────────────────────────────────────────────────────── */

const SCORE = {
  why: {
    'I’m overthinking someone': ['reassurance_loop', 'meaning_making_spiral'],
    'We keep fighting': ['defensive_strike'],
    'They feel distant': ['guarded_distance'],
    'I’m healing from someone': ['meaning_making_spiral'],
    'I keep choosing the wrong people': ['self_abandonment', 'guarded_distance'],
    'I want secure love': ['meaning_making_spiral'],
  },
  patternid: {
    'I chase clarity': ['reassurance_loop'],
    'I shut down': ['guarded_distance'],
    'I overthink small changes': ['meaning_making_spiral'],
    'I test people': ['defensive_strike'],
    'I ignore red flags': ['self_abandonment'],
    'I lose myself': ['self_abandonment'],
    'I choose unavailable people': ['guarded_distance'],
  },
  trigger: {
    'Slow replies': ['reassurance_loop'],
    'Emotional distance': ['guarded_distance'],
    'Mixed signals': ['meaning_making_spiral'],
    'Feeling ignored': ['reassurance_loop'],
    Criticism: ['defensive_strike'],
    'Someone needing space': ['guarded_distance'],
    'Unclear commitment': ['meaning_making_spiral'],
    'Feeling unwanted': ['self_abandonment'],
  },
  belief: {
    '“I’m too much.”': ['self_abandonment', 'reassurance_loop'],
    '“I have to earn love.”': ['self_abandonment'],
    '“People eventually leave.”': ['guarded_distance', 'reassurance_loop'],
    '“If they cared, they’d understand.”': ['defensive_strike'],
    '“I always choose wrong.”': ['meaning_making_spiral'],
    '“I’m hard to love.”': ['self_abandonment'],
  },
  reaction: {
    'Ask for reassurance': ['reassurance_loop'],
    'Over-explain': ['self_abandonment', 'meaning_making_spiral'],
    'Get angry': ['defensive_strike'],
    'Shut down': ['guarded_distance'],
    'Pretend I’m fine': ['self_abandonment'],
    'Pull away first': ['guarded_distance'],
    'Fix it instantly': ['reassurance_loop'],
    'Spiral silently': ['meaning_making_spiral'],
  },
  goal: {
    'Stop overthinking': ['reassurance_loop'],
    'Feel secure': ['meaning_making_spiral'],
    'Communicate better': ['self_abandonment'],
    'Choose better people': ['guarded_distance'],
    'Heal from someone': ['meaning_making_spiral'],
    'Stop repeating patterns': ['defensive_strike'],
    'Build something lasting': ['guarded_distance'],
    'Understand myself deeply': ['meaning_making_spiral'],
  },
}
const PATTERN_ORDER = ['reassurance_loop', 'meaning_making_spiral', 'self_abandonment', 'defensive_strike', 'guarded_distance']
const PATTERNS = {
  reassurance_loop: { name: 'The Reassurance Loop', line: 'You reach for clarity when what you need is safety.', explain: 'When connection feels uncertain, your system reads it as danger — so you reach out to close the gap. The relief is real, but brief.', trigger: 'A slow or one-word reply', move: 'Reaching out again to feel safe', fear: 'That the silence means it’s over' },
  meaning_making_spiral: { name: 'The Meaning-Making Spiral', line: 'You read meaning into small silences, then build the story before they reply.', explain: 'A small ambiguity becomes a full narrative before you notice. You’re not dramatic — you’re trying to feel prepared.', trigger: 'A slow or one-word response', move: 'Building the story ahead of the facts', fear: 'That the distance means it’s already over' },
  self_abandonment: { name: 'The Self-Abandonment Pattern', line: 'You keep the peace by disappearing a little.', explain: 'You read the room, soften, and over-give to stay connected — and your own needs go quiet until resentment speaks for them.', trigger: 'Tension, or someone’s disappointment', move: 'Shrinking to keep them close', fear: 'That the real you is too much' },
  defensive_strike: { name: 'The Defensive Strike', line: 'You protect yourself by getting there first.', explain: 'When you feel cornered or unseen, defending feels safer than being vulnerable. It guards the moment, but turns a rupture into a standoff.', trigger: 'Feeling blamed or unseen', move: 'Defending before you’re hurt', fear: 'Being controlled, or one-down' },
  guarded_distance: { name: 'The Guarded Distance', line: 'You go quiet to feel safe, and it reads as gone.', explain: 'When things intensify, withdrawing restores your control. It calms you — but the people who want you feel a door closing.', trigger: 'Pressure, or too much closeness', move: 'Withdrawing to steady yourself', fear: 'Being engulfed, or let down' },
}
function scorePattern(picks) {
  const tally = {}
  Object.keys(SCORE).forEach((id) => {
    const tags = picks[id] && SCORE[id] ? SCORE[id][picks[id]] : null
    if (tags) tags.forEach((p) => (tally[p] = (tally[p] || 0) + 1))
  })
  let best = PATTERN_ORDER[0]
  let bestN = -1
  PATTERN_ORDER.forEach((p) => { if ((tally[p] || 0) > bestN) { bestN = tally[p] || 0; best = p } })
  return best
}
const REFLECT = {
  'I’m overthinking someone': { title: 'When love feels uncertain, your mind starts looking for clues.', sub: 'That doesn’t mean you’re broken. It means part of you is trying to feel safe.' },
  'We keep fighting': { title: 'The fight is rarely about the thing you’re fighting about.', sub: 'Underneath it is a need that hasn’t been heard yet. Kael helps you find the words for it.' },
  'They feel distant': { title: 'Distance is confusing, because nothing obvious is wrong.', sub: 'But something in the connection went quiet. Kael helps you name it without bracing for the worst.' },
  'I’m healing from someone': { title: 'Letting go isn’t only missing them.', sub: 'It’s your mind making sense of what it meant. Kael helps you carry it more gently.' },
  'I keep choosing the wrong people': { title: 'Sometimes the pattern isn’t who you choose.', sub: 'It’s what feels familiar enough to be mistaken for chemistry. That can change.' },
  'I want secure love': { title: 'Security isn’t a person who never leaves. It’s a base you can stand on.', sub: 'Kael helps you build it from the inside, one steadier moment at a time.' },
}
const GOAL_ECHO = {
  'Stop overthinking': 'stop overthinking', 'Feel secure': 'feel secure in love', 'Communicate better': 'communicate without fear',
  'Choose better people': 'choose better people', 'Heal from someone': 'heal from someone', 'Stop repeating patterns': 'stop repeating the pattern',
  'Build something lasting': 'build something lasting', 'Understand myself deeply': 'understand yourself deeply',
}

const MOODS = [
  { name: 'Anxious', mood: 'anxious', temp: 'warm' }, { name: 'Hurt', mood: 'hurt', temp: 'warm' }, { name: 'Confused', mood: 'confused' },
  { name: 'Hopeful', mood: 'hopeful', temp: 'gold' }, { name: 'Distant', mood: 'distant' }, { name: 'Lonely', mood: 'lonely' },
  { name: 'Numb', mood: 'numb' }, { name: 'Overwhelmed', mood: 'overwhelmed', temp: 'warm' }, { name: 'Calm but unsure', mood: 'calm', temp: 'gold' },
]
function MoodGlyph({ mood }) {
  const s = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 1.6 }
  switch (mood) {
    case 'anxious': return <svg viewBox="0 0 44 44" className="ob3-mood-svg ob3-glyph-live ob3-g-jitter"><path d="M8 22c4-8 6 8 10 0s6-8 8 0 4 6 8-6" {...s} /></svg>
    case 'hurt': return <svg viewBox="0 0 44 44" className="ob3-mood-svg"><path d="M22 7l-3 10 5 6-4 8" {...s} /><circle cx="22" cy="37" r="1.8" className="ob3-g-fall" fill="currentColor" stroke="none" /></svg>
    case 'confused': return <svg viewBox="0 0 44 44" className="ob3-mood-svg"><path d="M10 34c6-6 6-12 12-14s6-8 0-9" {...s} /><path d="M22 20c5 2 9-1 12 3" {...s} strokeDasharray="2 3" /></svg>
    case 'hopeful': return <svg viewBox="0 0 44 44" className="ob3-mood-svg ob3-glyph-live ob3-g-rise"><path d="M14 32q8-4 16 0M22 30V16" {...s} /><path d="M22 11v6M19 14h6M19.7 11.7l4.6 4.6M24.3 11.7l-4.6 4.6" {...s} strokeWidth="1.3" /></svg>
    case 'distant': return <svg viewBox="0 0 44 44" className="ob3-mood-svg ob3-glyph-live ob3-g-drift"><circle cx="14" cy="22" r="3" fill="currentColor" stroke="none" /><circle cx="24" cy="22" r="1.6" fill="currentColor" stroke="none" opacity="0.5" /><circle cx="30" cy="22" r="1.4" fill="currentColor" stroke="none" opacity="0.3" /><circle cx="36" cy="22" r="1.2" fill="currentColor" stroke="none" opacity="0.15" /></svg>
    case 'lonely': return <svg viewBox="0 0 44 44" className="ob3-mood-svg"><circle cx="14" cy="30" r="3" className="ob3-glyph-live ob3-g-breathe" fill="currentColor" stroke="none" /><circle cx="30" cy="18" r="9" {...s} /></svg>
    case 'numb': return <svg viewBox="0 0 44 44" className="ob3-mood-svg"><path d="M9 22h26" {...s} /></svg>
    case 'overwhelmed': return <svg viewBox="0 0 44 44" className="ob3-mood-svg ob3-glyph-live ob3-g-press"><path d="M6 12h34M4 18h38M7 24h33M5 30h36M8 36h30" {...s} strokeWidth="1.4" /></svg>
    case 'calm': return <svg viewBox="0 0 44 44" className="ob3-mood-svg ob3-glyph-live ob3-g-wobble"><path d="M9 23h7c2 0 2-4 4-4s2 4 4 4 2 0 7 0" {...s} /></svg>
    default: return null
  }
}

const SCREENS = [
  { id: 'welcome', kind: 'welcome', cta: 'Begin' },
  { id: 'usecases', kind: 'usecases', kicker: 'KAEL IS FOR', title: 'For the messy parts of love', sub: 'Six of the places it gets loud. Tap the ones that feel like yours — or just sit with them.', cta: 'This is why I’m here' },
  { id: 'underneath', kind: 'underneath', kicker: 'HOW IT WORKS', title: 'Kael helps you see the pattern underneath', sub: 'Not generic advice. Kael helps you understand your triggers, beliefs, reactions, needs, and the loops you repeat in love.', cta: 'Continue' },
  { id: 'trust', kind: 'trust', centered: true, kicker: 'BEFORE WE BEGIN', title: 'A private space to be honest', sub: 'No judgment. No emotional noise. Just a clearer read of what is happening inside your relationships.', cta: 'I’m ready', micro: 'You can be as honest as you want. Nothing here is shared.' },
  { id: 'name', kind: 'input', flow: true, kicker: 'HELLO', title: 'What should Kael call you?', sub: 'This helps Kael speak to you more naturally.', placeholder: 'Your name', cta: 'Continue' },
  { id: 'age', kind: 'quiz', flow: true, auto: true, kicker: 'A LITTLE CONTEXT', title: 'How old are you?', sub: 'Love looks different at different stages of life.', options: [{ name: 'Under 18' }, { name: '18–24' }, { name: '25–34' }, { name: '35–44' }, { name: '45–54' }, { name: '55+' }] },
  { id: 'gender', kind: 'quiz', flow: true, auto: true, kicker: 'A LITTLE CONTEXT', title: 'How do you identify?', sub: 'This helps Kael understand you with more care.', options: [{ name: 'Woman' }, { name: 'Man' }, { name: 'Non-binary' }, { name: 'Self-describe' }, { name: 'Prefer not to say' }] },
  { id: 'status', kind: 'quiz', flow: true, auto: true, kicker: 'YOUR WORLD', title: 'What does your love life look like right now?', options: [{ name: 'Single', icon: UserCircle }, { name: 'Dating', icon: Sparkle }, { name: 'In a relationship', icon: Heart }, { name: 'Married', icon: House }, { name: 'Recently broken up', icon: Wind }, { name: 'A situationship', icon: ArrowsSplit }, { name: 'It’s complicated', icon: Waves }, { name: 'Trying to move on', icon: ArrowCounterClockwise }] },
  { id: 'emotional', kind: 'mood', flow: true, auto: true, kicker: 'RIGHT NOW', title: 'How are you sitting with it all?', sub: 'Start with what feels alive right now.', options: MOODS },
  { id: 'why', kind: 'quiz', flow: true, auto: true, kicker: 'WHY YOU’RE HERE', title: 'What brings you to Kael today?', options: [{ name: 'I’m overthinking someone', icon: Brain }, { name: 'We keep fighting', icon: Lightning }, { name: 'They feel distant', icon: Wind }, { name: 'I’m healing from someone', icon: Heart }, { name: 'I keep choosing the wrong people', icon: ArrowsClockwise }, { name: 'I want secure love', icon: Anchor }] },
  { id: 'reflect', kind: 'reflect', kicker: 'A REFLECTION', cta: 'That feels true' },
  { id: 'duration', kind: 'duration', flow: true, auto: true, kicker: 'THE WEIGHT', title: 'How long has this been weighing on you?', sub: 'The longer a pattern runs, the more normal it can start to feel.', options: [{ name: 'Today', desc: 'Right now, it’s loud' }, { name: 'A few days', desc: 'It keeps resurfacing' }, { name: 'Weeks', desc: 'It’s been sitting with me' }, { name: 'Months', desc: 'I’ve gotten used to carrying it' }, { name: 'Longer than I want to admit', desc: 'It’s just how things are now' }] },
  { id: 'patterns', kind: 'patterns', kicker: 'THE IDEA', title: 'Your reactions aren’t random', sub: 'Most relationship struggles follow a loop: something triggers you, your mind gives it meaning, you react, and something gets lost.', cta: 'Show me the loop' },
  { id: 'patternid', kind: 'quiz', flow: true, auto: true, kicker: 'YOUR PATTERN', title: 'Which of these feels most true?', options: [{ name: 'I chase clarity', icon: ArrowsClockwise }, { name: 'I shut down', icon: Wind }, { name: 'I overthink small changes', icon: Brain }, { name: 'I test people', icon: Scales }, { name: 'I ignore red flags', icon: Eye }, { name: 'I lose myself', icon: Waves }, { name: 'I choose unavailable people', icon: ArrowsSplit }] },
  { id: 'trigger', kind: 'quiz', flow: true, auto: true, kicker: 'YOUR TRIGGERS', title: 'What tends to activate you most?', sub: 'Triggers aren’t weaknesses. They point to what your system is trying to protect.', options: [{ name: 'Slow replies' }, { name: 'Emotional distance' }, { name: 'Mixed signals' }, { name: 'Feeling ignored' }, { name: 'Criticism' }, { name: 'Someone needing space' }, { name: 'Unclear commitment' }, { name: 'Feeling unwanted' }] },
  { id: 'belief', kind: 'quiz', flow: true, auto: true, belief: true, kicker: 'THE HIDDEN BELIEF', title: 'Which thought feels familiar?', sub: 'No one sees this but you.', options: [{ name: '“I’m too much.”' }, { name: '“I have to earn love.”' }, { name: '“People eventually leave.”' }, { name: '“If they cared, they’d understand.”' }, { name: '“I always choose wrong.”' }, { name: '“I’m hard to love.”' }] },
  { id: 'reaction', kind: 'quiz', flow: true, auto: true, kicker: 'YOUR DEFAULT MOVE', title: 'When you feel triggered, what do you usually do?', options: [{ name: 'Ask for reassurance' }, { name: 'Over-explain' }, { name: 'Get angry' }, { name: 'Shut down' }, { name: 'Pretend I’m fine' }, { name: 'Pull away first' }, { name: 'Fix it instantly' }, { name: 'Spiral silently' }] },
  { id: 'loop', kind: 'loopdiagram', kicker: 'THE LOOP', title: 'This is the loop Kael maps', cta: 'Continue' },
  { id: 'values', kind: 'constellation', flow: true, kicker: 'WHAT YOU WANT', title: 'In an ideal relationship, you feel…', sub: 'Choose the ones that ring true — pick as many as you want.', cta: 'Continue' },
  { id: 'goal', kind: 'quiz', flow: true, auto: true, kicker: 'YOUR GOAL', title: 'What do you want most right now?', options: [{ name: 'Stop overthinking' }, { name: 'Feel secure' }, { name: 'Communicate better' }, { name: 'Choose better people' }, { name: 'Heal from someone' }, { name: 'Stop repeating patterns' }, { name: 'Build something lasting' }, { name: 'Understand myself deeply' }] },
  { id: 'featuremap', kind: 'featuremap', kicker: 'YOUR MAP', title: 'Your answers become your relationship map', sub: 'Kael builds a living read of your triggers, beliefs, conflict style, values, needs, repeating loops, and growth path.', cta: 'Build my map', micro: 'Chat is live today. Your full map grows as you use it.' },
  { id: 'notify', kind: 'notify', kicker: 'ONE SMALL THING', title: 'Want Kael to check in gently?', sub: 'Get reminders to reflect, continue your growth, or pause before an old pattern takes over.', cta: 'Turn on reminders', cta2: 'Not now', micro: 'You can change this anytime.' },
  { id: 'analysis', kind: 'loading', title: 'Building your relationship profile', steps: ['Reading your answers', 'Finding your triggers', 'Mapping your loop', 'Understanding what you value', 'Preparing your first read'] },
  { id: 'reveal', kind: 'reveal', kicker: 'YOUR READ', cta: 'Unlock my full map', micro: 'Built from your answers. No one else sees this.' },
  { id: 'paywall', kind: 'paywall', cta: 'Start my free trial' },
]
const FLOW_TOTAL = SCREENS.filter((s) => s.flow).length
const VALUES = ['Chosen', 'Safe', 'Desired', 'Respected', 'Free', 'Understood', 'Calm', 'Playful', 'Emotionally close', 'Secure']
const VALUE_POS = [[16, 11], [55, 7], [80, 20], [30, 30], [68, 34], [10, 49], [46, 52], [85, 53], [33, 70], [70, 74]]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [name, setName] = useState('')
  const [picks, setPicks] = useState({ usecases: [], values: [] })
  const bodyRef = useRef(null)
  const advanceRef = useRef(null)

  const s = SCREENS[step]
  const total = SCREENS.length
  const last = step === total - 1
  const nm = name.trim()
  const under18 = picks.age === 'Under 18'

  const go = (n) => { const t = Math.max(0, Math.min(total - 1, n)); setDir(t >= step ? 1 : -1); setStep(t) }
  const next = () => (last ? go(0) : go(step + 1))

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    clearTimeout(advanceRef.current)
    if (s.kind === 'loading') { const t = setTimeout(() => go(step + 1), 4400); return () => clearTimeout(t) }
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (id, v) => setPicks((p) => ({ ...p, [id]: v }))
  const toggle = (id, v) => setPicks((p) => { const cur = p[id] || []; return { ...p, [id]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] } })
  function pickAuto(id, v) {
    pick(id, v)
    clearTimeout(advanceRef.current)
    advanceRef.current = setTimeout(() => { setDir(1); setStep((st) => Math.min(total - 1, st + 1)) }, 440)
  }

  const ready = (() => {
    if (s.kind === 'input') return nm.length > 0
    if (s.kind === 'constellation') return (picks.values || []).length > 0
    return true
  })()

  const isHero = ['welcome', 'trust', 'loading', 'notify'].includes(s.kind)
  const showHeader = s.kind !== 'welcome' && s.kind !== 'loading' && s.kind !== 'paywall'
  const showFooter = s.kind !== 'loading' && !s.auto && !(s.kind === 'paywall' && under18)
  const centered = s.centered || ['welcome', 'reflect', 'loading'].includes(s.kind)
  const flowIdx = s.flow ? SCREENS.filter((x) => x.flow).findIndex((x) => x.id === s.id) : -1

  return (
    <div className="lib-page ob2-page">
      <div className="ob-devbar">
        <span className="ob-dev-title">Onboarding · {step + 1}/{total} · {s.id}</span>
        <div className="ob-dev-controls">
          <button className="ob-dev-btn" onClick={() => go(step - 1)} disabled={step === 0}>Prev</button>
          <button className="ob-dev-btn" onClick={() => go(step + 1)} disabled={last}>Next</button>
          <select className="ob-dev-jump" value={step} onChange={(e) => go(Number(e.target.value))}>
            {SCREENS.map((sc, i) => (<option key={sc.id} value={i}>{i + 1}. {sc.id}</option>))}
          </select>
        </div>
      </div>

      <div className="ob2-stage">
        <div className="ob2-screen" data-theme="light">
          {showHeader && (
            <header className={`ob2-head${s.flow ? '' : ' ob2-head-min'}`}>
              <button className="ob2-back" onClick={() => go(step - 1)} aria-label="Back"><ArrowLeft size={22} /></button>
              {s.kicker && <span className="ob2-head-kicker">{s.kicker}</span>}
              {s.flow && (
                <div className="ob2-head-prog">
                  <div className="ob2-prog"><div className="ob2-prog-fill" style={{ width: `${((flowIdx + 1) / FLOW_TOTAL) * 100}%` }} /></div>
                  <span className="ob2-step">{flowIdx + 1} of {FLOW_TOTAL}</span>
                </div>
              )}
            </header>
          )}
          {s.kind === 'paywall' && (
            <header className="ob2-head ob2-head-min ob2-head-pw"><span className="ob2-head-kicker">UNLOCK</span><button className="ob2-close" onClick={next} aria-label="Close"><X size={20} /></button></header>
          )}

          <div className="ob2-body" ref={bodyRef}>
            <div key={step} data-dir={dir} className={`ob2-flow${centered ? ' ob2-flow-center' : ''}`}>
              <Body s={s} nm={nm} name={name} setName={setName} picks={picks} pick={pick} pickAuto={pickAuto} toggle={toggle} />
            </div>
          </div>

          {showFooter && (
            <footer className="ob2-foot">
              <button className="ob2-cta" onClick={next} disabled={!ready}>{s.cta}</button>
              {s.cta2 && <button className="ob2-cta-2" onClick={next}>{s.cta2}</button>}
              {s.micro && <p className="ob2-micro-foot">{s.micro}</p>}
            </footer>
          )}
        </div>
      </div>
    </div>
  )
}

function Titles({ s }) {
  return (
    <div className="ob2-titles">
      <h1 className="ob2-title">{s.title}</h1>
      {s.lede && <p className="ob2-lede">{s.lede}</p>}
      {s.sub && <p className="ob2-sub">{s.sub}</p>}
    </div>
  )
}

function Body({ s, nm, name, setName, picks, pick, pickAuto, toggle }) {
  switch (s.kind) {
    case 'welcome': return <Welcome s={s} />
    case 'usecases': return <UseCases s={s} picks={picks} toggle={toggle} />
    case 'underneath': return <Underneath s={s} />
    case 'trust': return <Trust s={s} />
    case 'input': return (<><Titles s={s} /><input className="ob2-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={s.placeholder} autoComplete="off" spellCheck={false} /></>)
    case 'quiz': return <OptionList s={s} picks={picks} pickAuto={pickAuto} />
    case 'mood': return <MoodPalette s={s} picks={picks} pickAuto={pickAuto} />
    case 'reflect': return <ReflectEcho picks={picks} />
    case 'duration': return <Plumb s={s} picks={picks} pickAuto={pickAuto} />
    case 'patterns': return <Patterns s={s} />
    case 'loopdiagram': return <LoopDiagram s={s} />
    case 'constellation': return <Constellation s={s} picks={picks} toggle={toggle} />
    case 'featuremap': return <FeatureMap s={s} />
    case 'notify': return (<div className="ob2-hero"><span className="ob2-badge ob2-badge-pop"><BellSimple size={26} weight="duotone" /></span><Titles s={s} /></div>)
    case 'loading': return <Loading s={s} nm={nm} />
    case 'reveal': return <Reveal s={s} nm={nm} picks={picks} />
    case 'paywall': return <Paywall s={s} picks={picks} />
    default: return null
  }
}

/* 1 · Welcome */
function Welcome({ s }) {
  return (
    <div className="ob2-hero">
      <div className="ob2-signal">
        <svg className="ob2-signal-field" viewBox="0 0 168 168" aria-hidden>
          <circle className="ob2-signal-ring" cx="84" cy="84" r="78" fill="none" />
          {[[38, 52], [60, 38], [108, 40], [130, 56], [46, 74], [122, 80], [96, 30]].map(([x, y], i) => (<circle key={i} className="ob2-signal-dot" style={{ animationDelay: `${0.1 + i * 0.07}s` }} cx={x} cy={y} r={2} />))}
          <path className="ob2-signal-wave" d="M20 92 H58 L66 70 L74 110 L82 84 L90 92 H148" fill="none" />
        </svg>
        <span className="ob2-signal-core"><Sparkle size={26} weight="fill" /></span>
      </div>
      <h1 className="ob2-title ob2-title-xl">Meet Kael</h1>
      <p className="ob2-lede">Your private coach for better relationships. Understand your patterns, calm the spirals, and build healthier love.</p>
      <span className="ob2-rule" />
      <p className="ob2-tagline">Calm. Clear. Secure.</p>
    </div>
  )
}

/* 2 · For the messy parts of love — constellation of worries */
const SCRAPS = [
  { label: 'Overthinking texts', text: '“Did that text come off wrong?”', pos: { left: '8px', top: '6px' }, rot: -3 },
  { label: 'Mixed signals', text: '“I can’t read what they want.”', pos: { right: '6px', top: '28px' }, rot: 2.5 },
  { label: 'Repeating fights', text: '“We’re having the same fight again.”', pos: { left: '0', top: '128px' }, rot: -1.5 },
  { label: 'Emotional distance', text: '“They feel further away lately.”', pos: { right: '0', top: '162px' }, rot: 2 },
  { label: 'Breakups', text: '“I don’t know how to let this end.”', pos: { left: '24px', bottom: '24px' }, rot: 3 },
  { label: 'Self-worth', text: '“Maybe I’m just too much.”', pos: { right: '28px', bottom: '2px' }, rot: -2.5 },
]
function UseCases({ s, picks, toggle }) {
  const on = picks.usecases || []
  return (
    <>
      <Titles s={s} />
      <div className="ob3-montage" data-claimed={on.length ? true : undefined}>
        <svg className="ob3-montage-web" viewBox="0 0 340 372" aria-hidden>
          <defs><radialGradient id="ob3glow"><stop offset="0" stopColor="var(--warm-proof)" stopOpacity="0.18" /><stop offset="1" stopColor="var(--warm-proof)" stopOpacity="0" /></radialGradient></defs>
          <circle cx="170" cy="186" r="58" fill="url(#ob3glow)" />
          {[[52, 56], [288, 70], [40, 196], [300, 232], [78, 330], [276, 356]].map(([x, y], i) => (
            <path key={i} className="ob3-thread" data-i={i} data-on={on.includes(SCRAPS[i].label) || undefined} d={`M${x} ${y} Q${(x + 170) / 2} ${(y + 186) / 2 + 20} 170 186`} />
          ))}
          <circle className="ob3-anchor-ring" cx="170" cy="186" r="44" fill="none" />
          <circle className="ob3-anchor-ring ob3-anchor-ring2" cx="170" cy="186" r="44" fill="none" />
        </svg>
        <span className="ob3-anchor"><Anchor size={22} weight="duotone" /></span>
        {SCRAPS.map((sc, i) => (
          <button key={sc.label} className="ob3-scrap" data-i={i} data-on={on.includes(sc.label) || undefined} style={{ ...sc.pos, '--rot': `${sc.rot}deg`, animationDelay: `${0.18 + i * 0.05}s` }} onClick={() => toggle('usecases', sc.label)}>
            <span className="ob3-scrap-text">{sc.text}</span>
            <span className="ob3-scrap-mark" />
          </button>
        ))}
      </div>
    </>
  )
}

/* 3 · The pattern underneath — waterline depth */
function Underneath({ s }) {
  return (
    <>
      <Titles s={s} />
      <figure className="ob3-depth">
        <span className="ob2-micro-label"><span className="ob3-surface-dot" /> What shows on the surface</span>
        <div className="ob3-bubble"><span className="ob3-bubble-ic"><Lightning size={15} weight="duotone" /></span><span className="ob3-bubble-text">“Why are you being so distant?”</span></div>
        <div className="ob3-waterline">
          <svg className="ob3-wl-svg" viewBox="0 0 337 28" preserveAspectRatio="none" aria-hidden><path className="ob3-wl" d="M0 15 Q42 6 84 15 T168 15 T252 15 T337 15" fill="none" /></svg>
          <span className="ob3-wl-tag"><CaretDown size={11} /> The layer beneath</span>
        </div>
        <div className="ob3-strata">
          <span className="ob3-spine-rail" /><span className="ob3-spine-thread" />
          {[{ icon: Lightning, k: 'TRIGGER', v: 'A slow, one-word reply' }, { icon: Quotes, k: 'BELIEF', v: '“If they pull back, I’m being left.”' }, { icon: ArrowsClockwise, k: 'REACTION & NEED', v: 'Reach out again · to feel safe' }].map((r) => (
            <div className="ob3-stratum" key={r.k}><span className="ob3-node"><r.icon size={15} weight="duotone" /></span><span className="ob3-stratum-body"><span className="ob3-stratum-k">{r.k}</span><span className="ob3-stratum-v">{r.v}</span></span></div>
          ))}
          <div className="ob3-loop-row">
            <svg className="ob3-loopmini" viewBox="0 0 44 44" aria-hidden><circle cx="22" cy="22" r="17" fill="none" stroke="var(--line-strong)" strokeWidth="2" /><circle className="ob3-loopmini-arc" cx="22" cy="22" r="17" fill="none" stroke="var(--badge-ink)" strokeWidth="2" strokeLinecap="round" strokeDasharray="107" strokeDashoffset="107" transform="rotate(-90 22 22)" /></svg>
            <span className="ob3-loop-cap">And the loop closes — until you can see it.</span>
          </div>
        </div>
      </figure>
    </>
  )
}

/* 4 · Trust sanctuary */
function Trust({ s }) {
  return (
    <div className="ob2-hero ob3-trust">
      <div className="ob3-trust-halo">
        <svg className="ob3-trust-field" viewBox="0 0 220 220" aria-hidden>
          <defs><radialGradient id="ob3trustglow"><stop offset="0" stopColor="var(--warm-proof)" stopOpacity="0.16" /><stop offset="1" stopColor="var(--warm-proof)" stopOpacity="0" /></radialGradient></defs>
          <circle cx="110" cy="110" r="46" fill="url(#ob3trustglow)" />
          <circle className="ob3-trust-ring" cx="110" cy="110" r="96" fill="none" />
          <circle className="ob3-trust-ring ob3-trust-ring-2" cx="110" cy="110" r="74" fill="none" />
          <circle className="ob3-trust-ring ob3-trust-ring-3" cx="110" cy="110" r="52" fill="none" />
        </svg>
        <span className="ob3-trust-core"><LockSimpleOpen size={26} weight="regular" /></span>
      </div>
      <Titles s={s} />
      <div className="ob3-trust-assure">
        <span className="ob3-trust-rail" />
        {[{ icon: Scales, k: 'No judgment', d: 'Kael reflects, it never grades you.' }, { icon: Waves, k: 'No emotional noise', d: 'Just the signal under the story.' }, { icon: Eye, k: 'A clearer read', d: 'Of what’s happening inside your relationships.' }].map((v) => (
          <div className="ob3-trust-vow" key={v.k}><span className="ob3-trust-tile"><v.icon size={19} weight="duotone" /></span><span className="ob3-trust-vow-text"><span className="ob3-trust-vow-k">{v.k}</span><span className="ob3-trust-vow-d">{v.d}</span></span></div>
        ))}
      </div>
    </div>
  )
}

/* shared option list (quiz) */
function OptionList({ s, picks, pickAuto, pick }) {
  const onPick = s.auto ? (v) => pickAuto(s.id, v) : (v) => pick(s.id, v)
  return (
    <>
      <Titles s={s} />
      <div className="ob2-options">
        {s.options.map((o) => {
          const on = picks[s.id] === o.name
          return (
            <button key={o.name} className="ob2-option" data-on={on || undefined} data-belief={s.belief || undefined} onClick={() => onPick(o.name)}>
              {o.icon && <span className="ob2-option-ic"><o.icon size={20} weight="duotone" /></span>}
              <span className="ob2-option-body"><span className="ob2-option-title">{o.name}</span>{o.desc && <span className="ob2-option-desc">{o.desc}</span>}</span>
              <span className="ob2-option-check"><Check size={13} weight="bold" /></span>
            </button>
          )
        })}
      </div>
    </>
  )
}

/* 9 · Mood palette */
function MoodPalette({ s, picks, pickAuto }) {
  const sel = picks.emotional
  return (
    <>
      <Titles s={s} />
      <div className="ob3-palette">
        {s.options.map((m) => {
          const on = sel === m.name
          return (
            <button key={m.name} className="ob3-mood" data-on={on || undefined} data-mood={m.mood} data-temp={m.temp || undefined} data-dim={sel && !on ? true : undefined} onClick={() => pickAuto('emotional', m.name)}>
              <span className="ob3-mood-glyph"><MoodGlyph mood={m.mood} /></span>
              <span className="ob3-mood-name">{m.name}</span>
              <span className="ob3-mood-check"><Check size={12} weight="bold" /></span>
              {on && <span className="ob3-ripple" />}
            </button>
          )
        })}
      </div>
    </>
  )
}

/* 11 · Reflection echo */
function ReflectEcho({ picks }) {
  const why = picks.why
  const r = (why && REFLECT[why]) || REFLECT['I want secure love']
  const quote = why || 'I want secure love.'
  return (
    <div className="ob2-echo-screen">
      <span className="ob2-badge ob2-badge-sm ob2-badge-pop"><Quotes size={22} weight="duotone" /></span>
      <div className="ob2-echo">
        <svg className="ob2-echo-line" viewBox="0 0 14 92" aria-hidden><path d="M7 86 C7 60 7 46 7 30" fill="none" /><circle cx="7" cy="86" r="3" className="ob2-echo-dot" /><circle cx="7" cy="26" r="4.5" className="ob2-echo-node" /></svg>
        <p className="ob2-micro-label">You said</p>
        <p className="ob2-echo-quote">“{quote}”</p>
      </div>
      <h1 className="ob2-title ob2-reflect-title">{r.title}</h1>
      <p className="ob2-lede">{r.sub}</p>
    </div>
  )
}

/* 12 · Duration plumb line */
function Plumb({ s, picks, pickAuto }) {
  const idx = s.options.findIndex((o) => o.name === picks.duration)
  const cys = [44, 116, 188, 260, 332]
  const bobY = idx >= 0 ? cys[idx] - 8 : cys[0] - 8
  return (
    <>
      <Titles s={s} />
      <div className="ob3-plumb">
        <svg className="ob3-plumb-thread" viewBox="0 0 18 360" preserveAspectRatio="none" aria-hidden>
          <defs><linearGradient id="ob3-weight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--ink-3)" stopOpacity="0.35" /><stop offset="1" stopColor="var(--ink)" stopOpacity="0.9" /></linearGradient></defs>
          <path className="ob3-thread-base" d="M9 8 V352" />
          <path className="ob3-thread-load" d="M9 8 V352" />
          {cys.map((cy, i) => (<circle key={i} className="ob3-pnode" data-on={idx === i || undefined} cx="9" cy={cy} r={3 + i * 0.7} fill={idx >= i ? 'var(--ink)' : 'none'} stroke="var(--ink-3)" strokeWidth="1.5" style={{ animationDelay: `${0.18 + i * 0.07}s` }} />))}
          <path className="ob3-plumb-bob" d="M9 0 C5.1 5 5.1 9.5 9 13 C12.9 9.5 12.9 5 9 0 Z" fill="var(--warm-proof)" style={{ transform: `translateY(${bobY}px)` }} />
        </svg>
        <div className="ob2-options">
          {s.options.map((o, i) => {
            const on = picks.duration === o.name
            return (
              <button key={o.name} className="ob2-option" data-plumb data-d={i} data-on={on || undefined} onClick={() => pickAuto('duration', o.name)}>
                <span className="ob2-option-body"><span className="ob2-option-title">{o.name}</span><span className="ob2-option-desc">{o.desc}</span></span>
                <span className="ob2-option-check ob2-check-top"><Check size={13} weight="bold" /></span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

/* 13 · Patterns teaching */
function Patterns({ s }) {
  return (
    <div className="ob2-hero ob3-patterns">
      <span className="ob3-loopglyph">
        <svg viewBox="0 0 80 80" aria-hidden>
          <circle className="ob3-loopglyph-arc" cx="40" cy="40" r="30" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeDasharray="188" strokeDashoffset="40" />
          <path d="M62 26 l4 6 -7 1" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <Titles s={s} />
      <div className="ob3-loopmini-row">
        {['Trigger', 'Story', 'Reaction', 'Cost'].map((w, i) => (<span key={w} className="ob3-loopmini-chip">{w}{i < 3 && <i>→</i>}</span>))}
      </div>
    </div>
  )
}

/* 18 · The loop Kael maps */
function LoopDiagram({ s }) {
  const nodes = [{ i: '01', label: 'Trigger', pos: { left: '50%', top: '14%' } }, { i: '02', label: 'Belief', key: 'belief', pos: { left: '86%', top: '40%' } }, { i: '03', label: 'Reaction', pos: { left: '50%', top: '86%' } }, { i: '04', label: 'Cost', pos: { left: '15%', top: '40%' } }]
  return (
    <>
      <Titles s={s} />
      <div className="ob3-loop">
        <div className="ob3-loop-stage">
          <svg className="ob3-loop-svg" viewBox="0 0 290 300" aria-hidden>
            <path className="ob3-loop-thread" d="M145 42 C205 42 246 70 246 120 C246 168 205 210 145 258 C92 258 56 168 44 120" />
            <path className="ob3-loop-return" d="M44 120 C42 78 92 46 138 42" />
            <path className="ob3-loop-arrow" d="M132 38 l8 4 -6 4" />
            <circle className="ob3-loop-pulse" r="3.5" />
          </svg>
          <span className="ob3-loop-halo" />
          <div className="ob3-loop-hub"><span className="ob3-loop-hub-ring" /><span>THE LOOP</span></div>
          {nodes.map((n) => (
            <span key={n.label} className="ob3-loop-node" data-key={n.key || undefined} style={n.pos}><span className="ob3-loop-dot" /><span className="ob3-loop-idx">{n.i}</span><span className="ob3-loop-label">{n.label}</span></span>
          ))}
        </div>
      </div>
      <figure className="ob2-quote"><span className="ob2-quote-mark"><Quotes size={18} weight="duotone" /></span><blockquote className="ob2-quote-text">The goal is not to judge the reaction. It is to understand what it protects, what it costs, and what can change.</blockquote></figure>
    </>
  )
}

/* 19 · Values constellation */
function Constellation({ s, picks, toggle }) {
  const lit = picks.values || []
  const litPts = VALUES.map((v, i) => ({ v, x: VALUE_POS[i][0], y: VALUE_POS[i][1] })).filter((p) => lit.includes(p.v))
  return (
    <>
      <Titles s={s} />
      <div className="ob3-constellation">
        <svg className="ob3-const-field" viewBox="0 0 330 318" aria-hidden>
          {[[60, 40], [150, 96], [250, 60], [110, 200], [280, 210], [40, 150], [200, 280]].map(([x, y], i) => (<circle key={i} className="ob3-dust" cx={x} cy={y} r="1.1" fill="var(--line-strong)" style={{ animationDelay: `${i * 0.06}s` }} />))}
          {litPts.slice(1).map((p, i) => { const a = litPts[i]; const x1 = (a.x / 100) * 330, y1 = (a.y / 100) * 318, x2 = (p.x / 100) * 330, y2 = (p.y / 100) * 318; const len = Math.hypot(x2 - x1, y2 - y1); return <line key={p.v} className="ob3-thread" x1={x1} y1={y1} x2={x2} y2={y2} style={{ strokeDasharray: len, strokeDashoffset: len }} /> })}
        </svg>
        {VALUES.map((v, i) => {
          const on = lit.includes(v)
          return (
            <button key={v} className="ob3-star" data-on={on || undefined} style={{ left: `${VALUE_POS[i][0]}%`, top: `${VALUE_POS[i][1]}%`, animationDelay: `${i * 0.05}s` }} onClick={() => toggle('values', v)}>
              <span className="ob3-star-mark"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 2 C12.6 7.5 16.5 11.4 22 12 C16.5 12.6 12.6 16.5 12 22 C11.4 16.5 7.5 12.6 2 12 C7.5 11.4 11.4 7.5 12 2 Z" /></svg></span>
              <span className="ob3-star-label">{v}</span>
            </button>
          )
        })}
        <span className="ob3-const-count">{lit.length ? `${lit.length} lit` : 'Tap a star'}</span>
      </div>
    </>
  )
}

/* 21 · Feature map (full vision) */
function FeatureMap({ s }) {
  const feats = [
    { icon: UserCircle, t: 'You', d: 'A living read of your patterns, beliefs, and needs.', soon: true },
    { icon: Path, t: 'Journey', d: 'Your progress over time, charted as you grow.', soon: true },
    { icon: GraduationCap, t: 'Lessons', d: 'Practices matched to your exact patterns.', soon: true },
    { icon: ChatCircle, t: 'Chat', d: 'Talk it through with a Kael that remembers.', live: true },
  ]
  return (
    <>
      <Titles s={s} />
      <div className="ob3-map">
        <svg viewBox="0 0 320 188" aria-hidden>
          <defs><radialGradient id="ob3mapglow"><stop offset="0" stopColor="var(--warm-proof)" stopOpacity="0.2" /><stop offset="1" stopColor="var(--warm-proof)" stopOpacity="0" /></radialGradient></defs>
          {[[110, 42], [96, 120], [210, 52], [226, 128], [138, 150], [188, 46], [84, 92], [236, 90]].map(([x, y], i) => (<circle key={i} className="ob3-seed" cx={x} cy={y} r="1.6" style={{ animationDelay: `${0.06 + i * 0.035}s` }} />))}
          <circle cx="160" cy="96" r="58" fill="url(#ob3mapglow)" />
          {[['M146 84 Q96 64 58 50'], ['M174 84 Q224 64 262 50'], ['M146 108 Q96 132 58 146'], ['M174 108 Q224 132 262 146']].map(([d], i) => (<path key={i} className="ob3-thread" d={d} style={{ strokeDasharray: 120, strokeDashoffset: 120, animationDelay: `${0.3 + i * 0.12}s` }} />))}
          {[[58, 50], [262, 50], [58, 146], [262, 146]].map(([x, y], i) => (<circle key={i} className="ob3-mnode" cx={x} cy={y} r="15" fill="var(--badge-fill)" stroke="var(--warm-proof)" strokeWidth="1.3" style={{ animationDelay: `${0.62 + i * 0.12}s` }} />))}
          <circle cx="160" cy="96" r="21" fill="var(--surface)" stroke="var(--warm-proof)" strokeWidth="1.5" />
        </svg>
        <span className="ob3-map-core"><Anchor size={18} weight="duotone" /></span>
        {[{ x: 18, y: 27, t: 'You' }, { x: 82, y: 27, t: 'Journey' }, { x: 18, y: 78, t: 'Lessons' }, { x: 82, y: 78, t: 'Chat' }].map((l) => (<span key={l.t} className="ob3-map-label" style={{ left: `${l.x}%`, top: `${l.y}%` }}>{l.t}</span>))}
      </div>
      <span className="ob2-micro-label ob3-map-seclabel">Four parts of your map</span>
      <div className="ob2-features">
        {feats.map((f) => (
          <div className="ob2-feature" key={f.t}>
            <span className="ob2-feature-ic"><f.icon size={20} weight="duotone" /></span>
            <span className="ob2-feature-body"><span className="ob2-feature-title">{f.t}</span><span className="ob2-feature-desc">{f.d}</span></span>
            <span className="ob3-status" data-live={f.live || undefined}>{f.live ? 'Live now' : 'Soon'}</span>
          </div>
        ))}
      </div>
    </>
  )
}

/* 23 · Loading */
function Loading({ s, nm }) {
  const [done, setDone] = useState(0)
  useEffect(() => { const iv = setInterval(() => setDone((d) => Math.min(s.steps.length, d + 1)), 850); return () => clearInterval(iv) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="ob2-loading">
      <span className="ob2-badge ob2-badge-spin"><Sparkle size={24} weight="fill" /></span>
      <h1 className="ob2-title ob2-center">{s.title}{nm ? `, ${cap(nm)}` : ''}</h1>
      <div className="ob2-loadsteps">
        {s.steps.map((st, i) => (<div className="ob2-loadstep" data-done={i < done || undefined} key={st}><span className="ob2-loadcheck">{i < done ? <Check size={12} weight="bold" /> : <span className="ob2-loaddot" />}</span>{st}</div>))}
      </div>
    </div>
  )
}

/* 24 · Reveal */
function Reveal({ s, nm, picks }) {
  const p = PATTERNS[scorePattern(picks)]
  const insights = [{ icon: Lightning, k: 'Likely trigger', v: p.trigger }, { icon: ArrowsClockwise, k: 'Default move', v: p.move }, { icon: Anchor, k: 'Hidden fear', v: p.fear }]
  const locked = ['Your full relationship map', 'Your conflict pattern', 'Your growth path', 'Lessons matched to you', 'Journey progress over time', 'Chat that remembers']
  return (
    <>
      <div className="ob2-reveal-medallion">
        <svg viewBox="0 0 120 120" aria-hidden>
          <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
          <circle className="ob2-reveal-arc" cx="60" cy="60" r="52" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeDasharray="327" strokeDashoffset="98" transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="27" fill="var(--badge-ink)" opacity="0.1" />
          {Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * Math.PI * 2; return <circle key={i} className="ob2-reveal-pt" style={{ animationDelay: `${0.12 + i * 0.03}s` }} cx={(60 + Math.cos(a) * 47).toFixed(1)} cy={(60 + Math.sin(a) * 47).toFixed(1)} r="2.2" fill="var(--ink-3)" /> })}
          <circle cx="60" cy="60" r="21" fill="var(--surface)" stroke="var(--line-2)" />
        </svg>
        <span className="ob2-reveal-anchor"><Anchor size={20} weight="duotone" /></span>
      </div>
      <div className="ob2-titles">
        <span className="ob2-patternchip"><Sparkle size={13} weight="fill" /> Your read · {p.name}</span>
        <h1 className="ob2-title">{nm ? `${cap(nm)}, ${low(p.line)}` : p.line}</h1>
        <p className="ob2-lede ob2-reveal-explain">{p.explain}</p>
      </div>
      <div className="ob2-insights">
        {insights.map((i) => (<div className="ob2-insight" key={i.k}><span className="ob2-insight-ic"><i.icon size={18} weight="duotone" /></span><span className="ob2-insight-t"><span className="ob2-insight-k">{i.k}</span><span className="ob2-insight-v">{i.v}</span></span></div>))}
      </div>
      <div className="ob2-locked">
        <span className="ob2-locked-head"><Lock size={12} weight="fill" /> The full map</span>
        {locked.map((l) => (<div className="ob2-locked-row" key={l}><span className="ob2-locked-tile" /><span className="ob2-locked-text">{l}</span><Lock size={15} weight="fill" className="ob2-locked-lock" /></div>))}
      </div>
    </>
  )
}

/* 25 · Paywall */
function Paywall({ s, picks }) {
  const [plan, setPlan] = useState('annual')
  const p = PATTERNS[scorePattern(picks)]
  const goal = GOAL_ECHO[picks.goal]
  const under18 = picks.age === 'Under 18'
  if (under18) {
    return (<div className="ob2-hero"><span className="ob2-badge ob2-badge-pop"><Heart size={24} weight="duotone" /></span><h1 className="ob2-title ob2-center">Kael isn’t available for you just yet.</h1><p className="ob2-lede ob2-center">Kael is built for adults navigating adult relationships. Thank you for your honesty — please come back when you’re 18.</p></div>)
  }
  return (
    <div className="ob2-pw">
      <span className="ob2-badge ob2-badge-sm ob2-badge-pop"><Sparkle size={20} weight="fill" /></span>
      <h1 className="ob2-title ob2-center">Unlock your relationship map</h1>
      <p className="ob2-lede ob2-center">{goal ? `You said you want to ${goal}. ` : ''}Get your full pattern map, personalized lessons, Journey tracking, and private coaching with memory.</p>
      <div className="ob2-checks">
        {[`Your ${p.name.replace(/^The /, '')}, fully mapped`, 'Unlimited chat with Kael', 'Triggers and beliefs', 'Conflict insights', 'Lessons matched to you', 'Journey progress'].map((v) => (<div className="ob2-checkrow" key={v}><CheckCircle size={22} weight="fill" /><span>{v}</span></div>))}
      </div>
      <div className="ob2-tl">
        <span className="ob2-tl-head">How your free trial works</span>
        <div className="ob2-tl-row"><span className="ob2-tl-d">Today</span><span className="ob2-tl-t">Full access to your map and Kael chat.</span></div>
        <div className="ob2-tl-row"><span className="ob2-tl-d">Day 5</span><span className="ob2-tl-t">We’ll remind you the trial is ending.</span></div>
        <div className="ob2-tl-row"><span className="ob2-tl-d">Day 7</span><span className="ob2-tl-t">It renews, only if you stay.</span></div>
      </div>
      <button className="ob2-plan" data-on={plan === 'annual' || undefined} onClick={() => setPlan('annual')}><span className="ob2-plan-tag">Save 44%</span><span className="ob2-plan-l"><span className="ob2-plan-name">Annual</span><span className="ob2-plan-sub">7 days free, then billed yearly</span></span><span className="ob2-plan-r"><span className="ob2-plan-price">$99.99</span><span className="ob2-plan-per">/year</span></span></button>
      <button className="ob2-plan" data-on={plan === 'monthly' || undefined} onClick={() => setPlan('monthly')}><span className="ob2-plan-l"><span className="ob2-plan-name">Monthly</span><span className="ob2-plan-sub">7 days free, then billed monthly</span></span><span className="ob2-plan-r"><span className="ob2-plan-price">$14.99</span><span className="ob2-plan-per">/month</span></span></button>
      <p className="ob2-footlinks ob2-pw-links"><a>Privacy</a> · <a>Terms</a> · <a>Restore</a></p>
    </div>
  )
}

function cap(w) { return w ? w.charAt(0).toUpperCase() + w.slice(1) : w }
function low(w) { return w ? w.charAt(0).toLowerCase() + w.slice(1) : w }
