import { useEffect, useRef } from "react";
import MaterialCard from "./MaterialCard";

const DEG_PER_SEC = 1.45;
const CARD_COUNT = 37;

/**
 * Tight cylindrical radius from card width so the arc is VISIBLY curved.
 * Using the chord formula (not a huge arbitrary radius that reads as a flat row).
 */
function cylinderRadius(cardWidth, count) {
  // Slightly under full edge-to-edge packing → clearer curvature in-viewport.
  const halfChord = cardWidth * 0.48;
  return Math.max(220, Math.round(halfChord / Math.tan(Math.PI / count)));
}

function getMetrics(width, cardWidth) {
  const radius = cylinderRadius(cardWidth, CARD_COUNT);

  if (width < 480) {
    return { radius, perspective: 820, y: 6 };
  }
  if (width < 768) {
    return { radius, perspective: 900, y: 8 };
  }
  if (width < 1100) {
    return { radius, perspective: 980, y: 10 };
  }
  return { radius, perspective: 1050, y: 12 };
}

function normalizeAngle(deg) {
  const wrapped = ((deg % 360) + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

export default function MaterialCarousel({ cards }) {
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const items = Array.isArray(cards) ? cards.slice(0, CARD_COUNT) : [];

  useEffect(() => {
    if (!items.length) return undefined;

    const viewport = viewportRef.current;
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!viewport || !stage || !ring) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let boot = 0;
    let rotation = 0;
    let last = performance.now();
    let nodes = [];
    let step = 0;
    let running = true;
    let listening = false;
    let cardWidth = 100;
    let metrics = getMetrics(window.innerWidth, cardWidth);

    const measureCardWidth = () => {
      const sample = cardRefs.current.find(Boolean);
      if (sample) {
        const w = sample.offsetWidth;
        if (w > 0) cardWidth = w;
      } else {
        const raw = getComputedStyle(viewport).getPropertyValue("--hero-card-w").trim();
        const parsed = Number.parseFloat(raw);
        if (Number.isFinite(parsed) && parsed > 0) cardWidth = parsed;
      }
    };

    const placeCards = () => {
      measureCardWidth();
      metrics = getMetrics(window.innerWidth, cardWidth);
      stage.style.perspective = `${metrics.perspective}px`;

      // FIXED seats on the cylinder — never animated independently.
      for (let i = 0; i < nodes.length; i += 1) {
        const angle = i * step;
        nodes[i].style.transform =
          `rotateY(${angle}deg) translateZ(${metrics.radius}px)`;
      }
    };

    const applyFacing = () => {
      // Soft depth cue only — geometry already creates size/angle via perspective.
      // No CSS filter (filter flattens 3D in many browsers).
      for (let i = 0; i < nodes.length; i += 1) {
        const el = nodes[i];
        const world = normalizeAngle(i * step + rotation);
        const facing = Math.cos((world * Math.PI) / 180);

        if (facing > 0.12) {
          el.style.opacity = String(0.45 + facing * 0.55);
          el.style.visibility = "visible";
          el.setAttribute("aria-hidden", "false");
        } else if (facing > -0.35) {
          el.style.opacity = String(0.1 + Math.max(0, facing + 0.35) * 0.35);
          el.style.visibility = "visible";
          el.setAttribute("aria-hidden", "true");
        } else {
          el.style.opacity = "0";
          el.style.visibility = "hidden";
          el.setAttribute("aria-hidden", "true");
        }
      }
    };

    const applyRing = () => {
      // Rotate the CYLINDER only. Keep center of the cylinder near the
      // scene origin so the FRONT face (center of reel) is nearest.
      // A small backward shift keeps cards behind hero type without flattening.
      const settle = -(metrics.radius * 0.18);
      ring.style.transform =
        `translate3d(0, ${metrics.y}px, ${settle}px) rotateY(${rotation}deg)`;
      applyFacing();
    };

    const tick = (now) => {
      if (!running) return;
      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      rotation -= DEG_PER_SEC * dt; // right → left via cylinder spin
      applyRing();
      raf = window.requestAnimationFrame(tick);
    };

    const onResize = () => {
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

    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("resize", onResize, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      reduced.addEventListener("change", onMotionChange);
    };

    const begin = () => {
      if (!running) return;
      nodes = cardRefs.current.filter(Boolean).slice(0, items.length);
      if (!nodes.length) {
        boot = window.requestAnimationFrame(begin);
        return;
      }

      step = 360 / nodes.length;
      placeCards();
      applyRing();
      attach();

      if (!reduced.matches) {
        last = performance.now();
        raf = window.requestAnimationFrame(tick);
      }
    };

    boot = window.requestAnimationFrame(begin);

    return () => {
      running = false;
      window.cancelAnimationFrame(boot);
      window.cancelAnimationFrame(raf);
      if (listening) {
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        reduced.removeEventListener("change", onMotionChange);
      }
    };
  }, [items.length]);

  return (
    <div className="material-carousel" ref={viewportRef} aria-hidden="true">
      <div className="material-carousel__stage" ref={stageRef}>
        <div className="material-carousel__ring" ref={ringRef}>
          {items.map((card, index) => (
            <MaterialCard
              key={`${card.category}-${card.title}-${index}`}
              card={card}
              index={index}
              cardRef={(node) => {
                if (node) cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
