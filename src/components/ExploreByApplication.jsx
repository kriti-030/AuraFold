import { exploreByApplication } from "../data/afterApproved";
import Reveal from "./Reveal";

export default function ExploreByApplication() {
  return (
    <section className="explore-app" id="applications">
      <Reveal className="explore-app__head">
        <div>
          <p className="explore-app__eyebrow">{exploreByApplication.eyebrow}</p>
          <h2 className="explore-app__title">{exploreByApplication.heading}</h2>
        </div>
        <p className="explore-app__body">{exploreByApplication.body}</p>
      </Reveal>

      <div className="explore-app__grid">
        {exploreByApplication.items.map((item, index) => (
          <a
            key={item.id}
            className={`explore-app__panel explore-app__panel--${index + 1}`}
            href={item.href}
          >
            <div className="explore-app__media">
              <img
                src={item.image}
                alt=""
                width="1400"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="explore-app__content">
              <span className="explore-app__name">{item.name}</span>
              <p>{item.description}</p>
              <i className="explore-app__line" aria-hidden="true" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
