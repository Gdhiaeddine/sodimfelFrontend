'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { ProductCard } from '@/components/product-card'

const PRODUCTS = [
  {
    title: { en: 'Oil Transformers', fr: 'Transformateurs à huile' },
    slug: 'oil-immersed-transformer',
    category: 'Industrial Equipment',
    image: '/images/product-oil-transformer.png',
  },
  {
    title: { en: 'Dry Transformers', fr: 'Transformateurs secs' },
    slug: 'dry-type-transformer',
    category: 'Industrial Equipment',
    image: '/images/product-dry-transformer.png',
  },
  {
    title: { en: 'Compact Substations', fr: 'Postes compacts' },
    slug: 'compact-substation',
    category: 'Industrial Equipment',
    image: '/images/product-substation.png',
  },
  {
    title: { en: 'Switchgear', fr: 'Cellules électriques' },
    slug: 'mv-switchgear',
    category: 'Industrial Equipment',
    image: '/images/product-switchgear.png',
  },
]

export function Products() {
  const { isFrench, language } = useLanguage()

  return (
    <section
      id="products"
      className="products-section relative isolate overflow-hidden bg-white py-[140px] text-slate-900"
    >
      <div className="products-grid-bg" aria-hidden />
      <div className="products-blue-blur products-blue-blur-left" aria-hidden />
      <div className="products-blue-blur products-blue-blur-center" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[900px]">
            <motion.span
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold uppercase tracking-[3px] text-[#2563EB]"
            >
              {isFrench ? 'Produits phares' : 'Featured Products'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 text-balance text-5xl font-extrabold leading-[1.1] text-[#111827] sm:text-6xl lg:text-[64px]"
            >
              <span className="block">
                {isFrench ? 'Solutions de puissance' : 'Power Solutions'}
              </span>
              <span className="block">
                {isFrench
                  ? "Conçues pour l'industrie moderne"
                  : 'Built For Modern Industry'}
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-start md:justify-end"
          >
            <Link href="/products" className="solution-button group">
              {isFrench ? 'Voir tous les produits' : 'View All Products'}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="products-showcase mt-16 flex flex-row items-stretch gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pb-2">
          {PRODUCTS.map((p, index) => (
            <ProductCard
              key={p.title.en}
              title={p.title[language]}
              slug={p.slug}
              image={p.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
