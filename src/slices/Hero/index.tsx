'use client'
import { FC, useState, useEffect } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicImage } from '@prismicio/react'
import PrismicLink from '@/components/common/prismic-link'
import WaitlistFormModal from '@/components/form/waitlist-form-modal'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { FadeInView } from '@/components/feature/FadeInView'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselImages = slice.primary.carousel_images ?? []
  const selectedCarouselMode = (slice.primary.carousel_mode as string) ?? 'ken_burns_effect'

  // Track current slide index
  useEffect(() => {
    if (!api) return

    const updateIndex = () => {
      const selectedIndex = api.selectedScrollSnap()
      setCurrentIndex(selectedIndex)
    }

    updateIndex()
    api.on('select', updateIndex)

    return () => {
      api.off('select', updateIndex)
    }
  }, [api])

  // Auto-play carousel
  useEffect(() => {
    if (!api || carouselImages.length <= 1) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        // Loop back to start
        api.scrollTo(0)
      }
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [api, carouselImages.length])

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-[600px] items-center overflow-hidden lg:min-h-[700px]"
    >
      {/* Carousel Background */}
      {carouselImages.length > 0 ? (
        <div className="absolute inset-0 h-full w-full">
          {selectedCarouselMode === 'fade_transition' && (
            <CarouselFadeTransition
              carouselImages={carouselImages}
              setApi={setApi}
              currentIndex={currentIndex}
            />
          )}
          {selectedCarouselMode === 'slide_transition' && (
            <CarouselSlideTransition
              carouselImages={carouselImages}
              setApi={setApi}
              currentIndex={currentIndex}
            />
          )}
          {selectedCarouselMode === 'zoom_fade' && (
            <CarouselZoomFade
              carouselImages={carouselImages}
              setApi={setApi}
              currentIndex={currentIndex}
            />
          )}
          {selectedCarouselMode === 'parallax_effect' && (
            <CarouselParallaxEffect
              carouselImages={carouselImages}
              setApi={setApi}
              currentIndex={currentIndex}
            />
          )}
          {(selectedCarouselMode === 'ken_burns_effect' || !selectedCarouselMode) && (
            <CarouselKenBurnsEffect
              carouselImages={carouselImages}
              setApi={setApi}
              currentIndex={currentIndex}
            />
          )}
        </div>
      ) : (
        <div className="absolute inset-0 h-full w-full bg-brand-navy" />
      )}

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex h-auto flex-col items-start justify-between py-24 lg:flex-row lg:py-32">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-2xl">
            {/* Title with animation */}
            <FadeInView delay={0.2} duration={0.8} y={30}>
              <PrismicRichText
                field={slice.primary.title}
                components={{
                  heading1: ({ children }) => (
                    <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
                      {children}
                    </h1>
                  ),
                }}
              />
            </FadeInView>

            {/* Description with animation */}
            <FadeInView delay={0.4} duration={0.8} y={30}>
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mb-8 font-sans text-lg leading-relaxed text-white/90 drop-shadow-md sm:text-xl lg:text-2xl">
                      {children}
                    </p>
                  ),
                }}
              />
            </FadeInView>

            {/* Button with animation */}
            <FadeInView delay={0.6} duration={0.8} y={30}>
              <button
                className="group inline-flex items-center rounded-full bg-white py-3 pl-8 pr-2 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
                onClick={() => setIsWaitlistOpen(true)}
              >
                <span className="mr-6 font-sans text-lg font-medium text-foreground">
                  {slice.primary.button.text ?? 'Free Strategy Session'}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary transition-all group-hover:bg-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-primary-foreground"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </FadeInView>
          </div>
        </div>
      </div>
      <WaitlistFormModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  )
}

// Carousel Mode Components
type CarouselModeProps = {
  carouselImages: Content.HeroSliceDefaultPrimaryCarouselImagesItem[]
  setApi: (api: CarouselApi) => void
  currentIndex: number
}

// Fade Transition - Smooth crossfade between images
const CarouselFadeTransition: FC<CarouselModeProps> = ({
  carouselImages,
  setApi,
  currentIndex,
}) => {
  return (
    <div className="relative h-full w-full">
      {carouselImages.map((item, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out',
            index === currentIndex ? 'z-10 opacity-100' : 'z-0 opacity-0',
          )}
        >
          <PrismicImage field={item.image} className="h-full w-full object-cover" alt="" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      ))}
      {/* Hidden carousel for API control */}
      <div className="pointer-events-none absolute opacity-0">
        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="h-1 w-1">
          <CarouselContent>
            {carouselImages.map((_, index) => (
              <CarouselItem key={index} className="basis-full" />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

// Slide Transition - Horizontal slide animation
const CarouselSlideTransition: FC<CarouselModeProps> = ({ carouselImages, setApi }) => {
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: true,
        duration: 20,
      }}
      className="h-full w-full"
    >
      <CarouselContent className="h-full">
        {carouselImages.map((item, index) => (
          <CarouselItem key={index} className="h-full basis-full pl-0">
            <div className="relative h-full w-full">
              <PrismicImage field={item.image} className="h-full w-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

// Zoom Fade - Images zoom in while fading
const CarouselZoomFade: FC<CarouselModeProps> = ({ carouselImages, setApi, currentIndex }) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {carouselImages.map((item, index) => {
        const isActive = index === currentIndex
        return (
          <div
            key={index}
            className={cn(
              'absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out',
              isActive ? 'z-10 scale-100 opacity-100' : 'z-0 scale-110 opacity-0',
            )}
          >
            <PrismicImage field={item.image} className="h-full w-full object-cover" alt="" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>
        )
      })}
      {/* Hidden carousel for API control */}
      <div className="pointer-events-none absolute opacity-0">
        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="h-1 w-1">
          <CarouselContent>
            {carouselImages.map((_, index) => (
              <CarouselItem key={index} className="basis-full" />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

// Parallax Effect - Stacked images with depth perception
const CarouselParallaxEffect: FC<CarouselModeProps> = ({
  carouselImages,
  setApi,
  currentIndex,
}) => {
  return (
    <div className="relative h-full w-full">
      {carouselImages.map((item, index) => {
        const isActive = index === currentIndex
        const offset = (index - currentIndex) * 15
        return (
          <div
            key={index}
            className={cn(
              'absolute inset-0 h-full w-full transition-all duration-700 ease-out',
              isActive ? 'z-10 scale-100 opacity-100' : 'z-0 scale-[0.95] opacity-30',
            )}
            style={{
              transform: `translateX(${offset}px)`,
            }}
          >
            <PrismicImage field={item.image} className="h-full w-full object-cover" alt="" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>
        )
      })}
      {/* Hidden carousel for API control */}
      <div className="pointer-events-none absolute opacity-0">
        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="h-1 w-1">
          <CarouselContent>
            {carouselImages.map((_, index) => (
              <CarouselItem key={index} className="basis-full" />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

// Ken Burns Effect - Slow continuous zoom and pan animation
const CarouselKenBurnsEffect: FC<CarouselModeProps> = ({
  carouselImages,
  setApi,
  currentIndex,
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {carouselImages.map((item, index) => {
        const isActive = index === currentIndex
        return (
          <div
            key={index}
            className={cn(
              'absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-1000',
              isActive ? 'z-10 opacity-100' : 'z-0 opacity-0',
            )}
          >
            <div
              className={cn(
                'duration-[8000ms] h-full w-full transition-transform ease-in-out',
                isActive && 'animate-kenburns',
              )}
            >
              <PrismicImage field={item.image} className="h-full w-full object-cover" alt="" />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
          </div>
        )
      })}
      {/* Hidden carousel for API control */}
      <div className="pointer-events-none absolute opacity-0">
        <Carousel setApi={setApi} opts={{ align: 'start', loop: true }} className="h-1 w-1">
          <CarouselContent>
            {carouselImages.map((_, index) => (
              <CarouselItem key={index} className="basis-full" />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <style jsx>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.1) translate(2%, 1%);
          }
          100% {
            transform: scale(1.15) translate(-1%, -1%);
          }
        }
        .animate-kenburns {
          animation: kenburns 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Hero
