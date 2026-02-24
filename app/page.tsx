"use client"

import { useCallback } from "react"
import { OSProvider, useOS } from "@/lib/os-context"
import { BootScreen } from "@/components/os/boot-screen"
import { DesktopShell } from "@/components/os/desktop-shell"

function PortfolioOS() {
  const { state, dispatch } = useOS()

  const handleBootComplete = useCallback(() => {
    dispatch({ type: "BOOT_COMPLETE" })
  }, [dispatch])

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
