import { useRef, useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomNode from "./CustomNode";
import type { OrgNodeData } from "./CustomNode";

gsap.registerPlugin(ScrollTrigger);

/* ── Nodes ─────────────────────────────────────────────────────────── */
const initialNodes: Node<OrgNodeData>[] = [
  {
    id: "cto",
    type: "custom",
    position: { x: 400, y: 0 },
    data: {
      label: "Diretor de TI",
      role: "CTO / Head of Technology",
      department: "Diretoria",
      color: "blue",
    },
  },
  {
    id: "infra",
    type: "custom",
    position: { x: 100, y: 140 },
    data: {
      label: "Coord. Infraestrutura",
      role: "Cloud, Servidores & DC",
      department: "Infraestrutura",
      color: "cyan",
    },
  },
  {
    id: "security",
    type: "custom",
    position: { x: 400, y: 140 },
    data: {
      label: "Coord. Segurança",
      role: "Cyber Security & Compliance",
      department: "Segurança",
      color: "violet",
    },
  },
  {
    id: "dev",
    type: "custom",
    position: { x: 700, y: 140 },
    data: {
      label: "Coord. Desenvolvimento",
      role: "Sistemas & Integrações",
      department: "Desenvolvimento",
      color: "emerald",
    },
  },
  {
    id: "networks",
    type: "custom",
    position: { x: 0, y: 290 },
    data: {
      label: "Redes & Telecom",
      role: "SD-WAN, Wi-Fi, VoIP",
      department: "Infraestrutura",
      color: "cyan",
    },
  },
  {
    id: "servers",
    type: "custom",
    position: { x: 220, y: 290 },
    data: {
      label: "Servidores & Cloud",
      role: "VMware, Azure, Backup",
      department: "Infraestrutura",
      color: "cyan",
    },
  },
  {
    id: "soc",
    type: "custom",
    position: { x: 400, y: 290 },
    data: {
      label: "SOC / Blue Team",
      role: "Monitoramento 24/7",
      department: "Segurança",
      color: "violet",
    },
  },
  {
    id: "apps",
    type: "custom",
    position: { x: 620, y: 290 },
    data: {
      label: "Aplicações Web",
      role: "React, Node.js, .NET",
      department: "Desenvolvimento",
      color: "emerald",
    },
  },
  {
    id: "integration",
    type: "custom",
    position: { x: 840, y: 290 },
    data: {
      label: "Integrações",
      role: "HL7, FHIR, APIs",
      department: "Desenvolvimento",
      color: "emerald",
    },
  },
  {
    id: "servicedesk",
    type: "custom",
    position: { x: 300, y: 430 },
    data: {
      label: "Service Desk",
      role: "N1 / N2 / N3 — 24/7",
      department: "Suporte",
      color: "amber",
    },
  },
  {
    id: "field",
    type: "custom",
    position: { x: 560, y: 430 },
    data: {
      label: "Field Services",
      role: "Técnicos nas unidades",
      department: "Suporte",
      color: "rose",
    },
  },
];

/* ── Edges ─────────────────────────────────────────────────────────── */
const initialEdges: Edge[] = [
  { id: "e-cto-infra", source: "cto", target: "infra", animated: true },
  { id: "e-cto-sec", source: "cto", target: "security", animated: true },
  { id: "e-cto-dev", source: "cto", target: "dev", animated: true },
  { id: "e-infra-net", source: "infra", target: "networks" },
  { id: "e-infra-srv", source: "infra", target: "servers" },
  { id: "e-sec-soc", source: "security", target: "soc" },
  { id: "e-dev-apps", source: "dev", target: "apps" },
  { id: "e-dev-int", source: "dev", target: "integration" },
  { id: "e-infra-sd", source: "infra", target: "servicedesk" },
  { id: "e-sec-sd", source: "security", target: "servicedesk" },
  { id: "e-dev-field", source: "dev", target: "field" },
  { id: "e-infra-field", source: "infra", target: "field" },
];

/* ── Section component ─────────────────────────────────────────────── */
export default function OrgChartSection() {
  const container = useRef<HTMLElement>(null);
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const nodeTypes: NodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const defaultEdgeOptions = useMemo(
    () => ({
      style: { stroke: "#3b82f6", strokeWidth: 2 },
      type: "smoothstep" as const,
    }),
    []
  );

  const onInit = useCallback(() => {
    // noop – chart is static
  }, []);

  useGSAP(
    () => {
      gsap.from(".org-header > *", {
        scrollTrigger: { trigger: ".org-header", start: "top 85%" },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".org-chart-wrapper", {
        scrollTrigger: { trigger: ".org-chart-wrapper", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative px-6 py-32" id="team">
      <div className="pointer-events-none absolute left-0 bottom-0">
        <div className="h-125 w-125 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="org-header mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Organização
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            Nosso <span className="text-gradient">Time</span>
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            Estrutura organizacional que garante agilidade e especialização em cada frente tecnológica.
          </p>
        </div>

        {/* ── Chart ────────────────────────────────────────────── */}
        <div className="org-chart-wrapper glass overflow-hidden rounded-2xl" style={{ height: 560 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onInit={onInit}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            panOnDrag
            zoomOnScroll={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="rgba(148, 163, 184, 0.15)"
            />
            <Controls
              showInteractive={false}
              position="bottom-right"
            />
          </ReactFlow>
        </div>
      </div>
    </section>
  );
}
