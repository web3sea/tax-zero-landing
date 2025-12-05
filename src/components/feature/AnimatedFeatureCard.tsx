'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import { Content } from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface AnimatedFeatureCardProps {
  item: Content.ServiceSectionSliceDefaultPrimaryServicesItem
  index: number
  isWide?: boolean
}

export const AnimatedFeatureCard: FC<AnimatedFeatureCardProps> = ({
  item,
  index,
  isWide = false,
}) => {
  const cardClasses = isWide ? 'md:col-span-1 lg:col-span-2' : 'md:col-span-1'

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-zinc-50 p-8 transition-all duration-300 hover:border-[#4152EC]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${cardClasses}`}
    >
      {/* Icon */}
      <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-100 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
        {item.logo?.url ? (
          <PrismicNextImage field={item.logo} width={24} height={24} className="h-6 w-6" />
        ) : (
          <div className="h-6 w-6 rounded bg-gray-200" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <PrismicRichText
          field={item.title}
          components={{
            heading3: ({ children }) => (
              <h3 className="mb-2 font-serif text-2xl font-medium tracking-tight text-design-primary">
                {children}
              </h3>
            ),
            paragraph: ({ children }) => (
              <h3 className="mb-2 font-serif text-2xl font-medium tracking-tight text-design-primary">
                {children}
              </h3>
            ),
          }}
        />
        <PrismicRichText
          field={item.description}
          components={{
            paragraph: ({ children }) => (
              <p className="font-proxima text-sm font-light leading-relaxed text-zinc-500">
                {children}
              </p>
            ),
          }}
        />
      </div>
    </motion.div>
  )
}
