import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe, Code2, Github, Calendar, Trophy } from 'lucide-react'
import { Hackathon } from '@/types/hackathon'
import Image from 'next/image'
import Link from 'next/link'

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  return (
    <Card className="w-full max-w-md overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg dark:border-gray-500/20">
      <div className="relative h-64 overflow-hidden transition-all">
        <Image
          src={
            hackathon.imageUrl ||
            'https://indieground.net/wp-content/uploads/2023/03/Freebie-GradientTextures-Preview-06.jpg'
          }
          alt={hackathon.name}
          // layout="fill"
          objectFit="cover"
          width={500}
          height={600}
          className="h-full transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <CardHeader className="absolute bottom-0 left-0 right-0 text-white">
          <CardTitle className="text-2xl font-bold">{hackathon.name}</CardTitle>
          <CardDescription className="flex items-center text-gray-200">
            <Calendar className="mr-2 h-4 w-4" />
            {hackathon.date}
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="h-full bg-gradient-to-br p-6 ">
        <div className="mb-4 flex items-center">
          {hackathon.won && <Trophy className="mr-2 h-5 w-5 text-yellow-500" />}
          <h3 className="text-xl font-semibold">{hackathon.project.name}</h3>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          {hackathon.project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {hackathon.project.websiteUrl && (
            <Button
              variant="default"
              size="sm"
              asChild
              className="transition-colors"
            >
              <Link
                href={hackathon.project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-2 h-4 w-4" />
                Demo
              </Link>
            </Button>
          )}

          {hackathon.project.githubUrl && (
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="transition-colors hover:bg-[#24292e] hover:text-white"
            >
              <a
                href={hackathon.project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {hackathon.project.devpostUrl && (
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="transition-colors hover:bg-[#003E54] hover:text-white"
            >
              <a
                href={hackathon.project.devpostUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="mr-2 h-4 w-4" />
                Devpost
              </a>
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {hackathon.technologies.map((tech, index) => (
            <Badge key={index} variant="default">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
