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
      className="bg-brand-navy py-20 text-primary-foreground"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="mb-6 font-serif text-5xl font-light leading-tight tracking-tight lg:text-6xl">
                  {children}
                </h2>
              ),
            }}
          />
          <p className="font-sans text-xl leading-relaxed text-primary-foreground/90">
            {slice.primary.descriptiomn ||
              'Three simple steps to transform your financial future with expert guidance that evolves with your life.'}
          </p>
        </div>

        {/* Three Steps - Cards with built-in arrows */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 lg:flex-row">
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
          <p className="mb-10 font-sans text-sm italic text-primary-foreground">
            For Illustrative Purposes Only
          </p>
          {slice.primary.button && (
            <PrismicLink
              field={slice.primary.button}
              className="inline-block rounded-full bg-background font-sans font-normal text-foreground shadow-none transition-all duration-200 hover:bg-secondary hover:text-foreground focus:outline-none"
              style={{
                padding: '.8rem 2rem',
                boxShadow: 'none',
                borderColor: 'hsl(var(--foreground))',
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
