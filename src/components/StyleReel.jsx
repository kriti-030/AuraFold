import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const CARDS = [
  {
    id: "jeans-shoes",
    src: "/images/reel/01.png",
    alt: "Light-wash denim jeans and white sneakers on a city street",
    quote: "Cut to Move",
    line: "Denim that holds every step",
    color: "#7eb8ff",
    href: "/products",
  },
  {
    id: "athletic",
    src: "/images/reel/02.png",
    alt: "Young man in athletic wear wrapping his hand with sports tape",
    quote: "Trained Texture",
    line: "Built for the body in motion",
    color: "#ffb347",
    href: "/products",
  },
  {
    id: "woman-jeans",
    src: "/images/reel/03.png",
    alt: "Young woman in a knotted white t-shirt and wide-leg jeans",
    quote: "Soft Focus",
    line: "Everyday layers, elevated",
    color: "#f0a6ca",
    href: "/products",
  },
  {
    id: "man-cap",
    src: "/images/reel/04.png",
    alt: "Young man wearing a casual cap in an urban setting",
    quote: "City Edge",
    line: "Capped confidence, easy polish",
    color: "#8fd6a0",
    href: "/products",
  },
  {
    id: "woman-shirt",
    src: "/images/reel/05.png",
    alt: "Young woman wearing a refined button-down shirt",
    quote: "Light Work",
    line: "Shirts that breathe with you",
    color: "#e8d56d",
    href: "/products",
  },
  {
    id: "man-shirt",
    src: "/images/reel/06.png",
    alt: "Young man in a casual shirt and jeans",
    quote: "Clean Lines",
    line: "Tailored ease for modern days",
    color: "#c4a574",
    href: "/products/footwear",
  },
];

const SPEED_PX = 38;

export default function StyleReel() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const rafRef = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = media.matches;
      setReduceMotion(media.matches);
    };
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;

    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const track = trackRef.current;
      if (track && !pausedRef.current) {
        const loopWidth = track.scrollWidth / 2;
        offsetRef.current += SPEED_PX * dt;
        if (offsetRef.current >= loopWidth) {
          offsetRef.current -= loopWidth;
        }
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [reduceMotion]);

  const pause = () => {
    pausedRef.current = true;
  };

  const resume = () => {
    pausedRef.current = false;
  };

  const getStep = () => {
    const first = trackRef.current?.querySelector(".style-reel__card");
    if (!first) return 300;
    const styles = window.getComputedStyle(trackRef.current);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
    return first.getBoundingClientRect().width + gap;
  };

  const scrollByDir = (dir) => {
    const track = trackRef.current;
    if (!track) return;

    pause();
    const step = getStep() * dir;
    const loopWidth = track.scrollWidth / 2;
    offsetRef.current = Math.max(0, offsetRef.current + step);

    if (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth;
    if (offsetRef.current < 0) offsetRef.current += loopWidth;

    track.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

    window.setTimeout(() => {
      if (track) track.style.transition = "none";
      resume();
    }, 480);
  };

  const loop = [...CARDS, ...CARDS];

  return (
    <section className="style-reel" aria-labelledby="style-reel-heading">
      <header className="style-reel__intro">
        <h2 className="style-reel__heading" id="style-reel-heading">
          Looks in Motion
        </h2>
        <p className="style-reel__sub">A continuous reel of contemporary style</p>
      </header>

      <div
        className="style-reel__shell"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) resume();
        }}
      >
        <button
          type="button"
          className="style-reel__nav style-reel__nav--prev"
          aria-label="Scroll style reel left"
          onClick={() => scrollByDir(-1)}
        >
          ‹
        </button>

        <div className="style-reel__viewport" ref={viewportRef}>
          <div className="style-reel__track" ref={trackRef}>
            {loop.map((card, index) => (
              <Link
                key={`${card.id}-${index}`}
                className="style-reel__card"
                to={card.href}
                aria-label={`${card.quote}. ${card.line}`}
              >
                <div className="style-reel__media">
                  <img
                    src={card.src}
                    alt={card.alt}
                    width="640"
                    height="860"
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                </div>
                <div className="style-reel__caption">
                  <p className="style-reel__quote" style={{ color: card.color }}>
                    {card.quote}
                  </p>
                  <p className="style-reel__line">{card.line}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="style-reel__nav style-reel__nav--next"
          aria-label="Scroll style reel right"
          onClick={() => scrollByDir(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
