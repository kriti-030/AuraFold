import { useEffect, useState } from "react";
import { hero } from "../data/site";
import Reveal from "./Reveal";

export default function Hero() {
  const slides = hero.images;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return undefined;

    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 1000);

    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    const next = slides[(active + 1) % slides.length];
    if (!next?.src) return undefined;

    const preload = new Image();
    preload.src = next.src;
    return undefined;
  }, [active, slides]);

  return (
    <section className="hero" id="home" aria-roledescription="carousel" aria-label="ICONIC GROUP materials">
      <div className="hero__media">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            width="1800"
            height="1200"
            className={index === active ? "is-active" : undefined}
            fetchPriority={index === 0 ? "high" : "low"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={index === active ? undefined : true}
          />
        ))}
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__content">
        <Reveal>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__title">
            {hero.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero__lead">{hero.body}</p>
          <div className="hero__actions">
            <a className="btn btn--gold" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </a>
            <a className="btn btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
