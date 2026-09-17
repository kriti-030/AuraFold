export default function Hero() {
  return (
    <section
      className="hero hero--vertex"
      id="home"
      aria-label="Vertex Shops hero"
    >
      <iframe
        className="hero__vertex-frame"
        src="/vertex-shops/index.html"
        title="Vertex Shops"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
