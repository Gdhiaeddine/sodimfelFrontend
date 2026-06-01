import { SmoothScroll } from '@/components/smooth-scroll'
import { CursorGlow } from '@/components/cursor-glow'
import { LanguageProvider } from '@/components/language-provider'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Products } from '@/components/products'
import { TrustedProductBrands } from '@/components/trusted-product-brands'
import { Projects } from '@/components/projects'
import { Trust } from '@/components/trust'
import { ContactCta } from '@/components/contact-cta'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <LanguageProvider>
      <SmoothScroll />
      <CursorGlow />
      <Navbar />
      <main id="home" className="relative">
        <Hero />
        <Services />
        <Products />
        <TrustedProductBrands />
        <Projects />
        <Trust />
        <ContactCta />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
