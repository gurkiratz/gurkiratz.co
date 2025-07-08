import type { Payload } from 'payload'

export const seedNavLinks = async (payload: Payload): Promise<void> => {
  const navLinksData = [
    {
      label: 'Home',
      href: '/',
      order: 1,
      isActive: true,
      openInNewTab: false,
    },
    {
      label: 'Posts',
      href: '/posts',
      order: 2,
      isActive: true,
      openInNewTab: false,
    },
    {
      label: 'Projects',
      href: '/new-projects',
      order: 3,
      isActive: true,
      openInNewTab: false,
    },
    {
      label: 'Hackathons',
      href: '/hackathons',
      order: 4,
      isActive: true,
      openInNewTab: false,
    },
    {
      label: 'Uses',
      href: '/uses',
      order: 5,
      isActive: true,
      openInNewTab: false,
    },
  ]

  for (const navLink of navLinksData) {
    try {
      await payload.create({
        collection: 'navlinks' as any, // Temporary fix until types are regenerated
        data: navLink,
      })
    } catch (error) {
      console.error('Error creating navigation link:', error)
    }
  }

  console.log('Navigation links seeded successfully')
}
