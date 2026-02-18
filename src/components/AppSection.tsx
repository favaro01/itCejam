import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// ── Dados ─────────────────────────────────────────────────────────────
const apps = [
  {
    id: 1,
    title: "CIA",
    category: "INOVAÇÃO",
    description:
      "Sua copiloto digital no dia a dia. Atuando como auditora consultiva, ela eleva a barra da qualidade e revoluciona o suporte de TI: tire dúvidas técnicas e abra chamados complexos em segundos, conversando diretamente com nossa IA.",
    image:
      "https://images.pexels.com/photos/17483868/pexels-photo-17483868.jpeg?auto=format&fit=crop&q=80&w=600",
    gradient: "from-cejam-cyan to-blue-600",
    glow: "#00adb8",
    phone: "right", // celular na direita, texto na esquerda
  },
  {
    id: 2,
    title: "Cejam na Palma da Mão",
    category: "SUPER APP",
    description:
      "O Hub definitivo do colaborador. Centraliza Dashboards, Paytrack e Comunicação Interna. O destaque é o 'Meu Lugar': a gestão inteligente do trabalho híbrido que permite reservar sua estação de trabalho presencial em tempo real.",
    image:
      "https://images.pexels.com/photos/7071/space-desk-office-workspace.jpg?auto=format&fit=crop&q=80&w=600",
    gradient: "from-violet-500 to-fuchsia-500",
    glow: "#8b5cf6",
    phone: "left", // celular na esquerda, texto na direita
  },
  {
    id: 3,
    title: "Meu RH",
    category: "GESTAO DE PESSOAS",
    description:
      "Autonomia total na jornada de trabalho. Integrado ao ecossistema TOTVS, permite o registro de ponto geolocalizado, gestão de férias e justificativas de atraso instantâneas. O RH burocrático ficou no passado.",
    image:
      "https://images.pexels.com/photos/7875996/pexels-photo-7875996.jpeg?auto=format&fit=crop&q=80&w=600",
    gradient: "from-emerald-400 to-green-600",
    glow: "#10b981",
    phone: "right", // celular na direita, texto na esquerda
  },
];

// ── Hook: scroll index ────────────────────────────────────────────────
function useScrollIndex(
  ref: React.RefObject<HTMLElement | null>,
  total: number,
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const { top } = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      const next = Math.min(total - 1, Math.floor(progress * total));
      setIndex(next);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, total]);

  return index;
}

// ── Texto animado ─────────────────────────────────────────────────────
const textVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
};

function AppText({
  index,
  phoneOnRight,
}: {
  index: number;
  phoneOnRight: boolean;
}) {
  const app = apps[index];
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={index}
        variants={textVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`flexmax-w-lg pointer-events-auto items-center ${phoneOnRight ? "text-left" : "text-right"}`}
      >
        <div
          className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r ${app.gradient} mb-4 sm:mb-8 border border-white/10`}
        >
          <span className="text-white font-bold text-xs tracking-[0.2em] uppercase">
            {app.category}
          </span>
        </div>

        <h3 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-8 leading-tight">
          {app.title}
        </h3>

        <p
          className={`text-slate-400 text-base sm:text-xl leading-relaxed mb-6 sm:mb-10 ${phoneOnRight ? "border-l-2 border-white/10 pl-4 sm:pl-6" : "border-r-2 border-white/10 pr-4 sm:pr-6"}`}
        >
          {app.description}
        </p>

        <button
          type="button"
          className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-white/20 text-white font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-300 cursor-pointer"
        >
          Ver Funcionalidades
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Celular ───────────────────────────────────────────────────────────
function PhoneMockup({ index }: { index: number }) {
  const app = apps[index];
  return (
    <div className="relative w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] md:w-[260px] md:h-[520px] lg:w-[320px] lg:h-[640px] flex items-center justify-center">
      {/* Mockup */}
      <div className="w-[90%] h-[90%] bg-slate-950 border-[6px] sm:border-[8px] border-slate-800 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden ring-1 ring-white/10 relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-36 h-5 sm:h-7 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-12 h-1.5 bg-slate-900 rounded-full opacity-50" />
        </div>

        {/* Tela */}
        <div className="relative w-full h-full bg-slate-900">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={index}
              src={app.image}
              alt={app.title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          {/* Info na base */}
          <div className="absolute bottom-6 left-4 right-4 sm:bottom-10 sm:left-8 sm:right-8 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <div className="text-white font-bold text-lg sm:text-2xl mb-2">
                  {app.title}
                </div>
                <div className="flex gap-2">
                  <div
                    className={`h-1.5 w-full rounded-full bg-gradient-to-r ${app.gradient}`}
                  />
                  <div className="h-1.5 w-1/3 rounded-full bg-white/20" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Glow */}
      <motion.div
        animate={{ background: app.glow }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full blur-[100px] sm:blur-[150px] opacity-15 -z-10"
      />
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────
export default function AppShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const index = useScrollIndex(sectionRef, apps.length);
  const app = apps[index];
  const phoneOnRight = app.phone === "right";

  return (
    <section
      ref={sectionRef}
      id="apps"
      className="relative w-full"
      style={{ height: `${apps.length * 150}vh` }}
    >
      <div className="sticky top-8 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
          {/* Mobile: empilhado | Desktop: lado a lado com layout animation */}
          <LayoutGroup>
            <motion.div
              layout
              className={`w-full flex flex-col items-center gap-6 sm:gap-8 lg:gap-16 ${
                phoneOnRight
                  ? "lg:flex-row lg:justify-end"
                  : "lg:flex-row-reverse lg:justify-between"
              }`}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                  mass: 0.8,
                },
              }}
            >
              {/* Texto */}
              <motion.div layout className="flex-1 min-w-0">
                <AppText index={index} phoneOnRight={phoneOnRight} />
              </motion.div>

              {/* Celular */}
              <motion.div layout className="flex-shrink-0">
                <PhoneMockup index={index} />
              </motion.div>
            </motion.div>
          </LayoutGroup>

          {/* Indicadores */}
          <div className="flex justify-center gap-3 mt-6 lg:mt-0">
            {apps.map((a, i) => (
              <button
                type="button"
                key={a.id}
                onClick={() => {
                  const el = sectionRef.current;
                  if (!el) return;
                  const sectionTop =
                    el.getBoundingClientRect().top + window.scrollY;
                  const scrollable = el.offsetHeight - window.innerHeight;
                  window.scrollTo({
                    top: sectionTop + ((i + 0.5) / apps.length) * scrollable,
                    behavior: "smooth",
                  });
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === index
                    ? "w-10 bg-cyan-400"
                    : "w-4 bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Ir para ${a.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
