import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { Marquee } from '@/components/ui/marquee'

/**
 * Props for `FeaturedSection`.
 */
export type FeaturedSectionProps = SliceComponentProps<Content.FeaturedSectionSlice>

/**
 * Component for "FeaturedSection" Slices.
 */
const FeaturedSection: FC<FeaturedSectionProps> = ({ slice }) => {
  const LogoImage = () => (
    <PrismicNextImage
      field={slice.primary.image}
      className="h-10 w-auto flex-shrink-0 select-none"
    />
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-design-card-bg py-16"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h3 className="mb-8 text-2xl text-black">
            {slice.primary.title || 'Featured in'}
          </h3>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:120s]">
            <LogoImage />
            <LogoImage />
            <LogoImage />
          </Marquee>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
