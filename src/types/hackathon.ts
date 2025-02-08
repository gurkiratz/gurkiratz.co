import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface Hackathon {
  id: string
  name: string
  date: string
  imageUrl?: string | StaticImport
  project: {
    name: string
    description: string
    websiteUrl?: string
    devpostUrl?: string
    githubUrl?: string
  }
  technologies: string[]
  won?: boolean
}
