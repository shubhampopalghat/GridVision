import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, Zap, Clock, TrendingUp } from "lucide-react"

interface StorageMetric {
  title: string
  value: string
  unit: string
  icon: React.ReactNode
  trend?: string
  trendDirection?: "up" | "down" | "stable"
}

export function StorageMetricsGrid() {
  const metrics: StorageMetric[] = [
    {
      title: "Total Capacity",
      value: "500",
      unit: "kWh",
      icon: <Battery className="h-5 w-5 text-primary" />,
      trend: "Unchanged",
      trendDirection: "stable",
    },
    {
      title: "Available Storage",
      value: "375",
      unit: "kWh",
      icon: <Zap className="h-5 w-5 text-green-500" />,
      trend: "+25 kWh",
      trendDirection: "up",
    },
    {
      title: "Charge Rate",
      value: "45",
      unit: "kW",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      trend: "+5 kW",
      trendDirection: "up",
    },
    {
      title: "Time to Full",
      value: "2.5",
      unit: "hours",
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      trend: "-30 min",
      trendDirection: "down",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              {metric.icon}
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">{metric.value}</span>
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            </div>
            {metric.trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={`text-sm ${
                    metric.trendDirection === "up"
                      ? "text-green-600"
                      : metric.trendDirection === "down"
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {metric.trend}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
