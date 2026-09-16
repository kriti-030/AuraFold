import { useEffect, useState } from "react";

const INTERVAL_MS = 3500;

const materialSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "01",
    title: "Materials That Shape the Product",
    description:
      "Materials selected for the look, feel and performance of the final product.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "02",
    title: "Built for Better Production",
    description:
      "Materials and components aligned with modern product requirements.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=80",
    eyebrow: "03",
    title: "From Material to Finished Product",
    description:
      "Connecting material choices with footwear and apparel applications.",
  },
];

export default function MaterialsShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = materialSlides[active];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % materialSlides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, active]);

  return (
    <section
      className="mlib"
      id="materials"
      aria-roledescription="carousel"
      aria-label="Material Library"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mlib__inner">
        <p className="mlib__label">Material Library</p>

        <div className="mlib__stage">
          {materialSlides.map((item, index) => (
            <figure
              key={item.eyebrow}
              className={`mlib__slide${index === active ? " is-active" : ""}`}
              aria-hidden={index === active ? "false" : "true"}
            >
              <img
                src={item.image}
                alt=""
                width="1800"
                height="1100"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          ))}
        </div>

        <div className="mlib__message" aria-live="polite" key={slide.eyebrow}>
          <p className="mlib__eyebrow">{slide.eyebrow}</p>
          <h2 className="mlib__title">{slide.title}</h2>
          <p className="mlib__body">{slide.description}</p>
        </div>

        <div className="mlib__nav" role="tablist" aria-label="Material Library slides">
          {materialSlides.map((item, index) => (
            <button
              key={item.eyebrow}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Slide ${item.eyebrow}: ${item.title}`}
              className={`mlib__index${index === active ? " is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              {item.eyebrow}
            </button>
          ))}
          <span className="mlib__track" aria-hidden="true">
            <i key={active} className="mlib__track-fill" />
          </span>
        </div>
      </div>
    </section>
  );
}
