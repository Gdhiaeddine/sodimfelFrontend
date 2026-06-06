'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Factory,
  Globe2,
  Handshake,
  Headphones,
  Network,
  PhoneCall,
  Quote,
  RadioTower,
  ShieldCheck,
  Sparkles,
  TowerControl,
  Users,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import projectsPageContent from '@/data/projects-page-content.json'
import { useLanguage } from '@/components/language-provider'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const clients = [
  { name: 'Taouab', logo: '/enterprises/taouab.png' },
  { name: 'Sonelgaz', logo: '/enterprises/Sonlgaz.png' },
  { name: 'Sonatrach', logo: '/enterprises/Sonatrach.svg' },
  {
    name: 'Shapoorji Pallonji',
    logo: '/enterprises/Shapoorji_Pallonji_Group_logo.svg',
  },
  { name: 'Saida', logo: '/enterprises/saida.png' },
  { name: 'Petrogel', logo: '/enterprises/petrogel.png' },
  { name: 'Petro Baraka', logo: '/enterprises/petro-baraka.png' },
  { name: 'Kahrif', logo: '/enterprises/kahrif.png' },
  { name: 'Iris', logo: '/enterprises/iris.png' },
  { name: 'Hodna', logo: '/enterprises/hodna.png' },
  { name: 'High Plast', logo: '/enterprises/high plast.jpg' },
  { name: 'Guedila', logo: '/enterprises/guedila.png' },
  { name: 'Geant', logo: '/enterprises/geant.png' },
  { name: 'FCM', logo: '/enterprises/fcm.png' },
  {
    name: 'Faienceries Algeriennes',
    logo: '/enterprises/faiencereis algerinnes.png',
  },
  { name: 'Fabri Plasto', logo: '/enterprises/fabri-plasto.png' },
  { name: 'Extra', logo: '/enterprises/extra.png' },
  { name: 'EM', logo: '/enterprises/em.png' },
  { name: 'El Kantra', logo: '/enterprises/elkantra.png' },
  { name: 'Cosider', logo: '/enterprises/Cosider_Logo.svg' },
  { name: 'Condor', logo: '/enterprises/condor.png' },
  {
    name: 'CSCEC',
    logo: '/enterprises/China_State_Construction_Engineering_Corporation_logo.svg.png',
  },
  { name: 'Ceramica Seklouli', logo: '/enterprises/ceramica-seklouli.png' },
  { name: 'Arwa', logo: '/enterprises/arwa.png' },
  { name: 'Agrofilm', logo: '/enterprises/agrofilm.png' },
].map((client) => ({
  ...client,
  industry: 'Industrial & Infrastructure',
  slug: client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
}))

const stats = [
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 1000, suffix: '+', label: 'Satisfied Clients' },
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 6, suffix: '+', label: 'Industries Served' },
]

const industries = [
  {
    title: 'Power Utilities',
    text: 'Electrical infrastructure for power generation and distribution networks.',
    icon: RadioTower,
  },
  {
    title: 'Industrial Manufacturing',
    text: 'Reliable equipment and services for high-demand production facilities.',
    icon: Factory,
  },
  {
    title: 'Oil & Gas',
    text: 'Robust electrical solutions for critical energy environments.',
    icon: TowerControl,
  },
  {
    title: 'Telecommunications',
    text: 'Power continuity solutions for communication infrastructure.',
    icon: Network,
  },
  {
    title: 'Infrastructure',
    text: 'Systems supporting ports, transport, utilities, and public projects.',
    icon: Building2,
  },
  {
    title: 'Commercial Buildings',
    text: 'Safe and efficient distribution for modern commercial facilities.',
    icon: Globe2,
  },
]

const partnershipCards = [
  {
    title: 'Reliable Delivery',
    text: 'We support clients with dependable execution, clear communication, and consistent project follow-through.',
    icon: CheckCircle2,
  },
  {
    title: 'Certified Expertise',
    text: 'Our technical teams work with certified equipment, proven methods, and international standards.',
    icon: BadgeCheck,
  },
  {
    title: 'Long-Term Support',
    text: 'We remain available after delivery with maintenance, technical guidance, and lifecycle support.',
    icon: Headphones,
  },
]

const testimonials = [
  {
    logo: '5.0',
    quote:
      "Service agreable et produits innovants comme poste de transformateur prefabriqué !!! si quelqu'un a besoin des equipement Moyenne tension ... c'est la place à visiter.",
    name: 'math student',
    position: 'Local Guide · 24 avis · 20 photos',
    company: 'Google Maps · il y a 6 ans',
  },
  {
    logo: '5.0',
    quote:
      'Innovative products, & good service. You should consider opening a branch in the Algerian west.',
    name: 'Automation SummerCamp',
    position: '4 avis',
    company: 'Google Maps · il y a 6 ans',
  },
  {
    logo: '5.0',
    quote:
      'Bon service et bonne qualité.',
    name: 'oussama samai',
    position: '3 avis',
    company: 'Google Maps · il y a 2 ans',
  },
]

const reachStats = [
  `${clients.length}+ Client Logos`,
  '5-Star Customer Feedback',
  `${industries.length}+ Service Sectors`,
  '25+ Years Experience',
]

const industryIcons = [RadioTower, Factory, TowerControl, Network, Building2, Globe2]
const partnershipIcons = [CheckCircle2, BadgeCheck, Headphones]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-extrabold uppercase tracking-[3px] text-[#2563EB]">
      {children}
    </p>
  )
}

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

    const duration = 1700
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

function MapGraphic({ dark = false }: { dark?: boolean }) {
  const points = [
    ['22%', '36%'],
    ['36%', '48%'],
    ['52%', '34%'],
    ['66%', '52%'],
    ['78%', '39%'],
  ]

  return (
    <div
      className={`relative min-h-[360px] overflow-hidden rounded-[30px] border ${
        dark ? 'border-white/10 bg-white/5' : 'border-[#E5E7EB] bg-white'
      }`}
    >
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(37,99,235,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.15)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2563EB]/25" />
      <div className="absolute left-[14%] top-[44%] h-px w-[72%] bg-gradient-to-r from-transparent via-[#2563EB]/55 to-transparent" />
      <div className="absolute left-[24%] top-[30%] h-px w-[54%] rotate-12 bg-gradient-to-r from-transparent via-[#2563EB]/35 to-transparent" />
      {points.map(([left, top], index) => (
        <motion.span
          key={`${left}-${top}`}
          animate={{ scale: [1, 1.55, 1], opacity: [0.9, 0.35, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.25 }}
          className="absolute h-4 w-4 rounded-full bg-[#2563EB] shadow-[0_0_30px_rgba(37,99,235,0.7)]"
          style={{ left, top }}
        />
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  const { content, isArabic, language } = useLanguage()
  const page = projectsPageContent[language]
  const localizedTestimonials = page.testimonials
  const localizedReachStats = [
    `${clients.length}+ ${page.reachStats[0]}`,
    page.reachStats[1],
    `${page.industries.length}+ ${page.reachStats[2]}`,
    `25+ ${page.reachStats[3]}`,
  ]
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial(
        (current) => (current + 1) % localizedTestimonials.length
      )
    }, 5000)

    return () => window.clearInterval(timer)
  }, [localizedTestimonials.length])

  const testimonial = localizedTestimonials[activeTestimonial]

  return (
    <main className={`min-h-screen bg-white text-[#0F172A] ${isArabic ? 'text-right' : ''}`}>
      <section className="relative h-auto min-h-[650px] overflow-hidden bg-white px-6 pt-32 lg:px-10">
        <div className="absolute left-1/2 top-24 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[110px]" />
        <motion.div
          aria-hidden
          animate={{ x: ['-20%', '110%'], opacity: [0, 0.75, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute right-0 top-[44%] h-px w-1/2 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"
        />
        <div className="relative z-10 mx-auto grid min-h-[650px] max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
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
                {page.breadcrumbHome}
              </Link>
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              <span className="text-[#0F172A]">{page.breadcrumbCurrent}</span>
            </motion.nav>
            <motion.div variants={fadeUp}>
              <SectionLabel>{page.heroLabel}</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-5xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] sm:text-6xl lg:text-[68px]"
            >
              {page.heroTitle}
              <br />
              <span className="text-[#2563EB]">{page.heroHighlight}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-[1.85] text-[#64748B]"
            >
              {page.heroDescription}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-2 rounded-[14px] bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.24)]"
              >
                {content.common.requestQuote}
                <PhoneCall className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 46 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[520px]"
          >
            <div className="absolute inset-0 rounded-full bg-[#2563EB]/15 blur-[100px]" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-[520px]"
            >
              <Image
                src="/images/product-oil-transformer.png"
                alt="Premium transformer and industrial facility"
                fill
                priority
                className="object-contain drop-shadow-[0_36px_55px_rgba(15,23,42,0.18)]"
              />
            </motion.div>
            <motion.div
              aria-hidden
              animate={{ x: ['-20%', '110%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-24 left-0 h-px w-[80%] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent"
            />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-350 px-6 py-24 text-center lg:px-10">
        <SectionLabel>{page.clientsLabel}</SectionLabel>
        <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
          {page.clientsTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-[1.8] text-[#64748B]">
          {page.clientsDescription}
        </p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-10"
        >
          {clients.map((client) => (
            <motion.article
              key={client.slug}
              variants={fadeUp}
              className="flex h-[118px] w-[230px] items-center justify-center px-6 transition duration-300 hover:-translate-y-1"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={180}
                height={80}
                className="max-h-[82px] w-auto max-w-[205px] object-contain opacity-90 transition duration-300 hover:opacity-100"
              />
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-[120px] lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel>{page.industriesLabel}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            {page.industriesTitle}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.industries.map((industry, index) => {
              const Icon = industryIcons[index] ?? Factory
              return (
                <motion.article
                  key={industry.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_28px_75px_rgba(37,99,235,0.13)]"
                >
                  <Icon className="h-10 w-10 text-[#2563EB]" />
                  <h3 className="mt-6 text-xl font-bold text-[#0F172A]">
                    {industry.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#64748B]">
                    {industry.text}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>{page.partnershipLabel}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            {page.partnershipTitle}
          </h2>
          <p className="mt-5 text-lg leading-[1.8] text-[#64748B]">
            {page.partnershipDescription}
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {page.partnershipCards.map((card, index) => {
            const Icon = partnershipIcons[index] ?? CheckCircle2
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)] transition hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_30px_80px_rgba(37,99,235,0.14)]"
              >
                <Icon className="h-10 w-10 text-[#2563EB]" />
                <h3 className="mt-6 text-2xl font-extrabold text-[#0F172A]">
                  {card.title}
                </h3>
                <p className="mt-4 leading-[1.8] text-[#64748B]">{card.text}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[980px] text-center">
          <SectionLabel>{page.testimonialsLabel}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            {page.testimonialsTitle}
          </h2>
          <div className="relative mt-12 min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.article
                key={testimonial.company}
                initial={{ opacity: 0, x: 45 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -45 }}
                transition={{ duration: 0.55 }}
                className={`rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-10 ${
                  isArabic ? 'text-right' : 'text-left'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-xl font-extrabold text-[#0F172A]">
                    {testimonial.logo} ★★★★★
                  </div>
                  <Quote className="h-10 w-10 text-[#2563EB]" />
                </div>
                <p className="mt-8 text-2xl font-semibold leading-[1.55] text-[#0F172A]">
                  "{testimonial.quote}"
                </p>
                <div className="mt-8">
                  <p className="font-extrabold text-[#0F172A]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {testimonial.position} - {testimonial.company}
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <SectionLabel>{page.networkLabel}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            {page.networkTitle}
          </h2>
          <p className="mt-5 text-lg leading-[1.8] text-[#64748B]">
            {page.networkDescription}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {localizedReachStats.map((stat) => (
              <div
                key={stat}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.05)]"
              >
                <p className="font-extrabold text-[#0F172A]">{stat}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <MapGraphic />
        </motion.div>
      </section>

      <section className="px-6 pb-28 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto grid max-w-[1400px] gap-10 overflow-hidden rounded-[32px] bg-[#050816] p-8 text-white shadow-[0_28px_90px_rgba(5,8,22,0.28)] lg:grid-cols-[1fr_420px] lg:p-16"
        >
          <div className="absolute inset-0 opacity-50">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/25 blur-[100px]" />
            <motion.div
              animate={{ x: ['-20%', '120%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-16 h-px w-1/2 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent"
            />
          </div>
          <div className="relative z-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB] shadow-[0_0_45px_rgba(37,99,235,0.45)]">
              <Handshake className="h-8 w-8" />
            </div>
            <h2 className="mt-8 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {page.ctaTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              {page.ctaDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/request-quote"
                className="inline-flex h-14 items-center rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white"
              >
                {page.scheduleCall}
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#050816]"
              >
                {content.common.contactUs}
              </Link>
            </div>
          </div>
          <div className="relative z-10">
            <MapGraphic dark />
          </div>
        </motion.div>
      </section>
    </main>
  )
}
