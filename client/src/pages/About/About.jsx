import AboutHero from "../../components/about/AboutHero";
import WhyRoamMeridian from "../../components/about/WhyRoamMeridian";
import OurPhilosophy from "../../components/about/OurPhilosophy";
import WhyChooseUs from "../../components/about/WhyChooseUs";
import JourneyTimeline from "../../components/about/JourneyTimeline";
import VisionSection from "../../components/about/VisionSection";
import QuoteSection from "../../components/about/QuoteSection";
import AboutCTA from "../../components/about/AboutCTA";

function About() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <AboutHero />
      <WhyRoamMeridian />
      <OurPhilosophy />
      <WhyChooseUs />
      <JourneyTimeline />
      <VisionSection />
      <QuoteSection />
      <AboutCTA />
    </div>
  );
}

export default About;
