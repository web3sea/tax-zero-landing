"use client"

import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'

function MoneyMasteredSection() {
  useEffect(() => {
    const element = document.getElementById("try-our-dashboard");
    if (element && window.location.pathname === "/") {
      element.style.display = "block";
    }
  }, []);

  return (
    <section className="py-20 bg-design-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl font-light leading-tight text-design-primary mb-6 tracking-tight">
              Your money. Mastered.
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed font-proxima">
                Work with a dedicated CFP® professional who transforms your goals into a clear, step-by-step plan. With ongoing guidance across every part of your financial life, you'll have a personalized, integrated strategy that turns your goals into reality.
              </p>
              <p className="text-lg leading-relaxed font-proxima">
                Get clarity with an interactive dashboard to see your progress- letting you get back to focusing on what matters most.
              </p>
            </div>
            <a 
              id="try-our-dashboard"
              href="https://app.domainmoney.com/demo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 w-fit inline-block border-2 border-design-primary bg-white text-design-primary px-6 py-3 rounded-full hover:bg-design-primary hover:text-white transition-colors font-proxima"
              style={{display: 'none'}}
            >
              Try our dashboard
            </a>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <img 
              src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68dedc65412d434684ad71ab_Mastered_your_money_image%402x.webp"
              alt="portfolio summary with insights"
              className="w-full h-auto rounded-lg"
              loading="lazy"
              width="618"
              sizes="(max-width: 767px) 100vw, 618px"
              srcSet="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68dedc65412d434684ad71ab_Mastered_your_money_image%402x-p-500.webp 500w, https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68dedc65412d434684ad71ab_Mastered_your_money_image%402x-p-800.webp 800w, https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68dedc65412d434684ad71ab_Mastered_your_money_image%402x-p-1080.webp 1080w, https://cdn.prod.website-files.com/63e3f19232673131c9312b06/68dedc65412d434684ad71ab_Mastered_your_money_image%402x.webp 1236w"
            />
            <p className="text-center text-sm text-gray-600 mt-4 font-proxima">
              <em>For Illustrative Purposes Only</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MoneyMasteredSection, isEqual)
