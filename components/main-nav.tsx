"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Package, Building2, Hammer, FileText, BarChart3, Settings } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "대시보드",
      href: "/",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      name: "재고 관리",
      href: "/inventory",
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      name: "현장 관리",
      href: "/projects",
      icon: <Building2 className="mr-2 h-4 w-4" />,
    },
    {
      name: "공구 관리",
      href: "/tools",
      icon: <Hammer className="mr-2 h-4 w-4" />,
    },
    {
      name: "보고서",
      href: "/reports",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      name: "통계",
      href: "/analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      name: "설정",
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Package className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">인테리어 WMS</span>
      </Link>
      <div className="flex items-center space-x-4 lg:space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.icon}
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

