import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── DADOS DOS APPS ───────────────────────────────────────────
const apps = [
  {
    id: "cia",
    name: "CIA",
    tagline: "Inteligência Artificial",
    description:
      "Sua copiloto digital. Auditoria médica, suporte de TI e análise de dados em tempo real para revolucionar o atendimento.",
    features: [
      "Auditoria Automatizada",
      "Suporte 24/7",
      "Analytics em Tempo Real",
    ],
    color: "#00adb8",
    gradient: "from-cyan-500 to-blue-600",
    bgImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1920",
    icon: "🤖",
  },
  {
    id: "cpm",
    name: "CPM",
    tagline: "Cejam na Palma da Mão",
    description:
      "O Super App do colaborador. Tudo o que você precisa, do holerite à reserva de mesa, centralizado em um toque.",
    features: ["Holerite Digital", "Reserva de Espaços", "Comunicação Interna"],
    color: "#8b5cf6",
    gradient: "from-purple-500 to-pink-600",
    bgImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1920",
    icon: "📱",
  },
  {
    id: "meurh",
    name: "Meu RH",
    tagline: "Gestão Descomplicada",
    description:
      "Esqueça a papelada. Ponto eletrônico, férias e documentos direto no seu bolso. Powered by TOTVS.",
    features: ["Ponto Eletrônico", "Gestão de Férias", "Documentos Digitais"],
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    bgImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
    icon: "💼",
  },
];

export default function Apps() {
  // Ativa scroll-snap no <html> apenas enquanto esta página está montada
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y proximity";
    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="relative">
      {/* Hero Intro */}
      <section
        className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6"
        style={{ scrollSnapAlign: "start" }}
      >
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

      {/* Sticky Stacking Sections com snap */}
      {apps.map((app, index) => (
        <AppSection key={app.id} app={app} index={index} />
      ))}

      {/* Final Spacer */}
      <div className="h-2.5" />
    </div>
  );
}

// ── APP SECTION COMPONENT (Sticky + Snap) ────────────────────
interface AppSectionProps {
  app: (typeof apps)[0];
  index: number;
}

function AppSection({ app, index }: AppSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax na imagem de fundo
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  // Fade out conforme a próxima seção entra
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9, 1],
    [0, 1, 1, 0.3],
  );

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        zIndex: index,
        scrollSnapAlign: "start",
      }}
    >
      {/* Background com Parallax */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={app.bgImage}
          alt={app.name}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-t ${app.gradient} opacity-40 mix-blend-multiply`}
        ></div>
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/70 to-slate-950/40"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full"
      >
        <div className="max-w-2xl space-y-8">
          {/* Number Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg"
              style={{ borderColor: app.color, color: app.color }}
            >
              0{index + 1}
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
              {app.tagline}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white leading-none mb-4">
              {app.name}
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed border-l-4 pl-4 sm:pl-6"
            style={{ borderColor: app.color }}
          >
            {app.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {app.features.map((feature) => (
              <div
                key={feature}
                className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300"
              >
                {feature}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <button
              type="button"
              className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 text-white font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-white hover:text-slate-950 transition-all duration-300"
              style={{ borderColor: app.color }}
            >
              Saiba Mais
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Glow Effect */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 lg:w-150 lg:h-150 rounded-full blur-[80px] sm:blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: app.color }}
      ></div>
    </section>
  );
}
