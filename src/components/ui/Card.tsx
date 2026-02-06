import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: "blue" | "violet" | "cyan" | "none";
  hover?: boolean;
}

const glowClasses = {
  blue: "glow-blue",
  violet: "glow-violet",
  cyan: "glow-cyan",
  none: "",
};

export default function Card({
  children,
  className = "",
  glow = "none",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        glass rounded-2xl p-6
        ${glowClasses[glow]}
        ${hover ? "transition-all duration-500 hover:scale-[1.02] hover:border-blue-500/30" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
