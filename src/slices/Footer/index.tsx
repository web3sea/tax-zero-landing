import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next'
import PrismicLink from '@/components/common/prismic-link'

/**
 * Props for `Footer`.
 */
export type FooterProps = SliceComponentProps<Content.FooterSlice>

/**
 * Component for "Footer" Slices.
 */
const Footer: FC<FooterProps> = ({ slice }) => {
  return (
    <footer
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="rounded-t-[2.5rem] bg-[#00303c] text-white"
    >
      <div className="container mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 py-12 text-center md:py-16">
        <div className="flex flex-col items-center gap-4">
          {slice.primary.logo_brand?.url && (
            <PrismicNextImage
              field={slice.primary.logo_brand}
              className="h-8 w-auto md:h-9"
              width={48}
              height={32}
            />
          )}
          <div className="flex items-center gap-3">
            {slice.primary.linkedin_link && (
              <PrismicNextLink
                field={slice.primary.linkedin_link}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </PrismicNextLink>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h3 className="text-lg font-semibold md:text-xl">About</h3>
          <ul className="space-y-2 text-sm text-gray-200 md:text-base">
            {slice.primary.about.map((item, index) => (
              <li key={index}>
                <PrismicLink
                  field={item.link_item}
                  className="transition-colors hover:text-white"
                  fallbackText="Learn more"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-6 text-center text-xs text-gray-300">
          {slice.primary.all_rights_reserved && <p>{slice.primary.all_rights_reserved}</p>}
          <div className="flex flex-wrap justify-center gap-4">
            {slice.primary.log_in && (
              <PrismicLink
                field={slice.primary.log_in}
                className="transition-colors hover:text-white"
                fallbackText="Log In"
              />
            )}
            {slice.primary.privacy_policy && (
              <PrismicLink
                field={slice.primary.privacy_policy}
                className="transition-colors hover:text-white"
                fallbackText="Privacy Policy"
              />
            )}
            {slice.primary.terms_of_use && (
              <PrismicLink
                field={slice.primary.terms_of_use}
                className="transition-colors hover:text-white"
                fallbackText="Terms of Use"
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
