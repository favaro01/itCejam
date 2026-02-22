import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  Activity,
  ShieldCheck,
  BarChart3,
  Zap,
  Database,
  TrendingUp,
  Clock,
  Eye,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import AIOrb from "../components/Orb";

// ── Diálogos sequenciais da C.I.A ──
const dialogues = [
  "Olá. Eu sou a C.I.A a Inteligência Artificial do CEJAM.",
  "Processo milhões de dados clínicos por segundo para garantir que nenhuma decisão médica seja tomada no escuro.",
  "Vamos explorar o que eu posso fazer.",
];

// ── Capacidades da C.I.A ──
const capabilities = [
  {
    icon: BrainCircuit,
    title: "Análise Preditiva",
    description:
      "Algoritmos de machine learning que identificam padrões clínicos antes que se tornem críticos, antecipando riscos e otimizando desfechos.",
    color: "cyan",
  },
  {
    icon: ShieldCheck,
    title: "Governança de Dados",
    description:
      "Conformidade total com a LGPD. Cada dado é rastreado, auditado e protegido com criptografia de ponta a ponta.",
    color: "emerald",
  },
  {
    icon: BarChart3,
    title: "Dashboards em Tempo Real",
    description:
      "Painéis interativos que transformam dados brutos em insights acionáveis para gestores das 130+ unidades.",
    color: "violet",
  },
  {
    icon: Zap,
    title: "Automação Inteligente",
    description:
      "Fluxos automatizados que eliminam tarefas repetitivas, liberando profissionais de saúde para focar no que importa: o paciente.",
    color: "amber",
  },
];

// ── Métricas ao vivo ──
const metrics = [
  { label: "Dados processados/dia", value: "4.2B", icon: Database },
  { label: "Tempo de resposta", value: "<50ms", icon: Clock },
  { label: "Precisão analítica", value: "99.7%", icon: TrendingUp },
  { label: "Unidades monitoradas", value: "130+", icon: Eye },
];

// ── Hook de digitação ──
function useTypewriter(text: string, speed = 40, enabled = false) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayed("");
      setDone(false);
      return;
    }

    let i = 0;
    setDisplayed("");
    setDone(false);

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayed, done };
}

// ── Cor por nome → classes Tailwind ──
const colorMap: Record<
  string,
  { bg: string; border: string; text: string; glow: string }
> = {
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    glow: "group-hover:shadow-emerald-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
    glow: "group-hover:shadow-violet-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    glow: "group-hover:shadow-amber-500/20",
  },
};

export default function CIA() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "content">("intro");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentText = dialogues[dialogueIndex] ?? "";
  const { displayed, done } = useTypewriter(currentText, 35, phase === "intro");

  // ── Controle do fluxo de diálogos ──
  useEffect(() => {
    if (!done || phase !== "intro") return;

    setIsSpeaking(false);

    const timer = setTimeout(() => {
      if (dialogueIndex < dialogues.length - 1) {
        setDialogueIndex((prev) => prev + 1);
        setIsSpeaking(true);
      } else {
        // Último diálogo terminado → transição para conteúdo
        setTimeout(() => setPhase("content"), 800);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [done, dialogueIndex, phase]);

  // ── Inicia a fala automaticamente ──
  useEffect(() => {
    const timer = setTimeout(() => setIsSpeaking(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // ── Scroll para conteúdo ──
  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-white">
      {/* ━━━━━━━━━━━━━ HERO / INTRO ━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Grid de Fundo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

        {/* Glow centralizado */}
        <div
          className={`absolute w-125 h-125 rounded-full blur-[180px] transition-all duration-1000 pointer-events-none ${
            isSpeaking ? "bg-cyan-500/25 scale-110" : "bg-cyan-500/10 scale-90"
          }`}
        />

        {/* ── ORBE ── */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="w-64 h-64 sm:w-80 sm:h-80 mb-8 relative"
        >
          <AIOrb hue={3.5} hoverIntensity={0.8} forceHoverState={isSpeaking} />
        </motion.div>

        {/* ── STATUS INDICATOR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isSpeaking ? "bg-cyan-500 animate-pulse" : "bg-emerald-500"
            }`}
          />
          <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
            {isSpeaking ? "Processando..." : "C.I.A Online"}
          </span>
        </motion.div>

        {/* ── CAIXA DE DIÁLOGO ── */}
        <div className="max-w-3xl w-full min-h-30 text-center z-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={dialogueIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed tracking-wide text-slate-200"
            >
              {displayed}
              {phase === "intro" && (
                <span className="animate-pulse text-cyan-500 ml-0.5">_</span>
              )}
            </motion.p>
          </AnimatePresence>

          {/* Indicador de progresso dos diálogos */}
          {phase === "intro" && (
            <div className="flex justify-center gap-2 mt-8">
              {dialogues.map((_, idx) => (
                <div
                  key={`dot-${dialogues[idx]?.slice(0, 10)}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx <= dialogueIndex
                      ? "w-8 bg-cyan-500"
                      : "w-4 bg-slate-700"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── SCROLL CTA (aparece após intro) ── */}
        <AnimatePresence>
          {phase === "content" && (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onClick={scrollToContent}
              className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40 hover:text-cyan-400 transition-colors cursor-pointer bg-transparent border-none"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
                Descobrir mais
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </section>

      {/* ━━━━━━━━━━━━━ MÉTRICAS EM TEMPO REAL ━━━━━━━━━━━━━ */}
      <section ref={contentRef} className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative group p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-sm hover:bg-white/6 hover:border-cyan-500/20 transition-all duration-300"
              >
                <metric.icon className="w-5 h-5 text-cyan-500/60 mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">
                  {metric.label}
                </div>

                {/* Pulse ao vivo */}
                <div className="absolute top-4 right-4">
                  <Activity className="w-3 h-3 text-emerald-500/50 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━ CAPACIDADES ━━━━━━━━━━━━━ */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-cyan-500 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Capacidades
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Inteligência que{" "}
              <span className="text-cyan-500">transforma dados</span>
              <br />
              em decisões que salvam vidas
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              A C.I.A combina tecnologia de ponta com experiência clínica para
              criar um ecossistema de saúde mais inteligente e responsivo.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid md:grid-cols-2 gap-6"
          >
            {capabilities.map((cap) => {
              const colors = colorMap[cap.color] ?? colorMap.cyan;
              return (
                <motion.div
                  key={cap.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className={`group relative p-8 rounded-2xl bg-white/2 border border-white/6 hover:border-white/12 transition-all duration-500 hover:shadow-lg ${colors.glow}`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} mb-5`}
                  >
                    <cap.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {cap.description}
                  </p>

                  {/* Hover glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━ CTA FINAL ━━━━━━━━━━━━━ */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glow de fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para ver a C.I.A
              <br />
              <span className="text-cyan-500">em ação?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Entre em contato com a equipe de Inovação & Tecnologia e descubra
              como a inteligência analítica pode transformar a sua unidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/apps"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold transition-all duration-300 hover:bg-cyan-50 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-[0.98]"
              >
                <Zap className="w-5 h-5 text-cyan-600" />
                <span>Explorar Sistemas</span>
              </Link>
              <Link
                to="/team"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-[0.98]"
              >
                <span>Conheça o Time</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
