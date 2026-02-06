import { lazy, Suspense } from "react";
import Plasma from "./components/ui/Plasma";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Values from "./components/Values";
import Products from "./components/Products";
import Stats from "./components/Stats";
import Awards from "./components/Awards";
import Footer from "./components/Footer";

// Lazy-load heavy React Flow chart (biggest JS bundle chunk)
const OrgChartSection = lazy(() => import("./components/OrgChart/OrgChartSection"));

function OrgChartFallback() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 font-sans text-slate-200 antialiased">
      {/* ── Plasma WebGL background (full-site) ──────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
        <Plasma
          color="#3b82f6"
          speed={0.3}
          direction="forward"
          scale={1.5}
          opacity={0.6}
        />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Values />
        <Products />
        <Stats />
        <Awards />
        <Suspense fallback={<OrgChartFallback />}>
          <OrgChartSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
