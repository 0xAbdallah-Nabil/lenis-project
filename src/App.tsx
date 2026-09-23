import Hero from "@/features/landing/LandingRoot";
import Header from "@/components/header/Header";
import GeneralInfo from "@/features/GeneralInfo/GeneralInfo";
import ProjectsSlider from "@/features/projects/ProjectsSlider";
import CertificatesSection from "@/features/certificates/Certificatessection";
import ContactForm from "@/features/contacts/ContactForm";
import Footer from "@/components/footer/Footer";
import { LenisInitializer } from "@/features/scroll/LenisInitializer";
import { ThemeInitializer } from "@/features/theme/ThemeInitializer";
function App() {
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