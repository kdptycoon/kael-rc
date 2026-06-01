import { AnimatePresence, motion } from 'framer-motion'
import { Sparkle } from './Icons.jsx'

const ease = [0.22, 0.61, 0.36, 1]

export default function BottomSheet({ sheet, onClose, onCta }) {
  return (
    <AnimatePresence>
      {sheet && (
        <motion.div
          className="sheet-scrim"
          onClick={() => onClose?.()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26, ease }}
        >
          <motion.div
            className="sheet-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 110 || info.velocity.y > 600) onClose?.()
            }}
          >
            <div className="sheet-grip" />
            {sheet.eyebrow && <div className="sheet-eyebrow">{sheet.eyebrow}</div>}
            <h2 className="sheet-title">{sheet.title}</h2>

            <div className="sheet-sections">
              {sheet.sections?.map((s) => (
                <div className="sheet-sec" key={s.label}>
                  <div className="sheet-sec-label">{s.label}</div>
                  <p className="sheet-sec-text">{s.text}</p>
                </div>
              ))}
            </div>

            {sheet.cta && (
              <button className="sheet-cta" onClick={() => onCta?.(sheet.cta.message)}>
                <Sparkle size={17} sw={1.5} />
                {sheet.cta.label}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
