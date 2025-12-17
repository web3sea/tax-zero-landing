import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import MainLayout from '@/layout/MainLayout'

type Params = { page: string }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { page } = await params
  const client = createClient()
  const data = await client.getByUID('blog_page_new', page).catch(() => notFound())

  return (
    <MainLayout>
      <SliceZone slices={data.data.slices} components={components} />
    </MainLayout>
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { page } = await params
  const client = createClient()
  const data = await client.getByUID('blog_page_new', page).catch(() => notFound())

  return {
    title: data.data.meta_title,
    description: data.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(data.data.meta_image) ?? '' }],
    },
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const pages = await client.getAllByType('blog_page_new')

  return pages.map((page) => ({ page: page.uid }))
}
