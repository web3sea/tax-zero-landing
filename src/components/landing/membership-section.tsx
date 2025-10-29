import { memo } from 'react'
import Image from 'next/image'
import isEqual from 'react-fast-compare'

function MembershipSection() {
  const benefits = [
    {
      icon: '/svg/icons/investing-returns.svg',
      title: '3% higher investing returns',
      description:
        "Working with the right financial expert can add up to 3% in net annual returns through better investment decisions, proactive tax planning, and behavioral coaching.¹",
    },
    {
      icon: '/svg/icons/more-wealth.svg',
      title: 'Up to 4x more wealth',
      description:
        "A clear, written financial plan can help you build 2–4x more wealth by retirement—because maximizing your potential starts with having the right plan.²",
    },
    {
      icon: '/svg/icons/hours-saved.svg',
      title: '350+ hours saved',
      description:
        'Trying to manage your finances alone is complex and time-consuming. Imagine what you could accomplish with an extra 350+ hours each year.³',
    },
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
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                <Image src={benefit.icon} alt={`${benefit.title} icon`} width={46} height={46} />
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
            <Image
              src="/svg/icons/arrow-right.svg"
              alt="Arrow"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </a>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-black font-proxima">
            Vanguard Research, &quot;Putting a value on your value: Quantifying Vanguard Advisor&#39;s Alpha,&quot; which identifies approximately 3% in potential net returns through financial guidance, proper asset allocation, cost-effective implementation, rebalancing, behavioral coaching, and tax strategies. &nbsp;
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
