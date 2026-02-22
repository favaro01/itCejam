import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, ArrowUpRight, Clock } from "lucide-react"; // Instale lucide-react se não tiver

// ── DADOS MOCKADOS (Exemplo) ─────────────────────────────────
const units = [
  {
    id: 1,
    name: "Hospital Municipal M'Boi Mirim",
    type: "Hospital",
    address: "Estrada do M'Boi Mirim, 5203 - Jd. Ângela",
    status: "Aberto 24h",
    img: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=format&fit=crop&q=80&w=800",
    color: "border-cyan-500",
  },
  {
    id: 2,
    name: "UPA Campo Limpo",
    type: "UPA",
    address: "Rua Tereza Mouco de Oliveira, 121",
    status: "Aberto 24h",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    color: "border-orange-500",
  },
  {
    id: 3,
    name: "UBS Jardim Paranapanema",
    type: "UBS",
    address: "Rua Pietro Donà, 180",
    status: "07h às 19h",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    color: "border-emerald-500",
  },
  {
    id: 4,
    name: "AMA Especialidades Capão",
    type: "AMA",
    address: "Av. Ellis Maas, 700",
    status: "07h às 19h",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    color: "border-purple-500",
  },
  {
    id: 5,
    name: "Hospital Evandro Freire",
    type: "Hospital",
    address: "Ilha do Governador, RJ",
    status: "Aberto 24h",
    img: "https://images.pexels.com/photos/11782003/pexels-photo-11782003.jpeg?auto=format&fit=crop&q=80&w=800",
    color: "border-cyan-500",
  },
  {
    id: 6,
    name: "CER IV M'Boi Mirim",
    type: "CER",
    address: "Av. Inácio Dias da Silva, s/n",
    status: "07h às 18h",
    img: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800",
    color: "border-pink-500",
  },
];

const categories = [
  units[0].type,
  units[1].type,
  units[2].type,
  units[3].type,
  "Todos",
];

export default function Units() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  // Lógica de Filtragem (Categoria + Busca Texto)
  const filteredUnits = units.filter((unit) => {
    const matchesCategory = filter === "Todos" || unit.type === filter;
    const matchesSearch = unit.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen text-white pb-32">
      {/* ── HEADER COM SEARCH ── */}
      <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl mx-auto space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Nossa Rede de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Cuidado Integrado
            </span>
          </h1>

          {/* BARRA DE BUSCA */}
          <div className="relative group max-w-xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-25 group-hover:opacity-75 blur transition duration-500"></div>
            <div className="relative flex items-center bg-slate-900 rounded-full px-6 py-4 border border-white/10">
              <Search className="text-slate-400 w-6 h-6 mr-4" />
              <input
                type="text"
                placeholder="Busque por nome da unidade..."
                className="bg-transparent border-none outline-none text-white w-full placeholder:text-slate-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FILTROS (PILL TABS) ── */}
      <div className="flex flex-wrap justify-center gap-3 px-6 mb-16 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              filter === cat
                ? "text-white"
                : "text-slate-500 hover:text-white bg-slate-900/50 hover:bg-slate-800"
            }`}
          >
            {filter === cat && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-cyan-600 rounded-full"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {cat}
          </button>
        ))}
      </div>

      {/* ── GRID VIVO (LAYOUT GROUP) ── */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredUnits.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredUnits.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p>Nenhuma unidade encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── COMPONENTE CARD ──────────────────────────────────────────
const UnitCard = ({ unit }: { unit: (typeof units)[0] }) => {
  return (
    <motion.div
      layout // A MÁGICA: Faz o card deslizar para a nova posição
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }} // Levita ao passar o mouse
      className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
    >
      {/* Imagem com Zoom no Hover */}
      <div className="h-64 overflow-hidden relative">
        <div
          className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur border-l-4 ${unit.color} text-white`}
        >
          {unit.type}
        </div>

        <img
          src={unit.img}
          alt={unit.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      {/* Conteúdo */}
      <div className="p-8 relative">
        {/* Efeito Glow na borda inferior do conteúdo */}
        <div
          className={`absolute top-0 left-8 w-12 h-1 bg-gradient-to-r from-transparent via-${unit.color.split("-")[1]}-500 to-transparent opacity-50`}
        ></div>

        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
          {unit.name}
        </h3>

        <div className="space-y-3 mt-4 text-slate-400 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <span>{unit.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-slate-600 shrink-0" />
            <span className="text-emerald-400 font-medium">{unit.status}</span>
          </div>
        </div>

        {/* Botão Discreto */}
        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors">
            Ver Detalhes
          </span>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
