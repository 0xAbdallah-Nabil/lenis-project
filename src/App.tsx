import Hero from "@/features/landing/LandingRoot";
import Header from "@/components/header/Header";
import GeneralInfo from "@/features/GeneralInfo/GeneralInfo";
import { LenisInitializer } from "@/features/scroll/LenisInitializer";
function App() {

  return (

    <>
      <LenisInitializer />
      <Header />
      <Hero />
      <GeneralInfo />

    </>
  )
}

export default App
