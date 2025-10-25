import { memo } from 'react'
import isEqual from 'react-fast-compare'

function WhyDomainSection() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
          <path d="M8.32367 9.1875L31.892 32.7575" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M20.1087 37.638C29.3134 37.638 36.7753 30.1761 36.7753 20.9714C36.7753 11.7666 29.3134 4.30469 20.1087 4.30469C10.9039 4.30469 3.44202 11.7666 3.44202 20.9714C3.44202 30.1761 10.9039 37.638 20.1087 37.638Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "No AUM Fees – ever",
      description: "Transparent, flat-fee pricing. And never any hidden costs or assets under management (AUM) fees."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
          <path d="M15.6736 20.9781L19.0078 24.3123L25.6761 17.644M34.0115 22.6452C34.0115 30.9806 28.1767 35.1483 21.2417 37.5655C20.8785 37.6886 20.4841 37.6827 20.1247 37.5488C13.173 35.1482 7.33828 30.9806 7.33828 22.6452V10.9757C7.33828 10.5335 7.51392 10.1095 7.82655 9.79689C8.13919 9.48425 8.56322 9.30861 9.00535 9.30861C12.3395 9.30861 16.5072 7.30812 19.4079 4.77417C19.7611 4.47243 20.2103 4.30664 20.6749 4.30664C21.1394 4.30664 21.5887 4.47243 21.9418 4.77417C24.8592 7.32479 29.0102 9.30861 32.3444 9.30861C32.7865 9.30861 33.2105 9.48425 33.5232 9.79689C33.8358 10.1095 34.0115 10.5335 34.0115 10.9757V22.6452Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M15.6733 20.9787L19.0075 24.3128L25.6758 17.6445" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "Best-in-class security",
      description: "Fully-encrypted data protected; 2-factor authentication."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
          <path d="M27.5567 35.9727V32.6393C27.5567 30.8712 26.8543 29.1755 25.604 27.9253C24.3538 26.675 22.6581 25.9727 20.89 25.9727H10.89C9.12188 25.9727 7.42619 26.675 6.17595 27.9253C4.92571 29.1755 4.22333 30.8712 4.22333 32.6393V35.9727M27.5567 6.18599C28.9863 6.55661 30.2523 7.39143 31.1561 8.55943C32.0599 9.72742 32.5503 11.1625 32.5503 12.6393C32.5503 14.1162 32.0599 15.5512 31.1561 16.7192C30.2523 17.8872 28.9863 18.722 27.5567 19.0927M37.5567 35.9727V32.6393C37.5556 31.1622 37.0639 29.7273 36.1589 28.5598C35.254 27.3924 33.9869 26.5586 32.5567 26.1893M22.5567 12.6393C22.5567 16.3212 19.5719 19.306 15.89 19.306C12.2081 19.306 9.22333 16.3212 9.22333 12.6393C9.22333 8.95742 12.2081 5.97266 15.89 5.97266C19.5719 5.97266 22.5567 8.95742 22.5567 12.6393Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M27.5554 6.18555C28.985 6.55616 30.251 7.39099 31.1548 8.55898C32.0586 9.72698 32.549 11.162 32.549 12.6389C32.549 14.1157 32.0586 15.5508 31.1548 16.7188C30.251 17.8868 28.985 18.7216 27.5554 19.0922M37.5554 35.9722V32.6389C37.5543 31.1618 37.0626 29.7268 36.1576 28.5594C35.2527 27.392 33.9856 26.5582 32.5554 26.1889" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "CFP® professionals",
      description: "Delivering unbiased, expert advice as a true fiduciary, acting in the best interests of the client."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-design-card-bg p-8 rounded-2xl">
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl text-design-primary mb-4 font-serif">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-proxima">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WhyDomainSection, isEqual)
