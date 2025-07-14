import { type Metadata } from 'next'

import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Providers } from '@/app/(frontend)/providers'
// import { Providers } from '@/providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { getNavLinks } from '@/lib/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s - Gurkirat Singh',
    default: 'Gurkirat Singh - Full Stack Developer and student',
  },
  description:
    'I’m Gurkirat, a Software Engineering student at Humber Polytechnic, Toronto.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navRoutes = await getNavLinks()

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>
          <div className="relative flex w-full flex-col">
            <Header navRoutes={navRoutes} />
            {children}
            <Footer navRoutes={navRoutes} />
          </div>
        </Providers>
      </body>
    </html>
  )
}
