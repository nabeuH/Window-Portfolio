"use client"

import { useOS } from "@/lib/os-context"
import { useState } from "react"
import { Mail, Github, Linkedin, Globe, Send } from "lucide-react"

const LINKS = [
  { label: "Email", value: "developer@email.com", icon: <Mail size={14} />, href: "mailto:developer@email.com" },
  { label: "GitHub", value: "github.com/developer", icon: <Github size={14} />, href: "https://github.com" },
  { label: "LinkedIn", value: "linkedin.com/in/developer", icon: <Linkedin size={14} />, href: "https://linkedin.com" },
  { label: "Portfolio", value: "developer.dev", icon: <Globe size={14} />, href: "#" },
]

export function ContactApp() {
  const { state } = useOS()
  const isClassic = state.theme === "classic"
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  return (
    <div
      className={`flex flex-col p-4 gap-4 ${
        isClassic ? "text-[#1e293b]" : "text-[#e0e0e0]"
      }`}
      style={{ width: 500, minHeight: 360 }}
    >
      {/* Header */}
      <div>
        <h2 className={`text-sm font-bold mb-1 ${isClassic ? "" : "text-[#e0e0e0]"}`}>
          {isClassic ? "Contact Information" : "COMMS TERMINAL"}
        </h2>
        <p className={`text-xs ${isClassic ? "text-[#475569]" : "text-[#4ade80]/50 font-mono"}`}>
          {isClassic ? "Get in touch" : "// SECURE CHANNEL OPEN"}
        </p>
      </div>

      {/* Contact links */}
      <div
        className={`rounded-sm border ${
          isClassic ? "bg-white border-[#94a3b8]" : "bg-[#1e293b]/30 border-[#334155]"
        }`}
      >
        {LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2.5 text-xs transition-colors ${
              i < LINKS.length - 1
                ? isClassic
                  ? "border-b border-[#e2e8f0]"
                  : "border-b border-[#334155]/50"
                : ""
            } ${
              isClassic
                ? "hover:bg-[#f1f5f9]"
                : "hover:bg-[#1e293b]/50"
            }`}
          >
            <span className={isClassic ? "text-[#2563eb]" : "text-[#4ade80]"}>
              {link.icon}
            </span>
            <span className={`w-16 font-mono font-medium ${isClassic ? "text-[#475569]" : "text-[#94a3b8]"}`}>
              {link.label}
            </span>
            <span className={isClassic ? "text-[#1e293b]" : "text-[#e0e0e0]"}>{link.value}</span>
          </a>
        ))}
      </div>

      {/* Contact form */}
      <div>
        <h3
          className={`text-[10px] uppercase tracking-wider font-bold mb-2 ${
            isClassic ? "text-[#475569]" : "text-[#4ade80]/60"
          }`}
        >
          {isClassic ? "Send a Message" : "// TRANSMIT MESSAGE"}
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`flex-1 rounded-sm border px-2 py-1.5 text-xs outline-none transition-colors ${
                isClassic
                  ? "bg-white border-[#94a3b8] text-[#1e293b] placeholder-[#94a3b8] focus:border-[#2563eb]"
                  : "bg-[#0a0f1a] border-[#334155] text-[#e0e0e0] placeholder-[#475569] focus:border-[#4ade80]/50"
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`flex-1 rounded-sm border px-2 py-1.5 text-xs outline-none transition-colors ${
                isClassic
                  ? "bg-white border-[#94a3b8] text-[#1e293b] placeholder-[#94a3b8] focus:border-[#2563eb]"
                  : "bg-[#0a0f1a] border-[#334155] text-[#e0e0e0] placeholder-[#475569] focus:border-[#4ade80]/50"
              }`}
            />
          </div>
          <textarea
            placeholder={isClassic ? "Your message..." : "Enter transmission..."}
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full rounded-sm border px-2 py-1.5 text-xs outline-none resize-none transition-colors ${
              isClassic
                ? "bg-white border-[#94a3b8] text-[#1e293b] placeholder-[#94a3b8] focus:border-[#2563eb]"
                : "bg-[#0a0f1a] border-[#334155] text-[#e0e0e0] placeholder-[#475569] focus:border-[#4ade80]/50"
            }`}
          />
          <button
            className={`flex items-center justify-center gap-2 rounded-sm py-2 text-xs font-medium transition-colors cursor-pointer ${
              isClassic
                ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
                : "bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30 hover:bg-[#4ade80]/20"
            }`}
          >
            <Send size={12} />
            {isClassic ? "Send Message" : "TRANSMIT"}
          </button>
        </div>
      </div>
    </div>
  )
}
