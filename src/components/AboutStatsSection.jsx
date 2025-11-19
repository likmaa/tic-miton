import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";



function useCountTo(target, duration = 1600, reduceMotion = false, decimals = 0) {
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let raf = null;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = target * progress;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setValue(target); // ensure exact final
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduceMotion, decimals]);

  return value;
}

const DEFAULT_STATS = [
  { id: "rides", label: "Trajets réalisés", value: 5200, suffix: "+" },
  { id: "users", label: "Utilisateurs actifs", value: 1800, suffix: "+" },
  { id: "cities", label: "Villes desservies", value: 3, suffix: "" },
  { id: "drivers", label: "Chauffeurs partenaires", value: 120, suffix: "+" },
];

const StatCard = ({ stat, duration, reduceMotion }) => {
  const decimals = Number.isInteger(stat.value) ? 0 : 1;
  const counted = useCountTo(stat.value, duration, reduceMotion, decimals);

  // format large numbers with thousand separators
  const formatted = decimals > 0
    ? counted.toFixed(decimals)
    : new Intl.NumberFormat().format(counted);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-start">
      <div className="text-sm text-gray-500 font-sans">{stat.label}</div>
      <div className="mt-3 flex items-baseline gap-3">
        <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-gray-900">
          {formatted}
          {stat.suffix && <span className="text-2xl text-gray-500 ml-1">{stat.suffix}</span>}
        </div>
        {stat.delta && <div className="text-sm text-emerald-500 font-medium">{stat.delta}</div>}
      </div>

      {/* Live region for screen readers */}
      <span className="sr-only" aria-live="polite">
        {`${formatted}${stat.suffix} — ${stat.label}`}
      </span>
    </div>
  );
};

const AboutStatsSection = ({
  stats = DEFAULT_STATS,
  className = "",
  duration = 1600,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={`relative overflow-hidden py-16 px-6 md:px-12 lg:px-20 bg-[#3650D0] ${className}`}
      aria-labelledby="stats-heading"
    >
      {/* orange radial gradients with very low opacity over blue background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(55% 55% at 85% 20%, rgba(255,140,0,0.12), rgba(255,140,0,0.06) 35%, rgba(255,140,0,0) 70%)",
          filter: "blur(64px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(45% 45% at 15% 85%, rgba(255,94,0,0.08), rgba(255,94,0,0.04) 30%, rgba(255,94,0,0) 65%)",
          filter: "blur(72px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center md:text-left mb-8">
          <p className="text-sm text-white/80 font-sans">Nos chiffres en action</p>
          <h2 id="stats-heading" className="font-display text-3xl sm:text-4xl lg:text-3xl font-extrabold text-white">
            Impact mesurable, croissance réelle
          </h2>
          <p className="mt-3 text-white/80 font-sans max-w-2xl">
            Chiffres réels issus de notre activité locale — trajets, utilisateurs, chauffeurs et villes couvertes.
            Nous partageons ces indicateurs pour rester transparents avec notre communauté.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard key={s.id} stat={s} duration={duration} reduceMotion={reduceMotion} />
          ))}
        </div>

        <div className="mt-8 text-center md:text-left">
          <a
            href="#download"
            className="inline-flex items-center gap-3 bg-[#FF7B00] text-white px-5 py-3 rounded-md font-sans font-semibold shadow-lg hover:bg-[#e66f00] hover:text-[#FFCA80] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#FF7B00]/30"
            aria-label="Télécharger l'application"
          >
            Télécharger l'application
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;