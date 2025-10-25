import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Marquee } from '@/components/ui/marquee'

function FeaturedSection() {
  const LogoImage = () => (
    <img
      src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68484423e990f32d771e1fe6_News%20Logos-3.svg"
      loading="lazy"
      width="2219"
      alt="Featured publications logos"
      className="h-10 w-auto flex-shrink-0 select-none"
    />
  );

  return (
    <section className="py-16 bg-design-card-bg overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl text-black mb-8">Featured in</h3>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:120s]">
            <LogoImage />
            <LogoImage />
            <LogoImage />
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturedSection, isEqual)
