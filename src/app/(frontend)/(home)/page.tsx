import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { queryAllPosts } from '@/lib/articles'
import HomePage from './HomePage'

export const revalidate = 3600 // revalidate every hour

export default async function Home() {
  const posts = await queryAllPosts()
  const introText = await getIntroText()
  
  return <HomePage posts={posts} introText={introText} />
}

const getIntroText = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result1 = await payload.findGlobal({
    slug: 'intro1',
  })
  const result2 = await payload.findGlobal({
    slug: 'intro2',
  })

  return { intro1: result1['intro-text'], intro2: result2['intro-text'] }
})
