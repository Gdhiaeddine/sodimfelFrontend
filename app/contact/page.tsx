'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowDownToLine,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { FormEvent, useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const heroStats = [
  { title: '24/7', label: 'Technical Support', icon: Headphones },
  { title: 'Quick', label: 'Response', icon: Zap },
  { title: '1000+', label: 'Trusted By Thousands', icon: Users },
  { title: 'Expert', label: 'Team', icon: BadgeCheck },
]

const contactInfo = [
  {
    title: 'Head Office',
    lines: ['Zone Industrielle, Douala, Cameroon', 'P.O. Box 1234 Douala'],
    icon: MapPin,
  },
  {
    title: 'Phone',
    lines: ['+237 233 42 34 00', '+237 696 12 34 56'],
    icon: Phone,
  },
  {
    title: 'Email',
    lines: ['info@sodimfel.com', 'support@sodimfel.com'],
    icon: Mail,
  },
  {
    title: 'Working Hours',
    lines: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Saturday: 8:00 AM - 1:00 PM'],
    icon: Clock,
  },
]

const features = [
  {
    title: 'Fast Response',
    text: 'Our team responds quickly to project, product, and support requests.',
    icon: Zap,
  },
  {
    title: 'Expert Support',
    text: 'Experienced engineers help you choose the right technical solution.',
    icon: Headphones,
  },
  {
    title: 'Quality Solutions',
    text: 'Certified products and reliable services for demanding industries.',
    icon: ShieldCheck,
  },
  {
    title: 'Customer Focused',
    text: 'Clear communication and dependable support from first contact onward.',
    icon: Users,
  },
]

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
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

export default function ContactPage() {
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
    if (!form.name.trim()) nextErrors.name = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email address is required.'
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'
    if (!form.consent) nextErrors.consent = 'Please accept the privacy consent.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSuccess(true)
    setForm(initialForm)
  }

  return (
    <main className="min-h-screen bg-white text-[#0F172A]">
      <section className="relative overflow-hidden px-6 pb-20 pt-[100px] lg:px-10">
        <div className="absolute left-1/2 top-24 h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[110px]" />
        <motion.div
          aria-hidden
          animate={{ opacity: [0.25, 0.65, 0.25], x: [-80, 80, -80] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-0 top-36 hidden h-px w-[55%] bg-gradient-to-r from-transparent via-[#2563EB] to-transparent blur-[1px] lg:block"
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
                Home
              </Link>
              <ArrowRight className="h-4 w-4" />
              <span className="text-[#0F172A]">Contact Us</span>
            </motion.nav>
            <motion.div variants={fadeUp}>
              <SectionLabel>Contact Us</SectionLabel>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-5 text-5xl font-extrabold leading-[1.04] tracking-tight text-[#0F172A] sm:text-6xl lg:text-[68px]"
            >
              Let&apos;s Build
              <br />
              The Future{' '}
              <span className="text-[#2563EB]">Together</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-[1.85] text-[#64748B]"
            >
              We&apos;re here to help you with reliable electrical solutions,
              expert support, and tailored services for your business.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <a href="#contact-form" className="inline-flex h-14 items-center gap-2 rounded-[14px] bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.24)] transition hover:shadow-[0_22px_45px_rgba(37,99,235,0.35)]">
                Send Message
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
              className="relative h-[520px] overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.1)]"
            >
              <div className="absolute inset-8 rounded-full bg-[#2563EB]/15 blur-[90px]" />
              <Image
                src="/images/project-power-plant.png"
                alt="Electrical engineer on phone inside industrial electrical room"
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
          className="relative z-10 mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-4 rounded-[28px] border border-[#E5E7EB] bg-white/90 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
        >
          {heroStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex items-center gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-extrabold text-[#0F172A]">{stat.title}</p>
                  <p className="text-sm font-semibold text-[#64748B]">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-9"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Get In Touch</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-4xl font-extrabold leading-tight text-[#0F172A] sm:text-5xl"
            >
              We&apos;d Love To Hear From You
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 leading-[1.8] text-[#64748B]"
            >
              Whether you have a question about our products, need technical
              support, or want to discuss a project, our team is ready to assist
              you.
            </motion.p>

            <div className="mt-8 grid gap-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="flex gap-4 rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] transition hover:-translate-y-1.5 hover:border-[#2563EB] hover:shadow-[0_24px_65px_rgba(37,99,235,0.12)]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A]">{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className="mt-1 text-sm text-[#64748B]">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.form
            id="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.07)] sm:p-9"
          >
            <h2 className="text-3xl font-extrabold text-[#0F172A]">
              Send Us A Message
            </h2>

            {success && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
                Your message has been sent successfully.
              </div>
            )}

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Field label="Full Name" error={errors.name} required>
                <input
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  className={inputClass}
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Email Address" error={errors.email} required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Company Name">
                <input
                  value={form.company}
                  onChange={(event) => updateField('company', event.target.value)}
                  className={inputClass}
                  placeholder="Company"
                />
              </Field>
              <Field label="Phone Number">
                <input
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  className={inputClass}
                  placeholder="+237 ..."
                />
              </Field>
              <Field label="Subject" error={errors.subject} required full>
                <input
                  value={form.subject}
                  onChange={(event) => updateField('subject', event.target.value)}
                  className={inputClass}
                  placeholder="How can we help?"
                />
              </Field>
              <Field label="Message" error={errors.message} required full>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField('message', event.target.value)}
                  className={`${inputClass} min-h-[180px] resize-none py-4`}
                  placeholder="Tell us about your project or request..."
                />
              </Field>
            </div>

            <label className="mt-6 flex gap-3 text-sm leading-relaxed text-[#64748B]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField('consent', event.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#E5E7EB] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span>
                I agree to the Privacy Policy and consent to being contacted.
                {errors.consent && (
                  <span className="block font-semibold text-red-500">
                    {errors.consent}
                  </span>
                )}
              </span>
            </label>

            <button className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-[14px] bg-[#2563EB] text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.22)] transition hover:shadow-[0_24px_50px_rgba(37,99,235,0.34)]">
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mx-auto grid max-w-[1400px] gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_28px_75px_rgba(37,99,235,0.13)]"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#0F172A]">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[#64748B]">
                  {feature.text}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </section>

      <section className="bg-[#F8FAFC] px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-[#E5E7EB] bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.06)]"
          >
            <SectionLabel>Find Us</SectionLabel>
            <h2 className="mt-4 text-4xl font-extrabold text-[#0F172A] sm:text-5xl">
              Our Location
            </h2>
            <p className="mt-5 leading-[1.8] text-[#64748B]">
              Visit our head office or reach out to us. We are strategically
              located to serve you better.
            </p>
            <div className="mt-8 grid gap-4 text-[#64748B]">
              <p className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[#2563EB]" />
                Zone Industrielle, Douala, Cameroon
              </p>
              <p className="flex gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-[#2563EB]" />
                P.O. Box 1234 Douala
              </p>
              <p className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#2563EB]" />
                +237 233 42 34 00
              </p>
              <p className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#2563EB]" />
                info@sodimfel.com
              </p>
            </div>
            <a className="mt-9 inline-flex h-14 items-center gap-2 rounded-[14px] bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.22)]">
              Get Directions
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute inset-0 bg-[#F8FAFC]" />
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(37,99,235,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.13)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="absolute left-[12%] top-[18%] h-px w-[72%] rotate-12 bg-[#2563EB]/25" />
            <div className="absolute left-[18%] bottom-[22%] h-px w-[65%] -rotate-12 bg-[#2563EB]/20" />
            <div className="absolute left-[40%] top-[28%] h-[240px] w-[300px] rounded-full bg-[#2563EB]/12 blur-[70px]" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative flex h-18 w-18 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_18px_45px_rgba(37,99,235,0.35)]">
                <MapPin className="h-8 w-8" />
                <span className="absolute inset-0 rounded-full border border-[#2563EB]/40 animate-ping" />
              </div>
            </motion.div>

            <div className="absolute left-1/2 top-[58%] z-20 w-[260px] -translate-x-1/2 rounded-2xl border border-[#E5E7EB] bg-white p-5 text-center shadow-[0_22px_65px_rgba(15,23,42,0.12)]">
              <p className="font-extrabold text-[#0F172A]">SODIMFEL</p>
              <p className="mt-1 text-sm font-semibold text-[#2563EB]">
                Head Office
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                Zone Industrielle, Douala, Cameroon
              </p>
            </div>
          </motion.div>
        </div>
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
