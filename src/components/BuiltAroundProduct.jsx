import { useEffect, useRef } from "react";
import { builtAroundProduct } from "../data/afterApproved";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function BuiltAroundProduct() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const paint = (progress) => {
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${reduced.matches ? 1 : progress})`;
      }

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const threshold = index / builtAroundProduct.steps.length;
        const local = clamp((progress - threshold) / 0.22, 0, 1);
        el.style.opacity = String(reduced.matches ? 1 : local);
        el.style.transform = reduced.matches
          ? "none"
          : `translate3d(0, ${(1 - local) * 18}px, 0)`;
      });
    };

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const view = window.innerHeight;
      const start = view * 0.75;
      const end = view * 0.2;
      const progress = clamp((start - rect.top) / (start - end + rect.height * 0.35), 0, 1);
      paint(progress);
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
    <section className="process" id="process" ref={sectionRef}>
      <div className="process__head">
        <p className="process__eyebrow">{builtAroundProduct.eyebrow}</p>
        <h2 className="process__title">{builtAroundProduct.heading}</h2>
        <p className="process__body">{builtAroundProduct.body}</p>
      </div>

      <div className="process__track">
        <div className="process__line" aria-hidden="true">
          <span ref={lineRef} />
        </div>
        <ol className="process__steps">
          {builtAroundProduct.steps.map((step, index) => (
            <li
              key={step.number}
              className="process__step"
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
            >
              <span className="process__num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
