import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export default function ScrollControls({ threshold = 120 }) {
  const reduceMotion = useReducedMotion();
  const [atTop, setAtTop] = React.useState(true);
  const [atBottom, setAtBottom] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const doc = document.documentElement;
      const scrollBottom = doc.scrollHeight - (y + window.innerHeight);
      setAtTop(y < threshold);
      setAtBottom(scrollBottom < threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    const behavior = reduceMotion ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };
  const scrollToBottom = () => {
    const behavior = reduceMotion ? "auto" : "smooth";
    const doc = document.documentElement;
    window.scrollTo({ top: doc.scrollHeight, behavior });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] pointer-events-none">
      <div className="flex flex-col gap-3 items-center pointer-events-auto">
        {/* Scroll to top */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Aller en haut"
          title="Haut"
          className={
            "shadow-md transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-blue/30 rounded-full p-3 bg-brand-blue text-white hover:bg-[#2b42b5] " +
            (atTop ? "opacity-70" : "opacity-100")
          }
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        {/* Scroll to bottom */}
        <button
          type="button"
          onClick={scrollToBottom}
          aria-label="Aller en bas"
          title="Bas"
          className={
            "shadow-md transition focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-brand-orange/30 rounded-full p-3 bg-brand-orange text-white hover:bg-[#e66f00] hover:text-[#FFCA80] " +
            (atBottom ? "opacity-70" : "opacity-100")
          }
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
