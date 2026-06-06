'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { ProductCard } from '@/components/product-card'
import { getProductList } from '@/lib/products'

export function Products() {
  const { content, isArabic, language } = useLanguage()
  const featuredProducts = getProductList(language).slice(0, 4)

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
              {content.products.label}
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
                {content.products.titleTop}
              </span>
              <span className="block">
                {content.products.titleBottom}
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
              {content.common.viewAllProducts}
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

        <div className="products-showcase mt-16 flex flex-row items-stretch gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible lg:pb-2">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.slug}
              title={product.title}
              slug={product.slug}
              image={product.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
