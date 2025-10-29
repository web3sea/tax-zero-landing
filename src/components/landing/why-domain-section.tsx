import { memo } from 'react'
import Image from 'next/image'
import isEqual from 'react-fast-compare'

function WhyDomainSection() {
  const features = [
    {
      icon: '/svg/icons/no-aum.svg',
      title: 'No AUM Fees – ever',
      description:
        'Transparent, flat-fee pricing. And never any hidden costs or assets under management (AUM) fees.',
    },
    {
      icon: '/svg/icons/security.svg',
      title: 'Best-in-class security',
      description: 'Fully-encrypted data protected; 2-factor authentication.',
    },
    {
      icon: '/svg/icons/cfp.svg',
      title: 'CFP® professionals',
      description:
        'Delivering unbiased, expert advice as a true fiduciary, acting in the best interests of the client.',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-2xl bg-design-card-bg p-8">
              <div className="mb-6">
                <Image src={feature.icon} alt={`${feature.title} icon`} width={41} height={41} />
              </div>
              <h3 className="mb-4 font-serif text-2xl text-design-primary">{feature.title}</h3>
              <p className="font-proxima text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(WhyDomainSection, isEqual)
