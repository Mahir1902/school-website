import Hero from "@/sections/Hero";
import Welcome from "@/sections/Welcome";
import PrincipalsWelcome from "@/sections/PrincipalsWelcome";
import WhyChooseSIS from "@/sections/WhyChooseSIS";
import AcademicPrograms from "@/sections/AcademicPrograms";
import CampusLife from "@/sections/CampusLife";
import Stats from "@/sections/Stats";
import Testimonials from "@/sections/Testimonials";
import News from "@/sections/News";
import ApplicationProcess from "@/sections/ApplicationProcess";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <div className="h-full">
        <Hero />
        <PrincipalsWelcome />
        <Welcome />
        <WhyChooseSIS />
        <AcademicPrograms />
        <CampusLife />
        <Stats />
        <Testimonials />
        <News />
        <ApplicationProcess />
        <Footer />
      </div>
    </>
  );
}
