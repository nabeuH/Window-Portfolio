"use client"

import { useOS } from "@/lib/os-context"
import { StartMenu } from "./start-menu"
import { useState, useEffect } from "react"
import { Shield, Monitor } from "lucide-react"

export function Taskbar() {
  const { state, dispatch, focusApp, restoreApp, minimizeApp } = useOS()
  const [clock, setClock] = useState("")

  useEffect(() => {
    function updateClock() {
      const now = new Date()
      setClock(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      )
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  const isClassic = state.theme === "classic"

  const handleTaskbarClick = (id: string) => {
    const win = state.windows.find((w) => w.id === id)
    if (!win) return
    if (win.minimized) {
      restoreApp(win.id)
    } else if (state.activeWindowId === win.id) {
      minimizeApp(win.id)
    } else {
      focusApp(win.id)
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      <StartMenu />

      <div
        className={`flex h-10 items-center border-t ${
          isClassic
            ? "bg-gradient-to-b from-[#3b82f6] to-[#1e40af] border-[#60a5fa]"
            : "bg-[#0f172a]/95 border-[#334155] backdrop-blur-sm"
        }`}
      >
        {/* Start button */}
        <button
          className={`flex h-full items-center gap-1.5 px-4 text-sm font-bold transition-colors cursor-pointer ${
            isClassic
              ? "bg-[#16a34a] text-white hover:bg-[#15803d] rounded-r-lg mr-1"
              : "text-[#4ade80] hover:bg-[#1e293b] border-r border-[#334155]"
          } ${state.startMenuOpen ? (isClassic ? "bg-[#15803d]" : "bg-[#1e293b]") : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_START_MENU" })}
        >
          {isClassic ? (
            <Monitor size={16} />
          ) : (
            <Shield size={16} />
          )}
          <span className="hidden sm:inline">Start</span>
        </button>

        {/* Open window buttons */}
        <div className="flex flex-1 items-center gap-1 px-1 overflow-x-auto">
          {state.windows.map((win) => (
            <button
              key={win.id}
              onClick={() => handleTaskbarClick(win.id)}
              className={`flex h-7 items-center gap-1.5 px-3 text-xs font-medium transition-colors cursor-pointer truncate max-w-40 ${
                isClassic
                  ? state.activeWindowId === win.id && !win.minimized
                    ? "bg-white/30 text-white border border-white/40 rounded"
                    : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20 rounded"
                  : state.activeWindowId === win.id && !win.minimized
                  ? "bg-[#1e293b] text-[#4ade80] border border-[#4ade80]/30 rounded-sm"
                  : "bg-[#1e293b]/50 text-[#94a3b8] hover:text-[#e0e0e0] hover:bg-[#1e293b] border border-[#334155]/50 rounded-sm"
              }`}
            >
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>

        {/* System tray */}
        <div
          className={`flex h-full items-center gap-3 px-3 text-xs border-l ${
            isClassic
              ? "border-[#60a5fa]/50 text-white/80"
              : "border-[#334155] text-[#94a3b8]"
          }`}
        >
          {/* Ops/Classic indicator */}
          <span
            className={`hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-wider ${
              isClassic ? "text-white/60" : "text-[#4ade80]/60"
            }`}
          >
            {isClassic ? "CLASSIC" : "OPS"}
          </span>
          <span className={isClassic ? "text-white" : "text-[#e0e0e0]"}>
            {clock}
          </span>
        </div>
      </div>
    </div>
  )
}
