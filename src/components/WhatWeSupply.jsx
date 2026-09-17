import { useEffect, useState } from "react";
import { whatWeSupply } from "../data/site";

const icons = {
  footwear: (
    <svg viewBox="0 0 64 40" aria-hidden="true">
      <path
        d="M8 28c8-14 16-18 24-18 6 0 12 4 18 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M10 28h38" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M22 18c2.5-3.5 6-5 8-5s5.5 1.5 8 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  apparel: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={6 + col * 9}
            y={6 + row * 9}
            width="7"
            height="7"
            fill="none"
            stroke="currentColor"
            strokeWidth={row === 1 && col === 1 ? "1.8" : "1.2"}
          />
        )),
      )}
    </svg>
  ),
  hardware: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect
        x="10"
        y="14"
        width="28"
        height="20"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="24" cy="24" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  packaging: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M12 18 24 12l12 6v16L24 40 12 34V18Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M24 12v28M12 18l12 6 12-6" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
};

function ShelfCard({ card, flipped, onToggle }) {
  return (
    <article className={`shelf-card${flipped ? " is-flipped" : ""}`}>
      <div className="shelf-card__inner">
        <button
          type="button"
          className="shelf-card__face shelf-card__face--front"
          onClick={onToggle}
          aria-expanded={flipped}
          aria-label={`${card.title}. Flip for materials`}
        >
          <span className="shelf-card__icon">{icons[card.id]}</span>
          <h3 className="shelf-card__title">{card.title}</h3>
          <p className="shelf-card__summary">{card.summary}</p>
          <div className="shelf-card__media">
            <img
              src={card.image}
              alt=""
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="shelf-card__cta">
            Flip for materials
            <span aria-hidden="true"> →</span>
          </span>
        </button>

        <div className="shelf-card__face shelf-card__face--back">
          <button
            type="button"
            className="shelf-card__back-top"
            onClick={onToggle}
            aria-label={`Close ${card.title} materials`}
          >
            <h3>{card.title}</h3>
          </button>
          <ul className="shelf-card__list">
            {card.materials.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <i aria-hidden="true" />
              </li>
            ))}
          </ul>
          <a className="shelf-card__explore" href={card.href}>
            {card.exploreLabel}
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function WhatWeSupply() {
  const [flippedId, setFlippedId] = useState(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setFlippedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="supply" id="products">
      <header className="supply__intro">
        <h2 className="supply__heading">{whatWeSupply.heading}</h2>
      </header>

      <div className="supply__shelf">
        <div className="supply__shelf-grid">
          {whatWeSupply.cards.map((card) => (
            <ShelfCard
              key={card.id}
              card={card}
              flipped={flippedId === card.id}
              onToggle={() =>
                setFlippedId((current) => (current === card.id ? null : card.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
