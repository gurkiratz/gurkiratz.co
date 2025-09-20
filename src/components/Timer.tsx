'use client'

import { useState, useEffect } from 'react'

type TimerProps = {
  className?: string
  // Reserve space to avoid layout shift; measured in monospace character widths
  minWidthCh?: number
}

function Timer({ className, minWidthCh = 12 }: TimerProps) {
  const [timeDifference, setTimeDifference] = useState(0)

  useEffect(() => {
    const targetDate = new Date('July 27, 2022')

    const timer = setInterval(() => {
      const now = new Date()
      const difference = now.getTime() - targetDate.getTime()
      setTimeDifference(difference)
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <span
      className={['inline-block text-center font-mono tabular-nums', className]
        .filter(Boolean)
        .join(' ')}
      style={{ minWidth: `${minWidthCh}ch` }}
    >
      {timeDifference}
    </span>
  )
}

export default Timer
