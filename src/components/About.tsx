import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Server, ShieldCheck, Network, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Server,
    value: "500+",
    label: "Servidores gerenciados",
  },
  {
    icon: ShieldCheck,
    value: "99.9%",
    label: "Uptime garantido",
  },
  {
    icon: Network,
    value: "100+",
    label: "Unidades conectadas",
  },
  {
    icon: Zap,
    value: "24/7",
    label: "Suporte contínuo",
  },
];

export default function About() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-headline", {
        scrollTrigger: {
          trigger: ".about-headline",
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
        y: 60,
        opacity: 0,
      });

      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
        },
        y: 40,
        opacity: 0,
      });

      gsap.from(".about-card", {
        scrollTrigger: {
          trigger: ".about-cards",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative px-6 py-32" id="about">
      {/* Glow decoration */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2">
        <div className="h-125 w-125 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-20 max-w-3xl">
          <p className="about-headline mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Quem somos
          </p>
          <h2 className="about-headline mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
            O núcleo tecnológico por trás da{" "}
            <span className="text-gradient">saúde pública</span>
          </h2>
          <p className="about-text text-lg leading-relaxed text-slate-400">
            O Departamento de TI da CEJAM é responsável por toda a
            infraestrutura digital que sustenta operações críticas de saúde.
            De data centers a endpoints, passando por cibersegurança,
            redes corporativas, sistemas hospitalares e automação — nós
            somos a engenharia silenciosa que garante o funcionamento
            ininterrupto de cada unidade.
          </p>
        </div>

        {/* ── Highlights ─────────────────────────────────────────── */}
        <div className="about-cards grid grid-cols-2 gap-4 sm:grid-cols-4">
          {highlights.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="about-card glass group flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-500 hover:border-blue-500/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20">
                <Icon className="h-6 w-6" />
              </div>
              <span className="mb-1 text-3xl font-extrabold text-white">
                {value}
              </span>
              <span className="text-sm text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
