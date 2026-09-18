import { useEffect, useRef } from "react";
import { useProductsSearch } from "../context/ProductsSearchContext";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle
        cx="11"
        cy="11"
        r="6.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <path
        d="M16.15 16.15 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function NavProductsSearch() {
  const {
    pageActive,
    query,
    setQuery,
    expanded,
    setExpanded,
    runSearch,
  } = useProductsSearch();
  const rootRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!expanded) return undefined;
    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setExpanded(false);
    };

    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setExpanded(false);
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [expanded, setExpanded]);

  if (!pageActive) return null;

  const submit = (event) => {
    event.preventDefault();
    if (!expanded) {
      setExpanded(true);
      return;
    }
    if (!query.trim()) {
      setExpanded(false);
      return;
    }
    runSearch();
  };

  return (
    <div
      ref={rootRef}
      className={`nav-search${expanded ? " is-expanded" : ""}`}
    >
      <form className="nav-search__form" onSubmit={submit} role="search">
        <label className="visually-hidden" htmlFor="nav-products-search">
          Search products and materials
        </label>
        <input
          id="nav-products-search"
          ref={inputRef}
          className="nav-search__input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products/materials..."
          autoComplete="off"
          tabIndex={expanded ? 0 : -1}
          aria-hidden={!expanded}
        />
        <button
          type="submit"
          className="nav-search__submit"
          aria-label={expanded ? "Search" : "Open product search"}
          aria-expanded={expanded}
          onClick={(event) => {
            if (!expanded) {
              event.preventDefault();
              setExpanded(true);
            }
          }}
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
