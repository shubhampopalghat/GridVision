"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Wifi, WifiOff } from "lucide-react"

interface Device {
  id: string
  name: string
  type: "sensor" | "controller" | "monitor"
  status: "online" | "offline" | "maintenance"
  lastSeen: string
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([
    { id: "DEV001", name: "Voltage Sensor A1", type: "sensor", status: "online", lastSeen: "2 minutes ago" },
    { id: "DEV002", name: "Current Monitor B2", type: "monitor", status: "online", lastSeen: "1 minute ago" },
    { id: "DEV003", name: "Power Controller C1", type: "controller", status: "offline", lastSeen: "2 hours ago" },
    { id: "DEV004", name: "Temperature Sensor D1", type: "sensor", status: "maintenance", lastSeen: "1 day ago" },
  ])

  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "sensor" as const,
    deviceId: "",
  })

  const handleAddDevice = () => {
    if (newDevice.name && newDevice.deviceId) {
      const device: Device = {
        id: newDevice.deviceId,
        name: newDevice.name,
        type: newDevice.type,
        status: "offline",
        lastSeen: "Never",
      }
      setDevices((prev) => [...prev, device])
      setNewDevice({ name: "", type: "sensor", deviceId: "" })
    }
  }

  const handleRemoveDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "offline":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    return status === "online" ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Device Management</h1>
          </div>

          {/* Add New Device */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Device</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="deviceName">Device Name</Label>
                  <Input
                    id="deviceName"
                    placeholder="Enter device name"
                    value={newDevice.name}
                    onChange={(e) => setNewDevice((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="deviceType">Device Type</Label>
                  <Select
                    value={newDevice.type}
                    onValueChange={(value: any) => setNewDevice((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sensor">Sensor</SelectItem>
                      <SelectItem value="controller">Controller</SelectItem>
                      <SelectItem value="monitor">Monitor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deviceId">Device ID</Label>
                  <Input
                    id="deviceId"
                    placeholder="Enter device ID"
                    value={newDevice.deviceId}
                    onChange={(e) => setNewDevice((prev) => ({ ...prev, deviceId: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handleAddDevice} disabled={!newDevice.name || !newDevice.deviceId}>
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </CardContent>
          </Card>

          {/* Existing Devices */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Devices ({devices.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(device.status)}
                      <div>
                        <h3 className="font-medium">{device.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {device.id}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {device.type}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(device.status)}>
                        {device.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Last seen: {device.lastSeen}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveDevice(device.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
