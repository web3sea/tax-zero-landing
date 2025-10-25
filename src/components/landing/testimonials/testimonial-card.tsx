import { memo } from 'react'
import isEqual from 'react-fast-compare'

interface TestimonialCardProps {
  text: string
  author: string
  rating: number
  avatar: string
}

function TestimonialCard({ text, author, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl min-w-[450px] max-w-[450px] flex-shrink-0 relative border border-gray-200 flex flex-col" style={{ minHeight: 380 }}>
      {/* Star Rating */}
      <div className="flex space-x-2 mb-6 pt-2">
        {[...Array(rating)].map((_, i) => (
          <svg
            key={i}
            className="w-7 h-7 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="font-serif text-[1.14rem] text-gray-800 mb-8 leading-7 flex-1">
        "{text}"
      </p>

      {/* Author Name - Always at Bottom */}
      <div className="flex items-center gap-5 mt-2">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={avatar}
            alt={author}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-serif font-bold text-lg text-black">{author}</div>
      </div>
    </div>
  )
}

export default memo(TestimonialCard, isEqual)
