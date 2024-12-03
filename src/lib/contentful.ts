import { createClient, EntryFieldTypes } from 'contentful'
import { Document } from '@contentful/rich-text-types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export interface RichTextContent {
    content: Document
}

export async function getEntries(content_type: string) {
  const entries = await client.getEntries({ content_type })
  return entries.items
}

type IntroSkeleton = {
    contentTypeId: 'Intro',
    fields: {
        intro: EntryFieldTypes.RichText
    }
}

export async function getIntro(entryId: string) {
  const intro = await client.getEntry<IntroSkeleton>(entryId)
  return intro
}
