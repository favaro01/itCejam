import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Activity,
  Building2,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import MainAppsSection from "../components/apps/MainAppsSection";
import MedicsysSection from "../components/apps/MedicsysSection";
import AdminSystemsSection from "../components/apps/AdminSystemsSection";
import CareSystemsSection from "../components/apps/CareSystemsSection";

// ── NAVEGAÇÃO DAS SEÇÕES ────────────────────────────────────────────────
const sections = [
  {
    id: "principais-apps",
    label: "Principais Apps",
    Icon: Bot,
    color: "#00adb8",
  },
  { id: "medicsys", label: "MedicSys", Icon: Activity, color: "#14b8a6" },
  {
    id: "sistemas-administrativos",
    label: "Administrativos",
    Icon: Building2,
    color: "#3b82f6",
  },
  {
    id: "sistemas-assistenciais",
    label: "Assistenciais",
    Icon: Stethoscope,
    color: "#06b6d4",
  },
];

function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past the hero
      setVisible(window.scrollY > window.innerHeight * 0.5);

      // Determine which section is in view
      let current: string | null = null;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            current = section.id;
          }
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 px-2 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20"
        >
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                className={`relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: `${s.color}20`,
                      border: `1px solid ${s.color}40`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <s.Icon
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10"
                  style={isActive ? { color: s.color } : undefined}
                />
                <span className="relative z-10 hidden sm:inline">
                  {s.label}
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default function Apps() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <SectionNav />

      {/* Hero Intro */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">
            Ecossistema Digital
          </span>

          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight">
            Nossos Sistemas
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Tecnologia que transforma o dia a dia de colaboradores, gestores e
            pacientes.
          </p>

          {/* Quick Jump Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 pt-4"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() =>
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/3 text-sm text-slate-300 font-medium hover:border-white/20 hover:bg-white/6 transition-all duration-300 cursor-pointer"
              >
                <s.Icon
                  className="w-4 h-4 transition-colors"
                  style={{ color: s.color }}
                />
                {s.label}
                <ChevronDown className="w-3 h-3 text-slate-500 group-hover:translate-y-0.5 transition-transform" />
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-12 w-6 h-10 rounded-full border-2 border-cyan-500/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: 0.2,
            }}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          />
        </motion.div>
      </section>

      {/* Seção 1: Principais Apps */}
      <MainAppsSection />

      {/* Seção 2: MedicSys */}
      <MedicsysSection />

      {/* Seção 3: Sistemas Administrativos */}
      <AdminSystemsSection />

      {/* Seção 4: Sistemas Assistenciais */}
      <CareSystemsSection />
    </div>
  );
}
