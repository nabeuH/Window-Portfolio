"use client"

import { useOS } from "@/lib/os-context"
import type { AppId } from "@/lib/os-context"
import {
  FolderOpen,
  User,
  FileText,
  Mail,
  TerminalSquare,
  Github,
  Linkedin,
  Power,
  Monitor,
  Shield,
} from "lucide-react"

const MENU_APPS: { id: AppId; label: string; icon: React.ReactNode }[] = [
  { id: "projects", label: "Projects", icon: <FolderOpen size={18} /> },
  { id: "about", label: "About Me", icon: <User size={18} /> },
  { id: "resume", label: "Resume", icon: <FileText size={18} /> },
  { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  { id: "terminal", label: "Terminal", icon: <TerminalSquare size={18} /> },
]

export function StartMenu() {
  const { state, dispatch, openApp } = useOS()

  if (!state.startMenuOpen) return null

  const isClassic = state.theme === "classic"
  const isOps = state.theme === "ops"

  return (
    <div
      className={`absolute bottom-10 left-0 z-50 w-72 overflow-hidden shadow-2xl border ${
        isClassic
          ? "bg-[#e2e8f0] border-[#94a3b8] rounded"
          : "bg-[#0f172a]/95 border-[#334155] rounded-sm backdrop-blur-md"
      }`}
    >
      {/* Profile header */}
      <div
        className={`flex items-center gap-3 px-4 py-3 ${
          isClassic ? "bg-[#2563eb]" : "bg-[#1e293b] border-b border-[#334155]"
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-sm ${
            isClassic ? "bg-[#1e40af]" : "bg-[#0f172a] border border-[#4ade80]/30"
          }`}
        >
          <User size={20} className={isClassic ? "text-white" : "text-[#4ade80]"} />
        </div>
        <div>
          <p className={`text-sm font-bold ${isClassic ? "text-white" : "text-[#e0e0e0]"}`}>
            Developer
          </p>
          <p className={`text-xs ${isClassic ? "text-white/70" : "text-[#4ade80]/70"}`}>
            {isOps ? "OPERATOR // ONLINE" : "Welcome"}
          </p>
        </div>
      </div>

      {/* App shortcuts */}
      <div className="py-1">
        {MENU_APPS.map((app) => (
          <button
            key={app.id}
            className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
              isClassic
                ? "text-[#1e293b] hover:bg-[#2563eb] hover:text-white"
                : "text-[#e0e0e0] hover:bg-[#1e293b] hover:text-[#4ade80]"
            }`}
            onClick={() => openApp(app.id)}
          >
            <span className={isClassic ? "" : "text-[#4ade80]/70"}>{app.icon}</span>
            {app.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className={`mx-3 border-t ${isClassic ? "border-[#94a3b8]" : "border-[#334155]"}`} />

      {/* Quick links */}
      <div className="py-1">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors ${
            isClassic
              ? "text-[#1e293b] hover:bg-[#2563eb] hover:text-white"
              : "text-[#e0e0e0] hover:bg-[#1e293b] hover:text-[#4ade80]"
          }`}
        >
          <Github size={18} className={isClassic ? "" : "text-[#4ade80]/70"} />
          GitHub
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors ${
            isClassic
              ? "text-[#1e293b] hover:bg-[#2563eb] hover:text-white"
              : "text-[#e0e0e0] hover:bg-[#1e293b] hover:text-[#4ade80]"
          }`}
        >
          <Linkedin size={18} className={isClassic ? "" : "text-[#4ade80]/70"} />
          LinkedIn
        </a>
      </div>

      {/* Divider */}
      <div className={`mx-3 border-t ${isClassic ? "border-[#94a3b8]" : "border-[#334155]"}`} />

      {/* Theme toggle & Shut Down */}
      <div className="py-1">
        <button
          className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
            isClassic
              ? "text-[#1e293b] hover:bg-[#2563eb] hover:text-white"
              : "text-[#e0e0e0] hover:bg-[#1e293b] hover:text-[#f59e0b]"
          }`}
          onClick={() =>
            dispatch({
              type: "SET_THEME",
              theme: state.theme === "ops" ? "classic" : "ops",
            })
          }
        >
          {state.theme === "ops" ? (
            <>
              <Monitor size={18} className="text-[#f59e0b]/70" />
              Switch to Classic Mode
            </>
          ) : (
            <>
              <Shield size={18} />
              Switch to Ops Mode
            </>
          )}
        </button>
        <button
          className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
            isClassic
              ? "text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
              : "text-[#ef4444] hover:bg-[#1e293b]"
          }`}
          onClick={() => dispatch({ type: "CLOSE_START_MENU" })}
        >
          <Power size={18} />
          Shut Down
        </button>
      </div>
    </div>
  )
}
