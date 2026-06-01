import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './Sparkles.module.css'

/**
 * Wraps children and scatters twinkling sparkles around them.
 */
export default function Sparkles({ children, count = 10 }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 6 + Math.random() * 12,
        delay: Math.random() * 3,
        duration: 1.6 + Math.random() * 2,
      })),
    [count],
  )

  return (
    <span className={styles.wrap}>
      {sparkles.map((s) => (
        <motion.svg
          key={s.id}
          className={styles.sparkle}
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          viewBox="0 0 24 24"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0, rotate: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90, 180] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, repeatDelay: 1.2 }}
          aria-hidden="true"
        >
          <path d="M12 0c.6 4.8 2.6 6.8 7.4 7.4C14.6 8 12.6 10 12 14.8 11.4 10 9.4 8 4.6 7.4 9.4 6.8 11.4 4.8 12 0z" />
        </motion.svg>
      ))}
      {children}
    </span>
  )
}
