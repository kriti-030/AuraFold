import { whatWeSupply } from "../data/site";
import Reveal from "./Reveal";

export default function WhatWeSupply() {
  return (
    <section className="supply" id="products">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{whatWeSupply.eyebrow}</p>
          <h2 className="section-title">{whatWeSupply.heading}</h2>
        </div>
        <p className="section-copy">{whatWeSupply.body}</p>
      </Reveal>

      <div className="supply__divisions">
        {whatWeSupply.divisions.map((division) => (
          <Reveal key={division.id} className="supply__division" as="article">
            <div className="supply__media">
              <img src={division.image} alt="" width="1200" height="900" loading="lazy" />
            </div>
            <div className="supply__copy">
              <p className="supply__num">{division.number}</p>
              <h3>{division.name}</h3>
              <p>{division.description}</p>
              <ul className="supply__list">
                {division.explores.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="text-link" href={division.href}>
                Explore
                <span aria-hidden="true"> →</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
