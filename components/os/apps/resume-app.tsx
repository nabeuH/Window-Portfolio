"use client"

import { useOS } from "@/lib/os-context"
import { FileText, Download, Eye, Clock } from "lucide-react"

export function ResumeApp() {
  const { state } = useOS()
  const isClassic = state.theme === "classic"

  return (
    <div
      className={`flex flex-col p-4 gap-4 ${
        isClassic ? "text-[#1e293b]" : "text-[#e0e0e0]"
      }`}
      style={{ width: 550, minHeight: 380 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-sm ${
            isClassic ? "bg-[#2563eb]" : "bg-[#1e293b] border border-[#4ade80]/30"
          }`}
        >
          <FileText size={20} className={isClassic ? "text-white" : "text-[#4ade80]"} />
        </div>
        <div>
          <h2 className={`text-sm font-bold ${isClassic ? "" : "text-[#e0e0e0]"}`}>
            Resume
          </h2>
          <p className={`text-xs ${isClassic ? "text-[#475569]" : "text-[#94a3b8]"}`}>
            Developer_Resume_2026.pdf
          </p>
        </div>
      </div>

      {/* Preview area */}
      <div
        className={`flex-1 flex flex-col items-center justify-center rounded-sm border-2 border-dashed p-8 ${
          isClassic
            ? "border-[#94a3b8] bg-white"
            : "border-[#334155] bg-[#0a0f1a]"
        }`}
      >
        <FileText
          size={48}
          className={isClassic ? "text-[#94a3b8] mb-3" : "text-[#334155] mb-3"}
        />
        <p
          className={`text-sm font-medium mb-1 ${
            isClassic ? "text-[#475569]" : "text-[#94a3b8]"
          }`}
        >
          Resume Preview
        </p>
        <p
          className={`text-xs ${
            isClassic ? "text-[#94a3b8]" : "text-[#475569]"
          }`}
        >
          {/* Future: embed PDF or rich preview here */}
          PDF document ready for viewing
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            isClassic
              ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8]"
              : "bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30 hover:bg-[#4ade80]/20"
          }`}
        >
          <Eye size={14} />
          View Resume
        </button>
        <button
          className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            isClassic
              ? "bg-[#f1f5f9] text-[#1e293b] border border-[#94a3b8] hover:bg-[#e2e8f0]"
              : "bg-[#1e293b] text-[#e0e0e0] border border-[#334155] hover:border-[#4ade80]/20"
          }`}
        >
          <Download size={14} />
          Download
        </button>
      </div>

      {/* Metadata */}
      <div
        className={`rounded-sm border p-3 ${
          isClassic ? "bg-[#f8fafc] border-[#94a3b8]" : "bg-[#1e293b]/30 border-[#334155]"
        }`}
      >
        <h3
          className={`text-[10px] uppercase tracking-wider font-bold mb-2 ${
            isClassic ? "text-[#475569]" : "text-[#4ade80]/60"
          }`}
        >
          {isClassic ? "Document Info" : "// FILE METADATA"}
        </h3>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "Filename", value: "Developer_Resume_2026.pdf" },
            { label: "Format", value: "PDF Document" },
            { label: "Size", value: "142 KB" },
          ].map((item) => (
            <div key={item.label} className="flex items-center text-xs">
              <span className={`w-20 font-mono ${isClassic ? "text-[#94a3b8]" : "text-[#475569]"}`}>
                {item.label}:
              </span>
              <span className={isClassic ? "text-[#475569]" : "text-[#94a3b8]"}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className={`flex items-center gap-1.5 mt-2 pt-2 border-t text-[10px] ${
          isClassic ? "border-[#e2e8f0] text-[#94a3b8]" : "border-[#334155]/50 text-[#475569]"
        }`}>
          <Clock size={10} />
          Last Updated: February 2026
        </div>
      </div>
    </div>
  )
}
