'use client'

/**
 * @author: @dorian_baffier
 * @description: Attract Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { cn } from '@/lib/utils'
import { motion, useAnimation } from 'motion/react'
import { ArrowRightIcon, Magnet } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AttractButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  particleCount?: number
  attractRadius?: number
  href?: string
  children?: React.ReactNode
}

interface Particle {
  id: number
  x: number
  y: number
}

export default function AttractButton({
  className,
  particleCount = 12,
  attractRadius = 50,
  href,
  children,
  ...props
}: AttractButtonProps) {
  const [isAttracting, setIsAttracting] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const particlesControl = useAnimation()

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
    }))
    setParticles(newParticles)
  }, [particleCount])

  const handleInteractionStart = useCallback(async () => {
    setIsAttracting(true)
    await particlesControl.start({
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
      },
    })
  }, [particlesControl])

  const handleInteractionEnd = useCallback(async () => {
    setIsAttracting(false)
    await particlesControl.start((i) => ({
      x: particles[i].x,
      y: particles[i].y,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    }))
  }, [particlesControl, particles])

  if (href) {
    return (
      <Button
        asChild
        className={cn(
          'relative min-w-40 touch-none',
          'bg-sky-100 dark:bg-sky-900',
          'hover:bg-sky-200 dark:hover:bg-sky-800',
          'text-sky-600 dark:text-sky-300',
          'border border-sky-300 dark:border-sky-700',
          'transition-all duration-300',
          className,
        )}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        {...props}
      >
        <Link
          href={href}
          className="relative flex w-full items-center justify-center gap-2"
        >
          {particles.map((_, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ x: particles[index].x, y: particles[index].y }}
              animate={particlesControl}
              className={cn(
                'absolute h-1.5 w-1.5 rounded-full',
                'bg-sky-400 dark:bg-sky-300',
                'transition-opacity duration-300',
                isAttracting ? 'opacity-100' : 'opacity-40',
              )}
            />
          ))}

          {children ?? (isAttracting ? 'Attracting' : 'Hover me')}
          <ArrowRightIcon
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              isAttracting && 'scale-110',
            )}
          />
        </Link>
      </Button>
    )
  }

  return (
    <Button
      className={cn(
        'relative min-w-40 touch-none',
        'bg-sky-100 dark:bg-sky-900',
        'hover:bg-sky-200 dark:hover:bg-sky-800',
        'text-sky-600 dark:text-sky-300',
        'border border-sky-300 dark:border-sky-700',
        'transition-all duration-300',
        className,
      )}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      {...props}
    >
      {particles.map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          initial={{ x: particles[index].x, y: particles[index].y }}
          animate={particlesControl}
          className={cn(
            'absolute h-1.5 w-1.5 rounded-full',
            'bg-sky-400 dark:bg-sky-300',
            'transition-opacity duration-300',
            isAttracting ? 'opacity-100' : 'opacity-40',
          )}
        />
      ))}
      <span className="relative flex w-full items-center justify-center gap-2">
        <Magnet
          className={cn(
            'h-4 w-4 transition-transform duration-300',
            isAttracting && 'scale-110',
          )}
        />
        {children ?? (isAttracting ? 'Attracting' : 'Hover me')}
      </span>
    </Button>
  )
}
