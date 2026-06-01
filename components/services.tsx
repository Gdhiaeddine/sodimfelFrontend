'use client'

import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
  Cable,
  Factory,
  Wrench,
  Zap,
} from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/components/language-provider'

const SOLUTIONS = [
  {
    icon: Zap,
    title: { en: 'Electrical Equipment', fr: 'Équipements électriques' },
    desc: {
      en: 'High-performance electrical equipment engineered for industrial facilities, commercial developments, and mission-critical infrastructure.',
      fr: 'Équipements électriques haute performance conçus pour les sites industriels, les projets commerciaux et les infrastructures critiques.',
    },
    image: '/images/service-electrical.png',
  },
  {
    icon: Factory,
    title: { en: 'Industrial Solutions', fr: 'Solutions industrielles' },
    desc: {
      en: 'Integrated electrical systems designed to maximize operational efficiency, reliability, and long-term performance.',
      fr: 'Systèmes électriques intégrés conçus pour optimiser l’efficacité, la fiabilité et la performance à long terme.',
    },
    image: '/images/project-industrial-facility.png',
  },
  {
    icon: Cable,
    title: { en: 'Transformers', fr: 'Transformateurs' },
    desc: {
      en: 'Reliable oil-immersed and dry-type transformers delivering safe and efficient energy distribution.',
      fr: 'Transformateurs à huile et secs fiables pour une distribution d’énergie sûre et efficace.',
    },
    image: '/images/product-oil-transformer.png',
  },
  {
    icon: Wrench,
    title: { en: 'Maintenance Services', fr: 'Services de maintenance' },
    desc: {
      en: 'Preventive maintenance and technical support services that maximize equipment lifespan and minimize downtime.',
      fr: 'Maintenance préventive et support technique pour prolonger la durée de vie des équipements et réduire les arrêts.',
    },
    image: '/images/service-maintenance.png',
  },
]

function SolutionCard({
  solution,
  index,
}: {
  solution: (typeof SOLUTIONS)[number]
  index: number
}) {
  const { language } = useLanguage()
  const cardRef = useRef<HTMLElement>(null)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 18 })
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 18 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5])
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [18, -18])
  const Icon = solution.icon

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onPointerLeave() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        delay: 0.8 + index * 0.08,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="solution-card group"
    >
      <div className="solution-card-glow" aria-hidden />
      <div className="solution-card-line" aria-hidden />

      <div className="solution-image-wrap">
        <motion.div style={{ y: imageY }} className="relative h-full w-full">
          <Image
            src={solution.image}
            alt={solution.title[language]}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 260px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.12)] transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-rotate-45 group-hover:text-blue-600" />
      </div>

      <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-slate-950">
        {solution.title[language]}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.8] text-slate-500">
        {solution.desc[language]}
      </p>
    </motion.article>
  )
}

export function Services() {
  const { isFrench } = useLanguage()

  return (
    <section
      id="services"
      className="solution-section relative overflow-hidden bg-white py-[120px]"
    >
      <div className="solution-grid-bg" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className={`${isFrench ? 'max-w-[760px]' : 'max-w-[560px]'} text-left`}>
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold uppercase tracking-[2px] text-blue-600"
            >
              {isFrench ? 'Nos solutions' : 'Our Solutions'}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 text-balance text-4xl font-extrabold leading-[1.08] text-[#111827] sm:text-5xl lg:text-[52px]"
            >
              <span className="block">
                {isFrench ? 'Solutions intelligentes' : 'Smart Solutions'}
              </span>
              <span className="block">
                {isFrench ? 'Pour chaque industrie' : 'For Every Industry'}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-start md:justify-end"
          >
            <a href="#products" className="solution-button group">
              {isFrench ? 'Voir toutes les solutions' : 'View All Solutions'}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <div className="solution-slider mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-5 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {SOLUTIONS.map((solution, index) => (
            <SolutionCard
              key={solution.title.en}
              solution={solution}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
