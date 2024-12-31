import { cn } from '@/utilities/cn'
import React from 'react'

import type { Post } from '@/payload-types'

import { Card, CardPostData } from '@/components/payload/Card'
import { ArticleCard } from '@/components/payload/ArticleCard'

export type Props = {
  posts: CardPostData[]
}

export const ArticleCollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <ArticleCard
                    className="h-full"
                    doc={result}
                    relationTo="posts"
                    showCategories
                  />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
