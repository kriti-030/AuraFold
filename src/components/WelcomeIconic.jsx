import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { welcomeIconic } from "../data/site";

export default function WelcomeIconic() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`welcome${visible ? " is-visible" : ""}`}
      aria-labelledby="welcome-heading"
    >
      <div className="welcome__grid">
        <div className="welcome__copy">
          <p className="welcome__eyebrow">{welcomeIconic.eyebrow}</p>
          <h2 className="welcome__heading" id="welcome-heading">
            {welcomeIconic.heading}
          </h2>
          <p className="welcome__body">
            {welcomeIconic.body.map((part, index) =>
              part.strong ? (
                <strong key={index}>{part.text}</strong>
              ) : (
                <span key={index}>{part.text}</span>
              )
            )}
          </p>

          <ul className="welcome__stats">
            {welcomeIconic.stats.map((stat, index) => (
              <li
                key={stat.id}
                className="welcome__stat"
                style={{ "--i": index }}
              >
                <span className="welcome__stat-icon" aria-hidden="true">
                  {stat.icon}
                </span>
                <div className="welcome__stat-text">
                  <h3>{stat.title}</h3>
                  <p>{stat.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link className="welcome__cta" to={welcomeIconic.cta.href}>
            {welcomeIconic.cta.label}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="welcome__visual">
          <div className="welcome__media">
            <img
              src={welcomeIconic.image}
              alt={welcomeIconic.imageAlt}
              width="1400"
              height="1000"
              loading="lazy"
              decoding="async"
            />
          </div>
          <aside className="welcome__mission">
            <i className="welcome__mission-rule" aria-hidden="true" />
            <h3>{welcomeIconic.mission.title}</h3>
            <p>{welcomeIconic.mission.body}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
