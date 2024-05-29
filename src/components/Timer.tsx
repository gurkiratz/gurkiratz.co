'use client'

import { useState, useEffect } from 'react'

function Timer() {
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

  return <span>{timeDifference}</span>
}

export default Timer
