import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import LINKS from '../config/links';
// Responsive driver hero image (multi-format, multi-width)
import driverHeroImage from '../assets/hh.jpeg?w=480;640;768;960;1200&format=avif;webp;jpg&quality=100&as=picture';

/*
  DriverHero.jsx
  - Hero "affiche" style for Devenir Chauffeur page, inspired by provided poster.
  - Brand colors: blue #3650D0 base, orange #FF7B00 accents.
  - CTA scrolls to the application section (#apply), with WhatsApp/Phone quick links.
*/

const PHONE_NUMBER = '+2290157792662';
// Phone button removed from hero; still used in footer.

export default function DriverHero({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={`relative overflow-hidden bg-brand-blue text-white ${className}`}>
      {/* Orange accents / halos */}
      <div className="pointer-events-none" aria-hidden>
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 -right-24 w-[28rem] h-[28rem] bg-brand-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-12 lg:px-20 pt-20 pb-10">
        {/* Left: Text */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <p className="font-sans text-white/80 text-sm tracking-wide">TIC MITON • Recrutement</p>

          <div className="mt-3">
            <motion.h1
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Tu es bon au volant ?
            </motion.h1>
            <div className="mt-1">
              <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-white">On a une voiture pour </span>
              <span className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-brand-orange">toi&nbsp;!</span>
            </div>
          </div>

          <p className="mt-5 font-sans text-white/90 max-w-xl">
            Rejoins-nous en remplissant le formulaire ci-dessous. Notre équipe te contacte pour la validation et la formation.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-md font-sans font-semibold shadow-lg hover:bg-[#e66f00] hover:text-[#FFCA80] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-orange/30"
            >
              Postuler maintenant <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={LINKS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-md font-sans font-semibold hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>

          {/* Docs list removed per request */}
        </motion.div>

        {/* Right: Visual placeholder (image slot) */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="relative h-[360px] md:h-[480px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[24rem] md:h-[24rem] rounded-full bg-gradient-to-tr from-brand-orange/20 to-transparent blur-2xl" aria-hidden />
          </div>
          <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            {(() => {
              const isPicture = driverHeroImage && typeof driverHeroImage === 'object' && ("sources" in driverHeroImage || "img" in driverHeroImage);
              if (isPicture) {
                const rawSources = driverHeroImage.sources;
                const sources = Array.isArray(rawSources) ? rawSources : rawSources ? Object.values(rawSources) : [];
                const img = driverHeroImage.img || {};
                return (
                  <picture>
                    {sources.map((source, idx) => (
                      <source key={idx} type={source.type} srcSet={source.srcset} sizes="(min-width: 1024px) 50vw, 100vw" />
                    ))}
                    <img
                      src={img.src || (typeof driverHeroImage === 'string' ? driverHeroImage : '')}
                      alt="Chauffeur TIC Miton professionnel"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={img.w || 1200}
                      height={img.h || 800}
                    />
                  </picture>
                );
              }
              return (
                <img
                  src={typeof driverHeroImage === 'string' ? driverHeroImage : ''}
                  alt="Chauffeur TIC Miton professionnel"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                />
              );
            })()}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent" />
          </div>
        </motion.div>
      </div>
      {/* Bottom info bar removed per request */}
    </section>
  );
}
