import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Balloons from './Balloons'
import Confetti from './Confetti'
import Sparkles from './Sparkles'
import styles from './FinalSection.module.css'

const text = 'May this year be your best one yet!'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const word = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 14 } },
}

export default function FinalSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section ref={ref} id="final" className={styles.final}>
      <Balloons count={18} />
      {inView && <Confetti fire count={200} />}

      <Sparkles count={18}>
        <motion.h2
          className={styles.text}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {text.split(' ').map((w, i) => (
            <motion.span key={i} variants={word} className={styles.word}>
              {w}
            </motion.span>
          ))}
          <motion.span
            variants={word}
            className={styles.party}
            animate={{ rotate: [0, 14, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            🎉
          </motion.span>
        </motion.h2>
      </Sparkles>

      <motion.p
        className={styles.sign}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        Happy Birthday, Joyita! — Arpan
      </motion.p>
    </section>
  )
}
