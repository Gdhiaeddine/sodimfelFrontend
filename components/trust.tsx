'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, Cpu, Headset } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/section-heading'

const ITEMS = [
  {
    icon: Award,
    title: { en: '20+ Years Experience', fr: '20+ ans d’expérience' },
    desc: {
      en: 'Two decades of proven expertise delivering electrical infrastructure at scale.',
      fr: 'Deux décennies d’expertise reconnue dans la réalisation d’infrastructures électriques à grande échelle.',
    },
  },
  {
    icon: ShieldCheck,
    title: { en: 'Certified Products', fr: 'Produits certifiés' },
    desc: {
      en: 'Every product meets rigorous international quality and safety standards.',
      fr: 'Chaque produit répond à des normes internationales strictes de qualité et de sécurité.',
    },
  },
  {
    icon: Cpu,
    title: { en: 'Industrial Expertise', fr: 'Expertise industrielle' },
    desc: {
      en: 'Deep engineering knowledge across power generation and distribution.',
      fr: 'Une solide maîtrise technique de la production et de la distribution d’énergie.',
    },
  },
  {
    icon: Headset,
    title: { en: 'Technical Support', fr: 'Support technique' },
    desc: {
      en: 'Dedicated 24/7 support teams keeping your operations running.',
      fr: 'Des équipes de support dédiées pour assurer la continuité de vos opérations.',
    },
  },
]

export function Trust() {
  const { isFrench, language } = useLanguage()

  return (
    <section id="trust" className="relative bg-[var(--ink)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow={isFrench ? 'Pourquoi SODIMFEL' : 'Why SODIMFEL'}
          title={isFrench ? 'Fondé sur la confiance et' : 'Built on trust and'}
          highlight={isFrench ? 'l’ingénierie' : 'engineering'}
          description={
            isFrench
              ? 'Un partenaire qui associe maîtrise technique et fiabilité constante pour vos besoins énergétiques les plus critiques.'
              : 'A partner that combines technical mastery with unwavering reliability for your most critical power needs.'
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title.en}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--ink-2)]/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--electric)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--electric)]/15 text-electric transition-all duration-500 group-hover:bg-[var(--electric)] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {item.title[language]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc[language]}
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
