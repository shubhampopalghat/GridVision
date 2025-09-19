"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"
import { StorageLevelCard } from "@/components/storage-level-card"
import { StoragePredictionCard } from "@/components/storage-prediction-card"
import { StorageMetricsGrid } from "@/components/storage-metrics-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

// Mock data for storage analytics
const dailyStorageData = [
  { time: "00:00", stored: 420, used: 15, efficiency: 95 },
  { time: "04:00", stored: 435, used: 12, efficiency: 96 },
  { time: "08:00", stored: 380, used: 45, efficiency: 92 },
  { time: "12:00", stored: 320, used: 85, efficiency: 88 },
  { time: "16:00", stored: 280, used: 95, efficiency: 85 },
  { time: "20:00", stored: 340, used: 75, efficiency: 90 },
]

const monthlyStorageData = [
  { month: "Jan", stored: 12500, used: 11800, capacity: 15000 },
  { month: "Feb", stored: 11200, used: 10900, capacity: 15000 },
  { month: "Mar", stored: 13800, used: 12500, capacity: 15000 },
  { month: "Apr", stored: 14200, used: 13100, capacity: 15000 },
  { month: "May", stored: 14800, used: 13800, capacity: 15000 },
  { month: "Jun", stored: 14500, used: 14200, capacity: 15000 },
]

const storagePredictions = [
  {
    month: "July 2024",
    demand: "high" as const,
    recommendation: "Peak summer demand expected. Increase storage capacity by 20% to handle air conditioning loads.",
    confidence: 87,
  },
  {
    month: "December 2024",
    demand: "high" as const,
    recommendation: "Winter heating season. Maintain high storage levels for backup power during potential outages.",
    confidence: 92,
  },
  {
    month: "April 2024",
    demand: "low" as const,
    recommendation: "Mild weather conditions. Optimal time for maintenance and system optimization.",
    confidence: 78,
  },
  {
    month: "September 2024",
    demand: "medium" as const,
    recommendation: "Transitional period. Moderate storage requirements with focus on efficiency optimization.",
    confidence: 83,
  },
]

export default function StoragePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 space-y-6">
        {/* Storage Overview */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Storage Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StorageLevelCard currentLevel={375} totalCapacity={500} unit="kWh" percentage={75} status="optimal" />
            </div>
            <div className="lg:col-span-2">
              <StorageMetricsGrid />
            </div>
          </div>
        </section>

        {/* Storage Reports */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Storage Reports</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Storage Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Storage Usage (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyStorageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="stored"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="used"
                      stackId="2"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Storage Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Storage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyStorageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="stored" fill="hsl(var(--primary))" />
                    <Bar dataKey="used" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Storage Efficiency Chart */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Storage Efficiency Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyStorageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Storage Predictions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Storage Demand Predictions</h2>
          <StoragePredictionCard predictions={storagePredictions} />
        </section>
      </main>

      <DashboardFooter activeTab="storage" />
    </div>
  )
}
