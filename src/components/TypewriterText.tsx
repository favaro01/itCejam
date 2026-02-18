import { motion } from "framer-motion";

// ── VARIANTES DINÂMICAS ────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (params: { stagger: number; delay: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: params.stagger,
      delayChildren: params.delay,
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  maxTime?: number; // Tempo máximo em SEGUNDOS
  delay?: number; // Delay inicial em SEGUNDOS antes de começar a digitar
}

export default function TypewriterText({
  text,
  className = "",
  tag = "h1",
  maxTime = 3,
  delay = 0.2,
}: TypewriterTextProps) {
  const letters = Array.from(text);
  const MotionTag = motion[tag];

  // ── A MATEMÁTICA DO TEMPO ──
  const baseSpeed = 0.05; // Velocidade ideal (50ms por letra)
  const estimatedTime = text.length * baseSpeed;

  // Se o tempo estimado for maior que o limite, aceleramos.
  // Caso contrário, mantemos a velocidade ideal (para textos curtos não ficarem instantâneos).
  const finalStagger =
    estimatedTime > maxTime ? maxTime / text.length : baseSpeed;

  return (
    <MotionTag
      // Passamos o valor calculado para as variantes através do 'custom'
      custom={{ stagger: finalStagger, delay }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-wrap ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </MotionTag>
  );
}
