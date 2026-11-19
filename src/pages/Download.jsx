import React from "react";
import { Play, Apple } from "lucide-react";
import SEO from "../components/SEO";
import PLACEHOLDER_LINKS from "../config/links";

const PASSENGER_PLAY = PLACEHOLDER_LINKS.passengerPlayStoreUrl;
const PASSENGER_APPSTORE = PLACEHOLDER_LINKS.passengerAppStoreUrl;
const DRIVER_PLAY = PLACEHOLDER_LINKS.driverPlayStoreUrl;

function StoreButton({ href, icon: Icon, sub, label, dark = false, ariaLabel }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || `${sub} ${label}`}
      className={`inline-flex items-center gap-3 rounded-md px-5 py-3 font-sans font-semibold transition ${
        dark ? "bg-gray-900 text-white hover:bg-black" : "bg-brand-orange text-white hover:bg-[#e56a00]"
      }`}
    >
      <Icon className="w-6 h-6" aria-hidden="true" />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[11px] font-normal opacity-80">{sub}</span>
        <span className="text-base">{label}</span>
      </span>
    </a>
  );
}

export default function Download() {
  return (
    <section className="py-14 px-6 md:px-12 lg:px-20">
      <SEO
        title="Télécharger App TIC Miton | Android & iOS - VTC Porto-Novo"
        description="Téléchargez gratuitement l'application TIC Miton sur Google Play Store et App Store. Réservez vos courses VTC à Porto-Novo en quelques secondes. Compatible Android et iPhone."
        keywords="télécharger TIC Miton, app VTC Porto-Novo gratuit, download TIC Miton Android, TIC Miton iOS iPhone, application transport Bénin, Play Store, App Store"
      />
      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 p-6 md:p-8">
        <h1 className="section-title text-gray-900">Téléchargement de l'application</h1>
        <p className="mt-2 text-gray-600">
          Choisissez votre application et votre boutique.
        </p>

        {/* Application Passager : Android + iOS */}
        <div className="mt-8">
          <h2 className="font-semibold text-gray-900 text-lg">Application Passager</h2>
          <p className="mt-1 text-sm text-gray-600">Disponible sur Google Play Store et App Store.</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <StoreButton
              href={PASSENGER_PLAY}
              icon={Play}
              sub="Disponible sur"
              label="Google Play"
              ariaLabel="Télécharger l'application Passager sur Google Play"
            />
            <StoreButton
              href={PASSENGER_APPSTORE}
              icon={Apple}
              sub="Télécharger dans l'"
              label="App Store"
              dark
              ariaLabel="Télécharger l'application Passager sur l'App Store"
            />
          </div>
        </div>

        {/* Application Chauffeur : Android uniquement */}
        <div className="mt-8">
          <h2 className="font-semibold text-gray-900 text-lg">Application Chauffeur</h2>
          <p className="mt-1 text-sm text-gray-600">Disponible sur Google Play Store (Android).</p>
          <div className="mt-3 flex">
            <StoreButton
              href={DRIVER_PLAY}
              icon={Play}
              sub="Disponible sur"
              label="Google Play"
              dark
              ariaLabel="Télécharger l'application Chauffeur sur Google Play"
            />
          </div>
        </div>

        <div className="mt-10 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p>
            Besoin d'aide ? Contactez-nous :{" "}
            <a className="text-brand-blue underline" href={PLACEHOLDER_LINKS.whatsappUrl}>WhatsApp</a> ou{" "}
            <a className="text-brand-blue underline" href={`mailto:${PLACEHOLDER_LINKS.supportEmail}`}>{PLACEHOLDER_LINKS.supportEmail}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
