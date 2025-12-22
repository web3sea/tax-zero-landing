'use client'

import { FC, useState } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import PrismicLink from '@/components/common/prismic-link'
import Image from 'next/image'
import WaitlistFormModal from '@/components/form/waitlist-form-modal'
import { FadeInView } from '@/components/feature/FadeInView'
import { AnimatedCard } from '@/components/feature/AnimatedCard'

/**
 * Props for `MembershipSection`.
 */
export type MembershipSectionProps = SliceComponentProps<Content.MembershipSectionSlice>
/**
 * Component for "MembershipSection" Slices.
 */
const MembershipSection: FC<MembershipSectionProps> = ({ slice }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-20"
    >
      <div className="container mx-auto px-6">
        {/* Heading + Description */}
        <FadeInView className="mb-16 text-center">
          {typeof slice.primary.title === 'string' ? (
            <h1 className="mb-6 font-serif text-5xl font-light leading-tight tracking-tight text-foreground lg:text-6xl">
              {slice.primary.title}
            </h1>
          ) : null}
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="font-sans text-xl text-foreground">{children}</p>
              ),
            }}
          />
        </FadeInView>

        {/* Benefits grid */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {slice.primary.cards?.map((item, index) => (
            <AnimatedCard key={index} index={index} className="rounded-xl bg-card p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                {item.image?.url ? (
                  <PrismicNextImage
                    field={item.image}
                    width={46}
                    height={46}
                    className="h-11 w-11"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-muted" />
                )}
              </div>
              <PrismicRichText
                field={item.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="mb-4 font-sans text-2xl font-bold text-foreground">
                      {children}
                    </h3>
                  ),
                  paragraph: ({ children }) => (
                    <h3 className="mb-4 font-sans text-2xl font-bold text-foreground">
                      {children}
                    </h3>
                  ),
                }}
              />
              <PrismicRichText
                field={item.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="font-sans text-muted-foreground">{children}</p>
                  ),
                }}
              />
            </AnimatedCard>
          ))}
        </div>

        {/* CTA */}
        <FadeInView delay={0.3}>
          <div className="text-center">
            <button
              className="mx-auto inline-flex items-center rounded-full bg-primary px-2 py-2 font-sans text-lg text-primary-foreground shadow-md transition-colors duration-200 hover:bg-accent"
              onClick={() => setIsWaitlistOpen(true)}
            >
              <span className="ml-4 mr-4 font-sans text-xl">{slice.primary.button.text}</span>
              <Image
                src="/svg/icons/arrow-right.svg"
                alt="Arrow"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </button>
          </div>

          {/* Citation */}
          {slice.primary.citation_text && (
            <div className="mt-8 text-center">
              <PrismicRichText
                field={slice.primary.citation_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="font-sans text-xs text-foreground">{children}</p>
                  ),
                }}
              />
            </div>
          )}
        </FadeInView>
      </div>
      <WaitlistFormModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  )
}

export default MembershipSection
