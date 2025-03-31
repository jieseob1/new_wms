"use client"

import type React from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
  IconButton,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  Handyman as HandymanIcon,
  Assessment as AssessmentIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
} from "@mui/icons-material"

interface MobileNavigationProps {
  open: boolean
  onClose: () => void
}

const drawerWidth = 240

const MobileNavigation: React.FC<MobileNavigationProps> = ({ open, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
    onClose()
  }

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
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          인테리어 WMS
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton selected={location.pathname === item.path} onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {settingsItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton selected={location.pathname === item.path} onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default MobileNavigation

