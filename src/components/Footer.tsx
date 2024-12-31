import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="flex-none mt-32">
      <ContainerOuter>
        <div className="pt-10 pb-16 border-t border-zinc-100 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center text-sm font-medium gap-x-6 gap-y-1 text-zinc-800 dark:text-zinc-200">
                {/* <NavLink href="/about">About</NavLink> */}
                <NavLink href="/">Home</NavLink>
                <NavLink href="/posts">Posts</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                {/* <NavLink href="/speaking">Speaking</NavLink> */}
                <NavLink href="/uses">Uses</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Gurkirat Singh. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
