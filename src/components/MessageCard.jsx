import { motion } from 'framer-motion'
import styles from './MessageCard.module.css'

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateZ: -2 },
  show: { opacity: 1, y: 0, rotateZ: 0, transition: { type: 'spring', damping: 16 } },
}

/**
 * A single animated birthday message card.
 * @param {string} text   message content
 * @param {string} icon   emoji shown in the badge
 * @param {number} index  used to stagger the entrance
 */
export default function MessageCard({ text, icon = '🎉', index = 0 }) {
  return (
    <motion.article
      className={styles.card}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <span className={styles.badge} aria-hidden="true">
        {icon}
      </span>
      <p className={styles.text}>{text}</p>
      <span className={styles.corner} aria-hidden="true" />
    </motion.article>
  )
}
