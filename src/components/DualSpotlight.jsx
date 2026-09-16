import { useState } from "react";

const panels = [
  {
    id: "footwear",
    eyebrow: "Division 01",
    lineOne: "Materials for",
    lineTwo: "Footwear",
    cta: "Explore Footwear",
    href: "#footwear",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1600&q=80",
    categories: [
      "Upper Materials",
      "Sole Materials",
      "EVA & Foam",
      "Lining & Textiles",
      "Insoles",
      "Components",
      "Laces",
      "Accessories",
    ],
  },
  {
    id: "apparel",
    eyebrow: "Division 02",
    lineOne: "Materials for",
    lineTwo: "Apparel",
    cta: "Explore Apparel",
    href: "#apparel",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=80",
    categories: [
      "Technical Textiles",
      "Mesh & Knits",
      "Synthetic Fabrics",
      "Performance Fabrics",
      "Lining Materials",
      "Elastics",
      "Trims",
      "Garment Components",
    ],
  },
];

function SpotlightCard({ panel, flipped, onFlip }) {
  return (
    <article
      id={panel.id}
      className={`dual-spot__card${flipped ? " is-flipped" : ""}`}
    >
      <div className="dual-spot__inner">
        <button
          type="button"
          className="dual-spot__face dual-spot__face--front"
          onClick={onFlip}
          aria-expanded={flipped}
          aria-label={`${panel.lineTwo}. Flip to view categories`}
        >
          <img
            src={panel.image}
            alt=""
            width="1600"
            height="1200"
            loading="lazy"
            decoding="async"
          />
          <div className="dual-spot__veil" aria-hidden="true" />
          <div className="dual-spot__copy">
            <p className="dual-spot__eyebrow">{panel.eyebrow}</p>
            <h3 className="dual-spot__heading">
              <span>{panel.lineOne}</span>
              <strong>{panel.lineTwo}</strong>
            </h3>
            <span className="dual-spot__cta">
              {panel.cta}
              <span aria-hidden="true"> →</span>
            </span>
          </div>
        </button>

        <div className="dual-spot__face dual-spot__face--back">
          <button
            type="button"
            className="dual-spot__back-close"
            onClick={onFlip}
            aria-label={`Close ${panel.lineTwo} categories`}
          >
            <p className="dual-spot__eyebrow">{panel.eyebrow}</p>
            <h3>{panel.lineTwo}</h3>
          </button>
          <ul className="dual-spot__list">
            {panel.categories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="dual-spot__link" href={panel.href}>
            {panel.cta}
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function DualSpotlight() {
  const [flippedId, setFlippedId] = useState(null);

  return (
    <section className="dual-spot" aria-label="Footwear and apparel materials">
      <div className="dual-spot__grid">
        {panels.map((panel) => (
          <SpotlightCard
            key={panel.id}
            panel={panel}
            flipped={flippedId === panel.id}
            onFlip={() =>
              setFlippedId((current) => (current === panel.id ? null : panel.id))
            }
          />
        ))}
      </div>
    </section>
  );
}
