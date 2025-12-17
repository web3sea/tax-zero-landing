import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-secondary px-6 py-24">
      <div className="container mx-auto max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-brand-blue via-brand-navy-medium to-brand-navy bg-clip-text font-serif text-9xl font-bold text-transparent md:text-[12rem]">
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back on track.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="group inline-flex items-center rounded-full bg-primary px-8 py-4 font-sans text-lg font-medium text-primary-foreground shadow-xl transition-all hover:scale-105 hover:bg-accent hover:shadow-2xl"
        >
          <svg
            className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </main>
  )
}
