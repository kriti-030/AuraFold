import { applications } from "../data/site";
import Reveal from "./Reveal";

export default function Applications() {
  return (
    <section className="applications" id="applications" aria-labelledby="applications-heading">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">{applications.eyebrow}</p>
          <h2 className="section-title" id="applications-heading">
            {applications.heading}
          </h2>
        </div>
        <p className="section-copy">{applications.body}</p>
      </Reveal>

      <ul className="applications__list">
        {applications.items.map((item, index) => (
          <Reveal key={item.id} as="li" className="applications__item">
            <span className="applications__num">0{index + 1}</span>
            <span className="applications__name">{item.name}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
