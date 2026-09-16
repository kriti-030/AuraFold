import { useEffect, useRef } from "react";
import MaterialCard from "./MaterialCard";

const DEG_PER_SEC = 1.4;
const CARD_COUNT = 37;

function getMetrics(width) {
  if (width < 480) {
    return { radius: 320, perspective: 1000, y: 8 };
  }
  if (width < 768) {
    return { radius: 460, perspective: 1200, y: 10 };
  }
  if (width < 1100) {
    return { radius: 600, perspective: 1400, y: 12 };
  }
  return { radius: 700, perspective: 1500, y: 14 };
}

function normalizeAngle(deg) {
  const wrapped = ((deg % 360) + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

export default function MaterialCarousel({ cards }) {
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const items = Array.isArray(cards) ? cards.slice(0, CARD_COUNT) : [];

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return undefined;

    const nodes = cardRefs.current.filter(Boolean).slice(0, items.length);
    if (!nodes.length) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let rotation = 0;
    let last = performance.now();
    let metrics = getMetrics(window.innerWidth);
    const step = 360 / nodes.length;

    // Fixed cylindrical placement — cards never independently translate.
    const placeCards = () => {
      stage.style.perspective = `${metrics.perspective}px`;
      for (let i = 0; i < nodes.length; i += 1) {
        const el = nodes[i];
        el.style.transform = `rotateY(${i * step}deg) translateZ(${metrics.radius}px)`;
      }
    };

    // Soft facing cue only — depth comes from perspective + cylinder geometry.
    const applyFacing = () => {
      for (let i = 0; i < nodes.length; i += 1) {
        const el = nodes[i];
        const world = normalizeAngle(i * step + rotation);
        const facing = Math.cos((world * Math.PI) / 180);
        const front = facing > 0;
        el.style.opacity = front ? String(0.45 + facing * 0.55) : "0.12";
        el.style.filter = front
          ? `brightness(${0.62 + facing * 0.38})`
          : "brightness(0.35)";
        el.setAttribute("aria-hidden", front ? "false" : "true");
      }
    };

    // Cylinder rotates as ONE object around Y.
    // Fixed depth offset positions the ring in the scene — it does not animate.
    const applyRing = () => {
      const depth = -(metrics.radius * 0.28);
      ring.style.transform = `translateY(${metrics.y}px) translateZ(${depth}px) rotateY(${rotation}deg)`;
      applyFacing();
    };

    const tick = (now) => {
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      rotation += DEG_PER_SEC * dt;
      applyRing();
      raf = window.requestAnimationFrame(tick);
    };

    const onResize = () => {
      metrics = getMetrics(window.innerWidth);
      placeCards();
      applyRing();
    };

    const onVisibility = () => {
      if (!document.hidden) last = performance.now();
    };

    const onMotionChange = () => {
      window.cancelAnimationFrame(raf);
      placeCards();
      applyRing();
      if (!reduced.matches) {
        last = performance.now();
        raf = window.requestAnimationFrame(tick);
      }
    };

    placeCards();
    applyRing();
    if (!reduced.matches) raf = window.requestAnimationFrame(tick);

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotionChange);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, [items.length]);

  return (
    <div className="material-carousel" aria-hidden="true">
      <div className="material-carousel__stage" ref={stageRef}>
        <div className="material-carousel__ring" ref={ringRef}>
          {items.map((card, index) => (
            <MaterialCard
              key={`${card.category}-${card.title}-${index}`}
              card={card}
              index={index}
              cardRef={(node) => {
                cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
