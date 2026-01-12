import React, { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Apple, Play, Star } from "lucide-react";
import { getStoreUrl, trackEvent } from "../utils/storeRedirect";
import PLACEHOLDER_LINKS from "../config/links";
import COLORS from "../config/colors";
const AuroraLazy = React.lazy(() => import("./Aurora"));
// Mixed quality profile: hero moderate quality 70
import phonePicture from "../assets/Mockup.png?w=360;420;520;640;800;960&format=avif;webp&quality=70&as=picture";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 md:pb-20 px-4 md:px-12 lg:px-20">
      {/* Conteneur principal */}
      <div className="relative overflow-hidden bg-brand-blue rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 min-h-[480px] sm:min-h-[520px] md:min-h-[620px] lg:min-h-[720px] text-white flex items-center">

        {/* Aurora WebGL background (lazy) - Disabled on mobile for performance */}
        {typeof window !== 'undefined' && window.innerWidth >= 768 && (
          <Suspense fallback={null}>
            <AuroraLazy
              colorStops={[COLORS.brandBlue, COLORS.brandOrange, "#FFFFFF"]}
              blend={0.6}
              amplitude={1.25}
              speed={0.65}
            />
          </Suspense>
        )}

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
              {/* Trust Badge / Social Proof */}
              <motion.div
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex items-center -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <span className="text-sm font-sans font-semibold text-white/95">
                  4.9/5 <span className="text-white/70 font-normal ml-1">par +1000 avis clients</span>
                </span>
              </motion.div>

              <motion.h1
                className="hero-title text-white"
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
                {/* CTA Button - Passenger App */}
                <motion.a
                  href={PLACEHOLDER_LINKS.passengerAppUrl}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="bg-brand-orange text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md font-sans font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:bg-brand-orange-hover hover:text-brand-orange-light focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-orange/30 transition"
                  aria-label="Télécharger l'application Passager"
                >
                  Téléchargez votre app ici
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>

                {/* CTA Button - Driver App */}
                <motion.a
                  href={PLACEHOLDER_LINKS.driverAppUrl}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                  className="bg-gray-900 text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md font-sans font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg border border-white/10 hover:bg-gray-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white/40 transition"
                  aria-label="Télécharger l'application Chauffeur"
                >
                  Téléchargez votre app/driver ici
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
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
                      className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[420px] xl:w-[460px] drop-shadow-2xl pointer-events-none select-none will-change-transform"
                      decoding="async"
                      loading="eager"
                      fetchpriority="high"
                      width={img.w || undefined}
                      height={img.h || undefined}
                      animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], rotate: [0, -1.5, 0, 1.5, 0] }}
                      transition={shouldReduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
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