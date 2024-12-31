import logoGdsc from '@/images/logos/gdsc.svg'
import logoHawkhacks from '@/images/logos/hawkhacks.svg'
import { FaGithub } from 'react-icons/fa'
import { FaExternalLinkAlt } from 'react-icons/fa'

import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { Button } from './Button'
import { ArrowRight } from 'lucide-react'

interface Hackathon {
  name: string
  project: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  github: string
  website?: string
  blog?: string
}

function Hackathon({ hackathon }: { hackathon: Hackathon }) {
  let startLabel =
    typeof hackathon.start === 'string'
      ? hackathon.start
      : hackathon.start.label
  let startDate =
    typeof hackathon.start === 'string'
      ? hackathon.start
      : hackathon.start.dateTime

  let endLabel =
    typeof hackathon.end === 'string' ? hackathon.end : hackathon.end.label
  let endDate =
    typeof hackathon.end === 'string' ? hackathon.end : hackathon.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={hackathon.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Hackathon Name</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {hackathon.name}
        </dd>
        <dt className="sr-only">Hackathon</dt>
        <dd className="flex items-center gap-3 text-zinc-500 dark:text-zinc-300">
          <span className="font-mono text-sm font-semibold italic">
            {hackathon.project}:
          </span>
          <Link className="text-md" href={hackathon.github} target="_blank">
            <FaGithub className="inline transition-all duration-150 ease-in-out hover:scale-[110%]" />
          </Link>
          {hackathon.website && (
            <Link
              href={hackathon.website}
              target="_blank"
              className="text-sm decoration-orange-600 decoration-2 hover:underline "
            >
              Website <FaExternalLinkAlt className="inline" />
            </Link>
          )}
          {hackathon.blog && (
            <Link
              href={hackathon.blog}
              className="text-sm decoration-orange-600 decoration-2 hover:underline "
            >
              BLog
            </Link>
          )}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          {/* <span aria-hidden="true">—</span>{' '}
            <time dateTime={endDate}>{endLabel}</time> */}
        </dd>
      </dl>
    </li>
  )
}

function HackathonList() {
  let hackathons: Array<Hackathon> = [
    {
      name: 'Hawk Hacks 2024',
      project: 'Workify',
      logo: logoHawkhacks,
      start: 'May 2024',
      end: '2024',
      github: 'https://github.com/gurkiratz/workifyy',
      blog: '/posts/hawkhacks-2024',
    },
    {
      name: 'GDSC Hacks 2024',
      project: 'We Broke The Ice',
      logo: logoGdsc,
      start: 'May 2024',
      end: '2011',
      github: 'https://github.com/gurkiratz/webroketheice',
      website: 'https://webroketheice.vercel.app/',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Hackathons</span>
      </h2>
      <ol className="mt-6 space-y-6">
        {hackathons.map((hackathon, hackathonIndex) => (
          <Hackathon key={hackathonIndex} hackathon={hackathon} />
        ))}
      </ol>
      <Button
        href="https://resume.gurkiratz.co/about/resume.pdf"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Resume
        <ArrowRight className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default HackathonList
