import { motion } from "framer-motion";
import TypewriterText from "../components/TypewriterText";

export default function Intro({ onComplete }: { onComplete?: () => void }) {
  return (
    <motion.div
      // A div principal cobre a tela toda
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
      // Animação de Saída (A cortina subindo)
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* ── LOGO OU TEXTO CENTRAL ── */}
      <div className="relative flex items-center overflow-hidden">
        <div className="flex items-center gap-4">
          <motion.img
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-40 object-contain"
            src="https://midias.medicsys.com.br/logoCejam.png"
            alt="CEJAM Tecnologia logo"
          />
          <motion.h1
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="cejam-logo text-6xl md:text-8xl font-bold text-white tracking-tighter"
          >
            CEJAM
          </motion.h1>
        </div>
      </div>

      <div className="relative overflow-hidden mt-2">
        <TypewriterText
          text="Inovação & Tecnologia"
          tag="p"
          className="text-cyan-500 font-bold uppercase tracking-[0.5em] text-sm"
          maxTime={2.0}
        />
      </div>

      {/* ── BARRA DE PROGRESSO ── */}
      <div className="absolute bottom-20 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          // O tempo total da intro é controlado aqui
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-cyan-500"
          onAnimationComplete={onComplete}
        />
      </div>

      {/* Frases aleatórias de carregamento */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 text-xs text-slate-500 font-mono"
      >
        Carregando módulos...
      </motion.span>
    </motion.div>
  );
}
