import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Battery, Clock, TrendingUp } from "lucide-react"

interface ConsumptionMetric {
  title: string
  value: string
  unit: string
  icon: React.ReactNode
  trend?: string
  trendDirection?: "up" | "down" | "stable"
}

export function ConsumptionMetricsGrid() {
  const metrics: ConsumptionMetric[] = [
    {
      title: "Total Consumption",
      value: "2,450",
      unit: "kWh",
      icon: <Zap className="h-5 w-5 text-primary" />,
      trend: "+125 kWh",
      trendDirection: "up",
    },
    {
      title: "Storage Usage",
      value: "680",
      unit: "kWh",
      icon: <Battery className="h-5 w-5 text-orange-500" />,
      trend: "-45 kWh",
      trendDirection: "down",
    },
    {
      title: "Peak Demand",
      value: "185",
      unit: "kW",
      icon: <TrendingUp className="h-5 w-5 text-red-500" />,
      trend: "+12 kW",
      trendDirection: "up",
    },
    {
      title: "Avg Load Factor",
      value: "0.78",
      unit: "",
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      trend: "+0.05",
      trendDirection: "up",
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
                      ? "text-red-600"
                      : metric.trendDirection === "down"
                        ? "text-green-600"
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
