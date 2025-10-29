import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next'

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
      className="bg-[#00303c] text-white rounded-t-[2.5rem]"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Branding and Social Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center space-x-3">
                {slice.primary.logo_brand?.url && (
                  <PrismicNextImage
                    field={slice.primary.logo_brand}
                    className="h-7 w-auto"
                    width={41}
                    height={28}
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-4">
              {slice.primary.instagram_link && (
                <PrismicNextLink field={slice.primary.instagram_link} className="w-6 h-6">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </PrismicNextLink>
              )}
              {slice.primary.linkedin_link && (
                <PrismicNextLink field={slice.primary.linkedin_link} className="w-6 h-6">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </PrismicNextLink>
              )}
              {slice.primary.twitter_link && (
                <PrismicNextLink field={slice.primary.twitter_link} className="w-6 h-6">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </PrismicNextLink>
              )}
            </div>
          </div>

          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {slice.primary.about.map((item, index) => (
                <li key={index}>
                  <PrismicNextLink
                    field={item.link_item}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                 />
                </li>
              ))}
            </ul>
          </div>

          {/* Plans Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Plans</h3>
            <ul className="space-y-2">
              {slice.primary.plans.map((item, index) => (
                <li key={index}>
                  <PrismicNextLink field={item.link_item} className="text-sm text-gray-300 hover:text-white transition-colors" />
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <ul className="space-y-2">
                {slice.primary.services.slice(0, Math.ceil(slice.primary.services.length / 2)).map((item, index) => (
                  <li key={index}>
                    <PrismicNextLink field={item.link_item} className="text-sm text-gray-300 hover:text-white transition-colors" />
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {slice.primary.services.slice(Math.ceil(slice.primary.services.length / 2)).map((item, index) => (
                  <li key={index}>
                    <PrismicNextLink field={item.link_item} className="text-sm text-gray-300 hover:text-white transition-colors" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Meet Our Advisors Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Meet Our Advisors</h3>
            <ul className="space-y-2">
              {slice.primary.meet_our_advisors.map((item, index) => (
                <li key={index}>
                  <PrismicNextLink field={item.link_item} className="text-sm text-gray-300 hover:text-white transition-colors" />
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {slice.primary.resources.map((item, index) => (
                <li key={index}>
                  <PrismicNextLink field={item.link_item} className="text-sm text-gray-300 hover:text-white transition-colors" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Disclaimers */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4 text-sm text-gray-300">
            {slice.primary.copyright1 && (
              <p>{slice.primary.copyright1}</p>
            )}
            {slice.primary.copyright2 && (
              <p>{slice.primary.copyright2}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-gray-400">
              {slice.primary.all_rights_reserved || '© 2025 Domain Money. All Rights Reserved.'}
            </p>
            <div className="flex flex-wrap gap-4">
              {slice.primary.log_in && (
                <PrismicNextLink
                  field={slice.primary.log_in}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Log In
                </PrismicNextLink>
              )}
              {slice.primary.privacy_policy && (
                <PrismicNextLink
                  field={slice.primary.privacy_policy}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </PrismicNextLink>
              )}
              {slice.primary.terms_of_use && (
                <PrismicNextLink
                  field={slice.primary.terms_of_use}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Use
                </PrismicNextLink>
              )}
              {slice.primary.form_adv && (
                <PrismicNextLink
                  field={slice.primary.form_adv}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Form ADV
                </PrismicNextLink>
              )}
              {slice.primary.legal && (
                <PrismicNextLink
                  field={slice.primary.legal}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Legal
                </PrismicNextLink>
              )}
              {slice.primary.form_crs && (
                <PrismicNextLink
                  field={slice.primary.form_crs}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Form CRS
                </PrismicNextLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
