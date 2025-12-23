import { FC } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
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
      className="rounded-t-[2.5rem] bg-brand-navy text-primary-foreground"
    >
      <div className="container mx-auto flex flex-col items-center gap-4 px-6 py-8 text-center md:py-10">
        {/* Logo */}
        {slice.primary.logo_brand?.url && (
          <PrismicNextImage
            field={slice.primary.logo_brand}
            className="h-12 w-auto"
            width={192}
            height={128}
          />
        )}

        {/* Social Icons */}
        {slice.primary.linkedin_link && (
          <PrismicLink
            field={slice.primary.linkedin_link}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/20"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </PrismicLink>
        )}

        {/* About Section */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-serif text-sm font-semibold">About</h3>
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-primary-foreground/80">
            {slice.primary.about.map((item, index) => (
              <li key={index}>
                <PrismicLink
                  field={item.link_item}
                  className="transition-colors hover:text-primary-foreground"
                  fallbackText="Learn more"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright & Legal */}
        {slice.primary.all_rights_reserved && (
          <p className="text-xs text-primary-foreground/60">{slice.primary.all_rights_reserved}</p>
        )}

        <div className="flex flex-wrap justify-center gap-3 text-xs text-primary-foreground/60">
          {slice.primary.privacy_policy && (
            <PrismicLink
              field={slice.primary.privacy_policy}
              className="transition-colors hover:text-primary-foreground"
              fallbackText="Privacy Policy"
            />
          )}
          {slice.primary.privacy_policy && slice.primary.terms_of_use && (
            <span className="text-primary-foreground/40">|</span>
          )}
          {slice.primary.terms_of_use && (
            <PrismicLink
              field={slice.primary.terms_of_use}
              className="transition-colors hover:text-primary-foreground"
              fallbackText="Terms of Use"
            />
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
