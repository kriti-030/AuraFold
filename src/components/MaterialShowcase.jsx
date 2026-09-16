export default function MaterialShowcase({ showcase }) {
  const [primary, secondary, tertiary] = showcase.panels;

  return (
    <div className="material-showcase">
      <div className="material-showcase__frame">
        <div className="material-showcase__chrome">
          <span className="material-showcase__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="material-showcase__url">iconicgroup.com / materials</span>
        </div>

        <div className="material-showcase__body">
          <div className="material-showcase__top">
            <div>
              <p className="material-showcase__brand">{showcase.title}</p>
              <p className="material-showcase__subtitle">{showcase.subtitle}</p>
            </div>
            <p className="material-showcase__note">Footwear · Apparel · Textiles</p>
          </div>

          <div className="material-showcase__layout">
            <article className="material-showcase__hero">
              <img
                src={primary.image}
                alt=""
                width="1000"
                height="560"
                loading="eager"
                decoding="async"
              />
              <div className="material-showcase__caption">
                <span>{primary.label}</span>
              </div>
            </article>

            <div className="material-showcase__side">
              <article className="material-showcase__tile">
                <img src={secondary.image} alt="" width="640" height="420" loading="lazy" decoding="async" />
                <span>{secondary.label}</span>
              </article>
              <article className="material-showcase__tile">
                <img src={tertiary.image} alt="" width="640" height="420" loading="lazy" decoding="async" />
                <span>{tertiary.label}</span>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
