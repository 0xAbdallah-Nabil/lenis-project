import Hero from "@/features/landing/LandingRoot";
import Header from "@/components/header/Header";
import GeneralInfo from "@/features/GeneralInfo/GeneralInfo";
import ProjectsSlider from "@/features/projects/ProjectsSlider";
import ContactForm from "@/features/contacts/ContactForm";
import Footer from "@/components/footer/Footer";
import { LenisInitializer } from "@/features/scroll/LenisInitializer";

function App() {
  return (
    <>
      <LenisInitializer />
      <Header />
      <Hero />
      <GeneralInfo />
      <ProjectsSlider />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;