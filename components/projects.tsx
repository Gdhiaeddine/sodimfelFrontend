'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/section-heading'
import { useLanguage } from '@/components/language-provider'

const PROJECTS = [
  {
    title: { en: 'Power Plants', fr: 'Centrales électriques' },
    location: { en: 'Energy Generation', fr: 'Production d’énergie' },
    image: '/images/project-power-plant.png',
    className: 'lg:col-span-2 lg:row-span-2',
  },
  {
    title: { en: 'Solar Farms', fr: 'Parcs solaires' },
    location: { en: 'Renewable Energy', fr: 'Énergie renouvelable' },
    image: '/images/project-solar-farm.png',
    className: '',
  },
  {
    title: { en: 'Data Centers', fr: 'Data centers' },
    location: { en: 'Critical Infrastructure', fr: 'Infrastructure critique' },
    image: '/images/project-data-center.png',
    className: '',
  },
  {
    title: { en: 'Industrial Facilities', fr: 'Sites industriels' },
    location: { en: 'Manufacturing', fr: 'Fabrication' },
    image: '/images/project-industrial-facility.png',
    className: '',
  },
  {
    title: { en: 'Commercial Complexes', fr: 'Complexes commerciaux' },
    location: { en: 'Smart Buildings', fr: 'Bâtiments intelligents' },
    image: '/images/project-commercial.png',
    className: '',
  },
]

export function Projects() {
  const { isFrench, language } = useLanguage()

  return (
    <section id="projects" className="relative bg-[var(--ink-2)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow={isFrench ? 'Réalisations' : 'Selected Work'}
          title={isFrench ? 'Alimenter des' : 'Powering landmark'}
          highlight={isFrench ? 'projets majeurs' : 'projects'}
          description={
            isFrench
              ? 'Un partenaire de confiance pour livrer des infrastructures électriques critiques dans les secteurs les plus exigeants.'
              : 'Trusted to deliver mission-critical electrical infrastructure across the most demanding sectors.'
          }
        />

        <div className="mt-16 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title.en}
              href="#contact"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 ${p.className}`}
            >
              <Image
                src={p.image || '/placeholder.svg'}
                alt={p.title[language]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/30 to-transparent transition-opacity duration-500 group-hover:from-[var(--ink)]/90" />
              <div className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-electric opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {p.location[language]}
                </p>
                <h3 className="mt-1 text-xl font-bold text-foreground">
                  {p.title[language]}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
