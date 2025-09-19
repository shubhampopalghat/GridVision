"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { SensorDataCard } from "@/components/sensor-data-card"
import { MLAdviceCard } from "@/components/ml-advice-card"
import { WeatherPredictionCard } from "@/components/weather-prediction-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Mock data for demonstration
const sensorData = [
  {
    title: "Voltage",
    value: "240.5",
    unit: "V",
    trend: "stable" as const,
    trendValue: "±0.2V",
    status: "normal" as const,
  },
  { title: "Current", value: "12.8", unit: "A", trend: "up" as const, trendValue: "+0.5A", status: "normal" as const },
  { title: "Power", value: "3.08", unit: "kW", trend: "up" as const, trendValue: "+0.12kW", status: "normal" as const },
  {
    title: "Energy",
    value: "24.6",
    unit: "kWh",
    trend: "up" as const,
    trendValue: "+2.1kWh",
    status: "normal" as const,
  },
  {
    title: "Power Factor",
    value: "0.95",
    unit: "",
    trend: "stable" as const,
    trendValue: "±0.02",
    status: "normal" as const,
  },
]

const mlRecommendations = [
  { type: "success" as const, message: "Optimal generation conditions detected. Current output is 15% above average." },
  {
    type: "warning" as const,
    message: "Wind speed decreasing. Consider adjusting turbine angle for maximum efficiency.",
  },
  { type: "info" as const, message: "Peak demand expected at 6 PM. Prepare for increased load distribution." },
]

const hourlyData = [
  { time: "00:00", power: 2.1, voltage: 238, current: 8.8 },
  { time: "04:00", power: 1.8, voltage: 240, current: 7.5 },
  { time: "08:00", power: 2.9, voltage: 242, current: 12.0 },
  { time: "12:00", power: 3.8, voltage: 245, current: 15.5 },
  { time: "16:00", power: 3.2, voltage: 243, current: 13.2 },
  { time: "20:00", power: 2.7, voltage: 241, current: 11.2 },
]

const energyData = [
  { period: "Mon", daily: 45, weekly: 315, monthly: 1350 },
  { period: "Tue", daily: 52, weekly: 364, monthly: 1402 },
  { period: "Wed", daily: 48, weekly: 336, monthly: 1450 },
  { period: "Thu", daily: 55, weekly: 385, monthly: 1505 },
  { period: "Fri", daily: 49, weekly: 343, monthly: 1554 },
  { period: "Sat", daily: 46, weekly: 322, monthly: 1600 },
  { period: "Sun", daily: 43, weekly: 301, monthly: 1643 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 space-y-6">
        {/* Real-time Sensor Data */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Real-time Sensor Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {sensorData.map((sensor, index) => (
              <SensorDataCard key={index} {...sensor} />
            ))}
          </div>
        </section>

        {/* Reports Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Reports & Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Power Generation Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Power Generation (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="power" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Energy Generation Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Energy Generation (Weekly)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="daily" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Recommendations and Weather */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Insights & Predictions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MLAdviceCard recommendations={mlRecommendations} />
            <WeatherPredictionCard
              temperature={22}
              cloudCover={35}
              windSpeed={8.5}
              prediction="Moderate cloud cover expected. Solar generation will be 20% below optimal. Wind conditions are favorable for turbine operation."
              efficiency={75}
            />
          </div>
        </section>
      </main>

      {/* Footer is now globally sticky via <StickyFooter /> in app/layout.tsx */}
    </div>
  )
}
