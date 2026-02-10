import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Sobre", href: "about" },
  { label: "Unidades", href: "units" },
  { label: "Prêmios", href: "awards" },
  { label: "Time", href: "team" },
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
      className={`mx-auto fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-700 ease-in-out ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between px-6 rounded-3xl transition-all duration-700 ease-in-out ${
          scrolled
            ? "max-w-5xl glass py-3 shadow-lg shadow-black/20"
            : "max-w-7xl bg-transparent py-5"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="w-10 object-contain"
            src="https://midias.medicsys.com.br/logoCejam.png"
            alt="CEJAM Tecnologia logo"
          />
          <div className="hidden sm:block">
            <span className="font-logo text-sm font-bold text-white">
              CEJAM
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-slate-500">
              Inovação & Tecnologia
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="apps"
            className="hidden rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] md:inline-block"
          >
            Aplicativos
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-slate-400 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-2 sm:mx-4 mt-2 rounded-xl p-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="apps"
                onClick={() => setOpen(false)}
                className="mt-2 block w-full rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Aplicativos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
