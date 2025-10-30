import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturesZSection from '../components/FeaturesZSection';
import DownloadCTABand from '../components/DownloadCTABand';
import DownloadQRSection from '../components/DownloadQRSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesZSection />
      <DownloadCTABand />
      <DownloadQRSection />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
