'use client'

import { FC, useState } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { FadeInView } from '@/components/feature/FadeInView'
import WaitlistFormModal from '@/components/form/waitlist-form-modal'

/**
 * Props for `OurProcess`.
 */
export type OurProcessProps = SliceComponentProps<Content.OurProcessSlice>

/**
 * Component for "OurProcess" Slices.
 */
const OurProcess: FC<OurProcessProps> = ({ slice }) => {
  const processSteps = slice.primary.process_step || []
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-background py-20"
    >
      {/* Header Section */}
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInView delay={0.2} duration={0.8} y={30}>
            <div className="mb-12">
              {/* Title */}
              {slice.primary.title && (
                <h1 className="mb-6 font-serif text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {slice.primary.title.split('**').map((part, index) =>
                    index % 2 === 1 ? (
                      <strong key={index} className="text-primary">
                        {part}
                      </strong>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
                </h1>
              )}

              {/* Description */}
              {slice.primary.description && (
                <p className="font-sans text-lg leading-relaxed text-muted-foreground sm:text-xl font-light">
                  {slice.primary.description}
                </p>
              )}
            </div>
          </FadeInView>
        </div>
      </div>

      {/* Process Steps Section */}
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl">
          {processSteps.map((step, index) => {
            const isLast = index === processSteps.length - 1
            return (
              <FadeInView
                key={index}
                delay={0.3 + index * 0.1}
                duration={0.8}
                y={30}
              >
                <div className="group relative mb-12 flex gap-8">
                  {/* Icon Column with Connector Line */}
                  <div className="relative flex flex-col items-center flex-none">
                    {/* Icon Box */}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-md">
                      {step.icon?.url ? (
                        <PrismicNextImage
                          field={step.icon}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <div className="h-6 w-6 rounded bg-primary/20" />
                      )}
                    </div>

                    {/* Connector Line */}
                    {!isLast && (
                      <div className="absolute top-12 bottom-[-48px] w-px bg-border" />
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 pt-2 pb-4">
                    {step.title && (
                      <h3 className="mb-3 font-sans text-xl font-semibold tracking-tight text-foreground">
                        {step.title}
                      </h3>
                    )}
                    {step.description && (
                      <p className="font-sans text-base leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </FadeInView>
            )
          })}
        </div>
      </div>

      {/* Result Section */}
      {(slice.primary.result_title ||
        slice.primary.result_description ||
        slice.primary.apply_to_membership) && (
        <div className="border-t border-border bg-secondary py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left: Text Content */}
              <FadeInView delay={0.2} duration={0.8} y={30}>
                <div>
                  {slice.primary.result_title && (
                    <h2 className="mb-6 font-serif text-3xl font-light leading-tight tracking-tight text-foreground lg:text-4xl">
                      {slice.primary.result_title}
                    </h2>
                  )}
                  {slice.primary.result_description && (
                    <p className="mb-8 font-sans text-lg leading-relaxed text-muted-foreground">
                      {slice.primary.result_description}
                    </p>
                  )}
                  {slice.primary.apply_to_membership && (
                    <button
                      onClick={() => setIsWaitlistOpen(true)}
                      className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 font-sans font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90"
                    >
                      {slice.primary.apply_to_membership?.text ||
                        'Apply for Membership'}
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </FadeInView>

              {/* Right: Outcome Card */}
              <FadeInView delay={0.4} duration={0.8} y={30}>
                <div className="relative rounded-xl border border-border bg-white p-8 shadow-xl">
                  {/* Card Header */}
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-foreground">
                        Club Member Outcome
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground">
                        Optimized financial efficiency
                      </p>
                    </div>
                  </div>

                  {/* Outcome Items */}
                  <div className="space-y-6">
                    {/* Tax Liability */}
                    <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary p-4">
                      <svg
                        className="h-6 w-6 shrink-0 text-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <div>
                        <span className="block font-sans text-sm font-medium text-foreground">
                          Tax Liability
                        </span>
                        <span className="block font-sans text-xs text-muted-foreground">
                          Minimized to legal lowest
                        </span>
                      </div>
                    </div>

                    {/* Goal Funding */}
                    <div className="flex items-center gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <svg
                        className="h-6 w-6 shrink-0 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="block font-sans text-sm font-medium text-foreground">
                          Goal Funding
                        </span>
                        <span className="block font-sans text-xs text-primary">
                          Directly funded by savings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </div>
      )}
      <WaitlistFormModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  )
}

export default OurProcess
