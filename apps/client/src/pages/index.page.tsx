import { Helmet } from "react-helmet-async";

import { Footer } from "~/modules/common/components/Footer";
import { AnalyticsSection } from "~/modules/marketing/components/AnalyticsSection";
import { FAQSection } from "~/modules/marketing/components/FAQSection";
import { FeaturesSection } from "~/modules/marketing/components/FeaturesSection";
import { HeroSection } from "~/modules/marketing/components/HeroSection";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>progHours - Code. Compete. Conquer!</title>
      </Helmet>

      <HeroSection />

      <FeaturesSection />

      <AnalyticsSection />

      <FAQSection />

      <Footer />
    </>
  );
}
