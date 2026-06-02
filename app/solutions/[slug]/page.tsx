import { notFound } from 'next/navigation'
import { solutions } from '@/lib/solutions'
import { SolutionDetailsClient } from './solution-details-client'

export function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }))
}

export default async function SolutionDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = solutions[slug]

  if (!solution) {
    notFound()
  }

  return <SolutionDetailsClient solution={solution} />
}
