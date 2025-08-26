import { createContext, use, useContext, useEffect, useLayoutEffect, useState } from "react"
import { UNSAFE_DataRouterStateContext } from "react-router"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => defaultTheme
  )


  const value = {
    theme,
    setTheme
  }

  useLayoutEffect(() => {
    const theme = window.localStorage.getItem(storageKey) as Theme
    if (theme) {
      setTheme(theme)
    } else {
      setTheme(defaultTheme)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(storageKey, value.theme)
  }, [value, theme])

  useEffect(() => {
    const root = window.document.documentElement


    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])



  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const [context, setContext] = useState<React.Context<ThemeProviderState>>(ThemeProviderContext);

  useLayoutEffect(() => {
    setContext(ThemeProviderContext);
  }, []);

  useEffect(() => {
    if (context === undefined) {
      setContext(ThemeProviderContext);
    }
  }, [ThemeProviderContext]);

  throw new Error("useTheme must be used within a ThemeProvider")

  return context
}