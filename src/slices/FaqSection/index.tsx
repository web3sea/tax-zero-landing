import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

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
      className="bg-design-card-bg"
    >
      <div className="flex justify-center items-center w-full bg-white py-16">
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-serif text-5xl lg:text-8xl font-light leading-tight text-design-primary text-center tracking-tight">
                {children}
              </h2>
            ),
          }}
        />
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Accordion type="single" collapsible className="w-full">
          {slice.primary.question_and_answers?.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-xl font-medium text-gray-900 hover:no-underline py-6 px-0">
                <span className="flex-1 text-left text-2xl font-normal font-proxima">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0 text-xl font-light font-proxima">
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
