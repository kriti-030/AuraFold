import { Link } from "react-router-dom";
import { whatWeSupply } from "../data/site";

export default function WhatWeSupply() {
  return (
    <section className="supply" id="products">
      <header className="supply__intro">
        <h2 className="supply__heading">{whatWeSupply.heading}</h2>
      </header>

      <div className="supply__select">
        {whatWeSupply.cards.map((card) => (
          <Link
            key={card.id}
            className="supply__item"
            to={card.href}
            aria-label={card.title}
          >
            <div className="supply__media">
              <img
                src={card.image}
                alt={card.alt}
                width="1200"
                height="1200"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="supply__label">{card.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
