'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bolt,
  Building2,
  ChevronRight,
  Database,
  Download,
  Factory,
  FileBadge,
  FileText,
  Flame,
  Gauge,
  Leaf,
  LifeBuoy,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import type { Product } from '@/lib/products'

const tabItems = [
  { label: 'Overview', icon: FileText, href: '#overview' },
  { label: 'Specifications', icon: Gauge, href: '#specifications' },
  { label: 'Applications', icon: Factory, href: '#applications' },
  { label: 'Downloads', icon: Download, href: '#downloads' },
]

const features = [
  {
    icon: Sparkles,
    title: 'High Efficiency',
    text: 'Optimized core and winding design reduces losses and improves long-term energy performance.',
  },
  {
    icon: LifeBuoy,
    title: 'Long Lifespan',
    text: 'Built with durable insulation systems and robust tank construction for demanding operations.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Safety',
    text: 'Manufactured to recognized international standards for electrical safety and reliability.',
  },
]

const applications = [
  { title: 'Industrial Plants', icon: Factory },
  { title: 'Commercial Buildings', icon: Building2 },
  { title: 'Power Stations', icon: RadioTower },
  { title: 'Data Centers', icon: Database },
  { title: 'Renewable Energy', icon: Leaf },
  { title: 'Oil & Gas', icon: Flame },
]

const downloads = [
  { title: 'Technical Datasheet', meta: 'PDF / 2.4 MB', icon: FileText },
  { title: 'Installation Manual', meta: 'PDF / 4.8 MB', icon: FileBadge },
  { title: 'Certification Documents', meta: 'ZIP / 3.2 MB', icon: BadgeCheck },
  { title: 'Product Brochure', meta: 'PDF / 1.9 MB', icon: FileText },
]

const relatedProducts = [
  {
    title: 'Dry Type Transformer',
    image: '/images/product-dry-transformer.png',
    slug: 'dry-type-transformer',
  },
  {
    title: 'Compact Substation',
    image: '/images/product-substation.png',
    slug: 'compact-substation',
  },
  {
    title: 'MV Switchgear',
    image: '/images/product-switchgear.png',
    slug: 'mv-switchgear',
  },
  {
    title: 'Power Distribution Panel',
    image: '/images/service-electrical.png',
    slug: 'power-distribution-panel',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0 },
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
      {children}
    </h2>
  )
}

export function ProductDetailsClient({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState(tabItems[0].href)
  const highlights = product.specs
    .filter((spec) =>
      ['Power Rating', 'Rated Current', 'Voltage Class', 'Cooling Type', 'Standard'].includes(
        spec.label
      )
    )
    .slice(0, 4)

  useEffect(() => {
    const sectionIds = tabItems.map((tab) => tab.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveTab(`#${visible.target.id}`)
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-white text-[#0F172A]">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-28 lg:px-10">
        <nav className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
          <Link href="/" className="transition-colors hover:text-[#2563EB]">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/products"
            className="transition-colors hover:text-[#2563EB]"
          >
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#0F172A]">{product.title}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 pb-20 lg:grid-cols-2 lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-[600px] items-center justify-center overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
          >
            <div className="absolute h-[360px] w-[360px] rounded-full bg-[#2563EB]/10 blur-[80px]" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-[72%] w-[82%]"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-contain drop-shadow-[0_32px_40px_rgba(15,23,42,0.16)]"
              />
            </motion.div>
            <button className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-slate-600 shadow-lg transition hover:border-[#2563EB] hover:text-[#2563EB]">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-slate-600 shadow-lg transition hover:border-[#2563EB] hover:text-[#2563EB]">
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          <div className="mt-5 grid grid-cols-4 gap-4">
            {[product.image, product.image, product.image, product.image].map(
              (image, index) => (
                <button
                  key={index}
                  className={`relative h-24 rounded-2xl border bg-white p-3 transition hover:border-[#2563EB] ${
                    index === 0 ? 'border-[#2563EB]' : 'border-[#E5E7EB]'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    fill
                    className="object-contain p-3"
                  />
                </button>
              )
            )}
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col justify-center"
        >
          <motion.span
            variants={fadeUp}
            className="w-fit rounded-full bg-[#2563EB]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[2px] text-[#2563EB]"
          >
            {product.category}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-[#0F172A] lg:text-[64px]"
          >
            {product.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-[1.85] text-[#64748B]"
          >
            {product.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex h-13 items-center gap-2 rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white shadow-[0_18px_36px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5"
            >
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#downloads"
              className="inline-flex h-13 items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-7 text-sm font-bold text-[#0F172A] transition hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              Download Datasheet
              <ArrowDownToLine className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
              >
                <p className="text-sm font-medium text-[#64748B]">{item.label}</p>
                <p className="mt-2 text-xl font-extrabold text-[#0F172A]">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <motion.nav
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="sticky top-[72px] z-30 border-y border-[#E5E7EB] bg-white/95 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[1440px] gap-8 overflow-x-auto px-6 lg:px-10">
          {tabItems.map((tab, index) => {
            const Icon = tab.icon
            return (
              <a
                key={tab.label}
                href={tab.href}
                onClick={() => setActiveTab(tab.href)}
                className={`flex min-w-fit items-center gap-2 border-b-2 py-5 text-sm font-bold transition ${
                  activeTab === tab.href
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-[#64748B] hover:text-[#2563EB]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </a>
            )
          })}
        </div>
      </motion.nav>

      <section id="overview" className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="grid overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)] lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="p-8 sm:p-12">
            <SectionTitle>Built For Reliable Industrial Power</SectionTitle>
            <p className="mt-5 max-w-2xl text-lg leading-[1.85] text-[#64748B]">
              Engineered for continuous operation, this transformer delivers
              stable voltage, excellent thermal performance, and dependable
              protection for industrial power networks.
            </p>
            <div className="mt-8 space-y-5">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A]">
                        {feature.title}
                      </h3>
                      <p className="mt-1 leading-relaxed text-[#64748B]">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="relative min-h-[340px] bg-[#F8FAFC]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.14),transparent_58%)]" />
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-12"
            />
          </div>
        </motion.div>
      </section>

      <section
        id="specifications"
        className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10"
      >
        <SectionTitle>Technical Specifications</SectionTitle>
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          {product.specs.map((spec, index) => (
            <div
              key={spec.label}
              className={`grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-2 sm:px-8 ${
                index !== product.specs.length - 1
                  ? 'border-b border-[#E5E7EB]'
                  : ''
              }`}
            >
              <span className="font-semibold text-[#64748B]">{spec.label}</span>
              <span className="font-bold text-[#0F172A]">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="applications" className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <SectionTitle>Applications</SectionTitle>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, index) => {
            const Icon = app.icon
            return (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6 }}
                className="rounded-3xl border border-[#E5E7EB] bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[#2563EB]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0F172A]">
                  {app.title}
                </h3>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section id="downloads" className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <SectionTitle>Downloads</SectionTitle>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {downloads.map((download) => {
            const Icon = download.icon
            return (
              <div
                key={download.title}
                className="flex items-center gap-5 rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] transition hover:border-[#2563EB]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB]/10 text-[#2563EB]">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[#0F172A]">{download.title}</h3>
                  <p className="mt-1 text-sm text-[#64748B]">{download.meta}</p>
                </div>
                <Download className="h-5 w-5 text-[#2563EB]" />
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 lg:px-10">
        <SectionTitle>Related Products</SectionTitle>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((related, index) => (
            <motion.div
              key={related.slug}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              <Link
                href={`/products/${related.slug}`}
                className="group block overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-[0_25px_80px_rgba(37,99,235,0.14)]"
              >
                <div className="relative h-52 rounded-2xl bg-[#F8FAFC]">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-contain p-5 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0F172A]">
                  {related.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1440px] px-6 pb-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[28px] bg-[#050816] p-8 text-white shadow-[0_28px_90px_rgba(5,8,22,0.28)] sm:p-12"
        >
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/25 blur-[90px]" />
            <Bolt className="absolute right-16 top-10 h-16 w-16 text-blue-300/20" />
            <Zap className="absolute bottom-10 left-16 h-12 w-12 text-blue-300/20" />
          </div>
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Need This Product For Your Project?
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                Our technical team can help you select the right equipment and
                configuration for your requirements.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a className="inline-flex h-13 items-center rounded-2xl bg-[#2563EB] px-7 text-sm font-bold text-white">
                Request Quote
              </a>
              <a className="inline-flex h-13 items-center rounded-2xl border border-white/20 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-[#050816]">
                Contact Engineer
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
