import { Link } from "react-router-dom";

const CIRCLES = [
  { id: "footwear", label: "Footwear Materials", href: "/products/footwear" },
  { id: "apparel", label: "Apparel Textiles", href: "/products" },
  { id: "knits", label: "Knits & Mesh", href: "/products" },
  { id: "uppers", label: "Upper Finish", href: "/products/footwear" },
  { id: "soles", label: "Sole Systems", href: "/products/footwear" },
  { id: "components", label: "Components", href: "/products" },
];

export default function ColorSpotlight() {
  return (
    <section className="color-spot" aria-labelledby="color-spot-heading">
      <div className="color-spot__promo">
        <div className="color-spot__frame">
          <span className="color-spot__doodle color-spot__doodle--star" aria-hidden="true" />
          <span className="color-spot__doodle color-spot__doodle--wave" aria-hidden="true" />
          <span className="color-spot__doodle color-spot__doodle--ring" aria-hidden="true" />
          <img
            src="/images/spotlight-crew.png"
            alt="Friends in contemporary casual wear sharing a bright lifestyle moment"
            width="1600"
            height="900"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="color-spot__copy">
          <h2 className="color-spot__title" id="color-spot-heading">
            Fresh Styles.
            <br />
            Bold Materials.
          </h2>
          <p className="color-spot__sub">
            Explore looks and materials made for modern everyday wear.
          </p>
          <div className="color-spot__actions">
            <Link className="color-spot__btn" to="/products/footwear">
              For Him
            </Link>
            <Link className="color-spot__btn" to="/products">
              For Her
            </Link>
          </div>
        </div>
      </div>

      <div className="color-spot__trends">
        <h3 className="color-spot__trends-title">Trending Materials in the Spotlight</h3>
        <div className="color-spot__circles">
          {CIRCLES.map((item) => (
            <Link
              key={item.id}
              className="color-spot__circle"
              to={item.href}
              aria-label={item.label}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
