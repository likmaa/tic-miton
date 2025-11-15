import React from "react";
import phoneMockup from "../assets/3d-smartphone-mock-up.png?w=640;960;1440;1920&format=webp;avif;jpg&as=picture";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Apple, Play } from "lucide-react";
import PLACEHOLDER_LINKS from "../config/links";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white pt-4 pb-12 md:py-20 px-4 md:px-12 lg:px-20">
      {/* Conteneur principal */}
  <div className="relative overflow-visible lg:overflow-hidden bg-[#3650D0] rounded-3xl p-6 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center text-white">

        {/* Subtle orange radial accents to match CTA chauffeur */}
        <div aria-hidden="true" className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-14 -left-14 w-72 h-72 bg-[#FF7B00]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-[#FF7B00]/10 rounded-full blur-3xl" />
        </div>

        {/* RIGHT COLUMN — Phone Mockup Visual
            - Mobile-first: VISIBLE et en PREMIER (order-1) pour apparaître au dessus du texte
            - Sur md+ : on passe en position absolute/centered pour le layout immersif
            - J'ai retiré `hidden md:flex` pour que le mockup soit rendu en mobile,
              et ajouté des classes responsive qui basculent entre layout statique (mobile) et absolute (md+)
        */}
        <motion.div
          className="order-1 md:order-2 flex justify-center items-center z-10"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          {/* Halo / ring:
              - small and subtle on mobile (inline, behind the phone)
              - becomes large absolute ring on md+ to reproduce the immersive halo
          */}
          <div className="relative flex items-center justify-center">
            {/* Mobile halo (hidden as per request to simplify mobile hero) */}
            <div className="hidden" aria-hidden="true" />

            {/* Desktop halo (only on lg+) to avoid crowding on tablets */}
            <div className="hidden lg:block lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[30rem] lg:h-[30rem] xl:w-[34rem] xl:h-[34rem] bg-gradient-to-tr from-[#3650D0]/40 to-[#FF7B00]/20 blur-3xl rounded-full" aria-hidden="true" />

            {/* Phone image — mobile (hidden per request) */}
            <span className="hidden" />
            {/* Phone image — desktop */}
            {(() => {
              const hasPictureShape = phoneMockup && typeof phoneMockup === 'object' && ("sources" in phoneMockup || "img" in phoneMockup);
              if (hasPictureShape) {
                const rawSources = phoneMockup.sources;
                const sources = Array.isArray(rawSources)
                  ? rawSources
                  : rawSources
                    ? Object.values(rawSources)
                    : [];
                const img = phoneMockup.img || {};
                return (
                  <picture>
                    {sources.map((source, idx) => (
                      <source key={idx} type={source.type} srcSet={source.srcset} sizes="(min-width: 1024px) 60vw, 100vw" />
                    ))}
                    <motion.img
                      src={img.src}
                      alt="Mockup téléphone TIC Miton"
                      className={
                        "hidden md:block md:w-[26rem] lg:w-[34rem] xl:w-[40rem] " +
                        "relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-[55%] lg:-translate-y-[58%] drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
                      }
                      loading="lazy"
                      decoding="async"
                      width={img.w || undefined}
                      height={img.h || undefined}
                      animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
                      transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      style={{ pointerEvents: "none" }}
                    />
                  </picture>
                );
              }
              return (
                <motion.img
                  src={typeof phoneMockup === 'string' ? phoneMockup : ''}
                  alt="Mockup téléphone TIC Miton"
                  className={
                    "hidden md:block md:w-[26rem] lg:w-[34rem] xl:w-[40rem] " +
                    "relative lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-[55%] lg:-translate-y-[58%] drop-shadow-[0_25px_45px_rgba(0,0,0,0.35)]"
                  }
                  loading="lazy"
                  decoding="async"
                  animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  style={{ pointerEvents: "none" }}
                />
              );
            })()}
          </div>
        </motion.div>

        {/* LEFT COLUMN — Text and CTA */}
        <motion.div
          className="relative z-10 order-2 md:order-1 text-center md:text-left space-y-6 md:pr-16 lg:pr-24"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight bg-gradient-to-r from-white via-[#BFDFFF] to-[#66B2FF] bg-[length:200%_auto] text-transparent bg-clip-text animate-gradient break-words"
          >
            Votre ville, votre chauffeur.
          </h1>
          
          <p className="font-sans text-white/90 text-base sm:text-lg max-w-md mx-auto md:mx-0">
            TIC Miton est votre solution simple et sûre pour tous vos trajets.
            Commandez un déplacement, demandez une course ou faites-vous livrer
            en quelques clics.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-3 sm:pt-4">
            {/* CTA Button */}
            <motion.a
              href={PLACEHOLDER_LINKS.downloadUrl}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="bg-[#FF7B00] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-md font-sans font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-[#e66f00] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FF7B00]/30 transition"
              aria-label="Télécharger l'application TIC Miton"
            >
              Télécharger l'application
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            {/* Store Badges */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <a
                href={PLACEHOLDER_LINKS.playStoreUrl}
                aria-label="Télécharger sur le Play Store"
                className="inline-block rounded-md focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white/40"
                rel="noopener noreferrer"
              >
                <span className="inline-flex items-center gap-2 md:gap-2.5 rounded-md bg-gray-900 text-white px-3 py-1.5 md:px-4 md:py-2.5 border border-white/10 shadow">
                  <Play className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                  <span className="font-sans text-sm md:text-base font-medium">Play Store</span>
                </span>
              </a>
              <a
                href={PLACEHOLDER_LINKS.appStoreUrl}
                aria-label="Télécharger sur l'App Store"
                className="inline-block rounded-md focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white/40"
                rel="noopener noreferrer"
              >
                <span className="inline-flex items-center gap-2 md:gap-2.5 rounded-md bg-gray-900 text-white px-3 py-1.5 md:px-4 md:py-2.5 border border-white/10 shadow">
                  <Apple className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                  <span className="font-sans text-sm md:text-base font-medium">App Store</span>
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;