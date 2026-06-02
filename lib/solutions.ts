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

const features = [
  { title: 'Custom Design', text: 'Tailored engineering for site requirements.', icon: 'pen' },
  { title: 'Industry Standards', text: 'Aligned with IEC and international practices.', icon: 'badge' },
  { title: 'Cost Efficient', text: 'Optimized systems without compromising reliability.', icon: 'chart' },
  { title: 'Future Ready', text: 'Scalable architecture for long-term growth.', icon: 'sparkles' },
  { title: 'Quality Assured', text: 'Reviewed, validated, and documented delivery.', icon: 'shield' },
  { title: 'End-to-End Support', text: 'Guidance from concept through commissioning.', icon: 'headset' },
]

const checklist = [
  'Feasibility studies and load analysis',
  'Single line diagrams and detailed engineering',
  'Power system modeling and simulation',
  'Protection coordination and fault analysis',
  'Earthing, lighting and LV/MV system design',
  'Documentation and technical specifications',
]

const process = [
  { title: 'Consultation', text: 'Understanding your needs and project requirements.', icon: 'headset' },
  { title: 'Design & Analysis', text: 'Detailed engineering and system analysis.', icon: 'pen' },
  { title: 'Review & Approval', text: 'Design validation and client approval.', icon: 'clipboard' },
  { title: 'Implementation', text: 'Supporting procurement and project execution.', icon: 'settings' },
  { title: 'Support & Optimization', text: 'Testing, commissioning, and ongoing support.', icon: 'wrench' },
]

const tools = [
  { name: 'AutoCAD Electrical', label: 'Electrical CAD Design', icon: 'pen' },
  { name: 'ETAP Power System Analysis', label: 'Network Simulation', icon: 'cpu' },
  { name: 'SKM Short Circuit Analysis', label: 'Fault Studies', icon: 'zap' },
  { name: 'Dialux Lighting Design', label: 'Lighting Calculation', icon: 'lightbulb' },
  { name: 'Revit BIM Modeling', label: 'BIM Coordination', icon: 'building' },
  { name: 'Excel Load & Data Analysis', label: 'Engineering Data', icon: 'file' },
]

const industries = [
  { title: 'Industrial Plants', icon: 'factory' },
  { title: 'Commercial Buildings', icon: 'building' },
  { title: 'Power Utilities', icon: 'tower' },
  { title: 'Oil & Gas', icon: 'gauge' },
  { title: 'Data Centers', icon: 'database' },
  { title: 'Infrastructure', icon: 'network' },
  { title: 'Renewable Energy', icon: 'leaf' },
]

const projects = [
  {
    title: 'Industrial Plant Power Distribution',
    text: 'Complete electrical design for a large-scale manufacturing plant.',
    image: '/images/project-industrial-facility.png',
  },
  {
    title: '132kV Substation Engineering',
    text: 'Detailed design and engineering of 132kV GIS substation.',
    image: '/images/project-power-plant.png',
  },
  {
    title: 'Commercial Complex Electrical Design',
    text: 'Integrated electrical design for a multi-story commercial complex.',
    image: '/images/project-commercial.png',
  },
]

const seeds = [
  {
    slug: 'electrical-design-engineering',
    title: 'Electrical Design & Engineering',
    badge: 'OUR SOLUTION',
    category: 'Design & Engineering',
    description:
      'Custom electrical system design and engineering tailored to your project requirements and industry standards.',
    image: '/images/project-industrial-facility.png',
    heroImage: '/images/project-industrial-facility.png',
    overviewTitle: 'Engineering Excellence at Every Step',
  },
  {
    slug: 'power-distribution-systems',
    title: 'Power Distribution Systems',
    badge: 'POWER SYSTEMS',
    category: 'Power Systems',
    description:
      'Reliable power distribution architectures built around transformers, switchgear, substations, and protection systems.',
    image: '/images/product-substation.png',
    heroImage: '/images/product-substation.png',
    overviewTitle: 'Reliable Distribution From Source to Load',
  },
  {
    slug: 'installation-commissioning',
    title: 'Installation & Commissioning',
    badge: 'INSTALLATION',
    category: 'Installation Services',
    description:
      'Professional installation, site integration, commissioning, and startup support for critical electrical equipment.',
    image: '/images/project-commercial.png',
    heroImage: '/images/project-commercial.png',
    overviewTitle: 'Precise Execution for Critical Systems',
  },
  {
    slug: 'testing-maintenance',
    title: 'Testing & Maintenance',
    badge: 'MAINTENANCE',
    category: 'Testing & Maintenance',
    description:
      'Preventive maintenance, diagnostics, protection testing, and technical inspections that reduce downtime.',
    image: '/images/service-maintenance.png',
    heroImage: '/images/service-maintenance.png',
    overviewTitle: 'Performance Protected Over Time',
  },
  {
    slug: 'automation-control-systems',
    title: 'Automation & Control Systems',
    badge: 'AUTOMATION',
    category: 'Automation & Control',
    description:
      'Integrated control panels, monitoring systems, automation logic, and smart supervision for modern facilities.',
    image: '/images/service-electrical.png',
    heroImage: '/images/service-electrical.png',
    overviewTitle: 'Smarter Control for Modern Facilities',
  },
  {
    slug: 'technical-support-consulting',
    title: 'Technical Support & Consulting',
    badge: 'CONSULTING',
    category: 'Consulting Services',
    description:
      'Expert technical guidance for product selection, system upgrades, troubleshooting, and long-term performance.',
    image: '/images/project-data-center.png',
    heroImage: '/images/project-data-center.png',
    overviewTitle: 'Expert Guidance When It Matters Most',
  },
]

export const solutions: Record<string, Solution> = Object.fromEntries(
  seeds.map((seed) => [
    seed.slug,
    {
      ...seed,
      overviewText:
        'Our services deliver reliable, safe, and efficient electrical systems for industrial, commercial, and infrastructure projects. We combine cutting-edge technology with deep industry expertise to create innovative and sustainable solutions.',
      features,
      checklist,
      process,
      tools,
      industries,
      projects,
    },
  ])
)

export const solutionList = Object.values(solutions)
