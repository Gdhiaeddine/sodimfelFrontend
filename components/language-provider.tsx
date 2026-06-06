'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import siteContent from '@/data/site-content.json'

export type Language = 'en' | 'fr' | 'ar'
type Direction = 'ltr' | 'rtl'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  isFrench: boolean
  isArabic: boolean
  direction: Direction
  content: (typeof siteContent)[Language]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = window.localStorage.getItem('sodimfel-language')
    if (saved === 'fr' || saved === 'en' || saved === 'ar') {
      setLanguageState(saved)
    }
  }, [])

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr'
    const fontFamily =
      language === 'ar'
        ? 'var(--font-alexandria), ui-sans-serif, system-ui, sans-serif'
        : 'var(--font-inter), ui-sans-serif, system-ui, sans-serif'

    document.documentElement.lang = language
    document.documentElement.dir = direction
    document.documentElement.style.setProperty('--active-font-sans', fontFamily)
    document.body.style.fontFamily = fontFamily
  }, [language])

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage)
    window.localStorage.setItem('sodimfel-language', nextLanguage)
  }

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage(language === 'en' ? 'fr' : language === 'fr' ? 'ar' : 'en'),
      isFrench: language === 'fr',
      isArabic: language === 'ar',
      direction: language === 'ar' ? 'rtl' : 'ltr',
      content: siteContent[language],
    }),
    [language]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
