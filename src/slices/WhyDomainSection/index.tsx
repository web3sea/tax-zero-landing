import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

/**
 * Props for `WhyDomainSection`.
 */
export type WhyDomainSectionProps = SliceComponentProps<Content.WhyDomainSectionSlice>

/**
 * Component for "WhyDomainSection" Slices.
 */
const WhyDomainSection: FC<WhyDomainSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-background py-20"
    >
      <div className="container mx-auto px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {slice.primary.cards?.map((feature, index) => (
            <div key={index} className="rounded-2xl bg-card p-8">
              <div className="mb-6">
                {feature.icon?.url ? (
                  <PrismicNextImage field={feature.icon} width={41} height={41} />
                ) : (
                  <div className="h-10 w-10 rounded bg-muted"></div>
                )}
              </div>
              <PrismicRichText
                field={feature.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="mb-4 font-serif text-2xl text-foreground">{children}</h3>
                  ),
                }}
              />
              <PrismicRichText
                field={feature.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyDomainSection
