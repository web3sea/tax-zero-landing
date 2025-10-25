import { memo } from 'react'
import isEqual from 'react-fast-compare'

function MembershipSection() {
  const benefits = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M22.9551 25.0951V4.46094L37.9617 11.9643L22.9551 19.4676M39.0141 19.884C40.0123 22.9607 40.1057 26.2593 39.2832 29.3875C38.4606 32.5157 36.7568 35.3417 34.3743 37.5294C31.9919 39.7171 29.0311 41.1744 25.8443 41.7278C22.6575 42.2812 19.3788 41.9075 16.3982 40.6512C13.4176 39.3949 10.8607 37.3087 9.03167 34.641C7.2026 31.9733 6.17838 28.8364 6.08084 25.6033C5.98331 22.3703 6.81658 19.1773 8.48152 16.4042C10.1465 13.6311 12.573 11.3946 15.4724 9.96088M15.4555 19.462C14.5155 20.7132 13.9036 22.1797 13.6754 23.728C13.4472 25.2762 13.6101 26.8569 14.1492 28.3261C14.6882 29.7953 15.5863 31.1063 16.7617 32.1396C17.937 33.1728 19.3522 33.8956 20.8784 34.242C22.4045 34.5884 23.9931 34.5474 25.4993 34.1227C27.0056 33.6981 28.3816 32.9033 29.5021 31.8107C30.6226 30.7182 31.4519 29.3627 31.9145 27.8676C32.377 26.3726 32.4581 24.7856 32.1504 23.2512" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M22.9548 25.0951V4.46094L37.9614 11.9643L22.9548 19.4676" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "3% higher investing returns",
      description: "Working with the right financial expert can add up to 3% in net annual returns through better investment decisions, proactive tax planning, and behavioral coaching.¹"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M22.8465 30.7218V40.1009M30.3499 26.9701V40.1009M37.8532 19.4668V40.1009M41.6049 6.33594L25.3864 22.5544C25.2993 22.6417 25.1958 22.711 25.0818 22.7583C24.9679 22.8056 24.8457 22.8299 24.7224 22.8299C24.599 22.8299 24.4768 22.8056 24.3629 22.7583C24.2489 22.711 24.1454 22.6417 24.0583 22.5544L17.8831 16.3791C17.7072 16.2033 17.4687 16.1045 17.22 16.1045C16.9713 16.1045 16.7327 16.2033 16.5569 16.3791L4.0882 28.8459M7.83986 34.4734V40.1009M15.3432 26.9701V40.1009" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M41.6054 6.33594L25.3869 22.5544C25.2998 22.6417 25.1963 22.711 25.0824 22.7583C24.9684 22.8056 24.8462 22.8299 24.7229 22.8299C24.5995 22.8299 24.4774 22.8056 24.3634 22.7583C24.2495 22.711 24.146 22.6417 24.0588 22.5544L17.8836 16.3791C17.7077 16.2033 17.4692 16.1045 17.2205 16.1045C16.9718 16.1045 16.7333 16.2033 16.5574 16.3791L4.08871 28.8459" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "Up to 4x more wealth",
      description: "A clear, written financial plan can help you build 2–4x more wealth by retirement—because maximizing your potential starts with having the right plan.²"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M28.1233 21.543V21.556" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M10.7723 16.9149C9.99787 16.3197 9.40309 15.5219 9.05369 14.6098C8.7043 13.6977 8.6139 12.7068 8.79247 11.7465C8.97105 10.7863 9.41165 9.89406 10.0656 9.16855C10.7195 8.44304 11.5613 7.91246 12.4979 7.63546C13.4346 7.35845 14.4295 7.34581 15.3729 7.59893C16.3163 7.85204 17.1713 8.36106 17.8434 9.06972C18.5156 9.77838 18.9787 10.6591 19.1816 11.6145C19.3846 12.5699 19.3194 13.5628 18.9933 14.4835" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M29.889 9.18359V15.8984C32.0742 17.1629 33.7379 19.164 34.5822 21.5433H36.9499C37.4182 21.5433 37.8673 21.7293 38.1985 22.0604C38.5296 22.3916 38.7156 22.8407 38.7156 23.309V26.8403C38.7156 27.3086 38.5296 27.7577 38.1985 28.0888C37.8673 28.4199 37.4182 28.606 36.9499 28.606H34.5804C33.9871 30.2834 32.9789 31.7842 31.6529 32.9725V36.5515C31.6529 37.2539 31.3739 37.9276 30.8772 38.4243C30.3805 38.921 29.7068 39.2 29.0044 39.2C28.302 39.2 27.6283 38.921 27.1316 38.4243C26.635 37.9276 26.3559 37.2539 26.3559 36.5515V35.5221C25.7724 35.6198 25.1818 35.6689 24.5902 35.6687H17.5276C16.936 35.6689 16.3454 35.6198 15.7619 35.5221V36.5515C15.7619 37.2539 15.4828 37.9276 14.9862 38.4243C14.4895 38.921 13.8158 39.2 13.1134 39.2C12.411 39.2 11.7373 38.921 11.2406 38.4243C10.7439 37.9276 10.4649 37.2539 10.4649 36.5515V33.0202V32.9725C8.86511 31.5422 7.7374 29.6599 7.23102 27.5746C6.72463 25.4893 6.86345 23.2994 7.6291 21.2947C8.39475 19.2901 9.75112 17.5652 11.5187 16.3484C13.2863 15.1316 15.3817 14.4803 17.5276 14.4806H21.9417L29.8873 9.18359H29.889Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "350+ hours saved",
      description: "Trying to manage your finances alone is complex and time-consuming. Imagine what you could accomplish with an extra 350+ hours each year.³"
    }
  ];

  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl lg:text-6xl font-light leading-tight text-design-primary mb-6 tracking-tight">
            Membership that pays for itself
          </h2>
          <p className="text-xl text-design-primary max-w-6xl mx-auto font-proxima">
            From smarter tax strategies to better investment decisions, get measurable results that justify the membership cost and then some.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-design-card-bg p-8 rounded-xl">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-design-primary mb-4 font-proxima">{benefit.title}</h3>
              <p className="text-gray-600 font-proxima">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://domainmoney.com/schedule"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-proxima items-center bg-design-accent hover:bg-design-accent-light text-white px-2 py-2 rounded-full transition-colors duration-200 shadow-md mx-auto text-lg"
          >
            <span className="ml-4 mr-4 text-xl font-proxima">Free Strategy Session</span>
            <img 
              src="https://cdn.prod.website-files.com/63e3f19232673131c9312b06/65ea5b3a9d1f3fed99b285ed_Group%203010%20(1).svg" 
              alt="Arrow" 
              className="w-10 h-10"
            />
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-black font-proxima">
            Vanguard Research, "Putting a value on your value: Quantifying Vanguard Advisor's Alpha," which identifies approximately 3% in potential net returns through financial guidance, proper asset allocation, cost-effective implementation, rebalancing, behavioral coaching, and tax strategies. &nbsp;
            {/* https://advisors.vanguard.com/insights/article/IWE_ResPuttingAValueOnValue. */}
            2. Based on 2023 T. Rowe Price Retirement Savings and Spending Study that showed individuals with a formal plan were over two to almost four times wealthier than pre-retirees without a plan. 
            https://www.prnewswire.com/news-releases/two-thirds-of-americans-say-their-financial-planning-needs-improvement-301881539.html.
            3. Based on a US Bureau of Labor Statistics 2023 American Time Use Survey that showed, among the top Americans who engage in financial planning themselves, they typically spend 59 minutes a day managing their money.
            https://www.bls.gov/news.release/pdf/atus.pdf
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(MembershipSection, isEqual)
