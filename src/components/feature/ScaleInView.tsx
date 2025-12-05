'use client'

import { FC, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ScaleInViewProps {
  children: ReactNode
  delay?: number
  duration?: number
  scale?: number
  className?: string
}

/**
 * Component cho scale + fade animation - card "nổi lên" khi scroll vào view
 * Thường dùng cho CTA sections, featured cards
 */
export const ScaleInView: FC<ScaleInViewProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  scale = 0.95,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

