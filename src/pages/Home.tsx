import Hero from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import AppSection from "../components/AppSection";

const Home = () => {
  return (
    <main id="main-scroll-container">
      <Hero />
      <AboutSection />
      <AppSection />
    </main>
  );
};

export default Home;
