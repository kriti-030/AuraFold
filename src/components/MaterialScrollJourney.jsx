import { useEffect, useRef } from "react";
import { apparelJourney, footwearJourney } from "../data/scrollJourney";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function mapRange(progress, start, end) {
  return easeOutCubic(clamp((progress - start) / (end - start), 0, 1));
}

const ROLE_MOTION = {
  hero: {
    from: { x: 0, y: 36, z: -420, rx: 12, ry: -8, scale: 0.72, o: 0 },
    to: { x: 0, y: 0, z: 0, rx: 0, ry: 0, scale: 1, o: 1 },
    start: 0.02,
    end: 0.42,
  },
  side: {
    from: { x: 48, y: -24, z: -520, rx: 8, ry: 16, scale: 0.62, o: 0 },
    to: { x: 0, y: 0, z: -40, rx: 0, ry: 4, scale: 1, o: 1 },
    start: 0.08,
    end: 0.5,
  },
  stack: {
    from: { x: -48, y: 48, z: -560, rx: -10, ry: -14, scale: 0.58, o: 0 },
    to: { x: 0, y: 0, z: -80, rx: 2, ry: -3, scale: 1, o: 1 },
    start: 0.12,
    end: 0.56,
  },
  wide: {
    from: { x: 40, y: 80, z: -640, rx: 14, ry: 6, scale: 0.55, o: 0 },
    to: { x: 0, y: 0, z: -120, rx: 0, ry: 0, scale: 1, o: 0.92 },
    start: 0.16,
    end: 0.62,
  },
  tall: {
    from: { x: -40, y: -60, z: -480, rx: 6, ry: 18, scale: 0.6, o: 0 },
    to: { x: 0, y: 0, z: -60, rx: 0, ry: -2, scale: 1, o: 1 },
    start: 0.2,
    end: 0.66,
  },
  float: {
    from: { x: 56, y: 20, z: -700, rx: -8, ry: -20, scale: 0.5, o: 0 },
    to: { x: 0, y: 0, z: -160, rx: 1, ry: 5, scale: 1, o: 0.88 },
    start: 0.24,
    end: 0.72,
  },
  back: {
    from: { x: -40, y: 10, z: -820, rx: 4, ry: 10, scale: 0.48, o: 0 },
    to: { x: 0, y: 0, z: -220, rx: 0, ry: 0, scale: 1, o: 0.7 },
    start: 0.1,
    end: 0.58,
  },
  edge: {
    from: { x: 40, y: 70, z: -600, rx: 10, ry: -12, scale: 0.56, o: 0 },
    to: { x: 0, y: 0, z: -100, rx: 0, ry: 3, scale: 1, o: 0.95 },
    start: 0.28,
    end: 0.78,
  },
};

function applyPanelTransform(el, motion, progress, depthScale) {
  const t = mapRange(progress, motion.start, motion.end);
  const { from, to } = motion;
  const x = lerp(from.x, to.x, t) * depthScale;
  const y = lerp(from.y, to.y, t) * depthScale;
  const z = lerp(from.z, to.z, t) * depthScale;
  const rx = lerp(from.rx, to.rx, t) * depthScale;
  const ry = lerp(from.ry, to.ry, t) * depthScale;
  const scale = lerp(from.scale, to.scale, t);
  const opacity = lerp(from.o, to.o, t);

  el.style.opacity = String(opacity);
  el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
}

function JourneyChapter({ chapter }) {
  const trackRef = useRef(null);
  const copyRef = useRef(null);
  const labelRefs = useRef([]);
  const panelRefs = useRef([]);
  const rafRef = useRef(0);
  const lastProgress = useRef(-1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const panels = panelRefs.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const copy = copyRef.current;
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const getDepthScale = () => {
      const w = window.innerWidth;
      if (w < 640) return 0.35;
      if (w < 960) return 0.55;
      return 1;
    };

    const paint = (progress) => {
      if (Math.abs(progress - lastProgress.current) < 0.001) return;
      lastProgress.current = progress;
      const reduced = reducedQuery.matches;
      const depthScale = reduced ? 0 : getDepthScale();

      if (copy) {
        const copyT = mapRange(progress, 0, 0.28);
        copy.style.opacity = String(lerp(0, 1, copyT));
        copy.style.transform = reduced
          ? "none"
          : `translate3d(0, ${lerp(28, 0, copyT)}px, 0)`;
      }

      panels.forEach((el) => {
        const role = el.dataset.role || "hero";
        const motion = ROLE_MOTION[role] || ROLE_MOTION.hero;
        if (reduced) {
          el.style.opacity = "1";
          el.style.transform = "none";
          return;
        }
        applyPanelTransform(el, motion, progress, depthScale);
      });

      labels.forEach((el, index) => {
        const start = 0.35 + index * 0.045;
        const t = mapRange(progress, start, start + 0.18);
        el.style.opacity = String(lerp(0.15, 1, t));
        el.style.transform = reduced
          ? "none"
          : `translate3d(0, ${lerp(12, 0, t)}px, 0)`;
      });
    };

    const measure = () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) {
        paint(1);
        return;
      }
      paint(clamp(-rect.top / total, 0, 1));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reducedQuery.addEventListener("change", measure);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedQuery.removeEventListener("change", measure);
    };
  }, [chapter]);

  return (
    <section
      className={`journey-chapter journey-chapter--${chapter.id}`}
      id={chapter.id}
      aria-labelledby={`${chapter.id}-heading`}
      ref={trackRef}
    >
      <div className="journey-chapter__sticky">
        <div className="journey-chapter__inner">
          <header className="journey-chapter__copy" ref={copyRef}>
            <p className="journey-chapter__eyebrow">{chapter.eyebrow}</p>
            <h2 className="journey-chapter__title" id={`${chapter.id}-heading`}>
              {chapter.title}
            </h2>
            <p className="journey-chapter__body">{chapter.body}</p>
          </header>

          <div className="journey-chapter__stage" aria-hidden="true">
            {chapter.panels.map((panel, index) => (
              <figure
                key={panel.id}
                className={`journey-panel journey-panel--${panel.role}`}
                data-role={panel.role}
                ref={(node) => {
                  panelRefs.current[index] = node;
                }}
              >
                <img
                  src={panel.image}
                  alt=""
                  width="900"
                  height="1100"
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0";
                  }}
                />
                <figcaption>{panel.label}</figcaption>
              </figure>
            ))}
          </div>

          <ul className="journey-chapter__labels" aria-hidden="true">
            {chapter.labels.map((label, index) => (
              <li
                key={label}
                ref={(node) => {
                  labelRefs.current[index] = node;
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function MaterialScrollJourney() {
  return (
    <div className="material-journey">
      <JourneyChapter chapter={footwearJourney} />
      <div className="journey-bridge" aria-hidden="true" />
      <JourneyChapter chapter={apparelJourney} />
    </div>
  );
}
