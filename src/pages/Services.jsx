import React from "react";
import ServicesHero from "../components/ServicesHero";
import ServicesGrid from "../components/ServicesGrid";
import ServicesHowItWorks from "../components/ServicesHowItWorks";
import DownloadQRSection from "../components/DownloadQRSection";
import StatsSection from "../components/StatsSection";
import SEO from "../components/SEO";
import LINKS from "../config/links";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <main className="font-sans antialiased">
      <SEO
        title="Services VTC Porto-Novo | Courses, Livraison, Trajets Quotidiens - TIC Miton"
        description="Services de transport VTC à Porto-Novo : courses à la demande, livraison rapide de colis, abonnements trajets domicile-travail. Tarifs clairs, paiement Mobile Money. Téléchargez TIC Miton."
        keywords="VTC Porto-Novo, livraison express Bénin, course à la demande, taxi professionnel, trajets quotidiens, transport domicile-travail, livraison colis Porto-Novo"
      />
      <ServicesHero />
      <StatsSection />
      <ServicesGrid />
      <ServicesHowItWorks />
      <DownloadQRSection
        className=""
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

      {/* CTA Devenir Chauffeur */}
      <section className="py-14 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto rounded-2xl bg-brand-blue text-white p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-orange/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-2xl" />
          <div className="relative z-10 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="section-title text-white">Rejoignez l'équipe de nos chauffeurs</h3>
              <p className="mt-2 text-white/90">Gagnez plus, travaillez en toute flexibilité et bénéficiez de notre accompagnement.</p>
            </div>
            <div className="flex md:justify-end">
              <Link
                to="/devenir-chauffeur"
                className="inline-flex items-center gap-2 bg-white text-brand-blue px-5 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl hover:bg-gray-50 transition"
              >
                Devenir chauffeur
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

