import { useEffect, useState } from "react";
import { nav } from "../data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav__bar">
        <a className="nav__brand" href="#home">
          ICONIC GROUP
        </a>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) =>
            item.children ? (
              <div className="nav__item" key={item.href}>
                <a href={item.href}>{item.label}</a>
                <div className="nav__submenu" role="menu">
                  {item.children.map((child) => (
                    <a key={child.href} href={child.href} role="menuitem">
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <a className="btn btn--gold nav__cta" href="#inquiry">
          Send an Inquiry
        </a>

        <button
          className={`nav__toggle${open ? " is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__panel${open ? " is-open" : ""}`} id="mobile-menu" hidden={!open}>
        <nav className="nav__mobile" aria-label="Mobile">
          {nav.map((item) => (
            <div key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
              {item.children?.map((child) => (
                <a
                  key={child.href}
                  className="nav__mobile-sub"
                  href={child.href}
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </a>
              ))}
            </div>
          ))}
          <a className="btn btn--gold" href="#inquiry" onClick={() => setOpen(false)}>
            Send an Inquiry
          </a>
        </nav>
      </div>
    </header>
  );
}
