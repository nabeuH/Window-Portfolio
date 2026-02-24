"use client"

import { useOS, type AppId } from "@/lib/os-context"
import { AppWindow, MobileAppWindow } from "./app-window"
import { ProjectsApp } from "./apps/projects-app"
import { AboutApp } from "./apps/about-app"
import { ResumeApp } from "./apps/resume-app"
import { ContactApp } from "./apps/contact-app"
import { TerminalApp } from "./apps/terminal-app"

const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
  projects: ProjectsApp,
  about: AboutApp,
  resume: ResumeApp,
  contact: ContactApp,
  terminal: TerminalApp,
}

export function WindowManager() {
  const { state } = useOS()

  return (
    <>
      {/* Desktop windows */}
      {state.windows.map((win) => {
        const AppComponent = APP_COMPONENTS[win.id]
        return (
          <AppWindow
            key={win.id}
            id={win.id}
            title={win.title}
            zIndex={win.zIndex}
            position={win.position}
            minimized={win.minimized}
            isActive={state.activeWindowId === win.id}
          >
            <AppComponent />
          </AppWindow>
        )
      })}

      {/* Mobile windows (full-screen) */}
      {state.windows
        .filter((w) => !w.minimized)
        .slice(-1)
        .map((win) => {
          const AppComponent = APP_COMPONENTS[win.id]
          return (
            <MobileAppWindow key={`mobile-${win.id}`} id={win.id} title={win.title}>
              <AppComponent />
            </MobileAppWindow>
          )
        })}
    </>
  )
}
