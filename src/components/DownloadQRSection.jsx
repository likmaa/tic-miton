import React from "react";
import { ArrowRight } from "lucide-react";



const DEFAULT_ITEMS = [
  {
    id: "app",
    title: "Download the App",
    subtitle: "Scan to download",
    qrSrc: "https://via.placeholder.com/220?text=QR+App", // remplace par ton QR
    href: "#download-app",
  },
  {
    id: "driver",
    title: "Download the Driver app",
    subtitle: "Scan to download",
    qrSrc: "https://via.placeholder.com/220?text=QR+Driver",
    href: "#download-driver",
  },
];

const DownloadCard = ({ item }) => {
  return (
    <div
      className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
      role="group"
      aria-labelledby={`download-${item.id}-title`}
    >
      {/* QR image */}
      <div className="flex-shrink-0">
        <img
          src={item.qrSrc}
          alt={`${item.title} QR code`}
          className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
          width="176"
          height="176"
          loading="lazy"
        />
      </div>

      {/* Textual area */}
      <div className="flex-1 w-full md:w-auto">
        <h3 id={`download-${item.id}-title`} className="font-display text-xl md:text-2xl text-gray-900 font-bold">
          {item.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
      </div>

      {/* CTA arrow */}
      <div className="flex-shrink-0">
        <a
          href={item.href}
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200"
          aria-label={`${item.title} — ouvrir le lien de téléchargement`}
        >
          <ArrowRight className="w-5 h-5 text-gray-700" />
        </a>
      </div>
    </div>
  );
};

const DownloadQRSection = ({ items = DEFAULT_ITEMS, className = "" }) => {
  return (
    <section className={`bg-gray-50 py-16 px-6 md:px-12 lg:px-20 ${className}`} aria-label="Téléchargement des applications">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="section-title text-brand-blue">
            Télécharger l'app
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it) => (
            <DownloadCard key={it.id} item={it} />
          ))}
        </div>

        {/* Note / hint */}
        <p className="mt-6 text-sm text-gray-600">
          Vous n'avez pas de scanner QR ? Appuyez sur le bouton pour accéder directement à la page de téléchargement.
        </p>
      </div>
    </section>
  );
};

export default DownloadQRSection;