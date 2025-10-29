import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next'

/**
 * Props for `MasteredSection`.
 */
export type MasteredSectionProps = SliceComponentProps<Content.MasteredSectionSlice>

/**
 * Component for "MasteredSection" Slices.
 */
const MasteredSection: FC<MasteredSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-design-card-bg py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            {/* Title as h2 with serif styling */}
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="mb-6 font-serif text-4xl font-light leading-tight tracking-tight text-design-primary lg:text-5xl">
                    {children}
                  </h2>
                ),
              }}
            />

            {/* Description paragraphs */}
            <div className="space-y-4 text-gray-700">
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="font-proxima text-lg leading-relaxed">{children}</p>
                  ),
                }}
              />
            </div>

            {/* CTA Button */}
            {slice.primary.button && (
              <PrismicNextLink
                field={slice.primary.button}
                className="mt-8 inline-block w-fit rounded-full border-2 border-design-primary bg-white px-6 py-3 font-proxima text-design-primary transition-colors hover:bg-design-primary hover:text-white"
              >
                {slice.primary.button?.text || 'Try our dashboard'}
              </PrismicNextLink>
            )}
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <PrismicNextImage
              field={slice.primary.for_illustrative_purposes_only}
              className="h-auto w-full rounded-lg"
            />
            <p className="mt-4 text-center font-proxima text-sm text-gray-600">
              <em>For Illustrative Purposes Only</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MasteredSection
