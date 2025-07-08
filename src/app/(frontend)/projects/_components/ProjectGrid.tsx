'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Project } from '@/payload-types'

interface ProjectGridProps {
  projects: Project[]
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  // Get all project types
  const types = Array.from(new Set(projects.map((p) => p.type).filter(Boolean)))
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Filter projects by selected type (if any)
  const filteredProjects = selectedType
    ? projects.filter((p) => p.type === selectedType)
    : projects

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors
            ${
              !selectedType
                ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                : 'border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
            }`}
          onClick={() => setSelectedType(null)}
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors
              ${
                selectedType === type
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                  : 'border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
              }`}
            onClick={() => setSelectedType(type as string)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="grid shrink grid-cols-1 gap-8 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <div key={project.id}>
            <Image
              src={
                typeof project.thumbnail === 'string'
                  ? project.thumbnail
                  : project.thumbnail.url
              }
              alt="Project 1"
              width={500}
              height={500}
              className="mb-3 w-full rounded-2xl"
            />
            <div className="flex items-end gap-3">
              <h3 className="text-lg font-bold dark:text-white">
                {project.title}
              </h3>
              <p className="text-muted text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {project.year}
              </p>
            </div>
            <p className="text-lg font-medium text-zinc-800 dark:text-zinc-400">
              {project.description}
            </p>
            <div className="flex items-center">
              {project.links?.map((link, idx) => (
                <React.Fragment key={link.id}>
                  <Link
                    href={link.url}
                    className="text-sm font-bold underline decoration-zinc-400 decoration-2 underline-offset-4 hover:decoration-black dark:decoration-zinc-600 dark:hover:decoration-white"
                  >
                    {link.label}
                  </Link>
                  {idx < project.links.length - 1 && (
                    <span className="mx-1 text-2xl text-zinc-600 dark:text-zinc-400">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
