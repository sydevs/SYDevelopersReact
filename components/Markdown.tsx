import { marked } from 'marked'

interface MarkdownProps {
  content: string
  className?: string
}

export function Markdown({ content, className = '' }: MarkdownProps) {
  const html = marked(content, {
    breaks: true,
    gfm: true,
  })

  return (
    <div
      className={`prose prose-sm max-w-none prose-headings:font-semibold prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline ${className}`}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  )
}
