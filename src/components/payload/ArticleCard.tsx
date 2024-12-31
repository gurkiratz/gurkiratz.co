'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/payload/Media'
import { formatDateTime } from '@/utilities/formatDateTime'
import { Card } from '@/components/Card'
import { Badge } from '../ui/badge'
export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'
>

export const ArticleCard: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn('md:grid md:grid-cols-4 md:items-baseline', className)}
      ref={card.ref}
    >
      <Card className="md:col-span-3">
        {titleToUse && <Card.Title href={href}>{titleToUse}</Card.Title>}
        {publishedAt && (
          <Card.Eyebrow
            as="time"
            dateTime={publishedAt}
            className="md:hidden"
            decorate
          >
            {formatDateTime(publishedAt)}
          </Card.Eyebrow>
        )}
        <Card.Description>
          <div className="flex flex-col gap-1">
            {description && (
              <div className="mt-2">
                {description && <p>{sanitizedDescription}</p>}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-1 -ml-1">
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse = categoryTitle || 'Untitled category'

                  return (
                    <Badge key={category.id} variant="outline">
                      {titleToUse.toUpperCase()}
                    </Badge>
                  )
                }
                return null
              })}
            </div>
          </div>
        </Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      {publishedAt && (
        <Card.Eyebrow
          as="time"
          dateTime={publishedAt}
          className="hidden mt-1 md:block"
        >
          {formatDateTime(publishedAt)}
        </Card.Eyebrow>
      )}

      {/* <div className="p-4">
        {showCategories && hasCategories && (
          <div className="mb-4 text-sm uppercase">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle =
                      titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {publishedAt && (
          <div className="text-sm">{formatDateTime(publishedAt)}</div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div> */}
    </article>
  )
}
