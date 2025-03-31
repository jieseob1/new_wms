"use client"

import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { styled } from "@mui/material/styles"
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  Handyman as HandymanIcon,
  Assessment as AssessmentIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"

interface AppNavigationProps {
  open: boolean
}

const drawerWidth = 240

const AppNavigation: React.FC<AppNavigationProps> = ({ open }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { text: "대시보드", icon: <DashboardIcon />, path: "/" },
    { text: "재고 관리", icon: <InventoryIcon />, path: "/inventory" },
    { text: "현장 관리", icon: <BusinessIcon />, path: "/projects" },
    { text: "공구 관리", icon: <HandymanIcon />, path: "/tools" },
    { text: "보고서", icon: <AssessmentIcon />, path: "/reports" },
    { text: "통계", icon: <BarChartIcon />, path: "/analytics" },
  ]

  const settingsItems = [{ text: "설정", icon: <SettingsIcon />, path: "/settings" }]

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          인테리어 WMS
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {settingsItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  )
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    width: drawerWidth,
    overflowX: "hidden",
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
  ...(!open && {
    width: theme.spacing(7),
    overflowX: "hidden",
    "& .MuiDrawer-paper": {
      width: theme.spacing(7),
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  }),
}))

export default AppNavigation

