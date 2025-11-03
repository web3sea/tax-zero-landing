'use client'

import { FC, useState } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Image from 'next/image'
import WaitlistFormModal from '@/components/form/waitlist-form-modal'

/**
 * Props for `MembershipSection`.
 */
export type MembershipSectionProps = SliceComponentProps<Content.MembershipSectionSlice> & {
  context: {
    is_waitlist_mode: boolean
  }
}
/**
 * Component for "MembershipSection" Slices.
 */
const MembershipSection: FC<MembershipSectionProps> = ({ slice, context }) => {
  const isWaitlistMode = context?.is_waitlist_mode ?? true
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Description */}
        <div className="mb-16 text-center">
          {typeof slice.primary.title === 'string' ? (
            <h1 className="mb-6 font-serif text-5xl font-light leading-tight tracking-tight text-design-primary lg:text-6xl">
              {slice.primary.title}
            </h1>
          ) : null}
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="mx-auto max-w-6xl font-proxima text-xl text-design-primary">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        {/* Benefits grid */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {slice.primary.cards?.map((item, index) => (
            <div key={index} className="rounded-xl bg-design-card-bg p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                {item.image?.url ? (
                  <PrismicNextImage
                    field={item.image}
                    width={46}
                    height={46}
                    className="h-11 w-11"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-gray-200" />
                )}
              </div>
              <PrismicRichText
                field={item.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="mb-4 font-proxima text-2xl font-bold text-design-primary">
                      {children}
                    </h3>
                  ),
                  paragraph: ({ children }) => (
                    <h3 className="mb-4 font-proxima text-2xl font-bold text-design-primary">
                      {children}
                    </h3>
                  ),
                }}
              />
              <PrismicRichText
                field={item.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="font-proxima text-gray-600">{children}</p>
                  ),
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        {!isWaitlistMode && (
          <div className="text-center">
            <PrismicNextLink
              field={slice.primary.button}
              className="mx-auto inline-flex items-center rounded-full bg-design-accent px-2 py-2 font-proxima text-lg text-white shadow-md transition-colors duration-200 hover:bg-design-accent-light"
            >
              <span className="ml-4 mr-4 font-proxima text-xl">{slice.primary.button.text}</span>
              <Image
                src="/svg/icons/arrow-right.svg"
                alt="Arrow"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </PrismicNextLink>
          </div>
        )}

        {isWaitlistMode ? (
          <div className="text-center">
            <button
              className="mx-auto inline-flex items-center rounded-full bg-design-accent px-2 py-2 font-proxima text-lg text-white shadow-md transition-colors duration-200 hover:bg-design-accent-light"
              onClick={() => setIsWaitlistOpen(true)}
            >
              <span className="ml-4 mr-4 font-proxima text-xl">{slice.primary.button.text}</span>
              <Image
                src="/svg/icons/arrow-right.svg"
                alt="Arrow"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </button>
          </div>
        ) : null}

        {/* Citation */}
        {slice.primary.citation_text && (
          <div className="mt-8 text-center">
            <PrismicRichText
              field={slice.primary.citation_text}
              components={{
                paragraph: ({ children }) => (
                  <p className="font-proxima text-xs text-black">{children}</p>
                ),
              }}
            />
          </div>
        )}
      </div>
      <WaitlistFormModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  )
}

export default MembershipSection
