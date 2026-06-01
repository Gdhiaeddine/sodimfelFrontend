'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Globe2, PackageCheck, PanelsTopLeft } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const STATS = [
  {
    value: 500,
    suffix: '+',
    label: { en: 'Projects Completed', fr: 'Projets réalisés' },
    icon: PanelsTopLeft,
  },
  {
    value: 50,
    suffix: '+',
    label: { en: 'Global Partners', fr: 'Partenaires mondiaux' },
    icon: Globe2,
  },
  {
    value: 1000,
    suffix: '+',
    label: { en: 'Products Delivered', fr: 'Produits livrés' },
    icon: PackageCheck,
  },
  {
    value: 98,
    suffix: '%',
    label: { en: 'Client Satisfaction', fr: 'Satisfaction client' },
    icon: CheckCircle2,
  },
]

function CountUp({
  value,
  suffix,
  active,
}: {
  value: number
  suffix: string
  active: boolean
}) {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const dur = 2000
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value])

  return (
    <span>
      {n}
      {suffix}
    </span>
  )
}

export function Stats() {
  const [counting, setCounting] = useState(false)
  const completedRef = useRef(false)
  const { language } = useLanguage()

  return (
    <div className="stats-shell">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.8,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => {
          if (!completedRef.current) {
            completedRef.current = true
            setCounting(true)
          }
        }}
        className="stats-bar"
      >
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label.en}
              className="stats-item"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <s.icon className="stats-icon" aria-hidden />
              <div>
                <span className="stats-number">
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    active={counting}
                  />
                </span>
                <span className="stats-label">{s.label[language]}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
