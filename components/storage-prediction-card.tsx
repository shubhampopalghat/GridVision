import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Calendar, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StoragePredictionCardProps {
  predictions: Array<{
    month: string
    demand: "high" | "medium" | "low"
    recommendation: string
    confidence: number
  }>
}

export function StoragePredictionCard({ predictions }: StoragePredictionCardProps) {
  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case "high":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "low":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Calendar className="h-4 w-4 text-yellow-500" />
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary" />
          Storage Demand Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getDemandIcon(prediction.demand)}
                <span className="font-semibold">{prediction.month}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getDemandColor(prediction.demand)}>
                  {prediction.demand} demand
                </Badge>
                <span className="text-sm text-muted-foreground">{prediction.confidence}% confidence</span>
              </div>
            </div>
            <p className="text-sm text-foreground bg-muted p-2 rounded">{prediction.recommendation}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
