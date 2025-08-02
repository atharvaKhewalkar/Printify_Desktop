import { useState } from "react"
import { 
  Inbox, 
  PrinterIcon, 
  History, 
  Settings, 
  Sliders, 
  User,
  FileText,
  TrendingUp,
  Printer
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar"

const mainNavItems = [
  { 
    title: "Incoming Jobs", 
    url: "/", 
    icon: Inbox,
    description: "New order requests"
  },
  { 
    title: "Print Queue", 
    url: "/queue", 
    icon: PrinterIcon,
    description: "Jobs in production"
  },
  { 
    title: "History & Earnings", 
    url: "/history", 
    icon: TrendingUp,
    description: "Past jobs & financial data"
  },
]

const settingsItems = [
  { 
    title: "Printing Settings", 
    url: "/printing-settings", 
    icon: Printer,
    description: "Configure printers"
  },
  { 
    title: "App Settings", 
    url: "/app-settings", 
    icon: Settings,
    description: "General preferences"
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  const getNavCls = (path: string) => {
    const active = isActive(path)
    return active 
      ? "bg-primary text-primary-foreground" 
      : "hover:bg-accent hover:text-accent-foreground"
  }

  return (
    <Sidebar
      className="border-r"
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Printer className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className={`overflow-hidden transition-all duration-200 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
            <h2 className="text-lg font-bold text-foreground whitespace-nowrap">
              PrintFlow
            </h2>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium mb-2">
            {!isCollapsed && "Operations"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && (
                        <div>
                          <span className="font-medium">{item.title}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="font-medium mb-2">
            {!isCollapsed && "Configuration"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && (
                        <div>
                          <span className="font-medium">{item.title}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/profile" className={getNavCls("/profile")}>
                    <User className="w-4 h-4 shrink-0" />
                    {!isCollapsed && (
                      <div>
                        <span className="font-medium">Profile</span>
                      </div>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}