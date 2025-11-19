import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Apple, Play } from "lucide-react";
import PLACEHOLDER_LINKS from "../config/links";
// Image bannière responsive (par défaut), remplaçable via prop
import downPic from "../assets/features/Down.jpeg?w=864;1200;1600;2000&format=webp;avif;jpg&quality=100&as=picture";



const PlayBadge = () => (
  <div className="inline-flex items-center gap-2 md:gap-2.5 rounded-md bg-gray-900 text-white px-3.5 py-2 md:px-4 md:py-2.5 border border-white/10 shadow">
    <Play className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
    <span className="font-sans text-sm md:text-base font-medium">Play Store</span>
  </div>
);

const AppStoreBadge = () => (
  <div className="inline-flex items-center gap-2 md:gap-2.5 rounded-md bg-gray-900 text-white px-3.5 py-2 md:px-4 md:py-2.5 border border-white/10 shadow">
    <Apple className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
    <span className="font-sans text-sm md:text-base font-medium">App Store</span>
  </div>
);

const DownloadCTABand = ({
  downloadUrl = PLACEHOLDER_LINKS.downloadUrl,
  playStoreUrl = PLACEHOLDER_LINKS.playStoreUrl,
  appStoreUrl = PLACEHOLDER_LINKS.appStoreUrl,
  backgroundImage = downPic,
  className = "",
}) => {
  const reduceMotion = useReducedMotion();

  const containerMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <section className={`bg-brand-blue py-10 px-6 md:px-12 lg:px-20 ${className}`}>
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-brand-blue"
        {...containerMotion}
        aria-label="Bande de téléchargement de l'application TIC Miton"
      >
        {/* Image au-dessus du texte (full width) */}
        {(() => {
          const isPicture = backgroundImage && typeof backgroundImage === 'object' && ("sources" in backgroundImage || "img" in backgroundImage);
          if (isPicture) {
            const srcs = backgroundImage.sources;
            const sources = Array.isArray(srcs) ? srcs : srcs ? Object.values(srcs) : [];
            const img = backgroundImage.img || {};
            return (
              <picture>
                {sources.map((source, idx) => (
                  <source key={idx} type={source.type} srcSet={source.srcset} sizes="100vw" />
                ))}
                <img
                  src={img.src}
                  alt="Illustration de l'application TIC Miton"
                  className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] object-cover object-top block rounded-t-3xl"
                  loading="lazy"
                  decoding="async"
                  width={img.w || 1600}
                  height={img.h || 900}
                />
              </picture>
            );
          }
          return (
            <img
              src={backgroundImage}
              alt="Illustration de l'application TIC Miton"
              className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] object-cover object-top block rounded-t-3xl"
              loading="lazy"
              decoding="async"
            />
          );
        })()}

        {/* Contenu sous l'image, sur fond bleu */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-8">
          {/* Left: headline + short text */}
          <div className="text-center md:text-left flex-1">
            <h3 className="font-display text-2xl sm:text-3xl text-white font-extrabold leading-tight">
              Téléchargez l'application TIC Miton
            </h3>
            <p className="mt-2 text-sm text-white/90 max-w-xl">
              Commandez un trajet ou une livraison en quelques clics. Profitez d'un service sûr, rapide et local à Porto-Novo.
            </p>
          </div>

          {/* Right: primary action + store badges */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
            <motion.a
              href={downloadUrl}
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              aria-label="Télécharger l'application TIC Miton"
              className="bg-white text-black px-8 py-4 rounded-full font-sans font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transition-all"
              rel="noopener noreferrer"
            >
              Télécharger l'application
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <div className="flex items-center gap-3 md:gap-4">
              <a
                href={playStoreUrl}
                aria-label="Télécharger sur le Play Store"
                className="inline-block rounded-md focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white/40"
                rel="noopener noreferrer"
              >
                <PlayBadge />
              </a>

              <a
                href={appStoreUrl}
                aria-label="Télécharger sur l'App Store"
                className="inline-block rounded-md focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white/40"
                rel="noopener noreferrer"
              >
                <AppStoreBadge />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DownloadCTABand;
