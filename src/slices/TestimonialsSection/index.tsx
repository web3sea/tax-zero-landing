'use client'

import { FC, useEffect, useRef, useState, useCallback } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import PrismicLink from '@/components/common/prismic-link'
import StarReview from '@/components/ui/star-review'

/**
 * Props for `TestimonialsSection`.
 */
export type TestimonialsSectionProps = SliceComponentProps<Content.TestimonialsSectionSlice>

/**
 * Component for "TestimonialsSection" Slices.
 */
const TestimonialsSection: FC<TestimonialsSectionProps> = ({ slice }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const scrollbarThumbRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 })

  // Update scrollbar thumb position based on scroll
  const updateScrollbarThumb = useCallback(() => {
    if (!scrollContainerRef.current || !scrollbarThumbRef.current || !scrollbarRef.current) return

    const container = scrollContainerRef.current
    const thumb = scrollbarThumbRef.current

    const scrollLeft = container.scrollLeft
    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth
    const maxScroll = scrollWidth - clientWidth

    if (maxScroll > 0) {
      // Calculate thumb width - should be smaller for better UX
      // Use a minimum thumb width of 20% and maximum of 50%
      const ratio = clientWidth / scrollWidth
      const thumbWidthPercent = Math.max(20, Math.min(50, ratio * 100))

      // Calculate thumb position - CLAMP scrollProgress to 0-1 range
      const scrollProgress = Math.min(1, Math.max(0, scrollLeft / maxScroll))
      const maxThumbPosition = 100 - thumbWidthPercent
      const thumbPositionPercent = scrollProgress * maxThumbPosition

      thumb.style.width = `${thumbWidthPercent}%`
      thumb.style.transform = `translateX(${thumbPositionPercent}%)`
    } else {
      // If no scroll needed, thumb fills entire scrollbar
      thumb.style.width = '100%'
      thumb.style.transform = 'translateX(0%)'
    }
  }, [])

  // Handle scrollbar thumb drag
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      scrollLeft: scrollContainerRef.current?.scrollLeft || 0,
    })
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current || !scrollbarRef.current) return

      const deltaX = e.clientX - dragStart.x
      const container = scrollContainerRef.current
      const scrollbar = scrollbarRef.current

      const scrollWidth = container.scrollWidth
      const clientWidth = container.clientWidth
      const maxScroll = scrollWidth - clientWidth
      const scrollbarWidth = scrollbar.clientWidth
      const thumbWidth = scrollbarThumbRef.current?.clientWidth || 0
      const scrollableWidth = scrollbarWidth - thumbWidth

      if (scrollableWidth > 0) {
        const scrollDelta = (deltaX / scrollableWidth) * maxScroll
        const newScrollLeft = Math.max(0, Math.min(maxScroll, dragStart.scrollLeft + scrollDelta))
        container.scrollLeft = newScrollLeft
      }
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart, handleMouseMove])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('scroll', updateScrollbarThumb)
    updateScrollbarThumb() // Initial update

    // Update on window resize
    const handleResize = () => {
      updateScrollbarThumb()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('scroll', updateScrollbarThumb)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateScrollbarThumb])

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-blue-light pb-8 pt-6 md:pb-10 md:pt-8"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 font-serif text-3xl font-light leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {typeof slice.primary.title === 'string' ? slice.primary.title : 'Delighted Clients'}
          </h2>
          <div className="mb-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-0 md:mb-8">
            <span className="mr-0 font-sans text-xl underline sm:mr-4 md:text-2xl">
              {'Excellent'}
            </span>
            <div className="mr-0 sm:mr-4">
              <StarReview starNumber={slice.primary.star_number} />
            </div>
            <span className="font-sans text-base text-muted-foreground md:text-lg">
              {'Trustpilot'}
            </span>
          </div>
        </div>

        {/* Full Width Scrollable Testimonials */}
        <div className="mb-8 w-full md:mb-10">
          {/* Testimonials Container */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex min-w-max space-x-4 px-2 md:space-x-6 md:px-4">
              {slice.primary.cards?.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex min-w-[320px] max-w-[400px] flex-col rounded-2xl bg-card p-6 shadow-lg md:min-w-[400px] md:p-8"
                >
                  {/* Stars */}
                  <div className="mb-4">
                    <StarReview starNumber={testimonial.star_number} />
                  </div>

                  {/* Review Text */}
                  <PrismicRichText
                    field={testimonial.review_content}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="mb-6 flex-grow font-sans text-sm leading-relaxed text-card-foreground md:text-base">
                          {children}
                        </p>
                      ),
                    }}
                  />

                  {/* Author */}
                  <div className="mt-auto flex items-center">
                    {testimonial.avatar?.url ? (
                      <PrismicNextImage
                        field={testimonial.avatar}
                        className="mr-3 h-10 w-10 flex-shrink-0 rounded-full"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="mr-3 h-10 w-10 flex-shrink-0 rounded-full bg-muted" />
                    )}
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground md:text-base">
                        {testimonial.username || 'Anonymous'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Scrollbar */}
          <div
            ref={scrollbarRef}
            className="relative mx-auto mt-3 h-1 cursor-pointer rounded-full bg-muted md:mt-4 md:h-1.5"
            onClick={(e) => {
              if (!scrollContainerRef.current || !scrollbarRef.current) return

              const rect = scrollbarRef.current.getBoundingClientRect()
              const clickX = e.clientX - rect.left
              const scrollbarWidth = rect.width
              const container = scrollContainerRef.current
              const scrollWidth = container.scrollWidth
              const clientWidth = container.clientWidth
              const maxScroll = scrollWidth - clientWidth

              // Calculate scroll position based on click position
              const scrollLeft = (clickX / scrollbarWidth) * maxScroll
              container.scrollLeft = scrollLeft
            }}
          >
            <div
              ref={scrollbarThumbRef}
              className="absolute left-0 top-0 h-full cursor-pointer rounded-full bg-primary transition-colors hover:bg-accent"
              onMouseDown={handleThumbMouseDown}
            />
          </div>
        </div>

        {/* See More Button */}
        {slice.primary.see_more_button && (
          <div className="text-center">
            <PrismicLink
              field={slice.primary.see_more_button}
              className="rounded-full border-2 border-foreground bg-background font-sans text-base font-normal text-foreground shadow-none transition-colors hover:bg-secondary md:text-lg"
              fallbackText="See more testimonials"
            >
              {'See more testimonials'}
            </PrismicLink>
          </div>
        )}

        {/* Citation */}
        {slice.primary.citation_text && (
          <div className="mt-6 px-4 text-center md:mt-8">
            <PrismicRichText
              field={slice.primary.citation_text}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-center font-sans text-xs leading-snug text-foreground md:text-sm">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialsSection
