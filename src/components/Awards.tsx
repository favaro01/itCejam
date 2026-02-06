import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Trophy, Star, Medal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    year: "2025",
    icon: Trophy,
    title: "Excelência em Transformação Digital",
    org: "ANAHP — Associação Nacional de Hospitais Privados",
    description:
      "Reconhecimento pela implementação do prontuário eletrônico unificado em mais de 80 unidades.",
    color: "from-amber-400 to-amber-600",
    glow: "bg-amber-500/20",
  },
  {
    year: "2024",
    icon: Award,
    title: "Melhor Infraestrutura de TI em Saúde",
    org: "HIMSS — Healthcare IT Summit Brasil",
    description:
      "Premiação pela arquitetura de alta disponibilidade com zero downtime em serviços críticos.",
    color: "from-blue-400 to-cyan-400",
    glow: "bg-blue-500/20",
  },
  {
    year: "2024",
    icon: Star,
    title: "Inovação em Cibersegurança",
    org: "Cyber Security Summit",
    description:
      "Destaque pela implementação de modelo Zero Trust e SOC 24/7 para proteção de dados de saúde.",
    color: "from-violet-400 to-blue-400",
    glow: "bg-violet-500/20",
  },
  {
    year: "2023",
    icon: Medal,
    title: "Case de Sucesso em Cloud Migration",
    org: "Microsoft Partner Awards",
    description:
      "Migração de 200+ aplicações para cloud híbrida com redução de 40% em custos operacionais.",
    color: "from-cyan-400 to-emerald-400",
    glow: "bg-cyan-500/20",
  },
];

export default function Awards() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* ── Header reveal ───────────────────────────────────────── */
      gsap.from(".awards-header > *", {
        scrollTrigger: { trigger: ".awards-header", start: "top 85%" },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      /* ── Card-by-card snap scroll ────────────────────────────── */
      const cards = gsap.utils.toArray<HTMLElement>(".award-card");
      const total = cards.length;
      if (total === 0) return;

      // Each card gets one "page" of scroll distance
      const scrollPerCard = window.innerHeight * 0.8;
      const totalScrollDistance = scrollPerCard * total;

      // Build a timeline that transitions one card at a time
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${totalScrollDistance}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / total,
            duration: { min: 0.2, max: 0.4 },
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        const shimmer = card.querySelector(".shimmer-line");

        if (i === 0) {
          // First card: already visible, just animate shimmer
          tl.fromTo(
            shimmer,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.15, ease: "power2.inOut" },
            0
          );
        }

        if (i > 0) {
          // Exit previous card
          tl.to(cards[i - 1], {
            opacity: 0,
            scale: 0.85,
            y: -40,
            filter: "blur(8px)",
            duration: 0.4,
            ease: "power2.in",
          });

          // Enter current card
          tl.fromTo(
            card,
            { opacity: 0, scale: 0.85, y: 60, filter: "blur(8px)" },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.4,
              ease: "power2.out",
            },
            ">-0.15" // slight overlap for smooth crossfade
          );

          // Shimmer line
          tl.fromTo(
            shimmer,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.15, ease: "power2.inOut" },
            ">-0.1"
          );
        }
      });

      /* ── Counter / indicator dots ────────────────────────────── */
      const dots = gsap.utils.toArray<HTMLElement>(".award-dot");
      const counterEl = document.querySelector(".awards-counter-current");

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: () => `+=${totalScrollDistance}`,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (total - 1));
          dots.forEach((dot, di) => {
            dot.classList.toggle("!bg-white", di === idx);
            dot.classList.toggle("!scale-125", di === idx);
          });
          if (counterEl) counterEl.textContent = String(idx + 1).padStart(2, "0");
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative overflow-hidden"
      id="awards"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-125 w-125 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      {/* ── Pinned viewport ───────────────────────────────────── */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 lg:px-16">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="awards-header mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-400">
            Reconhecimentos
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            Prêmios &{" "}
            <span className="text-gradient">Conquistas</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            O trabalho do nosso time é reconhecido nacional e internacionalmente.
          </p>
        </div>

        {/* ── Card stage (stacked, one visible at a time) ──────── */}
        <div className="relative mx-auto grid w-full max-w-lg place-items-center">
          {awards.map(
            ({ year, icon: Icon, title, org, description, color, glow }, i) => (
              <div
                key={title}
                className="award-card col-start-1 row-start-1 group relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900/60 backdrop-blur-md transition-colors duration-500 hover:border-blue-500/30"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {/* top glow accent */}
                <div
                  className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full ${glow} blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* shimmer line at top */}
                <div
                  className={`shimmer-line h-0.5 origin-left scale-x-0 bg-linear-to-r ${color}`}
                />

                <div className="relative flex flex-1 flex-col p-8 sm:p-10">
                  {/* Icon + Year */}
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${color} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full border border-slate-700/60 bg-slate-800/80 px-4 py-1 font-mono text-sm font-semibold text-slate-300">
                      {year}
                    </span>
                  </div>

                  {/* Body */}
                  <h3 className="mb-2 text-xl font-bold leading-snug text-white sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {org}
                  </p>
                  <p className="mt-auto text-sm leading-relaxed text-slate-400 sm:text-base">
                    {description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* ── Bottom indicators ───────────────────────────────────── */}
        <div className="mt-10 flex items-center gap-6">
          {/* Counter */}
          <span className="font-mono text-sm text-slate-500">
            <span className="awards-counter-current text-white">01</span>
            {" / "}
            {String(awards.length).padStart(2, "0")}
          </span>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {awards.map((_, i) => (
              <div
                key={i}
                className={`award-dot h-2 w-2 rounded-full transition-all duration-300 ${
                  i === 0 ? "bg-white scale-125" : "bg-slate-600"
                }`}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <span className="text-xs uppercase tracking-widest text-slate-600">
            Scroll ↓
          </span>
        </div>
      </div>
    </section>
  );
}
