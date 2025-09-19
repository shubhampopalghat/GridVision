"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Battery, BarChart3, Zap, Network, Settings, Info, AlertTriangle, CheckCircle } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Application {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  status: "active" | "inactive" | "maintenance"
  lastUpdated: string
  dependencies?: string[]
  criticalLevel: "low" | "medium" | "high"
}

const applications: Application[] = [
  {
    id: "generation",
    name: "Power Generation",
    description: "Monitor and control solar panels, wind turbines, and other renewable energy sources",
    icon: Zap,
    href: "/dashboard",
    status: "active",
    lastUpdated: "2 minutes ago",
    dependencies: [],
    criticalLevel: "high"
  },
  {
    id: "storage",
    name: "Energy Storage",
    description: "Battery management system for energy storage and distribution optimization",
    icon: Battery,
    href: "/storage",
    status: "active",
    lastUpdated: "5 minutes ago",
    dependencies: ["generation"],
    criticalLevel: "high"
  },
  {
    id: "consumption",
    name: "Energy Consumption",
    description: "Track and analyze energy usage patterns across all connected devices",
    icon: BarChart3,
    href: "/consumption",
    status: "active",
    lastUpdated: "1 minute ago",
    dependencies: ["generation", "storage"],
    criticalLevel: "medium"
  },
  {
    id: "distribution",
    name: "Grid Distribution",
    description: "Smart grid management and load balancing across the microgrid network",
    icon: Network,
    href: "/distribution",
    status: "active",
    lastUpdated: "3 minutes ago",
    dependencies: ["generation", "storage"],
    criticalLevel: "high"
  }
]

export default function ApplicationsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("enabledApps")
      if (raw) {
        const parsed = JSON.parse(raw)
        setEnabled(parsed)
      } else {
        // Default all to enabled
        const defaultEnabled = applications.reduce((acc, app) => {
          acc[app.id] = true
          return acc
        }, {} as Record<string, boolean>)
        setEnabled(defaultEnabled)
      }
    } catch {
      // Default all to enabled on error
      const defaultEnabled = applications.reduce((acc, app) => {
        acc[app.id] = true
        return acc
      }, {} as Record<string, boolean>)
      setEnabled(defaultEnabled)
    } finally {
      setLoading(false)
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("enabledApps", JSON.stringify(enabled))
      } catch {
        // ignore
      }
    }
  }, [enabled, loading])

  const toggleApp = useCallback((id: string) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const enableAll = useCallback(() => {
    const allEnabled = applications.reduce((acc, app) => {
      acc[app.id] = true
      return acc
    }, {} as Record<string, boolean>)
    setEnabled(allEnabled)
  }, [])

  const disableAll = useCallback(() => {
    const allDisabled = applications.reduce((acc, app) => {
      acc[app.id] = false
      return acc
    }, {} as Record<string, boolean>)
    setEnabled(allDisabled)
  }, [])

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "active":
        return "text-green-600 dark:text-green-400"
      case "inactive":
        return "text-gray-500 dark:text-gray-400"
      case "maintenance":
        return "text-yellow-600 dark:text-yellow-400"
      default:
        return "text-gray-500 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "inactive":
        return <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      default:
        return <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    }
  }

  const getCriticalityBadge = (level: Application["criticalLevel"]) => {
    const variants = {
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    }
    
    return (
      <Badge variant="secondary" className={cn("text-xs", variants[level])}>
        {level.toUpperCase()}
      </Badge>
    )
  }

  const enabledCount = Object.values(enabled).filter(Boolean).length
  const totalCount = applications.length

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading applications...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applications Management</h1>
            <p className="text-muted-foreground mt-1">
              Control and monitor your microgrid applications
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {enabledCount}/{totalCount} Active
            </Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={enableAll} variant="outline" size="sm">
                Enable All
              </Button>
              <Button onClick={disableAll} variant="outline" size="sm">
                Disable All
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{enabledCount} of {totalCount} applications enabled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.map((app) => {
            const Icon = app.icon
            const isEnabled = enabled[app.id] ?? true
            const hasDependencies = app.dependencies && app.dependencies.length > 0
            const dependenciesEnabled = app.dependencies?.every(dep => enabled[dep]) ?? true

            return (
              <Card key={app.id} className={cn(
                "transition-all duration-200",
                !isEnabled && "opacity-60 bg-muted/30"
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        isEnabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(app.status)}
                          <span className={cn("text-sm font-medium", getStatusColor(app.status))}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                          {getCriticalityBadge(app.criticalLevel)}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={() => toggleApp(app.id)}
                      disabled={!dependenciesEnabled && !isEnabled}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {app.description}
                  </p>
                  
                  {hasDependencies && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Dependencies:</p>
                      <div className="flex flex-wrap gap-1">
                        {app.dependencies?.map((depId) => {
                          const depApp = applications.find(a => a.id === depId)
                          const depEnabled = enabled[depId]
                          return (
                            <Badge
                              key={depId}
                              variant={depEnabled ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {depApp?.name || depId}
                            </Badge>
                          )
                        })}
                      </div>
                      {!dependenciesEnabled && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">
                          ⚠️ Some dependencies are disabled
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">
                      Updated {app.lastUpdated}
                    </span>
                    <Link href={app.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!isEnabled}
                        className="text-xs"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="font-medium text-green-900 dark:text-green-100">System Healthy</p>
                <p className="text-sm text-green-700 dark:text-green-300">All critical systems operational</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="font-medium text-blue-900 dark:text-blue-100">Performance</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">95% efficiency rating</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <Network className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="font-medium text-purple-900 dark:text-purple-100">Connectivity</p>
                <p className="text-sm text-purple-700 dark:text-purple-300">All nodes connected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
