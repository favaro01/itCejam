import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hospital, MonitorCheck, Gem } from "lucide-react";

// ── Dados ─────────────────────────────────────────────────────────────
const cards = [
  {
    id: 1,
    title: "Quem Somos",
    content:
      "Não somos apenas TI. Somos o cérebro digital de uma das maiores Organizações Sociais de Saúde do Brasil. Gerenciamos a tecnologia que conecta médicos, pacientes e dados em tempo real.",
    stats: "24k+ Colaboradores",
    icon: <Hospital className="w-10 h-10" />,
  },
  {
    id: 2,
    title: "O Que Fazemos",
    content:
      "Do prontuário eletrônico à infraestrutura de nuvem. Desenvolvemos soluções que eliminam filas, protegem dados sensíveis e garantem que o sistema de saúde público nunca pare.",
    stats: "4.1M Consultas/Ano",
    icon: <MonitorCheck className="w-10 h-10" />,
  },
  {
    id: 3,
    title: "Nossos Valores",
    content:
      "Humanização no código. Acreditamos que por trás de cada tela existe uma vida. Transparência, Inovação e Agilidade são requisitos do nosso sistema.",
    stats: "120+ Unidades",
    icon: <Gem className="w-10 h-10" />,
  },
];

const wrapIndex = (value: number) => (value + cards.length) % cards.length;
const swipeThreshold = 9000;

// ── Animação dos cards ────────────────────────────────────────────────
const slideVariants = {
  enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.95 }),
};

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

function CardStack({
  index,
  dir,
  onPaginate,
}: {
  index: number;
  dir: number;
  onPaginate: (direction: number) => void;
}) {
  const card = cards[index];

  return (
    <div className="relative h-80 sm:h-95 md:h-105">
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(_, info) => {
            const swipe = swipePower(info.offset.x, info.velocity.x);
            if (swipe < -swipeThreshold) onPaginate(1);
            if (swipe > swipeThreshold) onPaginate(-1);
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div className="group flex-col relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900/50 border border-white/10 p-8 sm:p-8 md:p-12 backdrop-blur-sm h-full hover:border-cyan-400/50 transition-colors duration-500">
            <div className="absolute -right-10 -top-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] group-hover:bg-cyan-400/20 transition-all" />

            <div className="absolute right-5 top-5 text-cyan-400 text-3xl sm:text-4xl rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h3 className="pt-5 font-bold text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-4">
              {card.title}
            </h3>
            <p className="pt-5 text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-8">
              {card.content}
            </p>

            <div className="pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="font-bold text-cyan-400 text-base sm:text-xl">
                {card.stats}
              </span>
              <span className="text-slate-600 text-sm font-mono">
                0{index + 1} / 0{cards.length}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────
export default function AboutSection() {
  const [[index, dir], setPage] = useState<[number, number]>([0, 0]);

  const paginate = (direction: number) => {
    setPage(([prev]) => [wrapIndex(prev + direction), direction]);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPage(([prev]) => [wrapIndex(prev + 1), 1]);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const goToCard = (nextIndex: number) => {
    setPage(([prev]) => [nextIndex, nextIndex > prev ? 1 : -1]);
  };

  return (
    <section id="about" className="relative w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-4 block">
            Nossos Pilares
          </span>
          <h2 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6">
            O{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              DNA
            </span>{" "}
            <br />
            da Inovação.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed mb-6 sm:mb-8">
            Navegue pelo carrossel para conhecer quem somos, o que fazemos e os
            valores que guiam nossa evolução.
          </p>

          <div className="flex items-center gap-3">
            {cards.map((c, i) => (
              <button
                type="button"
                key={c.id}
                onClick={() => goToCard(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === index
                    ? "w-10 bg-cyan-400"
                    : "w-4 bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Ir para ${c.title}`}
              />
            ))}
            <span className="text-slate-600 text-xs font-mono ml-2">
              0{index + 1} / 0{cards.length}
            </span>
          </div>
        </motion.div>

        <div className="space-y-4">
          <CardStack index={index} dir={dir} onPaginate={paginate} />

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="rounded-full border border-white/15 bg-slate-900/50 px-5 py-2 text-sm text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
              aria-label="Card anterior"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300 transition hover:border-cyan-300 hover:text-cyan-200"
              aria-label="Próximo card"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
