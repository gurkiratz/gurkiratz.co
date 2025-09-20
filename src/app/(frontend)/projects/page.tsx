export const revalidate = 60 // Revalidate every 60 seconds

import { Container } from '@/components/Container'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectGrid } from './_components/ProjectGrid'
import { Project } from '@/payload-types'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { ArrowRightIcon } from 'lucide-react'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import AttractButton from '@/components/kokonutui/attract-button'

interface ProjectsPageProps {
  variant?: 'home' | 'full'
}

export default async function ProjectsPage({
  variant = 'full',
}: ProjectsPageProps = {}) {
  const payload = await getPayload({ config: configPromise })
  const response = await payload.find({ collection: 'projects' })
  const allProjects = response.docs as Project[]

  // Limit projects for home variant
  const projects = variant === 'home' ? allProjects.slice(0, 4) : allProjects

  const isHomePage = variant === 'home'

  return (
    <Container className={isHomePage ? 'mt-16' : 'mt-16 sm:mt-24'}>
      <header className="mb-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl md:text-6xl md:font-normal dark:text-zinc-100">
          {isHomePage ? 'Recent Projects' : 'Projects'}
        </h1>
        <p className="mt-3 text-lg font-medium text-zinc-500 dark:text-zinc-400">
          {isHomePage
            ? "Here are some of my recent projects. I'm always working on something new."
            : "When I'm not working on a client project, I'm working on my own projects. Here are some things I made over the years."}
        </p>
      </header>
      <ProjectGrid projects={projects} />
      {isHomePage && (
        <div className="mt-12 flex justify-center">
          <AttractButton href="/projects" className="min-w-44 md:w-16">
            All projects
          </AttractButton>
        </div>
      )}
    </Container>
  )
}
