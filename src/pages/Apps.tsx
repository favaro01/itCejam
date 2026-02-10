import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── DADOS DOS APPS ───────────────────────────────────────────
const apps = [
  {
    id: "cia",
    name: "CIA",
    tagline: "Inteligência Artificial",
    description:
      "Muito mais que um assistente virtual. A CIA é uma plataforma de Inteligência Artificial Generativa treinada para atuar como uma auditora sênior e analista de suporte. Ela processa documentos em segundos para garantir conformidade, tira dúvidas complexas na abertura de chamados via chat natural e oferece informações do ambiente CEJAM em tempo real.",
    features: [
      "Auditoria Automatizada",
      "Suporte 24/7",
      "Analytics em Tempo Real",
    ],
    color: "#00adb8",
    gradient: "from-cyan-500 to-blue-600",
    bgImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: "cpm",
    name: "CPM",
    tagline: "Cejam na Palma da Mão",
    description:
      "O centro nervoso da sua vida profissional. O CPM elimina a fragmentação de sistemas, reunindo tudo o que você precisa em uma única interface intuitiva. Precisa reservar uma estação de trabalho híbrida? Pedir reembolso de despesas via Paytrack? Ou tirar alguma dúvida com a CIA? Tudo está a um toque de distância.",
    features: ["Holerite Digital", "Reserva de Espaços", "Comunicação Interna"],
    color: "#8b5cf6",
    gradient: "from-purple-500 to-pink-600",
    bgImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920",
  },
  {
    id: "meurh",
    name: "Meu RH",
    tagline: "Gestão Descomplicada",
    description:
      "Esqueça as filas no RH e a papelada física. Com a robustez da tecnologia TOTVS, o Meu RH entrega o controle da sua carreira nas suas mãos. Realize marcação de ponto por geolocalização com reconhecimento facial, envie atestados médicos digitalmente e programe suas férias com transparência total.",
    features: ["Ponto Eletrônico", "Gestão de Férias", "Documentos Digitais"],
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    bgImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
  },
];

export default function Apps() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      id="main-scroll-container"
      // scroll-pt-32: Cria a zona de proteção para a Navbar
      // snap-always: Força a parar em cada seção
      className="relative h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-slate-950 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
    >
      {/* Hero Intro */}
      <section className="relative h-screen snap-start snap-always flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">
            Ecossistema Digital
          </span>

          <h1 className="font-bold text-6xl sm:text-7xl lg:text-8xl text-white leading-tight">
            Nossos Aplicativos
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
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

      {/* Seções dos Apps */}
      {apps.map((app, index) => (
        <AppSection
          key={app.id}
          app={app}
          index={index}
          containerRef={containerRef}
        />
      ))}

      {/* Spacer Final */}
      <div className="h-[50vh] snap-start snap-always bg-slate-950 flex items-center justify-center">
        <p className="text-slate-700 uppercase tracking-widest text-sm">
          Fim do Tour
        </p>
      </div>
    </div>
  );
}

// ── APP SECTION COMPONENT ────────────────────────────────────
interface AppSectionProps {
  app: (typeof apps)[0];
  index: number;
  containerRef: React.RefObject<HTMLElement>;
}

function AppSection({ app, index, containerRef }: AppSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  // Opacidade ajustada para desaparecer suavemente quando sair da tela
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 h-screen w-full snap-start snap-always flex items-center justify-center overflow-hidden"
      style={{ zIndex: index }}
    >
      {/* Background */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={app.bgImage}
          alt={app.name}
          className="w-full h-full object-cover"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t ${app.gradient} opacity-30 mix-blend-multiply`}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/30"></div>
      </motion.div>

      {/* Conteúdo Centralizado */}
      <motion.div
        style={{ opacity }}
        // REMOVIDO: pt-20 ou qualquer padding.
        // Agora o 'flex items-center' do pai cuida de tudo.
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-4"
          >
            <div
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg"
              style={{ borderColor: app.color, color: app.color }}
            >
              0{index + 1}
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
              {app.tagline}
            </span>
          </motion.div>

          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-bold text-7xl sm:text-8xl lg:text-9xl text-white leading-none mb-4">
              {app.name}
            </h2>
          </motion.div>

          {/* Descrição */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl sm:text-2xl text-slate-300 leading-relaxed border-l-4 pl-6"
            style={{ borderColor: app.color }}
          >
            {app.description}
          </motion.p>

          {/* Features */}
          <motion.div className="flex flex-wrap gap-3 py-3">
            {app.features.map((feature) => (
              <div
                key={feature}
                className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-slate-300"
              >
                {feature}
              </div>
            ))}
          </motion.div>

          {/* Botão */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <button
              type="button"
              className="group px-8 py-4 rounded-full border-2 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-slate-950 transition-all duration-300"
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
    </section>
  );
}
