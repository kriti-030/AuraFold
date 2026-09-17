import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { footer } from "../data/site";
import {
  aboutContent,
  companyStory,
  customerStories,
} from "../data/aboutContent";

function AboutImage({ src, alt, className = "", loading = "lazy" }) {
  return (
    <figure className={`about-media ${className}`.trim()}>
      <img src={src} alt={alt} loading={loading} decoding="async" />
    </figure>
  );
}

export default function AboutPage() {
  const [activeApp, setActiveApp] = useState(0);
  const c = aboutContent;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const storyParagraphs = [
    ...(companyStory.beginning ? [companyStory.beginning] : []),
    ...(companyStory.origin ? [companyStory.origin] : []),
    ...c.story.paragraphs,
  ].filter(Boolean);

  const liveStories = customerStories.filter(
    (item) => item?.name && item?.quote && !String(item.name).includes("["),
  );

  return (
    <main className="about-page" id="about-page">
      {/* 1. Intro */}
      <section className="about-intro">
        <div className="about-intro__inner">
          <Reveal>
            <p className="about-eyebrow">{c.intro.eyebrow}</p>
            <h1 className="about-intro__title">
              {c.intro.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="about-intro__copy">{c.intro.description}</p>
          </Reveal>
        </div>
      </section>

      {/* 2. Origin */}
      <section className="about-origin">
        <div className="about-origin__grid">
          <Reveal className="about-origin__copy">
            <p className="about-num">{c.story.number}</p>
            <h2 className="about-heading">{c.story.title}</h2>
            {companyStory.foundingYear ? (
              <p className="about-meta">Est. {companyStory.foundingYear}</p>
            ) : null}
            {storyParagraphs.map((p) => (
              <p key={p} className="about-body">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal className="about-origin__visual">
            <AboutImage
              src={c.story.image.src}
              alt={c.story.image.alt}
              loading="eager"
            />
          </Reveal>
        </div>
      </section>

      {/* 3. Journey */}
      <section className="about-journey">
        <div className="about-journey__head">
          <Reveal>
            <p className="about-eyebrow">{c.journey.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">{c.journey.title}</h2>
          </Reveal>
        </div>
        <ol className="about-timeline">
          {c.journey.items.map((item) => (
            <li key={item.number} className="about-timeline__item">
              <Reveal>
                <span className="about-timeline__num" aria-hidden="true">
                  {item.number}
                </span>
                <div className="about-timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Divisions */}
      <section className="about-divisions">
        <div className="about-divisions__head">
          <Reveal>
            <p className="about-eyebrow">{c.divisions.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">
              {c.divisions.title}
            </h2>
          </Reveal>
        </div>
        <div className="about-divisions__grid">
          <Reveal className="about-division">
            <AboutImage
              src={c.divisions.footwear.image.src}
              alt={c.divisions.footwear.image.alt}
            />
            <div className="about-division__copy">
              <p className="about-eyebrow">{c.divisions.footwear.label}</p>
              <h3>{c.divisions.footwear.title}</h3>
              <p>{c.divisions.footwear.body}</p>
              <Link className="about-text-link" to={c.divisions.footwear.href}>
                Explore footwear materials
              </Link>
            </div>
          </Reveal>
          <Reveal className="about-division about-division--alt">
            <AboutImage
              src={c.divisions.apparel.image.src}
              alt={c.divisions.apparel.image.alt}
            />
            <div className="about-division__copy">
              <p className="about-eyebrow">{c.divisions.apparel.label}</p>
              <h3>{c.divisions.apparel.title}</h3>
              <p>{c.divisions.apparel.body}</p>
              <Link className="about-text-link" to={c.divisions.apparel.href}>
                Explore apparel & textiles
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Material philosophy */}
      <section className="about-material">
        <div className="about-material__frame">
          <AboutImage
            className="about-media--cover"
            src={c.materialStory.image.src}
            alt={c.materialStory.image.alt}
          />
          <div className="about-material__scrim" aria-hidden="true" />
          <Reveal className="about-material__copy">
            <p className="about-eyebrow">{c.materialStory.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">
              {c.materialStory.title}
            </h2>
            <p className="about-body">{c.materialStory.body}</p>
          </Reveal>
        </div>
      </section>

      {/* 6. What we deliver */}
      <section className="about-deliver">
        <div className="about-deliver__head">
          <Reveal>
            <p className="about-eyebrow">{c.deliver.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">{c.deliver.title}</h2>
            <p className="about-body about-body--wide">{c.deliver.body}</p>
          </Reveal>
        </div>
        <div className="about-deliver__list">
          {c.deliver.items.map((item) => (
            <Reveal key={item.number} className="about-deliver__row">
              <div className="about-deliver__text">
                <span className="about-num">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <AboutImage src={item.image} alt={item.title} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. How we work */}
      <section className="about-process">
        <div className="about-process__head">
          <Reveal>
            <p className="about-eyebrow">{c.howWeWork.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">
              {c.howWeWork.title}
            </h2>
          </Reveal>
        </div>
        <ol className="about-process__steps">
          {c.howWeWork.steps.map((step) => (
            <li key={step.number}>
              <Reveal>
                <span className="about-num">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. Quality */}
      <section className="about-quality">
        <div className="about-quality__grid">
          <Reveal className="about-quality__copy">
            <p className="about-eyebrow">{c.quality.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">{c.quality.title}</h2>
            <p className="about-body">{c.quality.body}</p>
            <ul className="about-quality__points">
              {c.quality.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <AboutImage src={c.quality.image.src} alt={c.quality.image.alt} />
          </Reveal>
        </div>
      </section>

      {/* 9. Relationships */}
      <section className="about-relations">
        <div className="about-relations__grid">
          <Reveal>
            <AboutImage
              src={c.relationships.image.src}
              alt={c.relationships.image.alt}
            />
          </Reveal>
          <Reveal className="about-relations__copy">
            <p className="about-eyebrow">{c.relationships.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">
              {c.relationships.title}
            </h2>
            <p className="about-body">{c.relationships.body}</p>
            {liveStories.length > 0 ? (
              <ul className="about-quotes">
                {liveStories.map((story) => (
                  <li key={`${story.name}-${story.company}`}>
                    <blockquote>{story.quote}</blockquote>
                    <cite>
                      {story.name}
                      {story.company ? ` — ${story.company}` : ""}
                    </cite>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* 10. Applications */}
      <section className="about-apps">
        <div className="about-apps__grid">
          <Reveal className="about-apps__copy">
            <p className="about-eyebrow">{c.applications.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">
              {c.applications.title}
            </h2>
            <ul className="about-apps__list" onMouseLeave={() => setActiveApp(0)}>
              {c.applications.items.map((item, index) => (
                <li key={item}>
                  <button
                    type="button"
                    className={activeApp === index ? "is-active" : ""}
                    onMouseEnter={() => setActiveApp(index)}
                    onFocus={() => setActiveApp(index)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <AboutImage
              src={c.applications.image.src}
              alt={c.applications.image.alt}
            />
          </Reveal>
        </div>
      </section>

      {/* 11. People */}
      <section className="about-people">
        <div className="about-people__grid">
          <Reveal className="about-people__copy">
            <p className="about-eyebrow">{c.people.eyebrow}</p>
            <h2 className="about-heading about-heading--lg">{c.people.title}</h2>
            <p className="about-body">{c.people.body}</p>
          </Reveal>
          <Reveal>
            <AboutImage src={c.people.image.src} alt={c.people.image.alt} />
          </Reveal>
        </div>
      </section>

      {/* 12. CTA */}
      <section className="about-cta">
        <Reveal>
          <h2 className="about-heading about-heading--lg">{c.cta.title}</h2>
          <p className="about-body about-body--center">{c.cta.body}</p>
          <div className="about-cta__actions">
            <Link className="btn btn--gold" to={c.cta.primary.href}>
              {c.cta.primary.label}
            </Link>
            <a className="btn btn--ghost" href={c.cta.secondary.href}>
              {c.cta.secondary.label}
            </a>
          </div>
        </Reveal>
      </section>

      {/* 13. Footer */}
      <footer className="footer" id="about-contact">
        <div className="footer__top">
          <div>
            <p className="footer__brand">ICONIC GROUP</p>
            <p className="footer__blurb">{footer.blurb}</p>
          </div>
          <div className="footer__cols">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <p className="footer__heading">{column.title}</p>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        title={link.pending ? "Page to follow" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__base">
          <p>© {new Date().getFullYear()} ICONIC GROUP. All rights reserved.</p>
          <p>Contact details to be confirmed.</p>
        </div>
      </footer>
    </main>
  );
}
