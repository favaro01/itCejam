import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { FileText, Network, Monitor, Award, Lightbulb } from "lucide-react";

const items = [
  {
    id: "quality",
    icon: FileText,
    label: "Gestão da Qualidade da TI",
    href: "https://sites.google.com/cejamcloud.com.br/sgqcejam/administra%C3%A7%C3%A3o/inova%C3%A7%C3%A3o-e-tecnologia?authuser=1", // Exemplo de link externo
  },
  {
    id: "sistemas",
    icon: Monitor,
    label: "Sistemas CEJAM",
    href: "/Apps",
  },
  {
    id: "acreditacao",
    icon: Award,
    label: "Acreditação",
    href: "/Awards",
  },
];

export default function QuickAccess() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 bg-cyan-500/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="flex flex-wrap justify-between gap-8 md:gap-12"
        >
          {items.map((item) => (
            <GlassButton key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── SUB-COMPONENTE: BOTÃO DE VIDRO (AGORA É UM LINK) ──
interface GlassButtonProps {
  item: { icon: LucideIcon; label: string; id: string; href: string };
}

const GlassButton = ({ item }: GlassButtonProps) => {
  // Verifica se é link externo para abrir em nova aba
  const isExternal = item.href.startsWith("http");

  return (
    <motion.a // 🚨 MUDAMOS DE 'button' PARA 'a'
      href={item.href}
      target={isExternal ? "_blank" : "_self"} // Abre externos em nova aba
      rel={isExternal ? "noopener noreferrer" : undefined} // Segurança para links externos
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="group flex flex-col items-center gap-4 cursor-pointer" // Adicionei cursor-pointer
    >
      {/* O Círculo Glassmorphism */}
      <div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500
        bg-white/5 
        border border-white/10 
        backdrop-blur-md
        group-hover:bg-cyan-500/10 
        group-hover:border-cyan-500/50
        group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
      >
        {/* Ícone */}
        <item.icon
          strokeWidth={1.5}
          className="w-8 h-8 md:w-10 md:h-10 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300"
        />

        {/* Anel de brilho interno */}
        <div className="absolute inset-2 rounded-full border border-white/5 group-hover:border-cyan-500/20 transition-colors" />
      </div>

      {/* Label */}
      <span className="text-sm font-medium uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors duration-300">
        {item.label}
      </span>
    </motion.a>
  );
};
