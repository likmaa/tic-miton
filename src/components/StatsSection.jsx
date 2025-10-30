import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Users, MapPin, Star, Repeat } from "lucide-react";

/*
  StatsSection.jsx
  - Section statistique compacte à placer juste après le Hero (avant "How it works").
  - Mobile-first, responsive grid.
  - Animations des compteurs avec respect de prefers-reduced-motion (useReducedMotion).
  - Accessible : chaque compteur a un contenu visuel et un aria-live pour annoncer la valeur aux assistances.
  - Visuel cohérent avec la charte : couleurs brand (#3650D0), coins arrondis, typographies héritées du projet.
*/

function useCount(target, duration = 1500, reduceMotion = false, decimals = 0) {
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let raf= null;
    let start = null;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = target * progress;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target); // ensure exact final value
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduceMotion, decimals]);

  return value;
}

const statsData = [
  {
    id: "rides",
    label: "Trajets effectués",
    value: 800,
    suffix: "+",
    icon: Repeat,
    decimals: 0,
  },
  {
    id: "drivers",
    label: "Chauffeurs actifs",
    value: 20,
    suffix: "+",
    icon: Users,
    decimals: 0,
  },
  {
    id: "rating",
    label: "Note moyenne",
    value: 4.8,
    suffix: "/5",
    icon: Star,
    decimals: 1,
  },
  {
    id: "cities",
    label: "Villes desservies",
    value: 2,
    suffix: "",
    icon: MapPin,
    decimals: 0,
  },
];

// Child component so hooks are not called inside loops/maps
const StatCard = ({ stat, reduceMotion, itemAnim }) => {
  const Icon = stat.icon;
  const counted = useCount(
    stat.value,
    stat.id === "rating" ? 1400 : 1600,
    reduceMotion,
    stat.decimals
  );

  const formatted =
    stat.decimals > 0
      ? counted.toFixed(stat.decimals)
      : new Intl.NumberFormat().format(counted);

  return (
    <motion.article
      key={stat.id}
      className="bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm"
      variants={itemAnim}
      aria-labelledby={`stat-${stat.id}-label`}
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-[#FF7B00] text-white flex items-center justify-center">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          {/* Visible counter */}
          <div
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-gray-900"
            aria-hidden="true"
          >
            {formatted}
            <span className="text-xl text-gray-500 ml-1">{stat.suffix}</span>
          </div>

          {/* Hidden live region for screen readers */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {`${formatted}${stat.suffix} — ${stat.label}`}
          </div>
        </div>

        <div id={`stat-${stat.id}-label`} className="mt-1 font-sans text-sm text-gray-600">
          {stat.label}
        </div>
      </div>
    </motion.article>
  );
};

const StatsSection = () => {
  const reduceMotion = useReducedMotion();

  // Animations container variants (stagger) — disabled if reduced motion
  const container = reduceMotion
    ? {}
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.09 } },
      };

  const itemAnim = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
      };

  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue">
            Nos chiffres jusqu'à présent
          </h2>
          <p className="mt-3 font-sans text-gray-900 max-w-2xl mx-auto">
            Depuis notre lancement à Porto-Novo, nous avons déplacés plusieurs
            d'usagers et disposons d'un réseau de chauffeurs fiable et très réactif.
          </p>
        </div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          initial="hidden"
          animate="show"
          variants={container}
        >
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} reduceMotion={reduceMotion} itemAnim={itemAnim} />
          ))}
        </motion.div>

        
      </div>
    </section>
  );
};

export default StatsSection;
