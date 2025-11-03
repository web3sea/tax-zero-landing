import { memo } from 'react'
import isEqual from 'react-fast-compare'

interface ProcessCardProps {
  image: string
  imageAlt: string
  isLast: boolean
}

function ProcessCard({ image, imageAlt, isLast }: ProcessCardProps) {
  return (
    <div className="relative flex w-full flex-col items-center">
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        width={406}
        sizes="(max-width: 479px) 100vw, 406px"
        className="w-full"
      />
      {!isLast && (
        <>
          {/* Desktop arrow - hidden on mobile */}
          <img
            src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68cc107facc509e54e50188f_goals-faster-arrow.webp"
            loading="lazy"
            alt="Orange arrow"
            className="absolute right-[-30px] top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform lg:block"
          />
          {/* Mobile arrow - shown on mobile/tablet */}
          <img
            src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68cc107facc509e54e50188f_goals-faster-arrow.webp"
            loading="lazy"
            alt="Orange arrow"
            className="mt-4 h-10 w-10 rotate-90 transform lg:hidden"
          />
        </>
      )}
    </div>
  )
}

export default memo(ProcessCard, isEqual)
