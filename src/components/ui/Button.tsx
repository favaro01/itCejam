import type { ReactNode, ButtonHTMLAttributes } from "react";

/* ── Variants ──────────────────────────────────────────────────────── */
type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 cursor-pointer select-none disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "glass text-slate-200 px-6 py-3 hover:border-blue-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
  ghost: "text-slate-400 px-4 py-2 hover:text-white hover:bg-slate-800/50",
};

/* ── Props ─────────────────────────────────────────────────────────── */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
