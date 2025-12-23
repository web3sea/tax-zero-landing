import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { FadeInView } from '@/components/feature/FadeInView'
import PrismicLink from '@/components/common/prismic-link'

/**
 * Props for `Bio`.
 */
export type BioProps = SliceComponentProps<Content.BioSlice>

/**
 * Component for "Bio" Slices.
 */
const Bio: FC<BioProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-background py-16 md:py-20"
    >
      <div className="container mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Content */}
          <FadeInView delay={0.2} duration={0.6} y={30}>
            <div className="space-y-6">
              {/* Title */}
              {slice.primary.title && (
                <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                  {slice.primary.title}
                </h2>
              )}

              {/* Content */}
              <div className="space-y-4">
                <PrismicRichText
                  field={slice.primary.content}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                        {children}
                      </p>
                    ),
                  }}
                />
              </div>

              {/* LinkedIn Button */}
              {slice.primary.button && (
                <div className="pt-2">
                  <PrismicLink
                    field={slice.primary.button}
                    className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-foreground bg-background px-6 py-3 font-sans text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {slice.primary.button?.text || 'Connect Liz'}
                  </PrismicLink>
                </div>
              )}
            </div>
          </FadeInView>

          {/* Right: Image */}
          <FadeInView delay={0.4} duration={0.6} y={30}>
            <div className="mx-auto max-w-md lg:max-w-none">
              {slice.primary.image && (
                <div className="overflow-hidden rounded-xl border border-border bg-muted">
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              )}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}

export default Bio
