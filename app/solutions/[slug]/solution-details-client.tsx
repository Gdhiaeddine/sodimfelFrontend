'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  Database,
  Factory,
  FileCheck2,
  Gauge,
  Headset,
  Leaf,
  Lightbulb,
  Network,
  PenTool,
  RadioTower,
  Settings2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react'
import solutionDetailContent from '@/data/solution-detail-content.json'
import { useLanguage } from '@/components/language-provider'
import { getSolutions, type Solution } from '@/lib/solutions'

const iconMap = {
  badge: BadgeCheck,
  building: Building2,
  chart: BarChart3,
  clipboard: ClipboardCheck,
  cpu: Cpu,
  database: Database,
  factory: Factory,
  file: FileCheck2,
  gauge: Gauge,
  headset: Headset,
  leaf: Leaf,
  lightbulb: Lightbulb,
  network: Network,
  pen: PenTool,
  settings: Settings2,
  shield: ShieldCheck,
  sparkles: Sparkles,
  tower: RadioTower,
  wrench: Wrench,
  zap: Zap,
}

function getIcon(icon: string) {
  return iconMap[icon as keyof typeof iconMap] ?? Sparkles
}

const fadeUp = {
  hidden: { opacity: 0, y: 38 },
  show: { opacity: 1, y: 0 },
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-extrabold uppercase tracking-[3px] text-[#2563EB]">
      {children}
    </p>
  )
}

export function SolutionDetailsClient({ solution }: { solution: Solution }) {
  const { isArabic, language } = useLanguage()
  const copy = solutionDetailContent[language]
  const localizedSolution = getSolutions(language)[solution.slug] ?? solution

  return (
    <main className={`min-h-screen bg-white text-[#0F172A] ${isArabic ? 'text-right' : ''}`}>
      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-20 pt-24 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          <nav className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#64748B]">
            <Link href="/" className="hover:text-[#2563EB]">
              {copy.breadcrumbHome}
            </Link>
            <ChevronRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            <Link href="/solutions" className="hover:text-[#2563EB]">
              {copy.breadcrumbSolutions}
            </Link>
            <ChevronRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            <span className="text-[#0F172A]">{localizedSolution.title}</span>
          </nav>
          <span className="w-fit rounded-full bg-[#2563EB]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[2px] text-[#2563EB]">
            {localizedSolution.badge}
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] sm:text-6xl lg:text-[64px]">
            {localizedSolution.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-[#64748B]">
            {localizedSolution.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/request-quote" className="inline-flex h-13 items-center gap-2 rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.25)]">
              {copy.requestQuote}
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[520px]"
        >
          <div className="absolute inset-10 rounded-full bg-[#2563EB]/10 blur-[90px]" />
          <div className="relative h-full min-h-[520px] overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_26px_90px_rgba(15,23,42,0.08)]">
            <Image
              src={localizedSolution.heroImage}
              alt={localizedSolution.title}
              fill
              priority
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <div className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {localizedSolution.features.map((feature, index) => {
            const Icon = getIcon(feature.icon)
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
                className="min-w-[260px] flex-1 rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition hover:-translate-y-1.5 hover:border-[#2563EB] hover:shadow-[0_24px_70px_rgba(37,99,235,0.12)]"
              >
                <Icon className="h-7 w-7 text-[#2563EB]" />
                <h3 className="mt-5 text-lg font-bold text-[#0F172A]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  {feature.text}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-24 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -38 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <SectionLabel>{copy.overview}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#0F172A] sm:text-5xl">
            {localizedSolution.overviewTitle}
          </h2>
          <p className="mt-6 text-lg leading-[1.85] text-[#64748B]">
            {localizedSolution.overviewText}
          </p>
          <div className="mt-8 grid gap-4">
            {localizedSolution.checklist.map((item) => (
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
          className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-[#F8FAFC] shadow-[0_24px_80px_rgba(15,23,42,0.07)]"
        >
          <Image
            src={localizedSolution.heroImage}
            alt={localizedSolution.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-3">
            {copy.badges.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/40 bg-white/85 p-4 text-sm font-bold text-[#0F172A] shadow-lg backdrop-blur-md"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1440px] text-center">
          <SectionLabel>{copy.processLabel}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            {copy.processTitle}
          </h2>
          <div className="mt-14 flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden">
            {localizedSolution.process.map((step, index) => {
              const Icon = getIcon(step.icon)
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  className="relative min-w-[240px] flex-1 text-center"
                >
                  {index !== localizedSolution.process.length - 1 && (
                    <div className="absolute left-[60%] top-8 hidden w-full border-t border-dashed border-[#2563EB]/35 lg:block" />
                  )}
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_18px_38px_rgba(37,99,235,0.28)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-5 text-sm font-extrabold text-[#2563EB]">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-[#0F172A]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                    {step.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10">
        <SectionLabel>{copy.toolsLabel}</SectionLabel>
        <div className="mt-8 flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {localizedSolution.tools.map((tool, index) => {
            const Icon = getIcon(tool.icon)
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
                className="flex min-w-[300px] flex-1 items-center gap-4 rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.05)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A]">{tool.name}</h3>
                  <p className="mt-1 text-sm text-[#64748B]">{tool.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10">
        <SectionLabel>{copy.industriesLabel}</SectionLabel>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {localizedSolution.industries.map((industry, index) => {
            const Icon = getIcon(industry.icon)
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[#2563EB]"
              >
                <Icon className="h-7 w-7 text-[#2563EB]" />
                <h3 className="mt-5 font-bold text-[#0F172A]">
                  {industry.title}
                </h3>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10">
        <SectionLabel>{copy.projectsLabel}</SectionLabel>
        <div className="mt-8 grid gap-6">
          {localizedSolution.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="grid overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:grid-cols-[320px_1fr]"
            >
              <div className="relative min-h-[220px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  {project.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#64748B]">
                  {project.text}
                </p>
                <a className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                  {copy.viewCaseStudy}
                  <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto grid max-w-[1440px] gap-10 overflow-hidden rounded-[28px] bg-[#050816] p-8 text-white shadow-[0_28px_90px_rgba(5,8,22,0.28)] lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
        >
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/25 blur-[100px]" />
            <Zap className="absolute bottom-12 left-16 h-14 w-14 text-blue-300/20" />
          </div>
          <div className="relative z-10 flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {copy.ctaTitle}
            </h2>
            <p className="mt-3 text-2xl font-bold text-blue-200">
              {copy.ctaSubtitle}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              {copy.ctaDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/request-quote" className="inline-flex h-13 items-center rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white">
                {copy.requestQuote}
              </Link>
              <Link href="/contact" className="inline-flex h-13 items-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#050816]">
                {copy.contactUs}
              </Link>
            </div>
          </div>

          <form className="relative z-10 grid gap-4 rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            {[
              copy.form.fullName,
              copy.form.email,
              copy.form.company,
              copy.form.phone,
            ].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="h-12 rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-slate-300 focus:border-[#2563EB]"
                />
              )
            )}
            <textarea
              placeholder={copy.form.requirements}
              rows={5}
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300 focus:border-[#2563EB]"
            />
            <button className="h-12 rounded-xl bg-[#2563EB] text-sm font-bold text-white">
              {copy.form.submit}
            </button>
          </form>
        </motion.div>
      </section>
    </main>
  )
}
