import { useRef, useState, MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Award, Star, Trophy, Medal, Sparkles } from "lucide-react";

// ── DADOS DOS PRÊMIOS ────────────────────────────────────────
const awards = [
  {
    id: 1,
    title: "Excelência em Saúde",
    org: "Organização Nacional de Acreditação (ONA)",
    year: "2024",
    desc: "Até 2024, 38 unidades do CEJAM possuem selos da ONA, 8 unidades com ONA Nível 3 (Ouro), 1 unidade com ONA Nível 2 (Prata) e 29 unidades com ONA Nível 1 (Bronze)",
    icon: Trophy,
    color: "from-yellow-400 via-orange-500 to-yellow-600",
  },
  {
    id: 2,
    title: "Inovação Digital",
    org: "Tech Health Awards",
    year: "2024",
    desc: "Prêmio ouro na categoria 'Transformação Digital' pela implementação do ecossistema CIA e CPM.",
    icon: Sparkles,
    color: "from-cyan-400 via-blue-500 to-purple-600",
  },
  {
    id: 3,
    title: "Ambiente de Trabalho Exemplar",
    org: "Great Place to Work",
    year: "2022-2024",
    desc: "Reconhecimento consecutivo como uma das melhores empresas para se trabalhar na área da saúde.",
    icon: Star,
    color: "from-emerald-400 via-green-500 to-teal-600",
  },
  {
    id: 4,
    title: "Gestão Humanizada",
    org: "Prêmio Humanizar",
    year: "2021",
    desc: "Destaque nacional pelas práticas de acolhimento e humanização no atendimento das UPAs gerenciadas.",
    icon: Medal,
    color: "from-pink-500 via-rose-500 to-red-600",
  },
  {
    id: 5,
    title: "Sustentabilidade ESG",
    org: "Green Hospital Award",
    year: "2023",
    desc: "Pioneirismo na implementação de hospitais verdes e redução da pegada de carbono nas unidades.",
    icon: Award,
    color: "from-lime-400 via-green-500 to-emerald-600",
  },
];

export default function Awards() {
  return (
    <div className="min-h-screen text-white py-32 px-6 relative overflow-y-visible">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block"
        >
          Hall da Fama
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500"
        >
          Reconhecimento Global.
          <br /> Impacto <span className="text-cyan-500">Local.</span>
        </motion.h1>
      </div>

      {/* Grid de Cards Spotlight */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {awards.map((award) => (
          <SpotlightCard key={award.id} award={award} />
        ))}
      </div>
    </div>
  );
}

// ── COMPONENTE SPOTLIGHT CARD ────────────────────
const SpotlightCard = ({ award }: { award: (typeof awards)[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Efeito de Tilt (Inclinação 3D)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Cálculo do Spotlight (Posição do mouse dentro do card)
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    // Cálculo do Tilt (Rotação baseada no centro do card)
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;

    rotateX.set(yPct * -10); // Inclina eixo X invertido
    rotateY.set(xPct * 10); // Inclina eixo Y normal
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-96 rounded-3xl bg-slate-900 border border-white/10 overflow-hidden"
    >
      {/* 1. O BRILHO DO SPOTLIGHT */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* 2. CONTEÚDO DO CARD */}
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center h-full transform transition-transform duration-500 group-hover:scale-[0.98]">
        {/* Ícone com Glow */}
        <div className="relative w-20 h-20 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center mb-6 group-hover:border-cyan-500/50 transition-colors duration-500">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}
          ></div>
          <award.icon className="w-10 h-10 text-white relative z-10" />
        </div>

        <div className="text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-800 px-3 py-1 rounded-full bg-slate-950">
              {award.year}
            </span>
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
              {award.org}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
            {award.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed">{award.desc}</p>
        </div>
      </div>

      {/* 3. BORDA BRILHANTE (Spotlight na Borda) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 40%
            )
          `,
        }}
      />
    </motion.div>
  );
};
