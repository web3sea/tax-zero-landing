import { FC } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicNextLink } from '@prismicio/next'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const poster = slice.primary.video_url ?? ''

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex h-auto items-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full" data-poster-url={poster} id="hero-video">
        {slice.primary.video_url ? (
          <video
            id="hero-video-element"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            poster={poster}
          >
            <source src={slice.primary.video_url} />
          </video>
        ) : (
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${poster}')` }}
          />
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-auto flex-col items-start justify-between py-20 lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-xl lg:px-8">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="mb-6 font-serif text-5xl font-light leading-tight text-white lg:text-7xl">
                    {children}
                  </h1>
                ),
              }}
            />
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <h2 className="mb-8 font-proxima text-xl font-light leading-relaxed text-white/90 lg:text-2xl">
                    {children}
                  </h2>
                ),
              }}
            />
            {slice.primary.button ? (
              <PrismicNextLink
                field={slice.primary.button}
                className="group inline-flex items-center rounded-full bg-white px-8 py-2 transition-colors hover:bg-gray-100"
              >
                <span className="mr-3 font-proxima text-xl">
                  {slice.primary.button.text ?? 'Free Strategy Session'}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-design-accent transition-colors group-hover:bg-design-accent-dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
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
              </PrismicNextLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
