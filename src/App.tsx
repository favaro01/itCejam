import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Plasma from "./components/ui/Plasma";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Apps from "./pages/Apps";
import Units from "./pages/Units";
import Awards from "./pages/Awards";
import Team from "./pages/Team";
import Intro from "./components/Intro";
import { AnimatePresence, motion } from "framer-motion";
import CIA from "./pages/CIA";

export default function App() {
  const alreadySeen = sessionStorage.getItem("introShown") === "true";
  const [isLoading, setIsLoading] = useState(!alreadySeen);

  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const handleIntroComplete = () => {
    sessionStorage.setItem("introShown", "true");
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  return (
    <div className="relative w-full font-sans text-slate-200 antialiased selection:bg-cejam-cyan selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && <Intro key="intro" onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <ScrollToTop />

      {/* ── NAVBAR CONTROLADA ── */}
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 bg-slate-950 min-h-screen shadow-2xl ">
        <div className="absolute inset-0 z-0 w-full h-full opacity-60 pointer-events-none overflow-hidden">
          <Plasma
            color="#00adb8"
            speed={1}
            direction="forward"
            scale={1}
            opacity={1}
          />
        </div>

        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/units" element={<Units />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/team" element={<Team />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/cia" element={<CIA />} />
            <Route
              path="*"
              element={
                <div className="pt-32 text-center">Página não encontrada</div>
              }
            />
          </Routes>
        </div>
      </main>

      <Footer onVisibilityChange={setIsFooterVisible} />
    </div>
  );
}
