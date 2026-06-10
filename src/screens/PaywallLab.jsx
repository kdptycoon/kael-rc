import { useState, memo } from 'react'
import {
  X,
  Infinity as InfinityIcon,
  Brain,
  ArrowsClockwise,
  Anchor,
  ChatCircleDots,
  MagnifyingGlass,
  Heart,
  Wind,
  HandHeart,
  Quotes,
} from '@phosphor-icons/react'

/* ──────────────────────────────────────────────────────────────────────────
   Onboarding paywalls — chat-only product (unlimited chat + memory).
   Every variant is a benefit LIST (different list design each), no tiles.
   All copy is inline-editable (click to type). Memoized so selecting a plan
   never wipes your edits.
   Honest pricing: annual shows the real $99.99/year. 7-day trial on both.
   ────────────────────────────────────────────────────────────────────────── */

// Editable text node. memo + stable props => React never re-renders it,
// so contentEditable DOM edits survive parent re-renders (plan selection).
const Ed = memo(function Ed({ as: Tag = 'span', className, children }) {
  return (
    <Tag className={className ? `${className} pl-ed` : 'pl-ed'} contentEditable suppressContentEditableWarning spellCheck={false}>
      {children}
    </Tag>
  )
})

function Links() {
  return (
    <div className="pl-links">
      <button>Privacy</button>
      <i>·</i>
      <button>Terms</button>
      <i>·</i>
      <button>Restore</button>
    </div>
  )
}

function CloseX() {
  return (
    <button className="pl-x" aria-label="Close">
      <X size={20} weight="regular" />
    </button>
  )
}

function PlanStack({ plan, setPlan }) {
  return (
    <div className="pl-plans">
      <button className="pl-plan" data-on={plan === 'annual' || undefined} onClick={() => setPlan('annual')}>
        <span className="pl-plan-tag">Save 44%</span>
        <div className="pl-plan-l">
          <span className="pl-plan-name">Annual</span>
          <span className="pl-plan-sub">7 days free, then billed yearly</span>
        </div>
        <div className="pl-plan-r">
          <span className="pl-plan-price">$99.99</span>
          <span className="pl-plan-per">/year</span>
        </div>
      </button>
      <button className="pl-plan" data-on={plan === 'monthly' || undefined} onClick={() => setPlan('monthly')}>
        <div className="pl-plan-l">
          <span className="pl-plan-name">Monthly</span>
          <span className="pl-plan-sub">7 days free, then billed monthly</span>
        </div>
        <div className="pl-plan-r">
          <span className="pl-plan-price">$14.99</span>
          <span className="pl-plan-per">/month</span>
        </div>
      </button>
    </div>
  )
}

function PlanRow({ plan, setPlan }) {
  return (
    <div className="pl-plans-row">
      <button className="pl-mini" data-on={plan === 'annual' || undefined} onClick={() => setPlan('annual')}>
        <span className="pl-plan-tag">Save 44%</span>
        <span className="pl-mini-name">Annual</span>
        <span className="pl-mini-price">
          $99.99<i>/yr</i>
        </span>
        <span className="pl-mini-sub">7 days free</span>
      </button>
      <button className="pl-mini" data-on={plan === 'monthly' || undefined} onClick={() => setPlan('monthly')}>
        <span className="pl-mini-name">Monthly</span>
        <span className="pl-mini-price">
          $14.99<i>/mo</i>
        </span>
        <span className="pl-mini-sub">7 days free</span>
      </button>
    </div>
  )
}

function Cta({ children }) {
  return (
    <div className="ob-cta pl-cta" role="button">
      <Ed>{children}</Ed>
    </div>
  )
}

/* 01 · The Secure Plan — icon-chip list, capability benefits */
function VClassic() {
  const [plan, setPlan] = useState('annual')
  const feats = [
    { icon: InfinityIcon, t: 'Unlimited conversations', s: 'Every spiral and fight, no caps' },
    { icon: Brain, t: 'Kael remembers everything', s: 'Your people and patterns, never re-explain' },
    { icon: ArrowsClockwise, t: 'Spot the patterns you repeat', s: 'The triggers and beliefs running underneath' },
    { icon: Anchor, t: 'Build a secure foundation', s: 'Steadier reactions, one moment at a time' },
  ]
  return (
    <div className="ob-screen pl-screen" data-theme="light">
      <CloseX />
      <div className="pl-body">
        <Ed as="p" className="pl-kicker">Kael Premium</Ed>
        <Ed as="h1" className="pl-title">The Secure Plan</Ed>
        <Ed as="p" className="pl-lede">Unlimited access to the coach who remembers your whole story.</Ed>
        <div className="pl-feats">
          {feats.map((f) => (
            <div className="pl-feat" key={f.t}>
              <span className="pl-feat-ic">
                <f.icon size={22} weight="duotone" />
              </span>
              <div className="pl-feat-t">
                <Ed as="b">{f.t}</Ed>
                <Ed as="span">{f.s}</Ed>
              </div>
            </div>
          ))}
        </div>
        <PlanStack plan={plan} setPlan={setPlan} />
      </div>
      <footer className="pl-foot">
        <Cta>Start 7-day free trial</Cta>
        <Links />
      </footer>
    </div>
  )
}

/* 02 · Become the calm one — dark, numbered editorial list, outcome benefits */
function VMidnight() {
  const [plan, setPlan] = useState('annual')
  const feats = [
    { t: 'See the loop before it runs you', s: 'Catch the spiral while you still have a choice' },
    { t: 'Hear the belief underneath', s: 'The old story driving the reaction' },
    { t: 'Know your triggers', s: 'What sets you off, and why' },
    { t: 'Hold your ground, kindly', s: 'Stay secure without going cold' },
  ]
  return (
    <div className="ob-screen pl-screen" data-theme="dark">
      <CloseX />
      <div className="pl-body">
        <Ed as="p" className="pl-kicker">Kael Premium</Ed>
        <Ed as="h1" className="pl-title">Become the calm one.</Ed>
        <div className="pl-numlist">
          {feats.map((f, i) => (
            <div className="pl-num-row" key={f.t}>
              <span className="pl-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="pl-num-t">
                <Ed as="b">{f.t}</Ed>
                <Ed as="span">{f.s}</Ed>
              </div>
            </div>
          ))}
        </div>
        <PlanStack plan={plan} setPlan={setPlan} />
      </div>
      <footer className="pl-foot">
        <Cta>Start 7-day free trial</Cta>
        <Links />
      </footer>
    </div>
  )
}

/* 03 · Whenever you need it — hairline list, circular outline icons */
function VHairline() {
  const [plan, setPlan] = useState('annual')
  const feats = [
    { icon: ChatCircleDots, t: 'A coach in the hard moment', s: 'Bring the text, the fight, the silence' },
    { icon: InfinityIcon, t: 'Unlimited, whenever it hits', s: '2am spirals included' },
    { icon: Brain, t: 'It remembers your story', s: 'Every person, every chapter' },
    { icon: MagnifyingGlass, t: 'Decode what just happened', s: 'Separate the event from the fear' },
  ]
  return (
    <div className="ob-screen pl-screen" data-theme="light">
      <CloseX />
      <div className="pl-body">
        <Ed as="p" className="pl-kicker">Kael Premium</Ed>
        <Ed as="h1" className="pl-title">Kael, whenever you need it.</Ed>
        <Ed as="p" className="pl-lede">Unlimited support for the moments that actually trip you up.</Ed>
        <div className="pl-hlist">
          {feats.map((f) => (
            <div className="pl-hrow" key={f.t}>
              <span className="pl-hic">
                <f.icon size={20} weight="regular" />
              </span>
              <div className="pl-h-t">
                <Ed as="b">{f.t}</Ed>
                <Ed as="span">{f.s}</Ed>
              </div>
            </div>
          ))}
        </div>
        <PlanRow plan={plan} setPlan={setPlan} />
      </div>
      <footer className="pl-foot">
        <Cta>Start 7-day free trial</Cta>
        <Links />
      </footer>
    </div>
  )
}

/* 04 · Build something secure — enclosed soft-panel list, growth benefits */
function VPanel() {
  const [plan, setPlan] = useState('annual')
  const feats = [
    { icon: Heart, t: 'Understand how you love', s: 'Your attachment, mapped over time' },
    { icon: Quotes, t: 'Name what keeps repeating', s: 'The patterns, beliefs, and triggers' },
    { icon: Wind, t: 'Calm the spiral faster', s: 'Tools that settle your system' },
    { icon: Anchor, t: 'A foundation that holds', s: 'Become the secure one, for real' },
  ]
  return (
    <div className="ob-screen pl-screen" data-theme="light">
      <CloseX />
      <div className="pl-body">
        <span className="pl-badge pl-badge-warm">
          <HandHeart size={22} weight="duotone" />
        </span>
        <Ed as="h1" className="pl-title">Build something secure.</Ed>
        <Ed as="p" className="pl-lede">The work that turns the spiral into steady, lasting love.</Ed>
        <div className="pl-panel">
          {feats.map((f) => (
            <div className="pl-prow" key={f.t}>
              <span className="pl-pic">
                <f.icon size={20} weight="duotone" />
              </span>
              <div className="pl-p-t">
                <Ed as="b">{f.t}</Ed>
                <Ed as="span">{f.s}</Ed>
              </div>
            </div>
          ))}
        </div>
        <PlanRow plan={plan} setPlan={setPlan} />
      </div>
      <footer className="pl-foot">
        <Cta>Start my free trial</Cta>
        <Links />
      </footer>
    </div>
  )
}

const VARIANTS = [
  { id: 'classic', cap: '01 · The Secure Plan', note: 'Icon-chip list · capabilities', C: VClassic },
  { id: 'midnight', cap: '02 · Become the calm one', note: 'Dark, numbered list · outcomes', C: VMidnight },
  { id: 'hairline', cap: '03 · Whenever you need it', note: 'Hairline list · in-the-moment', C: VHairline },
  { id: 'panel', cap: '04 · Build something secure', note: 'Panel list · growth', C: VPanel },
]

export default function PaywallLab() {
  return (
    <div className="lib-page">
      <h1 className="lib-title">Paywalls</h1>
      <p className="lib-sub">Four benefit-list designs · unlimited chat with memory. Click any title, benefit, or button to edit the copy. Annual shows the real $99.99/year. 7-day trial on both.</p>
      <div className="pl-lab">
        {VARIANTS.map((v) => (
          <div className="pl-tile" key={v.id}>
            <v.C />
            <div className="pl-cap">
              <span className="pl-cap-name">{v.cap}</span>
              <span className="pl-cap-note">{v.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
