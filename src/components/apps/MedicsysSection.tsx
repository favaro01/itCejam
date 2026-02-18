import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  DollarSign,
  Headphones,
  ShieldAlert,
  LifeBuoy,
  Baby,
  ClipboardCheck,
  Eye,
  Users,
  HeartHandshake,
  Award,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── DADOS DOS MÓDULOS MEDICSYS ──────────────────────────────────────────
// Para adicionar ou alterar módulos, modifique este array:
const medicsysModules: MedicsysModule[] = [
  {
    id: "acolhimento",
    name: "Acolhimento",
    description:
      "Gestão do fluxo de acolhimento dos pacientes, classificação de risco e triagem inteligente.",
    Icon: Heart,
    color: "#f43f5e",
    span: "md:col-span-2",
  },
  {
    id: "custos",
    name: "App de Custos",
    description:
      "Controle e análise de custos operacionais por unidade, setor e procedimento.",
    Icon: DollarSign,
    color: "#22c55e",
  },
  {
    id: "concierge",
    name: "Concierge",
    description:
      "Atendimento diferenciado ao paciente com acompanhamento personalizado durante a internação.",
    Icon: Headphones,
    color: "#8b5cf6",
  },
  {
    id: "eventos-adversos",
    name: "Eventos Adversos",
    description:
      "Registro, monitoramento e análise de eventos adversos para segurança do paciente.",
    Icon: ShieldAlert,
    color: "#ef4444",
    span: "md:col-span-2",
  },
  {
    id: "chamados",
    name: "Gestão de Chamados",
    description:
      "Central de chamados para manutenção, TI e serviços gerais com acompanhamento em tempo real.",
    Icon: LifeBuoy,
    color: "#3b82f6",
  },
  {
    id: "livro-parto",
    name: "Livro de Parto",
    description:
      "Registro digital completo de partos, incluindo dados da mãe, recém-nascido e procedimentos.",
    Icon: Baby,
    color: "#ec4899",
  },
  {
    id: "pesquisa-satisfacao",
    name: "Pesquisa de Satisfação / SAU",
    description:
      "Coleta e análise de feedback dos pacientes e acompanhantes sobre o atendimento.",
    Icon: ClipboardCheck,
    color: "#f59e0b",
  },
  {
    id: "horus",
    name: "HORUS",
    description:
      "Sistema de vigilância e monitoramento de indicadores de saúde em tempo real.",
    Icon: Eye,
    color: "#06b6d4",
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    id: "gestao-participativa",
    name: "Gestão Participativa",
    description:
      "Plataforma de gestão colaborativa envolvendo equipes multidisciplinares nas decisões.",
    Icon: Users,
    color: "#a855f7",
  },
  {
    id: "remami",
    name: "Remami",
    description:
      "Rede de apoio ao aleitamento materno com protocolos e acompanhamento especializado.",
    Icon: HeartHandshake,
    color: "#f472b6",
  },
  {
    id: "selos-certificacoes",
    name: "Selos e Certificações",
    description:
      "Gestão de processos de acreditação, selos de qualidade e certificações institucionais.",
    Icon: Award,
    color: "#eab308",
  },
];

// ── INFO GERAL DO MEDICSYS ──────────────────────────────────────────────
const medicsysInfo = {
  title: "MedicSys",
  subtitle: "Plataforma Integrada de Gestão Hospitalar",
  description:
    "O MedicSys é o coração digital das unidades de saúde gerenciadas pelo CEJAM. Uma plataforma modular e integrada que conecta todos os processos — do acolhimento à gestão de qualidade — em um único ecossistema inteligente.",
  highlights: [
    { label: "Módulos Ativos", value: `${medicsysModules.length}` },
    { label: "Unidades Conectadas", value: "100+" },
    { label: "Usuários Diários", value: "5.000+" },
  ],
  link: "https://cejam.medicsys.com.br/Login",
  docsLink: "https://wiki.medicsys.com.br",
};

// ── TIPOS ───────────────────────────────────────────────────────────────
interface MedicsysModule {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  span?: string;
}

// ── MODULE CARD ─────────────────────────────────────────────────────────
function ModuleCard({
  mod,
  index,
  isSelected,
  onSelect,
}: {
  mod: MedicsysModule;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative overflow-hidden rounded-2xl border text-left
        p-5 sm:p-6 transition-all duration-500 cursor-pointer
        ${mod.span || ""}
        ${
          isSelected
            ? "border-white/20 bg-white/[0.06] scale-[1.02]"
            : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
        }`}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${mod.color}08, transparent 70%)`,
        }}
      />

      {/* Top bar accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${mod.color}, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${mod.color}15` }}
          >
            <mod.Icon
              className="w-5 h-5 transition-colors duration-300"
              style={{ color: mod.color }}
            />
          </div>
          <ChevronRight
            className={`w-4 h-4 text-slate-600 transition-all duration-300
              ${isSelected ? "rotate-90 text-white/40" : "group-hover:text-white/30 group-hover:translate-x-0.5"}`}
          />
        </div>
        <h3 className="text-white font-semibold text-base sm:text-lg mb-1.5 transition-colors">
          {mod.name}
        </h3>

        <AnimatePresence>
          {isSelected && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-slate-400 text-sm leading-relaxed overflow-hidden"
            >
              {mod.description}
            </motion.p>
          )}
        </AnimatePresence>

        {!isSelected && (
          <p className="text-slate-500 text-xs line-clamp-1">
            {mod.description}
          </p>
        )}
      </div>
    </motion.button>
  );
}

// ── SEÇÃO PRINCIPAL ─────────────────────────────────────────────────────
export default function MedicsysSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="medicsys"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden scroll-mt-20"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-500/[0.07] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 sm:mb-20">
          {/* Left: Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-[0.25em]">
              Sistema Integrado
            </span>

            <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-none">
              Medic
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Sys
              </span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
              {medicsysInfo.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={medicsysInfo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-semibold hover:bg-teal-500/20 transition-colors"
              >
                Acessar MedicSys
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={medicsysInfo.docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-slate-400 text-sm font-semibold hover:border-white/20 hover:text-white transition-colors"
              >
                Manuais
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-end"
          >
            <div className="grid grid-cols-3 gap-4 w-full">
              {medicsysInfo.highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 text-center"
                >
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${["#14b8a6", "#06b6d4", "#0ea5e9"][i]}, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                      {h.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider font-medium">
                      {h.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Module Grid - Bento Layout */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-8"
          >
            Módulos ─ Clique para expandir
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {medicsysModules.map((mod, i) => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                index={i}
                isSelected={selectedId === mod.id}
                onSelect={() =>
                  setSelectedId(selectedId === mod.id ? null : mod.id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
