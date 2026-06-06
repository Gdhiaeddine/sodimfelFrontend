'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  ChevronRight,
  Cpu,
  Database,
  Factory,
  Headset,
  Leaf,
  LifeBuoy,
  RadioTower,
  Wrench,
  Zap,
} from 'lucide-react'
import solutionsPageContent from '@/data/solutions-page-content.json'
import { useLanguage } from '@/components/language-provider'
import { getSolutionList } from '@/lib/solutions'

const solutionIcons = {
  pen: Cpu,
  tower: RadioTower,
  settings: Wrench,
  wrench: Wrench,
  headset: Headset,
  cpu: Cpu,
  zap: Zap,
  factory: Factory,
  building: Factory,
  badge: Cpu,
  chart: Cpu,
  sparkles: Zap,
  shield: LifeBuoy,
  clipboard: Cpu,
  lightbulb: Zap,
  file: Cpu,
  gauge: Cpu,
  database: Database,
  network: RadioTower,
  leaf: Leaf,
  bot: Bot,
}

const specializedIcons = [RadioTower, Zap, Factory, Wrench, Database, LifeBuoy]

export default function SolutionsPage() {
  const { content, isArabic, language } = useLanguage()
  const page = solutionsPageContent[language]
  const solutionList = getSolutionList(language)

  return (
    <main className={`min-h-screen bg-white text-[#0F172A] ${isArabic ? 'text-right' : ''}`}>
      <section className="relative overflow-hidden bg-white px-6 pb-20 pt-[100px] lg:px-10">
        <div className="absolute right-[10%] top-[26%] h-[420px] w-[560px] rounded-full bg-[#2563EB]/10 blur-[90px]" />
        <div className="absolute right-[18%] top-[18%] hidden h-px w-[420%] rotate-12 bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent lg:block" />

        <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#64748B]">
              <Link href="/" className="hover:text-[#2563EB]">
                {page.breadcrumbHome}
              </Link>
              <ChevronRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              <span className="text-[#0F172A]">{page.breadcrumbCurrent}</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-[2px] text-[#2563EB]">
              {page.heroLabel}
            </p>
            <h1 className="mt-5 max-w-[720px] text-5xl font-extrabold leading-[1.05] text-[#0F172A] sm:text-6xl lg:text-[64px]">
              {page.heroTitle.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-[640px] text-lg leading-[1.8] text-[#64748B]">
              {page.heroDescription}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/request-quote" className="inline-flex h-13 items-center gap-2 rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.25)]">
                {content.common.requestQuote}
                <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              </Link>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[420px]"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-0 top-0 h-[360px] w-[78%]"
            >
              <Image
                src="/images/product-oil-transformer.png"
                alt="Transformer solution"
                fill
                priority
                className="object-contain drop-shadow-[0_34px_45px_rgba(15,23,42,0.16)]"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.8,
              }}
              className="absolute bottom-2 left-0 h-[260px] w-[48%]"
            >
              <Image
                src="/images/product-switchgear.png"
                alt="Electrical cabinet solution"
                fill
                className="object-contain drop-shadow-[0_28px_38px_rgba(15,23,42,0.14)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-[1440px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-extrabold uppercase tracking-[3px] text-[#2563EB]"
          >
            {page.allLabel}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-[#0F172A] sm:text-5xl"
          >
            {page.allTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-3xl text-lg leading-[1.8] text-[#64748B]"
          >
            {page.allDescription}
          </motion.p>
        </div>

        <div className="mx-auto mt-14 max-w-[1440px]">
          <div className="min-w-0">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {solutionList.map((solution) => {
                const Icon =
                  solutionIcons[solution.features[0]?.icon as keyof typeof solutionIcons] ??
                  Cpu
                return (
                  <Link
                    key={solution.slug}
                    href={`/solutions/${solution.slug}`}
                    className="group block"
                  >
                    <motion.article
                      variants={{
                        hidden: { opacity: 0, y: 42 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className="h-full overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-300 group-hover:-translate-y-2.5 group-hover:border-[#2563EB] group-hover:shadow-[0_30px_80px_rgba(37,99,235,0.14)]"
                    >
                      <div className="relative h-[220px] overflow-hidden">
                        <Image
                          src={solution.image}
                          alt={solution.title}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-[1.06]"
                        />
                      </div>
                      <div className="relative p-7 pt-12">
                        <div className="absolute -top-9 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_18px_38px_rgba(37,99,235,0.28)] transition group-hover:shadow-[0_0_38px_rgba(37,99,235,0.45)]">
                          <Icon className="h-7 w-7" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[2px] text-[#2563EB]">
                          {solution.category}
                        </p>
                        <h3 className="mt-3 text-2xl font-bold text-[#0F172A]">
                          {solution.title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-[#64748B]">
                          {solution.description}
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                          {page.learnMore}
                          <ArrowRight
                            className={`h-4 w-4 transition ${
                              isArabic
                                ? 'rotate-180 group-hover:-translate-x-1'
                                : 'group-hover:translate-x-1'
                            }`}
                          />
                        </span>
                      </div>
                    </motion.article>
                  </Link>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-10 overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-[#F8FAFC] p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-3xl font-extrabold text-[#0F172A]">
                    {page.specializedTitle}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-[#64748B]">
                    {page.specializedDescription}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {page.specializedItems.map((title, index) => {
                  const Icon = specializedIcons[index] ?? RadioTower
                  return (
                    <div
                      key={title}
                      className={`flex min-w-[210px] items-center gap-4 pr-6 ${
                        index !== page.specializedItems.length - 1
                          ? 'border-r border-[#E5E7EB]'
                          : ''
                      }`}
                    >
                      <Icon className="h-7 w-7 shrink-0 text-[#2563EB]" />
                      <p className="font-bold text-[#0F172A]">{title}</p>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#050816] p-8 text-white shadow-[0_28px_90px_rgba(5,8,22,0.28)] lg:grid-cols-[1fr_360px] lg:p-12"
        >
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/25 blur-[90px]" />
            <Zap className="absolute bottom-12 left-16 h-14 w-14 text-blue-300/20" />
          </div>
          <div className="relative z-10">
            <h2 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {page.ctaTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              {page.ctaDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/request-quote" className="inline-flex h-13 items-center rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white">
                {content.common.requestQuote}
              </Link>
              <Link href="/contact" className="inline-flex h-13 items-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#050816]">
                {content.common.contactUs}
              </Link>
            </div>
          </div>
          <div className="relative z-10 mt-10 hidden min-h-[240px] lg:block">
            <Image
              src="/images/product-oil-transformer.png"
              alt="Transformer"
              fill
              className="object-contain drop-shadow-[0_28px_44px_rgba(37,99,235,0.25)]"
            />
          </div>
        </motion.div>
      </section>
    </main>
  )
}
