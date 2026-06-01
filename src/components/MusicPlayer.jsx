import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa'
import styles from './MusicPlayer.module.css'

export default function MusicPlayer({ src = '/music/birthday.mp3' }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => setReady(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (audio.paused) {
        await audio.play()
      } else {
        audio.pause()
      }
    } catch {
      setReady(false)
    }
  }

  return (
    <motion.div
      className={styles.player}
      initial={{ opacity: 0, scale: 0, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: 'spring', damping: 14 }}
    >
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        className={styles.button}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={ready ? 'Background music' : 'Add /public/music/birthday.mp3'}
      >
        <span className={`${styles.rings} ${playing ? styles.active : ''}`} aria-hidden="true" />
        {playing ? <FaPause /> : <FaPlay className={styles.playIcon} />}
      </button>

      <div className={`${styles.label} ${playing ? styles.labelOn : ''}`}>
        <FaMusic className={styles.note} />
        <span>{playing ? 'Now playing…' : 'Play music'}</span>
      </div>
    </motion.div>
  )
}
