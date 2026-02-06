import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Sobre", href: "#about" },
  { label: "Valores", href: "#values" },
  { label: "Soluções", href: "#products" },
  { label: "Números", href: "#stats" },
  { label: "Prêmios", href: "#awards" },
  { label: "Time", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={` w-4xl mx-auto fixed top-2 rounded-3xl left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
            <img className="w-10 object-contain" src="https://midias.medicsys.com.br/logoCejam.png"/>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-white">CEJAM</span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-500">
              Tecnologia
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] md:inline-block"
        >
          Contato
        </a>

        {/* Mobile toggle */}
        <button
          className="text-slate-400 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-4 mt-2 rounded-xl p-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
