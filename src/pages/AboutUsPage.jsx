import React from "react";
import AboutUsSection from "./aboutUs/AboutUsSection";
import FeaturesSection from "./aboutUs/FeatureSection";
import ContactUsSection from "./aboutUs/ContactUsSection";
import AboutUsNavbar from "./aboutUs/AboutUsNavbar";
import Footer from "./aboutUs/AboutUsFooter";
import DesignerSection from "./aboutUs/DesignerSection";

function AboutUs() {
  return (
    <div>
      <AboutUsNavbar />
      <AboutUsSection />
      <FeaturesSection />
      <DesignerSection />
      <ContactUsSection />
      <Footer />
    </div>
  );
}

export default AboutUs;
