"use client"

import { useOS } from "@/lib/os-context"
import {
  Code,
  Database,
  Wrench,
  MapPin,
  Zap,
  Cpu,
} from "lucide-react"

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  Backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  Tools: ["Git", "Docker", "AWS", "Figma", "Linux"],
}

const SYSTEM_SPECS = [
  { label: "Role", value: "Full-Stack Developer", icon: <Code size={14} /> },
  { label: "Stack", value: "React / Node.js / Python", icon: <Cpu size={14} /> },
  { label: "Status", value: "ACTIVE // SEEKING", icon: <Zap size={14} /> },
  { label: "Location", value: "United States", icon: <MapPin size={14} /> },
]

export function AboutApp() {
  const { state } = useOS()
  const isClassic = state.theme === "classic"

  return (
    <div
      className={`p-4 ${isClassic ? "text-[#1e293b]" : "text-[#e0e0e0]"}`}
      style={{ minHeight: 400 }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-sm ${
            isClassic
              ? "bg-[#2563eb] text-white"
              : "bg-[#1e293b] border border-[#4ade80]/30"
          }`}
        >
          <span className={`text-2xl font-bold font-mono ${isClassic ? "" : "text-[#4ade80] ops-glow"}`}>
            {"D>"}
          </span>
        </div>
        <div>
          <h2 className={`text-lg font-bold ${isClassic ? "" : "text-[#e0e0e0]"}`}>
            Developer Name
          </h2>
          <p className={`text-sm ${isClassic ? "text-[#475569]" : "text-[#4ade80]/70 font-mono"}`}>
            {isClassic ? "Full-Stack Software Developer" : "OPERATOR // FULL-STACK DEVELOPER"}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div
        className={`mb-4 rounded-sm border p-3 ${
          isClassic
            ? "bg-white border-[#94a3b8]"
            : "bg-[#1e293b]/50 border-[#334155]"
        }`}
      >
        <p className={`text-sm leading-relaxed ${isClassic ? "text-[#475569]" : "text-[#94a3b8]"}`}>
          Passionate developer with a love for building clean, performant web applications.
          I enjoy turning complex problems into elegant solutions and am always learning
          new technologies. Currently focused on full-stack development with React and Node.js,
          with a growing interest in machine learning and systems programming.
        </p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h3
          className={`mb-2 text-xs font-bold uppercase tracking-wider ${
            isClassic ? "text-[#475569]" : "text-[#4ade80]/70"
          }`}
        >
          {isClassic ? "Technical Skills" : "// TECHNICAL SKILLS"}
        </h3>
        <div className="flex flex-col gap-2">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div
              key={category}
              className={`rounded-sm border p-2 ${
                isClassic
                  ? "bg-[#f8fafc] border-[#94a3b8]"
                  : "bg-[#1e293b]/30 border-[#334155]/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {category === "Frontend" && <Code size={12} className={isClassic ? "text-[#2563eb]" : "text-[#4ade80]"} />}
                {category === "Backend" && <Database size={12} className={isClassic ? "text-[#2563eb]" : "text-[#4ade80]"} />}
                {category === "Tools" && <Wrench size={12} className={isClassic ? "text-[#2563eb]" : "text-[#4ade80]"} />}
                <span className={`text-xs font-bold ${isClassic ? "text-[#1e293b]" : "text-[#e0e0e0]"}`}>
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-sm px-2 py-0.5 text-[11px] ${
                      isClassic
                        ? "bg-[#e2e8f0] text-[#475569]"
                        : "bg-[#0f172a] text-[#f59e0b]/80 border border-[#334155]/50"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Specs panel */}
      <div>
        <h3
          className={`mb-2 text-xs font-bold uppercase tracking-wider ${
            isClassic ? "text-[#475569]" : "text-[#4ade80]/70"
          }`}
        >
          {isClassic ? "Profile Details" : "// SYSTEM SPECS"}
        </h3>
        <div
          className={`rounded-sm border ${
            isClassic ? "bg-white border-[#94a3b8]" : "bg-[#1e293b]/30 border-[#334155]"
          }`}
        >
          {SYSTEM_SPECS.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-center gap-3 px-3 py-2 text-xs ${
                i < SYSTEM_SPECS.length - 1
                  ? isClassic
                    ? "border-b border-[#e2e8f0]"
                    : "border-b border-[#334155]/50"
                  : ""
              }`}
            >
              <span className={isClassic ? "text-[#2563eb]" : "text-[#4ade80]/70"}>
                {spec.icon}
              </span>
              <span className={`w-20 font-mono ${isClassic ? "text-[#475569]" : "text-[#94a3b8]"}`}>
                {spec.label}:
              </span>
              <span className={`font-medium ${isClassic ? "text-[#1e293b]" : spec.label === "Status" ? "text-[#4ade80]" : "text-[#e0e0e0]"}`}>
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
