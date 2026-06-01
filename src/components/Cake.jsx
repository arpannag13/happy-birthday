import { motion } from 'framer-motion'
import styles from './Cake.module.css'

/**
 * A friendly animated birthday cake illustration with flickering candles.
 */
export default function Cake() {
  const candles = [38, 60, 82]

  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, type: 'spring', damping: 14 }}
    >
      <motion.svg
        viewBox="0 0 120 120"
        className={styles.cake}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {/* Candles + flames */}
        {candles.map((x, i) => (
          <g key={x}>
            <rect x={x - 2} y="30" width="4" height="22" rx="2" fill="#fff" />
            <rect x={x - 2} y="30" width="4" height="22" rx="2" fill="url(#stripe)" opacity="0.5" />
            <motion.path
              d={`M${x} 18 q5 6 0 12 q-5 -6 0 -12z`}
              fill="url(#flame)"
              animate={{ scaleY: [1, 1.25, 0.9, 1], opacity: [0.9, 1, 0.85, 0.9] }}
              transition={{ duration: 0.6 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${x}px 30px` }}
            />
          </g>
        ))}

        {/* Frosting top */}
        <path
          d="M22 52 q8 -10 19 0 q10 -10 19 0 q10 -10 19 0 q10 -10 19 0 v10 H22z"
          fill="#ffce4d"
        />
        {/* Cake body */}
        <rect x="22" y="60" width="76" height="40" rx="6" fill="#2e7bf6" />
        <rect x="22" y="74" width="76" height="12" fill="#6fb1ff" />
        {/* Sprinkles */}
        <circle cx="36" cy="92" r="2" fill="#ffce4d" />
        <circle cx="52" cy="88" r="2" fill="#ff9a4d" />
        <circle cx="70" cy="93" r="2" fill="#fff" />
        <circle cx="86" cy="89" r="2" fill="#ffce4d" />
        {/* Plate */}
        <ellipse cx="60" cy="102" rx="50" ry="6" fill="rgba(255,255,255,0.85)" />

        <defs>
          <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="60%" stopColor="#ff9a4d" />
            <stop offset="100%" stopColor="#ff6a3d" />
          </linearGradient>
          <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9a4d" />
            <stop offset="100%" stopColor="#2e7bf6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  )
}
