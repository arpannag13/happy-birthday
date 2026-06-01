import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './Balloons.module.css'

const PALETTE = ['#2e7bf6', '#ffce4d', '#ff9a4d', '#6fb1ff', '#ffffff']

function Balloon({ color, size }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" aria-hidden="true">
      <defs>
        <radialGradient id={`b-${color}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="35%" stopColor={color} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="32" rx="26" ry="32" fill={`url(#b-${color})`} />
      <path d="M30 64 l-5 6 h10 z" fill={color} />
      <path
        d="M30 70 q6 12 -2 22 q-8 10 2 20"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
      />
    </svg>
  )
}

/**
 * Rising balloons background layer.
 * @param {number} count number of balloons
 */
export default function Balloons({ count = 10 }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 34 + Math.random() * 36,
        color: PALETTE[i % PALETTE.length],
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 12,
        drift: (Math.random() - 0.5) * 80,
        sway: 2 + Math.random() * 4,
      })),
    [count],
  )

  return (
    <div className={styles.layer} aria-hidden="true">
      {balloons.map((b) => (
        <motion.span
          key={b.id}
          className={styles.balloon}
          style={{ left: `${b.left}%` }}
          initial={{ y: '115vh', opacity: 0 }}
          animate={{
            y: '-25vh',
            x: [0, b.drift, 0],
            opacity: [0, 0.95, 0.95, 0],
            rotate: [-b.sway, b.sway, -b.sway],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Balloon color={b.color} size={b.size} />
        </motion.span>
      ))}
    </div>
  )
}
