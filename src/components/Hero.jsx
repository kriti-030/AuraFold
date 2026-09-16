import { useEffect, useState } from "react";
import { hero } from "../data/site";
import MaterialCarousel from "./MaterialCarousel";
import MaterialShowcase from "./MaterialShowcase";

export default function Hero() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className={`hero${entered ? " is-entered" : ""}`}
      id="home"
      aria-label="ICONIC GROUP materials"
    >
      <div className="hero__bg" aria-hidden="true" />

      <MaterialCarousel cards={hero.materialCards} />

      <div className="hero__intro">
        <p className="hero__eyebrow">{hero.eyebrow}</p>
        <h1 className="hero__title">
          {hero.headline.map((line) => (
            <span key={line} className="hero__title-line">
              <span>{line}</span>
            </span>
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
      </div>

      <div className="hero__composition">
        <MaterialShowcase showcase={hero.showcase} />
      </div>
    </section>
  );
}
