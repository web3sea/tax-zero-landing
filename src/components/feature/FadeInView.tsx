'use client'

import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeInViewProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
}

/**
 * Component tái sử dụng cho fade-in animation khi scroll vào view
 */
export const FadeInView: FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 20,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
