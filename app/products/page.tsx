'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Suspense, useEffect, useMemo, useState } from 'react'
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Navbar } from '@/components/navbar'
import productsPageContent from '@/data/products-page-content.json'
import { useLanguage } from '@/components/language-provider'
import { getProductList, type Product } from '@/lib/products'

const PAGE_SIZE = 12

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

function FilterOptionList({
  items,
  selected,
  onSelect,
}: {
  items: string[]
  selected: string
  onSelect: (item: string) => void
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <label
          key={item}
          className="flex cursor-pointer items-center gap-3 text-sm text-slate-600 transition-colors hover:text-slate-950"
        >
          <input
            type="radio"
            name={items[0]}
            className="h-4 w-4 rounded border-slate-300 accent-blue-600"
            checked={selected === item}
            onChange={() => onSelect(item)}
          />
          {item}
        </label>
      ))}
    </div>
  )
}

function FilterSidebar({
  search,
  selectedCategory,
  selectedBrand,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onReset,
  copy,
  categoryOptions,
  brandOptions,
}: {
  search: string
  selectedCategory: string
  selectedBrand: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onBrandChange: (value: string) => void
  onReset: () => void
  copy: (typeof productsPageContent)['en']
  categoryOptions: string[]
  brandOptions: string[]
}) {
  return (
    <aside className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xs font-extrabold uppercase tracking-[2px] text-slate-950">
          {copy.filterTitle}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          {copy.resetAll}
        </button>
      </div>

      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder={copy.searchPlaceholder}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
        />
      </label>

      <div className="mt-6">
        <FilterGroup title={copy.categories}>
          <FilterOptionList
            items={categoryOptions}
            selected={selectedCategory}
            onSelect={onCategoryChange}
          />
        </FilterGroup>
        <FilterGroup title={copy.brands}>
          <FilterOptionList
            items={brandOptions}
            selected={selectedBrand}
            onSelect={onBrandChange}
          />
        </FilterGroup>
      </div>
    </aside>
  )
}

function ProductCard({
  product,
  index,
  viewMode,
}: {
  product: Product
  index: number
  viewMode: 'grid' | 'list'
}) {
  if (viewMode === 'list') {
    return (
      <Link href={`/products/${product.slug}`} className="group block">
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.65,
            delay: index * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-600 group-hover:shadow-[0_25px_80px_rgba(37,99,235,0.12)] md:grid-cols-[240px_1fr]"
        >
          <div className="relative flex min-h-[190px] items-center justify-center bg-[#F8FAFC] p-6">
            <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.6px] text-white">
              {product.badge}
            </span>
            <Image
              src={product.image}
              alt={product.title}
              width={230}
              height={170}
              className="max-h-[135px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center p-6">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-xs font-bold uppercase tracking-[2px] text-blue-600">
                {product.category}
              </p>
              <span className="flex h-9 max-w-[130px] items-center rounded-full border border-[#E5E7EB] bg-white px-3 shadow-sm">
                <Image
                  src={product.brand.logo}
                  alt={product.brand.name}
                  width={100}
                  height={28}
                  className="max-h-5 w-auto object-contain"
                />
              </span>
            </div>
            <h3 className="mt-3 text-2xl font-bold leading-tight text-[#0F172A]">
              {product.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[#64748B]">
              {product.brand.name}
            </p>
          </div>
        </motion.article>
      </Link>
    )
  }

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
        <span className="absolute right-4 top-4 z-10 flex h-9 max-w-[110px] items-center rounded-full border border-[#E5E7EB] bg-white/90 px-3 shadow-sm backdrop-blur-sm">
          <Image
            src={product.brand.logo}
            alt={product.brand.name}
            width={92}
            height={28}
            className="max-h-5 w-auto object-contain"
          />
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
          <p className="mt-1 text-xs font-semibold text-[#64748B]">
            {product.brand.name}
          </p>
          <h3 className="mt-2 text-xl font-bold leading-tight text-[#0F172A]">
            {product.title}
          </h3>

        </div>
      </motion.article>
    </Link>
  )
}

function ProductsContent() {
  const { isArabic, language } = useLanguage()
  const copy = productsPageContent[language]
  const productList = useMemo(() => getProductList(language), [language])
  const categoryOptions = useMemo(
    () => [
      copy.allProducts,
      ...Array.from(new Set(productList.map((product) => product.category))),
    ],
    [copy.allProducts, productList]
  )
  const brandOptions = useMemo(
    () => [
      copy.allBrands,
      ...Array.from(new Set(productList.map((product) => product.brand.name))),
    ],
    [copy.allBrands, productList]
  )
  const searchParams = useSearchParams()
  const brandParam = searchParams.get('brand')
  const initialBrand =
    brandOptions.find(
      (brand) => brand.toLowerCase() === (brandParam ?? '').toLowerCase()
    ) ?? copy.allBrands
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(copy.allProducts)
  const [selectedBrand, setSelectedBrand] = useState(initialBrand)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const nextBrand =
      brandOptions.find(
        (brand) => brand.toLowerCase() === (brandParam ?? '').toLowerCase()
      ) ?? copy.allBrands

    setSelectedBrand(nextBrand)
    setCurrentPage(1)
  }, [brandParam, brandOptions, copy.allBrands])

  useEffect(() => {
    setSelectedCategory(copy.allProducts)
    setSelectedBrand(initialBrand)
    setCurrentPage(1)
  }, [copy.allProducts, initialBrand, language])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return productList.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.name.toLowerCase().includes(query)
      const matchesCategory =
        selectedCategory === copy.allProducts ||
        product.category === selectedCategory
      const matchesBrand =
        selectedBrand === copy.allBrands || product.brand.name === selectedBrand

      return matchesSearch && matchesCategory && matchesBrand
    })
  }, [copy.allBrands, copy.allProducts, productList, search, selectedCategory, selectedBrand])

  const totalProducts = filteredProducts.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))
  const activePage = Math.min(currentPage, totalPages)
  const startIndex = (activePage - 1) * PAGE_SIZE
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalProducts)
  const visibleProducts = useMemo(
    () => filteredProducts.slice(startIndex, endIndex),
    [filteredProducts, startIndex, endIndex]
  )
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  function updateSearch(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function updateCategory(value: string) {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  function updateBrand(value: string) {
    setSelectedBrand(value)
    setCurrentPage(1)
  }

  function resetFilters() {
    setSearch('')
    setSelectedCategory(copy.allProducts)
    setSelectedBrand(copy.allBrands)
    setCurrentPage(1)
  }

  function goToPage(page: number) {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(nextPage)
  }

  return (
    <>
      <Navbar />
      <main className={`min-h-screen bg-white text-slate-900 ${isArabic ? 'text-right' : ''}`}>
      <section className="relative overflow-hidden bg-white pt-28 md:min-h-[560px] md:pt-24">
        <div className="absolute left-1/2 top-20 h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-[#2563EB]/10 blur-[110px]" />
        <div className="absolute right-[8%] top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[90px] md:block" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(37,99,235,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.7)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="relative z-10 mx-auto grid min-h-[inherit] max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[45%_55%] md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#64748B]">
              <Link href="/" className="hover:text-[#2563EB]">
                {copy.breadcrumbHome}
              </Link>
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              <span className="text-[#0F172A]">{copy.breadcrumbCurrent}</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-[2px] text-[#1D4ED8]">
              {copy.heroLabel}
            </p>
            <h1 className="mt-5 max-w-[650px] text-5xl font-extrabold leading-[1.05] text-[#0F172A] sm:text-6xl lg:text-[64px]">
              {copy.heroTitle}
            </h1>
            <p className="mt-6 max-w-[600px] text-lg leading-[1.8] text-[#64748B]">
              {copy.heroDescription}
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
          <FilterSidebar
            search={search}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            onSearchChange={updateSearch}
            onCategoryChange={updateCategory}
            onBrandChange={updateBrand}
            onReset={resetFilters}
            copy={copy}
            categoryOptions={categoryOptions}
            brandOptions={brandOptions}
          />
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-[#64748B]">
              {copy.showing} {totalProducts === 0 ? 0 : startIndex + 1}-{endIndex}{' '}
              {copy.of} {totalProducts} {copy.products}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                    {copy.openFilters}
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[88vw] overflow-y-auto bg-white p-0 sm:max-w-[380px]"
                >
                  <SheetHeader className="border-b border-slate-200 p-6">
                    <SheetTitle className="text-left text-slate-950">
                      {copy.filters}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="p-6">
                    <FilterSidebar
                      search={search}
                      selectedCategory={selectedCategory}
                      selectedBrand={selectedBrand}
                      onSearchChange={updateSearch}
                      onCategoryChange={updateCategory}
                      onBrandChange={updateBrand}
                      onReset={resetFilters}
                      copy={copy}
                      categoryOptions={categoryOptions}
                      brandOptions={brandOptions}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                  viewMode === 'grid'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-[#E5E7EB] bg-white text-slate-500 hover:border-blue-600 hover:text-blue-600'
                }`}
                aria-label={copy.gridLabel}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                  viewMode === 'list'
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-[#E5E7EB] bg-white text-slate-500 hover:border-blue-600 hover:text-blue-600'
                }`}
                aria-label={copy.listLabel}
              >
                <List className="h-4 w-4" />
              </button>

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
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                : 'grid grid-cols-1 gap-5'
            }
          >
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                index={index}
                viewMode={viewMode}
              />
            ))}
          </motion.div>

          {visibleProducts.length === 0 && (
            <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-10 text-center shadow-[0_18px_55px_rgba(15,23,42,0.05)]">
              <p className="text-xl font-extrabold text-[#0F172A]">
                {copy.emptyTitle}
              </p>
              <p className="mt-2 text-sm text-[#64748B]">
                {copy.emptyDescription}
              </p>
            </div>
          )}

          {visibleProducts.length > 0 && (
          <nav className="mt-14 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 1}
              className="flex h-10 min-w-10 items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E5E7EB] disabled:hover:text-slate-700"
              aria-label={copy.previousLabel}
            >
              <ChevronLeft className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>

            {pages.map((page) => {
              const active = page === activePage
              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-[10px] border px-3 text-sm font-bold transition ${
                    active
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-[#E5E7EB] bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600'
                  }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => goToPage(activePage + 1)}
              disabled={activePage === totalPages}
              className="flex h-10 min-w-10 items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white px-3 text-sm font-bold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E5E7EB] disabled:hover:text-slate-700"
              aria-label={copy.nextLabel}
            >
              <ChevronRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </nav>
          )}
        </div>
      </section>
      </main>
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  )
}
