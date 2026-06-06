'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Magnetic } from '@/components/magnetic'
import { Electricity } from '@/components/electricity'
import { useLanguage } from '@/components/language-provider'

export function ContactCta() {
  const { content } = useLanguage()

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--ink)] py-24 lg:py-32">
      <div className="absolute inset-0 opacity-50">
        <Electricity active />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--electric) 18%, transparent), transparent 55%)',
          filter: 'blur(40px)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-electric">
          {content.contactCta.label}
        </p>
        <h2
          className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          style={{ letterSpacing: '-0.04em' }}
        >
          {content.contactCta.titlePrefix}
          <span className="text-electric text-glow-electric">
            {content.contactCta.titleHighlight}
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {content.contactCta.description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link
              href="/request-quote"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--electric)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:glow-electric"
            >
              {content.common.requestQuote}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-colors duration-300 hover:bg-white hover:text-[var(--ink)]"
          >
            {content.common.contactUs}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
