"use client"

import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { Box, CssBaseline, useMediaQuery } from "@mui/material"
import AppNavigation from "./components/AppNavigation"
import TopBar from "./components/TopBar"
import Dashboard from "./pages/Dashboard"
import Inventory from "./pages/Inventory"
import Projects from "./pages/Projects"
import Tools from "./pages/Tools"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import MobileNavigation from "./components/MobileNavigation"
import { useTheme } from "./contexts/ThemeContext"

const App: React.FC = () => {
  const { theme } = useTheme()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const isMobile = useMediaQuery("(max-width:600px)")
  const location = useLocation()

  React.useEffect(() => {
    // Close drawer when route changes on mobile
    if (isMobile) {
      setDrawerOpen(false)
    }
  }, [location, isMobile])

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <AppContainer>
      <CssBaseline />
      <TopBar onMenuClick={handleDrawerToggle} />

      {isMobile ? (
        <MobileNavigation open={drawerOpen} onClose={handleDrawerToggle} />
      ) : (
        <AppNavigation open={drawerOpen} />
      )}

      <Main open={drawerOpen} isMobile={isMobile}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Main>
    </AppContainer>
  )
}

const drawerWidth = 240

const AppContainer = styled("div")({
  display: "flex",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
})

const Main = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<{
  open?: boolean
  isMobile?: boolean
}>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? 0 : `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  overflowY: "auto",
}))

const Toolbar = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}))

export default App

