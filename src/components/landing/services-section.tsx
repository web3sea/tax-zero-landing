import { memo } from 'react'
import isEqual from 'react-fast-compare'

function ServicesSection() {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M7.50333 36.0851H37.5167M7.50333 28.5817L15.0067 17.3267L22.51 21.0784L30.0133 11.6992L37.5167 19.2026" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M7.50333 36.084H37.5167" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "Investments",
      description: "Smart, diversified strategies that grow with you."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M17.2158 26.7045L28.4708 15.4495M19.0917 16.3874C19.0917 16.9054 18.6717 17.3253 18.1538 17.3253C17.6358 17.3253 17.2158 16.9054 17.2158 16.3874C17.2158 15.8694 17.6358 15.4495 18.1538 15.4495C18.6717 15.4495 19.0917 15.8694 19.0917 16.3874ZM28.4708 25.7666C28.4708 26.2846 28.0509 26.7045 27.5329 26.7045C27.0149 26.7045 26.595 26.2846 26.595 25.7666C26.595 25.2486 27.0149 24.8286 27.5329 24.8286C28.0509 24.8286 28.4708 25.2486 28.4708 25.7666ZM9.7125 39.8353V9.82198C9.7125 8.82698 10.1078 7.87272 10.8113 7.16915C11.5149 6.46558 12.4692 6.07031 13.4642 6.07031H32.2225C33.2175 6.07031 34.1718 6.46558 34.8753 7.16915C35.5789 7.87272 35.9742 8.82698 35.9742 9.82198V39.8353L30.3467 36.0836L26.595 39.8353L22.8433 36.0836L19.0917 39.8353L15.34 36.0836L9.7125 39.8353Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M17.2158 26.7042L28.4708 15.4492M19.0917 16.3871C19.0917 16.9051 18.6718 17.3251 18.1538 17.3251C17.6358 17.3251 17.2158 16.9051 17.2158 16.3871C17.2158 15.8691 17.6358 15.4492 18.1538 15.4492C18.6718 15.4492 19.0917 15.8691 19.0917 16.3871ZM28.4708 25.7663C28.4708 26.2843 28.0509 26.7042 27.5329 26.7042C27.0149 26.7042 26.595 26.2843 26.595 25.7663C26.595 25.2483 27.0149 24.8284 27.5329 24.8284C28.0509 24.8284 28.4708 25.2483 28.4708 25.7663Z" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "Taxes",
      description: "Potentially cut your tax bill with proactive planning."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M19.4249 4.19531V32.3328M13.7974 41.712C11.8074 41.712 9.89893 40.9214 8.49178 39.5143C7.08464 38.1072 6.29411 36.1987 6.29411 34.2086C6.29411 33.7111 6.49174 33.234 6.84353 32.8822C7.19531 32.5304 7.67244 32.3328 8.16994 32.3328H38.1833C38.6808 32.3328 39.1579 32.5304 39.5097 32.8822C39.8615 33.234 40.0591 33.7111 40.0591 34.2086C40.0591 36.1987 39.2686 38.1072 37.8614 39.5143C36.4543 40.9214 34.5458 41.712 32.5558 41.712H13.7974ZM17.8474 5.0582C17.9956 4.82751 18.1925 4.63212 18.4244 4.48579C18.6563 4.33945 18.9174 4.24572 19.1894 4.21121C19.4614 4.17669 19.7377 4.20223 19.9988 4.28601C20.2599 4.3698 20.4994 4.5098 20.7005 4.69616L39.4157 21.5411C39.703 21.7922 39.907 22.125 40.0003 22.495C40.0936 22.865 40.0718 23.2547 39.9379 23.612C39.804 23.9693 39.5643 24.2773 39.2508 24.4948C38.9373 24.7123 38.5649 24.8291 38.1833 24.8295H8.16994C7.82801 24.8296 7.49255 24.7362 7.19983 24.5595C6.90712 24.3827 6.66828 24.1293 6.50913 23.8267C6.34999 23.5241 6.27659 23.1837 6.29689 22.8423C6.31718 22.501 6.43038 22.1717 6.62426 21.89L17.8474 5.0582Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M17.8474 5.05722C17.9956 4.82654 18.1926 4.63115 18.4244 4.48481C18.6563 4.33848 18.9175 4.24475 19.1895 4.21023C19.4615 4.17572 19.7377 4.20125 19.9988 4.28504C20.2599 4.36883 20.4994 4.50883 20.7005 4.69519L39.4157 21.5402C39.7031 21.7913 39.907 22.124 40.0003 22.494C40.0936 22.864 40.0718 23.2537 39.9379 23.611C39.804 23.9683 39.5643 24.2763 39.2508 24.4938C38.9373 24.7114 38.5649 24.8281 38.1833 24.8285H8.16997C7.82804 24.8286 7.49258 24.7352 7.19986 24.5585C6.90715 24.3818 6.66831 24.1284 6.50916 23.8257C6.35002 23.5231 6.27663 23.1827 6.29692 22.8414C6.31721 22.5 6.43041 22.1707 6.62429 21.8891L17.8474 5.05722Z" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "Retirement",
      description: "Build freedom on your timeline."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M27.8976 21.2773V21.2904" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M10.5465 16.6492C9.77204 16.054 9.17726 15.2563 8.82786 14.3442C8.47847 13.4321 8.38807 12.4412 8.56664 11.4809C8.74522 10.5206 9.18582 9.62844 9.83976 8.90293C10.4937 8.17742 11.3355 7.64684 12.2721 7.36983C13.2087 7.09283 14.2037 7.08018 15.1471 7.3333C16.0904 7.58642 16.9454 8.09544 17.6176 8.8041C18.2898 9.51276 18.7529 10.3935 18.9558 11.3489C19.1587 12.3043 19.0935 13.2972 18.7674 14.2179" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M29.6633 8.91797V15.6328C31.8485 16.8973 33.5122 18.8983 34.3565 21.2777H36.7242C37.1925 21.2777 37.6416 21.4637 37.9727 21.7948C38.3039 22.1259 38.4899 22.5751 38.4899 23.0433V26.5747C38.4899 27.043 38.3039 27.4921 37.9727 27.8232C37.6416 28.1543 37.1925 28.3403 36.7242 28.3403H34.3547C33.7614 30.0177 32.7532 31.5186 31.4272 32.7069V36.2859C31.4272 36.9883 31.1482 37.662 30.6515 38.1586C30.1548 38.6553 29.4811 38.9344 28.7787 38.9344C28.0763 38.9344 27.4026 38.6553 26.9059 38.1586C26.4092 37.662 26.1302 36.9883 26.1302 36.2859V35.2565C25.5467 35.3542 24.9561 35.4032 24.3645 35.403H17.3018C16.7102 35.4032 16.1197 35.3542 15.5362 35.2565V36.2859C15.5362 36.9883 15.2571 37.662 14.7604 38.1586C14.2638 38.6553 13.5901 38.9344 12.8877 38.9344C12.1852 38.9344 11.5116 38.6553 11.0149 38.1586C10.5182 37.662 10.2392 36.9883 10.2392 36.2859V32.7545V32.7069C8.6394 31.2766 7.51169 29.3942 7.00531 27.309C6.49893 25.2237 6.63775 23.0338 7.40339 21.0291C8.16904 19.0244 9.52542 17.2996 11.293 16.0828C13.0605 14.866 15.156 14.2146 17.3018 14.215H21.716L29.6615 8.91797H29.6633Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "Cash flow",
      description: "Know where every dollar goes and why."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M19.135 37.998L19.1237 28.6149C19.1225 27.5785 19.9616 26.7373 20.9981 26.736L24.7513 26.7315" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M5.97766 20.3377L20.4097 7.93706C21.8138 6.73058 23.8879 6.7281 25.2949 7.9312L39.7567 20.2972" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M22.8884 37.9942L5.99887 38.0145" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M29.6567 11.6609L29.6517 7.49144C29.6508 6.71413 30.2802 6.08323 31.0575 6.0823L35.9196 6.07647C36.6969 6.07554 37.3278 6.70492 37.3288 7.48224L37.3417 18.2322" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M8.3874 18.2665L8.41107 38.0115" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M35.0884 39.855C35.0841 36.2275 32.1399 33.2904 28.5124 33.2947C32.1399 33.2904 35.077 30.3462 35.0727 26.7187C35.077 30.3462 38.0212 33.2833 41.6487 33.279C38.0212 33.2833 35.0841 36.2275 35.0884 39.855Z" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "Real estate",
      description: "Make property work for your goals."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <path d="M15.6733 22.9536H30.6799M23.1766 15.4503V30.457M41.9349 22.9536C41.9349 33.3136 33.5365 41.712 23.1766 41.712C12.8167 41.712 4.41827 33.3136 4.41827 22.9536C4.41827 12.5937 12.8167 4.19531 23.1766 4.19531C33.5365 4.19531 41.9349 12.5937 41.9349 22.9536Z" stroke="#00303C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M15.6733 22.9526H30.68M23.1767 15.4492V30.4559" stroke="#FF6B1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      title: "More",
      description: "Equity compensation, education savings, insurance, estate planning, and long-term care."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-start text-left">
              <div className="mb-4 lg:mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-design-primary mb-3 lg:mb-4 leading-tight font-proxima">{service.title}</h3>
              <p className="text-design-primary text-sm leading-relaxed font-proxima">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ServicesSection, isEqual)
