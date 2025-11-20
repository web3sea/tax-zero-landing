import { LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import { ComponentProps } from 'react'

interface PrismicLinkProps extends Omit<ComponentProps<'a'>, 'href'> {
  field: LinkField | null | undefined
  className?: string
  children?: React.ReactNode
  fallbackText?: string
}

/**
 * Reusable component that handles Prismic link fields.
 * - For Document links: Uses Next.js Link with slug
 * - For other links (Web, Media): Uses PrismicNextLink
 */
export default function PrismicLink({
  field,
  className,
  children,
  fallbackText,
  ...props
}: PrismicLinkProps) {
  if (!field) return null

  // Handle Document links with slug
  if (field.link_type === 'Document') {
    return (
      <Link href={`/${field.type || ''}`} className={className} {...props}>
        {children || field.text || fallbackText}
      </Link>
    )
  }

  // Handle other link types (Web, Media, etc.)
  return (
    <PrismicNextLink field={field} className={className} {...props}>
      {children || field.text || fallbackText}
    </PrismicNextLink>
  )
}

