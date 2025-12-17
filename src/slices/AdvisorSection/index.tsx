import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { StackScrollCard } from '@/components/feature/StackScrollCard'

/**
 * Props for `AdvisorSection`.
 */
export type AdvisorSectionProps = SliceComponentProps<Content.AdvisorSectionSlice>

/**
 * Component for "AdvisorSection" Slices.
 */
const AdvisorSection: FC<AdvisorSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative py-12 text-primary-foreground md:py-20"
    >
      <div className="container mx-auto px-6">
        <StackScrollCard
          index={0}
          totalCards={1}
          className="rounded-2xl bg-brand-navy px-6 py-12 shadow-xl md:rounded-3xl md:py-20 lg:px-12"
        >
          <div className="text-center lg:text-left">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading3: ({ children }) => (
                  <h3 className="mb-4 font-serif text-3xl font-light leading-tight tracking-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
                    {children}
                  </h3>
                ),
              }}
            />

            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="mb-6 font-sans text-lg leading-relaxed text-primary-foreground/90 md:mb-8 md:text-xl">
                    {children}
                  </p>
                ),
              }}
            />

            {/* Badges */}
            {Array.isArray(slice.primary.badges) && slice.primary.badges.length > 0 && (
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-4 lg:justify-start">
                {slice.primary.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-primary-foreground/10 px-3 py-2 text-center font-sans text-xs font-medium backdrop-blur-sm md:px-4 md:text-sm"
                  >
                    {badge.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </StackScrollCard>
      </div>
    </section>
  )
}

export default AdvisorSection
