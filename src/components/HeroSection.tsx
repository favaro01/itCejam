import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown, Cpu, Shield, BarChart3 } from "lucide-react";
import { Button } from "./ui";

/* ── Floating badge component ──────────────────────────────────────── */
function FloatingBadge({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Cpu;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`floating-badge glass absolute flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 ${className}`}
    >
      <Icon className="h-4 w-4 text-cyan-400" />
      {label}
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-title span",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
      )
        .fromTo(
          ".hero-desc",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta > *",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
          "-=0.2",
        )
        .fromTo(
          ".floating-badge",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-grid-line",
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, stagger: 0.05, duration: 0.5 },
          "-=0.6",
        );

      // Floating animation for badges
      gsap.to(".floating-badge", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* ── Background grid ────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="hero-grid-line absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="hero-grid-line absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            style={{ top: `${(i + 1) * 16}%` }}
          />
        ))}
      </div>

      {/* ── Radial glow ────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-150 w-150 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0">
        <div className="h-100 w-100 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* ── Floating badges ────────────────────────────────────────── */}
      {/* <FloatingBadge
        icon={Cpu}
        label="Infraestrutura"
        className="left-[8%] top-[22%]"
      />
      <FloatingBadge
        icon={Shield}
        label="Cibersegurança"
        className="left-[10%] top-[40%]"
      />
      <FloatingBadge
        icon={BarChart3}
        label="Dados & Insights"
        className="left-[12%] bottom-[28%]"
      /> */}

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto max-w-4xl text-center flex flex-col items-center">
        <h1 className="font-display hero-title mb-4 sm:mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Processando</span>
          <span className="block">o Futuro da</span>
          <span className="text-gradient block">Saúde Pública</span>
        </h1>

        {/* <p className="font-body hero-desc mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
          Mais que gestão, somos a inteligência por trás de{" "}
          <span className="font-semibold text-slate-200">
            3.8 milhões de consultas/ano
          </span>
          . Conectamos{" "}
          <span className="font-semibold text-slate-200">
            23.000 profissionais
          </span>{" "}
          transformando dados brutos em bem-estar real para quem mais precisa.
        </p> */}

        <div className="hero-cta flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary">
            Conheça nossa equipe
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-slate-600">
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest">
            Role para saber mais
          </span>
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}
