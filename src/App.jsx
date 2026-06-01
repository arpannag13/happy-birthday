import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import MessageCard from './components/MessageCard'
import Letter from './components/Letter'
import MusicPlayer from './components/MusicPlayer'
import FinalSection from './components/FinalSection'
import Confetti from './components/Confetti'
import Sparkles from './components/Sparkles'
import styles from './App.module.css'

const MESSAGES = [
  {
    text: 'Happy Birthday! Wishing you a year filled with happiness, success, and unforgettable moments.',
    icon: '🎂',
  },
  {
    text: 'May today bring you plenty of reasons to smile and celebrate.',
    icon: '🎈',
  },
  {
    text: 'Thank you for bringing positivity and kindness wherever you go.',
    icon: '🌟',
  },
  {
    text: "Here's to new adventures, great memories, and exciting opportunities ahead.",
    icon: '🎉',
  },
  {
    text: 'You spend so much time caring for others. Today, take some time to enjoy and celebrate yourself.',
    icon: '🥳',
  },
]

export default function App() {
  // Confetti fires once on load and again when "Open Your Surprise" is pressed.
  const [burst, setBurst] = useState(0)

  const handleOpenSurprise = useCallback(() => {
    setBurst((b) => b + 1)
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className={styles.app}>
      {/* Load confetti + a re-fire each time burst changes */}
      <Confetti key={burst} fire count={180} />

      <Hero onOpenSurprise={handleOpenSurprise} />

      <Gallery />

      <section id="messages" className="section">
        <div className="title-wrap">
          <Sparkles count={12}>
            <h2 className="section-title">Birthday Wishes</h2>
          </Sparkles>
        </div>
        <motion.div className={styles.messageGrid}>
          {MESSAGES.map((m, i) => (
            <MessageCard key={i} text={m.text} icon={m.icon} index={i} />
          ))}
        </motion.div>
      </section>

      <Letter />

      <FinalSection />

      <footer className={styles.footer}>
        <p>🎉 Celebrating you today, Joyita 🎉</p>
      </footer>

      <MusicPlayer src={`${import.meta.env.BASE_URL}music/birthday.mp3`} />
    </div>
  )
}
