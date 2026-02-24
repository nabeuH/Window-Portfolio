"use client"

import { useOS, type AppId } from "@/lib/os-context"
import { useCallback, useRef, type ReactNode } from "react"
import {
  Minus,
  Square,
  X,
  FolderOpen,
  User,
  FileText,
  Mail,
  TerminalSquare,
  Copy,
} from "lucide-react"

const APP_ICONS: Record<AppId, ReactNode> = {
  projects: <FolderOpen size={14} />,
  about: <User size={14} />,
  resume: <FileText size={14} />,
  contact: <Mail size={14} />,
  terminal: <TerminalSquare size={14} />,
}

interface AppWindowProps {
  id: AppId
  title: string
  children: ReactNode
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
  minimized: boolean
  isActive: boolean
  isMaximized: boolean
}

export function AppWindow({
  id,
  title,
  children,
  zIndex,
  position,
  size,
  minimized,
  isActive,
  isMaximized,
}: AppWindowProps) {
  const { dispatch, closeApp, minimizeApp, focusApp, maximizeApp, restoreMaximize, state } = useOS()
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  const isClassic = state.theme === "classic"

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      focusApp(id)
      if (isMaximized) return

      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: position.x,
        origY: position.y,
      }

      const handleMouseMove = (moveEvt: MouseEvent) => {
        if (!dragRef.current) return
        const dx = moveEvt.clientX - dragRef.current.startX
        const dy = moveEvt.clientY - dragRef.current.startY
        dispatch({
          type: "MOVE_WINDOW",
          id,
          position: {
            x: Math.max(0, dragRef.current.origX + dx),
            y: Math.max(0, dragRef.current.origY + dy),
          },
        })
      }

      const handleMouseUp = () => {
        dragRef.current = null
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }

      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    },
    [id, position, dispatch, focusApp, isMaximized]
  )

  const handleMaximizeToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isMaximized) {
        restoreMaximize(id)
      } else {
        maximizeApp(id)
      }
    },
    [id, isMaximized, maximizeApp, restoreMaximize]
  )

  if (minimized) return null

  // Chromeless fullscreen mode for terminal when maximized
  const isChromeless = isMaximized && id === "terminal"

  if (isChromeless) {
    return (
      <div
        ref={windowRef}
        className="window-open hidden md:block fixed inset-0"
        style={{ zIndex: zIndex + 100 }}
        onMouseDown={() => focusApp(id)}
      >
        <div className="flex flex-col h-full w-full bg-[#0a0a0a]">
          {children}
        </div>
      </div>
    )
  }

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        left: 0,
        top: 0,
        right: 0,
        bottom: 40, // taskbar height
        zIndex,
        width: "auto",
        height: "auto",
        position: "absolute",
      }
    : {
        left: position.x,
        top: position.y,
        zIndex,
        width: size.width,
        minWidth: 400,
      }

  return (
    <div
      ref={windowRef}
      className={`window-open hidden md:block ${isMaximized ? "" : "absolute"}`}
      style={windowStyle}
      onMouseDown={() => focusApp(id)}
    >
      <div
        className={`flex flex-col overflow-hidden shadow-2xl h-full ${
          isClassic
            ? "border-2 border-[#94a3b8] rounded bg-[#e2e8f0]"
            : `border rounded-sm ${
                isActive
                  ? "border-[#4ade80]/30 bg-[#0f172a]/98 shadow-[0_0_20px_rgba(74,222,128,0.1)]"
                  : "border-[#334155] bg-[#0f172a]/95"
              }`
        }`}
      >
        {/* Title bar */}
        <div
          className={`flex h-8 items-center justify-between gap-2 px-2 select-none shrink-0 ${
            isMaximized ? "cursor-default" : "window-drag"
          } ${
            isClassic
              ? isActive
                ? "bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
                : "bg-[#94a3b8]"
              : isActive
              ? "bg-[#1e293b] border-b border-[#334155]"
              : "bg-[#1e293b]/60 border-b border-[#334155]/50"
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={isClassic ? "text-white" : isActive ? "text-[#4ade80]" : "text-[#64748b]"}>
              {APP_ICONS[id]}
            </span>
            <span
              className={`text-xs font-medium truncate ${
                isClassic ? "text-white" : isActive ? "text-[#e0e0e0]" : "text-[#64748b]"
              }`}
            >
              {title}
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={(e) => {
                e.stopPropagation()
                minimizeApp(id)
              }}
              className={`flex h-5 w-6 items-center justify-center transition-colors cursor-pointer ${
                isClassic
                  ? "bg-[#e2e8f0] hover:bg-[#f1f5f9] border border-[#94a3b8] rounded-sm"
                  : "hover:bg-[#334155] rounded-sm text-[#94a3b8] hover:text-[#e0e0e0]"
              }`}
              aria-label="Minimize"
            >
              <Minus size={12} className={isClassic ? "text-[#1e293b]" : ""} />
            </button>
            <button
              onClick={handleMaximizeToggle}
              className={`flex h-5 w-6 items-center justify-center transition-colors cursor-pointer ${
                isClassic
                  ? "bg-[#e2e8f0] hover:bg-[#f1f5f9] border border-[#94a3b8] rounded-sm"
                  : `hover:bg-[#334155] rounded-sm hover:text-[#e0e0e0] ${
                      isMaximized ? "text-[#4ade80]" : "text-[#94a3b8]"
                    }`
              }`}
              aria-label={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? (
                <Copy size={10} className={isClassic ? "text-[#1e293b]" : ""} />
              ) : (
                <Square size={10} className={isClassic ? "text-[#1e293b]" : ""} />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeApp(id)
              }}
              className={`flex h-5 w-6 items-center justify-center transition-colors cursor-pointer ${
                isClassic
                  ? "bg-[#ef4444] hover:bg-[#dc2626] border border-[#94a3b8] rounded-sm"
                  : "hover:bg-[#ef4444] rounded-sm text-[#94a3b8] hover:text-white"
              }`}
              aria-label="Close"
            >
              <X size={12} className={isClassic ? "text-white" : ""} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className={`overflow-auto flex-1 ${isClassic ? "bg-[#e2e8f0]" : ""}`}
          style={isMaximized ? undefined : { maxHeight: "70vh" }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/* Mobile fullscreen window variant */
export function MobileAppWindow({
  id,
  title,
  children,
}: {
  id: AppId
  title: string
  children: ReactNode
}) {
  const { closeApp, state } = useOS()
  const isClassic = state.theme === "classic"

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col md:hidden ${
        isClassic ? "bg-[#e2e8f0]" : "bg-[#0f172a]"
      }`}
    >
      {/* Title bar */}
      <div
        className={`flex h-10 items-center justify-between px-3 ${
          isClassic
            ? "bg-gradient-to-r from-[#2563eb] to-[#60a5fa]"
            : "bg-[#1e293b] border-b border-[#334155]"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className={isClassic ? "text-white" : "text-[#4ade80]"}>
            {APP_ICONS[id]}
          </span>
          <span className={`text-sm font-medium ${isClassic ? "text-white" : "text-[#e0e0e0]"}`}>
            {title}
          </span>
        </div>
        <button
          onClick={() => closeApp(id)}
          className={`flex h-6 w-6 items-center justify-center cursor-pointer ${
            isClassic ? "text-white hover:bg-white/20 rounded" : "text-[#94a3b8] hover:text-[#ef4444] rounded-sm"
          }`}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
