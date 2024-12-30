import { type Metadata } from 'next'

import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { Providers } from '@/app/(frontend)/providers'
// import { Providers } from '@/providers'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InitTheme } from '@/providers/Theme/InitTheme'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="relative flex w-full flex-col">
            {/* <Layout>{children}</Layout> */}
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
