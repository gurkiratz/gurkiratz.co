'use client'
import Image from 'next/image'
import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Project {
  id: string
  title: string
  type: string
  year: number
  thumbnail: { url: string }
  description: string
  tags: { tag: string }[]
  websiteUrl?: string
  githubUrl?: string
  devpostUrl?: string
}

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [active, setActive] = useState<Project | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[90%] dark:bg-neutral-900"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={300}
                  src={active.thumbnail.url}
                  alt={active.title}
                  className="h-80 w-full object-cover object-center sm:rounded-tl-lg sm:rounded-tr-lg"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    {/* <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p> */}
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    {active.websiteUrl && (
                      <Button asChild variant="link">
                        <Link
                          href={active.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Website
                        </Link>
                      </Button>
                    )}
                    {active.githubUrl && (
                      <Button asChild variant="link">
                        <Link
                          href={active.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {active.devpostUrl && (
                      <Button asChild variant="link">
                        <Link
                          href={active.devpostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Devpost
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
                  >
                    {active.description}
                    <div className="flex flex-wrap gap-2">
                      {active.tags.map(({ tag }) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="font-light"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="w-full max-w-4xl gap-4">
        {projects.map((project) => (
          <motion.div
            layoutId={`card-${project.title}-${id}`}
            key={`card-${project.title}-${id}`}
            onClick={() => setActive(project)}
            className="flex cursor-pointer flex-col items-center rounded-xl p-4 hover:bg-neutral-50 md:flex-row md:justify-between dark:hover:bg-neutral-800"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <motion.div
                layoutId={`image-${project.title}-${id}`}
                className="relative aspect-square h-20 flex-shrink-0"
              >
                <Image
                  width={96}
                  height={96}
                  src={project.thumbnail.url}
                  alt={project.title}
                  className="hidden h-full w-full rounded-lg object-cover object-center md:block"
                />
              </motion.div>
              <div className="text-left">
                <motion.h3
                  layoutId={`title-${project.title}-${id}`}
                  className="font-medium text-neutral-800 md:text-left dark:text-neutral-200"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${project.description}-${id}`}
                  className="text-neutral-600 md:text-left dark:text-neutral-400"
                >
                  {project.description}
                </motion.p>
                <div className="-ml-1 mb-4 mt-1 flex flex-wrap gap-2">
                  {project.tags.map(({ tag }) => (
                    <Badge key={tag} variant="outline" className="font-light">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <motion.button
              layoutId={`button-${project.title}-${id}`}
              className="mt-4 hidden rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-black hover:bg-teal-600 hover:text-white md:mt-0"
            >
              View
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}
