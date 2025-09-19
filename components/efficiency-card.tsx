import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Gauge, TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EfficiencyCardProps {
  currentEfficiency: number
  targetEfficiency: number
  trend: "up" | "down" | "stable"
  trendValue: string
  status: "excellent" | "good" | "average" | "poor"
}

export function EfficiencyCard({
  currentEfficiency,
  targetEfficiency,
  trend,
  trendValue,
  status,
}: EfficiencyCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "average":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Gauge className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            System Efficiency
          </CardTitle>
          <Badge variant="outline" className={getStatusColor()}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{currentEfficiency}%</div>
          <div className="text-sm text-muted-foreground">Current Efficiency</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Target: {targetEfficiency}%</span>
            <span className="font-medium">
              {currentEfficiency}/{targetEfficiency}%
            </span>
          </div>
          <Progress value={(currentEfficiency / targetEfficiency) * 100} className="h-2" />
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          {getTrendIcon()}
          <span className="text-muted-foreground">{trendValue} from last week</span>
        </div>
      </CardContent>
    </Card>
  )
}
