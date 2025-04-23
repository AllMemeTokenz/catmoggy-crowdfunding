import HeroSection from "@/components/layout/hero-section";
import TokenCopySection from "@/components/layout/copy-ca-section";
import FaqSection from "@/components/layout/faq-section";
import ChartSection from "@/components/layout/chart";
import ScrollToTop from "@/components/layout/scroll-to-top";
import { Toaster } from "react-hot-toast";
import { HowItWorksSection } from "@/components/layout/how-work";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Toast Container */}
      <Toaster position="top-center" />

      {/* Hero Section */}
      <HeroSection />

      {/* How Its Work Section */}
      <HowItWorksSection />

      {/* Token Copy Section */}
      <TokenCopySection tokenCA="HDoAKhCoEuuHzjMB6Q8AgKJyg5uT9APpDnynXAJQdfVW" />

      {/* Chart Section */}
      <ChartSection />

      {/* FAQ Section */}
      <FaqSection />

      <ScrollToTop />
    </div>
  );
}
