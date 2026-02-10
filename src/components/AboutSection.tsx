import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hospital, MonitorCheck, Gem } from "lucide-react";

// ── Dados ─────────────────────────────────────────────────────────────
const cards = [
  {
    id: 1,
    title: "Quem Somos",
    content:
      "Não somos apenas TI. Somos o cérebro digital de uma das maiores Organizações Sociais de Saúde do Brasil. Gerenciamos a tecnologia que conecta médicos, pacientes e dados em tempo real.",
    stats: "23k+ Colaboradores",
    icon: <Hospital />,
  },
  {
    id: 2,
    title: "O Que Fazemos",
    content:
      "Do prontuário eletrônico à infraestrutura de nuvem. Desenvolvemos soluções que eliminam filas, protegem dados sensíveis e garantem que o sistema de saúde nunca pare.",
    stats: "3.8M Consultas/Ano",
    icon: <MonitorCheck />,
  },
  {
    id: 3,
    title: "Nossos Valores",
    content:
      "Humanização no código. Acreditamos que por trás de cada tela existe uma vida. Transparência, Inovação e Agilidade são requisitos do nosso sistema.",
    stats: "100+ Unidades",
    icon: <Gem />,
  },
];

// ── Hook: qual card está ativo baseado no scroll ──────────────────────
function useScrollIndex(
  ref: React.RefObject<HTMLElement | null>,
  total: number,
) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const { top } = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      const next = Math.min(total - 1, Math.floor(progress * total));

      setIndex((prev) => {
        if (prev !== next) setDir(next > prev ? 1 : -1);
        return next;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref, total]);

  return { index, dir };
}

// ── Navegar até um card ───────────────────────────────────────────────
function scrollToCard(el: HTMLElement | null, i: number, total: number) {
  if (!el) return;
  const sectionTop = el.getBoundingClientRect().top + window.scrollY;
  const scrollable = el.offsetHeight - window.innerHeight;
  window.scrollTo({
    top: sectionTop + ((i + 0.5) / total) * scrollable,
    behavior: "smooth",
  });
}

// ── Animação dos cards ────────────────────────────────────────────────
const slideVariants = {
  enter: (d: number) => ({ y: d > 0 ? 80 : -80, opacity: 0, scale: 0.95 }),
  center: { y: 0, opacity: 1, scale: 1 },
  exit: (d: number) => ({ y: d > 0 ? -80 : 80, opacity: 0, scale: 0.95 }),
};

function CardStack({ index, dir }: { index: number; dir: number }) {
  const card = cards[index];
  return (
    <div className="relative h-[420px]">
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div
          key={index}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div className="group relative overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 p-8 md:p-12 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-500">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-400/10 rounded-full blur-[80px] group-hover:bg-cyan-400/20 transition-all" />

            <div className="text-cyan-400 text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h3 className="font-bold text-3xl text-white mb-4">{card.title}</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              {card.content}
            </p>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="font-bold text-cyan-400 text-xl">
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { index, dir } = useScrollIndex(sectionRef, cards.length);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full"
      style={{ height: `${cards.length * 150}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full h-screen overflow-y-scroll snap-y snap-mandatory">
          {/* Lado esquerdo — fixo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">
              Nossos Pilares
            </span>
            <h2 className="font-bold text-4xl md:text-6xl text-white leading-tight mb-6">
              O{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                DNA
              </span>{" "}
              <br />
              da Inovação.
            </h2>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-8">
              Mergulhe na nossa arquitetura. Aqui a tecnologia não é suporte, é
              estratégia vital.
            </p>

            {/* Indicadores */}
            <div className="flex items-center gap-3">
              {cards.map((c, i) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() =>
                    scrollToCard(sectionRef.current, i, cards.length)
                  }
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

          {/* Lado direito — cards que trocam */}
          <CardStack index={index} dir={dir} />
        </div>
      </div>
    </section>
  );
}
