import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';

// Lazy-load sections sous la ligne de flottaison
const HowItWorksSection = lazy(() => import('../components/HowItWorksSection'));
const FeaturesZSection = lazy(() => import('../components/FeaturesZSection'));
const DownloadCTABand = lazy(() => import('../components/DownloadCTABand'));
const DownloadQRSection = lazy(() => import('../components/DownloadQRSection'));
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const FAQSection = lazy(() => import('../components/FAQSection'));

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<div className="py-10 text-center text-gray-600">Chargement…</div>}>
        <HowItWorksSection />
        <FeaturesZSection />
        <DownloadCTABand />
        <DownloadQRSection />
        <TestimonialsSection />
        <FAQSection />
      </Suspense>
    </>
  );
}
