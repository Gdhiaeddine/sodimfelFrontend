'use client'

import { motion } from 'framer-motion'

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  dark = false,
  align = 'center',
}: {
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  dark?: boolean
  align?: 'center' | 'left'
}) {
  const titleColor = dark ? 'text-foreground' : 'text-[var(--ink)]'
  const descColor = dark ? 'text-muted-foreground' : 'text-neutral-500'

  return (
    <div
      className={`flex flex-col gap-4 ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-electric"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-electric-bright" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl ${titleColor}`}
        style={{ letterSpacing: '-0.03em' }}
      >
        {title} {highlight && <span className="text-electric">{highlight}</span>}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`max-w-2xl text-pretty text-base leading-relaxed ${descColor}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
