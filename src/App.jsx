import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MaterialsShowcase from "./components/MaterialsShowcase";
import WhatWeSupply from "./components/WhatWeSupply";
import DualSpotlight from "./components/DualSpotlight";
import ExploreByApplication from "./components/ExploreByApplication";
import MaterialToProduct from "./components/MaterialToProduct";
import WhyIconicGroup from "./components/WhyIconicGroup";
import FinalInquiry from "./components/FinalInquiry";

export default function App() {
  return (
    <>
      <a className="skip" href="#home">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <MaterialsShowcase />
        <WhatWeSupply />
        <DualSpotlight />
        <ExploreByApplication />
        <MaterialToProduct />
        <WhyIconicGroup />
        <FinalInquiry />
      </main>
    </>
  );
}
