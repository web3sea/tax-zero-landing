import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

/**
 * Props for `FaqSection`.
 */
export type FaqSectionProps = SliceComponentProps<Content.FaqSectionSlice>

/**
 * Component for "FaqSection" Slices.
 */
const FaqSection: FC<FaqSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary"
    >
      <div className="flex w-full items-center justify-center bg-background py-16">
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-center font-serif text-5xl font-light leading-tight tracking-tight text-foreground lg:text-8xl">
                {children}
              </h2>
            ),
          }}
        />
      </div>
      <div className="container mx-auto px-6 py-16">
        <Accordion type="single" collapsible className="w-full">
          {slice.primary.question_and_answers?.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="px-0 py-6 text-left text-xl font-medium text-foreground hover:no-underline">
                <span className="flex-1 pr-4 text-left font-sans text-lg font-semibold md:text-xl">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0 font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
                {faq.answers}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FaqSection
