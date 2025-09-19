import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, Wind, Thermometer } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WeatherPredictionCardProps {
  temperature: number
  cloudCover: number
  windSpeed: number
  prediction: string
  efficiency: number
}

export function WeatherPredictionCard({
  temperature,
  cloudCover,
  windSpeed,
  prediction,
  efficiency,
}: WeatherPredictionCardProps) {
  const getEfficiencyColor = () => {
    if (efficiency >= 80) return "bg-green-100 text-green-800 border-green-200"
    if (efficiency >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-red-100 text-red-800 border-red-200"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-primary" />
            Weather Impact
          </span>
          <Badge variant="outline" className={getEfficiencyColor()}>
            {efficiency}% Efficiency
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Temp</p>
              <p className="font-semibold">{temperature}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm text-muted-foreground">Cloud</p>
              <p className="font-semibold">{cloudCover}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold">{windSpeed} m/s</p>
            </div>
          </div>
        </div>
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-sm text-foreground">{prediction}</p>
        </div>
      </CardContent>
    </Card>
  )
}
