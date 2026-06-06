'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Cpu,
  Factory,
  Gauge,
  Globe2,
  Headset,
  Leaf,
  LifeBuoy,
  Lightbulb,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import aboutContent from '@/data/about-content.json'
import { useLanguage } from '@/components/language-provider'
import { getSolutionList } from '@/lib/solutions'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const solutionIcons = {
  'etudes-realisations-electriques': Zap,
  'postes-livraison-sous-stations': RadioTower,
  'armoires-electriques-diverses': Wrench,
  'installation-electrique-industrielle': Factory,
  'equipements-sf6-schneider-sarel-ediel': Zap,
  'postes-prefabriques-beton-10kv-30kv': RadioTower,
  'disjoncteurs-bt-hp': LifeBuoy,
  'postes-transformateurs-mt-bt': RadioTower,
  'fusibles-cables-mt-bt': Wrench,
}

const valueIcons = [BadgeCheck, ShieldCheck, Lightbulb, Award, Users, Leaf]
const industryIcons = [Factory, RadioTower, Building2, Cpu, Gauge, Leaf, Globe2]

function CountUp({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 1800
    const start = performance.now()
    let frame = 0

    function animate(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-extrabold uppercase tracking-[3px] text-[#2563EB]">
      {children}
    </p>
  )
}

export default function AboutPage() {
  const { language, isArabic } = useLanguage()
  const about = aboutContent[language]
  const expertiseSolutions = getSolutionList(language).slice(0, 4)
  const heroStats = [
    { value: 25, suffix: '+', label: about.stats.years },
    { value: 500, suffix: '+', label: about.stats.projects },
    { value: 1000, suffix: '+', label: about.stats.clients },
    { value: 24, suffix: '/7', label: about.stats.support },
  ]

  return (
    <main className={`min-h-screen bg-white text-[#0F172A] ${isArabic ? 'text-right' : ''}`}>
      <section className="relative overflow-hidden px-6 pb-24 pt-32 lg:px-10 lg:pt-40">
        <div className="absolute left-1/2 top-24 h-[540px] w-[720px] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[100px]" />
        <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.nav
              variants={fadeUp}
              className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#64748B]"
            >
              <Link href="/" className="hover:text-[#2563EB]">
                {about.breadcrumbHome}
              </Link>
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              <span className="text-[#0F172A]">{about.breadcrumbCurrent}</span>
            </motion.nav>
            <motion.div variants={fadeUp}>
              <SectionLabel>{about.hero.label}</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-5xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] sm:text-6xl lg:text-[70px]"
            >
              {about.hero.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-[1.85] text-[#64748B]"
            >
              {about.hero.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.24)]"
              >
                {about.hero.contact}
                <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 46 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-8 rounded-full bg-[#2563EB]/15 blur-[90px]" />
            <div className="relative h-[560px] overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.1)]">
              <Image
                src="/images/sodimfel.webp"
                alt="Engineers inside an industrial electrical facility"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/20 via-transparent to-white/10" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="relative z-10 mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-4 rounded-[28px] border border-[#E5E7EB] bg-white/90 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="p-4 text-center">
              <p className="text-3xl font-extrabold text-[#0F172A]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-semibold text-[#64748B]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -42 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative min-h-[560px] overflow-hidden rounded-[32px] border border-[#E5E7EB] shadow-[0_26px_80px_rgba(15,23,42,0.08)]"
        >
          <Image
            src="/images/door.webp"
            alt="Engineer near transformer"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="flex flex-col justify-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{about.story.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-extrabold leading-tight text-[#0F172A] sm:text-5xl"
          >
            {about.story.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-[1.85] text-[#64748B]"
          >
            {about.story.text}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.06)]"
          >
            {about.story.timeline.map(([year, label], index) => (
              <div key={year} className="relative flex gap-5 pb-6 last:pb-0">
                {index !== about.story.timeline.length - 1 && (
                  <div className={`absolute top-10 h-full w-px bg-[#E5E7EB] ${isArabic ? 'right-[27px]' : 'left-[27px]'}`} />
                )}
                <div className="relative z-15 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#2563EB]/10 text-sm font-extrabold text-[#2563EB]">
                  {year}
                </div>
                <div className="pt-3">
                  <p className="font-bold text-[#0F172A]">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>{about.values.label}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            {about.values.title}
          </h2>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {about.values.items.map((value, index) => {
            const Icon = valueIcons[index] ?? BadgeCheck
            return (
              <motion.article
                key={`value-${index}`}
                variants={fadeUp}
                className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_28px_75px_rgba(37,99,235,0.13)]"
              >
                <Icon className="h-8 w-8 text-[#2563EB]" />
                <h3 className="mt-5 text-xl font-bold text-[#0F172A]">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#64748B]">
                  {value.text}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -38 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <SectionLabel>{about.why.label}</SectionLabel>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#0F172A] sm:text-5xl">
              {about.why.title}
            </h2>
            <div className="mt-8 grid gap-4">
              {about.why.checklist.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2563EB]" />
                  <span className="font-semibold text-[#0F172A]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 38 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[560px] overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_26px_80px_rgba(15,23,42,0.08)]"
          >
            <Image
              src="/images/project-power-plant.png"
              alt="Engineers inspecting transformer"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
        <SectionLabel>{about.expertise.label}</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
          {about.expertise.title}
        </h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {expertiseSolutions.map((solution) => {
            const Icon =
              solutionIcons[solution.slug as keyof typeof solutionIcons] ??
              Factory
            return (
              <motion.article
                key={solution.slug}
                variants={fadeUp}
                className="group overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_30px_80px_rgba(37,99,235,0.14)]"
              >
                <Link href={`/solutions/${solution.slug}`} className="block h-full">
                  <div className="relative h-[220px] overflow-hidden">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative p-7 pt-12">
                    <div className="absolute -top-9 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_18px_38px_rgba(37,99,235,0.28)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[2px] text-[#2563EB]">
                      {solution.category}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-[#0F172A]">
                      {solution.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#64748B]">
                      {solution.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                      {about.expertise.learnMore}
                      <ArrowRight
                        className={`h-4 w-4 transition ${
                          isArabic
                            ? 'rotate-180 group-hover:-translate-x-1'
                            : 'group-hover:translate-x-1'
                        }`}
                      />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </motion.div>
      </section>

      <section className="w-full bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel>{about.industries.label}</SectionLabel>
        </div>
        <div className="mx-auto mt-8 flex w-full max-w-[1400px] flex-wrap justify-start gap-5">
          {about.industries.items.map((title, index) => {
            const Icon = industryIcons[index] ?? Factory
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex min-h-[150px] w-full items-start rounded-[22px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_26px_70px_rgba(37,99,235,0.12)] sm:basis-[calc(50%-10px)] lg:basis-[calc(25%-16px)]"
              >
                <div>
                  <Icon className="h-8 w-8 text-[#2563EB]" />
                  <h3 className="mt-5 font-bold text-[#0F172A]">
                    {title}
                  </h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto min-h-[520px] max-w-[1400px] overflow-hidden rounded-[32px] shadow-[0_30px_90px_rgba(15,23,42,0.12)]"
        >
          <Image
            src="/images/project-power-plant.png"
            alt="MT/BT transformer post and industrial electrical infrastructure"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/75 via-[#0F172A]/30 to-transparent" />
          <div className="relative z-10 max-w-2xl p-8 text-white sm:p-12 lg:p-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
              <Zap className="h-7 w-7" />
            </div>
            <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl">
              {about.cta.title}
            </h2>
            <p className="mt-5 text-lg leading-[1.8] text-white/80">
              {about.cta.description}
            </p>
            <Link href="/solutions/postes-transformateurs-mt-bt" className="mt-8 inline-flex h-13 items-center gap-2 rounded-2xl bg-white px-7 text-sm font-bold text-[#0F172A]">
              {about.cta.button}
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
