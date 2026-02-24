"use client"

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from "react"

export type AppId = "projects" | "about" | "resume" | "contact" | "terminal"
export type ThemeMode = "ops" | "classic"

export interface WindowState {
  id: AppId
  title: string
  minimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  isMaximized: boolean
  previousPosition: { x: number; y: number } | null
  previousSize: { width: number; height: number } | null
}

interface OSState {
  bootComplete: boolean
  theme: ThemeMode
  windows: WindowState[]
  activeWindowId: AppId | null
  selectedIcon: string | null
  startMenuOpen: boolean
  nextZIndex: number
}

type OSAction =
  | { type: "BOOT_COMPLETE" }
  | { type: "SET_THEME"; theme: ThemeMode }
  | { type: "OPEN_WINDOW"; app: AppId }
  | { type: "CLOSE_WINDOW"; id: AppId }
  | { type: "MINIMIZE_WINDOW"; id: AppId }
  | { type: "RESTORE_WINDOW"; id: AppId }
  | { type: "FOCUS_WINDOW"; id: AppId }
  | { type: "MOVE_WINDOW"; id: AppId; position: { x: number; y: number } }
  | { type: "MAXIMIZE_WINDOW"; id: AppId }
  | { type: "RESTORE_MAXIMIZE"; id: AppId }
  | { type: "SELECT_ICON"; icon: string | null }
  | { type: "TOGGLE_START_MENU" }
  | { type: "CLOSE_START_MENU" }
  | { type: "OPEN_WINDOW_MAXIMIZED"; app: AppId }

const APP_DEFAULTS: Record<AppId, { title: string; width: number; height: number }> = {
  projects: { title: "Projects", width: 750, height: 500 },
  about: { title: "About - System Profile", width: 600, height: 480 },
  resume: { title: "Resume Viewer", width: 550, height: 450 },
  contact: { title: "Contact - Comms", width: 500, height: 420 },
  terminal: { title: "Terminal", width: 650, height: 420 },
}

function getInitialPosition(app: AppId, existingWindows: WindowState[]): { x: number; y: number } {
  const offset = existingWindows.length * 30
  const base: Record<AppId, { x: number; y: number }> = {
    projects: { x: 80, y: 40 },
    about: { x: 150, y: 60 },
    resume: { x: 200, y: 80 },
    contact: { x: 250, y: 50 },
    terminal: { x: 120, y: 100 },
  }
  return { x: base[app].x + offset, y: base[app].y + offset }
}

const initialState: OSState = {
  bootComplete: false,
  theme: "ops",
  windows: [],
  activeWindowId: null,
  selectedIcon: null,
  startMenuOpen: false,
  nextZIndex: 10,
}

function osReducer(state: OSState, action: OSAction): OSState {
  switch (action.type) {
    case "BOOT_COMPLETE":
      return { ...state, bootComplete: true }

    case "SET_THEME":
      return { ...state, theme: action.theme }

    case "OPEN_WINDOW": {
      const existing = state.windows.find((w) => w.id === action.app)
      if (existing) {
        return {
          ...state,
          startMenuOpen: false,
          windows: state.windows.map((w) =>
            w.id === action.app
              ? { ...w, minimized: false, zIndex: state.nextZIndex }
              : w
          ),
          activeWindowId: action.app,
          nextZIndex: state.nextZIndex + 1,
        }
      }
      const defaults = APP_DEFAULTS[action.app]
      const newWindow: WindowState = {
        id: action.app,
        title: defaults.title,
        minimized: false,
        position: getInitialPosition(action.app, state.windows),
        size: { width: defaults.width, height: defaults.height },
        zIndex: state.nextZIndex,
        isMaximized: false,
        previousPosition: null,
        previousSize: null,
      }
      return {
        ...state,
        startMenuOpen: false,
        windows: [...state.windows, newWindow],
        activeWindowId: action.app,
        nextZIndex: state.nextZIndex + 1,
      }
    }

    case "CLOSE_WINDOW":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
        activeWindowId:
          state.activeWindowId === action.id
            ? state.windows.filter((w) => w.id !== action.id).sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null
            : state.activeWindowId,
      }

    case "MINIMIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
        activeWindowId:
          state.activeWindowId === action.id
            ? state.windows
                .filter((w) => w.id !== action.id && !w.minimized)
                .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null
            : state.activeWindowId,
      }

    case "RESTORE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, minimized: false, zIndex: state.nextZIndex }
            : w
        ),
        activeWindowId: action.id,
        nextZIndex: state.nextZIndex + 1,
      }

    case "FOCUS_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, zIndex: state.nextZIndex } : w
        ),
        activeWindowId: action.id,
        nextZIndex: state.nextZIndex + 1,
        startMenuOpen: false,
      }

    case "MOVE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, position: action.position } : w
        ),
      }

    case "MAXIMIZE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                isMaximized: true,
                previousPosition: w.position,
                previousSize: w.size,
                position: { x: 0, y: 0 },
                size: { width: 9999, height: 9999 },
                zIndex: state.nextZIndex,
              }
            : w
        ),
        activeWindowId: action.id,
        nextZIndex: state.nextZIndex + 1,
      }

    case "RESTORE_MAXIMIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                isMaximized: false,
                position: w.previousPosition ?? w.position,
                size: w.previousSize ?? w.size,
                previousPosition: null,
                previousSize: null,
                zIndex: state.nextZIndex,
              }
            : w
        ),
        activeWindowId: action.id,
        nextZIndex: state.nextZIndex + 1,
      }

    case "OPEN_WINDOW_MAXIMIZED": {
      const existingMax = state.windows.find((w) => w.id === action.app)
      if (existingMax) {
        return {
          ...state,
          startMenuOpen: false,
          windows: state.windows.map((w) =>
            w.id === action.app
              ? {
                  ...w,
                  minimized: false,
                  isMaximized: true,
                  previousPosition: w.previousPosition ?? w.position,
                  previousSize: w.previousSize ?? w.size,
                  position: { x: 0, y: 0 },
                  size: { width: 9999, height: 9999 },
                  zIndex: state.nextZIndex,
                }
              : w
          ),
          activeWindowId: action.app,
          nextZIndex: state.nextZIndex + 1,
        }
      }
      const defaultsMax = APP_DEFAULTS[action.app]
      const basePos = getInitialPosition(action.app, state.windows)
      const newMaxWindow: WindowState = {
        id: action.app,
        title: defaultsMax.title,
        minimized: false,
        position: { x: 0, y: 0 },
        size: { width: 9999, height: 9999 },
        zIndex: state.nextZIndex,
        isMaximized: true,
        previousPosition: basePos,
        previousSize: { width: defaultsMax.width, height: defaultsMax.height },
      }
      return {
        ...state,
        startMenuOpen: false,
        windows: [...state.windows, newMaxWindow],
        activeWindowId: action.app,
        nextZIndex: state.nextZIndex + 1,
      }
    }

    case "SELECT_ICON":
      return { ...state, selectedIcon: action.icon, startMenuOpen: false }

    case "TOGGLE_START_MENU":
      return { ...state, startMenuOpen: !state.startMenuOpen }

    case "CLOSE_START_MENU":
      return { ...state, startMenuOpen: false }

    default:
      return state
  }
}

interface OSContextType {
  state: OSState
  dispatch: React.Dispatch<OSAction>
  openApp: (app: AppId) => void
  closeApp: (id: AppId) => void
  minimizeApp: (id: AppId) => void
  restoreApp: (id: AppId) => void
  focusApp: (id: AppId) => void
  maximizeApp: (id: AppId) => void
  restoreMaximize: (id: AppId) => void
  openAppMaximized: (app: AppId) => void
}

const OSContext = createContext<OSContextType | null>(null)

export function OSProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(osReducer, initialState)

  const openApp = useCallback((app: AppId) => dispatch({ type: "OPEN_WINDOW", app }), [])
  const closeApp = useCallback((id: AppId) => dispatch({ type: "CLOSE_WINDOW", id }), [])
  const minimizeApp = useCallback((id: AppId) => dispatch({ type: "MINIMIZE_WINDOW", id }), [])
  const restoreApp = useCallback((id: AppId) => dispatch({ type: "RESTORE_WINDOW", id }), [])
  const focusApp = useCallback((id: AppId) => dispatch({ type: "FOCUS_WINDOW", id }), [])
  const maximizeApp = useCallback((id: AppId) => dispatch({ type: "MAXIMIZE_WINDOW", id }), [])
  const restoreMaximize = useCallback((id: AppId) => dispatch({ type: "RESTORE_MAXIMIZE", id }), [])
  const openAppMaximized = useCallback((app: AppId) => dispatch({ type: "OPEN_WINDOW_MAXIMIZED", app }), [])

  return (
    <OSContext.Provider
      value={{ state, dispatch, openApp, closeApp, minimizeApp, restoreApp, focusApp, maximizeApp, restoreMaximize, openAppMaximized }}
    >
      {children}
    </OSContext.Provider>
  )
}

export function useOS() {
  const ctx = useContext(OSContext)
  if (!ctx) throw new Error("useOS must be used within OSProvider")
  return ctx
}
