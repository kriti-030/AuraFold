import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlideTabs } from "./ui/SlideTabs";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home", type: "section" },
  { id: "products", label: "Products", href: "/products", type: "route" },
  { id: "about", label: "About Us", href: "/about", type: "route" },
  { id: "contact", label: "Contact Us", href: "#contact", type: "section" },
];

const SECTION_IDS = ["home", "contact"];

function resolveActiveFromScroll() {
  const offset = 140;
  let current = "home";

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - offset <= 0) current = id;
  }

  return current;
}

export default function Navbar({ onOpenAuth }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const isProducts =
    location.pathname === "/products" || location.pathname.startsWith("/products/");
  const isAbout = location.pathname === "/about";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const selectedIndex = useMemo(() => {
    const idx = NAV_ITEMS.findIndex((item) => item.id === active);
    return idx >= 0 ? idx : 0;
  }, [active]);

  useEffect(() => {
    if (isProducts) {
      setActive("products");
      setScrolled(true);
      return undefined;
    }

    if (isAbout) {
      setActive("about");
      setScrolled(true);
      return undefined;
    }

    if (!isHome) {
      setActive("home");
      setScrolled(true);
      return undefined;
    }

    let ticking = false;

    const sync = () => {
      setScrolled(window.scrollY > 16);
      setActive(resolveActiveFromScroll());
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", sync);
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("resize", sync);
    };
  }, [isHome, isProducts, isAbout]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const closeMobile = () => {
    setOpen(false);
  };

  const openAuth = (mode) => {
    closeMobile();
    onOpenAuth?.(mode);
  };

  const goSection = (href) => (event) => {
    const id = href.replace("#", "");
    closeMobile();

    if (!isHome) {
      event.preventDefault();
      navigate({ pathname: "/", hash: id });
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    setActive(id);
  };

  return (
    <header className={`nav${scrolled || isProducts || isAbout || !isHome ? " is-scrolled" : ""}`}>
      <div className="nav__bar">
        <Link
          className="nav__brand"
          to="/"
          onClick={(event) => {
            if (isHome) {
              goSection("#home")(event);
            } else {
              closeMobile();
            }
          }}
        >
          ICONIC GROUP
        </Link>

        <nav className="nav__pill" aria-label="Primary">
          <SlideTabs
            tabs={NAV_ITEMS}
            selected={selectedIndex}
            onSelect={(i, tab) => {
              setActive(tab.id);
              if (tab.type === "route") {
                navigate(tab.href);
                closeMobile();
                return;
              }
              const fakeEvent = { preventDefault() {} };
              goSection(tab.href)(fakeEvent);
            }}
            renderTab={(tab) => (
              <div className="slide-tabs__wrap">
                {tab.type === "route" ? (
                  <Link
                    to={tab.href}
                    className={`slide-tabs__link${active === tab.id ? " is-active" : ""}`}
                    aria-current={active === tab.id ? "page" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      closeMobile();
                      setActive(tab.id);
                      navigate(tab.href);
                    }}
                  >
                    {tab.label}
                  </Link>
                ) : (
                  <a
                    href={isHome ? tab.href : `/${tab.href}`}
                    className={`slide-tabs__link${active === tab.id ? " is-active" : ""}`}
                    aria-current={active === tab.id ? "page" : undefined}
                    onClick={(event) => {
                      event.stopPropagation();
                      goSection(tab.href)(event);
                    }}
                  >
                    {tab.label}
                  </a>
                )}
              </div>
            )}
          />
        </nav>

        <div className="nav__auth" aria-label="Account">
          <button
            type="button"
            className="nav__auth-link"
            onClick={() => openAuth("login")}
          >
            Login
          </button>
          <button
            type="button"
            className="nav__auth-signup"
            onClick={() => openAuth("signup")}
          >
            Sign Up
          </button>
        </div>

        <button
          className={`nav__toggle${open ? " is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      {open ? (
        <div className="nav__panel is-open" id="mobile-menu">
          <nav className="nav__mobile" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="nav__mobile-group">
                {item.type === "route" ? (
                  <Link
                    to={item.href}
                    className={`nav__mobile-link${active === item.id ? " is-active" : ""}`}
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`nav__mobile-link${active === item.id ? " is-active" : ""}`}
                    aria-current={active === item.id ? "page" : undefined}
                    onClick={goSection(item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            <div className="nav__mobile-auth">
              <button
                type="button"
                className="nav__mobile-link"
                onClick={() => openAuth("login")}
              >
                Login
              </button>
              <button
                type="button"
                className="nav__mobile-link"
                onClick={() => openAuth("signup")}
              >
                Sign Up
              </button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
