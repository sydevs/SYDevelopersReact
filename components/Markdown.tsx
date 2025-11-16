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
      className={`prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground/90 prose-li:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground ${className}`}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  )
}
