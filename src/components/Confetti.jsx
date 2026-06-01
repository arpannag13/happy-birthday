import { useEffect, useRef } from 'react'

const COLORS = ['#2e7bf6', '#ffce4d', '#ff9a4d', '#6fb1ff', '#ffffff', '#5ee7ff']

/**
 * Lightweight canvas confetti burst — no external dependency.
 * @param {boolean} fire    trigger a fresh burst whenever this flips to true
 * @param {number}  count   number of confetti pieces per burst
 */
export default function Confetti({ fire = true, count = 160 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!fire) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = prefersReduced ? 0 : count

    const pieces = Array.from({ length: total }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 8,
      h: 8 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: -2 + Math.random() * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI,
      vrot: -0.2 + Math.random() * 0.4,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }))

    let alive = true
    const start = performance.now()

    const draw = (now) => {
      if (!alive) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const elapsed = now - start
      pieces.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.rot += p.vrot
        const fade = elapsed > 3500 ? Math.max(0, 1 - (elapsed - 3500) / 2000) : 1
        ctx.save()
        ctx.globalAlpha = fade
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      })
      if (elapsed < 6000) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      alive = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [fire, count])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 60,
      }}
    />
  )
}
