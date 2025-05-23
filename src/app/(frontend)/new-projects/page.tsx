import { Container } from '@/components/Container'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectGrid } from './_components/ProjectGrid'
import { Project } from '@/payload-types'

export default async function ProjectsPage() {
  const payload = await getPayload({ config: configPromise })
  const response = await payload.find({ collection: 'projects', sort: '-year' })
  const projects = response.docs as Project[]

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="mb-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl md:text-6xl md:font-normal dark:text-zinc-100">
          Projects
        </h1>
        <p className="mt-3 text-lg font-medium text-zinc-500 dark:text-zinc-400">
          When I'm not working on a client project, I'm working on my own
          projects. Here are some things I made over the years.
        </p>
      </header>
      <ProjectGrid projects={projects} />
    </Container>
  )
}
