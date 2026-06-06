'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileUp,
  Gauge,
  Headphones,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  UploadCloud,
  Wrench,
  Zap,
} from 'lucide-react'
import { FormEvent, useState } from 'react'
import requestQuoteContent from '@/data/request-quote-content.json'
import { useLanguage } from '@/components/language-provider'

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const heroStatIcons = [Clock, Headphones, Gauge, ShieldCheck]
const processIcons = [FileUp, BadgeCheck, Send]
const solutionIcons = [Zap, ShieldCheck, Gauge, BadgeCheck, Wrench, Headphones]

const initialForm = {
  projectTitle: '',
  company: '',
  contactPerson: '',
  email: '',
  phone: '',
  location: '',
  industry: '',
  product: '',
  quantity: '',
  timeline: '',
  description: '',
  consent: false,
}

type FormState = typeof initialForm

const inputClass =
  'h-14 w-full rounded-[14px] border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-extrabold uppercase tracking-[3px] text-[#2563EB]">
      {children}
    </p>
  )
}

export default function RequestQuotePage() {
  const { language, isArabic } = useLanguage()
  const copy = requestQuoteContent[language]
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [success, setSuccess] = useState(false)

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    setSuccess(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: Partial<Record<keyof FormState, string>> = {}
    if (!form.projectTitle.trim()) nextErrors.projectTitle = copy.errors.projectTitle
    if (!form.company.trim()) nextErrors.company = copy.errors.company
    if (!form.contactPerson.trim()) nextErrors.contactPerson = copy.errors.contactPerson
    if (!form.email.trim()) nextErrors.email = copy.errors.email
    if (!form.phone.trim()) nextErrors.phone = copy.errors.phone
    if (!form.location.trim()) nextErrors.location = copy.errors.location
    if (!form.industry) nextErrors.industry = copy.errors.industry
    if (!form.product) nextErrors.product = copy.errors.product
    if (!form.description.trim()) nextErrors.description = copy.errors.description
    if (!form.consent) nextErrors.consent = copy.errors.consent

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSuccess(true)
    setForm(initialForm)
  }

  return (
    <main className={`min-h-screen bg-white text-[#0F172A] ${isArabic ? 'text-right' : ''}`}>
      <section className="relative overflow-hidden px-6 pb-20 pt-[100px] lg:px-10 lg:pt-32">
        <div className="absolute left-1/2 top-24 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[110px]" />
        <motion.div
          aria-hidden
          animate={{ rotate: [0, 8, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[7%] top-[22%] hidden h-[280px] w-[520px] rounded-[50%] border border-[#2563EB]/30 lg:block"
        />

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
                {copy.breadcrumbHome}
              </Link>
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              <span className="text-[#0F172A]">{copy.breadcrumbCurrent}</span>
            </motion.nav>
            <motion.div variants={fadeUp}>
              <SectionLabel>{copy.heroLabel}</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#0F172A] sm:text-6xl lg:text-[68px]"
            >
              {copy.heroTitleTop}
              <br />
              <span className="text-[#2563EB]">{copy.heroTitleHighlight}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-[1.85] text-[#64748B]"
            >
              {copy.heroDescription}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <a href="#quote-form" className="inline-flex h-14 items-center gap-2 rounded-[14px] bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.24)] transition hover:shadow-[0_24px_50px_rgba(37,99,235,0.35)]">
                {copy.submit}
                <Send className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 46 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-[540px] overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.1)]"
            >
              <div className="absolute inset-8 rounded-full bg-[#2563EB]/15 blur-[90px]" />
              <Image
                src="/images/project-industrial-facility.png"
                alt="Electrical engineers holding a tablet inside an industrial facility"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/25 via-transparent to-white/10" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75 }}
          className="relative z-10 mx-auto mt-14 grid max-w-[1200px] grid-cols-1 gap-4 rounded-[28px] border border-[#E5E7EB] bg-white/90 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
        >
          {copy.heroStats.map((stat, index) => {
            const Icon = heroStatIcons[index] ?? Clock
            return (
              <div key={stat.title} className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-extrabold text-[#0F172A]">{stat.title}</p>
                  <p className="text-sm font-semibold text-[#64748B]">
                    {stat.text}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </section>

      <section className="px-6 pb-[100px] pt-12 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid content-start gap-6">
            <motion.div
              initial={{ opacity: 0, x: -34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.07)]"
            >
              <h2 className="text-3xl font-extrabold text-[#0F172A]">
                {copy.processTitle}
              </h2>
              <div className="mt-8 grid gap-6">
                {copy.processSteps.map((step, index) => {
                  const Icon = processIcons[index] ?? FileUp
                  return (
                    <div key={step.title} className="relative flex gap-5">
                      {index !== copy.processSteps.length - 1 && (
                        <div className={`absolute top-14 h-full border-dotted border-[#2563EB]/35 ${isArabic ? 'right-6 border-r' : 'left-6 border-l'}`} />
                      )}
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_16px_34px_rgba(37,99,235,0.28)] transition hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-[#0F172A]">
                          {index + 1}. {step.title}
                        </p>
                        <p className="mt-2 leading-relaxed text-[#64748B]">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-[28px] border border-[#E5E7EB] bg-[#F8FAFC] p-8 shadow-[0_20px_65px_rgba(15,23,42,0.06)]"
            >
              <SectionLabel>{copy.helpLabel}</SectionLabel>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0F172A]">
                {copy.helpTitle}
              </h2>
              <p className="mt-4 leading-[1.8] text-[#64748B]">
                {copy.helpDescription}
              </p>
              <div className="mt-7 grid gap-4 text-[#64748B]">
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#2563EB]" />
                  {copy.setif}: 0550460983 / 0560459703 / 0560092347
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#2563EB]" />
                  {copy.djelfa}: 0560978095 / 0560670045
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#2563EB]" />
                  sarlsodimfel@gmail.com
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#2563EB]" />
                  {copy.workingHours}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.form
            id="quote-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-10"
          >
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              {copy.formTitle}
            </h2>

            {success && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-relaxed text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                {copy.success}
              </div>
            )}

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Field label={copy.fields.projectTitle} error={errors.projectTitle} required>
                <input value={form.projectTitle} onChange={(event) => updateField('projectTitle', event.target.value)} className={inputClass} />
              </Field>
              <Field label={copy.fields.company} error={errors.company} required>
                <input value={form.company} onChange={(event) => updateField('company', event.target.value)} className={inputClass} />
              </Field>
              <Field label={copy.fields.contactPerson} error={errors.contactPerson} required>
                <input value={form.contactPerson} onChange={(event) => updateField('contactPerson', event.target.value)} className={inputClass} />
              </Field>
              <Field label={copy.fields.email} error={errors.email} required>
                <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} className={inputClass} />
              </Field>
              <Field label={copy.fields.phone} error={errors.phone} required>
                <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className={inputClass} />
              </Field>
              <Field label={copy.fields.location} error={errors.location} required>
                <input value={form.location} onChange={(event) => updateField('location', event.target.value)} className={inputClass} />
              </Field>
              <Field label={copy.fields.industry} error={errors.industry} required full>
                <select value={form.industry} onChange={(event) => updateField('industry', event.target.value)} className={inputClass}>
                  <option value="">{copy.placeholders.industry}</option>
                  {copy.industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <h3 className="mt-10 text-2xl font-extrabold text-[#0F172A]">
              {copy.fields.requirementsTitle}
            </h3>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Field label={copy.fields.product} error={errors.product} required full>
                <select value={form.product} onChange={(event) => updateField('product', event.target.value)} className={inputClass}>
                  <option value="">{copy.placeholders.product}</option>
                  {copy.productOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={copy.fields.quantity}>
                <input value={form.quantity} onChange={(event) => updateField('quantity', event.target.value)} className={inputClass} />
              </Field>
              <Field label={copy.fields.timeline}>
                <select value={form.timeline} onChange={(event) => updateField('timeline', event.target.value)} className={inputClass}>
                  <option value="">{copy.placeholders.timeline}</option>
                  {copy.timelines.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={copy.fields.description} error={errors.description} required full>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  placeholder={copy.placeholders.description}
                  className={`${inputClass} min-h-[180px] resize-none py-4`}
                />
              </Field>
            </div>

            <div className="mt-6 rounded-[20px] border border-dashed border-[#2563EB]/35 bg-[#F8FAFC] p-8 text-center transition hover:border-[#2563EB] hover:bg-[#2563EB]/5">
              <UploadCloud className="mx-auto h-10 w-10 text-[#2563EB]" />
              <p className="mt-4 font-bold text-[#0F172A]">
                {copy.uploadTitle}
              </p>
              <p className="mt-2 text-sm text-[#64748B]">
                {copy.uploadMeta}
              </p>
            </div>

            <label className="mt-6 flex gap-3 text-sm leading-relaxed text-[#64748B]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField('consent', event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#E5E7EB] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span>
                {copy.consent}
                {errors.consent && (
                  <span className="block font-semibold text-red-500">
                    {errors.consent}
                  </span>
                )}
              </span>
            </label>

            <button className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-[14px] bg-[#2563EB] text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.22)] transition hover:shadow-[0_24px_50px_rgba(37,99,235,0.34)]">
              {copy.submit}
              <Send className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel>{copy.solutionsLabel}</SectionLabel>
          <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
            {copy.solutionsTitle}
          </h2>
          <motion.div
            key={`solutions-${language}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-80px' }}
            variants={stagger}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {copy.solutions.map((solution, index) => {
              const Icon = solutionIcons[index] ?? Zap
              return (
                <motion.article
                  key={`solution-${index}`}
                  variants={fadeUp}
                  className="group rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_28px_75px_rgba(37,99,235,0.13)]"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB] transition group-hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#0F172A]">
                    {solution.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#64748B]">
                    {solution.text}
                  </p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative mx-auto grid max-w-[1400px] gap-10 overflow-hidden rounded-[28px] bg-[#050816] p-8 text-white shadow-[0_28px_90px_rgba(5,8,22,0.28)] lg:grid-cols-[1fr_380px] lg:p-14"
        >
          <div className="absolute inset-0 opacity-50">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/25 blur-[100px]" />
            <motion.div
              animate={{ x: ['-20%', '120%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-12 h-px w-1/2 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent"
            />
          </div>
          <div className="relative z-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-[0_0_45px_rgba(37,99,235,0.45)]">
              <Zap className="h-8 w-8" />
            </div>
            <h2 className="mt-8 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              {copy.finalCtaTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              {copy.finalCtaDescription}
            </p>
          </div>
          <div className="relative z-10 grid content-center gap-4">
            {copy.ctaStats.map((stat) => (
              <div key={stat} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <CheckCircle2 className="h-5 w-5 text-blue-300" />
                <p className="font-bold text-white">{stat}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  )
}

function Field({
  label,
  error,
  required,
  full,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  full?: boolean
  children: React.ReactNode
}) {
  return (
    <label className={`block ${full ? 'md:col-span-2' : ''}`}>
      <span className="text-sm font-bold text-[#0F172A]">
        {label}
        {required && <span className="text-[#2563EB]"> *</span>}
      </span>
      <span className="mt-2 block">{children}</span>
      {error && <span className="mt-2 block text-sm font-semibold text-red-500">{error}</span>}
    </label>
  )
}
