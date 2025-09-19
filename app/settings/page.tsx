"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, Wind, Sun, Users, Plus, Palette } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [microgridType, setMicrogridType] = useState<"solar" | "wind">("solar")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">System Settings</h1>
          </div>

          {/* MicroGrid Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>MicroGrid Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {microgridType === "solar" ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Wind className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <Label className="text-base font-medium">MicroGrid Type</Label>
                    <p className="text-sm text-muted-foreground">
                      Current configuration: {microgridType === "solar" ? "Solar" : "Wind"} Energy System
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">Solar</span>
                  <Switch
                    checked={microgridType === "wind"}
                    onCheckedChange={(checked) => setMicrogridType(checked ? "wind" : "solar")}
                  />
                  <span className="text-sm">Wind</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Management */}
          <Card>
            <CardHeader>
              <CardTitle>Device Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Connected Devices</h3>
                  <p className="text-sm text-muted-foreground">Manage sensors, controllers, and monitoring devices</p>
                </div>
                <Link href="/settings/devices">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Device
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">System Users</h3>
                    <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
                  </div>
                </div>
                <Link href="/settings/users">
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="text-base font-medium">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Current theme: {theme === "dark" ? "Dark" : "Light"} mode
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">Light</span>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                  <span className="text-sm">Dark</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
