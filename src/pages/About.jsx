import React from 'react';
import AboutHero from '../components/AboutHero';
import AboutMissionSection from '../components/AboutMissionSection';
import AboutStatsSection from '../components/AboutStatsSection';
import AboutPartnersSection from '../components/AboutPartnersSection';
import AboutHistorySection from '../components/AboutHistorySection';
import AboutTeamSection from '../components/AboutTeamSection';
import DownloadQRSection from '../components/DownloadQRSection';
import LINKS from '../config/links';
import aboutImage from '../assets/features/Image B10.jpg';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <AboutHero image={aboutImage} imagePosition="center 50%" />
      <AboutMissionSection />
      <AboutHistorySection />
      <AboutTeamSection />
      <AboutStatsSection />
      <AboutPartnersSection />
      <DownloadQRSection
        items={[
          {
            id: 'app',
            title: "Télécharger l'app cliente",
            subtitle: 'Scannez ou ouvrez le store',
            qrSrc: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(LINKS.playStoreUrl || LINKS.downloadUrl || '')}`,
            href: LINKS.playStoreUrl || LINKS.downloadUrl || '#',
          },
          {
            id: 'driver',
            title: "Télécharger l'app chauffeur",
            subtitle: 'Scannez ou ouvrez le store',
            qrSrc: `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(LINKS.appStoreUrl || LINKS.downloadUrl || '')}`,
            href: LINKS.appStoreUrl || LINKS.downloadUrl || '#',
          },
        ]}
      />
      {/* CTA Recrutement court */}
      <section className="py-14 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#3650D0] text-white p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#FF7B00]/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FF7B00]/10 rounded-full blur-2xl" />
          <div className="relative z-10 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold">Rejoignez l'équipe de nos chauffeurs</h3>
              <p className="mt-2 text-white/90">Gagnez plus, travaillez en toute flexibilité et bénéficiez de notre accompagnement.</p>
            </div>
            <div className="flex md:justify-end">
              <Link
                to="/devenir-chauffeur"
                className="inline-flex items-center gap-2 bg-white text-[#3650D0] px-5 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl hover:bg-gray-50 transition"
              >
                Devenir chauffeur
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
