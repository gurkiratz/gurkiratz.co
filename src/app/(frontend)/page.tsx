import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  DevpostIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import logoGdsc from '@/images/logos/gdsc.svg'
import logoHawkhacks from '@/images/logos/hawkhacks.svg'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import Timer from '@/components/Timer'
import Hackathon from '@/components/Hackathon'
import Projects from './projects/page'
import TypingText from '@/components/animata/text/typing-text'
import TextAnimate from '@/components/animata/text/wave-reveal'
import { cache, Suspense } from 'react'
import RichText from '@/components/payload/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArticleCard } from '@/components/payload/ArticleCard'
import { queryAllPosts } from '@/lib/articles'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
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
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
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

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/posts/${article.slug}`}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" target="_blank" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  href: string
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Link href={role.href}>
          <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
        </Link>
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
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

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  href: string
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Planetaria',
      title: 'CEO',
      logo: logoPlanetaria,
      start: '2019',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
      href: 'articles/hawkhacks-2024',
    },
    {
      company: 'Airbnb',
      title: 'Product Designer',
      logo: logoAirbnb,
      start: '2014',
      end: '2019',
      href: 'articles/hawkhacks-2024',
    },
    {
      company: 'Facebook',
      title: 'iOS Software Engineer',
      logo: logoFacebook,
      start: '2011',
      end: '2014',
      href: 'articles/hawkhacks-2024',
    },
    {
      company: 'Starbucks',
      title: 'Shift Supervisor',
      logo: logoStarbucks,
      start: '2008',
      end: '2011',
      href: 'articles/hawkhacks-2024',
    },
    {
      company: 'Hawk Hacks',
      title: 'Workify',
      logo: logoHawkhacks,
      start: 'May 2024',
      end: '2024',
      href: 'articles/hawkhacks-2024',
    },
    {
      company: 'GDSC Hacks',
      title: 'We Broke The Ice',
      logo: logoGdsc,
      start: 'May 2024',
      end: '2011',
      href: 'articles/hawkhacks-2024',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Hackathons</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  let images = [
    'https://res.cloudinary.com/drwqe7dxm/image/upload/v1719029852/IMG_8968_a3mdjn.jpg',
    'https://res.cloudinary.com/drwqe7dxm/image/upload/v1719029854/IMG_6029_nhotep.jpg',
    'https://res.cloudinary.com/drwqe7dxm/image/upload/v1719069620/gqny46em8aimynf67zvp.jpg',
    'https://res.cloudinary.com/drwqe7dxm/image/upload/v1717002671/IMG_5578_pbxlve.jpg',
    'https://res.cloudinary.com/drwqe7dxm/image/upload/v1719069567/hcci2yhrk1gl5ecfrc5u.jpg',
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image, imageIndex) => (
          <div
            key={imageIndex}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              width={800}
              height={1000}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export const revalidate = 3600 // revalidate every hour

export default async function Home() {
  const posts = await queryAllPosts()
  const introText = await getIntroText()
  return (
    <>
      <Container className="mt-9">
        <div className="flex flex-col items-start justify-between gap-8 md:w-full md:flex-row">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Hi, I{"'"}m{' '}
              <Link
                href={'https://github.com/gurkiratz'}
                className="hover:underline"
              >
                Gurkirat
              </Link>
              !
            </h1>
            <span className="mt-6 block text-base text-zinc-600 dark:text-zinc-300">
              <RichText
                data={introText.intro1}
                className="m-0 dark:text-zinc-300"
              />
              <span>
                I'm 21. For the past 3 years—or exactly{' '}
                <Timer className="text-blue-500 dark:text-blue-300" />{' '}
                milliseconds—I've been turning coffee and code into building
                apps, solving problems, and having fun breaking (and fixing)
                things!
              </span>
              {/* <RichText data={introText.intro2} className="dark:text-zinc-300" /> */}
            </span>
            {/* <div className="mt-6 flex gap-6">
              <SocialLink
                href="https://github.com/gurkiratz"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/gurkiratz/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
              <SocialLink
                href="https://twitter.com/theGurSingh"
                aria-label="Follow on X"
                icon={XIcon}
              />
              <SocialLink
                href="https://instagram.com/gurkiratxz"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://devpost.com/gurkiratz/challenges"
                aria-label="Follow on Devpost"
                icon={DevpostIcon}
              />
            </div> */}
          </div>
          <div className="flex flex-col gap-3 text-right underline decoration-zinc-800/20 dark:decoration-white/10">
            <a href="https://linkedin.com/in/gurkiratz" className="">
              LinkedIn
            </a>
            <a href="https://github.com/gurkiratz">Github</a>
            <a href="https://twitter.com/theGurSingh">Twitter</a>
          </div>
        </div>
      </Container>
      {/* <Photos /> */}
      <Projects />
      <Container className="mt-24 md:mt-28">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">
            Articles
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Writing on Software Development, College life, and Hackathons.
          </p>
        </header>
        <div className="mt-16 max-w-xl lg:mx-auto lg:max-w-none">
          <div className="flex flex-col gap-16">
            {posts?.map((result) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <ArticleCard
                    doc={result}
                    key={result.slug}
                    relationTo="posts"
                    showCategories
                  />
                )
              }

              return null
            })}
          </div>
        </div>
      </Container>
    </>
  )
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
