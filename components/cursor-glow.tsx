'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }

    function onMove(e: MouseEvent) {
      target.x = e.clientX
      target.y = e.clientY
    }

    function loop() {
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      if (el) {
        el.style.transform = `translate3d(${pos.x - 300}px, ${pos.y - 300}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[600px] w-[600px] rounded-full md:block"
      style={{
        background:
          'radial-gradient(circle, color-mix(in oklch, var(--electric) 22%, transparent) 0%, transparent 60%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
