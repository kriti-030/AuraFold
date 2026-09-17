import Hero from "../components/Hero";
import WhatWeSupply from "../components/WhatWeSupply";
import DualSpotlight from "../components/DualSpotlight";
import ExploreByApplication from "../components/ExploreByApplication";
import MaterialToProduct from "../components/MaterialToProduct";
import WhyIconicGroup from "../components/WhyIconicGroup";
import FinalInquiry from "../components/FinalInquiry";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;
    const id = location.hash.replace("#", "");
    const frame = window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  return (
    <main>
      <Hero />
      <WhatWeSupply />
      <DualSpotlight />
      <ExploreByApplication />
      <MaterialToProduct />
      <WhyIconicGroup />
      <FinalInquiry />
    </main>
  );
}
