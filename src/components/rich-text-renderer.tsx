/*
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { RichTextContent } from '@/lib/contentful'
import Link from 'next/link'
import clsx from 'clsx'

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => <p className="mb-4">{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => <h2 className="text-3xl font-semibold mb-3">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => <h3 className="text-2xl font-medium mb-2">{children}</h3>,
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => <li>{children}</li>,
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
        const { uri } = node.data
        return (
            <Link
        href={uri}
        rel={uri.startsWith('http') ? 'noopener noreferrer' : ''}
        target={uri.startsWith('http') ? '_blank' : '_self'}
        className='transition font-bold hover:text-teal-500 dark:hover:text-teal-400'>
            {children}
          </Link>
        )
      },
  },
}

export default function RichTextRenderer({ content }: RichTextContent) {
  return <>{documentToReactComponents(content, options)}</>
}
**/
