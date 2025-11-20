import Header from '@/components/layout/header'
import HeroSection from '@/components/landing/hero-section'
import MoneyMasteredSection from '@/components/landing/money-mastered-section'
import ServicesSection from '@/components/landing/services-section'
import AdvisorSection from '@/components/landing/advisor/advisor-section'
import MembershipSection from '@/components/landing/membership-section'
import FeaturedSection from '@/components/landing/featured-section'
import TestimonialsSection from '@/components/landing/testimonials/testimonials-section'
import WhyDomainSection from '@/components/landing/why-domain-section'
import ProcessSection from '@/components/landing/process-section'
import FaqSection from '@/components/landing/faq-section'
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MoneyMasteredSection />
      <ServicesSection />
      <AdvisorSection />
      <MembershipSection />
      <FeaturedSection />
      <TestimonialsSection />
      <WhyDomainSection />
      <ProcessSection />
      <FaqSection />
      <Footer />
    </div>
  )
}
