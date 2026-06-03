import { useRef } from 'react'
import BottomNav from '../components/BottomNav.jsx'
import {
  ChevronRight,
  ArrowUpRight,
  Sparkle,
  Anchor,
  HandHeart,
  Shield,
  Quote,
  Spiral,
  MoodAnxious,
  Send,
  Bookmark,
  Download,
} from '../components/Icons.jsx'

// A single gallery cell: shows a component and exports just that node as PNG.
function LibItem({ label, name, wide = false, children }) {
  const ref = useRef(null)

  async function download() {
    const node = ref.current
    if (!node) return
    const { toPng } = await import('html-to-image')
    const dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true })
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `component-${name}.png`
    a.click()
  }

  return (
    <div className={`lib-item${wide ? ' lib-item-wide' : ''}`}>
      <div className="lib-head">
        <span className="lib-label">{label}</span>
        <button className="lib-dl" onClick={download}>
          <Download size={14} sw={1.7} />
          PNG
        </button>
      </div>
      <div className="lib-frame" ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default function ComponentLibrary() {
  return (
    <div className="lib-page">
      <h1 className="lib-title">Component library</h1>
      <p className="lib-sub">
        Tap PNG on any block to export it at 3× into the screenshots folder.
      </p>

      <div className="lib-grid">
        <LibItem label="Essence card" name="essence" wide>
          <div className="mhero">
            <span className="mhero-eyebrow">The shape of it</span>
            <span className="mhero-headline">
              You reach for clarity when you really need to feel safe.
            </span>
            <span className="mhero-support">
              The fight with A, the slow replies, the midnight rereads. Same moment repeating.
            </span>
            <span className="mhero-go">
              Read the full picture
              <ChevronRight size={15} sw={1.7} />
            </span>
          </div>
        </LibItem>

        <LibItem label="Attachment spectrum" name="how-you-love">
          <div className="mcard">
            <span className="mcard-head">
              <span className="mcard-title">How you love</span>
              <span className="mcard-go">
                <ChevronRight size={16} sw={1.6} />
              </span>
            </span>
            <div className="snap-track">
              <span className="snap-marker" />
            </div>
            <div className="snap-ends">
              <span>Anxious</span>
              <span>Secure</span>
              <span>Avoidant</span>
            </div>
            <span className="mcard-detail">
              Anxious-leaning: you move toward closeness and read distance as risk.
            </span>
          </div>
        </LibItem>

        <LibItem label="Pattern card" name="pattern">
          <div className="mcard">
            <span className="mcard-head">
              <span className="mcard-title">Reassurance loop</span>
              <span className="mcard-count">8×</span>
            </span>
            <div className="snap-bar-track">
              <div className="snap-bar-fill" style={{ width: '100%' }} />
            </div>
            <span className="mcard-detail">
              You seek clarity fast when closeness feels uncertain.
            </span>
          </div>
        </LibItem>

        <LibItem label="Belief card" name="belief">
          <div className="mcard">
            <span className="belief-head">
              <span className="belief-quote">“My needs are too much.”</span>
              <span className="mcard-go">
                <ChevronRight size={16} sw={1.6} />
              </span>
            </span>
            <span className="belief-truth">
              <span className="bt-label">The truth</span>
              <span className="bt-text">
                They were never too much. Being asked to shrink them was.
              </span>
            </span>
          </div>
        </LibItem>

        <LibItem label="Values grid" name="values">
          <div className="mcard">
            <span className="mcard-head">
              <span className="mcard-title">What you value</span>
              <span className="mcard-go">
                <ChevronRight size={16} sw={1.6} />
              </span>
            </span>
            <div className="snap-values">
              {[
                { label: 'Consistency', gloss: 'actions matching words', Icon: Anchor },
                { label: 'Closeness', gloss: 'depth, not surface', Icon: HandHeart },
                { label: 'Emotional safety', gloss: 'room to be real', Icon: Shield },
                { label: 'Honesty', gloss: 'no mixed signals', Icon: Quote },
              ].map(({ label, gloss, Icon }) => (
                <span className="value-tile" key={label}>
                  <span className="vt-ic">
                    <Icon size={16} sw={1.6} />
                  </span>
                  <span className="vt-text">
                    <span className="vt-label">{label}</span>
                    <span className="vt-gloss">{gloss}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </LibItem>

        <LibItem label="Dynamic card" name="dynamic">
          <div className="mcard">
            <span className="mcard-head">
              <span className="mcard-title">With A</span>
              <span className="mcard-go">
                <ChevronRight size={16} sw={1.6} />
              </span>
            </span>
            <span className="mcard-detail">
              Warmth, then distance. You chase clarity when it turns inconsistent.
            </span>
            <span className="mcard-feel">Hopeful · Anxious · Hyper-alert</span>
          </div>
        </LibItem>

        <LibItem label="Growth edge" name="growth-edge" wide>
          <div className="growth-edge">
            <span className="ge-eyebrow">Your growth edge</span>
            <p className="ge-text">
              Choose consistency over chemistry. Ask once, then watch what they do.
            </p>
            <span className="ge-cta">
              Practice with Kael
              <ArrowUpRight size={16} sw={1.7} />
            </span>
          </div>
        </LibItem>

        <LibItem label="Trigger chips" name="triggers">
          <div className="snap-chips">
            {['Delayed replies', 'Mixed signals', 'Feeling dismissed', 'Not being chosen'].map(
              (t) => (
                <span className="snap-chip" key={t}>
                  {t}
                </span>
              ),
            )}
          </div>
        </LibItem>

        <LibItem label="Mood tile" name="mood-tile">
          <div className="lib-center">
            <span className="mood-tile" style={{ width: 150 }}>
              <span className="mt-ic">
                <MoodAnxious size={22} sw={1.5} />
              </span>
              <span className="mt-name">Anxious</span>
            </span>
          </div>
        </LibItem>

        <LibItem label="Situation pill" name="situation-pill">
          <div className="lib-center">
            <span className="way-pill">
              <span className="way-ic">
                <Spiral size={16} sw={1.6} />
              </span>
              I’m spiraling
            </span>
          </div>
        </LibItem>

        <LibItem label="From Kael card" name="from-kael">
          <div className="fk-card">
            <span className="fk-mark">
              <Sparkle size={15} sw={1.5} />
            </span>
            <span className="fk-text">
              You replayed the fight with A twice yesterday. What shifted the second time?
            </span>
            <span className="fk-action">
              Reflect
              <ArrowUpRight size={14} sw={1.7} />
            </span>
          </div>
        </LibItem>

        <LibItem label="Pick-up box" name="pickup" wide>
          <div className="pickup">
            <span className="pickup-q">What’s alive right now?</span>
            <div className="pickup-field">
              <span className="pickup-input" style={{ color: 'var(--ink-3)' }}>
                Say it out loud, or just start typing…
              </span>
              <span className="pickup-send">
                <Send size={18} sw={1.7} />
              </span>
            </div>
          </div>
        </LibItem>

        <LibItem label="Chat bubbles" name="chat-bubbles" wide>
          <div>
            <div className="msg user">
              <div className="bubble-user">He said he needs space and now I’m spiraling.</div>
              <span className="stamp">9:32 am</span>
            </div>
            <div className="msg kael" style={{ marginTop: 14 }}>
              <span className="kmark">
                <Sparkle size={16} sw={1.5} />
              </span>
              <div className="bubble-kael">
                Let’s slow it down. What part hurts most: the distance, or what it seems to mean?
              </div>
            </div>
          </div>
        </LibItem>

        <LibItem label="Lesson row" name="lesson-row" wide>
          <div className="litem" style={{ borderTop: 0 }}>
            <div className="li-open" style={{ padding: '4px 38px 4px 0' }}>
              <span className="li-kicker">For the hot-and-cold</span>
              <span className="li-title">Why inconsistent warmth feels addictive</span>
              <span className="li-dek">
                The science of why “sometimes” hooks you harder than “always.”
              </span>
              <span className="li-meta">9 min read</span>
            </div>
            <span className="li-save">
              <Bookmark size={16} />
            </span>
          </div>
        </LibItem>

        <LibItem label="Bottom nav" name="bottom-nav" wide>
          <div style={{ position: 'relative', paddingTop: 22 }}>
            <BottomNav active="home" onSelect={() => {}} />
          </div>
        </LibItem>
      </div>
    </div>
  )
}
