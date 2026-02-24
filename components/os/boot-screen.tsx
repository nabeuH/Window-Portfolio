"use client"

import { useState, useEffect } from "react"

const BOOT_MESSAGES = [
  "[BOOT] Initializing Portfolio OS v2.6.1...",
  "[BIOS] Memory check... 16384 MB OK",
  "[BIOS] Loading kernel modules...",
  "[SYS] Mounting filesystem /dev/portfolio0",
  "[SYS] Loading display driver... OK",
  "[NET] Establishing secure connection... CONNECTED",
  "[AUTH] Verifying credentials... ACCESS GRANTED",
  "[SYS] Loading user profile...",
  "[SYS] Initializing window manager...",
  "[OK] System ready. Welcome, Operator.",
]

interface BootScreenProps {
  onComplete: () => void
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showReady, setShowReady] = useState(false)

  useEffect(() => {
    if (visibleLines < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1)
      }, 150 + Math.random() * 100)
      return () => clearTimeout(timer)
    } else {
      const readyTimer = setTimeout(() => setShowReady(true), 300)
      return () => clearTimeout(readyTimer)
    }
  }, [visibleLines])

  useEffect(() => {
    if (showReady) {
      const timer = setTimeout(onComplete, 800)
      return () => clearTimeout(timer)
    }
  }, [showReady, onComplete])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-2xl px-8">
        <div className="mb-6 font-mono text-sm text-[#4ade80]">
          {BOOT_MESSAGES.slice(0, visibleLines).map((msg, i) => (
            <div
              key={i}
              className="boot-line py-0.5"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {msg.includes("ACCESS GRANTED") ? (
                <span className="text-[#f59e0b] font-bold">{msg}</span>
              ) : msg.includes("OK") || msg.includes("CONNECTED") ? (
                <>
                  {msg.split(/(OK|CONNECTED)/)[0]}
                  <span className="text-[#4ade80] font-bold">
                    {msg.includes("OK") ? "OK" : "CONNECTED"}
                  </span>
                </>
              ) : (
                msg
              )}
            </div>
          ))}
        </div>

        {visibleLines < BOOT_MESSAGES.length && (
          <div className="flex items-center gap-2 font-mono text-sm text-[#4ade80]/60">
            <span className="terminal-cursor">_</span>
          </div>
        )}

        {showReady && (
          <div className="mt-6 boot-line">
            <div className="h-1 w-full overflow-hidden rounded-sm bg-[#1e293b]">
              <div
                className="h-full bg-[#4ade80] transition-all duration-700 ease-out"
                style={{ width: "100%" }}
              />
            </div>
            <p className="mt-2 font-mono text-xs text-[#4ade80]/80 text-center ops-glow">
              SYSTEM ONLINE
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
