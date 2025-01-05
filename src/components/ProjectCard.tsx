'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectCardProps {
  title: string
  type: string
  year: number
  thumbnail: string
  description: string
  tags: string[]
  websiteUrl?: string
  githubUrl?: string
}

export function ProjectCard({
  title,
  type,
  year,
  thumbnail,
  description,
  tags,
  websiteUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg ">
      <CardHeader className="p-0">
        <div className="relative w-full overflow-hidden aspect-video">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {type} | {year}
          </p>
        </div>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4">
          {websiteUrl && (
            <Link
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="w-4 h-4" />
              Website
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
