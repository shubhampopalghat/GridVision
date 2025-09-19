"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Network, Power, AlertTriangle, CheckCircle } from "lucide-react"

interface LineControl {
  lineId: string
  lineName: string
  isActive: boolean
  currentPower: number
  maxPower: number
  voltage: number
  current: number
  status: "online" | "offline" | "maintenance" | "fault"
  lastUpdate: string
}

interface LineControlPanelProps {
  lines: LineControl[]
  onToggleLine?: (lineId: string, active: boolean) => void
  onPowerAdjust?: (lineId: string, power: number) => void
}

export function LineControlPanel({ lines, onToggleLine, onPowerAdjust }: LineControlPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fault":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Power className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "fault":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          Line Control Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {lines.map((line) => (
          <div key={line.lineId} className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(line.status)}
                <span className="font-semibold">{line.lineName}</span>
                <Badge variant="outline" className={getStatusColor(line.status)}>
                  {line.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Active</span>
                <Switch
                  checked={line.isActive}
                  onCheckedChange={(checked) => onToggleLine?.(line.lineId, checked)}
                  disabled={line.status === "fault" || line.status === "maintenance"}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Voltage:</span>
                <div className="font-medium">{line.voltage}V</div>
              </div>
              <div>
                <span className="text-muted-foreground">Current:</span>
                <div className="font-medium">{line.current}A</div>
              </div>
              <div>
                <span className="text-muted-foreground">Power:</span>
                <div className="font-medium">
                  {line.currentPower}/{line.maxPower} kW
                </div>
              </div>
            </div>

            {line.isActive && line.status === "online" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Power Allocation</span>
                  <span className="font-medium">{line.currentPower} kW</span>
                </div>
                <Slider
                  value={[line.currentPower]}
                  onValueChange={(value) => onPowerAdjust?.(line.lineId, value[0])}
                  max={line.maxPower}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 kW</span>
                  <span>{line.maxPower} kW</span>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">Last updated: {line.lastUpdate}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
