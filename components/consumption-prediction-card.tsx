import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ConsumptionPrediction {
  month: string
  expectedConsumption: number
  trend: "increase" | "decrease" | "stable"
  factors: string[]
  recommendation: string
  confidence: number
}

interface ConsumptionPredictionCardProps {
  predictions: ConsumptionPrediction[]
}

export function ConsumptionPredictionCard({ predictions }: ConsumptionPredictionCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "increase":
        return "bg-red-100 text-red-800 border-red-200"
      case "decrease":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Consumption Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTrendIcon(prediction.trend)}
                <span className="font-semibold">{prediction.month}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getTrendColor(prediction.trend)}>
                  {prediction.expectedConsumption} kWh
                </Badge>
                <span className="text-sm text-muted-foreground">{prediction.confidence}% confidence</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Key factors: </span>
                <span className="text-foreground">{prediction.factors.join(", ")}</span>
              </div>
              <div className="bg-muted p-2 rounded text-sm text-foreground">{prediction.recommendation}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
