import { Metadata } from 'next'
import { cn } from '@/utils/cn';

export { cn };

export function isSSR() {
  return typeof window === 'undefined'
}

export function constructMetadata({
  title = 'Domain Money - Financial Planning, Investment Strategy, and Wealth Management',
  description = 'Domain Money, your trusted financial advisor. Specializing in financial planning, investment strategy, and wealth management.',
  image = '/og-image.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    authors: [{ name: 'Domain Money' }],
    openGraph: {
      title,
      description: 'Domain Money, your trusted financial advisor. Specializing in financial planning, investment strategy, and wealth management.',
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
      description: 'Domain Money, your trusted financial advisor. Specializing in financial planning, investment strategy, and wealth management.',
      images: [image],
    },
    icons: [
      { rel: 'icon', url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'shortcut icon', url: '/favicon.ico' },
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    manifest: '/site.webmanifest',
    metadataBase: new URL('https://domainmoney.com/'),
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent',
      title: 'Domain Money',
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
