"use client"

import { useOS } from "@/lib/os-context"
import { useState } from "react"
import { FolderOpen, ExternalLink, Github } from "lucide-react"

interface Project {
  name: string
  description: string
  tech: string[]
  category: string
}

const PROJECTS: Project[] = [
  {
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce app with Stripe payments, user auth, and admin dashboard.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    category: "Web",
  },
  {
    name: "Task Manager API",
    description: "RESTful API with JWT authentication, rate limiting, and comprehensive test coverage.",
    tech: ["Node.js", "Express", "MongoDB", "Jest"],
    category: "Web",
  },
  {
    name: "ML Image Classifier",
    description: "CNN-based image classification model trained on custom dataset with 95% accuracy.",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask"],
    category: "ML",
  },
  {
    name: "Fitness Tracker",
    description: "Cross-platform mobile app for tracking workouts, nutrition, and progress.",
    tech: ["React Native", "Firebase", "Redux"],
    category: "Mobile",
  },
  {
    name: "Portfolio OS",
    description: "This website! A retro OS-themed interactive portfolio built with modern web tech.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Creative",
  },
  {
    name: "Compiler Design",
    description: "Custom programming language compiler with lexer, parser, and code generation.",
    tech: ["C++", "LLVM", "Assembly"],
    category: "School",
  },
]

const CATEGORIES = ["All", "Web", "Mobile", "ML", "School", "Creative"]

export function ProjectsApp() {
  const { state } = useOS()
  const [activeCategory, setActiveCategory] = useState("All")
  const isClassic = state.theme === "classic"

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory)

  return (
    <div
      className={`flex flex-col h-full ${
        isClassic ? "text-[#1e293b]" : "text-[#e0e0e0]"
      }`}
      style={{ minHeight: 400 }}
    >
      {/* Path bar */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono border-b ${
          isClassic
            ? "bg-white border-[#94a3b8] text-[#475569]"
            : "bg-[#0f172a] border-[#334155] text-[#4ade80]/70"
        }`}
      >
        <FolderOpen size={12} />
        {"C:\\Users\\Portfolio\\Projects"}
        {activeCategory !== "All" && `\\${activeCategory}`}
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div
          className={`w-36 shrink-0 border-r p-2 ${
            isClassic
              ? "bg-[#f1f5f9] border-[#94a3b8]"
              : "bg-[#0a0f1a] border-[#334155]"
          }`}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs transition-colors cursor-pointer ${
                activeCategory === cat
                  ? isClassic
                    ? "bg-[#2563eb] text-white"
                    : "bg-[#1e293b] text-[#4ade80]"
                  : isClassic
                  ? "text-[#475569] hover:bg-[#e2e8f0]"
                  : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#e0e0e0]"
              }`}
            >
              <FolderOpen size={12} />
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className={`flex-1 overflow-auto p-3 ${isClassic ? "bg-white" : "bg-[#0f172a]"}`}>
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((project) => (
              <div
                key={project.name}
                className={`flex flex-col gap-2 rounded-sm border p-3 transition-colors ${
                  isClassic
                    ? "border-[#94a3b8] bg-[#f8fafc] hover:bg-[#f1f5f9]"
                    : "border-[#334155] bg-[#1e293b]/50 hover:bg-[#1e293b] hover:border-[#4ade80]/20"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`text-sm font-bold ${
                      isClassic ? "text-[#1e293b]" : "text-[#e0e0e0]"
                    }`}
                  >
                    {project.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-mono uppercase ${
                      isClassic
                        ? "bg-[#e2e8f0] text-[#475569]"
                        : "bg-[#0f172a] text-[#4ade80]/70 border border-[#334155]"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isClassic ? "text-[#475569]" : "text-[#94a3b8]"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`rounded-sm px-1.5 py-0.5 text-[10px] ${
                        isClassic
                          ? "bg-[#e2e8f0] text-[#475569]"
                          : "bg-[#0f172a] text-[#f59e0b]/80 border border-[#334155]/50"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto pt-1">
                  <button
                    className={`flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer ${
                      isClassic
                        ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                        : "bg-[#1e293b] text-[#4ade80] border border-[#4ade80]/20 hover:bg-[#4ade80]/10"
                    }`}
                  >
                    <Github size={10} />
                    GitHub
                  </button>
                  <button
                    className={`flex items-center gap-1 rounded-sm px-2 py-1 text-[10px] font-medium transition-colors cursor-pointer ${
                      isClassic
                        ? "bg-[#f1f5f9] text-[#1e293b] hover:bg-[#e2e8f0] border border-[#94a3b8]"
                        : "bg-[#1e293b] text-[#e0e0e0] border border-[#334155] hover:border-[#4ade80]/20"
                    }`}
                  >
                    <ExternalLink size={10} />
                    Live Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className={`flex items-center px-3 py-1 text-[10px] border-t ${
          isClassic
            ? "bg-[#f1f5f9] border-[#94a3b8] text-[#475569]"
            : "bg-[#0a0f1a] border-[#334155] text-[#4ade80]/50"
        }`}
      >
        {filtered.length} item{filtered.length !== 1 ? "s" : ""}
      </div>
    </div>
  )
}
