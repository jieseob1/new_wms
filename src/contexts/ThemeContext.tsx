"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { ThemeProvider as MuiThemeProvider, createTheme, type Theme } from "@mui/material/styles"
import { koKR } from "@mui/material/locale"
import type { PaletteMode } from "@mui/material"

type ThemeContextType = {
  mode: PaletteMode
  toggleTheme: () => void
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("themeMode") as PaletteMode
    return savedMode || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  })

  useEffect(() => {
    localStorage.setItem("themeMode", mode)
  }, [mode])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode,
            primary: {
              main: "#2196f3",
            },
            secondary: {
              main: "#f50057",
            },
            background: {
              default: mode === "light" ? "#f5f5f5" : "#121212",
              paper: mode === "light" ? "#ffffff" : "#1e1e1e",
            },
          },
          typography: {
            fontFamily: [
              "Noto Sans KR",
              "-apple-system",
              "BlinkMacSystemFont",
              '"Segoe UI"',
              "Roboto",
              '"Helvetica Neue"',
              "Arial",
              "sans-serif",
            ].join(","),
          },
          components: {
            MuiCssBaseline: {
              styleOverrides: {
                body: {
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: mode === "light" ? "#f1f1f1" : "#2d2d2d",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: mode === "light" ? "#bdbdbd" : "#5c5c5c",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: mode === "light" ? "#9e9e9e" : "#6e6e6e",
                  },
                },
              },
            },
          },
        },
        koKR,
      ),
    [mode],
  )

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

