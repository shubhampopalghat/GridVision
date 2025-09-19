import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface MLAdviceCardProps {
  recommendations: Array<{
    type: "info" | "warning" | "success" | "critical"
    message: string
  }>
}

export function MLAdviceCard({ recommendations }: MLAdviceCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => (
          <Alert key={index} variant={rec.type === "critical" ? "destructive" : "default"}>
            {getIcon(rec.type)}
            <AlertDescription>{rec.message}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
