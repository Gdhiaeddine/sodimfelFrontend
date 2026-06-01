'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Search,
  SlidersHorizontal,
  Zap,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Navbar } from '@/components/navbar'
import { LanguageProvider } from '@/components/language-provider'
import { Footer } from '@/components/footer'
import { productList } from '@/lib/products'

const filters = {
  categories: [
    'All Products',
    'Transformers',
    'Substations',
    'Switchgear',
    'Power Distribution',
    'Protection Systems',
    'Industrial Accessories',
  ],
  voltage: [
    'Up to 1kV',
    '1kV-36kV',
    '36kV-72.5kV',
    '72.5kV-145kV',
    'Above 145kV',
  ],
  type: ['Oil Immersed', 'Dry Type', 'Indoor', 'Outdoor', 'Gas Insulated'],
  standards: ['IEC', 'ANSI', 'IEEE', 'Other'],
}

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  return (
    <details open={defaultOpen} className="group border-t border-slate-200 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900">
        {title}
        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  )
}

function CheckboxList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <label
          key={item}
          className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition-colors hover:text-slate-950"
        >
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 accent-blue-600"
            defaultChecked={item === 'All Products'}
          />
          {item}
        </label>
      ))}
    </div>
  )
}

function FilterSidebar() {
  return (
    <aside className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs font-extrabold uppercase tracking-[2px] text-slate-950">
          Filter Products
        </h2>
        <button className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700">
          Reset All
        </button>
      </div>

      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search products..."
          className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
      </label>

      <div className="mt-6">
        <FilterGroup title="Categories">
          <CheckboxList items={filters.categories} />
        </FilterGroup>
        <FilterGroup title="Voltage Class">
          <CheckboxList items={filters.voltage} />
        </FilterGroup>
        <FilterGroup title="Product Type">
          <CheckboxList items={filters.type} />
        </FilterGroup>
        <FilterGroup title="Power Rating">
          <div>
            <div className="mb-3 flex justify-between text-xs font-semibold text-slate-500">
              <span>25 kVA</span>
              <span>100 MVA</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="55"
              className="h-2 w-full accent-blue-600"
            />
          </div>
        </FilterGroup>
        <FilterGroup title="Standards">
          <CheckboxList items={filters.standards} />
        </FilterGroup>
      </div>

      <button className="mt-2 h-12 w-full rounded-xl border border-blue-600 bg-white text-sm font-bold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-[0_18px_40px_rgba(37,99,235,0.22)]">
        Apply Filters
      </button>
    </aside>
  )
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof productList)[number]
  index: number
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.8,
          delay: index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative h-[320px] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white transition-all duration-300 group-hover:-translate-y-2 group-hover:border-blue-600 group-hover:shadow-[0_25px_80px_rgba(37,99,235,0.15)]"
      >
        <span className="absolute left-4 top-4 z-10 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.6px] text-white">
          {product.badge}
        </span>

        <div className="flex h-[180px] items-center justify-center bg-[#F8FAFC] p-6">
          <Image
            src={product.image}
            alt={product.title}
            width={260}
            height={180}
            className="max-h-[138px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[2px] text-blue-600">
            {product.category}
          </p>
          <h3 className="mt-2 text-xl font-bold leading-tight text-[#0F172A]">
            {product.title}
          </h3>

        </div>
      </motion.article>
    </Link>
  )
}

export default function ProductsPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen bg-white text-slate-900">
      <section className="relative h-auto overflow-hidden bg-[var(--ink)] pt-24 md:h-[520px] md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/95 to-[var(--ink-2)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/30" />
        <div className="absolute right-[8%] top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[90px] md:block" />
        <div className="relative z-10 mx-auto grid h-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[45%_55%] md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-electric text-xs font-bold uppercase tracking-[2px]">
              Products
            </p>
            <h1 className="mt-5 max-w-[650px] text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-[64px]">
              Premium Electrical Equipment For Every Need
            </h1>
            <p className="mt-6 max-w-[600px] text-lg leading-[1.8] text-slate-300">
              Explore our complete range of high-quality electrical equipment
              designed for reliability, efficiency, and long-lasting
              performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[280px] items-center justify-center"
          >
            <div className="absolute h-[320px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_62%)] blur-2xl" />
            <Zap className="absolute right-[18%] top-[22%] h-8 w-8 text-blue-500/30" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-[280px] w-full max-w-[650px]"
            >
              <Image
                src="/images/product-oil-transformer.png"
                alt="Premium transformer render"
                fill
                priority
                className="object-contain drop-shadow-[0_35px_45px_rgba(15,23,42,0.16)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1440px] items-start gap-8 px-6 pb-[120px] pt-[60px]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-[100px] hidden w-[240px] shrink-0 lg:w-[280px] md:block"
        >
          <FilterSidebar />
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-[#64748B]">
              Showing 1-12 of 84 Products
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                    Open Filters
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[88vw] overflow-y-auto bg-white p-0 sm:max-w-[380px]"
                >
                  <SheetHeader className="border-b border-slate-200 p-6">
                    <SheetTitle className="text-left text-slate-950">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-600 bg-blue-50 text-blue-600">
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-slate-500 transition hover:border-blue-600 hover:text-blue-600">
                <List className="h-4 w-4" />
              </button>

              <Select defaultValue="newest">
                <SelectTrigger className="h-10 w-[170px] rounded-xl border-[#E5E7EB] bg-white text-slate-700">
                  <SelectValue placeholder="Sort by Newest" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="newest">Sort by Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {productList.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </motion.div>

          <nav className="mt-14 flex items-center justify-center gap-2">
            {['<', '1', '2', '3', '4', '5', '...', '7', '>'].map((page) => {
              const active = page === '1'
              const icon =
                page === '<' ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : page === '>' ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  page
                )

              return (
                <button
                  key={page}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-[10px] border px-3 text-sm font-bold transition ${
                    active
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600'
                  } ${page === '...' ? 'pointer-events-none border-transparent' : ''}`}
                >
                  {icon}
                </button>
              )
            })}
          </nav>
        </div>
      </section>
      </main>
      <Footer />
    </LanguageProvider>
  )
}
