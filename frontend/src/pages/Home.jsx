 import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import Steps from "../components/Steps";
 import WhoWeAreSection from "../components/WhoWeAreSection";
 import Ourteam from "../components/TeamSection"

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAreSection />
      <ServicesSection />
      <Ourteam />
      <Steps />
     </>
  );
}
