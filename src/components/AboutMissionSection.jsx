import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Users, Sparkles } from "lucide-react";
import missionImage from "../assets/features/Mission.png?w=480;768;1200;1600&format=webp;avif;jpg&as=picture";
import visionImage from "../assets/features/vision.png?w=480;768;1200;1600&format=webp;avif;jpg&as=picture";
import valeursImage from "../assets/features/valeurs.png?w=480;768;1200;1600&format=webp;avif;jpg&as=picture";



const DEFAULT_ITEMS = [
  {
    id: "mission",
    title: "Notre mission",
    lines: [
      "Rendre la mobilité urbaine simple et fiable.",
      "Permettre aux citoyens d'accéder à des trajets sécurisés.",
      "Soutenir l'économie locale en connectant chauffeurs et clients.",
      "Innover avec des outils adaptés au contexte béninois.",
    ],
    image: missionImage,
  objectPosition: "center 25%",
    accent: "from-indigo-400 to-indigo-200",
    Icon: Globe,
  },
  {
    id: "vision",
    title: "Notre vision",
    lines: [
      "Un écosystème urbain connecté et durable.",
      "Des trajets optimisés par la donnée et la proximité.",
      "Une plateforme qui crée des opportunités locales.",
      "S'étendre en privilégiant la qualité du service.",
    ],
    image: visionImage,
  objectPosition: "center 25%",
    accent: "from-orange-400 to-amber-300",
    Icon: Sparkles,
  },
  {
    id: "values",
    title: "Nos valeurs",
    lines: [
      "Sécurité : priorité à chaque trajet.",
      "Transparence : tarifs clairs et équitables.",
      "Proximité : service humain et local.",
      "Innovation : expériences simples et fiables.",
    ],
  image: valeursImage,
  objectPosition: "center 25%",
    accent: "from-emerald-300 to-lime-200",
    Icon: Users,
  },
];

const FeatureCard = ({ item, reducedMotion }) => {
  const Icon = item.Icon;
  const anim = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <motion.article
      {...anim}
      id={item.id}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full"
      aria-labelledby={`${item.id}-title`}
    >
      {/* top image */}
      <div className="w-full h-40 md:h-44 overflow-hidden">
        {(() => {
          const hasPictureShape = item.image && typeof item.image === 'object' && ("sources" in item.image || "img" in item.image);
          if (hasPictureShape) {
            const rawSources = item.image.sources;
            const sources = Array.isArray(rawSources)
              ? rawSources
              : rawSources
                ? Object.values(rawSources)
                : [];
            const img = item.image.img || {};
            return (
              <picture>
                {sources.map((source, idx) => (
                  <source key={idx} type={source.type} srcSet={source.srcset} sizes="(min-width: 1024px) 33vw, 100vw" />
                ))}
                <img
                  src={img.src || (typeof item.image === 'string' ? item.image : '')}
                  alt={`${item.title} illustration`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={img.w || 1200}
                  height={img.h || 600}
                  style={{ objectPosition: item.objectPosition || "center center" }}
                />
              </picture>
            );
          }
          return (
            <img
              src={typeof item.image === 'string' ? item.image : ''}
              alt={`${item.title} illustration`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width="1200"
              height="600"
              style={{ objectPosition: item.objectPosition || "center center" }}
            />
          );
        })()}
      </div>

      {/* content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 id={`${item.id}-title`} className="font-display text-lg text-gray-900 font-semibold">
            {item.title}
          </h3>

          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br ${item.accent} shadow-sm`}
            aria-hidden="true"
            title={item.title}
          >
            {Icon && <Icon className="w-5 h-5" />}
          </div>
        </div>

        <ul className="mt-4 font-sans text-sm text-gray-600 flex-1 space-y-2">
          {item.lines.map((l, i) => (
            <li key={i} className="leading-snug">
              {l}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <a
            href={`#${item.id}`}
            className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-indigo-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200 rounded"
            aria-label={`En savoir plus sur ${item.title}`}
          >
            En savoir plus →
          </a>
        </div>
      </div>
    </motion.article>
  );
};

const AboutMissionSection = ({ items = DEFAULT_ITEMS, className = "" }) => {
  const reducedMotion = useReducedMotion();

  return (
    <section className={`relative bg-white overflow-hidden py-16 px-6 md:px-12 lg:px-20 ${className}`}>
      {/* soft pastel gradient on the right like in Image 2 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/2 hidden md:block"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 20%, rgba(147,51,234,0.08), rgba(99,102,241,0.06) 22%, rgba(255, 123, 0, 0.03) 46%, rgba(255,255,255,0) 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Intro column */}
          <div className="md:col-span-1">
            <p className="text-sm text-brand-blue font-sans mb-3">Notre identité</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-3xl font-extrabold text-brand-orange leading-tight">
              Mission, vision & valeurs
            </h2>
            <p className="mt-4 font-sans text-gray-900 max-w-prose">
              Ce qui nous guide chez TIC Miton : offrir une mobilité intelligente, locale et fiable,
              pensée pour le quotidien des habitants de Porto‑Novo et du Bénin.
            </p>

            <div className="mt-6">
              <a
                href="#mission"
                className="inline-flex items-center gap-3 bg-brand-blue text-white px-4 py-2 rounded-full font-sans font-semibold shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-black/20"
              >
                Découvrir la mission
              </a>
            </div>
          </div>

          {/* Cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((it) => (
              <FeatureCard key={it.id} item={it} reducedMotion={reducedMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMissionSection;
