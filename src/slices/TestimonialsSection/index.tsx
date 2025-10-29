'use client'

import { FC, useEffect, useRef, useState, useCallback } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
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
      scrollLeft: scrollContainerRef.current?.scrollLeft || 0
    })
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
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
  }, [isDragging, dragStart])

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
      className="pt-6 md:pt-8 pb-8 md:pb-10 bg-[#98d3f3]"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-design-primary mb-4 tracking-tight">
            {typeof slice.primary.title === 'string' ? slice.primary.title : 'Delighted Clients'}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 md:mb-8 gap-2 sm:gap-0">
            <span className="text-xl md:text-2xl underline mr-0 sm:mr-4">
              {'Excellent'}
            </span>
            <div className="mr-0 sm:mr-4">
              <StarReview starNumber={slice.primary.star_number} />
            </div>
            <span className="text-base md:text-lg text-gray-600 font-proxima">
              {'Trustpilot'}
            </span>
          </div>
        </div>

        {/* Full Width Scrollable Testimonials */}
        <div className="w-full mb-8 md:mb-10">
          {/* Testimonials Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-4 md:space-x-6 min-w-max px-2 md:px-4">
              {slice.primary.cards?.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-lg min-w-[320px] md:min-w-[400px] max-w-[400px] flex flex-col"
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
                        <p className="text-gray-700 font-proxima text-sm md:text-base leading-relaxed mb-6 flex-grow">
                          {children}
                        </p>
                      ),
                    }}
                  />

                  {/* Author */}
                  <div className="flex items-center mt-auto">
                    {testimonial.avatar?.url ? (
                      <PrismicNextImage
                        field={testimonial.avatar}
                        className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-proxima font-semibold text-design-primary text-sm md:text-base">
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
            className="max-w-7xl mx-auto mt-3 md:mt-4 h-1 md:h-1.5 bg-gray-200 rounded-full relative cursor-pointer"
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
              className="absolute top-0 left-0 h-full bg-design-accent rounded-full cursor-pointer hover:bg-design-accent-dark transition-colors"
              onMouseDown={handleThumbMouseDown}
            />
          </div>
        </div>

        {/* See More Button */}
        {slice.primary.see_more_button && (
          <div className="text-center">
            <PrismicNextLink
              field={slice.primary.see_more_button}
              className="font-proxima border-2 border-design-primary text-design-primary rounded-full font-normal bg-white hover:bg-design-card-bg transition-colors text-base md:text-lg shadow-none"
              style={{ padding: '.6rem 1.5rem' }}
            >
              {'See more testimonials'}
            </PrismicNextLink>
          </div>
        )}

        {/* Citation */}
        {slice.primary.citation_text && (
          <div className="mt-6 md:mt-8 text-center px-4">
            <PrismicRichText
              field={slice.primary.citation_text}
              components={{
                paragraph: ({ children }) => (
                  <p className="font-proxima text-xs md:text-sm text-black text-center max-w-5xl mx-auto leading-snug">
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
