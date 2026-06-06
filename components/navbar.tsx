'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage, type Language } from '@/components/language-provider'

const LANGUAGES: Array<{ code: Language; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const { language, setLanguage, content } = useLanguage()
  const pathname = usePathname()
  const links = content.nav.links
  const quoteLabel = content.common.requestQuote
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
        <Link href="/" className="relative h-30 w-36 shrink-0 glow-brand">
          <Image
            src="/images/sodimfel-logo.png"
            alt="SODIMFEL"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric-bright transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/request-quote"
            className="inline-flex items-center rounded-full bg-[var(--electric)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:glow-electric"
          >
            {quoteLabel}
          </Link>

          <div className="flex items-center rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-md">
            {LANGUAGES.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  language === item.code
                    ? 'bg-[var(--electric)] text-white'
                    : 'text-foreground hover:text-electric'
                }`}
                aria-label={`${content.nav.switchLanguage}: ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
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
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/request-quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--electric)] px-5 py-3 text-sm font-semibold text-white"
                >
                  {quoteLabel}
                </Link>
              </li>
              <li className="pt-3">
                <div className="grid grid-cols-3 gap-2">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => setLanguage(item.code)}
                      className={`rounded-full border border-white/15 px-4 py-3 text-sm font-bold ${
                        language === item.code
                          ? 'bg-[var(--electric)] text-white'
                          : 'bg-white/5 text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
