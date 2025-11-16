import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Apple, Play } from "lucide-react";
import PLACEHOLDER_LINKS from "../config/links";
import Aurora from "./Aurora";
import phoneImg from "../assets/Mockup.png";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white pt-4 pb-12 md:py-20 px-4 md:px-12 lg:px-20">
      {/* Conteneur principal */}
  <div className="relative overflow-hidden bg-[#3650D0] rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 min-h-[520px] md:min-h-[620px] lg:min-h-[720px] text-white flex items-center">

        {/* Aurora WebGL background */}
        <Aurora
          colorStops={["#3650D0", "#FF7B00", "#FFFFFF"]}
          blend={0.6}
          amplitude={1.25}
          speed={0.65}
        />

        {/* CONTENT + IMAGE LAYOUT */}
        <div className="relative z-10 h-full w-full">
          <div className="max-w-7xl mx-auto grid h-full w-full gap-8 lg:gap-16 xl:gap-24 lg:grid-cols-2 items-center lg:justify-items-start">
        
        {/* CONTENT */}
        <motion.div
          className="relative z-10 max-w-4xl space-y-6 mx-auto lg:mx-0 text-center lg:text-left lg:pr-8 xl:pr-12"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 40 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="font-display font-extrabold text-3xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight tracking-tight [text-wrap:balance] break-words bg-gradient-to-r from-white via-[#BFDFFF] to-[#66B2FF] bg-[length:200%_auto] text-transparent bg-clip-text animate-gradient"
          >
            Votre ville, votre chauffeur.
          </h1>
          
          <p className="font-sans text-white/90 text-base md:text-lg max-w-[50ch] mx-auto lg:mx-0">
            TIC Miton est votre solution simple et sûre pour tous vos trajets.
            Commandez un déplacement, demandez une course ou faites-vous livrer
            en quelques clics.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start pt-4">
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
            <div className="flex items-center justify-center gap-4">
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
          <motion.img
            src={phoneImg}
            alt="Aperçu de l'application TIC Miton"
            className="w-[280px] sm:w-[360px] md:w-[420px] lg:w-[520px] xl:w-[560px] drop-shadow-2xl pointer-events-none select-none will-change-transform"
            decoding="async"
            loading="eager"
            animate={shouldReduceMotion ? undefined : { y: [0, -4, 0], rotate: [0, -0.8, 0, 0.8, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 85%" }}
          />
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;