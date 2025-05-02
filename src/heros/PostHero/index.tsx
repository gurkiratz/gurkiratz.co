import type React from 'react'
import { formatDateTime } from '@/utilities/formatDateTime'
import type { Post } from '@/payload-types'
import { Media } from '@/components/payload/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Container } from '@/components/Container'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== ''

  // Calculate min-height based on whether there's an image
  // Use vh for image hero, specific height/padding otherwise
  const heroMinHeight = heroImage ? 'min-h-[70vh] md:min-h-[65vh]' : ''
  const wrapperTopMargin = !heroImage ? 'mt-16 md:mt-24' : ''
  // Adjust the negative margin-top to match your header height if needed
  const imageTopMargin = heroImage
    ? '-mt-[calc(var(--header-height,6rem)+1rem)]'
    : '' // Example: Adjust based on actual header height variable or value

  return (
    <div
      className={cn(
        'relative z-10',
        imageTopMargin, // Apply negative margin only if image exists
        heroMinHeight, // Apply min-height only if image exists
        wrapperTopMargin, // Apply top margin only if NO image exists
      )}
    >
      {/* Hero Image Background & Overlay */}
      {heroImage && typeof heroImage !== 'string' && (
        <div className="absolute inset-0 h-full w-full">
          {/* Image */}
          <Media
            fill
            priority
            imgClassName="object-cover"
            resource={heroImage}
          />
          {/* Tinted/Darkened Overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900/30 dark:bg-black/50" // Light mode tint, Dark mode darker overlay
          />
        </div>
      )}

      {/* Content */}
      <Container
        className={cn(
          'relative z-10 flex h-full flex-col',
          // If there's a hero image, center content vertically, otherwise let it flow
          heroImage ? 'justify-center' : '',
        )}
      >
        {/* Centered Content Wrapper */}
        <div
          className={cn(
            'mx-auto flex max-w-3xl flex-col items-start',
            // Apply vertical padding only if there's an image
            heroImage ? 'py-24 md:py-32' : 'py-12 md:py-16', // Reduced padding when no image
            // Text color needs to contrast with overlay/background
            heroImage
              ? 'text-white' // White text on overlay
              : 'text-gray-900 dark:text-white', // Default text colors when no image/overlay
            heroImage ? 'backdrop-blur-sm' : '',
            heroImage ? 'items-start' : 'items-center text-center', // Center items if there's an image
          )}
        >
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle, id } = category
                  const titleToUse = categoryTitle || 'Untitled category'

                  return (
                    // Use a badge style that contrasts well with the background/overlay
                    <Badge
                      key={id}
                      // Example: Use outline or a lighter/darker secondary for contrast
                      variant={heroImage ? 'secondary' : 'outline'}
                      className={cn(
                        // Ensure badge text is readable too
                        heroImage
                          ? 'border-transparent bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                          : '',
                      )}
                    >
                      {titleToUse.toUpperCase()}
                    </Badge>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>

          {/* Meta (Date & Author) */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm opacity-90 md:text-base">
            {publishedAt && (
              <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            )}
            {/* Separator */}
            {hasAuthors && publishedAt && (
              <span aria-hidden="true" className="opacity-50">
                ·
              </span> // Using a dot separator
            )}
            {hasAuthors && (
              <div className="flex items-center gap-1.5">
                {/* Optional: Add 'By' or an icon */}
                {/* <span className="opacity-80">By</span> */}
                <span className="font-medium">
                  {formatAuthors(populatedAuthors)}
                </span>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
