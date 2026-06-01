import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './Streamers.module.css'

const PALETTE = ['#2e7bf6', '#ffce4d', '#ff9a4d', '#6fb1ff', '#ffffff']

/**
 * Decorative party streamers that hang and sway from the top edge.
 * @param {number} count number of streamers
 */
export default function Streamers({ count = 14 }) {
  const streamers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i / count) * 100 + Math.random() * 4,
        height: 70 + Math.random() * 120,
        width: 8 + Math.random() * 8,
        color: PALETTE[i % PALETTE.length],
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2.5,
        skew: -6 + Math.random() * 12,
      })),
    [count],
  )

  return (
    <div className={styles.layer} aria-hidden="true">
      {streamers.map((s) => (
        <motion.span
          key={s.id}
          className={styles.streamer}
          style={{
            left: `${s.left}%`,
            height: s.height,
            width: s.width,
            background: `repeating-linear-gradient(180deg, ${s.color} 0 10px, rgba(255,255,255,0.35) 10px 20px)`,
          }}
          initial={{ scaleY: 0, transformOrigin: 'top', skewX: s.skew }}
          animate={{ scaleY: 1, rotate: [s.skew, -s.skew, s.skew] }}
          transition={{
            scaleY: { duration: 0.8, delay: s.delay },
            rotate: { duration: s.duration, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </div>
  )
}
