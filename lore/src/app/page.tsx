import LandingNavbar from '@/components/LandingNavbar';
import FullPageScene from '@/components/FullPageScene';
import HeroSection from '@/components/HeroSection';
import LiveTicker from '@/components/LiveTicker';
import FeatureGrid from '@/components/FeatureGrid';
import HowItWorks from '@/components/HowItWorks';
import TerminalPreview from '@/components/TerminalPreview';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen text-[#F5F5FA] overflow-x-hidden">
      {/* ── Full-page 3D background (fixed, behind everything) ── */}
      <FullPageScene />

      {/* ── All page content sits above the 3D canvas ── */}
      <div className="relative z-10">
        <LandingNavbar />
        <HeroSection />
        <LiveTicker />
        <FeatureGrid />
        <HowItWorks />
        <TerminalPreview />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
