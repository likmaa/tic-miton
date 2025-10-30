import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import LINKS from '../config/links';

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
    <section className={`relative overflow-hidden bg-[#3650D0] text-white ${className}`}>
      {/* Orange accents / halos */}
      <div className="pointer-events-none" aria-hidden>
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-[#FF7B00]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-28 -right-24 w-[28rem] h-[28rem] bg-[#FF7B00]/10 rounded-full blur-3xl" />
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

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight mt-3">
            <span className="block">Tu es bon au volant&nbsp;?</span>
            <span className="block mt-1">
              On a une voiture pour <span className="text-[#FF7B00]">toi&nbsp;!</span>
            </span>
          </h1>

          <p className="mt-5 font-sans text-white/90 max-w-xl">
            Rejoins-nous avec un CV et une lettre de motivation. Notre équipe te contacte pour la validation et la formation.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 bg-[#FF7B00] text-white px-6 py-3 rounded-md font-sans font-semibold shadow-lg hover:bg-[#e66f00] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FF7B00]/30"
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
        <div className="relative h-[360px] md:h-[480px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[24rem] md:h-[24rem] rounded-full bg-gradient-to-tr from-white/15 to-transparent blur-2xl" aria-hidden />
          </div>
          {/* Optional: add an image by placing it as background in this box */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10" />
        </div>
      </div>
      {/* Bottom info bar removed per request */}
    </section>
  );
}
