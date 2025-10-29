import { memo } from 'react'
import isEqual from 'react-fast-compare'
import Image from 'next/image'

function ServicesSection() {
  const services = [
    {
      icon: '/svg/icons/investments.svg',
      title: 'Investments',
      description: 'Smart, diversified strategies that grow with you.',
    },
    {
      icon: '/svg/icons/taxes.svg',
      title: 'Taxes',
      description: 'Potentially cut your tax bill with proactive planning.',
    },
    {
      icon: '/svg/icons/retirement.svg',
      title: 'Retirement',
      description: 'Build freedom on your timeline.',
    },
    {
      icon: '/svg/icons/cash-flow.svg',
      title: 'Cash flow',
      description: 'Know where every dollar goes and why.',
    },
    {
      icon: '/svg/icons/real-estate.svg',
      title: 'Real estate',
      description: 'Make property work for your goals.',
    },
    {
      icon: '/svg/icons/more.svg',
      title: 'More',
      description:
        'Equity compensation, education savings, insurance, estate planning, and long-term care.',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-start text-left">
              <div className="mb-4 lg:mb-6">
                <Image
                  src={service.icon}
                  alt={`${service.title} icon`}
                  width={46}
                  height={46}
                  className="h-11 w-11"
                />
              </div>
              <h3 className="mb-3 font-proxima text-lg font-semibold leading-tight text-design-primary lg:mb-4 lg:text-xl">
                {service.title}
              </h3>
              <p className="font-proxima text-sm leading-relaxed text-design-primary">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(ServicesSection, isEqual)
