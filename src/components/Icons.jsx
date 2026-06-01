/* Coherent monochrome line-icon set. Stroke = currentColor. */

const S = ({ size = 22, sw = 1.6, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
)

/* ---- navigation ---- */
export const Home = (p) => (
  <S {...p}>
    <path d="M4 10.6 11.3 4.3a1 1 0 0 1 1.4 0L20 10.6" />
    <path d="M5.8 9.4V19a1 1 0 0 0 1 1H10v-5.4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.2a1 1 0 0 0 1-1V9.4" />
  </S>
)
export const Chat = (p) => (
  <S {...p}>
    <path d="M7 5h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-6l-3.4 2.9V16H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
  </S>
)
export const Person = (p) => (
  <S {...p}>
    <circle cx="12" cy="8.4" r="3.4" />
    <path d="M5.8 19.4a6.4 6.4 0 0 1 12.4 0" />
  </S>
)
export const Route = (p) => (
  <S {...p}>
    <circle cx="7" cy="5.2" r="2.2" />
    <circle cx="17" cy="18.8" r="2.2" />
    <path d="M7 7.4V11a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4" />
  </S>
)

/* ---- status bar (bespoke aspect) ---- */
export const Cellular = ({ size = 17 }) => (
  <svg width={size} height={size * (12 / 17)} viewBox="0 0 17 12" fill="currentColor">
    <rect x="0" y="8.5" width="2.6" height="3.5" rx="0.8" />
    <rect x="4.4" y="6" width="2.6" height="6" rx="0.8" />
    <rect x="8.8" y="3" width="2.6" height="9" rx="0.8" />
    <rect x="13.2" y="0" width="2.6" height="12" rx="0.8" />
  </svg>
)
export const Wifi = ({ size = 17 }) => (
  <svg
    width={size}
    height={size * (12 / 17)}
    viewBox="0 0 17 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M1 4.2a11 11 0 0 1 15 0" />
    <path d="M3.4 6.8a7.3 7.3 0 0 1 10.2 0" />
    <path d="M5.8 9.3a3.8 3.8 0 0 1 5.4 0" />
    <circle cx="8.5" cy="11" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)
export const Battery = ({ size = 25 }) => (
  <svg width={size} height={size * (12 / 25)} viewBox="0 0 25 12" fill="none">
    <rect x="0.6" y="0.6" width="20" height="10.8" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.8" fill="currentColor" />
    <path d="M22.6 4.2v3.6a2 2 0 0 0 1.2-1.8 2 2 0 0 0-1.2-1.8Z" fill="currentColor" opacity="0.5" />
  </svg>
)

/* ---- glyphs ---- */
export const Sparkle = (p) => (
  <S {...p}>
    <path d="M12 3c.55 4.6 1.4 5.45 6 6-4.6.55-5.45 1.4-6 6-.55-4.6-1.4-5.45-6-6 4.6-.55 5.45-1.4 6-6Z" />
  </S>
)
export const ChevronRight = (p) => (
  <S {...p}>
    <path d="M9.5 5.5 16 12l-6.5 6.5" />
  </S>
)
export const ArrowUpRight = (p) => (
  <S {...p}>
    <path d="M7.5 16.5 16.5 7.5" />
    <path d="M9 7.5h7.5V15" />
  </S>
)
export const Plus = (p) => (
  <S {...p}>
    <path d="M12 5.5v13" />
    <path d="M5.5 12h13" />
  </S>
)
export const Send = (p) => (
  <S {...p}>
    <path d="M12 19V6" />
    <path d="M6.3 11.3 12 5.6l5.7 5.7" />
  </S>
)
export const Sliders = (p) => (
  <S {...p}>
    <path d="M4 8h9" />
    <path d="M18 8h2" />
    <circle cx="15.5" cy="8" r="2.1" />
    <path d="M4 16h2" />
    <path d="M11 16h9" />
    <circle cx="8.5" cy="16" r="2.1" />
  </S>
)

/* ---- prompt cards ---- */
export const Spiral = (p) => (
  <S {...p}>
    <path d="M12 12m-1 0a1 1 0 1 0 2 0 3.2 3.2 0 1 0-3.2-3.2 5.4 5.4 0 1 0 5.4 5.4 7.6 7.6 0 1 0-7.6-7.6" />
  </S>
)
export const Bolt = (p) => (
  <S {...p}>
    <path d="M13 3 6 12.6a.5.5 0 0 0 .4.8H11l-1 7.6 7-9.6a.5.5 0 0 0-.4-.8H12.4Z" />
  </S>
)
export const Distance = (p) => (
  <S {...p}>
    <path d="M8 8 4 12l4 4" />
    <path d="M4 12h4.5" />
    <path d="M16 8l4 4-4 4" />
    <path d="M15.5 12H20" />
  </S>
)
export const Reply = (p) => (
  <S {...p}>
    <path d="M9 7 4 12l5 5" />
    <path d="M4 12h8.5a6.5 6.5 0 0 1 6.5 6.5V19" />
  </S>
)
export const Fork = (p) => (
  <S {...p}>
    <path d="M12 20.5V15" />
    <path d="M12 15c0-3.2-3-3.4-3-6.4V6.5" />
    <path d="M12 15c0-3.2 3-3.4 3-6.4V6.5" />
    <path d="M7 8.2 9 6.2l2 2" />
    <path d="M13 8.2 15 6.2l2 2" />
  </S>
)
export const LoopText = (p) => (
  <S {...p}>
    <path d="M19.2 12a7 7 0 1 1-2.2-5.1" />
    <path d="M19.4 5v3.4H16" />
    <circle cx="9" cy="12" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="0.7" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="0.7" fill="currentColor" stroke="none" />
  </S>
)
export const TurnAway = (p) => (
  <S {...p}>
    <circle cx="8" cy="12" r="3.2" />
    <path d="M13 12h6.5" />
    <path d="M16.8 9.3 19.5 12l-2.7 2.7" />
  </S>
)
export const Ellipsis = (p) => (
  <S {...p}>
    <circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none" />
  </S>
)

/* ---- threads ---- */
export const Loop = (p) => (
  <S {...p}>
    <path d="M19.2 12a7 7 0 1 1-2.2-5.1" />
    <path d="M19.4 5v3.4H16" />
  </S>
)
export const Compass = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M14.8 9.2 11 11l-1.8 3.8L13 13Z" />
  </S>
)
export const Pulse = (p) => (
  <S {...p}>
    <path d="M3 12h3.2l2-5.2 3.8 10 2-4.8H21" />
  </S>
)
export const Book = (p) => (
  <S {...p}>
    <path d="M12 6.6C10.4 5.3 8 4.9 5.6 5.3a1 1 0 0 0-.8 1v10.3a1 1 0 0 0 1.1 1c2.1-.3 4.5 0 6.1 1.3 1.6-1.3 4-1.6 6.1-1.3a1 1 0 0 0 1.1-1V6.3a1 1 0 0 0-.8-1c-2.4-.4-4.8 0-6.4 1.3Z" />
    <path d="M12 6.6V18.3" />
  </S>
)
export const Clock = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7.6V12l3 1.8" />
  </S>
)

/* ---- you: moves ---- */
export const Search = (p) => (
  <S {...p}>
    <circle cx="11" cy="11" r="6" />
    <path d="M15.6 15.6 20 20" />
  </S>
)
export const Paragraph = (p) => (
  <S {...p}>
    <path d="M5 7.5h14" />
    <path d="M5 12h14" />
    <path d="M5 16.5h8" />
  </S>
)
export const NeutralFace = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M9 15h6" />
    <circle cx="9.2" cy="10" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="14.8" cy="10" r="0.75" fill="currentColor" stroke="none" />
  </S>
)
export const Shades = (p) => (
  <S {...p}>
    <path d="M3 9h18" />
    <path d="M3.8 9a3.6 3.6 0 0 0 7.2 0Z" />
    <path d="M13 9a3.6 3.6 0 0 0 7.2 0Z" />
    <path d="M11 10.2h2" />
  </S>
)

/* ---- chip glyphs ---- */
export const Pattern = (p) => (
  <S {...p}>
    <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="16" cy="8" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="8" cy="16" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
  </S>
)

/* ---- theme toggle ---- */
export const Sun = ({ size = 17 }) => (
  <S size={size} sw="1.7">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
  </S>
)
export const Moon = ({ size = 17 }) => (
  <S size={size} sw="1.7">
    <path d="M20 14.2A8 8 0 0 1 9.8 4 7 7 0 1 0 20 14.2Z" />
  </S>
)
