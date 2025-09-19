"use client"

import { usePathname } from "next/navigation"
import { DashboardFooter } from "@/components/dashboard-footer"

function getActiveTab(pathname: string): "generation" | "storage" | "consumption" | "distribution" {
  if (pathname.startsWith("/storage")) return "storage"
  if (pathname.startsWith("/consumption")) return "consumption"
  if (pathname.startsWith("/distribution")) return "distribution"
  return "generation"
}

export function StickyFooter() {
  const pathname = usePathname() || "/dashboard"
  const active = getActiveTab(pathname)
  return <DashboardFooter activeTab={active} />
}
