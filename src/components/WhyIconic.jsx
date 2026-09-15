import { about, careers, why } from "../data/site";
import Reveal from "./Reveal";

export default function WhyIconic() {
  return (
    <>
      <section className="why" id="about" aria-labelledby="why-heading">
        <Reveal className="why__intro">
          <p className="eyebrow">{why.eyebrow}</p>
          <h2 className="section-title" id="why-heading">
            {why.heading}
          </h2>
        </Reveal>

        <ul className="why__list">
          {why.items.map((item, index) => (
            <Reveal key={item.title} as="li" className="why__item">
              <span className="why__num">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="about-note">
          <h3>{about.heading}</h3>
          <p>{about.body}</p>
        </Reveal>
      </section>

      <section className="careers" id="careers">
        <Reveal className="careers__row">
          <div>
            <p className="eyebrow">People</p>
            <h2 className="section-title">{careers.heading}</h2>
            <p>{careers.body}</p>
          </div>
          <a className="btn btn--ghost" href="#contact">
            Contact
          </a>
        </Reveal>
      </section>
    </>
  );
}
