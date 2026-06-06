import productsContent from '@/data/products.json'

export type ProductSpec = {
  label: string
  value: string
}

export type ProductBrand = {
  name: string
  logo: string
}

export type Product = {
  slug: string
  category: string
  badge: string
  title: string
  description: string
  image: string
  brand: ProductBrand
  specs: ProductSpec[]
}

export type CatalogLanguage = 'en' | 'fr' | 'ar'

type ProductJson = Omit<Product, 'brand'> & {
  brandKey: keyof typeof brands
}

const brands = {
  schneider: {
    name: 'Schneider Electric',
    logo: '/brands/Schneider_Electric.png',
  },
  sarel: { name: 'Sarel', logo: '/brands/sarel.png' },
  utec: { name: 'Utec', logo: '/brands/utec.png' },
  abb: { name: 'ABB', logo: '/brands/abb.png' },
  enel: { name: 'Enel Azazga', logo: '/brands/enel_azazga.png' },
}

const localizedProducts = productsContent as Record<
  CatalogLanguage,
  Record<string, ProductJson>
>

export function getProducts(language: CatalogLanguage = 'en') {
  return Object.fromEntries(
    Object.entries(localizedProducts[language]).map(([slug, product]) => [
      slug,
      {
        ...product,
        brand: brands[product.brandKey],
      },
    ])
  ) as Record<string, Product>
}

export function getProductList(language: CatalogLanguage = 'en') {
  return Object.values(getProducts(language))
}

export const products = getProducts('en')
export const productList = getProductList('en')
