import Hero from "@/features/landing/LandingRoot";
import Header from "@/components/header/Header";
import GeneralInfo from "@/features/GeneralInfo/GeneralInfo";
import ProjectsSlider from "@/features/projects/ProjectsSlider";
import CertificatesSection from "@/features/certificates/Certificatessection";
import ContactForm from "@/features/contacts/ContactForm";
import Footer from "@/components/footer/Footer";
import { LenisInitializer } from "@/features/scroll/LenisInitializer";
import { ThemeInitializer } from "@/features/theme/ThemeInitializer";
// AOS does not ship TypeScript declarations.
// @ts-expect-error: the package is JavaScript-only and has no available declaration file.
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <LenisInitializer />
      <ThemeInitializer />
      <Header />
      <Hero />
      <GeneralInfo />
      <ProjectsSlider />
      <CertificatesSection />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;