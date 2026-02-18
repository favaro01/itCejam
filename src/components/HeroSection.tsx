import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  Activity,
  ChevronDown,
  Users,
  Building2,
  HeartPulse,
} from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Orb from "../components/Orb";
import TypewriterText from "../components/TypewriterText";

// Se a intro já foi vista (navegação interna), não esperar
const introAlreadySeen = sessionStorage.getItem("introShown") === "true";
// Tempo total da Intro (2.5s barra + 0.8s exit) + pequeno buffer
const INTRO_DURATION = introAlreadySeen ? 0 : 3.5;

// ── Estatísticas de impacto ──
const stats = [
  { icon: Building2, value: "130+", label: "Unidades" },
  { icon: Users, value: "17 mil+", label: "Colaboradores" },
  { icon: HeartPulse, value: "2M+", label: "Atendimentos/Mês" },
];

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  // Controla se o Orbe está "falando" (vibrando)
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [showStats, setShowStats] = useState(false);

  // ── Auto-desligar o orbe após as animações do texto terminarem ──
  useEffect(() => {
    const timer = setTimeout(
      () => setIsSpeaking(false),
      (INTRO_DURATION + 4.5) * 1000, // Acalma o orbe após intro + animações de texto
    );
    return () => clearTimeout(timer);
  }, []);

  // ── Scroll suave para a próxima seção ──
  const scrollToContent = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }, []);

  // Animações de entrada (Coreografia — mais rápida e fluida)
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Orbe entra deslizando da direita (após a intro)
      tl.fromTo(
        ".hero-orb-col",
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: INTRO_DURATION + 0.3,
          duration: 1.2,
          ease: "power2.out",
        },
      )

        // 2. Container do texto aparece
        .fromTo(
          ".hero-text-col",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.8",
        )

        // 3. Botões sobem
        .fromTo(
          ".hero-actions",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "+=1.2",
        )

        // 4. Stats aparecem com stagger
        .call(() => setShowStats(true), [], "+=0.3")

        // 5. Scroll indicator
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "+=0.4",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-end overflow-hidden bg-slate-950 px-6 pt-20 lg:pt-0"
    >
      {/* ── COLUNA DA ESQUERDA: TEXTO ── */}
      <div className="hero-text-col w-full lg:w-1/2 relative z-20 lg:pl-16 text-center lg:text-left order-2 lg:order-1 mt-6 lg:mt-0">
        {/* Badge "Ao Vivo" */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
          <Activity className="w-3 h-3 animate-pulse" />
          <span className="animate-pulse">Sistema C.I.A Online</span>
        </div>

        {/* Título com Digitação */}
        <div className="flex flex-col items-center lg:items-start justify-center min-h-32 lg:min-h-48 mb-6">
          <TypewriterText
            text="Processando"
            tag="h1"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1]"
            maxTime={1}
            delay={INTRO_DURATION + 0.8}
          />

          {/* Subtítulo com reveal palavra por palavra */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 mt-1">
            {(
              [
                { word: "o", delay: INTRO_DURATION + 1.6 },
                { word: "futuro", delay: INTRO_DURATION + 1.75 },
                { word: "da", delay: INTRO_DURATION + 1.9 },
                { word: "Saúde", delay: INTRO_DURATION + 2.05 },
                { word: "Pública", delay: INTRO_DURATION + 2.2 },
              ] as const
            ).map(({ word, delay }) => (
              <Motion.span
                key={word}
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="text-cyan-500 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1]"
              >
                {word}
              </Motion.span>
            ))}
          </div>
        </div>

        {/* CTA (Sobe depois) */}
        <div className="hero-actions flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            to="/cia"
            onMouseEnter={() => setIsSpeaking(true)}
            onMouseLeave={() => setIsSpeaking(false)}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold transition-all duration-300 hover:bg-cyan-50 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-[0.98]"
          >
            <Cpu className="w-5 h-5 text-cyan-600" />
            <span>Conheça a C.I.A</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/team"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 hover:border-white/20 transition-all duration-300 active:scale-[0.98]"
          >
            <Users className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span>Nossa Equipe</span>
          </Link>
        </div>

        {/* ── STATS BAR ── */}
        <AnimatePresence>
          {showStats && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-10"
            >
              {stats.map((stat, i) => (
                <Motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-slate-400 text-xs uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── COLUNA DA DIREITA: ORBE ── */}
      <div className="hero-orb-col w-full lg:w-1/2 h-100 sm:h-110 lg:h-200 relative order-1 lg:order-2 flex items-center justify-center">
        {/* Glow atrás do orbe */}
        <div
          className={`absolute w-[60%] h-[60%] bg-cyan-500/20 blur-[120px] rounded-full transition-all duration-1000 ${isSpeaking ? "scale-110 opacity-100" : "scale-90 opacity-40"}`}
        />

        {/* O Componente Orb OGL */}
        <button
          type="button"
          className="w-full h-full scale-110 lg:scale-125 cursor-pointer bg-transparent border-none p-0"
          onClick={() => setIsSpeaking(!isSpeaking)}
          aria-label="Interagir com o orbe"
        >
          <Orb hue={3.5} hoverIntensity={0.8} forceHoverState={isSpeaking} />
        </button>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <button
        type="button"
        onClick={scrollToContent}
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/40 hover:text-cyan-400 transition-colors duration-300 cursor-pointer bg-transparent border-none opacity-0"
        aria-label="Rolar para baixo"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
          Explorar
        </span>
        <Motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </Motion.div>
      </button>

      {/* Grid de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none opacity-20 -z-10" />

      {/* Gradiente inferior para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent pointer-events-none z-10" />
    </section>
  );
}
