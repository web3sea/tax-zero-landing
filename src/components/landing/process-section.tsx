import { memo } from 'react'
import isEqual from 'react-fast-compare'
import ProcessCard from './process/process-card'

function ProcessSection() {
  const steps = [
    {
      image: "https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68ded866a2dafadc944bdc83_Step1.png",
      imageAlt: "Step 1 Advisor gets to know you"
    },
    {
      image: "https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68cc11cddc3220f4b54d3a28_goals-faster-step-2.webp",
      imageAlt: "Step 2 Build personalized roadmap"
    },
    {
      image: "https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68ded9129d73f3a802f900ce_Step3%402x.png",
      imageAlt: "Step 3 Stay ahead all year long"
    }
  ]

  return (
    <section className="py-20 bg-design-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl lg:text-6xl font-light leading-tight mb-6 tracking-tight">
            How we help you reach more goals – faster
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-proxima">
            Three simple steps to transform your financial future with expert guidance that evolves with your life.
          </p>
        </div>

        {/* Three Steps - Cards with built-in arrows */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="w-full">
              <ProcessCard
                image={step.image}
                imageAlt={step.imageAlt}
                isLast={index === steps.length - 1}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white text-sm font-proxima italic mb-10">
            For Illustrative Purposes Only
          </p>
          <a
            href="/our-process"
            style={
              {
                padding: '.8rem 2rem',
                boxShadow: 'none',
                borderColor: 'hsl(var(--design-primary))',
              }}
            className="font-proxima inline-block bg-white text-design-primary rounded-full font-normal shadow-none transition-all duration-200 hover:bg-design-card-bg hover:text-design-primary focus:outline-none"
          >
            See how we work with you
          </a>
        </div>
      </div>
    </section>
  );
}

export default memo(ProcessSection, isEqual)
