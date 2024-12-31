import { formatDateTime } from '@/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/payload/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Container } from '@/components/Container'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== ''

  return (
    <div
      className={cn(
        'relative z-10 flex items-end justify-center',
        heroImage ? '-mt-[10.4rem]' : 'mt-12',
      )}
    >
      <Container>
        <div className="relative z-10 flex flex-col justify-center max-w-4xl mx-auto dark:text-white">
          <div className="mb-6">
            {publishedAt && (
              <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            )}
          </div>
          <div className="">
            <h1 className="mb-6 text-4xl tracking-tight sm:text-5xl">
              {title}
            </h1>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Badge key={category.id} variant="secondary">
                    {titleToUse.toUpperCase()}
                  </Badge>
                )
              }
              return null
            })}
          </div>
        </div>
      </Container>
      <div className={cn('select-none', heroImage ? 'min-h-[80vh]' : '')}>
        {' '}
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            fill
            priority
            imgClassName="-z-10 object-cover"
            resource={heroImage}
          />
        )}{' '}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none h-1/2 bg-gradient-to-t from-gray-100 to-transparent dark:from-black dark:to-transparent" />
        {/* <div className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[var(--tw-prose-body)] to-[var(--tw-prose-invert-body)]" /> */}
      </div>
    </div>
  )
}
