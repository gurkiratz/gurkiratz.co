import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionArchive } from '@/components/payload/CollectionArchive'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ArticleCollectionArchive } from '@/components/payload/ArticleCollectionArchive'
import { ArticleCard } from '@/components/payload/ArticleCard'

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
    <SimpleLayout
      title="Writing on Software Development, College life, and Gadgets."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex flex-col max-w-3xl space-y-16">
          {posts.docs?.map((result) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <ArticleCard
                  doc={result}
                  key={result.slug}
                  relationTo="posts"
                  showCategories
                />
              )
            }

            return null
          })}
          {/* <ArticleCollectionArchive posts={posts.docs} /> */}
        </div>
      </div>
    </SimpleLayout>
  )
}
