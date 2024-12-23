import { Container } from '@/components/Container'
import Link from 'next/link'

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
      <div className="mt-16 sm:mt-20"></div>
    </Container>
  )
}
