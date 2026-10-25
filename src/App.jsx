import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Intro from './components/Intro'
import Browse from './components/Browse'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <Intro key="intro" onDone={() => setShowIntro(false)} />
        ) : (
          <motion.div key="browse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Browse />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
