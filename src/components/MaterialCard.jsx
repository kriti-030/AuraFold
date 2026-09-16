export default function MaterialCard({ card, index, cardRef }) {
  return (
    <article className="material-card" ref={cardRef}>
      <div className="material-card__media">
        <img
          src={card.image}
          alt=""
          width="200"
          height="456"
          loading={index < 12 ? "eager" : "lazy"}
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />
      </div>
      <div className="material-card__meta">
        <span>{card.category}</span>
        <strong>{card.title}</strong>
      </div>
    </article>
  );
}
