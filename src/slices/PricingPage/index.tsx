'use client'

import { FC, useState } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { Button } from '@/components/ui/button'
import { FadeInView } from '@/components/feature/FadeInView'
import WaitlistFormModal from '@/components/form/waitlist-form-modal'
import Image from 'next/image'
import { Check, X } from 'lucide-react'

/**
 * Props for `PricingPage`.
 */
export type PricingPageProps = SliceComponentProps<Content.PricingPageSlice>

/**
 * Component for "PricingPage" Slices.
 */
const PricingPage: FC<PricingPageProps> = ({ slice }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  // Static plans data
  const plans = [
    {
      name: 'Minimum',
      tagline: 'YOUR TAX DASHBOARD SETUP + TAX STRATEGIES IDENTIFIED',
      icon: '/icons/shield-check.svg',
      price: '$399.00',
      period: '/qtr',
      description: 'Foundational tax management for individuals starting their optimization journey.',
      features: [
        'Your Tax Dashboard setup',
        'Goals Questionnaire',
        'TaxZero Defined',
        'Tax Strategies Identified',
        'Equity Comp Tracker',
        'Club member virtual meetups',
        'Start 30-day free trial until Jan 15th',
      ],
      cta: 'Start 30-Day Free Trial',
      featured: false,
    },
    {
      name: 'Concierge',
      tagline: 'EVERYTHING IN MINIMUM + STRATEGY REVIEW WITH CFP/CPA',
      icon: '/icons/zap.svg',
      price: '$799.00',
      period: '/qtr',
      description: 'Our most popular plan for active high earners needing professional oversight.',
      features: [
        'Everything in Minimum',
        'Strategy Review with CFP/CPA',
        'Quarterly Checkins',
        'Payslip Review',
        'Lifestyle Goal Tracker',
        'Annual Individual Tax Return',
        'Start 30-day free trial until Jan 15th',
      ],
      cta: 'Start 30-Day Free Trial',
      featured: true,
    },
    {
      name: 'Diamond',
      tagline: 'EVERYTHING IN CONCIERGE + EXECUTION SUPPORT',
      icon: '/icons/crown.svg',
      price: '$1,999.00',
      period: '/qtr',
      description: 'Full-service white-glove execution for complex tax profiles and business owners.',
      features: [
        'Everything in Concierge',
        'Execution Support',
        'Partner Network Access',
        'Priority Support Line',
        'Direct Strategy Implementation',
        'Advanced Estate Planning',
        'Start 30-day free trial until Jan 15th',
      ],
      cta: 'Start 30-Day Free Trial',
      featured: false,
    },
  ]

  // Static value props
  const valueProps = [
    {
      title: 'Secure & Private',
      desc: 'Bank-level encryption protects your sensitive tax data',
      icon: '/icons/shield.svg',
    },
    {
      title: 'Easy to Use',
      desc: 'Intuitive interface designed for everyone, no tax expert needed',
      icon: '/icons/smile.svg',
    },
    {
      title: '24/7 Support',
      desc: 'Get help whenever you need it from our dedicated support team',
      icon: '/icons/headphones.svg',
    },
  ]

  // Static comparison data
  const comparison = [
    { feature: 'Dashboard setup', min: true, con: true, dia: true },
    { feature: 'Questionnaire access', min: true, con: true, dia: true },
    { feature: 'Tax drivers visible', min: true, con: true, dia: true },
    { feature: 'Tax plan recommendations', min: true, con: true, dia: true },
    { feature: 'Pay stub upload', min: false, con: true, dia: true },
    { feature: 'Strategy identification', min: true, con: true, dia: true },
    { feature: 'Strategy review', min: false, con: true, dia: true },
    { feature: 'Quarterly check-ins', min: false, con: true, dia: true },
    { feature: 'Full execution support', min: false, con: false, dia: true },
    { feature: 'Partner network access', min: false, con: false, dia: true },
  ]

  // Static FAQs
  const faqs = [
    {
      q: 'Can I switch plans later?',
      a: "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences.",
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure payment processor, Stripe.',
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We use bank-level 256-bit encryption to protect all your data. Your information is stored securely and never shared with third parties without your permission.',
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: 'Yes, you can cancel your subscription at any time from your dashboard. You will continue to have access until the end of your current billing period.',
    },
    {
      q: 'Do you offer refunds?',
      a: "We offer a 30-day money-back guarantee. If you're not satisfied with our service within the first 30 days, contact us for a full refund. In addition, if we do not identify tax savings for you of at least 10x your membership each year, we will refund your full membership fee at the end of the year.",
    },
  ]

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-background"
    >
      {/* Header Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-12 text-center">
        <div className="container relative z-10 mx-auto max-w-3xl">
          <FadeInView delay={0.2} duration={0.8} y={30}>
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
            {slice.primary.description && (
              <p className="font-sans text-lg font-light leading-relaxed text-muted-foreground">
                {slice.primary.description}
              </p>
            )}
          </FadeInView>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* Pricing Grid */}
      <section className="mb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan, idx) => (
              <FadeInView key={idx} delay={0.3 + idx * 0.1} duration={0.8} y={30}>
                <div
                  className={`relative flex flex-col rounded-3xl bg-white p-8 transition-all duration-300 ${
                    plan.featured
                      ? 'z-10 scale-105 border-2 border-primary shadow-2xl'
                      : 'border border-border shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="mb-4">
                      <Image
                        src={plan.icon}
                        alt={plan.name}
                        width={24}
                        height={24}
                        className={`h-6 w-6 ${plan.featured ? 'text-primary' : 'text-muted-foreground'}`}
                      />
                    </div>
                    <h3 className="mb-1 font-sans text-2xl font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="mb-4 font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {plan.tagline}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-sans text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="font-sans text-sm font-light text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 h-px w-full bg-border" />

                  <div className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-foreground">
                    What's Included
                  </div>
                  <ul className="mb-10 flex-grow space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 font-sans text-sm text-muted-foreground">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.featured ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`h-14 w-full rounded-2xl font-semibold transition-all duration-300 ${
                      plan.featured
                        ? 'bg-foreground text-background shadow-lg shadow-foreground/20 hover:bg-foreground/90'
                        : 'border-2 border-border bg-background text-foreground hover:border-primary'
                    }`}
                    onClick={() => setIsWaitlistOpen(true)}
                  >
                    {plan.cta}
                    <Image
                      src="/icons/arrow-right.svg"
                      alt="Arrow"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  </Button>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="mb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeInView delay={0.6} duration={0.8} y={30}>
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Image
                  src="/icons/shield-check.svg"
                  alt="Shield"
                  width={128}
                  height={128}
                  className="h-32 w-32 text-primary"
                />
              </div>
              <div className="relative z-10">
                <h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-foreground">
                  Our Guarantee
                </h2>
                <p className="font-sans text-xl font-light leading-relaxed text-foreground">
                  You will get{' '}
                  <span className="font-semibold text-primary">10x your annual membership</span> in
                  tax savings or we will refund your membership fees.
                </p>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="border-y border-border bg-background py-24">
        <div className="container mx-auto px-6">
          <FadeInView delay={0.2} duration={0.8} y={30} className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              Why Choose Tax Zero?
            </h2>
            <p className="font-sans text-muted-foreground">
              Join thousands of users who trust Tax Zero for their tax management
            </p>
          </FadeInView>
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
            {valueProps.map((prop, i) => (
              <FadeInView key={i} delay={0.3 + i * 0.1} duration={0.8} y={30}>
                <div className="rounded-3xl p-8 text-center transition-colors hover:bg-secondary">
                  <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-white shadow-sm">
                    <Image
                      src={prop.icon}
                      alt={prop.title}
                      width={24}
                      height={24}
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <h3 className="mb-3 font-sans text-lg font-semibold text-foreground">
                    {prop.title}
                  </h3>
                  <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
                    {prop.desc}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Trial CTA */}
      <section className="py-24 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <FadeInView delay={0.4} duration={0.8} y={30}>
            <div className="relative overflow-hidden rounded-[40px] bg-foreground p-12 text-background shadow-2xl shadow-foreground/20 md:p-20">
              <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
              <div className="relative z-10">
                <span className="mb-6 inline-block font-sans text-sm font-semibold uppercase tracking-widest text-primary">
                  ✨ Start Your Free Trial Today
                </span>
                <h2 className="mb-6 font-serif text-3xl font-light leading-tight tracking-tight text-background md:text-5xl">
                  All plans include a 30-day free trial until Jan 15th
                </h2>
                <p className="mb-10 font-sans text-lg font-light leading-relaxed text-background/80">
                  No credit card required • Cancel anytime • Full access to all features
                </p>
                <Button
                  className="inline-flex h-14 items-center gap-2 rounded-2xl bg-primary px-10 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90"
                  onClick={() => setIsWaitlistOpen(true)}
                >
                  Get Started Now
                  <Image
                    src="/icons/arrow-right.svg"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </Button>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-secondary/50 py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <FadeInView delay={0.2} duration={0.8} y={30} className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              Compare Plans
            </h2>
            <p className="font-sans text-muted-foreground">
              Choose the plan that best fits your needs
            </p>
          </FadeInView>

          <FadeInView delay={0.4} duration={0.8} y={30}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-6 font-sans text-left font-semibold text-foreground">
                      Features
                    </th>
                    <th className="py-6 font-sans text-center font-semibold text-foreground">
                      Minimum
                    </th>
                    <th className="relative py-6 font-sans text-center font-semibold text-foreground">
                      Concierge
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 block font-sans text-[10px] font-bold uppercase text-primary">
                        Popular
                      </span>
                    </th>
                    <th className="py-6 font-sans text-center font-semibold text-foreground">
                      Diamond
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparison.map((row, i) => (
                    <tr
                      key={i}
                      className="transition-colors hover:bg-background group"
                    >
                      <td className="py-5 font-sans text-sm font-medium text-muted-foreground">
                        {row.feature}
                      </td>
                      <td className="py-5 text-center">
                        {row.min ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-muted-foreground/30" />
                        )}
                      </td>
                      <td className="bg-primary/5 py-5 text-center transition-colors group-hover:bg-primary/10">
                        {row.con ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-muted-foreground/30" />
                        )}
                      </td>
                      <td className="py-5 text-center">
                        {row.dia ? (
                          <Check className="mx-auto h-5 w-5 text-primary" />
                        ) : (
                          <X className="mx-auto h-5 w-5 text-muted-foreground/30" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <FadeInView delay={0.2} duration={0.8} y={30} className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-3xl font-light tracking-tight text-foreground lg:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-muted-foreground">Have questions? We've got answers.</p>
          </FadeInView>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInView key={i} delay={0.3 + i * 0.05} duration={0.8} y={30}>
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    openFaq === i
                      ? 'border-primary bg-background shadow-lg shadow-primary/5'
                      : 'border-border bg-secondary/50 hover:border-border hover:bg-background'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-sans font-semibold text-foreground">{faq.q}</span>
                    {openFaq === i ? (
                      <Image
                        src="/icons/chevron-up.svg"
                        alt="Collapse"
                        width={20}
                        height={20}
                        className="h-5 w-5 text-primary"
                      />
                    ) : (
                      <Image
                        src="/icons/chevron-down.svg"
                        alt="Expand"
                        width={20}
                        height={20}
                        className="h-5 w-5 text-muted-foreground"
                      />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="animate-in slide-in-from-top-2 px-6 pb-6 duration-300">
                      <p className="font-sans text-sm font-light leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      <WaitlistFormModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  )
}

export default PricingPage
