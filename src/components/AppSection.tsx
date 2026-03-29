import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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
    link: "/cia",
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
    link: "/sistemas",
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
    link: "/sistemas",
    phone: "right", // celular na direita, texto na esquerda
  },
];

const wrapIndex = (value: number) => (value + apps.length) % apps.length;
const swipeThreshold = 9000;
const transitionDelayMs = 120;

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

// ── Texto animado ─────────────────────────────────────────────────────
const textVariants = {
  enter: (d: number) => ({ x: d > 0 ? 90 : -90, opacity: 0, y: 18 }),
  center: { x: 0, opacity: 1, y: 0 },
  exit: (d: number) => ({ x: d > 0 ? -90 : 90, opacity: 0, y: -18 }),
};

const phoneVariants = {
  enter: (d: number) => ({ x: d > 0 ? -70 : 70, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d > 0 ? 70 : -70, opacity: 0, scale: 0.95 }),
};

function AppText({
  index,
  dir,
  phoneOnRight,
}: {
  index: number;
  dir: number;
  phoneOnRight: boolean;
}) {
  const app = apps[index];
  return (
    <AnimatePresence initial={false} custom={dir} mode="wait">
      <motion.div
        key={index}
        custom={dir}
        variants={textVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`max-w-lg pointer-events-auto ${phoneOnRight ? "text-left" : "text-right"}`}
      >
        <div
          className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r ${app.gradient} mb-4`}
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
        <Link to={app.link}>
          <button
            type="button"
            className="px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-white/20 text-white font-bold text-sm sm:text-base uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-300 cursor-pointer"
          >
            Ver Funcionalidades {app.link === "/cia" ? "da CIA" : "do App"}
          </button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Celular ───────────────────────────────────────────────────────────
function PhoneMockup({
  index,
  dir,
  onPaginate,
}: {
  index: number;
  dir: number;
  onPaginate: (direction: number) => void;
}) {
  const app = apps[index];
  return (
    <div className="relative w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] md:w-[260px] md:h-[520px] lg:w-[320px] lg:h-[640px] flex items-center justify-center">
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={index}
          custom={dir}
          variants={phoneVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.7}
          onDragEnd={(_, info) => {
            const swipe = swipePower(info.offset.x, info.velocity.x);
            if (swipe < -swipeThreshold) onPaginate(1);
            if (swipe > swipeThreshold) onPaginate(-1);
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-[90%] h-[90%] bg-slate-950 border-[6px] sm:border-[8px] border-slate-800 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden ring-1 ring-white/10 relative cursor-grab active:cursor-grabbing"
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-36 h-5 sm:h-7 bg-slate-800 rounded-b-2xl z-20 flex justify-center items-center">
            <div className="w-12 h-1.5 bg-slate-900 rounded-full opacity-50" />
          </div>

          {/* Tela */}
          <div className="relative w-full h-full bg-slate-900">
            <motion.img
              key={`image-${index}`}
              src={app.image}
              alt={app.title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

            {/* Info na base */}
            <div className="absolute bottom-6 left-4 right-4 sm:bottom-10 sm:left-8 sm:right-8 z-20">
              <motion.div
                key={`caption-${index}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
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
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

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
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);
  const changeTimeoutRef = useRef<number | null>(null);

  const clearPendingChange = useCallback(() => {
    if (changeTimeoutRef.current !== null) {
      window.clearTimeout(changeTimeoutRef.current);
      changeTimeoutRef.current = null;
    }
  }, []);

  const schedulePageChange = useCallback(
    (updater: () => void) => {
      clearPendingChange();
      changeTimeoutRef.current = window.setTimeout(() => {
        updater();
        changeTimeoutRef.current = null;
      }, transitionDelayMs);
    },
    [clearPendingChange],
  );

  const paginate = (direction: number) => {
    schedulePageChange(() => {
      setPage(([prev]) => [wrapIndex(prev + direction), direction]);
    });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      schedulePageChange(() => {
        setPage(([prev]) => [wrapIndex(prev + 1), 1]);
      });
    }, 7000);

    return () => {
      window.clearInterval(timer);
      clearPendingChange();
    };
  }, [clearPendingChange, schedulePageChange]);

  const goToSlide = (nextIndex: number) => {
    schedulePageChange(() => {
      setPage(([prev]) => [nextIndex, nextIndex > prev ? 1 : -1]);
    });
  };

  const app = apps[index];
  const phoneOnRight = app.phone === "right";

  return (
    <section
      id="apps"
      className="relative w-full py-20 sm:py-24 overflow-x-hidden overflow-y-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="w-full flex flex-col items-center gap-8 sm:gap-10 lg:gap-16 lg:flex-row lg:items-center lg:justify-between">
          <div
            className={`flex-1 min-w-0 ${phoneOnRight ? "lg:order-1" : "lg:order-2 lg:flex lg:justify-end"}`}
          >
            <AppText index={index} dir={dir} phoneOnRight={phoneOnRight} />
          </div>

          <div
            className={`shrink-0 ${phoneOnRight ? "lg:order-2" : "lg:order-1"}`}
          >
            <PhoneMockup index={index} dir={dir} onPaginate={paginate} />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => paginate(-1)}
            className="rounded-full border border-white/15 bg-slate-900/50 px-5 py-2 text-sm text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
            aria-label="Aplicativo anterior"
          >
            Anterior
          </button>

          <div className="flex justify-center gap-3">
            {apps.map((a, i) => (
              <button
                type="button"
                key={a.id}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === index
                    ? "w-10 bg-cyan-400"
                    : "w-4 bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Ir para ${a.title}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => paginate(1)}
            className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300 transition hover:border-cyan-300 hover:text-cyan-200"
            aria-label="Próximo aplicativo"
          >
            Próximo
          </button>
        </div>
      </div>
    </section>
  );
}
