'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="p-2 text-gray-500 transition-colors rounded-md hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
      aria-label={isCopied ? 'Copied!' : 'Copy code'}
    >
      {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
    </button>
  )
}
