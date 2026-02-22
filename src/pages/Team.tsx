import { useState } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Code2,
  Briefcase,
  Server,
  Headphones,
  Database,
  Users,
  Lock,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { line } from "framer-motion/client";

// ── DADOS 1: LIDERANÇA (Cinematic Lens) ──────────────────────
const leaders = [
  {
    id: 1,
    name: "Rodrigo Miranda",
    role: "Gerente de Inovação e Tecnologia",
    img: "src/assets/images/miranda.jpg",
    quote: "Excelência é um hábito, não um ato.",
    linkedin: "https://www.linkedin.com/in/rodrigomirandadev/",
  },
  {
    id: 2,
    name: "Rodrigo Silva",
    role: "Coord. de Sustentação e Infraestrutura",
    img: "src/assets/images/silva.jpg",
    quote: "Tecnologia deve servir à vida.",
    linkedin: "https://www.linkedin.com/in/rodrigo-silva-27568299/",
  },
  {
    id: 3,
    name: "Marcel Leme",
    role: "Coord. de Sistemas e Desenvolvimento",
    img: "src/assets/images/marcel.jpg",
    quote: "Construindo o futuro, linha por linha.",
    linkedin: "https://www.linkedin.com/in/marcel-leme/",
  },
  {
    id: 4,
    name: "Jefferson Nascimento",
    role: "Coord. de Soluções Corporativas",
    img: "src/assets/images/jefferson.jpg",
    quote: "Soluções inteligentes para desafios complexos.",
    linkedin:
      "https://www.linkedin.com/in/jefferson-carlos-da-silva-nascimento-9134627a/",
  },
];

// ── DADOS 2: COLABORADORES (Organograma) ─────────────────────
const departments = [
  {
    title: "Sustentação & Infraestrutura",
    color: "cyan",
    icon: ShieldCheck,
    teams: [
      {
        name: "Suporte Técnico",
        role: "N1",
        count: 4,
        icon: Headphones,
      },
      {
        name: "Infraestrutura TI",
        role: "Redes & Servidores",
        count: 2,
        icon: Server,
      },
      {
        name: "Central de Atendimento",
        role: "Service Desk",
        count: 2,
        icon: Users,
      },
      {
        name: "Segurança da Informação",
        role: "Cybersecurity",
        count: 1,
        icon: Lock,
      },
      { name: "Regionais", role: "Suporte Local", count: 6, icon: Globe },
    ],
  },
  {
    title: "Sistemas & Desenvolvimento",
    color: "purple",
    icon: Code2,
    teams: [
      {
        name: "Desenvolvimento",
        role: "Engenharia de Software e Mobile",
        count: 9,
        icon: Code2,
      },
      {
        name: "Sistemas Assistenciais",
        role: "Gestão Hospitalar",
        count: 3,
        icon: Database,
      },
      { name: "Sistemas Legados", role: "Manutenção", count: 1, icon: Server },
    ],
  },
  {
    title: "Soluções Corporativas",
    color: "emerald",
    icon: Briefcase,
    teams: [
      {
        name: "Especialista ERP",
        role: "Protheus / TOTVS",
        count: 1,
        icon: Database,
      },
      {
        name: "Apoio Administrativo",
        role: "Backoffice",
        count: 1,
        icon: Briefcase,
      },
    ],
  },
];

export default function Team() {
  const [activeLeaderId, setActiveLeaderId] = useState<number | null>(1);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* ── SEÇÃO 1: LIDERANÇA (CINEMATIC LENS) ── */}
      <section className="relative pt-32 pb-20 px-4 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-12 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Liderança Estratégica
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Quem Define o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Rumo
            </span>
          </h1>
        </div>

        {/* Galeria Expansível */}
        <div className="w-full max-w-7xl mx-auto h-[500px] md:h-[600px] flex flex-col md:flex-row gap-2">
          {leaders.map((leader) => (
            <LeaderCard
              key={leader.id}
              leader={leader}
              isActive={activeLeaderId === leader.id}
              onClick={() => setActiveLeaderId(leader.id)}
            />
          ))}
        </div>

        {/* Seta indicando rolagem */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">
            Conheça as Equipes
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* ── SEÇÃO 2: COLABORADORES (TECH MODULES) ── */}
      <section className="relative py-32 px-6 glass border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Estrutura <span className="text-slate-500">Operacional</span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg">
              A força motriz por trás da inovação. Nossas equipes
              multidisciplinares garantem que a tecnologia chegue na ponta.
            </p>
          </div>

          <div className="space-y-24">
            {departments.map((dept, deptIndex) => (
              <DepartmentRow key={dept.title} dept={dept} index={deptIndex} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── COMPONENTE: CARD DO LÍDER (Cinematic) ────────────────────
const LeaderCard = ({
  leader,
  isActive,
  onClick,
}: {
  leader: any;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      onHoverStart={() => onClick()}
      initial={false}
      animate={{ flex: isActive ? 3 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className={`relative h-full rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500 border border-white/5 ${
        isActive ? "grayscale-0" : "grayscale hover:grayscale-0"
      }`}
    >
      <img
        src={leader.img}
        alt={leader.name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80"}`}
      />

      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h3 className="text-2xl font-bold text-white uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 opacity-80 group-hover:opacity-100 transition-opacity">
            {leader.name}
          </h3>
        </div>
      )}

      <div
        className={`absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end transition-all duration-500 ${isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-10"}`}
      >
        <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider rounded-full w-fit mb-4">
          {leader.role}
        </span>
        <h2 className="text-4xl font-bold text-white mb-2 leading-tight">
          {leader.name}
        </h2>
        <p className="text-slate-300 text-lg italic border-l-2 border-cyan-500 pl-4 mb-6">
          "{leader.quote}"
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => window.open(leader.linkedin, "_blank")}
            type="button"
            className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── COMPONENTE: LINHA DE DEPARTAMENTO (Tech Modules) ─────────
const DepartmentRow = ({ dept, index }: { dept: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Título do Departamento */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className={`p-3 rounded-xl bg-${dept.color}-500/10 text-${dept.color}-400 border border-${dept.color}-500/20`}
        >
          <dept.icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white">{dept.title}</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      {/* Grid de Times */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dept.teams.map((team: any, i: number) => (
          <TeamModule
            key={team.name}
            team={team}
            color={dept.color}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ── COMPONENTE: MÓDULO DE TIME ───────────────────────────────
const TeamModule = ({
  team,
  color,
  index,
}: {
  team: any;
  color: string;
  index: number;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-slate-800/50 rounded-2xl p-6 border border-white/5 hover:border-white/10 overflow-hidden"
    >
      {/* Hover Glow Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Barra lateral colorida */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-${color}-500/50 group-hover:bg-${color}-400 transition-colors`}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <team.icon
            className={`w-8 h-8 text-slate-600 group-hover:text-${color}-400 transition-colors duration-300`}
          />
          <span className="text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
            0{index + 1}
          </span>
        </div>

        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
          {team.name}
        </h4>

        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 group-hover:text-slate-400">
          {team.role}
        </p>

        {/* Área de Colaboradores (Simulada visualmente) */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex -space-x-2">
            {[...Array(Math.min(4, team.count))].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center"
              >
                <Users className="w-3 h-3 text-slate-400" />
              </div>
            ))}
            {team.count > 4 && (
              <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-[8px] text-white">
                +{team.count - 4}
              </div>
            )}
          </div>
          <span className={`text-xs font-bold text-${color}-500`}>
            {team.count} Pessoas
          </span>
        </div>
      </div>
    </motion.div>
  );
};
