'use client'

import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const COLUMNS = [
  {
    title: { en: 'Company', fr: 'Entreprise' },
    links: [
      { en: 'About Us', fr: 'À propos' },
      { en: 'Careers', fr: 'Carrières' },
      { en: 'Newsroom', fr: 'Actualités' },
      { en: 'Sustainability', fr: 'Durabilité' },
    ],
  },
  {
    title: { en: 'Solutions', fr: 'Solutions' },
    links: [
      { en: 'Transformers', fr: 'Transformateurs' },
      { en: 'Switchgear', fr: 'Cellules électriques' },
      { en: 'Substations', fr: 'Postes électriques' },
      { en: 'Maintenance', fr: 'Maintenance' },
    ],
  },
  {
    title: { en: 'Projects', fr: 'Projets' },
    links: [
      { en: 'Power Plants', fr: 'Centrales électriques' },
      { en: 'Solar Farms', fr: 'Parcs solaires' },
      { en: 'Data Centers', fr: 'Data centers' },
      { en: 'Industrial', fr: 'Industriel' },
    ],
  },
  {
    title: { en: 'Resources', fr: 'Ressources' },
    links: [
      { en: 'Documentation', fr: 'Documentation' },
      { en: 'Certifications', fr: 'Certifications' },
      { en: 'Case Studies', fr: 'Études de cas' },
      { en: 'Support', fr: 'Support' },
    ],
  },
]

export function Footer() {
  const { isFrench, language } = useLanguage()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <div aria-hidden className="relative h-px w-full overflow-hidden bg-white/5">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-footer-pulse bg-linear-to-r from-transparent via-[var(--electric-bright)] to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="relative h-30 w-40 glow-brand">
              <Image
                src="/images/sodimfel-logo.png"
                alt="SODIMFEL"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {isFrench
                ? "Équipements électriques avancés et infrastructures énergétiques au service de l'avenir de l'industrie."
                : 'Advanced electrical equipment and energy infrastructure powering the future of industry.'}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-electric" />
                contact@sodimfel.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-electric" />
                +1 (000) 000-0000
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-electric" />
                {isFrench
                  ? 'Zone industrielle, international'
                  : 'Industrial District, Global'}
              </li>
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title.en}>
              <h4 className="text-sm font-semibold text-foreground">
                {col.title[language]}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.en}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-electric"
                    >
                      {link[language]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SODIMFEL.{' '}
            {isFrench ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              {isFrench ? 'Confidentialité' : 'Privacy Policy'}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              {isFrench ? 'Conditions' : 'Terms'}
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Certifications
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
