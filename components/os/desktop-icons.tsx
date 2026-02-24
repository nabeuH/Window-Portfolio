"use client"

import type { AppId } from "@/lib/os-context"
import { useOS } from "@/lib/os-context"
import {
  FolderOpen,
  User,
  FileText,
  Mail,
  TerminalSquare,
  Github,
  Linkedin,
  Trash2,
} from "lucide-react"
import { useCallback, useRef } from "react"

interface IconConfig {
  id: string
  label: string
  icon: React.ReactNode
  appId?: AppId
  href?: string
  side: "left" | "right"
}

const ICONS: IconConfig[] = [
  { id: "projects", label: "Projects", icon: <FolderOpen size={32} />, appId: "projects", side: "left" },
  { id: "about", label: "About Me", icon: <User size={32} />, appId: "about", side: "left" },
  { id: "resume", label: "Resume", icon: <FileText size={32} />, appId: "resume", side: "left" },
  { id: "contact", label: "Contact", icon: <Mail size={32} />, appId: "contact", side: "left" },
  { id: "terminal", label: "Terminal", icon: <TerminalSquare size={32} />, appId: "terminal", side: "left" },
  { id: "github", label: "GitHub", icon: <Github size={32} />, href: "https://github.com", side: "right" },
  { id: "linkedin", label: "LinkedIn", icon: <Linkedin size={32} />, href: "https://linkedin.com", side: "right" },
  { id: "recycle", label: "Recycle Bin", icon: <Trash2 size={32} />, side: "right" },
]

export function DesktopIcons() {
  const { state, dispatch, openApp } = useOS()
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickCountRef = useRef(0)

  const handleIconClick = useCallback(
    (icon: IconConfig) => {
      clickCountRef.current += 1
      dispatch({ type: "SELECT_ICON", icon: icon.id })

      if (clickTimerRef.current) clearTimeout(clickTimerRef.current)

      clickTimerRef.current = setTimeout(() => {
        if (clickCountRef.current >= 2) {
          if (icon.href) {
            window.open(icon.href, "_blank", "noopener,noreferrer")
          } else if (icon.appId) {
            openApp(icon.appId)
          }
        }
        clickCountRef.current = 0
      }, 300)
    },
    [dispatch, openApp]
  )

  const leftIcons = ICONS.filter((i) => i.side === "left")
  const rightIcons = ICONS.filter((i) => i.side === "right")

  const isClassic = state.theme === "classic"

  return (
    <>
      {/* Left column */}
      <div className="absolute left-4 top-4 flex flex-col gap-2 z-[5]">
        {leftIcons.map((icon) => (
          <button
            key={icon.id}
            className={`desktop-icon flex flex-col items-center gap-1 p-2 rounded-sm w-20 cursor-pointer select-none
              ${state.selectedIcon === icon.id ? "selected" : ""}`}
            onClick={() => handleIconClick(icon)}
            aria-label={`Open ${icon.label}`}
          >
            <span className={isClassic ? "text-[#1e40af]" : "text-[#e0e0e0] drop-shadow-[0_0_4px_rgba(74,222,128,0.3)]"}>
              {icon.icon}
            </span>
            <span
              className={`text-[11px] leading-tight text-center font-medium ${
                isClassic
                  ? "text-[#1e293b] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]"
                  : "text-[#e0e0e0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              }`}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Right column */}
      <div className="absolute right-4 top-4 flex flex-col gap-2 z-[5]">
        {rightIcons.map((icon) => (
          <button
            key={icon.id}
            className={`desktop-icon flex flex-col items-center gap-1 p-2 rounded-sm w-20 cursor-pointer select-none
              ${state.selectedIcon === icon.id ? "selected" : ""}`}
            onClick={() => handleIconClick(icon)}
            aria-label={`Open ${icon.label}`}
          >
            <span className={isClassic ? "text-[#1e40af]" : "text-[#e0e0e0] drop-shadow-[0_0_4px_rgba(74,222,128,0.3)]"}>
              {icon.icon}
            </span>
            <span
              className={`text-[11px] leading-tight text-center font-medium ${
                isClassic
                  ? "text-[#1e293b] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]"
                  : "text-[#e0e0e0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              }`}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
