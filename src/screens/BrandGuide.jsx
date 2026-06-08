import { useState } from 'react'

const COLOR_GROUPS = [
  {
    title: 'Backgrounds',
    tokens: [
      ['--paper', 'Paper'],
      ['--surface', 'Surface'],
      ['--surface-2', 'Surface 2'],
      ['--field', 'Field'],
    ],
  },
  {
    title: 'Ink / Text',
    tokens: [
      ['--ink', 'Ink'],
      ['--ink-2', 'Ink 2'],
      ['--ink-3', 'Ink 3'],
    ],
  },
  {
    title: 'Lines',
    tokens: [
      ['--line', 'Line'],
      ['--line-2', 'Line 2'],
      ['--line-strong', 'Line strong'],
    ],
  },
  {
    title: 'Inverted & accent',
    tokens: [
      ['--invert-bg', 'Invert bg'],
      ['--invert-ink', 'Invert ink'],
      ['--badge-fill', 'Badge fill'],
      ['--badge-ink', 'Badge ink'],
    ],
  },
]

const TYPE_SCALE = [
  { key: 'display', spec: 'Newsreader · 400 · 34px — titles', sample: 'Good morning, Maya', font: 'title', size: 32, weight: 400 },
  { key: 'headline', spec: 'Newsreader · 600 · 22px — headings', sample: 'Kael’s read of you', font: 'title', size: 22, weight: 600 },
  { key: 'voice', spec: 'Charter · 400 · 17px — Kael’s replies', sample: 'Let’s slow it down. What part hurts most right now?', font: 'serif', size: 17, weight: 400 },
  { key: 'quote', spec: 'Charter italic · 400 · 18px', sample: '“My needs are too much.”', font: 'serif', size: 18, weight: 400, italic: true },
  { key: 'body', spec: 'DM Sans · 400 · 15px — body & your messages', sample: 'You move toward closeness and read distance as risk.', font: 'sans', size: 15, weight: 400 },
  { key: 'label', spec: 'DM Sans · 600 · 11px · 0.08em · UPPER', sample: 'Bring a mood to Kael', font: 'sans', size: 11, weight: 600, upper: true },
]

function tokenValue(name) {
  if (typeof document === 'undefined') return ''
  const el = document.querySelector('.stage') || document.documentElement
  return getComputedStyle(el).getPropertyValue(name).trim()
}

export default function BrandGuide() {
  const [copied, setCopied] = useState('')

  function copy(text, key) {
    try {
      navigator.clipboard?.writeText(text)
    } catch {
      /* clipboard unavailable */
    }
    setCopied(key)
    setTimeout(() => setCopied((c) => (c === key ? '' : c)), 1100)
  }

  return (
    <div className="lib-page">
      <h1 className="lib-title">Brand</h1>
      <p className="lib-sub">Tap any value to copy it.</p>

      <span className="brand-h">Typeface</span>
      <p className="brand-note">A three-font system, each with one job.</p>
      <div className="brand-fonts">
        {[
          { token: '--title', name: 'Newsreader', role: 'Titles & headlines', sample: 'Aa' },
          { token: '--serif', name: 'Charter', role: 'Kael’s voice & reading prose', sample: 'Aa' },
          { token: '--sans', name: 'DM Sans', role: 'UI, labels & your messages', sample: 'Aa' },
        ].map((f) => (
          <button key={f.token} className="brand-font" onClick={() => copy(tokenValue(f.token), f.token)}>
            <span className="bf-sample" style={{ fontFamily: `var(${f.token})` }}>
              {f.sample}
            </span>
            <span className="bf-meta">
              <span className="bf-name" style={{ fontFamily: `var(${f.token})` }}>
                {f.name}
              </span>
              <span className="bf-role">{f.role}</span>
              <span className="bf-copy">{copied === f.token ? 'Copied!' : 'Click to copy font-family'}</span>
            </span>
          </button>
        ))}
      </div>

      <span className="brand-h">Type scale</span>
      <div className="brand-scale">
        {TYPE_SCALE.map((t) => (
          <button key={t.key} className="brand-type" onClick={() => copy(t.spec, t.key)}>
            <span
              className="bt-sample"
              style={{
                fontFamily: `var(--${t.font})`,
                fontSize: t.size,
                fontWeight: t.weight,
                fontStyle: t.italic ? 'italic' : 'normal',
                textTransform: t.upper ? 'uppercase' : 'none',
                letterSpacing: t.upper ? '0.08em' : '-0.01em',
              }}
            >
              {t.sample}
            </span>
            <span className="bt-spec">{copied === t.key ? 'Copied!' : t.spec}</span>
          </button>
        ))}
      </div>

      <span className="brand-h">Colour</span>
      {COLOR_GROUPS.map((group) => (
        <div className="brand-cgroup" key={group.title}>
          <span className="brand-cgroup-title">{group.title}</span>
          <div className="brand-swatches">
            {group.tokens.map(([token, label]) => (
              <button key={token} className="brand-swatch" onClick={() => copy(tokenValue(token), token)}>
                <span className="bs-chip" style={{ background: `var(${token})` }} />
                <span className="bs-meta">
                  <span className="bs-name">{label}</span>
                  <span className="bs-val">{copied === token ? 'Copied!' : tokenValue(token)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
