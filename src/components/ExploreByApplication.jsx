import { Link } from "react-router-dom";
import { exploreByApplication } from "../data/afterApproved";
import Reveal from "./Reveal";

export default function ExploreByApplication() {
  const data = exploreByApplication;

  return (
    <section className="explore-app" id="applications">
      <Reveal className="explore-app__head">
        <p className="explore-app__eyebrow">
          {data.eyebrow}
          <i aria-hidden="true" />
        </p>
        <h2 className="explore-app__title">
          {data.heading}{" "}
          <em className="explore-app__accent">{data.headingAccent}</em>
        </h2>
        <p className="explore-app__body">{data.body}</p>
      </Reveal>

      <div className="explore-app__grid">
        {data.items.map((item, index) => (
          <Link
            key={item.id}
            className={`explore-app__panel explore-app__panel--${index + 1}`}
            to={item.href}
          >
            <div className="explore-app__media">
              <img
                src={item.image}
                alt=""
                width="1600"
                height="1200"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="explore-app__content">
              <span className="explore-app__index">
                {item.number}
                <i aria-hidden="true" />
              </span>
              <span className="explore-app__name">{item.name}</span>
              <p>{item.description}</p>
              <span className="explore-app__cta">
                Explore
                <span aria-hidden="true"> →</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
