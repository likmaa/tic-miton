import React, { Suspense, lazy } from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import SEO from '../components/SEO';
import LINKS from '../config/links';

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
      <SEO
        title="TIC Miton - VTC Porto-Novo | Réservez votre Course en Ligne 24/7"
        description="Service de transport VTC fiable à Porto-Novo, Bénin. Réservez votre course en quelques clics, chauffeurs professionnels vérifiés, tarifs transparents. Téléchargez l'app TIC Miton."
        keywords="VTC Porto-Novo, réserver course Porto-Novo, transport Bénin, taxi en ligne, TIC Miton app, chauffeur privé Porto-Novo, livraison rapide, VTC Cotonou"
      />
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<div className="py-10 text-center text-gray-600">Chargement…</div>}>
        <HowItWorksSection />
        <FeaturesZSection />
        <DownloadCTABand label="Télécharger maintenant" ariaLabel="Télécharger maintenant" />
        <DownloadQRSection
          items={[
            {
              id: "app",
              title: "Télécharger l'app cliente",
              subtitle: "Scannez ou ouvrez le store",
              qrSrc: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(LINKS.playStoreUrl || LINKS.downloadUrl || '')}`,
              href: LINKS.playStoreUrl || LINKS.downloadUrl || "#",
            },
            {
              id: "driver",
              title: "Télécharger l'app chauffeur",
              subtitle: "Scannez ou ouvrez le store",
              qrSrc: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(LINKS.appStoreUrl || LINKS.downloadUrl || '')}`,
              href: LINKS.appStoreUrl || LINKS.downloadUrl || "#",
            },
          ]}
        />
        <TestimonialsSection />
        <FAQSection />
      </Suspense>
    </>
  );
}
