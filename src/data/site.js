export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  {
    label: "Products",
    href: "#products",
    children: [
      { label: "Footwear Materials", href: "#footwear" },
      { label: "Apparel & Textiles", href: "#apparel" },
    ],
  },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "ICONIC GROUP",
  headline: ["Materials That Shape", "Modern Footwear."],
  body: "Footwear materials and components built for manufacturers, brands and modern footwear production.",
  primaryCta: { label: "Explore Materials", href: "#materials" },
  secondaryCta: { label: "Send an Inquiry", href: "#inquiry" },
  images: [
    {
      src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1800&q=80",
      alt: "Premium modern footwear construction",
    },
    {
      src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1800&q=80",
      alt: "Premium apparel and garment materials",
    },
    {
      src: "https://images.unsplash.com/photo-1617038260897-41a1b14f0dfe?auto=format&fit=crop&w=1800&q=80",
      alt: "Technical textile and mesh material",
    },
    {
      src: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=1800&q=80",
      alt: "Leather and synthetic material texture",
    },
    {
      src: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1800&q=80",
      alt: "Footwear sole and outsole material detail",
    },
    {
      src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1800&q=80",
      alt: "Apparel and footwear material editorial",
    },
  ],
};

export const whatWeSupply = {
  eyebrow: "ICONIC GROUP",
  heading: "What We Supply",
  body: "Materials and components for the products people wear, move in and live in.",
  divisions: [
    {
      id: "footwear",
      number: "01",
      name: "Footwear",
      description: "Materials and components for modern footwear manufacturing.",
      href: "#footwear",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1400&q=80",
      explores: [
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
      number: "02",
      name: "Apparel & Textiles",
      description: "Materials and textile solutions for modern apparel and garment applications.",
      href: "#apparel",
      image: "https://images.unsplash.com/photo-1558171813-4c077e33bf49?auto=format&fit=crop&w=1400&q=80",
      explores: [
        "Technical Textiles",
        "Mesh & Knits",
        "Synthetic Fabrics",
        "Lining Materials",
        "Performance Fabrics",
        "Elastic Materials",
        "Garment Accessories",
        "Trims & Components",
      ],
    },
  ],
};

export const footwearMaterials = {
  eyebrow: "Material guide",
  heading: "What Goes Into Footwear",
  body: "From the upper to the outsole, every layer begins with the right material for modern footwear construction.",
  stripLabel: "Five layers, one build",
  cta: { label: "View Collection", href: "#materials" },
  items: [
    {
      id: "upper",
      name: "Upper Materials",
      description: "Surfaces built for structure, finish and durability.",
      lead: "Consistent upper surfaces engineered for form, finish and lasting durability.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb172a9?auto=format&fit=crop&w=1600&q=80",
      icon: "upper",
    },
    {
      id: "sole",
      name: "Sole Materials",
      description: "Compounds that define grip, flexibility and wear.",
      lead: "Compounds that define grip, flexibility and long-term wear performance.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1600&q=80",
      icon: "sole",
    },
    {
      id: "lining",
      name: "Lining & Textiles",
      description: "Breathable constructions for comfort and form.",
      lead: "Breathable textile constructions that support comfort, structure and finish.",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1600&q=80",
      icon: "lining",
    },
    {
      id: "foam",
      name: "Foam & Cushioning",
      description: "Systems that manage comfort and response.",
      lead: "Engineered for high-performance response and superior impact protection.",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1600&q=80",
      icon: "foam",
    },
    {
      id: "insoles",
      name: "Insoles",
      description: "Footbeds and support layers for lasting wear.",
      lead: "Support layers designed for comfort, stability and lasting wear.",
      image: "https://images.unsplash.com/photo-1558171813-4c077e33bf49?auto=format&fit=crop&w=1600&q=80",
      icon: "insoles",
    },
  ],
};

export const apparelMaterials = {
  eyebrow: "Division",
  heading: "Apparel & Textiles",
  body: "Materials, fabrics and components designed for modern apparel applications.",
  items: [
    {
      id: "technical",
      name: "Technical Textiles",
      description: "Engineered fabrics for structured garment applications.",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "performance",
      name: "Performance Fabrics",
      description: "Materials suited to activewear and performance apparel.",
      image: "https://images.unsplash.com/photo-1558171813-4c077e33bf49?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "mesh-knits",
      name: "Mesh & Knits",
      description: "Breathable constructions for comfort and movement.",
      image: "https://images.unsplash.com/photo-1617038260897-41a1b14f0dfe?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "synthetic",
      name: "Synthetic Fabrics",
      description: "Consistent synthetics for scalable apparel production.",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "lining",
      name: "Lining Materials",
      description: "Inner layers that support comfort and finish.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "elastic",
      name: "Elastic Materials",
      description: "Stretch constructions for fit and recovery.",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "trims",
      name: "Trims & Accessories",
      description: "Finishing components that complete the garment.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};

export const materials = {
  eyebrow: "Catalogue",
  heading: "Material Library",
  body: "A unified view of materials and components across footwear and apparel manufacturing.",
  items: [
    {
      id: "pu",
      name: "PU",
      description: "Polyurethane materials used across footwear and apparel applications.",
      image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "pvc",
      name: "PVC",
      description: "Versatile sheet materials for structured manufacturing applications.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "microfiber",
      name: "Microfiber",
      description: "Fine-fibre materials for consistent upper, lining and textile use.",
      image: "https://images.unsplash.com/photo-1558171813-4c077e33bf49?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "mesh",
      name: "Mesh",
      description: "Breathable textile constructions for footwear and apparel.",
      image: "https://images.unsplash.com/photo-1617038260897-41a1b14f0dfe?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "eva",
      name: "EVA",
      description: "Lightweight foam compounds used in cushioning systems.",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "rubber",
      name: "Rubber",
      description: "Compounds built for durability, grip and wear performance.",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "tpr",
      name: "TPR",
      description: "Thermoplastic rubber options for flexible constructions.",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "tpu",
      name: "TPU",
      description: "High-performance compounds for overlays and structural parts.",
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "foam",
      name: "Foam",
      description: "Cushioning foams for comfort packs and soft components.",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "textiles",
      name: "Textiles",
      description: "Fabric constructions for apparel and garment manufacturing.",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "knits",
      name: "Knits",
      description: "Knit constructions for comfort, stretch and movement.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "performance",
      name: "Performance Fabrics",
      description: "Materials suited to sportswear and performance apparel.",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "lining",
      name: "Lining",
      description: "Inner layers supporting comfort, structure and finish.",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "elastic",
      name: "Elastic",
      description: "Stretch materials for fit, recovery and garment function.",
      image: "https://images.unsplash.com/photo-1558171813-4c077e33bf49?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "trims",
      name: "Trims",
      description: "Finishing details for apparel and footwear assembly.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: "components",
      name: "Components",
      description: "Supporting parts for footwear and apparel manufacturing.",
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1400&q=80",
    },
  ],
};

export const applications = {
  eyebrow: "Range",
  heading: "Built For Different Applications.",
  body: "Materials and components selected to support a broad manufacturing ecosystem.",
  items: [
    { id: "footwear", name: "Footwear" },
    { id: "apparel", name: "Apparel" },
    { id: "sportswear", name: "Sportswear" },
    { id: "performance", name: "Performance Products" },
    { id: "lifestyle", name: "Lifestyle Products" },
    { id: "textile", name: "Other Textile Applications" },
  ],
};

export const why = {
  eyebrow: "ICONIC GROUP",
  heading: "Built For Manufacturing Partners.",
  items: [
    {
      title: "Quality",
      body: "Consistent material performance across production requirements.",
    },
    {
      title: "Reliability",
      body: "Materials selected for dependable manufacturing timelines.",
    },
    {
      title: "Industry Focus",
      body: "Built around footwear and apparel manufacturing — not consumer fashion retail.",
    },
    {
      title: "Support",
      body: "Helping customers identify the right material for the application.",
    },
  ],
};

export const inquiry = {
  heading: "Looking for the right material?",
  body: "Tell us what you're building. We'll help you find the right footwear or apparel material for the application.",
  primary: { label: "Send an Inquiry", href: "#inquiry" },
  secondary: { label: "WhatsApp Us", href: "#", pending: true },
};

export const about = {
  heading: "About ICONIC GROUP",
  body: "ICONIC GROUP supplies materials and components for footwear and apparel manufacturing. Full company details can be added when confirmed.",
};

export const careers = {
  heading: "Careers",
  body: "Open roles will be listed here. Until then, enquiries are welcome through contact.",
};

export const footer = {
  blurb: "Materials and components for modern footwear and apparel manufacturing.",
  columns: [
    {
      title: "Products",
      links: [
        { label: "Footwear Materials", href: "#footwear" },
        { label: "Apparel & Textiles", href: "#apparel" },
        { label: "Material Library", href: "#materials" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Terms", href: "#", pending: true },
        { label: "Privacy", href: "#", pending: true },
        { label: "Shipping", href: "#", pending: true },
      ],
    },
  ],
};
