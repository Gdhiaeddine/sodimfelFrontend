import solutionsContent from '@/data/solutions.json'
import type { CatalogLanguage } from '@/lib/products'

export type SolutionFeature = {
  title: string
  text: string
  icon: string
}

export type SolutionProcessStep = {
  title: string
  text: string
  icon: string
}

export type SolutionTool = {
  name: string
  label: string
  icon: string
}

export type SolutionIndustry = {
  title: string
  icon: string
}

export type SolutionProject = {
  title: string
  text: string
  image: string
}

export type Solution = {
  slug: string
  title: string
  badge: string
  category: string
  description: string
  image: string
  heroImage: string
  overviewTitle: string
  overviewText: string
  features: SolutionFeature[]
  checklist: string[]
  process: SolutionProcessStep[]
  tools: SolutionTool[]
  industries: SolutionIndustry[]
  projects: SolutionProject[]
}

type SolutionSeed = Omit<
  Solution,
  | 'overviewText'
  | 'features'
  | 'checklist'
  | 'process'
  | 'tools'
  | 'industries'
  | 'projects'
>

type SolutionsJson = Record<
  CatalogLanguage,
  {
    common: Pick<
      Solution,
      | 'overviewText'
      | 'features'
      | 'checklist'
      | 'process'
      | 'tools'
      | 'industries'
      | 'projects'
    >
    items: SolutionSeed[]
  }
>

const localizedSolutions = solutionsContent as SolutionsJson

export function getSolutions(language: CatalogLanguage = 'en') {
  const catalog = localizedSolutions[language]

  return Object.fromEntries(
    catalog.items.map((solution) => [
      solution.slug,
      {
        ...solution,
        ...catalog.common,
      },
    ])
  ) as Record<string, Solution>
}

export function getSolutionList(language: CatalogLanguage = 'en') {
  return Object.values(getSolutions(language))
}

export const solutions = getSolutions('en')
export const solutionList = getSolutionList('en')
