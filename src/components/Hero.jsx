import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SLIDES = [
  {
    id: "materials",
    eyebrow: "ICONIC GROUP",
    title: ["Where Material", "Becomes Possibility."],
    body: "Footwear, apparel and textile materials for modern manufacturing.",
    cta: { label: "Explore Materials", href: "/products" },
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2400&q=85",
    alt: "Stacked fabric rolls in a textile materials environment",
    position: "center",
  },
  {
    id: "footwear",
    eyebrow: "FOOTWEAR",
    title: ["Built From The", "Material Up."],
    body: "Materials and components that support the making of modern footwear.",
    cta: { label: "Explore Footwear", href: "/products/footwear" },
    image:
      "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=2400&q=85",
    alt: "Close-up of leather and footwear material surface texture",
    position: "center",
  },
  {
    id: "textiles",
    eyebrow: "APPAREL & TEXTILES",
    title: ["Material For", "Every Layer."],
    body: "Textiles, fabrics and components designed around the needs of apparel manufacturing.",
    cta: { label: "Explore Textiles", href: "/products" },
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=2400&q=85",
    alt: "Folded knit textile materials in soft studio light",
    position: "center 40%",
  },
  {
    id: "applications",
    eyebrow: "APPLICATIONS",
    title: ["Materials That", "Move Industries."],
    body: "From footwear and apparel to diverse material applications.",
    cta: { label: "View Applications", href: "#applications" },
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85",
    alt: "Architectural interior with refined material surfaces and soft textiles",
    position: "center",
  },
];

const INTERVAL_MS = 4800;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
      setProgressKey((key) => key + 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, active]);

  const goTo = (index) => {
    setActive(index);
    setProgressKey((key) => key + 1);
  };

  const total = String(SLIDES.length).padStart(2, "0");

  return (
    <section
      className="hero hero--cinema"
      id="home"
      aria-label="ICONIC GROUP materials hero"
      aria-roledescription="carousel"
    >
      <div className="hero-cinema__stages" aria-live="polite">
        {SLIDES.map((slide, index) => {
          const isActive = index === active;
          return (
            <article
              key={slide.id}
              className={`hero-cinema__slide${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
            >
              <div className="hero-cinema__media">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  width="2400"
                  height="1350"
                  decoding="async"
                  loading={index === 0 ? "eager" : "lazy"}
                  style={{ objectPosition: slide.position }}
                />
              </div>
              <div className="hero-cinema__veil" aria-hidden="true" />
              <div className="hero-cinema__copy">
                <p className="hero-cinema__eyebrow">
                  {slide.eyebrow}
                  <i aria-hidden="true" />
                </p>
                <h1 className="hero-cinema__title">
                  {slide.title.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
                <p className="hero-cinema__body">{slide.body}</p>
                {slide.cta.href.startsWith("/") ? (
                  <Link className="hero-cinema__cta" to={slide.cta.href}>
                    {slide.cta.label}
                    <span aria-hidden="true"> →</span>
                  </Link>
                ) : (
                  <a className="hero-cinema__cta" href={slide.cta.href}>
                    {slide.cta.label}
                    <span aria-hidden="true"> →</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className="hero-cinema__pager" role="tablist" aria-label="Hero slides">
        <span className="hero-cinema__count" aria-hidden="true">
          {String(active + 1).padStart(2, "0")} / {total}
        </span>
        <div className="hero-cinema__dots">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`hero-cinema__dot${index === active ? " is-active" : ""}`}
              aria-label={`Show slide ${index + 1}: ${slide.eyebrow}`}
              aria-selected={index === active}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        {!reduceMotion ? (
          <div
            key={progressKey}
            className="hero-cinema__progress-line"
            aria-hidden="true"
            style={{ animationDuration: `${INTERVAL_MS}ms` }}
          />
        ) : null}
      </div>
    </section>
  );
}
