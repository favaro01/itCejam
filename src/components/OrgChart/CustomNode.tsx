import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export interface OrgNodeData {
  label: string;
  role: string;
  avatar?: string;
  department?: string;
  color?: string;
  [key: string]: unknown;
}

function CustomNode({ data }: NodeProps) {
  const { label, role, department, color = "blue" } = data as OrgNodeData;

  const colorMap: Record<
    string,
    { border: string; bg: string; text: string; dot: string }
  > = {
    blue: {
      border: "border-blue-500/40",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      dot: "bg-blue-400",
    },
    violet: {
      border: "border-violet-500/40",
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      dot: "bg-violet-400",
    },
    cyan: {
      border: "border-cyan-500/40",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      dot: "bg-cyan-400",
    },
    emerald: {
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    amber: {
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      dot: "bg-amber-400",
    },
    rose: {
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      text: "text-rose-400",
      dot: "bg-rose-400",
    },
  };

  const c = colorMap[color] ?? colorMap.blue;

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="bg-slate-600! border-slate-500! w-2! h-2!"
      />
      <div
        className={`
          min-w-36 sm:min-w-45 rounded-lg sm:rounded-xl border ${c.border}
          bg-slate-900/90 backdrop-blur-sm p-3 sm:p-4
          shadow-lg transition-all duration-300
          hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
        `}
      >
        {/* Dept tag */}
        {department && (
          <span
            className={`mb-2 inline-block rounded-full ${c.bg} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${c.text}`}
          >
            {department}
          </span>
        )}

        {/* Name */}
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${c.dot}`} />
          <span className="text-sm font-semibold text-white">
            {label as string}
          </span>
        </div>

        {/* Role */}
        <p className="mt-1 pl-4 text-xs text-slate-500">{role as string}</p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="bg-slate-600! border-slate-500! w-2! h-2!"
      />
    </>
  );
}

export default memo(CustomNode);
