import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import PrismicLink from '@/components/common/prismic-link'
import ProcessCard from '@/components/landing/process/process-card'

/**
 * Props for `ProcessSection`.
 */
export type ProcessSectionProps = SliceComponentProps<Content.ProcessSectionSlice>

/**
 * Component for "ProcessSection" Slices.
 */
const ProcessSection: FC<ProcessSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20 bg-design-primary text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="font-serif text-5xl lg:text-6xl font-light leading-tight mb-6 tracking-tight">
                  {children}
                </h2>
              ),
            }}
          />
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-proxima">
            {slice.primary.descriptiomn || 'Three simple steps to transform your financial future with expert guidance that evolves with your life.'}
          </p>
        </div>

        {/* Three Steps - Cards with built-in arrows */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-12">
          {slice.primary.cards?.map((step, index) => (
            <div key={index} className="w-full">
              <ProcessCard
                image={step.step_image?.url || ''}
                imageAlt={step.step_image?.alt || `Step ${index + 1}`}
                isLast={index === (slice.primary.cards?.length || 0) - 1}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white text-sm font-proxima italic mb-10">
            For Illustrative Purposes Only
          </p>
          {slice.primary.button && (
            <PrismicLink
              field={slice.primary.button}
              className="font-proxima inline-block bg-white text-design-primary rounded-full font-normal shadow-none transition-all duration-200 hover:bg-design-card-bg hover:text-design-primary focus:outline-none"
              style={{
                padding: '.8rem 2rem',
                boxShadow: 'none',
                borderColor: 'hsl(var(--design-primary))',
              }}
              fallbackText="See how we work with you"
            >
              {'See how we work with you'}
            </PrismicLink>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
