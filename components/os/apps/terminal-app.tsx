"use client"

import { useOS, type AppId } from "@/lib/os-context"
import { useState, useRef, useEffect, useCallback } from "react"

const HELP_TEXT = `Available commands:
  open window   - Open the desktop interface
  help          - Show this help message
  whoami        - Display user info
  about         - Open About window
  projects      - Open Projects window
  resume        - Open Resume window
  contact       - Open Contact window
  clear         - Clear terminal
  status        - System status
  ls            - List directory contents
  neofetch      - Display system info`

const WHOAMI_TEXT = `developer@portfolio-os
Role: Full-Stack Developer
Status: ACTIVE
Clearance: LEVEL 5
Session: SECURE`

const NEOFETCH = `
  ██████╗  ██████╗ ███████╗
  ██╔══██╗██╔═══██╗██╔════╝
  ██████╔╝██║   ██║███████╗
  ██╔═══╝ ██║   ██║╚════██║
  ██║     ╚██████╔╝███████║
  ╚═╝      ╚═════╝ ╚══════╝
  
  OS:      Portfolio OS v2.6.1
  Host:    Browser Runtime
  Kernel:  Next.js 16 + React 19
  Shell:   TypeScript 5.7
  Theme:   Ops Terminal
  CPU:     Developer Brain @ MAX GHz
  Memory:  Unlimited Ideas / Limited Time`

const LS_TEXT = `drwxr-xr-x  projects/
drwxr-xr-x  about/
-rw-r--r--  resume.pdf
-rw-r--r--  contact.cfg
-rwxr-xr-x  terminal.sh
lrwxrwxrwx  github -> https://github.com
lrwxrwxrwx  linkedin -> https://linkedin.com
drwxr-xr-x  recycle-bin/`

const STATUS_TEXT = `[SYS] Portfolio OS v2.6.1
[NET] Connection: SECURE
[MEM] Usage: 42.0 MB / 16384 MB
[CPU] Load: 0.02
[UPT] Uptime: SINCE YOU OPENED THIS PAGE
[SEC] Clearance: GRANTED
[ALL] Systems nominal.`

interface TerminalLine {
  type: "input" | "output"
  content: string
}

export function TerminalApp() {
  const { state, openApp, restoreMaximize } = useOS()
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Portfolio OS Terminal v2.6.1" },
    { type: "output", content: 'Type "help" for available commands.\n' },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isClassic = state.theme === "classic"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()
      const newLines: TerminalLine[] = [
        ...lines,
        { type: "input", content: `$ ${cmd}` },
      ]

      const appCommands: Record<string, AppId> = {
        about: "about",
        projects: "projects",
        resume: "resume",
        contact: "contact",
      }

      if (trimmed === "clear") {
        setLines([])
        return
      } else if (trimmed === "help") {
        newLines.push({ type: "output", content: HELP_TEXT })
      } else if (trimmed === "whoami") {
        newLines.push({ type: "output", content: WHOAMI_TEXT })
      } else if (trimmed === "neofetch") {
        newLines.push({ type: "output", content: NEOFETCH })
      } else if (trimmed === "ls") {
        newLines.push({ type: "output", content: LS_TEXT })
      } else if (trimmed === "status") {
        newLines.push({ type: "output", content: STATUS_TEXT })
      } else if (appCommands[trimmed]) {
        // Restore terminal from maximized first so the opened window is visible
        const termWinApp = state.windows.find((w) => w.id === "terminal")
        if (termWinApp?.isMaximized) {
          restoreMaximize("terminal")
        }
        openApp(appCommands[trimmed])
        newLines.push({
          type: "output",
          content: `[SYS] Opening ${trimmed}...`,
        })
      } else if (trimmed === "open window") {
        newLines.push({
          type: "output",
          content: "[SYS] Opening desktop interface...",
        })
        // Restore terminal from maximized so desktop is visible
        const termWin = state.windows.find((w) => w.id === "terminal")
        if (termWin?.isMaximized) {
          restoreMaximize("terminal")
        }
      } else if (trimmed === "") {
        // Do nothing on empty
      } else {
        newLines.push({
          type: "output",
          content: `Command not found: ${trimmed}\nType "help" for available commands.`,
        })
      }

      setLines(newLines)
      setHistory((prev) => [cmd, ...prev])
      setHistoryIndex(-1)
    },
    [lines, openApp, restoreMaximize, state.windows]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      } else {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <div
      className={`flex flex-col font-mono text-sm h-full ${
        isClassic ? "bg-[#1e293b] text-[#e0e0e0]" : "bg-[#0a0a0a] text-[#4ade80]"
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-3">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            {line.type === "input" ? (
              <span className={isClassic ? "text-[#60a5fa]" : "text-[#f59e0b]"}>
                {line.content}
              </span>
            ) : (
              <span className={isClassic ? "text-[#e0e0e0]" : "text-[#4ade80]/90"}>
                {line.content}
              </span>
            )}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-1">
          <span className={isClassic ? "text-[#60a5fa]" : "text-[#f59e0b]"}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none caret-transparent ${
              isClassic ? "text-[#e0e0e0]" : "text-[#4ade80]"
            }`}
            autoFocus
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className={`terminal-cursor ${isClassic ? "text-[#60a5fa]" : "text-[#4ade80]"}`}>
            {"_"}
          </span>
        </div>
      </div>
    </div>
  )
}
