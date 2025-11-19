import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Apple, Play } from "lucide-react";
import PLACEHOLDER_LINKS from "../config/links";
import Aurora from "./Aurora";
import phonePicture from "../assets/Mockup.png?w=360;420;520;560;720;960&format=avif;webp&quality=70&as=picture";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-20 px-4 md:px-12 lg:px-20">
      {/* Conteneur principal */}
  <div className="relative overflow-hidden bg-brand-blue rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 min-h-[480px] sm:min-h-[520px] md:min-h-[620px] lg:min-h-[720px] text-white flex items-center">

        {/* Aurora WebGL background */}
        <Aurora
          colorStops={["#3650D0", "#FF7B00", "#FFFFFF"]}
          blend={0.6}
          amplitude={1.25}
          speed={0.65}
        />

        {/* CONTENT + IMAGE LAYOUT */}
        <div className="relative z-10 h-full w-full">
          <div className="max-w-7xl mx-auto grid h-full w-full gap-6 sm:gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-2 items-center lg:justify-items-start">
        
        {/* CONTENT */}
        <motion.div
          className="relative z-10 max-w-4xl space-y-4 sm:space-y-6 mx-auto lg:mx-0 text-center lg:text-left lg:pr-4 xl:pr-8"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            Votre ville,
            <br />
            votre chauffeur.
          </motion.h1>
          
          <p className="font-sans text-white/90 text-base md:text-lg max-w-[50ch] mx-auto lg:mx-0">
            TIC Miton est votre solution simple et sûre pour tous vos trajets.
            Commandez un déplacement, demandez une course ou faites-vous livrer
            en quelques clics.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
            {/* CTA Button */}
            <motion.a
              href={PLACEHOLDER_LINKS.downloadUrl}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              className="bg-brand-orange text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md font-sans font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-[#e66f00] hover:text-[#FFCA80] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-orange/30 transition"
              aria-label="Télécharger l'application TIC Miton"
            >
              Télécharger l'application
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            {/* Store Badges */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
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

        {/* IMAGE (idle float + micro-rotation, motion-safe) */}
        <motion.div
          className="mt-6 lg:mt-0 flex justify-center lg:justify-end lg:ml-4 xl:ml-8"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {/* Image responsive (AVIF/WEBP/PNG) avec animation sur l'élément <img> de fallback */}
          {(() => {
            const rawSources = phonePicture?.sources;
            const sources = Array.isArray(rawSources)
              ? rawSources
              : rawSources
                ? Object.values(rawSources)
                : [];
            const img = phonePicture?.img || {};
            return (
              <picture>
                {sources.map((source, idx) => (
                  <source key={idx} type={source.type} srcSet={source.srcset} sizes="(min-width: 1280px) 560px, (min-width: 1024px) 520px, (min-width: 768px) 420px, (min-width: 640px) 360px, 280px" />
                ))}
                <motion.img
                  src={img.src || (typeof phonePicture === 'string' ? phonePicture : '')}
                  alt="Aperçu de l'application TIC Miton"
                  className="w-[280px] sm:w-[360px] md:w-[420px] lg:w-[520px] xl:w-[560px] drop-shadow-2xl pointer-events-none select-none will-change-transform"
                  decoding="async"
                  loading="eager"
                  width={img.w || undefined}
                  height={img.h || undefined}
                  animate={shouldReduceMotion ? undefined : { y: [0, -4, 0], rotate: [0, -0.8, 0, 0.8, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "50% 85%" }}
                />
              </picture>
            );
          })()}
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;