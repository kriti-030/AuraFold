/**
 * Editable About Us content for ICONIC GROUP.
 * Replace story fields when confirmed company details are available.
 * Do not invent founding years, founders, counts, or testimonials.
 */

export const companyStory = {
  foundingYear: "",
  origin: "",
  beginning: "",
};

export const customerStories = [
  // Populate with real testimonials only — never render placeholders publicly.
  // { name: "", company: "", quote: "" },
];

export const aboutContent = {
  intro: {
    eyebrow: "ABOUT ICONIC GROUP",
    title: ["Built Around Material.", "Driven By What Comes Next."],
    description:
      "ICONIC GROUP works across footwear materials & components and apparel & textile materials — helping manufacturers start with the right surface, structure and feel.",
  },

  story: {
    number: "01",
    title: "Where It Started",
    paragraphs: [
      "ICONIC GROUP began with a clear focus: supply materials and components that manufacturing teams can rely on — chosen for how they look, feel and perform in real production.",
      "The work grew from practical conversations with makers and buyers who needed dependable options across footwear and apparel, not one-off samples that never scale.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&q=85",
      alt: "Hands working with fabric and materials on a production table",
    },
  },

  journey: {
    eyebrow: "OUR JOURNEY",
    title: "A path shaped by materials.",
    items: [
      {
        number: "01",
        title: "The Beginning",
        body: "Started by focusing on materials that support real manufacturing needs — practical, consistent and ready for production conversations.",
      },
      {
        number: "02",
        title: "Expanding the Material Range",
        body: "Broadened the catalogue so partners could find surfaces, structures and finishes that fit different product directions.",
      },
      {
        number: "03",
        title: "Moving Into Footwear Components",
        body: "Built depth in footwear materials and components — from uppers and soles to linings, foams and supporting parts.",
      },
      {
        number: "04",
        title: "Expanding Into Apparel & Textiles",
        body: "Extended into apparel and textile materials so the same material-first approach could serve garment and fabric applications.",
      },
      {
        number: "05",
        title: "Building Long-Term Relationships",
        body: "Grew through consistency, clear communication and supply partners can plan around — order after order.",
      },
      {
        number: "06",
        title: "Where We Are Today",
        body: "Today ICONIC GROUP connects footwear, apparel and textile material needs under one clear, material-focused offering.",
      },
    ],
  },

  divisions: {
    eyebrow: "TWO DIRECTIONS. ONE FOCUS.",
    title: "From footwear to apparel & textiles.",
    footwear: {
      label: "FOOTWEAR",
      title: "Materials & Components",
      body: "Uppers, soles, linings, foams, insoles and components chosen for construction, comfort and finished look.",
      image: {
        src: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1400&q=85",
        alt: "Editorial close-up of footwear materials and construction detail",
      },
      href: "/products",
    },
    apparel: {
      label: "APPAREL + TEXTILES",
      title: "Materials & Textile Solutions",
      body: "Technical textiles, performance fabrics, meshes, synthetics, linings, elastics and trims for apparel applications.",
      image: {
        src: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1400&q=85",
        alt: "Folded apparel textiles and fabric layers in soft light",
      },
      href: "/products",
    },
  },

  materialStory: {
    eyebrow: "MATERIAL PHILOSOPHY",
    title: "Everything Starts With Material.",
    body: "Before a product becomes a shoe, garment or finished piece, there is a material chosen for how it looks, feels and performs. That choice shapes everything that follows.",
    image: {
      src: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1800&q=85",
      alt: "Close-up of woven textile texture and material surface",
    },
  },

  deliver: {
    eyebrow: "WHAT WE DELIVER",
    title: "More Than Materials.",
    body: "ICONIC GROUP connects materials, components and manufacturing needs across footwear, apparel and textile applications.",
    items: [
      {
        number: "01",
        title: "Footwear Materials",
        body: "Core materials for footwear construction and finished product direction.",
        image:
          "https://images.unsplash.com/photo-1612902376491-5aa99810201c?auto=format&fit=crop&w=800&q=80",
      },
      {
        number: "02",
        title: "Upper & Surface Materials",
        body: "Surfaces that define look, hand-feel and lasting impression.",
        image:
          "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
      },
      {
        number: "03",
        title: "Sole & Foam Materials",
        body: "Sole systems and foams for structure, comfort and support.",
        image:
          "https://images.unsplash.com/photo-1608231383024-c16410b15635?auto=format&fit=crop&w=800&q=80",
      },
      {
        number: "04",
        title: "Textiles & Fabrics",
        body: "Technical and performance fabrics for apparel and textile use.",
        image:
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=800&q=80",
      },
      {
        number: "05",
        title: "Lining & Performance Materials",
        body: "Linings and performance layers that support comfort and function.",
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      },
      {
        number: "06",
        title: "Components & Accessories",
        body: "Components, trims and accessories that complete the build.",
        image:
          "https://images.unsplash.com/photo-1618354691792-d253b55a783e?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  howWeWork: {
    eyebrow: "HOW WE WORK",
    title: "How We Work",
    steps: [
      {
        number: "01",
        title: "Understand",
        body: "Understand the application and requirement.",
      },
      {
        number: "02",
        title: "Source",
        body: "Identify the right material or component.",
      },
      {
        number: "03",
        title: "Match",
        body: "Match material characteristics with the intended application.",
      },
      {
        number: "04",
        title: "Deliver",
        body: "Move from requirement to dependable supply.",
      },
    ],
  },

  quality: {
    eyebrow: "SELECTION",
    title: "Details Matter Before the Product Does.",
    body: "Material selection affects look, feel, performance, durability and application. Getting those details right early saves time later — on the line and in the finished piece.",
    points: ["Look", "Feel", "Performance", "Durability", "Application"],
    image: {
      src: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=1600&q=85",
      alt: "Macro view of denim and textile material texture",
    },
  },

  relationships: {
    eyebrow: "CUSTOMERS",
    title: "Built Through Relationships.",
    body: "Long-term relationships are built through consistency, communication and dependable supply.",
    image: {
      src: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1600&q=85",
      alt: "Material samples and fabric pieces arranged for review",
    },
  },

  applications: {
    eyebrow: "APPLICATIONS",
    title: "Where materials go to work.",
    items: ["FOOTWEAR", "APPAREL", "SPORTSWEAR", "TEXTILES", "LIFESTYLE PRODUCTS", "COMPONENTS"],
    image: {
      src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1600&q=85",
      alt: "Apparel and textile garments hanging in an editorial setting",
    },
  },

  people: {
    eyebrow: "THE HUMAN SIDE",
    title: "People Make the Process.",
    body: "Behind every material conversation is a person who listens, compares options and stays close to what the product needs. Process matters — and people make it work.",
    image: {
      src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1600&q=85",
      alt: "Team reviewing garments and materials in a work setting",
    },
  },

  cta: {
    title: "Looking for the Right Material?",
    body: "Tell us what you're building. We'll help you start with the right material.",
    primary: { label: "Explore Materials", href: "/products" },
    secondary: { label: "Send an Inquiry", href: "/#inquiry" },
  },
};
