import { useRef, useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import BottomNav from '../components/BottomNav.jsx'
import BottomSheet from '../components/BottomSheet.jsx'
import HomeScreen from './HomeScreen.jsx'
import ChatScreen from './ChatScreen.jsx'
import YouScreen from './YouScreen.jsx'
import JourneyScreen from './JourneyScreen.jsx'
import LearnScreen from './LearnScreen.jsx'
import LessonScreen from './LessonScreen.jsx'
import { kaelReply, chipExchange, moodExchange } from '../kael.js'
import { getLesson } from '../lessons.js'

const SEED = [
  { id: 1, who: 'user', text: 'He said he needs space and now I’m spiraling.', time: '9:32 am' },
  {
    id: 2,
    who: 'kael',
    text: 'Let’s slow it down. What part hurts most right now: the distance, the ambiguity, or what it seems to mean about you?',
  },
]

function nowTime() {
  return new Date()
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    .toLowerCase()
}

// Inline-editable title (DOM is source of truth; exporter reads it).
function Ed({ as: Tag = 'span', className = '', html }) {
  return (
    <Tag
      className={`ed ${className}`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// A self-contained, fully interactive Kael app — click through it, then export.
function MiniApp({ theme, initialTab = 'home', outline = 'black' }) {
  const [tab, setTab] = useState(initialTab)
  const [messages, setMessages] = useState(SEED)
  const [typing, setTyping] = useState(false)
  const [sheet, setSheet] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const idRef = useRef(SEED.length + 1)
  const timerRef = useRef(null)

  function respond(text) {
    setTyping(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { id: idRef.current++, who: 'kael', text }])
      setTyping(false)
    }, 650)
  }
  function sendText(t) {
    const c = (t || '').trim()
    if (!c) return
    setMessages((m) => [...m, { id: idRef.current++, who: 'user', text: c, time: nowTime() }])
    respond(kaelReply(c))
  }
  function sendChip(type) {
    const { user, kael } = chipExchange(type)
    setMessages((m) => [...m, { id: idRef.current++, who: 'user', text: user, time: nowTime() }])
    respond(kael)
  }
  function startFromPrompt(label) {
    setTab('chat')
    sendText(label)
  }
  function bringMood(id) {
    const { user, kael } = moodExchange(id)
    setTab('chat')
    setMessages((m) => [...m, { id: idRef.current++, who: 'user', text: user, time: nowTime() }])
    respond(kael)
  }
  function discussLesson(lesson) {
    setActiveLesson(null)
    setTab('chat')
    sendText(`I just read “${lesson.title}.” It stirred something up. Can we talk about it?`)
  }
  function sheetCta(message) {
    setSheet(null)
    setTab('chat')
    sendText(message)
  }

  const handlers = {
    sendText,
    sendChip,
    goChat: () => setTab('chat'),
    goHome: () => setTab('home'),
    startFromPrompt,
    bringMood,
    openLesson: (id) => setActiveLesson(id),
    openSheet: (d) => setSheet(d),
  }

  const lesson = activeLesson ? getLesson(activeLesson) : null

  let screen
  if (tab === 'chat')
    screen = (
      <ChatScreen
        messages={messages}
        typing={typing}
        onSend={sendText}
        onChip={sendChip}
        onBack={handlers.goHome}
      />
    )
  else if (tab === 'you')
    screen = <YouScreen onOpenSheet={handlers.openSheet} onPrompt={startFromPrompt} />
  else if (tab === 'journey')
    screen = <JourneyScreen onNavigate={handlers.goChat} onOpenSheet={handlers.openSheet} />
  else if (tab === 'learn') screen = <LearnScreen onOpenLesson={handlers.openLesson} />
  else screen = <HomeScreen onPrompt={startFromPrompt} onMood={bringMood} />

  return (
    <div className="store-phone" data-outline={outline}>
      <div className="phone-screen" data-theme={theme}>
        <StatusBar />
        <div className="screen-body">{screen}</div>
        {tab !== 'chat' && <BottomNav active={tab} onSelect={setTab} />}
        <div className="home-indicator" />
        {lesson && (
          <div className="overlay-layer">
            <LessonScreen lesson={lesson} onBack={() => setActiveLesson(null)} onDiscuss={discussLesson} />
          </div>
        )}
        <BottomSheet sheet={sheet} onClose={() => setSheet(null)} onCta={sheetCta} />
      </div>
    </div>
  )
}

const SHOTS = [
  { id: 'hero', theme: 'light', initialTab: 'home', hero: true, kael: 'Kael', title: 'Your coach for better relationships.', devScale: 2.3, devTop: 940 },
  { id: 'decode', theme: 'dark', initialTab: 'home', title: 'Decode fights, distance, and mixed signals', devScale: 2.55, devTop: 700 },
  { id: 'patterns', theme: 'light', initialTab: 'you', title: 'Uncover your patterns & triggers', devScale: 2.55, devTop: 700 },
  { id: 'change', theme: 'dark', initialTab: 'journey', title: 'Watch yourself actually change', devScale: 2.55, devTop: 700 },
  { id: 'lessons', theme: 'light', initialTab: 'learn', title: 'Lessons matched to your patterns', devScale: 2.55, devTop: 700 },
  { id: 'secure', theme: 'light', initialTab: 'you', title: 'Build healthy, secure relationships', devScale: 2.55, devTop: 700 },
]

const FG_SWATCHES = ['#1b1a17', '#6e5638', '#7c7568', '#f7f5f0']
const BG_SWATCHES = ['#f0ebe1', '#f6f2ea', '#ffffff', '#e7e1d5', '#1b1a17']

// Elements that can be lifted out into a "pop" — the nearest one to a click wins.
const POP_SELECTOR =
  '.mcard, .value-tile, .mhero, .growth-edge, .belief-quote, .belief-truth, .j-card, .j-node, .journey-intro, .litem, .mood-tile, .way-pill, .fk-card, .pickup, .bubble-kael, .bubble-user, .chip, .snap-values'

function StoreFrame({ shot, theme, outline, top, scale, titleTop, titleScale, bg, fg, picking, onPick, pop, onPopDown, frameRef }) {
  const blurred = pop.html && pop.blur > 0
  return (
    <div className="store-frame" data-theme="light" ref={frameRef} style={{ background: bg }}>
      <div
        className="store-titleblock"
        style={{ '--title-top': `${titleTop}px`, '--title-scale': titleScale, '--title-color': fg }}
      >
        {shot.hero && (
          <>
            <Ed className="st-logo-name" html={shot.kael} />
            <span className="st-rule" />
          </>
        )}
        <Ed as="h2" className={`st-title${shot.hero ? ' hero' : ''}`} html={shot.title} />
      </div>
      <div
        className="store-device"
        data-pick={picking ? 'true' : undefined}
        style={{ top: `${top}px`, '--dev-scale': scale, filter: blurred ? `blur(${pop.blur}px)` : undefined }}
        onMouseDown={(e) => e.preventDefault()}
        onClickCapture={
          picking
            ? (e) => {
                e.preventDefault()
                e.stopPropagation()
                const el = e.target.closest(POP_SELECTOR)
                if (el) onPick(el.outerHTML, el.offsetWidth)
              }
            : undefined
        }
      >
        <MiniApp theme={theme} initialTab={shot.initialTab} outline={outline} />
      </div>
      {pop.html && (
        <div
          className="store-pop"
          data-theme={theme}
          style={{ left: `${pop.x}px`, top: `${pop.y}px`, width: `${pop.w}px`, '--pop-scale': pop.scale }}
          onPointerDown={onPopDown}
          dangerouslySetInnerHTML={{ __html: pop.html }}
        />
      )}
    </div>
  )
}

export default function StoreScreens() {
  const [themes, setThemes] = useState(() => Object.fromEntries(SHOTS.map((s) => [s.id, s.theme])))
  const [outlines, setOutlines] = useState(() => Object.fromEntries(SHOTS.map((s) => [s.id, 'black'])))
  const [targets, setTargets] = useState(() => Object.fromEntries(SHOTS.map((s) => [s.id, 'phone'])))
  const [cfg, setCfg] = useState(() =>
    Object.fromEntries(
      SHOTS.map((s) => [
        s.id,
        {
          top: s.devTop,
          scale: s.devScale,
          titleTop: 140,
          titleScale: 1,
          bg: '#f0ebe1',
          fg: '#1b1a17',
          popHtml: null,
          popWidth: 360,
          popX: 360,
          popY: 1080,
          popScale: 2,
          blur: 0,
        },
      ]),
    ),
  )
  const [picking, setPicking] = useState(null)
  const refs = useRef({})

  function nudge(id, d) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], top: c[id].top + d } }))
  }
  function resize(id, d) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], scale: Math.round((c[id].scale + d) * 100) / 100 } }))
  }
  function nudgeTitle(id, d) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], titleTop: c[id].titleTop + d } }))
  }
  function resizeTitle(id, d) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], titleScale: Math.round((c[id].titleScale + d) * 100) / 100 } }))
  }
  function toggleTarget(id) {
    setTargets((t) => ({ ...t, [id]: t[id] === 'title' ? 'phone' : 'title' }))
  }
  function move(id, dir) {
    if (targets[id] === 'title') nudgeTitle(id, dir * 30)
    else nudge(id, dir * 40)
  }
  function size(id, dir) {
    if (targets[id] === 'title') resizeTitle(id, dir * 0.06)
    else resize(id, dir * 0.1)
  }
  function setColor(id, key, val) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], [key]: val } }))
  }

  function startPick(id) {
    setPicking((p) => (p === id ? null : id))
  }
  function pickComponent(id, html, w) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], popHtml: html, popWidth: w } }))
    setPicking(null)
  }
  function clearPop(id) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], popHtml: null } }))
    setPicking(null)
  }
  function resizePop(id, d) {
    setCfg((c) => ({
      ...c,
      [id]: { ...c[id], popScale: Math.max(0.3, Math.round((c[id].popScale + d) * 100) / 100) },
    }))
  }
  function setBlurAmt(id, d) {
    setCfg((c) => ({ ...c, [id]: { ...c[id], blur: Math.max(0, c[id].blur + d) } }))
  }
  function startDragPop(id, e) {
    e.preventDefault()
    const frame = refs.current[id]
    if (!frame) return
    const ratio = frame.getBoundingClientRect().width / 1290 // preview scale
    const sx = e.clientX
    const sy = e.clientY
    const { popX: ox, popY: oy } = cfg[id]
    function onMove(ev) {
      setCfg((c) => ({
        ...c,
        [id]: {
          ...c[id],
          popX: Math.round(ox + (ev.clientX - sx) / ratio),
          popY: Math.round(oy + (ev.clientY - sy) / ratio),
        },
      }))
    }
    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  async function download(id) {
    const node = refs.current[id]
    if (!node) return
    // html-to-image resets scrollTop on its clone, so bake the current inner
    // scroll offset into a transform (then restore) to capture the scrolled view.
    const restore = []
    node.querySelectorAll('.screen-scroll, .chat-scroll').forEach((sc) => {
      const s = sc.scrollTop
      if (!s) return
      const kids = Array.from(sc.children)
      const prevTransforms = kids.map((k) => k.style.transform)
      const prevOverflow = sc.style.overflow
      sc.style.overflow = 'hidden'
      sc.scrollTop = 0
      kids.forEach((k) => {
        k.style.transform = `translateY(${-s}px)`
      })
      restore.push(() => {
        sc.style.overflow = prevOverflow
        kids.forEach((k, i) => {
          k.style.transform = prevTransforms[i]
        })
        sc.scrollTop = s
      })
    })
    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 1,
        width: 1290,
        height: 2796,
        canvasWidth: 1290,
        canvasHeight: 2796,
        style: { transform: 'none', transformOrigin: 'top left', margin: '0' },
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `appstore-${id}.png`
      a.click()
    } finally {
      restore.forEach((r) => r())
    }
  }

  function toggleTheme(id) {
    setThemes((t) => ({ ...t, [id]: t[id] === 'dark' ? 'light' : 'dark' }))
  }
  function toggleOutline(id) {
    setOutlines((o) => ({ ...o, [id]: o[id] === 'white' ? 'black' : 'white' }))
  }

  return (
    <div className="lib-page store-page">
      <h1 className="lib-title">App Store</h1>
      <p className="lib-sub">
        1290 × 2796. Click through the live app to set up each shot, edit the title, then export the PNG.
      </p>

      <div className="store-grid">
        {SHOTS.map((shot) => (
          <div className="store-cell" key={shot.id}>
            <div className="store-cell-bar">
              <span className="scb-name">{shot.id}</span>
              <div className="scb-tools">
                  <span className="scb-group">
                    <button className="scb-seg scb-target" onClick={() => toggleTarget(shot.id)} title="Toggle Title / Phone">
                      {targets[shot.id] === 'title' ? 'Title' : 'Phone'}
                    </button>
                    <button className="scb-seg" onClick={() => move(shot.id, -1)} title="Up">↑</button>
                    <button className="scb-seg" onClick={() => move(shot.id, 1)} title="Down">↓</button>
                    <button className="scb-seg" onClick={() => size(shot.id, -1)} title="Smaller">−</button>
                    <button className="scb-seg" onClick={() => size(shot.id, 1)} title="Bigger">+</button>
                  </span>
                  <span className="scb-group">
                    <button className="scb-seg" onClick={() => toggleTheme(shot.id)}>
                      {themes[shot.id] === 'dark' ? 'Dark' : 'Light'}
                    </button>
                    <button className="scb-seg" onClick={() => toggleOutline(shot.id)}>
                      {outlines[shot.id] === 'white' ? 'White' : 'Black'}
                    </button>
                  </span>
                  <button className="scb-btn scb-png" onClick={() => download(shot.id)}>PNG</button>
                </div>
              <div className="scb-tools scb-colorrow">
                <span className="scb-group scb-colorgroup">
                  <span className="scb-lbl">Font</span>
                  {FG_SWATCHES.map((c) => (
                    <button
                      key={c}
                      className="scb-sw"
                      data-on={cfg[shot.id].fg === c}
                      style={{ background: c }}
                      onClick={() => setColor(shot.id, 'fg', c)}
                      title={c}
                    />
                  ))}
                  <input
                    type="color"
                    className="scb-pick"
                    value={cfg[shot.id].fg}
                    onChange={(e) => setColor(shot.id, 'fg', e.target.value)}
                    title="Custom font color"
                  />
                </span>
                <span className="scb-group scb-colorgroup">
                  <span className="scb-lbl">Bg</span>
                  {BG_SWATCHES.map((c) => (
                    <button
                      key={c}
                      className="scb-sw"
                      data-on={cfg[shot.id].bg === c}
                      style={{ background: c }}
                      onClick={() => setColor(shot.id, 'bg', c)}
                      title={c}
                    />
                  ))}
                  <input
                    type="color"
                    className="scb-pick"
                    value={cfg[shot.id].bg}
                    onChange={(e) => setColor(shot.id, 'bg', e.target.value)}
                    title="Custom background color"
                  />
                </span>
              </div>
              <div className="scb-tools scb-poprow">
                <span className="scb-group">
                  <span className="scb-lbl">Pop</span>
                  <button
                    className="scb-seg scb-pickbtn"
                    data-on={picking === shot.id}
                    onClick={() => startPick(shot.id)}
                  >
                    {picking === shot.id ? 'Tap a card…' : 'Pick'}
                  </button>
                  {cfg[shot.id].popHtml && (
                    <>
                      <button className="scb-seg" onClick={() => resizePop(shot.id, -0.15)} title="Smaller">−</button>
                      <button className="scb-seg" onClick={() => resizePop(shot.id, 0.15)} title="Bigger">+</button>
                      <button className="scb-seg" onClick={() => clearPop(shot.id)} title="Remove">Clear</button>
                    </>
                  )}
                </span>
                <span className="scb-group">
                  <span className="scb-lbl">Blur</span>
                  <button className="scb-seg" onClick={() => setBlurAmt(shot.id, -3)} title="Less blur">−</button>
                  <button className="scb-seg" onClick={() => setBlurAmt(shot.id, 3)} title="More blur">+</button>
                </span>
              </div>
            </div>
            <div className="store-scaler">
              <StoreFrame
                shot={shot}
                theme={themes[shot.id]}
                outline={outlines[shot.id]}
                top={cfg[shot.id].top}
                scale={cfg[shot.id].scale}
                titleTop={cfg[shot.id].titleTop}
                titleScale={cfg[shot.id].titleScale}
                bg={cfg[shot.id].bg}
                fg={cfg[shot.id].fg}
                picking={picking === shot.id}
                onPick={(html, w) => pickComponent(shot.id, html, w)}
                pop={{
                  html: cfg[shot.id].popHtml,
                  x: cfg[shot.id].popX,
                  y: cfg[shot.id].popY,
                  w: cfg[shot.id].popWidth,
                  scale: cfg[shot.id].popScale,
                  blur: cfg[shot.id].blur,
                }}
                onPopDown={(e) => startDragPop(shot.id, e)}
                frameRef={(el) => (refs.current[shot.id] = el)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
