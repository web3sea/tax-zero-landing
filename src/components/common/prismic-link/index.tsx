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

  // Handle Document links
  if (field.link_type === 'Document') {
    let href = '/'

    // Case 1: Dynamic type - has UID (e.g., blog posts, pages with UID)
    if ('uid' in field && field.uid) {
      href = `/${field.uid}`
      console.log('🔗 Document link (Dynamic):', { type: field.type, uid: field.uid, href })
    }
    // Case 2: Landing page is a special case, it should always link to the root
    else if (field.type === 'landing') {
      href = `/`
      console.log('🔗 Document link (Landing):', { type: field.type, href })
    }

    // Case 4: Blog list = blog
    else if ('slug' in field && field.slug === 'blog-listing') {
      href = `/blog`

      console.log('⚠️ Document link (Fallback):', { type: field.type, href })
    }

    // Case 2: Single type - only has slug, no UID (e.g., privacy_policy, terms_of_use)
    else if ('slug' in field && field.slug) {
      href = `/${field.slug}`
      console.log('🔗 Document link (Single):', { type: field.type, slug: field.slug, href })
    }

    // Case 4: Blog list = blog
    else if (field.type == 'blog_listing') {
      href = `/blog`

      console.log('⚠️ Document link (Fallback):', { type: field.type, href })
    }

    // Fallback: use type if available
    else if (field.type) {
      href = `/${field.type}`

      console.log('⚠️ Document link (Fallback):', { type: field.type, href })
    }

    return (
      <Link href={href} className={className} {...props}>
        {children || field.text || fallbackText}
      </Link>
    )
  }

  // Handle other link types (Web, Media, Any)
  return (
    <PrismicNextLink field={field} className={className} {...props}>
      {children || field.text || fallbackText}
    </PrismicNextLink>
  )
}
