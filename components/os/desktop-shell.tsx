"use client"

import { useOS } from "@/lib/os-context"
import { DesktopIcons } from "./desktop-icons"
import { Taskbar } from "./taskbar"
import { WindowManager } from "./window-manager"

export function DesktopShell() {
  const { state, dispatch } = useOS()
  const isClassic = state.theme === "classic"

  const handleDesktopClick = () => {
    dispatch({ type: "SELECT_ICON", icon: null })
    dispatch({ type: "CLOSE_START_MENU" })
  }

  return (
    <div
      className={`fixed inset-0 select-none ${
        isClassic ? "theme-classic" : ""
      }`}
    >
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/wallpaper.jpg')" }}
      />

      {/* Dark overlay for ops mode */}
      {!isClassic && (
        <div className="absolute inset-0 bg-[#0a0a1a]/40" />
      )}

      {/* Scanlines overlay */}
      <div className={isClassic ? "" : "scanlines"}>
        {/* Desktop area */}
        <div
          className="absolute inset-0 bottom-10"
          onClick={handleDesktopClick}
        >
          <DesktopIcons />
          <WindowManager />
        </div>

        {/* Taskbar */}
        <Taskbar />
      </div>

      {/* Ops mode: System Online toast (brief) */}
      {!isClassic && <SystemToast />}
    </div>
  )
}

function SystemToast() {
  return (
    <div className="fixed top-4 right-4 z-[60] boot-line pointer-events-none">
      <div className="flex items-center gap-2 rounded-sm border border-[#4ade80]/20 bg-[#0f172a]/90 px-3 py-1.5 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
        <span className="text-[10px] font-mono text-[#4ade80]/70 uppercase tracking-wider">
          System Online
        </span>
      </div>
    </div>
  )
}
