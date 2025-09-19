import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Battery, BatteryLow, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StorageLevelCardProps {
  currentLevel: number
  totalCapacity: number
  unit: string
  percentage: number
  status: "optimal" | "low" | "critical" | "full"
}

export function StorageLevelCard({ currentLevel, totalCapacity, unit, percentage, status }: StorageLevelCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "critical":
      case "low":
        return <BatteryLow className="h-5 w-5 text-red-500" />
      case "full":
        return <Battery className="h-5 w-5 text-green-500" />
      default:
        return <Battery className="h-5 w-5 text-primary" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "low":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "full":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getProgressColor = () => {
    if (percentage <= 20) return "bg-red-500"
    if (percentage <= 40) return "bg-yellow-500"
    if (percentage >= 95) return "bg-blue-500"
    return "bg-primary"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon()}
            Storage Level
          </CardTitle>
          <Badge variant="outline" className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current / Total</span>
            <span className="font-medium">
              {currentLevel} / {totalCapacity} {unit}
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
          <div className="text-center">
            <span className="text-2xl font-bold text-foreground">{percentage}%</span>
            <span className="text-sm text-muted-foreground ml-1">capacity</span>
          </div>
        </div>
        {status === "critical" && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Critical storage level - immediate action required</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
