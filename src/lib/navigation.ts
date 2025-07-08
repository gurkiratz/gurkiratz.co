import { getPayload } from 'payload'
import config from '@/payload.config'

export interface NavRoute {
  href: string
  label: string
  openInNewTab?: boolean
}

export async function getNavLinks(): Promise<NavRoute[]> {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'navlinks' as any, // Temporary fix until types are regenerated
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    return docs.map((doc: any) => ({
      href: doc.href,
      label: doc.label,
      openInNewTab: doc.openInNewTab || false,
    }))
  } catch (error) {
    console.error('Error fetching navigation links:', error)
    // Fallback to static navigation
    return [
      { href: '/', label: 'Home' },
      { href: '/posts', label: 'Posts' },
      { href: '/new-projects', label: 'Projects' },
      { href: '/hackathons', label: 'Hackathons' },
      { href: '/uses', label: 'Uses' },
    ]
  }
}
