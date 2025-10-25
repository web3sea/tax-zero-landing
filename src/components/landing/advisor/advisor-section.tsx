'use client'

import React, { memo, useState, useRef, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import styles from './advisor-section.module.css'

function AdvisorSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const swiperRef = useRef<any>(null)

  const advisors = [
    { name: 'Michael', slug: 'michael-lacivita', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Kevin', slug: 'kevin-cavanaugh', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp ' },
    { name: 'Laura', slug: 'laura-ryan', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'David', slug: 'david-jackson', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Matthew', slug: 'matthew-forney', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Chelsea', slug: 'chelsea', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Emily', slug: 'emily-barbe', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Tyson', slug: 'tyson-fuller', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Alicija', slug: 'alicija-dearth', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Christine', slug: 'christine-damico', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' },
    { name: 'Adrianna', slug: 'adrianna-adams', image: 'https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68386ab1fe5e05e4fe21baed_Emily-2.webp' }
  ]

  return (
    <section className="py-12 md:py-20 text-white">
      <div className="bg-design-primary rounded-2xl md:rounded-3xl shadow-lg max-w-[1440px] py-12 md:py-20 mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-4 md:mb-6 tracking-tight">
              Meet Your Money Mentor, Partner and Coach
            </h2>
            <p className="text-lg md:text-xl text-design-card-bg leading-relaxed mb-6 md:mb-8 font-proxima max-w-3xl mx-auto lg:mx-0">
              Get paired with an expert CERTIFIED FINANCIAL PLANNER® professional who knows you. No rotating advisors, no sales pressure, and no hidden fees. Just unbiased expertise tailored to your goals, budget, and timeline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8">
              <a 
                href="/advisors" 
                className="inline-flex items-center bg-white text-design-primary px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-gray-100 transition-colors text-base md:text-lg font-proxima w-full sm:w-auto justify-center"
              >
                <span className="mr-4 md:mr-6">Get to know our advisors</span>
                <svg width="32" height="32" className="md:w-9 md:h-9" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="18.0058" cy="17.9619" rx="17.8389" ry="17.7764" fill="#e25f17"></ellipse>
                  <path d="M18.4882 23.7305L24.2772 17.9617L18.4882 12.1929" stroke="#112422" strokeWidth="1.61" strokeMiterlimit="10" strokeLinecap="square"></path>
                  <path d="M23.4728 17.9609L11.7339 17.9609" stroke="#112422" strokeWidth="1.61" strokeMiterlimit="10" strokeLinecap="square"></path>
                </svg>
              </a>
            </div>
            
            {/* Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 text-xs md:text-sm font-medium font-proxima text-center">
                0% AUM FEES
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 text-xs md:text-sm font-medium flex items-center font-proxima">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                FIDUCIARY DUTY
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 text-xs md:text-sm font-medium flex items-center font-proxima">
                <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                MONEY BACK GUARANTEE
                <svg className="w-2 h-2 md:w-3 md:h-3 ml-1 text-design-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>ư

      {/* Badges Dialog */}
      {isDialogOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsDialogOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-4xl max-h-[90vh] overflow-y-auto m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-4xl font-bold text-design-primary mb-2 font-proxima">The Domain Guarantees</h3>
                <p className="text-xl text-gray-600 font-proxima">Financial Planning Done Right. Guaranteed.</p>
              </div>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path d="M21.9998 40.3332C32.1251 40.3332 40.3332 32.1251 40.3332 21.9998C40.3332 11.8746 32.1251 3.6665 21.9998 3.6665C11.8746 3.6665 3.6665 11.8746 3.6665 21.9998C3.6665 32.1251 11.8746 40.3332 21.9998 40.3332Z" stroke="#112422" strokeWidth="2.44444" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M27.5 16.5L16.5 27.5" stroke="#112422" strokeWidth="2.44444" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M16.5 16.5L27.5 27.5" stroke="#112422" strokeWidth="2.44444" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            
            <p className="text-gray-700 mb-6 font-proxima">
              We believe in a transparent and results-oriented approach to financial planning. That's why we offer a series of industry-leading guarantees, designed to give you complete peace of mind and the confidence you deserve when it comes to your financial future.
            </p>
            
            <h4 className="text-2xl font-bold text-design-primary mb-4 font-proxima">Here's how it works:</h4>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <img 
                  src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/664df30c6b174ed60822f761_Flat%20Fee%20Badge.png" 
                  alt="Flat Fee Badge" 
                  className="w-16 h-16 flex-shrink-0"
                />
                <div>
                  <h5 className="font-bold text-xl text-design-primary mb-2 font-proxima">Flat Fee Advantage</h5>
                  <p className="text-gray-700 font-proxima">Your financial success shouldn't be hindered by hidden costs. Our flat-fee model means no 1% asset under management (AUM) fees and no commissions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <img 
                  src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/664df3379a42cf431e386205_Fiduciary%20Duty%20Badge.png" 
                  alt="Fiduciary Badge" 
                  className="w-16 h-16 flex-shrink-0"
                />
                <div>
                  <h5 className="font-bold text-xl text-design-primary mb-2 font-proxima">Fiduciary Protection</h5>
                  <p className="text-gray-700 font-proxima">We are a fiduciary, legally bound to prioritize your financial well-being. No pushing products, just unbiased advice tailored to your unique circumstances.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <img 
                  src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/664df30db66bbfa5ac82caa5_Money%20Back%20Badge.png" 
                  alt="Money Back Badge" 
                  className="w-16 h-16 flex-shrink-0"
                />
                <div>
                  <h5 className="font-bold text-xl text-design-primary mb-2 font-proxima">Money Back Guarantee</h5>
                  <p className="text-gray-700 font-proxima">We're so confident you'll love Domain Money, we offer a 100% satisfaction guarantee. No questions asked.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h5 className="font-bold text-xl text-design-primary mb-2 font-proxima">Feeling unsure? We understand!</h5>
              <p className="text-gray-700 mb-4 font-proxima">That's why we offer this guarantee. Get started today, knowing we're committed to your financial journey.</p>
              <a 
                href="https://domainmoney.com/assets/library/satisfaction-guarantee" 
                target="_blank" 
                className="text-design-primary hover:underline font-proxima"
              >
                Click here to learn more and see the full terms & conditions.
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default memo(AdvisorSection, isEqual)
