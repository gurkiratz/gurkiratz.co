export const revalidate = 60 // Revalidate every 60 seconds

import { Container } from '@/components/Container'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectGrid } from './_components/ProjectGrid'
import { Project } from '@/payload-types'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { ArrowRightIcon } from 'lucide-react'

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
          <Button
            href="/projects"
            className=" w-full px-6 py-3 text-sm font-medium text-zinc-600 transition-all hover:text-zinc-900 hover:underline sm:w-auto dark:text-zinc-400 dark:hover:text-zinc-100"
            variant="secondary"
          >
            All projects <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Container>
  )
}
