import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'

/**
 * Props for `Footer`.
 */
export type FooterProps = SliceComponentProps<Content.FooterSlice>

/**
 * Component for "Footer" Slices.
 */
const Footer: FC<FooterProps> = ({ slice }) => {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
     <PrismicNextImage field={slice.primary.logo} />


     {slice.primary.brand_name}

     <PrismicNextLink field={slice.primary.instagram_link} /><PrismicNextLink field={slice.primary.linkedin_link} />

     <PrismicNextLink field={slice.primary.twitter_link} />


     {slice.primary.about.map((item, index) => (
       <div key={index}>
         <PrismicNextLink field={item.team} />
       </div>
     ))}

     {slice.primary.plans.map((item, index) => (
       <div key={index}>
         <PrismicNextLink field={item.plan_link} />
       </div>
     ))}
    </section>
  )
}

export default Footer
