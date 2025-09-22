"use client"

import { Battery, BarChart3, Zap, Network, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DashboardFooterProps {
  activeTab?: "generation" | "storage" | "consumption" | "distribution"
}

export function DashboardFooter({ activeTab = "generation" }: DashboardFooterProps) {
  const tabs = [
    { id: "generation", label: "Generation", icon: Zap, href: "/dashboard" },
    { id: "storage", label: "Storage", icon: Battery, href: "/storage" },
    { id: "consumption", label: "Consumption", icon: BarChart3, href: "/consumption" },
    { id: "distribution", label: "Distribution", icon: Network, href: "/distribution" },
  ] as const

  type TabId = typeof tabs[number]["id"]

  const [enabled, setEnabled] = useState<Record<TabId, boolean>>({
    generation: true,
    storage: true,
    consumption: true,
    distribution: true
  })

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("enabledApps")
      if (raw) {
        const parsed = JSON.parse(raw)
        setEnabled((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // ignore
    }
  }, [])

  return (
    <footer
      className="fixed bottom-0 left-0  z-[1000] w-full backdrop-blur-md bg-secondary/90 dark:bg-secondary/40 border-t border-border px-2 sm:px-10 py-2 sm:py-6 shadow-sm pb-[env(safe-area-inset-bottom)]"
    >
      <nav className="flex items-center justify-between">
        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const isEnabled = enabled[tab.id as TabId]
            const disabledStyles = !isEnabled ? "opacity-50 pointer-events-none" : ""
            // If disabled, render button without link behavior
            const content = (
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "flex flex-col gap-1 h-auto py-2 px-4 sm:py-3 sm:px-6",
                  isActive && "bg-primary text-primary-foreground",
                  disabledStyles,
                )}
                aria-disabled={!isEnabled}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            )
            return isEnabled ? (
              <Link key={tab.id} href={tab.href}>
                {content}
              </Link>
            ) : (
              <div key={tab.id} aria-disabled className="select-none">
                {content}
              </div>
            )
          })}
        </div>

        {/* Right spacer to balance layout */}
        <div className="pr-1 sm:pr-0" />
      </nav>
    </footer>
  )
}
