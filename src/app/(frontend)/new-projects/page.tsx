import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionArchive } from '@/components/payload/CollectionArchive'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Projects() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
          Writing on Software Development, College life, and Gadgets.
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          All of my long-form thoughts on programming, leadership, product
          design, and more, collected in chronological order.
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <CollectionArchive posts={posts.docs} />
      </div>
    </Container>
  )
}
