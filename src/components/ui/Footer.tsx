import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  MapPin,
  Heart,
  Globe,
  Shield,
} from "lucide-react";
import { useInView } from "framer-motion";

const footerLinks = [
  {
    title: "Ecossistema",
    links: [
      "Sistemas CIA & CPM",
      "Portal do Colaborador",
      "Intranet Corporativa",
      "Cloud CEJAM",
    ],
  },
  {
    title: "Institucional",
    links: [
      "Sobre a Tecnologia",
      "Nossa Equipe",
      "Carreiras Tech",
      "Compliance & LGPD",
    ],
  },
  {
    title: "Suporte",
    links: [
      "Abrir Chamado",
      "Status dos Serviços",
      "Base de Conhecimento",
      "Manual do Usuário",
    ],
  },
];

interface FooterProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function Footer({ onVisibilityChange }: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // Detecta se o wrapper do footer entrou na tela (margin "-100px" para antecipar um pouco)
  const isInView = useInView(wrapperRef, { amount: 0.5 });

  // Avisa o App quando a visibilidade mudar
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isInView);
    }
  }, [isInView, onVisibilityChange]);

  // Calcula altura para o efeito "Sticky Reveal"
  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    // 1. WRAPPER (O Espaço Vazio)
    <div
      ref={wrapperRef}
      className="relative w-full z-0"
      style={{ height: footerHeight }}
    >
      {/* 2. O FOOTER FIXO */}
      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full bg-slate-950 text-slate-300 -z-10 border-t border-white/5 overflow-hidden"
      >
        {/* Glow de Fundo (Aurora Boreal Sutil) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-25 pb-12 relative z-10">
          {/* ── CTA SUPERIOR (Mais elegante) ── */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 border-b border-white/5 pb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Inovação que <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  transforma vidas.
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Tecnologia a serviço da saúde pública. Conectando dados, pessoas
                e propósito.
              </p>
            </div>

            <a
              href="#"
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                Fale com a TI
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* ── GRID DE LINKS (Clean) ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            {/* Coluna 1: Marca (Ocupa 4 espaços) */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">CEJAM</h3>
                  <p className="text-xs uppercase tracking-widest text-cyan-500 font-bold">
                    Tecnologia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                <MapPin className="w-4 h-4 mt-1 text-slate-500 shrink-0" />
                <p>
                  Rua Dr. Lund, 41 - Liberdade <br /> São Paulo, SP - Brasil
                </p>
              </div>

              <div className="flex gap-4 pt-2">
                {[Github, Linkedin, Globe].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Colunas de Links (Ocupam o resto) */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((col) => (
                <div key={col.title}>
                  <h4 className="font-bold text-white mb-6">{col.title}</h4>
                  <ul className="space-y-4">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-1 h-1 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── RODAPÉ INFERIOR ── */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} CEJAM. Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                Feito com{" "}
                <Heart className="w-3 h-3 text-red-500 fill-red-500" /> pela
                Inovação
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
