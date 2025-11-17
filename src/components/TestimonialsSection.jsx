import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, Pause } from "lucide-react";



const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: "Noah Patel",
    handle: "@noah_ops",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
    text:
      "Service impeccable. Le chauffeur est arrivé rapidement et la course était sûre. Je recommande TIC Miton à tous mes amis.",
  },
  {
    id: 2,
    name: "Maya Kim",
    handle: "@mayak",
    avatar:
      "https://images.unsplash.com/photo-1545996124-1b7e3b6b6c9d?w=200&q=80&auto=format&fit=crop",
    text:
      "Application fluide et intuitive. Les tarifs sont clairs et j'obtiens toujours un chauffeur en quelques minutes.",
  },
  {
    id: 3,
    name: "Leo Martin",
    handle: "@leom",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop",
    text:
      "Service client local et réactif — ils ont résolu mon souci en un appel. Très rassurant.",
  },
  {
    id: 4,
    name: "Sofia Alvarez",
    handle: "@sofialabs",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80&auto=format&fit=crop",
    text:
      "Trajets rapides et chauffeurs professionnels — parfait pour mes déplacements en ville.",
  },
  {
    id: 5,
    name: "Jackson Lee",
    handle: "@jacksonlee",
    avatar:
      "https://images.unsplash.com/photo-1548095115-45697e6f7f4a?w=200&q=80&auto=format&fit=crop",
    text:
      "Application très pratique pour les livraisons. Les livreurs sont ponctuels et soigneux.",
  },
  {
    id: 6,
    name: "Amina Diop",
    handle: "@amina",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80&auto=format&fit=crop",
    text:
      "J'apprécie la transparence des prix et la possibilité de partager mon trajet en temps réel.",
  },
];

const TestimonialCard = ({ t, cardWidth, onFocusChange }) => {
  // Narrower cards on very small screens to avoid excessive overflow; still marquee inside overflow-hidden
  const widthClass =
    cardWidth || "w-[20rem] sm:w-[24rem] md:w-[30rem] lg:w-[34rem]";
  return (
    <article
      tabIndex={0}
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
      className={`${widthClass} flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/20`}
      aria-labelledby={`test-${t.id}-title`}
    >
      <div className="flex items-start gap-4">
        <img
          src={t.avatar}
          alt={`${t.name} avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4
              id={`test-${t.id}-title`}
              className="font-display text-base text-gray-900 font-semibold"
            >
              {t.name}
            </h4>
            <span className="text-sm text-gray-400">{t.handle}</span>
          </div>
          <p className="mt-3 font-sans text-gray-700 text-sm leading-relaxed">{t.text}</p>
        </div>
      </div>
    </article>
  );
};

// Version 100% statique : aucun fetch, uniquement la liste par défaut ou passée en props.
const TestimonialsSection = ({
  items = DEFAULT_TESTIMONIALS,
  topSpeed = 28,
  bottomSpeed = 36,
  pauseOnHover = true,
  pauseOnFocus = true,
  showControls = true,
  fade = true,
  cardWidth = null,
  rows = 2,
}) => {
  const reduceMotion = useReducedMotion();
  const effectiveItems = items;

  // Plus aucune logique de récupération : avatars déjà dans les items statiques.

  // internal states for pause handling
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [hoverCount, setHoverCount] = useState(0); // number of hover enters active
  const [focusCount, setFocusCount] = useState(0); // number of focused cards active

  const isHovering = hoverCount > 0;
  const isFocused = focusCount > 0;

  const paused =
    reduceMotion ||
    isManuallyPaused ||
    (pauseOnHover && isHovering) ||
    (pauseOnFocus && isFocused);

  // refs for wrappers (optional, in case you want to manipulate)
  const topRef = useRef(null);
  const botRef = useRef(null);

  // compute track durations and directions
  const topDuration = topSpeed;
  const botDuration = bottomSpeed;
  const topDirection = "normal"; // left -> right perceived by translate direction (we translate -50%)
  const botDirection = "reverse";

  // duplicated track sections rendered inline below

  // handlers to increment/decrement hover/focus counts (safe if nested)
  const onEnter = () => setHoverCount((c) => c + 1);
  const onLeave = () => setHoverCount((c) => Math.max(0, c - 1));
  const onFocusEnter = () => setFocusCount((c) => c + 1);
  const onFocusLeave = () => setFocusCount((c) => Math.max(0, c - 1));

  // toggle manual pause
  const toggleManual = () => setIsManuallyPaused((v) => !v);

  // classname for fade overlays & track paused
  const pausedClass = paused ? "paused" : "";

  return (
    <section className="tmnls bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-blue">
            Témoignages
          </h2>
          <p className="mt-3 font-sans text-gray-600 max-w-2xl mx-auto">
            Ce que disent nos utilisateurs
          </p>
        </div>

        {/* Controls (play/pause) */}
        {showControls && (
          <div className="absolute top-4 right-0 md:top-6 md:right-6 z-20">
            <button
              aria-pressed={isManuallyPaused}
              onClick={toggleManual}
              className="inline-flex items-center gap-2 bg-white/90 text-gray-900 px-3 py-2 rounded-full shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3650D0]/20"
            >
              {isManuallyPaused ? (
                <>
                  <Play className="w-4 h-4" aria-hidden />
                  <span className="text-sm font-sans">Lire</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" aria-hidden />
                  <span className="text-sm font-sans">Pause</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Fade overlays left/right */}
        {fade && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10"
              style={{
                background:
                  "linear-gradient(90deg, rgba(245,245,247,1) 0%, rgba(245,245,247,0) 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10"
              style={{
                background:
                  "linear-gradient(270deg, rgba(245,245,247,1) 0%, rgba(245,245,247,0) 100%)",
              }}
            />
          </>
        )}

        {/* Tracks container */}
        <div className="space-y-6">
          {/* Top track */}
          <div
            className="overflow-hidden relative"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            // note: we pause also when wrapper receives focus (e.g., via tabbing into cards)
            onFocus={() => {
              if (pauseOnFocus) onFocusEnter();
            }}
            onBlur={() => {
              if (pauseOnFocus) onFocusLeave();
            }}
          >
            <div
              ref={topRef}
              className={`flex gap-6 will-change-transform ${pausedClass}`}
              style={{
                // set CSS vars used by animation
                ["--marquee-duration"]: `${topDuration}s`,
                ["--marquee-direction"]: topDirection,
              }}
              aria-hidden={reduceMotion ? "true" : "false"}
            >
              <div className="marquee-track inline-flex gap-6" role="list">
                {effectiveItems.map((t) => (
                  <div key={`top-a-${t.id}`} role="listitem">
                    <TestimonialCard t={t} cardWidth={cardWidth} onFocusChange={(v) => (v ? onFocusEnter() : onFocusLeave())} />
                  </div>
                ))}
              </div>

              <div className="marquee-track inline-flex gap-6" role="list">
                {effectiveItems.map((t) => (
                  <div key={`top-b-${t.id}`} role="listitem">
                    <TestimonialCard t={t} cardWidth={cardWidth} onFocusChange={(v) => (v ? onFocusEnter() : onFocusLeave())} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200/60" />

          {/* Bottom track (reverse) - only if rows >= 2 */}
          {rows >= 2 && (
            <div
              className="overflow-hidden relative"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onFocus={() => {
                if (pauseOnFocus) onFocusEnter();
              }}
              onBlur={() => {
                if (pauseOnFocus) onFocusLeave();
              }}
            >
              <div
                ref={botRef}
                className={`flex gap-6 will-change-transform ${pausedClass}`}
                style={{
                  ["--marquee-duration"]: `${botDuration}s`,
                  ["--marquee-direction"]: botDirection,
                }}
                aria-hidden={reduceMotion ? "true" : "false"}
              >
                <div className="marquee-track inline-flex gap-6" role="list">
                  {effectiveItems.map((t) => (
                    <div key={`bot-a-${t.id}`} role="listitem">
                      <TestimonialCard t={t} cardWidth={cardWidth} onFocusChange={(v) => (v ? onFocusEnter() : onFocusLeave())} />
                    </div>
                  ))}
                </div>

                <div className="marquee-track inline-flex gap-6" role="list">
                  {effectiveItems.map((t) => (
                    <div key={`bot-b-${t.id}`} role="listitem">
                      <TestimonialCard t={t} cardWidth={cardWidth} onFocusChange={(v) => (v ? onFocusEnter() : onFocusLeave())} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inline styles for marquee animation & paused state (scoped via .tmnls) */}
      <style>{`
        /* marquee-track is inline-flex sets of items; the wrapper (flex) containing two tracks is animated */
        .tmnls .overflow-hidden > .flex {
          display: flex;
        }

        /* default animation: translateX from 0 to -50% to scroll items (duplicated content) */
        .tmnls .overflow-hidden > .flex {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: var(--marquee-duration, 28s);
          animation-direction: var(--marquee-direction, normal);
        }

        /* paused (class applied when computed paused === true) */
        .tmnls .paused {
          animation-play-state: paused !important;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* respect reduced motion at media level too */
        @media (prefers-reduced-motion: reduce) {
          .tmnls .overflow-hidden > .flex { animation: none !important; transform: none !important; }
        }

        /* ensure keyboard focus on a card doesn't clip it (makes it visually 'stick') */
        .tmnls .marquee-track article:focus-within {
          outline: none;
          transform: none !important;
        }

        /* smaller screens: slow down for readability by boosting duration (if not manually overridden) */
        @media (max-width: 480px) {
          .tmnls .overflow-hidden > .flex {
            animation-duration: calc(var(--marquee-duration, 28s) * 1.6);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
