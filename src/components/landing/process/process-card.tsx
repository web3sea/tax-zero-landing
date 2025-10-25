import { memo } from 'react'
import isEqual from 'react-fast-compare'

interface ProcessCardProps {
    image: string
    imageAlt: string
    isLast: boolean
}

function ProcessCard({ image, imageAlt, isLast }: ProcessCardProps) {
    return (
        <div className="relative w-full flex flex-col items-center">
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
                        className="hidden lg:block absolute right-[-30px] z-10 top-1/2 transform -translate-y-1/2 w-10 h-10"
                    />
                    {/* Mobile arrow - shown on mobile/tablet */}
                    <img
                        src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68cc107facc509e54e50188f_goals-faster-arrow.webp"
                        loading="lazy"
                        alt="Orange arrow"
                        className="lg:hidden mt-4 transform rotate-90 w-10 h-10"
                    />
                </>
            )}
        </div>
    )
}

export default memo(ProcessCard, isEqual)
