import { memo } from 'react'
import isEqual from 'react-fast-compare'

function ProcessArrow() {
  return (
    <div className="mx-4 flex items-center justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default memo(ProcessArrow, isEqual)
