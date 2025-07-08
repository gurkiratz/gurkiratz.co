import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import { Container } from '@/components/Container'
import Link from 'next/link'

interface Project {
  name: string
  description: string
  link: { href: string; label: string }
  logo: string
}

const projects: Project[] = [
  {
    name: '6ix City Immigration',
    description: 'A beautifully designed website for 6ix City Immigration Inc.',
    link: {
      href: 'https://6ixcityimmigration.ca',
      label: '6ixcityimmigration.ca',
    },
    logo: 'https://utfs.io/f/a76ea53a-c8b2-460f-8ccb-8a9d380d0ea6-hru0oc.png',
  },
  {
    name: 'Convex Todo App',
    description:
      'Next.js todo app built on top of Convex Backend and Authentication with Clerk',
    link: { href: 'https://todo.gurkiratz.co/', label: 'todo.gurkiratz.co' },
    logo: 'https://utfs.io/f/PqKzO2Akrj450gLXGPh6TG9y8f13OJSCEzecHZ7mrXajx4Uw',
  },
  {
    name: 'We Broke The Ice - GDSC Hacks 2024 (Best UI Winner)',
    description:
      'Generate AI based icebreaker ideas for easy access and intuitive step-by-step instructions.',
    link: {
      href: 'https://webroketheice.gurkiratz.co/',
      label: 'webroketheice.gurkiratz.co/',
    },
    logo: 'https://em-content.zobj.net/source/twitter/408/ice_1f9ca.png',
  },
  {
    name: 'Workify - Hawk Hacks 2024',
    description:
      'Outsourcing work platform and facilitate micro-payments in NEAR/Solana tokens',
    link: {
      href: 'https://github.com/gurkiratz/workifyy',
      label: 'github.com/gurkiratz/workifyy',
    },
    logo: 'https://em-content.zobj.net/source/apple/391/hammer-and-wrench_1f6e0-fe0f.png',
  },
  {
    name: 'IOS World Clock',
    description: 'Web Clone of Apple World Clock w/ day.js API',
    link: {
      href: 'https://gurkiratz.github.io/ios-world-clock/',
      label: 'gurkiratz.github.io/ios-world-clock/',
    },
    logo: 'https://em-content.zobj.net/source/apple/391/mantelpiece-clock_1f570-fe0f.png',
  },
  {
    name: 'Global Sikhs',
    description:
      'A well built website for Global Sikhs NGO (under construction)',
    link: {
      href: 'https://globalsikhs-v2.vercel.app/',
      label: 'globalsikhs-v2.vercel.app',
    },
    logo: 'https://utfs.io/f/PqKzO2Akrj45v88NKnQg9Sapzh57q1i0IFHoOTnGjLlNWu3x',
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
}

export default function Projects() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
          Building My Vision
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Here is a showcase of some of my projects that I made. They can be
          found on my{' '}
          <Link
            className="font-bold underline"
            href="https://github.com/gurkiratz"
          >
            Github
          </Link>
          ! I am working on some projects that involve TypeScript and NextJS,
          they will be uploaded in a while.
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  width={'100'}
                  height={'100'}
                  className="h-8 w-8"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href} target="_blank">
                  {project.name}
                </Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </div>
    </Container>
  )
}
