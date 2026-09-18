import { Link } from "react-router-dom";

const panels = [
  {
    id: "him",
    lineOne: "Style to",
    lineTwo: "Stand Out",
    cta: "Shop for Him",
    href: "/products/footwear",
    image: "/images/shop-for-him.png",
    alt: "Editorial portrait of a young man in contemporary coastal styling",
  },
  {
    id: "her",
    lineOne: "Sunshine",
    lineTwo: "Daydream",
    cta: "Shop for Her",
    href: "/products",
    image: "/images/shop-for-her.png",
    alt: "Editorial portrait of a young woman in soft coastal light",
  },
];

export default function DualSpotlight() {
  return (
    <section className="dual-spot" aria-labelledby="dual-spot-heading">
      <header className="dual-spot__intro">
        <h2 className="dual-spot__title" id="dual-spot-heading">
          Presence, Refined
        </h2>
        <p className="dual-spot__sub">Collections shaped for him and for her</p>
      </header>

      <div className="dual-spot__grid">
        {panels.map((panel) => (
          <article key={panel.id} className="dual-spot__card" id={panel.id}>
            <div className="dual-spot__face">
              <img
                src={panel.image}
                alt={panel.alt}
                width="1200"
                height="1600"
                loading="lazy"
                decoding="async"
              />
              <div className="dual-spot__veil" aria-hidden="true" />
              <div className="dual-spot__copy">
                <h3 className="dual-spot__heading">
                  <span>{panel.lineOne}</span>
                  <strong>{panel.lineTwo}</strong>
                </h3>
                <Link className="dual-spot__cta" to={panel.href}>
                  {panel.cta}
                  <span aria-hidden="true">+</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
