import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatWeSupply from "./components/WhatWeSupply";
import FootwearMaterials from "./components/FootwearMaterials";
import ApparelTextiles from "./components/ApparelTextiles";
import MaterialsShowcase from "./components/MaterialsShowcase";
import Applications from "./components/Applications";
import WhyIconic from "./components/WhyIconic";
import InquiryCTA from "./components/InquiryCTA";

export default function App() {
  return (
    <>
      <a className="skip" href="#home">
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <WhatWeSupply />
        <FootwearMaterials />
        <ApparelTextiles />
        <MaterialsShowcase />
        <Applications />
        <WhyIconic />
        <InquiryCTA />
      </main>
    </>
  );
}
