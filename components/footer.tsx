'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function Footer() {
  const { content } = useLanguage()
  const footer = content.footer

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div aria-hidden className="relative h-px w-full overflow-hidden bg-white/5">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-footer-pulse bg-linear-to-r from-transparent via-[var(--electric-bright)] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" aria-label="SODIMFEL home" className="block">
              <div className="relative h-30 w-40 glow-brand">
                <Image
                  src="/images/sodimfel-logo.png"
                  alt="SODIMFEL"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {footer.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-electric" />
                <a
                  href="mailto:sarlsodimfel@gmail.com"
                  className="transition-colors hover:text-electric"
                >
                  sarlsodimfel@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-electric" />
                <a
                  href="tel:+213550460983"
                  className="transition-colors hover:text-electric"
                >
                  Sétif: 0550460983 / 0560459703
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-electric" />
                {footer.location}
              </li>
            </ul>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-electric"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SODIMFEL. {footer.rights}
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/contact" className="transition-colors hover:text-foreground">
              {content.common.contactUs}
            </Link>
            <Link
              href="/request-quote"
              className="transition-colors hover:text-foreground"
            >
              {content.common.requestQuote}
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              Certifications
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
