import { useEffect, useState } from "react";
import { footwearMaterials } from "../data/site";
import Reveal from "./Reveal";

const icons = {
  upper: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M8 30c6-10 12-14 16-14s10 4 16 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 30h28" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 22c2-3 5-4 6-4s4 1 6 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  sole: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M14 34 24 12l10 22H14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M18 28h12M20 22h8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  lining: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M16 14h16M16 24h16M16 34h16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 12v24" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  foam: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="12" y="12" width="24" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="21" width="24" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="30" width="24" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  insoles: (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M18 12c-2 8-2 16 0 24M30 12c2 8 2 16 0 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function FootwearMaterials() {
  const items = footwearMaterials.items;
  const [active, setActive] = useState(0);
  const current = items[active];
  const total = String(items.length).padStart(2, "0");
  const currentNum = String(active + 1).padStart(2, "0");

  useEffect(() => {
    const next = items[(active + 1) % items.length];
    if (!next?.image) return undefined;
    const preload = new Image();
    preload.src = next.image;
    return undefined;
  }, [active, items]);

  return (
    <section className="fw-guide" id="footwear" aria-labelledby="fw-guide-heading">
      <Reveal className="fw-guide__head">
        <div>
          <p className="eyebrow eyebrow--line">{footwearMaterials.eyebrow}</p>
          <h2 className="section-title" id="fw-guide-heading">
            {footwearMaterials.heading}
          </h2>
        </div>
        <p className="section-copy">{footwearMaterials.body}</p>
      </Reveal>

      <div className="fw-guide__toolbar">
        <p className="fw-guide__strip-label">{footwearMaterials.stripLabel}</p>
        <p className="fw-guide__counter" aria-live="polite">
          {currentNum} — {total}
        </p>
      </div>

      <div className="fw-guide__cards" role="tablist" aria-label="Footwear material layers">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={`fw-guide__card${index === active ? " is-active" : ""}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="fw-guide__icon">{icons[item.icon]}</span>
            <span className="fw-guide__card-title">{item.name}</span>
            <span className="fw-guide__card-copy">{item.description}</span>
            <span className="fw-guide__card-link">
              Explore
              <span aria-hidden="true"> →</span>
            </span>
          </button>
        ))}
      </div>

      <div className="fw-guide__stage" key={current.id}>
        <div className="fw-guide__media">
          <img src={current.image} alt="" width="1600" height="1200" loading="lazy" />
        </div>
        <div className="fw-guide__copy">
          <p className="fw-guide__stage-num">
            {currentNum} — {current.name}
          </p>
          <h3>{current.name}</h3>
          <p>{current.lead}</p>
          <a className="btn btn--gold" href={footwearMaterials.cta.href}>
            {footwearMaterials.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
