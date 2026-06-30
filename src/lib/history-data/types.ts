export type Landmark = {
  id: string
  name: string
  period: string
  shortDesc: string
  fullDesc: string
  highlights: string[]
}

export type City = {
  id: string
  name: string
  region: string
  modernName?: string
  era: string
  summary: string
  description: string[]
  landmarks: Landmark[]
}

export type Region = {
  id: string
  name: string
  tagline: string
  intro: string
  description: string[]
  color: string
  icon: string
  cities: City[]
}

export type AnalysisSection = {
  id: string
  title: string
  thesis: string
  body: string[]
}

export type TimelineEvent = {
  year: number // отрицательная — до н. э., положительная — н. э.
  yearLabel: string
  greece?: string
  rome?: string
  mesopotamia?: string
  kuban?: string
}

export type MapRegion = {
  id: string
  name: string
  // Координаты на абстрактной карте (в процентах)
  x: number
  y: number
  region: string
  description: string
}

export type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  region: string
}

export type ComparisonRow = {
  criterion: string
  greece: string
  rome: string
  mesopotamia: string
  kuban: string
}

export type GlossaryTerm = {
  term: string
  origin: string // greece | rome | mesopotamia | kuban | general
  definition: string
}

export type SourceRef = {
  title: string
  author?: string
  url?: string
  description: string
  category: 'primary' | 'literature' | 'web' | 'museum'
}

export type Person = {
  id: string
  name: string
  originalName?: string
  region: string // greece | rome | mesopotamia | kuban
  era: string
  role: string
  shortBio: string
  fullBio: string
  achievements: string[]
}

export type Wonder = {
  id: string
  name: string
  originalName?: string
  location: string
  region: string // greece | rome | mesopotamia | kuban | egypt
  built: string
  destroyed: string
  builder: string
  shortDesc: string
  fullDesc: string
  legacy: string
}

export type ArchitecturalOrder = {
  id: string
  name: string
  originalName: string
  period: string
  origin: string
  shortDesc: string
  characteristics: string[]
  examples: string[]
  visualDescription: string
}

export type Epoch = {
  id: string
  name: string
  period: string
  startYear: number
  endYear: number
  regions: string[]
  shortDesc: string
  highlights: string[]
}
