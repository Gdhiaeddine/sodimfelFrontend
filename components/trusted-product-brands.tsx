'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const BRANDS = [
  {
    name: 'ABB',
    logo: '/brands/abb.png',
  },
  {
    name: 'Elsewedy Electric',
    logo: '/brands/Elsewedy_Electric.png',
  },
  {
    name: 'Enel Azazga',
    logo: '/brands/enel_azazga.png',
  },
  {
    name: 'Sarel',
    logo: '/brands/sarel.png',
  },
  {
    name: 'Schneider Electric',
    logo: '/brands/Schneider_Electric.png',
  },
  {
    name: 'Utec',
    logo: '/brands/utec.png',
  },
]

export function TrustedProductBrands() {
  const { isFrench } = useLanguage()

  return (
    <section
      className="brand-section relative isolate overflow-hidden bg-white py-[120px] text-slate-900"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="brand-grid-bg" aria-hidden />
      <div className="brand-radial-glow" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[760px] text-left">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold uppercase tracking-[3px] text-[#2563EB]"
            >
              {isFrench ? 'Nos partenaires' : 'Our Partners'}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                delay: 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] text-[#111827] sm:text-5xl lg:text-[56px]"
            >
              <span className="block">
                {isFrench ? 'Marques de confiance' : 'Trusted Brands'}
              </span>
              <span className="block">
                {isFrench
                  ? 'Derrière nos solutions'
                  : 'Behind Our Solutions'}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-start md:justify-end"
          >
            <a href="#contact" className="solution-button group">
              {isFrench ? 'Voir toutes les marques' : 'View All Brands'}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <div className="brand-scroll mt-16 flex snap-x snap-mandatory flex-nowrap gap-6 overflow-x-auto pb-6 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
          {BRANDS.map((brand, index) => (
            <motion.article
              key={brand.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: index * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="brand-logo-slot group"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={180}
                height={80}
                className="brand-logo-image"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
