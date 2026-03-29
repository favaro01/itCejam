import { useEffect, useRef } from "react";
import { Github, Linkedin, MapPin, Heart, Globe } from "lucide-react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Ecossistema",
    links: [
      { text: "Inteligência Artificial do CEJAM", href: "/sistemas" },
      { text: "App Palma da Mão", href: "/sistemas" },
      { text: "Medicsys", href: "/sistemas" },
      { text: "Meu RH", href: "/sistemas" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { text: "Sobre o a Inovação e Tecnologia", href: "/sobre" },
      { text: "Nossas Unidades", href: "/unidades" },
      { text: "Premiações", href: "/premios" },
    ],
  },
  {
    title: "Informações Úteis",
    links: [
      {
        text: "Gestão de Qualidade",
        href: "https://sites.google.com/cejamcloud.com.br/sgqcejam/administra%C3%A7%C3%A3o/inova%C3%A7%C3%A3o-e-tecnologia?authuser=1",
      },
      { text: "Medicsys", href: "https://cejam.medicsys.com.br/Login" },
      {
        text: "Fale Conosco",
        href: "https://www.cejamcloud.com.br/fale-com-a-gente",
      },
      {
        text: "CEJAM em Números",
        href: "https://drive.google.com/file/d/1SWgoQLM751z1ED21eLfI5VmKEEGM9aTN/view",
      },
    ],
  },
];

const socialLinks = [
  { Icon: Github, href: "https://github.com/", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/company/cejam/",
    label: "LinkedIn",
  },
  { Icon: Globe, href: "https://www.cejam.org.br/", label: "Site CEJAM" },
];

interface FooterProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export default function Footer({ onVisibilityChange }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);

  const isInView = useInView(footerRef, { amount: 0.25 });

  // Avisa o App quando a visibilidade mudar
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isInView);
    }
  }, [isInView, onVisibilityChange]);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-slate-950 text-slate-300 border-t border-white/5 overflow-x-hidden overflow-y-visible"
    >
      {/* Glow de Fundo (Aurora Boreal Sutil) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-75 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.06),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-25 pb-12 relative z-10">
        {/* ── CTA SUPERIOR (Mais elegante) ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Inovação que <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                transforma vidas.
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Tecnologia a serviço da saúde pública. Conectando dados, pessoas e
              propósito.
            </p>
          </div>
        </div>

        {/* ── GRID DE LINKS ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Coluna 1: Marca (Ocupa 4 espaços) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img
                className="w-10 object-contain"
                src="https://midias.medicsys.com.br/logoCejam.png"
                alt="CEJAM Tecnologia logo"
              />
              <div>
                <h3 className="font-logo text-xl font-bold text-white">
                  CEJAM
                </h3>
                <p className="text-xs uppercase tracking-widest text-cyan-500 font-bold">
                  Tecnologia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 mt-1 text-slate-500 shrink-0" />
              <p>
                Rua Dr. Lund, 41 - Liberdade <br /> Sao Paulo, SP - Brasil
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
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
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    const className =
                      "text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group";
                    return (
                      <li key={link.text}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                          >
                            <span className="w-1 h-1 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                            {link.text}
                          </a>
                        ) : (
                          <Link to={link.href} className={className}>
                            <span className="w-1 h-1 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all" />
                            {link.text}
                          </Link>
                        )}
                      </li>
                    );
                  })}
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
            <a
              href="https://www.cejam.org.br/politica-de-privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacidade
            </a>
            <a
              href="https://www.cejam.org.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Termos
            </a>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
              Feito com <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
              pela Equipe de Tecnologia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
