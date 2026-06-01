'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function refreshScrollState() {
      lenis.resize()
      lenis.start()
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'))
        window.dispatchEvent(new Event('scroll'))
      })
    }

    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        refreshScrollState()
      }
    }

    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('popstate', refreshScrollState)

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('popstate', refreshScrollState)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
