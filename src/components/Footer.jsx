import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Send, PhoneCall } from "lucide-react";
import PLACEHOLDER_LINKS from "../config/links";

const Footer = () => {
  const reduceMotion = useReducedMotion();

  const navItems = [
    { label: "Accueil", to: PLACEHOLDER_LINKS.home },
    { label: "À propos", to: PLACEHOLDER_LINKS.about },
    { label: "Services", to: PLACEHOLDER_LINKS.features.all },
    { label: "Devenir chauffeur", to: PLACEHOLDER_LINKS.driver },
    { label: "Contact", to: PLACEHOLDER_LINKS.contact },
  ];

  return (
    <footer className="relative text-white bg-brand-blue rounded-t-3xl overflow-hidden">
      {/* Orange radial accents to match CTA chauffeur */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -right-20 w-[28rem] h-[28rem] bg-brand-orange/10 rounded-full blur-3xl" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 space-y-16">
        {/* Newsletter Section */}
        <motion.div
          className="text-center space-y-6"
          initial={reduceMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Restez connectés à <span className="text-[#FFCA80]">TIC Miton</span> 
          </h2>
          <p className="font-sans text-white/80 max-w-3xl mx-auto">
            Recevez nos dernières actualités, offres exclusives et mises à jour directement dans votre boîte mail.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto pt-4"
          >
            <input
              type="email"
              required
              placeholder="Entrez votre adresse e-mail"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white transition"
            />
            <motion.button
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              type="submit"
              className="bg-brand-orange text-white font-sans font-semibold px-6 py-3 rounded-md flex items-center justify-center gap-2 shadow-lg hover:bg-[#e66f00] hover:text-[#FFCA80] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-orange/30 transition"
            >
              S’abonner <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/20"></div>

        {/* Footer Links Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center md:text-left px-4"
          initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Brand Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold">TIC Miton</h3>
            <p className="font-sans text-white/70 text-xs sm:text-sm leading-relaxed">
              Simplifiez vos déplacements avec TIC Miton, votre compagnon de mobilité intelligente et fiable.
            </p>
            {/* Phone CTA */}
            <div>
              <a
                href="tel:+2290157792662"
                className="inline-flex items-center gap-2 bg-brand-orange text-white px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-md font-sans font-semibold shadow hover:bg-[#e66f00] hover:text-[#FFCA80] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-orange/30"
              >
                <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4" /> +229 0157792662
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-white/80">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-sans text-white/90 hover:text-brand-orange transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Réseaux sociaux</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={reduceMotion ? undefined : { scale: 1.12 }}
                  className="p-2 rounded-full transition bg-white/10 hover:bg-white/20 text-white/90 hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/30"
                  aria-label={`Lien ${Icon.name}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div>
            <h4 className="font-sans font-semibold text-lg mb-4">Téléchargez l’application</h4>
            <div className="flex flex-col gap-3">
              <a
                href={PLACEHOLDER_LINKS.playStoreUrl}
                className="bg-white text-brand-blue px-4 py-2 rounded-md font-sans font-semibold text-sm hover:bg-white/90 transition text-center"
                aria-label="Télécharger sur le Play Store"
                rel="noopener noreferrer"
              >
                Play Store
              </a>
              <a
                href={PLACEHOLDER_LINKS.appStoreUrl}
                className="bg-white text-brand-blue px-4 py-2 rounded-md font-sans font-semibold text-sm hover:bg-white/90 transition text-center"
                aria-label="Télécharger sur l'App Store"
                rel="noopener noreferrer"
              >
                App Store
              </a>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/20"></div>

        {/* Copyright */}
        <div className="text-center text-white/60 text-sm">
          © {new Date().getFullYear()} TIC Miton — Tous droits réservés. | <Link to="/privacy-policy" className="hover:text-[#FFCA80] transition-colors">Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
