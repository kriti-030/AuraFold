import { useState } from "react";
import { materials } from "../data/site";
import Reveal from "./Reveal";

export default function MaterialsShowcase() {
  const [active, setActive] = useState(0);
  const current = materials.items[active];

  return (
    <section className="materials" id="materials">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{materials.eyebrow}</p>
          <h2 className="section-title">{materials.heading}</h2>
        </div>
        <p className="section-copy">{materials.body}</p>
      </Reveal>

      <div className="materials__layout">
        <div className="materials__selector" role="tablist" aria-label="Materials">
          {materials.items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`materials__tab${index === active ? " is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <Reveal className="materials__stage" key={current.id}>
          <div className="materials__media">
            <img src={current.image} alt="" width="1200" height="900" loading="lazy" />
          </div>
          <div className="materials__copy">
            <p className="eyebrow">Selected</p>
            <h3>{current.name}</h3>
            <p>{current.description}</p>
            <a className="text-link" href="#inquiry">
              Enquire about {current.name}
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
