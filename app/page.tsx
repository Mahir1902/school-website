import Hero from "@/sections/Hero";
import PrincipalsWelcome from "@/sections/PrincipalsWelcome";
import WhyChooseSIS from "@/sections/WhyChooseSIS";
import AcademicPrograms from "@/sections/AcademicPrograms";
import CampusLife from "@/sections/CampusLife";
import Stats from "@/sections/Stats";
import Testimonials from "@/sections/Testimonials";
import News from "@/sections/News";
import ApplicationProcess from "@/sections/ApplicationProcess";
import Footer from "@/sections/Footer";
import Ornament from "@/components/heritage/Ornament";
import "@/components/heritage/heritage.css";

export default function Home() {
  return (
    <div className="h-full">
      <Hero />
      <div className="heritage">
        <PrincipalsWelcome />
        <WhyChooseSIS />
        <CampusLife />
        <Ornament className="mt-8" />
        <AcademicPrograms />
        <Stats />
        <Testimonials />
        <Ornament />
        <News />
        <ApplicationProcess />
        <Footer />
      </div>
    </div>
  );
}
