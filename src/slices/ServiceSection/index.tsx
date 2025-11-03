import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'

/**
 * Props for `ServiceSection`.
 */
export type ServiceSectionProps = SliceComponentProps<Content.ServiceSectionSlice>

/**
 * Component for "ServiceSection" Slices.
 */
const ServiceSection: FC<ServiceSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-20"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {slice.primary.services.map((service, index) => (
            <div key={index} className="flex flex-col items-start text-left">
              <div className="mb-4 lg:mb-6">
                {service.logo?.url ? (
                  <Image
                    src={service.logo.url}
                    alt={service.logo.alt || `${service.title} icon`}
                    width={46}
                    height={46}
                    className="h-11 w-11"
                  />
                ) : (
                  <div className="h-11 w-11 rounded bg-gray-200"></div>
                )}
              </div>
              <PrismicRichText
                field={service.title}
                components={{
                  heading3: ({ children }) => (
                    <h3 className="mb-3 font-proxima text-lg font-semibold leading-tight text-design-primary lg:mb-4 lg:text-xl">
                      {children}
                    </h3>
                  ),
                }}
              />
              <PrismicRichText
                field={service.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="font-proxima text-sm leading-relaxed text-design-primary">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
