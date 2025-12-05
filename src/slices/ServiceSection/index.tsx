import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { AnimatedFeatureCard } from '@/components/feature/AnimatedFeatureCard'
import { FadeInView } from '@/components/feature/FadeInView'

/**
 * Props for `ServiceSection`.
 */
export type ServiceSectionProps = SliceComponentProps<Content.ServiceSectionSlice>

// Static features data
// const features = [
//   {
//     icon: '/svg/icon-service/blocks.svg',
//     title: 'Customized Tax Plan',
//     description: 'A plan that aligns with your unique interests and lifestyle.',
//   },
//   {
//     icon: '/svg/icon-service/chart-candlestick.svg',
//     title: 'Equity Compensation',
//     description: 'Vesting and taxes analysed for optimal outcomes.',
//   },
//   {
//     icon: '/svg/icon-service/badge-dollar-sign.svg',
//     title: 'Payslip Review',
//     description: 'Monitor your payslip for withholding accuracy automatically.',
//   },
//   {
//     icon: '/svg/icon-service/calendar-clock.svg',
//     title: 'Life Goals Tracker',
//     description:
//       'Track your progress toward your meaningful goals with real-time adjustments based on tax savings.',
//   },
//   {
//     icon: '/svg/icon-service/map-pinned.svg',
//     title: 'Execution Support',
//     description: 'Take smart action to implement the plan effortlessly.',
//   },
// ]

/**
 * Component for "ServiceSection" Slices.
 */
const ServiceSection: FC<ServiceSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden border-t border-zinc-100 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <FadeInView className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-4xl font-semibold tracking-tight text-design-primary md:text-5xl">
            {slice.primary.title || 'Comprehensive Wealth Management'}
          </h2>
          <p className="mx-auto max-w-6xl font-proxima text-xl text-design-primary">
            {slice.primary.description ||
              'Everything you need to manage equity, taxes, and life goals in one unified view.'}
          </p>
        </FadeInView>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slice.primary.services?.map((service, index) => (
            <AnimatedFeatureCard
              key={index}
              item={service}
              index={index}
              isWide={index === 3} // Card in the 4th position is wide
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
