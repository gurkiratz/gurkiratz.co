import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const navRoutes = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/posts',
    label: 'Posts',
  },
  {
    href: '/projects',
    label: 'Projects',
  },
  {
    href: '/hackathons',
    label: 'Hackathons',
  },
  {
    href: '/uses',
    label: 'Uses',
  },
  // {
  //   href: '/speaking',
  //   label: 'Speaking',
  // },
  // {
  //   href: '/about',
  //   label: 'About',
  // },
]
