import Reveal from "./Reveal";

const values = [
  {
    id: "freedom",
    title: "Fashion In Freedom",
    body: "We believe fashion should empower you, not confine you. Every piece in our Apparel and Shoe collections is designed to move effortlessly with your lifestyle.",
    iconClass: "why-cards__icon--sparkles",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M24 6.5 26.8 16.2 36.5 19 26.8 21.8 24 31.5 21.2 21.8 11.5 19 21.2 16.2Z"
          fill="url(#whySparkleA)"
        />
        <path
          d="M34 8.5 35.4 13.2 40.1 14.6 35.4 16 34 20.7 32.6 16 27.9 14.6 32.6 13.2Z"
          fill="url(#whySparkleB)"
        />
        <path
          d="M37.5 22 38.7 26.1 42.8 27.3 38.7 28.5 37.5 32.6 36.3 28.5 32.2 27.3 36.3 26.1Z"
          fill="url(#whySparkleC)"
        />
        <defs>
          <linearGradient id="whySparkleA" x1="11" y1="8" x2="36" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f0c27a" />
            <stop offset="1" stopColor="#c48a3a" />
          </linearGradient>
          <linearGradient id="whySparkleB" x1="28" y1="9" x2="40" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f6d59a" />
            <stop offset="1" stopColor="#d4a05a" />
          </linearGradient>
          <linearGradient id="whySparkleC" x1="32" y1="22" x2="43" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#efc07a" />
            <stop offset="1" stopColor="#c9974a" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "sustainable",
    title: "Sustainable Luxury",
    body: "Premium longevity over transient fashion cycles. We engineer timeless silhouettes using ethically sourced European textiles and certified leathers.",
    iconClass: "why-cards__icon--leaf",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M14 34c8-16 16-22 26-26-2 12-6 22-16 28-4 2.4-7.2 1.6-10-2Z"
          fill="#6faf4e"
        />
        <path
          d="M18 30c6-8 12-12 20-16"
          fill="none"
          stroke="#3f7a32"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M22 26c2.5-1.5 5-2.2 8-2.8"
          fill="none"
          stroke="#3f7a32"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "care",
    title: "Made With Care",
    body: "Rigorous atelier standards ensure supreme comfort, unmatched durability, and perfection in every stitch across our Women, Men, and Kids ranges.",
    iconClass: "why-cards__icon--heart",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M24 38s-12.5-7.8-16.5-15.2C4.5 16.5 8.2 11 14 11c3.2 0 5.8 1.7 10 5.4C28.2 12.7 30.8 11 34 11c5.8 0 9.5 5.5 6.5 11.8C36.5 30.2 24 38 24 38Z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
];

export default function WhyIconicGroup() {
  return (
    <section className="why-cards" id="about">
      <Reveal className="why-cards__head">
        <h2 className="why-cards__title">Why ICONIC GROUP?</h2>
      </Reveal>

      <div className="why-cards__grid">
        {values.map((item) => (
          <Reveal key={item.id} as="article" className="why-cards__card">
            <span className={`why-cards__icon ${item.iconClass}`}>{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
