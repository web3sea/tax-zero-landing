import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { asImageSrc } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

import { createClient } from '@/prismicio'
import { components } from '@/slices'
import MainLayout from '@/layout/MainLayout'
import BlogList from '@/layout/Blog/BlogList'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string }>
}) {
  const params = await searchParams
  const currentPage = params.page ? parseInt(params.page) : 1
  const currentTag = params.tag
  const client = createClient()
  const page = await client.getSingle('blog_listing').catch(() => notFound())

  return (
    <MainLayout>
      <div className="min-h-screen">
        <SliceZone slices={page.data.slices} components={components} />
        <BlogList page={currentPage} tag={currentTag} />
      </div>
    </MainLayout>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('blog_listing').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? '' }],
    },
  }
}
