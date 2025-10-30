import React, { useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
  PartnersMarqueeSection.jsx
  - Présentation des entreprises partenaires en scroll infini horizontal (marquee).
  - Mobile-first : full-width, logos centrés verticalement.
  - Accessibilité : liens focusables, pause au focus/hover, labels, respects prefers-reduced-motion.
  - Props:
      - partners: array of { id, name, logo, href } (logo = url or import)
      - speed: number (seconds for one full loop, default 28)
      - direction: 'left' | 'right' (default 'left')
      - showControls: boolean (show play/pause button)
      - cardWidth: tailwind-like width string or number px fallback
  - Usage:
      <PartnersMarqueeSection partners={PARTNERS} speed={28} direction="left" />
  - Notes:
      - For seamless loop we render the partners list twice.
      - Prefer SVG or optimized WebP logos for best results.
*/

const DEFAULT_PARTNERS = [
  // Remplace ces logos par tes assets locaux (import...) ou URLs réelles
  { id: "p1", name: "Trip.com", logo: "https://via.placeholder.com/240x72?text=Trip.com", href: "#" },
  { id: "p2", name: "GoDaddy", logo: "https://via.placeholder.com/240x72?text=GoDaddy", href: "#" },
  { id: "p3", name: "Atomberg", logo: "https://via.placeholder.com/240x72?text=Atomberg", href: "#" },
  { id: "p4", name: "Docusign", logo: "https://via.placeholder.com/240x72?text=Docusign", href: "#" },
  { id: "p5", name: "Uber", logo: "https://via.placeholder.com/240x72?text=Uber", href: "#" },
  { id: "p6", name: "Meta", logo: "https://via.placeholder.com/240x72?text=Meta", href: "#" },
];

const LogoItem = ({ partner, cardWidth }) => {
  const widthClass = cardWidth || "w-[14rem] sm:w-[16rem] md:w-[18rem]";
  return (
    <a
      href={partner.href || "#"}
      target={partner.href ? "_blank" : undefined}
      rel={partner.href ? "noopener noreferrer" : undefined}
      className={`flex items-center justify-center ${widthClass} flex-shrink-0 px-6 py-6`}
      aria-label={partner.name}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-10 object-contain filter grayscale opacity-80 hover:filter-none hover:opacity-100 transition-all duration-300"
        loading="lazy"
        width="240"
        height="72"
      />
    </a>
  );
};

const PartnersMarqueeSection = ({
  partners = DEFAULT_PARTNERS,
  speed = 28,
  direction = "left",
  showControls = true,
  cardWidth = null,
  className = "",
}) => {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // duplicated array for seamless scroll
  const partnersDoubled = useMemo(() => [...partners, ...partners], [partners]);

  // animation direction and duration handling
  const animDirection = direction === "right" ? "reverse" : "normal";
  const animationDuration = `${speed}s`;

  // Pause logic: paused if reduced motion OR (user paused OR hover/focus)
  const paused = reduceMotion || isPaused;

  return (
    <section className={`bg-white py-8 ${className}`} aria-label="Nos partenaires">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-6 text-center">
          <div>
            <p className="text-sm text-gray-500 font-sans">Partenaires</p>
            <h3 className="mt-1 font-display text-2xl md:text-3xl font-extrabold text-brand-blue">
              Entreprises qui nous font confiance
            </h3>
          </div>

          {showControls && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setIsPaused((p) => !p)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-200"
                aria-pressed={isPaused}
                aria-label={isPaused ? "Relancer le défilement des partenaires" : "Mettre en pause le défilement des partenaires"}
              >
                {isPaused ? "Play" : "Pause"}
              </button>
            </div>
          )}
        </div>

        {/* marquee viewport */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => !reduceMotion && setIsPaused(true)}
          onMouseLeave={() => !reduceMotion && setIsPaused(false)}
          onFocus={() => !reduceMotion && setIsPaused(true)}
          onBlur={() => !reduceMotion && setIsPaused(false)}
          ref={containerRef}
        >
          {/* gradient fades on left/right for soft edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10 hidden md:block"
            style={{ background: "linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10 hidden md:block"
            style={{ background: "linear-gradient(270deg, rgba(255,255,255,1), rgba(255,255,255,0))" }} />

          {/* the animated track wrapper. We use CSS animation for smooth hardware-accelerated transform. */}
          <div
            className={`flex items-center gap-2 will-change-transform`}
            style={{
              // the CSS animation is defined inline below in the <style> block; we set custom properties here
              animationDuration: animationDuration,
              animationDirection: animDirection,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
            aria-hidden={reduceMotion ? "true" : "false"}
          >
            {/* render the doubled list; each item is a logo link */}
            {partnersDoubled.map((p, idx) => (
              <LogoItem key={`${p.id}-${idx}`} partner={p} cardWidth={cardWidth} />
            ))}
          </div>
        </div>
      </div>

      {/* Inline CSS for the marquee animation (translateX -50% to loop seamless) */}
      <style>{`
        /* The parent .flex above contains two copies of the list; we translate it left by 50% to show the second half seamlessly. */
        .will-change-transform {
          animation-name: partners-marquee;
        }
        @keyframes partners-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        /* Respect reduced motion at media level too */
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { animation: none !important; transform: none !important; }
        }

        /* tweak for smaller screens: slower by default (if speed small, keep scaled) */
        @media (max-width: 640px) {
          .will-change-transform {
            /* we don't override duration here because we pass custom animationDuration inline,
               but you can tweak via JS if you want mobile-specific timing */
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersMarqueeSection;
