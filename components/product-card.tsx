'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
export function ProductCard({
  title,
  slug,
  image,
  index,
}: {
  title: string
  slug: string
  image: string
  index: number
}) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group relative flex min-w-[min(82vw,360px)] flex-none flex-col items-center justify-start text-center text-slate-900 lg:min-w-0 lg:flex-1"
    >
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          delay: index * 0.15,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -10 }}
        className="w-full"
      >
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-visible">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.25,
          }}
          className="relative h-full w-full"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 82vw, (max-width: 1200px) 35vw, 260px"
            className="object-contain transition-transform duration-500 group-hover:scale-[1.08]"
            priority={index < 2}
          />
        </motion.div>
      </div>

      <h3 className="mt-5 text-center text-[22px] font-bold leading-tight text-[#111827]">
        {title}
      </h3>
      </motion.div>
    </Link>
  )
}
