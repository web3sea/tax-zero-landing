import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextLink } from '@prismicio/next'

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
      className="py-12 text-white md:py-20"
    >
      <div className="mx-auto max-w-[1440px] rounded-2xl bg-design-primary px-4 py-12 shadow-lg sm:px-6 md:rounded-3xl md:py-20 lg:px-12">
        <div className="text-center lg:text-left">
          <div className="mx-auto max-w-4xl lg:mx-0">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="mb-4 font-serif text-3xl font-light leading-tight tracking-tight sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
                    {children}
                  </h2>
                ),
              }}
            />

            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="mx-auto mb-6 max-w-3xl font-proxima text-lg leading-relaxed text-design-card-bg md:mb-8 md:text-xl lg:mx-0">
                    {children}
                  </p>
                ),
              }}
            />

            <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start md:mb-8">
              {slice.primary.button && (
                <PrismicNextLink
                  field={slice.primary.button}
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-2 font-proxima text-base text-design-primary transition-colors hover:bg-gray-100 md:px-8 md:py-3 md:text-lg sm:w-auto"
                >
                  <span className="mr-4 md:mr-6">{'Get to know our advisors'}</span>
                  <svg
                    width="32"
                    height="32"
                    className="md:h-9 md:w-9"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse cx="18.0058" cy="17.9619" rx="17.8389" ry="17.7764" fill="#e25f17"></ellipse>
                    <path d="M18.4882 23.7305L24.2772 17.9617L18.4882 12.1929" stroke="#112422" strokeWidth="1.61" strokeMiterlimit="10" strokeLinecap="square"></path>
                    <path d="M23.4728 17.9609L11.7339 17.9609" stroke="#112422" strokeWidth="1.61" strokeMiterlimit="10" strokeLinecap="square"></path>
                  </svg>
                </PrismicNextLink>
              )}
            </div>

            {/* Badges */}
            {Array.isArray(slice.primary.badges) && slice.primary.badges.length > 0 && (
              <div className="flex flex-col items-center justify-center gap-3 md:gap-4 sm:flex-row lg:justify-start">
                {slice.primary.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="rounded-full bg-white/10 px-3 py-2 text-center font-proxima text-xs font-medium backdrop-blur-sm md:px-4 md:text-sm"
                  >
                    {badge.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdvisorSection
