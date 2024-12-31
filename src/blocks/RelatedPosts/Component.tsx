import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/payload/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/payload/Card'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: any
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid items-stretch grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <Card key={index} doc={doc} relationTo="posts" showCategories />
          )
        })}
      </div>
    </div>
  )
}
