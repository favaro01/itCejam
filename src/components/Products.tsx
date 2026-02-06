import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cloud,
  MonitorSmartphone,
  Database,
  Wifi,
  Lock,
  Headphones,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    icon: Cloud,
    title: "Cloud & Virtualização",
    tag: "Infraestrutura",
    description:
      "Ambientes cloud híbridos com VMware, Azure e AWS. Orquestração de containers e alta disponibilidade.",
    tech: ["VMware", "Azure", "Docker", "Kubernetes"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Lock,
    title: "Cibersegurança",
    tag: "Segurança",
    description:
      "Firewalls de próxima geração, SIEM, SOC 24/7 e conformidade LGPD para dados sensíveis de saúde.",
    tech: ["FortiGate", "SIEM", "LGPD", "Zero Trust"],
    gradient: "from-violet-500 to-blue-500",
  },
  {
    icon: Database,
    title: "Data Center & Storage",
    tag: "Infraestrutura",
    description:
      "Gestão de data centers Tier III com redundância N+1, SAN/NAS de alta performance e backup corporativo.",
    tech: ["NetApp", "Veeam", "HPE", "Dell EMC"],
    gradient: "from-emerald-500 to-cyan-400",
  },
  {
    icon: Wifi,
    title: "Redes & Telecom",
    tag: "Conectividade",
    description:
      "Redes SD-WAN conectando 100+ unidades, Wi-Fi 6 corporativo e links dedicados com failover automático.",
    tech: ["Cisco", "SD-WAN", "Wi-Fi 6", "MPLS"],
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: MonitorSmartphone,
    title: "Sistemas & Aplicações",
    tag: "Software",
    description:
      "Desenvolvimento e manutenção de sistemas hospitalares, portais internos e integrações HL7/FHIR.",
    tech: ["React", "Node.js", "HL7", ".NET"],
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Headphones,
    title: "Service Desk",
    tag: "Suporte",
    description:
      "Central de atendimento de 3 níveis com SLA rigoroso, atendendo milhares de chamados mensais.",
    tech: ["ITIL", "ITSM", "N1/N2/N3", "SLA"],
    gradient: "from-rose-400 to-violet-500",
  },
];

export default function Products() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".products-header > *", {
        scrollTrigger: {
          trigger: ".products-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".products-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative px-6 py-32" id="products">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
        <div className="h-150 w-200 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="products-header mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Soluções & Serviços
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            Nossa <span className="text-gradient">stack tecnológica</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Serviços end-to-end que cobrem toda a cadeia de valor tecnológico da
            organização.
          </p>
        </div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        <div className="products-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(
            ({ icon: Icon, title, tag, description, tech, gradient }) => (
              <div
                key={title}
                className="product-card group glass relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-blue-500/30 hover:scale-[1.02]"
              >
                {/* Top glow on hover */}
                <div
                  className={`pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-linear-to-br ${gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                />

                <div className="relative">
                  {/* Tag */}
                  <span className="mb-4 inline-block rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-400">
                    {tag}
                  </span>

                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${gradient} p-px`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-400">
                    {description}
                  </p>

                  {/* Tech tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-slate-800/80 px-2 py-0.5 font-mono text-xs text-slate-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="flex items-center gap-1 text-sm font-medium text-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Saiba mais <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
