import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import LiveTicker from '@/components/LiveTicker';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import TerminalPreview from '@/components/TerminalPreview';
import MetricsTestimonials from '@/components/MetricsTestimonials';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070708] text-[#F5F5FA] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <LiveTicker />
      <FeatureGrid />
      <HowItWorks />
      <TerminalPreview />
      <MetricsTestimonials />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
