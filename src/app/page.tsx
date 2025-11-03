import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'

export default async function LandingPage() {
  const client = createClient()
  const page = await client.getSingle('landing').catch(() => notFound())

  const staticContext = {
    is_waitlist_mode: page.data.is_waitlist_mode,
  }

  return <SliceZone slices={page.data.slices} context={staticContext} components={components} />
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('landing').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
