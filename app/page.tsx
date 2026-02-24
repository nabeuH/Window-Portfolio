"use client"

import { useCallback } from "react"
import { OSProvider, useOS } from "@/lib/os-context"
import { BootScreen } from "@/components/os/boot-screen"
import { DesktopShell } from "@/components/os/desktop-shell"

function PortfolioOS() {
  const { state, dispatch, openAppMaximized } = useOS()

  const handleBootComplete = useCallback(() => {
    dispatch({ type: "BOOT_COMPLETE" })
    // Open terminal maximized as the entry point after boot
    openAppMaximized("terminal")
  }, [dispatch, openAppMaximized])

  if (!state.bootComplete) {
    return <BootScreen onComplete={handleBootComplete} />
  }

  return <DesktopShell />
}

export default function Page() {
  return (
    <OSProvider>
      <PortfolioOS />
    </OSProvider>
  )
}
