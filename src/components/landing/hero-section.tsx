"use client"

import { memo, useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkIfVideoIsPlaying = async () => {
      const heroVideo = videoRef.current;
      if (!heroVideo) return;

      try {
        if (heroVideo.paused) {
          await heroVideo.play();
          if (heroVideo.paused) {
            throw 'Error playing video';
          }
        }
      } catch (e) {
        // Fallback to background image if video fails
        const videoContainer = heroVideo.parentElement;
        if (videoContainer) {
          videoContainer.style.zIndex = '-1';
          videoContainer.style.backgroundSize = 'cover';
          videoContainer.style.backgroundPosition = 'center';
          videoContainer.style.backgroundImage = 'url("https://cdn.prod.website-files.com/63e3f19232673131c9312b06/660d232901d841cc8d7c40ae_Mask%20group.png")';
        }
      }
    };

    checkIfVideoIsPlaying();
  }, []);

  return (
    <section className="relative h-auto flex items-center overflow-hidden">
      {/* Video Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        data-poster-url="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/65f44feae59a986a6ee8bdff_DM_no_Titles-poster-00001.jpg"
        data-video-urls="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/65f44feae59a986a6ee8bdff_DM_no_Titles-transcode.mp4,https://cdn.prod.website-files.com/63e3f19232673131c9312b06/65f44feae59a986a6ee8bdff_DM_no_Titles-transcode.webm"
        data-autoplay="true"
        data-loop="true"
        id="hero-video"
      >
        <video
          ref={videoRef}
          id="hero-video-element"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/65f44feae59a986a6ee8bdff_DM_no_Titles-poster-00001.jpg"
        >
          <source src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/65f44feae59a986a6ee8bdff_DM_no_Titles-transcode.mp4" type="video/mp4" />
          <source src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/65f44feae59a986a6ee8bdff_DM_no_Titles-transcode.webm" type="video/webm" />
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between h-auto py-20">
          {/* Left Content */}
          <div className="flex-1 lg:max-w-xl lg:px-8">
            <h1 className="text-5xl lg:text-7xl font-serif font-light leading-tight mb-6 text-white">
              Turn your financial <em className="italic">dreams</em> into <em className="italic">reality</em>
            </h1>
            <h2 className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 font-light font-proxima">
              Get ahead with flat fee, expert financial advice for investing, taxes, real estate and more.
            </h2>
            <a 
              href="/free-consultation" 
              className="inline-flex items-center bg-white px-8 py-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <span className="mr-3 text-xl font-proxima">Free Strategy Session</span>
              <div className="w-12 h-12 bg-design-accent rounded-full flex items-center justify-center group-hover:bg-design-accent-dark transition-colors">
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroSection, isEqual)
