import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import aboutHeroImg from "../assets/3d-smartphone-mock-up.png";
import LINKS from "../config/links";

const AboutHero = ({
  image = aboutHeroImg,
  title = "TIC Miton, votre compagnon de mobilité.",
  lead =
    "Née à Porto-Novo, TIC Miton réinvente le transport urbain. Notre mission : offrir à chaque citoyen une solution simple, rapide et sécurisée pour se déplacer, se faire livrer ou commander en quelques clics.",
  ctaPrimaryHref = "#mission",
  ctaSecondaryHref = LINKS.whatsappUrl,
  imagePosition = "center 25%",
}) => {
  const reduceMotion = useReducedMotion();

  const containerMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <section className="bg-brand-blue py-10 px-6 md:px-12 lg:px-20">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-brand-blue"
        {...containerMotion}
        aria-labelledby="about-hero-title"
      >
        {/* Image en haut, plein largeur, comme la section Download */}
        <img
          src={image}
          alt="Illustration TIC Miton / Aperçu de l'application"
          className="w-full h-72 sm:h-80 md:h-96 lg:h-[28rem] object-cover block rounded-t-3xl"
          loading="lazy"
          decoding="async"
          width="1600"
          height="900"
          style={{ objectPosition: imagePosition }}
        />

        {/* Contenu sous l'image, aligné comme DownloadCTABand */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-8">
          {/* Left: Titre + texte */}
          <div className="text-center md:text-left flex-1">
            <h1 id="about-hero-title" className="font-display text-2xl sm:text-3xl text-white font-extrabold leading-tight">
              {title}
            </h1>
            <p className="mt-2 text-sm text-white/90 max-w-xl">{lead}</p>
          </div>

          {/* Right: CTAs au style similaire (bouton blanc + bouton contact) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
            <motion.a
              href={ctaPrimaryHref}
              whileHover={reduceMotion ? {} : { scale: 1.05 }}
              whileTap={reduceMotion ? {} : { scale: 0.97 }}
              aria-label="Découvrir notre mission"
              className="bg-white text-black px-8 py-4 rounded-full font-sans font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl transition-all"
            >
              Découvrir notre mission
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <a
              href={ctaSecondaryHref}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-sans font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-white/25"
              aria-label="Nous contacter sur WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              Contact WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
