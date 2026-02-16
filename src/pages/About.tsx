import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";

// ── DADOS DA LINHA DO TEMPO ──────────────────────────────
const timeline = [
  {
    year: "1991",
    title: "A Fundação",
    desc: "Nasce o CEJAM, fruto do idealismo do Dr. João Amorim, com a missão de transformar a saúde pública.",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1920&auto=format&fit=crop",
  },
  {
    year: "2001",
    title: "Expansão SP",
    desc: "Início da gestão de grandes unidades hospitalares e consolidação do modelo de gestão humanizada.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920&auto=format&fit=crop",
  },
  {
    year: "2015",
    title: "Era Digital",
    desc: "Implementação dos primeiros prontuários eletrônicos e modernização da infraestrutura de TI.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920&auto=format&fit=crop",
  },
  {
    year: "2020",
    title: "Resiliência",
    desc: "Linha de frente no combate à pandemia. Inauguração de hospitais de campanha e telemedicina.",
    img: "https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?q=80&w=1920&auto=format&fit=crop",
  },
  {
    year: "2024",
    title: "Inovação IA",
    desc: "Lançamento do ecossistema de Apps (CIA, CPM) e integração total de dados com Inteligência Artificial.",
    img: "https://images.pexels.com/photos/17483868/pexels-photo-17483868.jpeg?q=80&w=1920&auto=format&fit=crop",
  },
  {
    year: "Futuro",
    title: "Sem Fronteiras",
    desc: "Nosso compromisso continua: levar saúde de ponta para quem mais precisa, onde quer que estejam.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function About() {
  return (
    <div className="text-white">
      {/* ── HERO SECTION ── */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Animado */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/50 to-slate-950 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1920&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-40 animate-pulse-slow"
            alt="Medical Research"
          />
        </div>

        <div className="relative z-20 text-center max-w-5xl px-4 sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cyan-400 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4 block"
          >
            Nossa História
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500"
          >
            Cuidar é o nosso <br />
            <span className="text-cyan-500">Código Fonte.</span>
          </motion.h1>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 sm:bottom-10 text-slate-500 text-xs sm:text-sm uppercase tracking-widest"
        >
          Role para viajar no tempo
        </motion.div>
      </section>

      {/* ── HORIZONTAL SCROLL TIMELINE ── */}
      <HorizontalScrollCarousel />

      {/* ── STATS SECTION (Contadores) ── */}
      <section className="py-16 sm:py-24 lg:py-32 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 text-center">
          <StatItem rawValue={30} suffix="+" label="Anos de História" />
          <StatItem rawValue={23} suffix="k+" label="Colaboradores" />
          <StatItem rawValue={100} suffix="+" label="Unidades Geridas" />
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="min-h-[60vh] sm:h-[80vh] flex items-center justify-center relative py-16 sm:py-0">
        <div className="max-w-4xl px-4 sm:px-6 text-center space-y-5 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Não é apenas sobre medicina.
            <br />É sobre <span className="text-purple-500">Humanidade.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
            A tecnologia é a ferramenta, mas o toque humano é a cura. No CEJAM,
            inovamos para que nossos profissionais tenham mais tempo para o que
            realmente importa: olhar nos olhos do paciente.
          </p>
        </div>
      </section>
    </div>
  );
}

// ── COMPONENTE DO CARROSSEL HORIZONTAL ──────────────────────
const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const calculate = () => {
      if (carouselRef.current) {
        const scrollW = carouselRef.current.scrollWidth;
        const viewW = window.innerWidth;
        setMaxScroll(scrollW - viewW);
      }
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="bg-gradient-to-r from-transparent to-transparent backdrop-blur-xl sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={carouselRef}
          style={{ x }}
          className="flex gap-4 sm:gap-8 md:gap-12 pl-4 pr-4 sm:pl-12 sm:pr-24 md:pl-24 flex-nowrap"
        >
          {timeline.map((item) => (
            <TimelineCard key={item.year} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ── CARD INDIVIDUAL DA TIMELINE ─────────────────────────────
const TimelineCard = ({ item }: { item: (typeof timeline)[0] }) => {
  return (
    <div className="group relative h-[380px] w-[280px] sm:h-[420px] sm:w-[320px] md:h-[550px] md:w-[450px] overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 border border-white/10 flex-shrink-0 transition-transform hover:scale-[1.02] duration-500">
      {/* Imagem */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${item.img})` }}
      />

      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-90"></div>

      {/* Conteúdo */}
      <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end">
        <span className="text-4xl sm:text-5xl md:text-8xl font-bold text-white/10 group-hover:text-cyan-500/20 transition-colors duration-500 mb-auto">
          {item.year}
        </span>

        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
};

// ── COMPONENTE DE ESTATÍSTICA ─────────────────────
interface StatItemProps {
  rawValue: number;
  suffix?: string;
  label: string;
}

const StatItem = ({ rawValue, suffix = "", label }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, rawValue, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [isInView, rawValue, count]);

  return (
    <div ref={ref} className="space-y-2">
      <h3 className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-600 flex justify-center items-center tabular-nums">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </h3>
      <p className="text-cyan-500 font-bold tracking-widest uppercase text-xs sm:text-sm">
        {label}
      </p>
    </div>
  );
};
