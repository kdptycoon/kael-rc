import { AnimatePresence, motion } from 'framer-motion'
import StatusBar from './StatusBar.jsx'
import BottomNav from './BottomNav.jsx'

const screenVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function PhoneFrame({ theme, active, onSelect, children }) {
  return (
    <div className="phone-reserve">
      <div className="phone-scaler">
        <div className="phone">
          <div className="phone-screen" data-theme={theme}>
            <StatusBar />
            <div className="screen-body">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  style={{ position: 'absolute', inset: 0 }}
                  variants={screenVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
            <BottomNav active={active} onSelect={onSelect} />
            <div className="home-indicator" />
          </div>
        </div>
      </div>
    </div>
  )
}
