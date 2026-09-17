/** Searchable B2B materials catalogue for the Products page.
 * Placeholder entries can be replaced with the live catalogue later.
 */

export const productNavItems = [
  { id: "men", label: "Men", path: "/products/men" },
  { id: "women", label: "Women", path: "/products/women" },
  { id: "kids", label: "Kids", path: "/products/kids" },
  { id: "footwear", label: "Footwear", path: "/products/footwear" },
  { id: "home", label: "Home", path: "/products" },
];

/** Exact Footwear dropdown categories — text-only mega menu. */
export const footwearMenu = {
  men: [
    "Casual Shoes",
    "Sports Shoes",
    "Formal Shoes",
    "Sneakers",
    "Sandals & Floaters",
    "Flip Flops",
    "Socks",
  ],
  women: [
    "Flats",
    "Casual Shoes",
    "Heels",
    "Boots",
    "Sports Shoes & Floaters",
  ],
  kids: [
    "Casual Shoes",
    "Flipflops",
    "Sports Shoes",
    "Flats",
    "Sandals",
    "Heels",
    "School Shoes",
    "Socks",
  ],
};

/** @deprecated use footwearMenu — kept as alias for existing imports */
export const footwearCategories = footwearMenu;

export const footwearGenderLabels = {
  men: "Men",
  women: "Women",
  kids: "Kids",
};

export function slugifyFootwearStyle(label) {
  return String(label || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFootwearPath(gender, style) {
  if (!gender) return "/products/footwear";
  if (!style) return `/products/footwear/${gender}`;
  return `/products/footwear/${gender}/${slugifyFootwearStyle(style)}`;
}

export function getFootwearSelectionFromPath(pathname) {
  const parts = String(pathname || "")
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean);

  if (parts[0] !== "products" || parts[1] !== "footwear") {
    return { gender: null, style: null };
  }

  const gender = parts[2];
  if (!gender || !footwearMenu[gender]) {
    return { gender: null, style: null };
  }

  const styleSlug = parts[3];
  if (!styleSlug) {
    return { gender, style: null };
  }

  const style =
    footwearMenu[gender].find(
      (item) => slugifyFootwearStyle(item) === styleSlug,
    ) || null;

  return { gender, style };
}

/** Category → Material Type configuration.
 * Source of truth for sidebar Material Type options.
 * Update this when the live catalogue expands.
 */
const APPAREL_MATERIAL_TYPES = [
  { id: "Technical Textiles", label: "Technical Textiles" },
  { id: "Performance Fabrics", label: "Performance Fabrics" },
  { id: "Mesh & Knits", label: "Mesh & Knits" },
  { id: "Synthetic Fabrics", label: "Synthetic Fabrics" },
  { id: "Lining Materials", label: "Lining Materials" },
  { id: "Elastic Materials", label: "Elastic Materials" },
  { id: "Trims & Accessories", label: "Trims & Accessories" },
];

const FOOTWEAR_MATERIAL_TYPES = [
  { id: "Upper Materials", label: "Upper Materials" },
  { id: "Sole Materials", label: "Sole Materials" },
  { id: "EVA & Foam", label: "EVA & Foam" },
  { id: "Insoles", label: "Insoles" },
  { id: "Lining & Textiles", label: "Lining & Textiles" },
  { id: "Footwear Components", label: "Footwear Components" },
  { id: "Laces", label: "Laces" },
];

export const categoryFilterConfig = {
  men: {
    materialTypes: APPAREL_MATERIAL_TYPES,
  },
  women: {
    materialTypes: APPAREL_MATERIAL_TYPES,
  },
  kids: {
    materialTypes: [
      { id: "Performance Fabrics", label: "Performance Fabrics" },
      { id: "Mesh & Knits", label: "Mesh & Knits" },
      { id: "Synthetic Fabrics", label: "Synthetic Fabrics" },
      { id: "Lining Materials", label: "Lining Materials" },
      { id: "Elastic Materials", label: "Elastic Materials" },
      { id: "Trims & Accessories", label: "Trims & Accessories" },
    ],
  },
  footwear: {
    materialTypes: FOOTWEAR_MATERIAL_TYPES,
  },
  home: {
    materialTypes: [...FOOTWEAR_MATERIAL_TYPES, ...APPAREL_MATERIAL_TYPES],
  },
};

export const productFilterGroups = {
  category: {
    id: "category",
    label: "Category",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  application: {
    id: "application",
    label: "Application",
    options: [
      { id: "Footwear", label: "Footwear" },
      { id: "Apparel", label: "Apparel" },
      { id: "Sportswear", label: "Sportswear" },
      { id: "Lifestyle", label: "Lifestyle" },
    ],
  },
};

/** Visible Material Type options for the active Products sub-nav category. */
export function getMaterialTypesForCategory(navCategory = "home") {
  const key = categoryFilterConfig[navCategory] ? navCategory : "home";
  return categoryFilterConfig[key].materialTypes;
}

export const productDivisions = [
  {
    id: "footwear",
    title: "Footwear Materials & Components",
    description:
      "Uppers, soles, foams, linings and components for modern footwear manufacturing.",
    categories: [
      "Upper Materials",
      "Sole Materials",
      "Lining & Textiles",
      "EVA & Foam",
      "Insoles",
      "Footwear Components",
      "Laces",
      "Accessories",
    ],
  },
  {
    id: "apparel",
    title: "Apparel & Textile Materials",
    description:
      "Technical textiles, performance fabrics, knits, linings and trims for apparel production.",
    categories: [
      "Technical Textiles",
      "Performance Fabrics",
      "Mesh & Knits",
      "Synthetic Fabrics",
      "Lining Materials",
      "Elastic Materials",
      "Trims & Accessories",
    ],
  },
];

const MATERIAL_TYPE_MAP = {
  "Upper Materials": ["Upper Materials"],
  "Sole Materials": ["Sole Materials"],
  "EVA & Foam": ["EVA & Foam"],
  Insoles: ["Insoles"],
  "Lining & Textiles": ["Lining & Textiles"],
  "Footwear Components": ["Footwear Components"],
  Laces: ["Laces"],
  "Technical Textiles": ["Technical Textiles"],
  "Performance Fabrics": ["Performance Fabrics"],
  "Mesh & Knits": ["Mesh & Knits"],
  "Synthetic Fabrics": ["Synthetic Fabrics"],
  "Lining Materials": ["Lining Materials"],
  "Elastic Materials": ["Elastic Materials"],
  "Trims & Accessories": ["Trims & Accessories"],
};

export const productsCatalog = [
  {
    id: "upper-leather-surface",
    name: "Leather Surface Upper",
    category: "Footwear Materials & Components",
    subcategory: "Upper Materials",
    description:
      "Structured upper surfaces selected for finish, durability and form in footwear builds.",
    image:
      "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=1200&q=85",
    applications: ["Lifestyle footwear", "Formal footwear", "Premium casual"],
    applicationTags: ["Footwear", "Lifestyle"],
    audiences: ["footwear", "men", "women"],
    styleTags: [
      "Casual Shoes",
      "Formal Shoes",
      "Boots",
      "Heels",
      "School Shoes",
    ],
    keywords: ["upper", "leather", "surface", "footwear"],
  },
  {
    id: "upper-mesh-construction",
    name: "Mesh Upper Construction",
    category: "Footwear Materials & Components",
    subcategory: "Upper Materials",
    description:
      "Breathable mesh constructions for lightweight uppers and sport-oriented footwear.",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
    applications: ["Running", "Training", "Everyday sneakers"],
    applicationTags: ["Footwear", "Sportswear", "Lifestyle"],
    audiences: ["footwear", "men", "women", "kids"],
    styleTags: [
      "Sports Shoes",
      "Sneakers",
      "Casual Shoes",
      "Sports Shoes & Floaters",
      "School Shoes",
    ],
    keywords: ["upper", "mesh", "breathable", "footwear"],
  },
  {
    id: "sole-compound-system",
    name: "Sole Compound System",
    category: "Footwear Materials & Components",
    subcategory: "Sole Materials",
    description:
      "Sole compounds aligned with grip, flexibility and long-term wear requirements.",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=85",
    applications: ["Outsoles", "Midsoles", "Hybrid sole builds"],
    applicationTags: ["Footwear"],
    audiences: ["footwear", "men", "women", "kids"],
    styleTags: [
      "Casual Shoes",
      "Sports Shoes",
      "Sneakers",
      "Sandals & Floaters",
      "Flip Flops",
      "Flipflops",
      "Sandals",
      "Flats",
      "Sports Shoes & Floaters",
    ],
    keywords: ["sole", "rubber", "compound", "outsole", "footwear"],
  },
  {
    id: "eva-foam-sheet",
    name: "EVA Foam Sheet",
    category: "Footwear Materials & Components",
    subcategory: "EVA & Foam",
    description:
      "EVA foam materials for cushioning systems, midsoles and footwear comfort layers.",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85",
    applications: ["Midsoles", "Cushioning", "Footbeds"],
    applicationTags: ["Footwear", "Sportswear"],
    audiences: ["footwear", "kids", "men", "women"],
    styleTags: [
      "Sports Shoes",
      "Sneakers",
      "Sandals & Floaters",
      "Flip Flops",
      "Flipflops",
      "Sandals",
      "Flats",
      "Sports Shoes & Floaters",
      "School Shoes",
    ],
    keywords: ["eva", "foam", "cushion", "midsole", "footwear"],
  },
  {
    id: "performance-foam-system",
    name: "Performance Foam System",
    category: "Footwear Materials & Components",
    subcategory: "EVA & Foam",
    description:
      "Foam systems selected for response, impact management and lasting comfort.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
    applications: ["Performance footwear", "Training", "Lifestyle cushioning"],
    applicationTags: ["Footwear", "Sportswear", "Lifestyle"],
    audiences: ["footwear", "men", "women"],
    styleTags: [
      "Sports Shoes",
      "Sneakers",
      "Casual Shoes",
      "Boots",
      "Sports Shoes & Floaters",
    ],
    keywords: ["foam", "eva", "cushioning", "performance", "footwear"],
  },
  {
    id: "lining-textile-pack",
    name: "Lining Textile Pack",
    category: "Footwear Materials & Components",
    subcategory: "Lining & Textiles",
    description:
      "Breathable lining textiles for comfort, structure and interior finish.",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85",
    applications: ["Shoe linings", "Collar linings", "Interior comfort"],
    applicationTags: ["Footwear"],
    audiences: ["footwear", "men", "women", "kids"],
    styleTags: [
      "Casual Shoes",
      "Formal Shoes",
      "Boots",
      "Heels",
      "Flats",
      "School Shoes",
      "Socks",
    ],
    keywords: ["lining", "textile", "breathable", "footwear"],
  },
  {
    id: "insole-support-layer",
    name: "Insole Support Layer",
    category: "Footwear Materials & Components",
    subcategory: "Insoles",
    description:
      "Insole and footbed materials designed for support, comfort and lasting wear.",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=85",
    applications: ["Footbeds", "Comfort inserts", "Support layers"],
    applicationTags: ["Footwear", "Lifestyle"],
    audiences: ["footwear", "kids", "men", "women"],
    styleTags: [
      "Casual Shoes",
      "Sports Shoes",
      "Sneakers",
      "Flats",
      "School Shoes",
      "Formal Shoes",
      "Boots",
    ],
    keywords: ["insole", "footbed", "support", "footwear"],
  },
  {
    id: "lace-component-set",
    name: "Lace Component Set",
    category: "Footwear Materials & Components",
    subcategory: "Laces",
    description:
      "Lace and cord components for footwear finishing and functional detailing.",
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=1200&q=85",
    applications: ["Lifestyle footwear", "Athletic footwear", "Kids footwear"],
    applicationTags: ["Footwear", "Lifestyle", "Sportswear"],
    audiences: ["footwear", "kids", "men", "women"],
    styleTags: [
      "Casual Shoes",
      "Sports Shoes",
      "Sneakers",
      "Formal Shoes",
      "Boots",
      "School Shoes",
      "Sports Shoes & Floaters",
    ],
    keywords: ["laces", "cord", "accessories", "footwear"],
  },
  {
    id: "footwear-hardware-trim",
    name: "Footwear Hardware Trim",
    category: "Footwear Materials & Components",
    subcategory: "Footwear Components",
    description:
      "Supporting hardware and trim components for footwear assembly and finish.",
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1200&q=85",
    applications: ["Eyelets", "Trims", "Assembly components"],
    applicationTags: ["Footwear"],
    audiences: ["footwear", "men", "women", "kids"],
    styleTags: [
      "Casual Shoes",
      "Formal Shoes",
      "Boots",
      "Sandals & Floaters",
      "Sandals",
      "Heels",
      "Flats",
      "Socks",
    ],
    keywords: ["components", "hardware", "trim", "footwear"],
  },
  {
    id: "technical-textile-panel",
    name: "Technical Textile Panel",
    category: "Apparel & Textile Materials",
    subcategory: "Technical Textiles",
    description:
      "Engineered textile panels for structured garment and apparel applications.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85",
    applications: ["Outerwear", "Structured apparel", "Workwear"],
    applicationTags: ["Apparel", "Lifestyle"],
    audiences: ["men", "women"],
    keywords: ["technical", "textile", "fabric", "apparel"],
  },
  {
    id: "performance-fabric-roll",
    name: "Performance Fabric Roll",
    category: "Apparel & Textile Materials",
    subcategory: "Performance Fabrics",
    description:
      "Performance-oriented fabrics for activewear and movement-focused apparel.",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=85",
    applications: ["Activewear", "Sportswear", "Performance apparel"],
    applicationTags: ["Apparel", "Sportswear"],
    audiences: ["men", "women", "kids"],
    keywords: ["performance", "fabric", "sportswear", "apparel"],
  },
  {
    id: "mesh-knit-textile",
    name: "Mesh Knit Textile",
    category: "Apparel & Textile Materials",
    subcategory: "Mesh & Knits",
    description:
      "Mesh and knit constructions for breathability, comfort and movement.",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85",
    applications: ["Athleisure", "Base layers", "Lightweight apparel"],
    applicationTags: ["Apparel", "Sportswear", "Lifestyle"],
    audiences: ["men", "women", "kids"],
    keywords: ["mesh", "knit", "textile", "apparel"],
  },
  {
    id: "synthetic-fabric-surface",
    name: "Synthetic Fabric Surface",
    category: "Apparel & Textile Materials",
    subcategory: "Synthetic Fabrics",
    description:
      "Consistent synthetic fabrics suited to scalable apparel manufacturing.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=85",
    applications: ["Ready-to-wear", "Uniforms", "Fashion basics"],
    applicationTags: ["Apparel", "Lifestyle"],
    audiences: ["men", "women", "kids"],
    keywords: ["synthetic", "fabric", "textile", "apparel"],
  },
  {
    id: "apparel-lining-material",
    name: "Apparel Lining Material",
    category: "Apparel & Textile Materials",
    subcategory: "Lining Materials",
    description:
      "Lining materials for comfort, drape and interior finish in garment builds.",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85",
    applications: ["Jackets", "Tailoring", "Layered garments"],
    applicationTags: ["Apparel", "Lifestyle"],
    audiences: ["men", "women"],
    keywords: ["lining", "apparel", "textile", "fabric"],
  },
  {
    id: "elastic-trim-system",
    name: "Elastic Trim System",
    category: "Apparel & Textile Materials",
    subcategory: "Elastic Materials",
    description:
      "Elastic materials and trims for stretch zones, waistbands and apparel detailing.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85",
    applications: ["Waistbands", "Cuffs", "Stretch panels"],
    applicationTags: ["Apparel", "Sportswear"],
    audiences: ["men", "women", "kids"],
    keywords: ["elastic", "trim", "stretch", "apparel"],
  },
  {
    id: "garment-trim-accessories",
    name: "Garment Trim Accessories",
    category: "Apparel & Textile Materials",
    subcategory: "Trims & Accessories",
    description:
      "Trims and accessories that complete apparel assemblies and finishing details.",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
    applications: ["Closures", "Labels", "Finishing trims"],
    applicationTags: ["Apparel", "Lifestyle"],
    audiences: ["men", "women", "kids"],
    keywords: ["trims", "accessories", "apparel", "components"],
  },
];

export function searchProducts(query, catalog = productsCatalog) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];

  return catalog.filter((item) => {
    const haystack = [
      item.name,
      item.category,
      item.subcategory,
      item.description,
      ...(item.applications || []),
      ...(item.keywords || []),
      ...(item.audiences || []),
      ...(item.applicationTags || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getProductById(id) {
  return productsCatalog.find((item) => item.id === id) || null;
}

export function getRelatedProducts(product, limit = 3) {
  if (!product) return [];
  return productsCatalog
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.subcategory === product.subcategory ||
          item.category === product.category),
    )
    .slice(0, limit);
}

export function getNavCategoryFromPath(pathname) {
  const path = String(pathname || "").replace(/\/+$/, "");
  if (!path || path === "/products") return "home";
  if (path.startsWith("/products/footwear")) return "footwear";

  const segment = path.split("/").pop();
  const match = productNavItems.find((item) => item.id === segment);
  return match ? match.id : "home";
}

function matchesMaterialType(item, selectedTypes) {
  if (!selectedTypes.length) return true;
  return selectedTypes.some((typeId) => {
    const mapped = MATERIAL_TYPE_MAP[typeId] || [typeId];
    return mapped.includes(item.subcategory);
  });
}

function matchesApplication(item, selectedApps) {
  if (!selectedApps.length) return true;
  const tags = item.applicationTags || [];
  return selectedApps.some((app) => tags.includes(app));
}

function matchesAudience(item, selectedAudiences) {
  if (!selectedAudiences.length) return true;
  const audiences = item.audiences || [];
  return selectedAudiences.some((audience) => audiences.includes(audience));
}

function matchesFootwearStyle(item, style) {
  if (!style) return true;
  return (item.styleTags || []).includes(style);
}

/** Filter catalogue by nav category + sidebar filters + optional search. */
export function filterProducts({
  navCategory = "home",
  categoryFilters = [],
  materialTypes = [],
  applications = [],
  footwearGender = null,
  footwearStyle = null,
  query = "",
} = {}) {
  let catalog = productsCatalog;

  if (navCategory === "footwear") {
    catalog = catalog.filter((item) =>
      (item.audiences || []).includes("footwear"),
    );

    if (footwearGender) {
      catalog = catalog.filter((item) =>
        (item.audiences || []).includes(footwearGender),
      );
    }

    if (footwearStyle) {
      catalog = catalog.filter((item) =>
        matchesFootwearStyle(item, footwearStyle),
      );
    }
  } else if (
    navCategory === "men" ||
    navCategory === "women" ||
    navCategory === "kids"
  ) {
    catalog = catalog.filter(
      (item) =>
        (item.audiences || []).includes(navCategory) &&
        item.category.includes("Apparel"),
    );
  }

  catalog = catalog.filter(
    (item) =>
      matchesAudience(item, categoryFilters) &&
      matchesMaterialType(item, materialTypes) &&
      matchesApplication(item, applications),
  );

  const q = String(query || "").trim();
  if (q) {
    catalog = searchProducts(q, catalog);
  }

  return catalog;
}

export function getCategoryHeading(navCategory, footwearSelection = {}) {
  const { gender = null, style = null } = footwearSelection;

  if (navCategory === "footwear") {
    if (gender && style) {
      return {
        label: "Footwear",
        title: `${footwearGenderLabels[gender]} · ${style}`,
        lead: `Materials and components for ${footwearGenderLabels[gender].toLowerCase()} ${style.toLowerCase()}.`,
      };
    }
    if (gender) {
      return {
        label: "Footwear",
        title: `${footwearGenderLabels[gender]} Footwear`,
        lead: `Footwear materials and components for ${footwearGenderLabels[gender].toLowerCase()} programmes.`,
      };
    }
    return {
      label: "Footwear",
      title: "Footwear Materials & Components",
      lead: "Uppers, soles, foams, linings and components for footwear manufacturing.",
    };
  }

  switch (navCategory) {
    case "men":
      return {
        label: "Men",
        title: "Men",
        lead: "Apparel, textiles and materials suited to men’s collection discovery.",
      };
    case "women":
      return {
        label: "Women",
        title: "Women",
        lead: "Apparel and textile materials for contemporary women’s programmes.",
      };
    case "kids":
      return {
        label: "Kids",
        title: "Kids",
        lead: "Comfort-focused materials for kidswear and youth footwear builds.",
      };
    default:
      return {
        label: "Products",
        title: "Material Library",
        lead: "Footwear materials & components and apparel & textile materials.",
      };
  }
}
