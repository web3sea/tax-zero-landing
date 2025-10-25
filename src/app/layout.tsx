import React from 'react'
import { Inter, Crimson_Text, Lora } from 'next/font/google'
import { constructMetadata } from '@/utils'
import MainProvider from '@/providers/main-provider'
import { cn } from '@/utils/cn'

import './globals.scss'

const fontText = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-text',
})

// Using Crimson Text as a close alternative to Ivy Presto Display
// Crimson Text has similar characteristics: elegant serif, good for headings
const fontHeading = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-heading',
})

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          fontText.variable,
          fontHeading.variable,
          'flex min-h-screen flex-col antialiased',
        )}
      >
        {/* <MainProvider> */}
        <main className="flex flex-1 flex-col">{children}</main>
        {/* </MainProvider> */}
      </body>
    </html>
  )
}
