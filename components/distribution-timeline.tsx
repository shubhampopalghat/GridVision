import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"

interface TimelineEvent {
  time: string
  lineId: string
  lineName: string
  action: "start" | "end" | "switch" | "maintenance"
  duration?: string
  status: "completed" | "active" | "upcoming"
}

interface DistributionTimelineProps {
  events: TimelineEvent[]
}

export function DistributionTimeline({ events }: DistributionTimelineProps) {
  const getActionColor = (action: string) => {
    switch (action) {
      case "start":
        return "bg-green-100 text-green-800 border-green-200"
      case "end":
        return "bg-red-100 text-red-800 border-red-200"
      case "switch":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-gray-100 text-gray-600"
      case "active":
        return "bg-primary text-primary-foreground"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Distribution Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-4 p-3 border border-border rounded-lg">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{event.time}</span>
                    <Badge variant="outline" className={getActionColor(event.action)}>
                      {event.action}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{event.lineName}</span>
                    {event.duration && <span className="text-sm text-muted-foreground">({event.duration})</span>}
                  </div>
                </div>
              </div>
              <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
