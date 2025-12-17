import Link from 'next/link'
import { Content, asText } from '@prismicio/client'
import { format, parseISO } from 'date-fns'

export interface BlogCardContent {
  title: string
  lastUpdated: string
  category: string
  excerpt: string
}

interface BlogCardProps {
  blog: Content.BlogPageNewDocument
}

export default function BlogCard({ blog }: BlogCardProps) {
  const title = blog.data.slices[0]?.primary?.title || 'Untitled'
  const lastUpdated = blog.data.slices[0]?.primary?.last_updated_at
  const formattedDate = lastUpdated
    ? format(parseISO(lastUpdated), 'MMM d, yyyy').toUpperCase()
    : null
  const category = blog.tags?.[0]?.toUpperCase() || null
  const excerpt = asText(blog.data.slices[0]?.primary?.content)?.slice(0, 100) + '...' || ''

  return (
    <article className="group py-8">
      {/* Date & Category */}
      <div className="mb-4 flex items-center gap-3 text-sm font-medium uppercase text-muted-foreground">
        {formattedDate && <time>{formattedDate}</time>}
        {formattedDate && category && <span>|</span>}
        {category && <span>{category}</span>}
      </div>

      {/* Title */}
      <Link href={`/blog/${blog.uid}`} className="block">
        <h2 className="mb-4 font-serif text-3xl font-bold leading-tight text-foreground transition-colors group-hover:text-primary md:text-4xl">
          {title}
        </h2>
      </Link>

      {/* Excerpt */}
      {excerpt && (
        <p className="mb-6 line-clamp-3 font-sans text-lg leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      )}

      {/* Read More */}
      <Link
        href={`/blog/${blog.uid}`}
        className="inline-flex items-center gap-2 font-sans text-base font-medium text-foreground transition-colors hover:text-primary"
      >
        <span>Read more</span>
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </article>
  )
}
