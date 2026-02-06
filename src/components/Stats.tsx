import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12000, suffix: "+", label: "Chamados/mês atendidos", decimals: 0 },
  { value: 99.9, suffix: "%", label: "Disponibilidade de sistemas", decimals: 1 },
  { value: 150, suffix: "+", label: "Profissionais de TI", decimals: 0 },
  { value: 100, suffix: "+", label: "Unidades conectadas", decimals: 0 },
  { value: 2, suffix: "PB+", label: "Dados gerenciados", decimals: 0 },
  { value: 50, suffix: "+", label: "Projetos ativos", decimals: 0 },
];

export default function Stats() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Header */
      gsap.from(".stats-header > *", {
        scrollTrigger: { trigger: ".stats-header", start: "top 85%" },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      /* Stat counters */
      const counters = container.current!.querySelectorAll<HTMLElement>(".stat-value");
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.target ?? "0");
        const decimals = parseInt(el.dataset.decimals ?? "0", 10);
        const suffix = el.dataset.suffix ?? "";

        gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: decimals === 0 ? { innerText: 1 } : undefined,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            onUpdate() {
              const currentVal = parseFloat(el.innerText);
              el.innerText =
                (decimals > 0
                  ? currentVal.toFixed(decimals)
                  : Math.round(currentVal).toLocaleString("pt-BR")) + suffix;
            },
          }
        );
      });

      gsap.from(".stat-card", {
        scrollTrigger: { trigger: ".stats-grid", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative px-6 py-32" id="stats">
      {/* Decorative full-width divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* Glow */}
      <div className="pointer-events-none absolute right-0 bottom-0">
        <div className="h-100 w-100 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="stats-header mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Em Números
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            Impacto em <span className="text-gradient">escala</span>
          </h2>
        </div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        <div className="stats-grid grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map(({ value, suffix, label, decimals }) => (
            <div
              key={label}
              className="stat-card glass flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-500 hover:border-cyan-500/30"
            >
              <span
                className="stat-value mb-1 text-3xl font-extrabold text-gradient"
                data-target={value}
                data-suffix={suffix}
                data-decimals={decimals}
              >
                0{suffix}
              </span>
              <span className="text-xs leading-tight text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
