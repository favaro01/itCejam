import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Database,
  BarChart3,
  FileText,
  DollarSign,
  Package,
  Truck,
  TrendingUp,
  Shield,
  MessageSquare,
  ChevronDown,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── DADOS DOS SISTEMAS ADMINISTRATIVOS ──────────────────────────────────
// Para adicionar ou alterar sistemas/módulos, modifique este array:
const adminSubsystems: AdminSubsystem[] = [
  {
    id: "erp-totvs",
    name: "ERP TOTVS",
    subtitle: "Enterprise Resource Planning",
    description:
      "Sistema integrado de gestão empresarial que permite a integração entre setores, facilitando a tomada de decisão, aumentando a eficiência do fluxo de trabalho e melhorando a precisão dos dados e informações. Com a ERP, a gestão do CEJAM é mais integrada e eficiente.",
    Icon: Building2,
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
    modules: [
      { name: "Gestão Financeira", Icon: DollarSign },
      { name: "Gestão de Contratos", Icon: FileText },
      { name: "Patrimônio", Icon: Package },
      { name: "Compras e Suprimentos", Icon: Layers },
      { name: "Gestão de Pessoas", Icon: Building2 },
      { name: "Contabilidade", Icon: BarChart3 },
    ],
  },
  {
    id: "icejam",
    name: "iCEJAM",
    subtitle: "Sistema Legado",
    description:
      "Sistema institucional do CEJAM que suporta processos administrativos essenciais. Utilizado para gestão financeira, contratos, patrimônio, prestação de contas e logística de transporte entre unidades.",
    Icon: Database,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    modules: [
      { name: "Gestão de Contratos", Icon: FileText },
      { name: "Gestão Financeira", Icon: DollarSign },
      { name: "Patrimônio", Icon: Package },
      { name: "Prestação de Contas", Icon: BarChart3 },
      { name: "Transporte", Icon: Truck },
    ],
  },
  {
    id: "sis-cejam",
    name: "SIS CEJAM",
    subtitle: "Sistema de Indicadores e Performance",
    description:
      "Plataforma de indicadores e desempenho institucional. Concentra ferramentas de avaliação, monitoramento epidemiológico e gestão estratégica de pessoas.",
    Icon: BarChart3,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
    modules: [
      { name: "Desempenho", Icon: TrendingUp },
      { name: "Vigimaster", Icon: Shield },
      { name: "GEP", Icon: BarChart3 },
      { name: "Avaliação de Feedback", Icon: MessageSquare },
    ],
  },
];

// ── TIPOS ───────────────────────────────────────────────────────────────
interface AdminModule {
  name: string;
  Icon: LucideIcon;
}

interface AdminSubsystem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  gradient: string;
  modules: AdminModule[];
}

// ── SUBSYSTEM CARD ──────────────────────────────────────────────────────
function SubsystemCard({ sub, index }: { sub: AdminSubsystem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-3xl border transition-all duration-500
          ${isOpen ? "border-white/15 bg-white/4" : "border-white/6 bg-white/1.5 hover:border-white/10"}`}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 0% 0%, ${sub.color}0a, transparent 50%)`,
          }}
        />

        {/* Header - always visible */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-full text-left p-6 sm:p-8 flex items-start gap-5 cursor-pointer"
        >
          {/* Icon container */}
          <div
            className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${sub.color}15` }}
          >
            <sub.Icon
              className="w-7 h-7 sm:w-8 sm:h-8"
              style={{ color: sub.color }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-white font-bold text-xl sm:text-2xl">
                {sub.name}
              </h3>
              <span
                className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${sub.color}15`,
                  color: sub.color,
                }}
              >
                {sub.modules.length} módulos
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">
              {sub.subtitle}
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-2">
              {sub.description}
            </p>
          </div>

          <ChevronDown
            className={`shrink-0 w-5 h-5 text-slate-500 transition-transform duration-300
              ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Expandable modules */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="border-t border-white/6 pt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600 mb-4">
                    Módulos do Sistema
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {sub.modules.map((mod, i) => (
                      <motion.div
                        key={mod.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/4 hover:border-white/10 transition-colors"
                      >
                        <mod.Icon
                          className="w-4 h-4 shrink-0"
                          style={{ color: sub.color }}
                        />
                        <span className="text-slate-300 text-sm font-medium">
                          {mod.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── SEÇÃO PRINCIPAL ─────────────────────────────────────────────────────
export default function AdminSystemsSection() {
  return (
    <section
      id="sistemas-administrativos"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden scroll-mt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-150 h-150 bg-blue-500/4 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-amber-500/3 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20 space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.25em]">
            Gestão Corporativa
          </span>

          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Sistemas{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              Administrativos
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Plataformas que sustentam a operação corporativa do CEJAM,
            integrando finanças, patrimônio, contratos e indicadores de
            desempenho.
          </p>
        </motion.div>

        {/* Subsystems */}
        <div className="space-y-4 sm:space-y-6">
          {adminSubsystems.map((sub, i) => (
            <SubsystemCard key={sub.id} sub={sub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
