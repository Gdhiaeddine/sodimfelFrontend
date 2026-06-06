'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, Cpu, Headset } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/section-heading'

const ICONS = [Award, ShieldCheck, Cpu, Headset]

export function Trust() {
  const { content } = useLanguage()

  return (
    <section id="trust" className="relative bg-[var(--ink)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow={content.trust.eyebrow}
          title={content.trust.title}
          highlight={content.trust.highlight}
          description={content.trust.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.trust.items.map((item, index) => {
            const Icon = ICONS[index]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--ink-2)]/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--electric)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--electric)]/15 text-electric transition-all duration-500 group-hover:bg-[var(--electric)] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px bevel-line opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
