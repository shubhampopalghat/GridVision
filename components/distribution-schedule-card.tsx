"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Play, Pause, Square, Edit } from "lucide-react"

interface DistributionSchedule {
  lineId: string
  lineName: string
  startTime: string
  endTime: string
  duration: string
  status: "active" | "scheduled" | "completed" | "paused"
  priority: "high" | "medium" | "low"
  powerAllocation: number
}

interface DistributionScheduleCardProps {
  schedules: DistributionSchedule[]
  onEdit?: (lineId: string) => void
  onStart?: (lineId: string) => void
  onPause?: (lineId: string) => void
  onStop?: (lineId: string) => void
}

export function DistributionScheduleCard({
  schedules,
  onEdit,
  onStart,
  onPause,
  onStop,
}: DistributionScheduleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Distribution Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.lineId} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground">{schedule.lineName}</span>
                <Badge variant="outline" className={getStatusColor(schedule.status)}>
                  {schedule.status}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(schedule.priority)}>
                  {schedule.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <Button variant="ghost" size="sm" onClick={() => onEdit(schedule.lineId)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {schedule.status === "scheduled" && onStart && (
                  <Button variant="ghost" size="sm" onClick={() => onStart(schedule.lineId)}>
                    <Play className="h-4 w-4" />
                  </Button>
                )}
                {schedule.status === "active" && onPause && (
                  <Button variant="ghost" size="sm" onClick={() => onPause(schedule.lineId)}>
                    <Pause className="h-4 w-4" />
                  </Button>
                )}
                {(schedule.status === "active" || schedule.status === "paused") && onStop && (
                  <Button variant="ghost" size="sm" onClick={() => onStop(schedule.lineId)}>
                    <Square className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Start Time:</span>
                <div className="font-medium">{schedule.startTime}</div>
              </div>
              <div>
                <span className="text-muted-foreground">End Time:</span>
                <div className="font-medium">{schedule.endTime}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <div className="font-medium">{schedule.duration}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Power:</span>
                <div className="font-medium">{schedule.powerAllocation} kW</div>
              </div>
            </div>

            <div className="bg-muted p-2 rounded text-sm">
              <span className="text-muted-foreground">Schedule: </span>
              <span className="text-foreground">
                {schedule.lineName} → {schedule.startTime} → {schedule.endTime} ({schedule.duration})
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
