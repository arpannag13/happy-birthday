import { useState, useCallback, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Sparkles from './Sparkles'
import photos from '../data/photos'
import styles from './Gallery.module.css'

const TILTS = [-3.5, 2.5, -1.5, 3, -2.5, 1.8, -2, 3.2]

function GalleryItem({ photo, index, onOpen, onError }) {
  const tilt = TILTS[index % TILTS.length]
  return (
    <motion.figure
      className={`${styles.item} ${photo.tall ? styles.tall : ''}`}
      style={{ rotate: tilt }}
      initial={{ opacity: 0, y: 60, scale: 0.9, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: tilt }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      whileHover={{ rotate: 0, y: -10, scale: 1.04, zIndex: 5 }}
      onClick={() => onOpen(index)}
    >
      <span className={styles.pin} aria-hidden="true" />
      <div className={styles.photo}>
        <img src={photo.src} alt={photo.alt} loading="lazy" onError={() => onError(photo.id)} />
      </div>
      <figcaption className={styles.caption}>{photo.caption}</figcaption>
    </motion.figure>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  // Ids of photos whose file is missing in /public/images — these get hidden.
  const [broken, setBroken] = useState(() => new Set())

  const visiblePhotos = useMemo(
    () => photos.filter((p) => !broken.has(p.id)),
    [broken],
  )

  const handleError = useCallback((id) => {
    setBroken((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const count = visiblePhotos.length
  const open = useCallback((i) => setActive(i), [])
  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + count) % count)),
    [count],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % count)),
    [count],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, prev, next])

  const current =
    active !== null && active < visiblePhotos.length ? visiblePhotos[active] : null

  return (
    <section id="gallery" className="section">
      <div className="title-wrap">
        <Sparkles count={12}>
          <h2 className="section-title">Moments &amp; Memories</h2>
        </Sparkles>
      </div>

      <div className={styles.grid}>
        {visiblePhotos.map((photo, i) => (
          <GalleryItem
            key={photo.id}
            photo={photo}
            index={i}
            onOpen={open}
            onError={handleError}
          />
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button className={styles.close} onClick={close} aria-label="Close">
              <FaTimes />
            </button>
            <button
              className={`${styles.nav} ${styles.navLeft}`}
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
            >
              <FaChevronLeft />
            </button>

            <motion.figure
              key={current.id}
              className={styles.lightboxInner}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.src} alt={current.alt} onError={() => handleError(current.id)} />
              <figcaption>{current.caption}</figcaption>
            </motion.figure>

            <button
              className={`${styles.nav} ${styles.navRight}`}
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
