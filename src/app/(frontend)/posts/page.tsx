import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import { ArticleCard } from '@/components/payload/ArticleCard'
import { queryAllPosts } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
}

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Projects() {
  const posts = await queryAllPosts()

  return (
    <SimpleLayout
      title="Writing on Software Development, College life, and Gadgets."
      intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {posts?.map((result) => {
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
        </div>
      </div>
    </SimpleLayout>
  )
}