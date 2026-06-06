'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const BRANDS = [
  { name: 'ABB', logo: '/brands/abb.png', brand: 'ABB' },
  {
    name: 'Elsewedy Electric',
    logo: '/brands/Elsewedy_Electric.png',
    brand: 'Elsewedy Electric',
  },
  { name: 'Enel Azazga', logo: '/brands/enel_azazga.png', brand: 'Enel Azazga' },
  { name: 'Sarel', logo: '/brands/sarel.png', brand: 'Sarel' },
  {
    name: 'Schneider Electric',
    logo: '/brands/Schneider_Electric.png',
    brand: 'Schneider Electric',
  },
  { name: 'Utec', logo: '/brands/utec.png', brand: 'Utec' },
]

export function TrustedProductBrands() {
  const { content, isArabic } = useLanguage()

  return (
    <section
      className="brand-section relative isolate overflow-hidden bg-white py-[120px] text-slate-900"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="brand-grid-bg" aria-hidden />
      <div className="brand-radial-glow" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className={`max-w-[760px] ${isArabic ? 'text-right' : 'text-left'}`}>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold uppercase tracking-[3px] text-[#2563EB]"
            >
              {content.brands.label}
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
              <span className="block">{content.brands.titleTop}</span>
              <span className="block">{content.brands.titleBottom}</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${isArabic ? 'justify-start md:justify-start' : 'justify-start md:justify-end'}`}
          >
            <Link href="/products" className="solution-button group">
              {content.common.viewAllBrands}
              <ArrowRight
                className={`h-5 w-5 transition-transform duration-300 ${
                  isArabic
                    ? 'rotate-180 group-hover:-translate-x-1'
                    : 'group-hover:translate-x-1'
                }`}
              />
            </Link>
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
              <Link
                href={`/products?brand=${encodeURIComponent(brand.brand)}`}
                aria-label={`View ${brand.name} products`}
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={180}
                  height={80}
                  className="brand-logo-image"
                />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
