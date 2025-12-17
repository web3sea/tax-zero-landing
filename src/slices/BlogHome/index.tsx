import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `BlogHome`.
 */
export type BlogHomeProps = SliceComponentProps<Content.BlogHomeSlice>

/**
 * Component for "BlogHome" Slices.
 */
const BlogHome: FC<BlogHomeProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-muted py-12 md:py-16"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          {/* Title */}
          {slice.primary.title && (
            <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              {slice.primary.title}
            </h1>
          )}

          {/* Description */}
          {slice.primary.description && (
            <p className="font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              {slice.primary.description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogHome
