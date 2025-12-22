import React from 'react'
import { SliceZone } from '@prismicio/react'
import { components } from '@/slices'
import { createClient } from '@/prismicio'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

async function Header() {
  const client = createClient()
  const header = await client.getSingle('header')
  if (!header) return null
  return <SliceZone slices={header.data.slices} components={components} />
}

async function Footer() {
  const client = createClient()
  const footer = await client.getSingle('footer')
  if (!footer) return null

  return <SliceZone slices={footer.data.slices} components={components} />
}
