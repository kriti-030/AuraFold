import { apparelMaterials } from "../data/site";
import Reveal from "./Reveal";

export default function ApparelTextiles() {
  return (
    <section className="division division--apparel" id="apparel">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{apparelMaterials.eyebrow}</p>
          <h2 className="section-title">{apparelMaterials.heading}</h2>
        </div>
        <p className="section-copy">{apparelMaterials.body}</p>
      </Reveal>

      <div className="division__grid division__grid--textile">
        {apparelMaterials.items.map((item, index) => (
          <Reveal
            key={item.id}
            className={`division__item division__item--${index + 1}`}
            as="article"
          >
            <a className="division__link" href="#materials">
              <div className="division__media">
                <img src={item.image} alt="" width="900" height="700" loading="lazy" />
              </div>
              <div className="division__meta">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="text-link">
                  Explore Materials
                  <span aria-hidden="true"> →</span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
