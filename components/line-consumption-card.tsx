import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Zap, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LineConsumption {
  lineId: string
  lineName: string
  currentLoad: number
  maxCapacity: number
  percentage: number
  status: "normal" | "high" | "overload"
  powerFactor: number
}

interface LineConsumptionCardProps {
  lines: LineConsumption[]
}

export function LineConsumptionCard({ lines }: LineConsumptionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "overload":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-primary"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Line Consumption
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {lines.map((line) => (
          <div key={line.lineId} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{line.lineName}</span>
                {line.status === "overload" && <AlertTriangle className="h-4 w-4 text-red-500" />}
              </div>
              <Badge variant="outline" className={getStatusColor(line.status)}>
                {line.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Load</span>
                <span className="font-medium">
                  {line.currentLoad} / {line.maxCapacity} kW
                </span>
              </div>
              <Progress value={line.percentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{line.percentage}% capacity</span>
                <span>PF: {line.powerFactor}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
