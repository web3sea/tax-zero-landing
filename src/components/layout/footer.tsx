import { memo } from 'react'
import isEqual from 'react-fast-compare'

function Footer() {
  return (
    <footer className="bg-[#00303c] text-white rounded-t-[2.5rem]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Branding and Social Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-2xl font-bold text-white mb-4">
                Domain Money
              </div>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/domainmoney/" target="_blank" rel="noopener noreferrer" className="w-6 h-6">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/domainmoney" target="_blank" rel="noopener noreferrer" className="w-6 h-6">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/domainmoney" target="_blank" rel="noopener noreferrer" className="w-6 h-6">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">Team</a></li>
              <li><a href="mailto:press@domainmoney.com" className="text-sm text-gray-300 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Plans Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Plans</h3>
            <ul className="space-y-2">
              <li><a href="https://www.domainmoney.com/essential" className="text-sm text-gray-300 hover:text-white transition-colors">Essential</a></li>
              <li><a href="https://www.domainmoney.com/strategic" className="text-sm text-gray-300 hover:text-white transition-colors">Strategic</a></li>
              <li><a href="https://www.domainmoney.com/comprehensive" className="text-sm text-gray-300 hover:text-white transition-colors">Comprehensive</a></li>
              <li><a href="https://www.domainmoney.com/membership" className="text-sm text-gray-300 hover:text-white transition-colors">Membership</a></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <ul className="space-y-2">
                <li><a href="/services/financial-wellness" className="text-sm text-gray-300 hover:text-white transition-colors">Financial Wellness</a></li>
                <li><a href="/services/investing" className="text-sm text-gray-300 hover:text-white transition-colors">Investing</a></li>
                <li><a href="/services/retirement-planning" className="text-sm text-gray-300 hover:text-white transition-colors">Retirement Planning</a></li>
                <li><a href="/services/family-planning" className="text-sm text-gray-300 hover:text-white transition-colors">Family Planning</a></li>
                <li><a href="/services/estate-planning" className="text-sm text-gray-300 hover:text-white transition-colors">Estate Planning</a></li>
                <li><a href="/services/financial-planning" className="text-sm text-gray-300 hover:text-white transition-colors">Financial Planning</a></li>
                <li><a href="/services/real-estate" className="text-sm text-gray-300 hover:text-white transition-colors">Real Estate</a></li>
                <li><a href="/services/education-planning" className="text-sm text-gray-300 hover:text-white transition-colors">Education Planning</a></li>
              </ul>
              <ul className="space-y-2">
                <li><a href="/services/insurance-planning" className="text-sm text-gray-300 hover:text-white transition-colors">Insurance Planning</a></li>
                <li><a href="/services/taxes" className="text-sm text-gray-300 hover:text-white transition-colors">Taxes</a></li>
                <li><a href="/services/planning-for-a-baby" className="text-sm text-gray-300 hover:text-white transition-colors">Planning for a Baby</a></li>
                <li><a href="/services/combining-finances" className="text-sm text-gray-300 hover:text-white transition-colors">Combining Finances</a></li>
                <li><a href="/services/career-planning" className="text-sm text-gray-300 hover:text-white transition-colors">Career Planning</a></li>
                <li><a href="/services/cash-flow" className="text-sm text-gray-300 hover:text-white transition-colors">Cash Flow</a></li>
                <li><a href="/services/equity-compensation" className="text-sm text-gray-300 hover:text-white transition-colors">Equity Compensation</a></li>
              </ul>
            </div>
          </div>

          {/* Meet Our Advisors Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Meet Our Advisors</h3>
            <ul className="space-y-2">
              <li><a href="/advisors/adrianna-adams" className="text-sm text-gray-300 hover:text-white transition-colors">Adrianna Adams</a></li>
              <li><a href="/advisors/emily-barbe" className="text-sm text-gray-300 hover:text-white transition-colors">Emily Barbe</a></li>
              <li><a href="/advisors/alicija-dearth" className="text-sm text-gray-300 hover:text-white transition-colors">Alicija Dearth</a></li>
              <li><a href="/advisors/christine-damico" className="text-sm text-gray-300 hover:text-white transition-colors">Christine Damico</a></li>
              <li><a href="/advisors/michael-lacivita" className="text-sm text-gray-300 hover:text-white transition-colors">Michael LaCivita</a></li>
              <li><a href="/advisors/tyson-fuller" className="text-sm text-gray-300 hover:text-white transition-colors">Tyson Fuller</a></li>
              <li><a href="/advisors/kevin-cavanaugh" className="text-sm text-gray-300 hover:text-white transition-colors">Kevin Cavanaugh</a></li>
              <li><a href="/advisors/laura-ryan" className="text-sm text-gray-300 hover:text-white transition-colors">Laura Ryan</a></li>
              <li><a href="/advisors/david-jackson" className="text-sm text-gray-300 hover:text-white transition-colors">David Jackson</a></li>
              <li><a href="/advisors/matthew-forney" className="text-sm text-gray-300 hover:text-white transition-colors">Matthew Forney</a></li>
              <li><a href="/advisors/chelsea-hodl" className="text-sm text-gray-300 hover:text-white transition-colors">Chelsea Hodl</a></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="/faq" className="text-sm text-gray-300 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/calculators/home-affordability" className="text-sm text-gray-300 hover:text-white transition-colors">Home Affordability Calculator</a></li>
              <li><a href="/calculators/cost-of-advice" className="text-sm text-gray-300 hover:text-white transition-colors">Cost of Advice Calculator</a></li>
              <li><a href="/calculators/stock-option" className="text-sm text-gray-300 hover:text-white transition-colors">Stock Options Calculator</a></li>
              <li><a href="/calculators/rsu" className="text-sm text-gray-300 hover:text-white transition-colors">RSUs Calculator</a></li>
              <li><a href="/calculators/retirement-calculator" className="text-sm text-gray-300 hover:text-white transition-colors">Retirement Calculator</a></li>
              <li><a href="/calculators/529-plan" className="text-sm text-gray-300 hover:text-white transition-colors">529 Plan Calculator</a></li>
              <li><a href="/calculators/ira" className="text-sm text-gray-300 hover:text-white transition-colors">Roth IRA Calculator</a></li>
              <li><a href="/calculators/home-equity-loan" className="text-sm text-gray-300 hover:text-white transition-colors">Home Equity Calculator</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Disclaimers */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              © Copyright 2025 Domain Money, Inc. All Rights Reserved. Domain Money Inc. means Domain Money and its in-application and web experiences with its family of wholly owned subsidiaries which includes Domain Money Advisors, LLC ("Domain Advisors"), an investment advisor registered with the U.S. Securities and Exchange Commission. By using this website, you accept and agree to Domain Money's Terms of Use and Privacy Policy. Domain Advisors' financial planning and Investment advice available to residents of the United States and is only provided to customers of Domain Money and Domain Advisors. Any historical returns, expected returns, or probability projections are hypothetical in nature and may not reflect actual future performance. Account holdings and other information provided are for illustrative purposes only and are not to be considered investment recommendations.
            </p>
            <p>
              This website's material and blog articles are for informational purposes only. The information contained in them is not, and shall not constitute financial, investment, legal, or tax advice, an offer to sell, a solicitation of an offer to buy or an offer to purchase any securities, nor should it be deemed to be an offer, or a solicitation of an offer, to purchase or sell any investment product or service. Investing comes with inherent risks and you should always invest within your means and risk tolerance. Past performance is not an indication of future returns and you should always consult a financial advisor prior to making investment decisions.
            </p>
            <p>
              Please refer to Domain Advisors' Program Brochure for important additional information. Certain investments are not suitable for all investors. Before investing, you should consider your investment objectives and any fees charged by Domain Money or Domain Advisors. The rate of return on investments can vary widely over time, especially for long term investments. Investment losses are possible, including the potential loss of all amounts invested, including principal.
            </p>
            <p>
              Certified Financial Planner Board of Standards, Inc. (CFP Board) owns the certification marks CFP®, CERTIFIED FINANCIAL PLANNER®, and CFP® (with plaque design) in the United States, which it authorizes use of by individuals who successfully complete CFP Board's initial and ongoing certification requirements.
            </p>
            <p>
              All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. Apple, the Apple logo, and iPhone are trademarks of Apple, Inc., registered in the United States and the Google Play logo are trademarks of Google LLC. Information provided by Domain Support is for informational and general educational purposes only and is not investment or financial advice. Contact Domain at support@domainmoney.com.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-gray-400">© 2025 Domain Money. All Rights Reserved.</p>
            <div className="flex flex-wrap gap-4">
              <a href="https://app.domainmoney.com/" target="_blank" className="text-xs text-gray-400 hover:text-white transition-colors">Log In</a>
              <a href="/t/privacy-policy" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/t/terms-of-use" className="text-xs text-gray-400 hover:text-white transition-colors">Terms of Use</a>
              <a href="https://domainmoney.com/assets/library/form-adv-2a" target="_blank" className="text-xs text-gray-400 hover:text-white transition-colors">Form ADV</a>
              <a href="/t/legal" className="text-xs text-gray-400 hover:text-white transition-colors">Legal</a>
              <a href="https://domainmoney.com/assets/library/form-crs" target="_blank" className="text-xs text-gray-400 hover:text-white transition-colors">Form CRS</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default memo(Footer, isEqual)
