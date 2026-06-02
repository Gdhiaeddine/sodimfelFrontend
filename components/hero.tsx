'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Electricity } from '@/components/electricity'
import { useLanguage } from '@/components/language-provider'
import { Magnetic } from '@/components/magnetic'
import { Stats } from '@/components/stats'

export function Hero() {
  const [powered, setPowered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { isFrench } = useLanguage()

  // Mouse parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const bgX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const bgY = useTransform(sy, [-0.5, 0.5], [-12, 12])
  const tfX = useTransform(sx, [-0.5, 0.5], [-32, 32])
  const tfY = useTransform(sy, [-0.5, 0.5], [-20, 20])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setPowered(true), reduce ? 100 : 900)
    return () => clearTimeout(t)
  }, [])

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-[var(--ink)] px-0 pb-10 pt-28 md:h-[100svh] md:min-h-[760px] md:items-center md:pb-44 md:pt-24 lg:min-h-[780px] lg:pb-48 xl:pb-0 xl:pt-0"
    >
      {/* Background industrial environment */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 scale-110"
        aria-hidden
      >
        <Image
          src="/images/power-station-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-50 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/60" />
      </motion.div>

      {/* Transformer */}
      <motion.div
        style={{ x: tfX, y: tfY }}
        className="absolute right-0 top-1/2 hidden h-[88%] w-[58%] -translate-y-1/2 md:block"
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0.12, filter: 'brightness(0.35) saturate(0.6)' }}
          animate={
            powered
              ? { opacity: 1, filter: 'brightness(1) saturate(1)' }
              : { opacity: 0.12 }
          }
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative h-full w-full animate-float"
        >
          <div className="relative h-full w-full animate-sway">
            <Image
              src="/images/transformer-hero.png"
              alt="SODIMFEL high-voltage power transformer"
              fill
              priority
              className="object-contain"
            />
          </div>
          {/* blue light bloom behind transformer */}
          <motion.div
            animate={{ opacity: powered ? [0.5, 0.85, 0.5] : 0 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 -z-10 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in oklch, var(--electric) 45%, transparent) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
        </motion.div>
        <Electricity active={powered} />
      </motion.div>

      {/* Mobile transformer (smaller, behind text) */}
      <motion.div
        initial={{ opacity: 0.12 }}
        animate={{ opacity: powered ? 0.4 : 0.12 }}
        transition={{ duration: 1.4 }}
        className="absolute right-[-20%] top-1/2 h-[70%] w-[90%] -translate-y-1/2 md:hidden"
        aria-hidden
      >
        <Image
          src="/images/transformer-hero.png"
          alt=""
          fill
          priority
          className="object-contain"
        />
      </motion.div>

      {/* Power-up flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.75, 0] }}
        transition={{ duration: 1.2, times: [0, 0.78, 0.85, 1], delay: 0 }}
        className="pointer-events-none absolute inset-0 z-20 bg-[var(--electric-bright)]"
        aria-hidden
      />

      {/* Fog */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--ink)] to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 xl:-translate-y-10 2xl:translate-y-0">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={powered ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-electric"
          >
            <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-electric-bright" />
            {isFrench
              ? 'Ingénierie • Énergie • Excellence'
              : 'Engineering • Energy • Excellence'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={powered ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
            className="text-balance text-4xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5rem] laptop-hero-title"
            style={{ letterSpacing: '-0.04em' }}
          >
            {isFrench ? (
              <>
                ALIMENTER
                <br />
                <span className="text-electric text-glow-electric">
                  L&apos;AVENIR DE
                </span>
                <br />
                L&apos;INDUSTRIE
              </>
            ) : (
              <>
                POWERING
                <br />
                <span className="text-electric text-glow-electric">
                  THE FUTURE
                </span>
                <br />
                OF INDUSTRY
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={powered ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-7 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {isFrench
              ? "Équipements électriques avancés, solutions industrielles, systèmes de distribution d'énergie et infrastructures énergétiques pour les entreprises modernes."
              : 'Advanced electrical equipment, industrial solutions, power distribution systems, and energy infrastructure for modern businesses.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={powered ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#products"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--electric)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:glow-electric"
              >
                {isFrench ? 'Découvrir les solutions' : 'Explore Solutions'}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[var(--ink)]"
              >
                {isFrench ? 'Demander un devis' : 'Request a Quote'}
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      <Stats />
    </section>
  )
}
