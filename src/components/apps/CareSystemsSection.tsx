import { motion } from "framer-motion";
import {
  FileText,
  TrendingUp,
  Activity,
  BookOpen,
  Link2,
  Clock,
  MessageCircle,
  Stethoscope,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── DADOS DOS SISTEMAS ASSISTENCIAIS ────────────────────────────────────
// Para adicionar ou alterar funcionalidades, modifique estes arrays:

const careSystemInfo = {
  title: "PEP CEJAM",
  fullTitle: "Prontuário Eletrônico do Paciente",
  description:
    "Ferramentas tecnológicas fundamentais para a gestão moderna das unidades de saúde gerenciadas pelo CEJAM. Permitem acesso rápido a indicadores detalhados de atendimento, dados epidemiológicos e protocolos para acompanhamento de doenças, além de integrar o acompanhamento do paciente em diferentes níveis de atenção, garantindo um histórico unificado de usuários e melhorando a comunicação entre as equipes de saúde e pacientes.",
  link: "https://it.cejam.org.br/sistemas-assistenciais",
  suppliers: ["MedicSys", "TOTVS"],
};

const careFeatures: CareFeature[] = [
  {
    id: "pep",
    name: "Prontuário Eletrônico",
    description:
      "Registro digital completo de todo o histórico clínico do paciente, desde consultas até exames e procedimentos.",
    Icon: FileText,
    color: "#06b6d4",
  },
  {
    id: "indicadores",
    name: "Indicadores de Atendimento",
    description:
      "Acesso rápido a indicadores detalhados de atendimento, produtividade e qualidade assistencial.",
    Icon: TrendingUp,
    color: "#10b981",
  },
  {
    id: "epidemiologicos",
    name: "Dados Epidemiológicos",
    description:
      "Monitoramento de dados epidemiológicos em tempo real para vigilância em saúde e tomada de decisão.",
    Icon: Activity,
    color: "#f43f5e",
  },
  {
    id: "protocolos",
    name: "Protocolos Clínicos",
    description:
      "Protocolos padronizados para acompanhamento de doenças crônicas e agudas com alertas automatizados.",
    Icon: BookOpen,
    color: "#8b5cf6",
  },
  {
    id: "integracao",
    name: "Integração Multinível",
    description:
      "Integração entre diferentes níveis de atenção (primária, secundária, terciária) para continuidade do cuidado.",
    Icon: Link2,
    color: "#3b82f6",
  },
  {
    id: "historico",
    name: "Histórico Unificado",
    description:
      "Histórico unificado de usuários compartilhado entre todas as unidades da rede CEJAM.",
    Icon: Clock,
    color: "#f59e0b",
  },
  {
    id: "comunicacao",
    name: "Comunicação Clínica",
    description:
      "Comunicação integrada entre equipes de saúde e pacientes para um cuidado mais coordenado.",
    Icon: MessageCircle,
    color: "#ec4899",
  },
  {
    id: "seguranca",
    name: "Segurança do Paciente",
    description:
      "Controles de segurança integrados com alertas de interações medicamentosas e alergias.",
    Icon: ShieldCheck,
    color: "#22c55e",
  },
];

// ── TIPOS ───────────────────────────────────────────────────────────────
interface CareFeature {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
  color: string;
}

// ── FEATURE CARD ────────────────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
}: {
  feature: CareFeature;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-white/2 p-6 h-full hover:border-white/15 transition-all duration-500">
        {/* Hover glow */}
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700"
          style={{ backgroundColor: feature.color }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${feature.color}12` }}
          >
            <feature.Icon
              className="w-6 h-6"
              style={{ color: feature.color }}
            />
          </div>

          {/* Content */}
          <h3 className="text-white font-semibold text-lg mb-2">
            {feature.name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── SEÇÃO PRINCIPAL ─────────────────────────────────────────────────────
export default function CareSystemsSection() {
  return (
    <section
      id="sistemas-assistenciais"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden scroll-mt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-125 h-125 bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-100 h-100 bg-rose-500/4 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.25em]">
              Cuidado ao Paciente
            </span>

            <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Sistemas{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-teal-400">
                Assistenciais
              </span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              {careSystemInfo.description}
            </p>
          </motion.div>
        </div>

        {/* PEP Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mb-16 sm:mb-20"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-linear-to-br from-white/4 to-white/1 p-8 sm:p-12 lg:p-16">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-100 h-100 bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              {/* Icon / Visual */}
              <div className="shrink-0">
                <div className="relative">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-linear-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20 flex items-center justify-center">
                    <Stethoscope className="w-14 h-14 sm:w-18 sm:h-18 text-cyan-400" />
                  </div>
                  <div className="absolute -inset-4 bg-cyan-500/8 rounded-4xl blur-xl -z-10" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-4">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    {careSystemInfo.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    Principal
                  </span>
                </div>

                <p className="text-slate-400 text-lg sm:text-xl font-medium mb-6">
                  {careSystemInfo.fullTitle}
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <a
                    href={careSystemInfo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold hover:bg-cyan-500/20 transition-colors"
                  >
                    Conhecer o PEP
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Suppliers */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-sm">
                      Fornecedores:
                    </span>
                    {careSystemInfo.suppliers.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-white/4 border border-white/8 text-slate-400 text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500 mb-8 text-center"
          >
            Funcionalidades Principais
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {careFeatures.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
