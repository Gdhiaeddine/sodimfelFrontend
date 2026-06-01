'use client'

import { useEffect, useState } from 'react'

type ElectricityProps = {
  active: boolean
}

type Spark = {
  id: number
  left: string
  top: string
  delay: string
  size: number
}

const ARCS = [
  'M120 240 C 220 160, 320 300, 430 210 S 620 120, 720 220',
  'M160 360 C 280 300, 360 420, 500 350 S 690 280, 800 360',
  'M90 150 C 200 220, 300 90, 420 160 S 600 230, 700 150',
]

export function Electricity({ active }: ElectricityProps) {
  // Generate sparks only on the client to avoid hydration mismatch.
  const [sparks, setSparks] = useState<Spark[]>([])

  useEffect(() => {
    setSparks(
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${15 + Math.random() * 70}%`,
        delay: `${Math.random() * 3}s`,
        size: 3 + Math.random() * 4,
      })),
    )
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: active ? 1 : 0.18 }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 900 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <filter id="electric-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.8 0.16 230)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.82 0.17 225)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.8 0.16 230)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ARCS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="url(#arc-grad)"
            strokeWidth={1.6}
            strokeLinecap="round"
            filter="url(#electric-glow)"
            strokeDasharray="14 26"
            className="animate-energy-flow"
            style={{ animationDelay: `${i * 0.6}s`, opacity: active ? 0.9 : 0.25 }}
          />
        ))}
      </svg>

      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-electric-bright animate-spark"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            boxShadow: '0 0 12px 2px color-mix(in oklch, var(--electric-bright) 80%, transparent)',
          }}
        />
      ))}
    </div>
  )
}
