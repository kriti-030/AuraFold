import { useEffect, useRef } from "react";
import { materialToProduct } from "../data/afterApproved";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function MaterialToProduct() {
  const trackRef = useRef(null);
  const stageRefs = useRef([]);
  const labelRefs = useRef([]);
  const copyRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const paint = (progress) => {
      const stages = materialToProduct.stages;
      const count = stages.length;
      const active = Math.min(count - 1, Math.floor(progress * count));

      if (copyRef.current) {
        const t = clamp(progress / 0.15, 0, 1);
        copyRef.current.style.opacity = String(t);
        copyRef.current.style.transform = reduced.matches
          ? "none"
          : `translate3d(0, ${(1 - t) * 20}px, 0)`;
      }

      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        if (reduced.matches) {
          el.style.opacity = index === 0 ? "1" : "0.35";
          el.style.transform = "none";
          return;
        }

        const start = index / count;
        const end = (index + 1) / count;
        const local = clamp((progress - start) / (end - start), 0, 1);
        const visible = progress >= start - 0.08 && progress <= end + 0.12;
        const scale = 0.92 + local * 0.08;
        const y = (1 - local) * 36;
        const z = -120 + local * 120;
        const rot = (1 - local) * 4;

        el.style.opacity = visible ? String(0.2 + local * 0.8) : "0";
        el.style.transform = `translate3d(0, ${y}px, ${z}px) rotateX(${rot}deg) scale(${scale})`;
        el.style.zIndex = String(index === active ? 4 : index);
      });

      labelRefs.current.forEach((el, index) => {
        if (!el) return;
        const on = index === active || (reduced.matches && index === 0);
        el.classList.toggle("is-active", on);
      });
    };

    const measure = () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      if (total <= 0) {
        paint(1);
        return;
      }
      paint(clamp(-rect.top / total, 0, 1));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="mtp" id="material-journey" ref={trackRef}>
      <div className="mtp__sticky">
        <div className="mtp__inner">
          <header className="mtp__copy" ref={copyRef}>
            <p className="mtp__eyebrow">{materialToProduct.eyebrow}</p>
            <h2 className="mtp__title">{materialToProduct.heading}</h2>
            <p className="mtp__body">{materialToProduct.body}</p>
            <ol className="mtp__labels">
              {materialToProduct.stages.map((stage, index) => (
                <li
                  key={stage.id}
                  ref={(node) => {
                    labelRefs.current[index] = node;
                  }}
                >
                  {stage.label}
                </li>
              ))}
            </ol>
          </header>

          <div className="mtp__stage" aria-hidden="true">
            {materialToProduct.stages.map((stage, index) => (
              <figure
                key={stage.id}
                className="mtp__panel"
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
              >
                <img
                  src={stage.image}
                  alt=""
                  width="1400"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <strong>{stage.title}</strong>
                  <span>{stage.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
