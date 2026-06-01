'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/language-provider'

export function Loader() {
  const [done, setDone] = useState(false)
  const { isFrench } = useLanguage()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setDone(true), reduce ? 200 : 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--ink)]"
        >
          <motion.div
            initial={{ opacity: 0, filter: 'brightness(0.2)' }}
            animate={{ opacity: 1, filter: 'brightness(1)' }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="relative h-14 w-56 glow-brand"
          >
            <Image
              src="/images/sodimfel-logo.png"
              alt="SODIMFEL"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <div className="relative mt-8 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--electric-bright)] to-transparent"
            />
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {isFrench ? 'Initialisation de l’énergie' : 'Initializing Power'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
