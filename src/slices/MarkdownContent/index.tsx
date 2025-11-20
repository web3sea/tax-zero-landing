import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { format, parseISO } from 'date-fns'

/**
 * Props for `MarkdownContent`.
 */
export type MarkdownContentProps = SliceComponentProps<Content.MarkdownContentSlice>

/**
 * Component for "MarkdownContent" Slices.
 */
const MarkdownContent: FC<MarkdownContentProps> = ({ slice }) => {
  const formattedDate = slice.primary.last_updated_at
    ? format(parseISO(slice.primary.last_updated_at), 'MMMM dd, yyyy')
    : null
  
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="container mx-auto max-w-4xl px-4 py-8 min-h-screen"
    >
      {slice.primary.title && (
        <h1 className="mb-4 text-4xl font-bold text-foreground font-serif">
          {slice.primary.title}
        </h1>
      )}

      {formattedDate && (
        <p className="mb-8 text-sm text-muted-foreground font-sans">
          Last Updated: {formattedDate}
        </p>
      )}

      <div className="prose prose-lg prose-sans max-w-none dark:prose-invert prose-headings:font-serif prose-p:font-sans prose-li:font-sans">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </section>
  )
}

export default MarkdownContent
