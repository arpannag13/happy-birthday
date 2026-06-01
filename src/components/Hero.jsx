import { motion } from 'framer-motion'
import { FaGift, FaChevronDown } from 'react-icons/fa'
import Balloons from './Balloons'
import Streamers from './Streamers'
import Cake from './Cake'
import Sparkles from './Sparkles'
import styles from './Hero.module.css'

const title = 'Happy Birthday Joyita'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
}

const letter = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', damping: 12 },
  },
}

export default function Hero({ onOpenSurprise }) {
  return (
    <header className={styles.hero}>
      <Streamers count={16} />
      <Balloons count={12} />

      <div className={styles.blobOne} aria-hidden="true" />
      <div className={styles.blobTwo} aria-hidden="true" />

      <div className={styles.content}>
        <motion.p
          className={styles.kicker}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          🎉 Let the celebration begin 🎉
        </motion.p>

        <Cake />

        <Sparkles count={14}>
          <motion.h1
            className={styles.title}
            variants={container}
            initial="hidden"
            animate="show"
            aria-label={title}
          >
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={letter}
                className={char === ' ' ? styles.space : styles.char}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
        </Sparkles>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          A small birthday surprise made especially for you.
        </motion.p>

        <motion.button
          className={styles.cta}
          onClick={onOpenSurprise}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaGift className={styles.ctaIcon} />
          Open Your Surprise
        </motion.button>
      </div>

      <motion.a
        href="#gallery"
        className={styles.scroll}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2.6 },
          y: { repeat: Infinity, duration: 1.8 },
        }}
      >
        <FaChevronDown />
      </motion.a>
    </header>
  )
}
