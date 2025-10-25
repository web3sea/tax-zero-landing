import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

function FaqSection() {
  const faqs = [
    {
      question: "How is Domain Money different from a traditional financial advisor?",
      answer: "Traditional advisors often focus narrowly on investment management and charge a percentage of your portfolio (AUM). Domain Money takes a broader, coach-style approach. We build a personalized plan that covers your entire financial life—cash flow, taxes, equity compensation, real estate, retirement, and insurance. You'll work with the same dedicated CFP® professional for ongoing guidance, with no product sales or commission incentives."
    },
    {
      question: "How does your flat-fee membership work?",
      answer: "Instead of paying a percentage of your assets (which grows as your wealth grows), you pay one predictable annual membership fee. That fee covers your complete financial plan, regular updates, and unlimited access to your CFP® professional"
    },
    {
      question: "What qualifications do your advisors have?",
      answer: "Every Domain Money advisor is a CERTIFIED FINANCIAL PLANNER® professional. This means they've completed rigorous education, experience, and ethics requirements, and are trained to look at your full financial picture. Our advisors act as fiduciaries, which means they're legally and ethically obligated to put your best interests first. You'll have expert guidance from someone who knows you personally—not a rotating advisor or call center."
    },
    {
      question: "Is Domain Money a fiduciary?",
      answer: "Yes. All Domain Money CFP® professionals are fiduciaries. That means we're required to put your best interests ahead of our own at all times. Unlike advisors who earn commissions on products, we don't sell financial products or take referral fees. Our only focus is giving you objective, conflict-free advice to help you make smarter money decisions with confidence."
    },
    {
      question: "Can I do this with my spouse or family member?",
      answer: "Absolutely. Most clients work with us as a household, so both spouses (or family members) are included in the planning process. We'll align your shared goals—like buying a home, funding college, or retiring early—while also addressing individual priorities. You'll leave with one clear, step-by-step plan that helps your entire family move forward together."
    },
    {
      question: "How much does financial planning usually cost?",
      answer: "Traditional advisors often charge around 1% of assets under management (AUM) each year. For example, a $1M portfolio could mean $10,000 annually in fees, on top of potential charges for trades, mutual funds, or wrap fees. Some also require investment minimums. At Domain Money, our model is different—you pay one transparent annual membership fee, no matter your portfolio size. That covers your entire financial plan, including tax strategies, real estate guidance, and retirement planning."
    }
  ];

  return (
    <section className="bg-design-card-bg">
      <div className="flex justify-center items-center w-full bg-white py-16">
        <h2 className="font-serif text-5xl lg:text-8xl font-light leading-tight text-design-primary text-center tracking-tight">
          FAQs
        </h2>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left text-xl font-medium text-gray-900 hover:no-underline py-6 px-0">
                <span className="flex-1 text-left text-2xl font-normal font-proxima">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0 text-xl font-light font-proxima">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default memo(FaqSection, isEqual)
