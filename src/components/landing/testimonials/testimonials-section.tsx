'use client'

import { memo, useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import TestimonialCard from './testimonial-card'

function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const scrollbarThumbRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 })

  const testimonials = [
    {
      text: "My wife and I had a fantastic experience working with our Domain Money CFP®. They were extremely thorough and clearly know their craft. They put in a lot of time and effort to help us review our finances and develop a solid plan. After working with Domain, we felt much more confident in how our investments were distributed. Not only are they professional and knowledgeable, but they're also incredibly kind. We highly recommend Domain to anyone looking for top-notch financial planning.",
      author: "Mark J.",
      rating: 5,
      avatar: "https://cdn.prod.website-files.com/63e4b2779689f743ed0aec7a/67f84a18e98dc7b99f194d97_668417ab31daca7a2d0f4039_Rectangle%25203469405-12.webp"
    },
    {
      text: "The second Strategic Plan session with my CFP® was extremely informative and helpful. I felt that they really understood my questions and goals for the Strategic Plan. All good things to say about my CFP® in particular! My original review noted some areas for process improvement, but I have appreciated all of the efforts Domain Money has made to improve upon my initial experience. I look forward to continuing to work with them in the future.",
      author: "Brigid M.",
      rating: 5,
      avatar: "https://cdn.prod.website-files.com/63e4b2779689f743ed0aec7a/67f84a18e98dc7b99f194d97_668417ab31daca7a2d0f4039_Rectangle%25203469405-12.webp"
    },
    {
      text: "Working with Domain Money has been transformative. Their CFP professional helped me create a comprehensive financial plan that addressed all my goals. The personalized approach and ongoing support have given me confidence in my financial future.",
      author: "Sarah K.",
      rating: 5,
      avatar: "https://cdn.prod.website-files.com/63e4b2779689f743ed0aec7a/67f84a18e98dc7b99f194d97_668417ab31daca7a2d0f4039_Rectangle%25203469405-12.webp"
    },
    {
      text: "The flat-fee model is exactly what I was looking for. No hidden fees, no sales pressure - just honest, expert advice. My advisor has helped me optimize my investments and tax strategy, saving me thousands.",
      author: "David L.",
      rating: 5,
      avatar: "https://cdn.prod.website-files.com/63e4b2779689f743ed0aec7a/67f84a18e98dc7b99f194d97_668417ab31daca7a2d0f4039_Rectangle%25203469405-12.webp"
    },
    {
      text: "Domain Money's approach to financial planning is refreshing. They took the time to understand my unique situation and created a plan that actually works for my lifestyle. The ongoing support and regular check-ins have been invaluable.",
      author: "Jennifer M.",
      rating: 5,
      avatar: "https://cdn.prod.website-files.com/63e4b2779689f743ed0aec7a/67f84a18e98dc7b99f194d97_668417ab31daca7a2d0f4039_Rectangle%25203469405-12.webp"
    }
  ]

  // Update scrollbar thumb position based on scroll
  const updateScrollbarThumb = () => {
    if (!scrollContainerRef.current || !scrollbarThumbRef.current || !scrollbarRef.current) return

    const container = scrollContainerRef.current
    const scrollbar = scrollbarRef.current
    const thumb = scrollbarThumbRef.current

    const scrollLeft = container.scrollLeft
    const scrollWidth = container.scrollWidth
    const clientWidth = container.clientWidth
    const maxScroll = scrollWidth - clientWidth
    const scrollbarWidth = scrollbar.clientWidth

    console.log('Debug scrollbar:', {
      scrollLeft,
      scrollWidth,
      clientWidth,
      maxScroll,
      scrollbarWidth
    })

    if (maxScroll > 0) {
      // Calculate thumb width - should be smaller for better UX
      // Use a minimum thumb width of 20% and maximum of 50%
      const ratio = clientWidth / scrollWidth
      const thumbWidthPercent = Math.max(20, Math.min(50, ratio * 100))

      // Calculate thumb position - CLAMP scrollProgress to 0-1 range
      const scrollProgress = Math.min(1, Math.max(0, scrollLeft / maxScroll))
      const maxThumbPosition = 100 - thumbWidthPercent
      const thumbPositionPercent = scrollProgress * maxThumbPosition

      console.log('Debug thumb:', {
        ratio,
        thumbWidthPercent,
        scrollProgress,
        maxThumbPosition,
        thumbPositionPercent,
        isAtEnd: scrollLeft >= maxScroll - 1,
        scrollLeft,
        maxScroll
      })

      thumb.style.width = `${thumbWidthPercent}%`
      thumb.style.transform = `translateX(${thumbPositionPercent}%)`
    } else {
      // If no scroll needed, thumb fills entire scrollbar
      thumb.style.width = '100%'
      thumb.style.transform = 'translateX(0%)'
    }
  }

  // Handle scrollbar thumb drag
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      scrollLeft: scrollContainerRef.current?.scrollLeft || 0
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
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
  }

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
  }, [isDragging, dragStart])

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
  }, [])

  return (
    <section className="pt-6 md:pt-8 pb-8 md:pb-10 bg-[#98d3f3]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-design-primary mb-4 tracking-tight">
            Delighted Clients
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 md:mb-8 gap-2 sm:gap-0">
            <span className="text-xl md:text-2xl underline mr-0 sm:mr-4">Excellent</span>
            <div className="flex space-x-1 mr-0 sm:mr-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 md:w-6 md:h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-base md:text-lg text-gray-600 font-proxima">Trustpilot</span>
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
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  text={testimonial.text}
                  author={testimonial.author}
                  rating={testimonial.rating}
                  avatar={testimonial.avatar}
                />
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

              console.log('Click scrollbar:', {
                clickX,
                scrollbarWidth,
                maxScroll,
                scrollLeft
              })

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

        <div className="text-center">
          <button
            style={
              {
                padding: '.6rem 1.5rem',
              }}
            className="font-proxima border-2 border-design-primary text-design-primary rounded-full font-normal bg-white hover:bg-design-card-bg transition-colors text-base md:text-lg shadow-none"
          >
            See more testimonials
          </button>
        </div>

        <div className="mt-6 md:mt-8 text-center px-4">
          <p className="font-proxima text-xs md:text-sm text-black text-center max-w-5xl mx-auto leading-snug">
            These testimonials are from current clients of Domain Money Advisors, LLC (Domain). No compensation (non-cash or otherwise) was provided in exchange for these testimonials. Domain does not have any material conflict of interest with the persons giving these testimonials. Some of the testimonials may be shortened for length only and not to distort or improve the overall testimonial. Profile images are for representational purposes only and do not depict actual client images. Testimonials were selected to highlight the diversity of our CERTIFIED FINANCIAL PLANNER® professionals and not based on client experience, investment performance, or any rating.
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialsSection, isEqual)
