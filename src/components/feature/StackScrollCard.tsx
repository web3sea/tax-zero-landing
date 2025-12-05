'use client'

import { FC, ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface StackScrollCardProps {
  children: ReactNode
  index: number
  totalCards: number
  className?: string
}

/**
 * Card Stack Scroll Animation
 * Các cards sẽ sticky và xếp chồng lên nhau khi scroll
 * Effect giống Apple, Stripe websites
 */
export const StackScrollCard: FC<StackScrollCardProps> = ({
  children,
  index,
  totalCards,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  // Track scroll progress của card này
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  })

  // Transform values based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])

  // Calculate sticky top position - mỗi card cao hơn card trước một chút
  const stickyTop = index * 20 // 20px offset cho mỗi card

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        top: `${stickyTop}px`,
      }}
      className={`sticky ${className}`}
    >
      {children}
    </motion.div>
  )
}

