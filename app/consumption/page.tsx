"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"
import { EfficiencyCard } from "@/components/efficiency-card"
import { LineConsumptionCard } from "@/components/line-consumption-card"
import { ConsumptionPredictionCard } from "@/components/consumption-prediction-card"
import { ConsumptionMetricsGrid } from "@/components/consumption-metrics-grid"
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

// Mock data for consumption analytics
const hourlyConsumptionData = [
  { time: "00:00", total: 145, storage: 45, grid: 100, efficiency: 92 },
  { time: "04:00", total: 120, storage: 35, grid: 85, efficiency: 94 },
  { time: "08:00", total: 280, storage: 80, grid: 200, efficiency: 88 },
  { time: "12:00", total: 350, storage: 120, grid: 230, efficiency: 85 },
  { time: "16:00", total: 320, storage: 95, grid: 225, efficiency: 87 },
  { time: "20:00", total: 290, storage: 85, grid: 205, efficiency: 89 },
]

const monthlyConsumptionData = [
  { month: "Jan", total: 18500, storage: 5200, grid: 13300, efficiency: 89 },
  { month: "Feb", total: 16800, storage: 4800, grid: 12000, efficiency: 91 },
  { month: "Mar", total: 19200, storage: 5800, grid: 13400, efficiency: 88 },
  { month: "Apr", total: 20100, storage: 6200, grid: 13900, efficiency: 87 },
  { month: "May", total: 22500, storage: 7100, grid: 15400, efficiency: 85 },
  { month: "Jun", total: 24800, storage: 8200, grid: 16600, efficiency: 83 },
]

const lineConsumptionData = [
  {
    lineId: "L001",
    lineName: "Line 1 - Main Building",
    currentLoad: 145,
    maxCapacity: 200,
    percentage: 72.5,
    status: "normal" as const,
    powerFactor: 0.92,
  },
  {
    lineId: "L002",
    lineName: "Line 2 - Manufacturing",
    currentLoad: 180,
    maxCapacity: 200,
    percentage: 90,
    status: "high" as const,
    powerFactor: 0.88,
  },
  {
    lineId: "L003",
    lineName: "Line 3 - HVAC Systems",
    currentLoad: 95,
    maxCapacity: 150,
    percentage: 63.3,
    status: "normal" as const,
    powerFactor: 0.95,
  },
  {
    lineId: "L004",
    lineName: "Line 4 - Emergency Systems",
    currentLoad: 25,
    maxCapacity: 100,
    percentage: 25,
    status: "normal" as const,
    powerFactor: 0.98,
  },
]

const consumptionPredictions = [
  {
    month: "July 2024",
    expectedConsumption: 26500,
    trend: "increase" as const,
    factors: ["Summer cooling", "Extended daylight hours", "Increased production"],
    recommendation: "Prepare for 15% increase in consumption. Consider load balancing and peak shaving strategies.",
    confidence: 89,
  },
  {
    month: "December 2024",
    expectedConsumption: 23200,
    trend: "increase" as const,
    factors: ["Winter heating", "Holiday operations", "Reduced daylight"],
    recommendation: "Winter peak expected. Ensure adequate storage capacity and backup systems are ready.",
    confidence: 92,
  },
  {
    month: "April 2024",
    expectedConsumption: 18800,
    trend: "decrease" as const,
    factors: ["Mild weather", "Reduced heating/cooling", "Spring maintenance"],
    recommendation: "Optimal period for system maintenance and efficiency improvements.",
    confidence: 85,
  },
]

export default function ConsumptionPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 space-y-6">
        {/* Consumption Overview */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Consumption Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <EfficiencyCard
                currentEfficiency={87}
                targetEfficiency={92}
                trend="up"
                trendValue="+2.3%"
                status="good"
              />
            </div>
            <div className="lg:col-span-3">
              <ConsumptionMetricsGrid />
            </div>
          </div>
        </section>

        {/* Consumption Reports */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Consumption Reports</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hourly Consumption */}
            <Card>
              <CardHeader>
                <CardTitle>Hourly Consumption (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="grid"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="storage"
                      stackId="1"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Consumption Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Consumption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Efficiency Trends */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>System Efficiency Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 95]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Line Consumption and Predictions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Line Analysis & Predictions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineConsumptionCard lines={lineConsumptionData} />
            <ConsumptionPredictionCard predictions={consumptionPredictions} />
          </div>
        </section>
      </main>

      <DashboardFooter activeTab="consumption" />
    </div>
  )
}
