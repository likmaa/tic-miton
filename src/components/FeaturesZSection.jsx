import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Tag, Zap, LifeBuoy, ArrowRight, X, Apple, Play, Sparkles } from "lucide-react";
import LINKS from "../config/links";
// Responsive, optimized sources via vite-imagetools
import safetyPic from "../assets/features/safety.jpg?w=480;768;1200;1600&format=webp;avif;jpg&quality=100&as=picture";
import payementPic from "../assets/features/payement.jpg?w=480;768;1200;1600&format=webp;avif;jpg&quality=100&as=picture";
import puissancePic from "../assets/features/puissance.jpeg?w=480;768;1200;1600&format=webp;avif;jpg&quality=100&as=picture";
import supportPic from "../assets/features/support.jpg?w=480;768;1200;1600&format=webp;avif;jpg&quality=100&as=picture";

/*
  FeaturesZSection.jsx
  - Layout "en Z" : 4 lignes (rows). Sur desktop chaque ligne est une rangée
    avec image à gauche / texte à droite pour les lignes impaires, et image à droite
    / texte à gauche pour les lignes paires.
  - Mobile-first : chaque bloc stacké (image au-dessus, texte dessous) pour une lecture simple.
  - Images "réelles" : exemples fournis depuis Unsplash via source.unsplash.com (remplaçables par des fichiers locaux).
  - Chaque avantage est rendu sur plusieurs lignes (j'ai forcé 4 courtes phrases séparées par <br/> pour s'assurer de la structure "4 lignes").
  - Accessibilité : alt text, focus styles, aria-labels, respects prefers-reduced-motion.
  - Dépendances : framer-motion et lucide-react (comme dans ton projet actuel).
*/

const features = [
  {
    id: "safety",
    title: "Sécurité prioritaire",
    points: [
      "Chauffeurs vérifiés et formés",
      "Suivi en temps réel",
      "Assistance 24/7",
    ],
    image: safetyPic,
    alt: "Chauffeur professionnel vérifié",
    Icon: ShieldCheck,
    color: "#3650D0",
  },
  {
    id: "price",
    title: "Tarifs transparents",
    points: [
      "Prix clairs dès le départ",
      "Aucun frais caché",
      "Promotions régulières",
    ],
    image: payementPic,
    alt: "Paiement et reçu clair",
    Icon: Tag,
    color: "#FF7B00",
  },
  {
    id: "speed",
    title: "Rapidité & optimisation",
    points: [
      "Algorithmes intelligents",
      "Réseau de chauffeurs étendu",
      "Arrivée rapide garantie",
    ],
    image: puissancePic,
    alt: "Voiture rapide en ville",
    Icon: Zap,
    color: "#3650D0",
  },
  {
    id: "support",
    title: "Support humain & local",
    points: [
      "Équipe locale dédiée",
      "Disponible par téléphone et chat",
      "Satisfaction prioritaire",
    ],
    image: supportPic,
    alt: "Agent support aidant un client",
    Icon: LifeBuoy,
    color: "#FF7B00",
  },
];

const FeatureCard = ({ feature, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = feature.Icon;

  // Image rendering logic
  const renderImage = () => {
    const hasPictureShape = feature.image && typeof feature.image === 'object' && ("sources" in feature.image || "img" in feature.image);
    if (hasPictureShape) {
      const rawSources = feature.image.sources;
      const sources = Array.isArray(rawSources) ? rawSources : rawSources ? Object.values(rawSources) : [];
      const img = feature.image.img || {};
      return (
        <picture>
          {sources.map((source, idx) => (
            <source key={idx} type={source.type} srcSet={source.srcset} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
          <img
            src={img.src || (typeof feature.image === 'string' ? feature.image : '')}
            alt={feature.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
            width={img.w || 800}
            height={img.h || 600}
          />
        </picture>
      );
    }
    return (
      <img
        src={typeof feature.image === 'string' ? feature.image : ''}
        alt={feature.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        decoding="async"
        width="800"
        height="600"
      />
    );
  };

  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y: 50 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseMove={handleMouseMove}
    >
      {/* Glowing effect */}
      {!reduceMotion && (
        <div
          className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${feature.color}40, transparent 60%)`,
          }}
        />
      )}

      {/* Card */}
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl"
        whileHover={reduceMotion ? {} : { y: -8 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front side */}
        <div className={`relative h-full transition-opacity duration-500 ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Image with overlay */}
          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
            {renderImage()}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Floating icon */}
            <motion.div
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center"
              whileHover={reduceMotion ? {} : { rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: feature.color }} />
            </motion.div>

            {/* Sparkle effect */}
            <motion.div
              className="absolute top-4 left-4 sm:top-8 sm:left-8"
              animate={reduceMotion ? {} : {
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 md:p-8">
            <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-brand-blue mb-3 sm:mb-4">
              {feature.title}
            </h3>
            <ul className="space-y-2 mb-4 sm:mb-6">
              {feature.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-gray-600 font-sans">
                  <span className="text-brand-blue mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-brand-blue text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-brand-blue/90 hover:text-[#FFCA80] transition-all group/btn font-sans"
            >
              <span className="group-hover/btn:text-[#FFCA80]">Découvrir</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-[#FFCA80]" />
            </Link>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: feature.color }} />
        </div>

        {/* Back side (flipped) */}
        <div 
          className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center items-center text-center text-white transition-opacity duration-500"
          style={{ backgroundColor: feature.color, opacity: isFlipped ? 1 : 0, pointerEvents: isFlipped ? 'auto' : 'none' }}
        >
          <Icon className="w-20 h-20 mb-6 opacity-90" />
          <h4 className="font-display text-2xl font-bold mb-4">{feature.title}</h4>
          <p className="text-white/90 leading-relaxed">
            {feature.description}
          </p>
          <button className="mt-8 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-all">
            En savoir plus
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeaturesZSection = () => {
  const [showStoreModal, setShowStoreModal] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Animated background elements */}
      {!reduceMotion && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
          initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-semibold text-sm mb-4 sm:mb-6"
            whileHover={reduceMotion ? {} : { scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            Nos Avantages
          </motion.div>
          
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-blue mb-4 sm:mb-6 px-4">
            Ce qui nous rend unique
          </h2>
          <p className="mt-4 font-sans text-gray-600 text-base sm:text-lg max-w-3xl mx-auto px-4">
            Une expérience de transport révolutionnaire combinant technologie de pointe et service humain exceptionnel
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            type="button"
            onClick={() => setShowStoreModal(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-orange text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#e66f00] hover:text-[#FFCA80] transition-all"
            whileHover={reduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={reduceMotion ? {} : { scale: 0.98 }}
          >
            <Sparkles className="w-5 h-5" />
            Télécharger l'application
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Store selection modal */}
      {showStoreModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="store-modal-title">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowStoreModal(false)} />
          <div className="relative z-50 w-full max-w-md mx-auto rounded-2xl bg-white shadow-xl p-6">
            <button
              type="button"
              className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100"
              aria-label="Fermer"
              onClick={() => setShowStoreModal(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3 id="store-modal-title" className="font-display text-xl font-bold text-gray-900">Télécharger l'application</h3>
            <p className="mt-2 text-gray-600">Choisissez votre store pour continuer.</p>
            <div className="mt-5 flex flex-wrap gap-4 items-center">
              <a
                href={LINKS.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir Google Play"
                className="inline-flex items-center gap-2 text-brand-blue hover:underline font-semibold"
              >
                <Play className="w-5 h-5" /> Google Play
              </a>
              <a
                href={LINKS.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir l'App Store"
                className="inline-flex items-center gap-2 text-brand-orange hover:underline font-semibold"
              >
                <Apple className="w-5 h-5" /> App Store
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturesZSection;
