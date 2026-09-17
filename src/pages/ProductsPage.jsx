import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  filterProducts,
  footwearMenu,
  footwearGenderLabels,
  getCategoryHeading,
  getFootwearPath,
  getFootwearSelectionFromPath,
  getMaterialTypesForCategory,
  getNavCategoryFromPath,
  productFilterGroups,
  productNavItems,
} from "../data/productsCatalog";

const EMPTY_FILTERS = {
  category: [],
  materialType: [],
  application: [],
};

function SearchControl({
  expanded,
  query,
  onQueryChange,
  onExpand,
  onCollapse,
  onSubmit,
}) {
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
      if (event.key === "Escape") onCollapse();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, onCollapse]);

  const submit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className={`products-search${expanded ? " is-expanded" : ""}`}>
      {!expanded ? (
        <button
          type="button"
          className="products-search__orb"
          aria-label="Open search"
          onClick={onExpand}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="11"
              cy="11"
              r="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M16.2 16.2 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : (
        <form className="products-search__bar" onSubmit={submit} role="search">
          <label className="visually-hidden" htmlFor="products-search-input">
            Search materials
          </label>
          <input
            id="products-search-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search materials, footwear components, textiles..."
            autoComplete="off"
          />
          <button type="submit" className="products-search__go" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle
                cx="11"
                cy="11"
                r="6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M16.2 16.2 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="products-search__close"
            aria-label="Close search"
            onClick={onCollapse}
          >
            ×
          </button>
        </form>
      )}
    </div>
  );
}

function MaterialCard({ item }) {
  return (
    <article className="material-result">
      <Link className="material-result__media" to={`/products/${item.id}`}>
        <img
          src={item.image}
          alt=""
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="material-result__body">
        <p className="material-result__cat">{item.subcategory}</p>
        <h3>
          <Link to={`/products/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="material-result__desc">{item.description}</p>
        <p className="material-result__apps">
          {(item.applications || []).slice(0, 2).join(" · ")}
        </p>
        <div className="material-result__actions">
          <Link className="material-result__link" to={`/products/${item.id}`}>
            View Details
          </Link>
          <a className="material-result__cta" href="/#inquiry">
            Send Inquiry
          </a>
        </div>
      </div>
    </article>
  );
}

function FootwearDropdown({ open, selection, onClose, onKeepOpen }) {
  const [mobileOpen, setMobileOpen] = useState(null);

  useEffect(() => {
    if (!open) setMobileOpen(null);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="footwear-dropdown"
      role="menu"
      aria-label="Footwear categories"
      onMouseEnter={onKeepOpen}
    >
      <div className="footwear-dropdown__panel">
        <div className="footwear-dropdown__inner">
          {Object.entries(footwearMenu).map(([gender, styles]) => {
            const genderActive = selection.gender === gender && !selection.style;
            const isMobileExpanded = mobileOpen === gender;

            return (
              <div
                key={gender}
                className={`footwear-dropdown__col${isMobileExpanded ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className={`footwear-dropdown__gender footwear-dropdown__gender--mobile${
                    genderActive ? " is-active" : ""
                  }`}
                  aria-expanded={isMobileExpanded}
                  onClick={() =>
                    setMobileOpen((prev) => (prev === gender ? null : gender))
                  }
                >
                  {footwearGenderLabels[gender]}
                </button>

                <Link
                  to={getFootwearPath(gender)}
                  className={`footwear-dropdown__gender footwear-dropdown__gender--desktop${
                    genderActive ? " is-active" : ""
                  }`}
                  role="menuitem"
                  onClick={onClose}
                >
                  {footwearGenderLabels[gender]}
                </Link>

                <ul
                  className={`footwear-dropdown__styles${
                    isMobileExpanded ? " is-open" : ""
                  }`}
                >
                  <li className="footwear-dropdown__mobile-all">
                    <Link to={getFootwearPath(gender)} onClick={onClose}>
                      All {footwearGenderLabels[gender]} Footwear
                    </Link>
                  </li>
                  {styles.map((style) => {
                    const active =
                      selection.gender === gender && selection.style === style;
                    return (
                      <li key={style}>
                        <Link
                          to={getFootwearPath(gender, style)}
                          className={active ? "is-active" : undefined}
                          role="menuitem"
                          onClick={onClose}
                        >
                          {style}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductsSubnav({ navCategory, footwearSelection }) {
  const [footwearOpen, setFootwearOpen] = useState(false);
  const navRef = useRef(null);
  const closeTimer = useRef(null);
  const openMode = useRef(null); // "hover" | "click"

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openFootwear = (mode = "hover") => {
    clearCloseTimer();
    openMode.current = mode;
    setFootwearOpen(true);
  };

  const scheduleClose = () => {
    if (openMode.current === "click") return;
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      openMode.current = null;
      setFootwearOpen(false);
    }, 180);
  };

  const closeFootwear = () => {
    clearCloseTimer();
    openMode.current = null;
    setFootwearOpen(false);
  };

  const toggleFootwear = () => {
    clearCloseTimer();
    if (footwearOpen && openMode.current === "click") {
      closeFootwear();
      return;
    }
    openFootwear("click");
  };

  useEffect(() => {
    const onPointer = (event) => {
      if (!navRef.current?.contains(event.target)) {
        closeFootwear();
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") closeFootwear();
    };
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
      clearCloseTimer();
    };
  }, []);

  useEffect(() => {
    closeFootwear();
  }, [footwearSelection.gender, footwearSelection.style]);

  return (
    <nav
      ref={navRef}
      className={`products-subnav${footwearOpen ? " is-footwear-open" : ""}`}
      aria-label="Product categories"
      onMouseLeave={scheduleClose}
    >
      <ul className="products-subnav__list">
        {productNavItems.map((item) => {
          if (item.id === "footwear") {
            const footwearActive = navCategory === "footwear";
            return (
              <li
                key={item.id}
                className={`products-subnav__item products-subnav__item--footwear${
                  footwearOpen ? " is-open" : ""
                }`}
                onMouseEnter={() => openFootwear("hover")}
              >
                <button
                  type="button"
                  className={`products-subnav__link products-subnav__footwear-btn${
                    footwearActive || footwearOpen ? " is-active" : ""
                  }`}
                  aria-expanded={footwearOpen}
                  aria-haspopup="true"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleFootwear();
                  }}
                  onFocus={() => openFootwear("hover")}
                >
                  {item.label}
                  <span className="products-subnav__caret" aria-hidden="true">
                    ▾
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.id} className="products-subnav__item">
              <NavLink
                to={item.path}
                end={item.id === "home"}
                className={({ isActive }) =>
                  `products-subnav__link${
                    isActive || navCategory === item.id ? " is-active" : ""
                  }`
                }
                onMouseEnter={closeFootwear}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <FootwearDropdown
        open={footwearOpen}
        selection={footwearSelection}
        onClose={closeFootwear}
        onKeepOpen={() => openFootwear(openMode.current || "hover")}
      />
    </nav>
  );
}

function FilterSidebar({
  navCategory,
  materialTypes,
  filters,
  onToggle,
  onClear,
  onCategoryNavigate,
  mobileOpen,
  onCloseMobile,
}) {
  const hasActive =
    filters.category.length +
      filters.materialType.length +
      filters.application.length >
    0;

  const isCategoryChecked = (optionId) => {
    if (navCategory !== "home") {
      return navCategory === optionId;
    }
    return filters.category.includes(optionId);
  };

  const content = (
    <>
      <div className="products-filters__top">
        <h2 className="products-filters__title">Filters</h2>
        <button
          type="button"
          className="products-filters__clear"
          onClick={onClear}
          disabled={!hasActive}
        >
          Clear All
        </button>
      </div>

      <div className="products-filters__group">
        <h3 className="products-filters__group-title">
          {productFilterGroups.category.label}
        </h3>
        <ul className="products-filters__list">
          {productFilterGroups.category.options.map((option) => {
            const checked = isCategoryChecked(option.id);
            return (
              <li key={option.id}>
                <label
                  className={`products-filters__option${checked ? " is-active" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      if (navCategory !== "home") {
                        onCategoryNavigate(option.id);
                        return;
                      }
                      onToggle("category", option.id);
                    }}
                  />
                  <span className="products-filters__box" aria-hidden="true" />
                  <span>{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        key={`material-${navCategory}`}
        className="products-filters__group products-filters__group--material"
      >
        <h3 className="products-filters__group-title">Material Type</h3>
        <ul className="products-filters__list">
          {materialTypes.map((option) => {
            const checked = filters.materialType.includes(option.id);
            return (
              <li key={option.id}>
                <label
                  className={`products-filters__option${checked ? " is-active" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle("materialType", option.id)}
                  />
                  <span className="products-filters__box" aria-hidden="true" />
                  <span>{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="products-filters__group">
        <h3 className="products-filters__group-title">
          {productFilterGroups.application.label}
        </h3>
        <ul className="products-filters__list">
          {productFilterGroups.application.options.map((option) => {
            const checked = filters.application.includes(option.id);
            return (
              <li key={option.id}>
                <label
                  className={`products-filters__option${checked ? " is-active" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle("application", option.id)}
                  />
                  <span className="products-filters__box" aria-hidden="true" />
                  <span>{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <aside className="products-filters" aria-label="Product filters">
        {content}
      </aside>

      <div
        className={`products-filters-drawer${mobileOpen ? " is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="products-filters-drawer__backdrop"
          aria-label="Close filters"
          onClick={onCloseMobile}
        />
        <div
          className="products-filters-drawer__panel"
          role="dialog"
          aria-modal="true"
        >
          <div className="products-filters-drawer__head">
            <h2 className="products-filters__title">Filters</h2>
            <div className="products-filters-drawer__actions">
              <button
                type="button"
                className="products-filters__clear"
                onClick={onClear}
                disabled={!hasActive}
              >
                Clear All
              </button>
              <button
                type="button"
                className="products-filters-drawer__close"
                aria-label="Close filters"
                onClick={onCloseMobile}
              >
                ×
              </button>
            </div>
          </div>
          {content}
        </div>
      </div>
    </>
  );
}

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const navCategory = getNavCategoryFromPath(location.pathname);
  const footwearSelection = useMemo(
    () => getFootwearSelectionFromPath(location.pathname),
    [location.pathname],
  );
  const heading = getCategoryHeading(navCategory, footwearSelection);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const materialTypes = useMemo(
    () => getMaterialTypesForCategory(navCategory),
    [navCategory],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setFilters(EMPTY_FILTERS);
    setSubmittedQuery("");
    setQuery("");
    setSearchOpen(false);
    setFiltersOpen(false);
  }, [navCategory]);

  const results = useMemo(
    () =>
      filterProducts({
        navCategory,
        categoryFilters: navCategory === "home" ? filters.category : [],
        materialTypes: filters.materialType,
        applications: filters.application,
        footwearGender: footwearSelection.gender,
        footwearStyle: footwearSelection.style,
        query: submittedQuery,
      }),
    [navCategory, filters, submittedQuery, footwearSelection],
  );

  const runSearch = () => {
    setSubmittedQuery(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    setSubmittedQuery("");
    setSearchOpen(true);
  };

  const toggleFilter = (groupId, optionId) => {
    setFilters((prev) => {
      const current = prev[groupId] || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      return { ...prev, [groupId]: next };
    });
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
  };

  const navigateCategory = (categoryId) => {
    const target = productNavItems.find((item) => item.id === categoryId);
    if (target) navigate(target.path);
  };

  const activeFilterCount =
    (navCategory === "home" ? filters.category.length : 0) +
    filters.materialType.length +
    filters.application.length;

  return (
    <main className="products-page">
      <section className="products-hero products-hero--search-only">
        <p className="products-hero__eyebrow">Products</p>
        <SearchControl
          expanded={searchOpen}
          query={query}
          onQueryChange={setQuery}
          onExpand={() => setSearchOpen(true)}
          onCollapse={() => setSearchOpen(false)}
          onSubmit={runSearch}
        />
      </section>

      <ProductsSubnav
        navCategory={navCategory}
        footwearSelection={footwearSelection}
      />

      <section className="products-shell">
        <div className="products-shell__toolbar">
          <button
            type="button"
            className="products-shell__filter-btn"
            onClick={() => setFiltersOpen(true)}
          >
            Filters{activeFilterCount ? ` (${activeFilterCount})` : ""}
          </button>
          <p className="products-shell__count">
            {results.length} {results.length === 1 ? "material" : "materials"}
          </p>
        </div>

        <div className="products-shell__layout">
          <FilterSidebar
            navCategory={navCategory}
            materialTypes={materialTypes}
            filters={filters}
            onToggle={toggleFilter}
            onClear={clearFilters}
            onCategoryNavigate={navigateCategory}
            mobileOpen={filtersOpen}
            onCloseMobile={() => setFiltersOpen(false)}
          />

          <div className="products-catalog" aria-live="polite">
            <header className="products-catalog__head">
              <p className="products-catalog__label">{heading.label}</p>
              <h1 className="products-catalog__title">{heading.title}</h1>
              <p className="products-catalog__lead">{heading.lead}</p>
              {submittedQuery ? (
                <p className="products-catalog__search-note">
                  Showing results for &ldquo;{submittedQuery}&rdquo;{" "}
                  <button type="button" onClick={clearSearch}>
                    Clear search
                  </button>
                </p>
              ) : null}
            </header>

            {results.length ? (
              <div className="products-results__grid">
                {results.map((item) => (
                  <MaterialCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="products-empty">
                <h3>No materials found</h3>
                <p>Adjust filters or clear search to explore the catalogue.</p>
                <div className="products-empty__actions">
                  {submittedQuery ? (
                    <button
                      type="button"
                      className="products-empty__btn"
                      onClick={clearSearch}
                    >
                      Clear Search
                    </button>
                  ) : null}
                  {activeFilterCount ? (
                    <button
                      type="button"
                      className="products-empty__btn"
                      onClick={clearFilters}
                    >
                      Clear All Filters
                    </button>
                  ) : null}
                  {navCategory !== "home" ? (
                    <button
                      type="button"
                      className="products-empty__btn"
                      onClick={() => navigate("/products")}
                    >
                      Products Home
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="products-cta">
        <h2>Need a material direction?</h2>
        <p>
          Tell us what you&apos;re developing and explore the right materials and
          components with ICONIC GROUP.
        </p>
        <a className="btn btn--gold" href="/#inquiry">
          Send an Inquiry
        </a>
      </section>
    </main>
  );
}
