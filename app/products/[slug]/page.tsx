import { notFound } from 'next/navigation'
import { products } from '@/lib/products'
import { ProductDetailsClient } from './product-details-client'

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products[slug]

  if (!product) {
    notFound()
  }

  return <ProductDetailsClient product={product} />
}
