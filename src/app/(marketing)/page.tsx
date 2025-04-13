import HeroSection from "@/components/layout/hero-section";
import TokenCopySection from "@/components/layout/copy-ca-section";
import FaqSection from "@/components/layout/faq-section";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Toast Container */}
      <Toaster position="top-center" />

      {/* Hero Section */}
      <HeroSection />

      {/* Token Copy Section */}
      <TokenCopySection tokenCA="HDoAKhCoEuuHzjMB6Q8AgKJyg5uT9APpDnynXAJQdfVW" />

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
}
