import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  Target,
  Heart,
  Rocket,
} from "lucide-react";
import { Card } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Lightbulb,
    title: "Inovação Contínua",
    description:
      "Buscamos constantemente novas tecnologias e metodologias para elevar a qualidade dos serviços de saúde.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Segurança em Primeiro Lugar",
    description:
      "Protegemos dados sensíveis e infraestrutura crítica com padrões de cibersegurança de nível enterprise.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Colaboração",
    description:
      "Trabalhamos juntos, integrando equipes multidisciplinares para alcançar resultados extraordinários.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Target,
    title: "Excelência Operacional",
    description:
      "Mantemos 99.9% de uptime com monitoramento proativo e resposta ágil a incidentes.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Heart,
    title: "Propósito Social",
    description:
      "Cada linha de código e cada servidor configurado tem um impacto direto na vida de milhares de pacientes.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    icon: Rocket,
    title: "Agilidade",
    description:
      "Metodologias ágeis e automação CI/CD para entregas rápidas e confiáveis.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

export default function Values() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".value-header > *", {
        scrollTrigger: {
          trigger: ".value-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: ".value-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative px-6 py-32" id="values">
      <div className="pointer-events-none absolute right-0 top-0">
        <div className="h-125 w-125 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="value-header mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-400">
            Nossos Valores
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            O que nos <span className="text-gradient-violet">move</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Princípios que guiam cada decisão técnica e estratégica do departamento.
          </p>
        </div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        <div className="value-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, description, color, bg }) => (
            <Card key={title} className="value-card group" glow="none">
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${color} transition-transform duration-500 group-hover:scale-110`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
