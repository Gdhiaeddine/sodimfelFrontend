'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const LINKS = {
  en: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#trust' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Products', href: '/products' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  fr: [
    { label: 'Accueil', href: '/' },
    { label: 'À propos', href: '#trust' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Produits', href: '/products' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { language, toggleLanguage, isFrench } = useLanguage()
  const pathname = usePathname()
  const links = LINKS[language]
  const quoteLabel = isFrench ? 'Demander un devis' : 'Request a Quote'
  const keepVisible = pathname.startsWith('/products')

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY

      setScrolled(currentY > 40)

      if (keepVisible || currentY < 80 || open) {
        setHidden(false)
      } else if (delta > 8) {
        setHidden(true)
      } else if (delta < -8) {
        setHidden(false)
      }

      lastY = currentY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [keepVisible, open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-[var(--ink)] backdrop-blur-xl'
          : 'border-b border-white/10 bg-[var(--ink)] backdrop-blur-xl'
      } ${hidden && !keepVisible ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="relative h-30 w-36 shrink-0 glow-brand">
          <Image
            src="/images/sodimfel-logo.png"
            alt="SODIMFEL"
            fill
            className="object-contain object-left"
            priority
          />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric-bright transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:glow-electric"
          >
            {quoteLabel}
          </a>
        </div>

        <button
          type="button"
          onClick={toggleLanguage}
          className="hidden rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur-md transition-all duration-300 hover:border-[var(--electric)] hover:text-electric lg:inline-flex"
          aria-label={isFrench ? 'Switch to English' : 'Passer en français'}
        >
          {isFrench ? 'EN' : 'FR'}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[var(--ink)]/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--electric)] px-5 py-3 text-sm font-semibold text-white"
                >
                  {quoteLabel}
                </a>
              </li>
              <li className="pt-3">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground"
                >
                  {isFrench ? 'Switch to English' : 'Passer en français'}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
