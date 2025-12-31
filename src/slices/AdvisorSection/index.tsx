import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { StackScrollCard } from '@/components/feature/StackScrollCard'

/**
 * Props for `AdvisorSection`.
 */
export type AdvisorSectionProps = SliceComponentProps<Content.AdvisorSectionSlice>

/**
 * Component for "AdvisorSection" Slices.
 */
const AdvisorSection: FC<AdvisorSectionProps> = ({ slice }) => {
  const title = slice.primary.title
  const description = slice.primary.description
  const badges = slice.primary.badges

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
          className="rounded-2xl bg-brand-navy px-6 py-12 shadow-xl md:rounded-3xl md:px-10 md:py-12 lg:px-12"
        >
          <div className="flex min-h-[200px] items-center md:min-h-[300px] lg:min-h-[350px]">
            <div className="w-full text-left">
              {title && (
                <h1 className="mb-4 font-serif text-4xl font-light leading-tight tracking-tight lg:text-5xl">
                  {title}
                </h1>
              )}
              {description && (
                <p className="font-sans text-lg leading-relaxed text-brand-blue-light sm:text-xl md:text-2xl lg:text-3xl">
                  {description}
                </p>
              )}


              {/* Badges */}
              {Array.isArray(badges) && badges.length > 0 && (
                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row md:gap-4">
                  {badges.map((badge, index) => (
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
          </div>
        </StackScrollCard>
      </div>
    </section>
  )
}

export default AdvisorSection
