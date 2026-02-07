import { Github, Linkedin, Mail, Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Soluções",
    links: [
      "Cloud & Virtualização",
      "Cibersegurança",
      "Redes & Telecom",
      "Service Desk",
    ],
  },
  {
    title: "Empresa",
    links: ["Sobre a CEJAM", "Trabalhe conosco", "Blog de TI", "Contato"],
  },
  {
    title: "Recursos",
    links: [
      "Documentação",
      "Status dos Sistemas",
      "Base de Conhecimento",
      "Políticas de TI",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/50 px-6 pt-20 pb-10">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
        <div className="h-50 w-150 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
                <span className="text-sm font-bold text-white">TI</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white">CEJAM</span>
                <span className="block text-[10px] uppercase tracking-widest text-slate-500">
                  Departamento de Tecnologia
                </span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-500">
              Transformando infraestrutura em inovação para a saúde pública.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-500 transition-all hover:border-blue-500/30 hover:text-blue-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{title}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800/50 pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} CEJAM — Departamento de Tecnologia.
            Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-600">
            Feito com <Heart className="h-3 w-3 text-rose-500" /> pelo time de
            TI
          </p>
        </div>
      </div>
    </footer>
  );
}
