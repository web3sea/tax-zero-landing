import { Metadata } from 'next'
import { cn } from '@/utils/cn'

export { cn }

export function isSSR() {
  return typeof window === 'undefined'
}

export function constructMetadata({
  title = 'Tax Zero - Tax Planning, Tax Optimization, and Tax Compliance',
  description = 'Tax Zero, your trusted tax advisor. Specializing in tax planning, tax optimization, and tax compliance.',
  image = '/og-image.png',
  icons = '/favicon.ico',
  noIndex = false,
  keywords = ['Tax Zero', 'Tax Planning', 'Tax Optimization', 'Tax Compliance'],
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
  keywords?: string[]
} = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords,
    authors: [{ name: 'Tax Zero' }],
    openGraph: {
      title,
      description:
        'Tax Zero, your trusted tax advisor. Specializing in tax planning, tax optimization, and tax compliance.',
      type: 'website',
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description:
        'Tax Zero, your trusted tax advisor. Specializing in tax planning, tax optimization, and tax compliance.',
      images: [image],
    },
    icons: [
      { rel: 'icon', url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'shortcut icon', url: '/favicon.ico' },
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    manifest: '/site.webmanifest',
    metadataBase: new URL('https://taxzeroclub.com/'),
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Tax Zero',
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
