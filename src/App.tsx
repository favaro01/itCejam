import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/utils/ScrollToTop";
import Plasma from "./components/ui/Plasma";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Apps from "./pages/Apps";
// import Units from "./pages/Units";
// import Awards from "./pages/Awards";
// import Team from "./pages/Team";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 font-sans text-slate-200 antialiased selection:bg-cejam-cyan selection:text-white">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Plasma
          color="#00adb8"
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
        />
      </div>
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          {/* <Route path="/unidades" element={<Units />} /> */}
          {/* <Route path="/premios" element={<Awards />} /> */}
          {/* <Route path="/time" element={<Team />} /> */}
          <Route path="/apps" element={<Apps />} />
          <Route
            path="*"
            element={
              <div className="pt-32 text-center">Página não encontrada</div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
