import React, { useEffect, useRef } from "react";

function hexToRgba(hex, alpha = 1) {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  }
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const Aurora = ({
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = "absolute inset-0 -z-10",
  style,
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = Math.max(1, Math.floor((rect?.width || window.innerWidth)));
      height = Math.max(1, Math.floor((rect?.height || 400)));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    const t0 = performance.now();

    const draw = (now) => {
      const t = (now - t0) / 1000; // seconds
      ctx.clearRect(0, 0, width, height);

      // background gradient subtle
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, hexToRgba("#1e2a78", 0.25));
      bg.addColorStop(1, hexToRgba("#0a1a6a", 0.25));
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Aurora blobs
      const minDim = Math.min(width, height);
      const baseR = minDim * 0.65; // big soft blobs
      const amp = minDim * 0.08 * amplitude; // movement amplitude
      const spd = 0.4 * speed; // speed factor

      ctx.globalCompositeOperation = "lighter"; // additive blend

      colorStops.forEach((hex, i) => {
        const phase = (i / colorStops.length) * Math.PI * 2;
        const x = width * 0.5 + Math.sin(t * spd + phase) * amp;
        const y = height * 0.5 + Math.cos(t * (spd * 0.8) + phase) * amp;
        const r = baseR * (0.9 + 0.15 * Math.sin(t * (spd * 0.6) + phase));

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, hexToRgba(hex, Math.max(0, Math.min(1, blend))));
        grad.addColorStop(1, hexToRgba(hex, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";

      if (!reduceMotionRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    if (!reduceMotionRef.current) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // single static frame for reduced motion
      draw(performance.now());
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className} pointer-events-none`} 
      style={style}
      aria-hidden="true"
    />
  );
};

export default Aurora;
