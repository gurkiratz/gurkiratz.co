'use client'
import { Highlight, themes } from 'prism-react-renderer'
import React from 'react'
import { CopyButton } from './CopyButton'
import { GitHubIcon } from '../../components/SocialIcons'
import { ThemeProvider, useTheme } from 'next-themes'

type Props = {
  code: string
  language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
  if (!code) return null
  let { resolvedTheme } = useTheme()

  return (
    <Highlight
      code={code}
      language={language}
      theme={
        resolvedTheme === 'dark' ? themes.oceanicNext : themes.nightOwlLight
      }
    >
      {({ getLineProps, getTokenProps, tokens }) => (
        <div className="relative">
          <pre className="p-4 overflow-x-auto text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg dark:border-zinc-700 dark:bg-zinc-950 dark:text-gray-200">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ className: 'table-row', line })}>
                {/* <span className="table-cell pr-4 text-right text-gray-400 select-none dark:text-gray-500">
                  {i + 1}
                </span> */}
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
          <div className="absolute hidden right-2 top-2 sm:block">
            <CopyButton code={code} />
          </div>
        </div>
      )}
    </Highlight>
  )
}
