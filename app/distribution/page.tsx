"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardFooter } from "@/components/dashboard-footer"
import { DistributionScheduleCard } from "@/components/distribution-schedule-card"
import { LineControlPanel } from "@/components/line-control-panel"
import { DistributionTimeline } from "@/components/distribution-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for distribution control
const distributionSchedules = [
  {
    lineId: "L001",
    lineName: "Line 1 - Main Building",
    startTime: "3:15 PM",
    endTime: "7:15 PM",
    duration: "4 hours",
    status: "active" as const,
    priority: "high" as const,
    powerAllocation: 150,
  },
  {
    lineId: "L002",
    lineName: "Line 2 - Manufacturing",
    startTime: "1:00 PM",
    endTime: "3:15 PM",
    duration: "2 hours 15 mins",
    status: "completed" as const,
    priority: "medium" as const,
    powerAllocation: 180,
  },
  {
    lineId: "L003",
    lineName: "Line 3 - HVAC Systems",
    startTime: "8:00 PM",
    endTime: "11:30 PM",
    duration: "3 hours 30 mins",
    status: "scheduled" as const,
    priority: "low" as const,
    powerAllocation: 95,
  },
  {
    lineId: "L004",
    lineName: "Line 4 - Emergency Systems",
    startTime: "12:00 AM",
    endTime: "11:59 PM",
    duration: "24 hours",
    status: "active" as const,
    priority: "high" as const,
    powerAllocation: 25,
  },
]

const lineControls = [
  {
    lineId: "L001",
    lineName: "Main Building",
    isActive: true,
    currentPower: 150,
    maxPower: 200,
    voltage: 240,
    current: 62.5,
    status: "online" as const,
    lastUpdate: "2 minutes ago",
  },
  {
    lineId: "L002",
    lineName: "Manufacturing",
    isActive: false,
    currentPower: 0,
    maxPower: 200,
    voltage: 0,
    current: 0,
    status: "offline" as const,
    lastUpdate: "1 hour ago",
  },
  {
    lineId: "L003",
    lineName: "HVAC Systems",
    isActive: false,
    currentPower: 0,
    maxPower: 150,
    voltage: 0,
    current: 0,
    status: "offline" as const,
    lastUpdate: "5 minutes ago",
  },
  {
    lineId: "L004",
    lineName: "Emergency Systems",
    isActive: true,
    currentPower: 25,
    maxPower: 100,
    voltage: 240,
    current: 10.4,
    status: "online" as const,
    lastUpdate: "30 seconds ago",
  },
]

const timelineEvents = [
  {
    time: "1:00 PM",
    lineId: "L002",
    lineName: "Line 2 - Manufacturing",
    action: "start" as const,
    duration: "2h 15m",
    status: "completed" as const,
  },
  {
    time: "3:15 PM",
    lineId: "L002",
    lineName: "Line 2 - Manufacturing",
    action: "end" as const,
    status: "completed" as const,
  },
  {
    time: "3:15 PM",
    lineId: "L001",
    lineName: "Line 1 - Main Building",
    action: "start" as const,
    duration: "4h",
    status: "active" as const,
  },
  {
    time: "7:15 PM",
    lineId: "L001",
    lineName: "Line 1 - Main Building",
    action: "end" as const,
    status: "upcoming" as const,
  },
  {
    time: "8:00 PM",
    lineId: "L003",
    lineName: "Line 3 - HVAC Systems",
    action: "start" as const,
    duration: "3h 30m",
    status: "upcoming" as const,
  },
]

const powerDistributionData = [
  { name: "Line 1", value: 150, color: "hsl(var(--chart-1))" },
  { name: "Line 2", value: 0, color: "hsl(var(--chart-2))" },
  { name: "Line 3", value: 0, color: "hsl(var(--chart-3))" },
  { name: "Line 4", value: 25, color: "hsl(var(--chart-4))" },
]

const hourlyDistributionData = [
  { time: "12:00", L1: 0, L2: 0, L3: 0, L4: 25 },
  { time: "13:00", L1: 0, L2: 180, L3: 0, L4: 25 },
  { time: "14:00", L1: 0, L2: 180, L3: 0, L4: 25 },
  { time: "15:00", L1: 150, L2: 180, L3: 0, L4: 25 },
  { time: "16:00", L1: 150, L2: 0, L3: 0, L4: 25 },
  { time: "17:00", L1: 150, L2: 0, L3: 0, L4: 25 },
  { time: "18:00", L1: 150, L2: 0, L3: 0, L4: 25 },
  { time: "19:00", L1: 150, L2: 0, L3: 0, L4: 25 },
  { time: "20:00", L1: 0, L2: 0, L3: 95, L4: 25 },
  { time: "21:00", L1: 0, L2: 0, L3: 95, L4: 25 },
  { time: "22:00", L1: 0, L2: 0, L3: 95, L4: 25 },
  { time: "23:00", L1: 0, L2: 0, L3: 95, L4: 25 },
]

export default function DistributionPage() {
  const [schedules, setSchedules] = useState(distributionSchedules)
  const [lines, setLines] = useState(lineControls)

  const generateLineId = () => {
    const existingIds = lines.map(line => line.lineId)
    let counter = 1
    let newId = `L${counter}00`
    
    while (existingIds.includes(newId)) {
      counter++
      newId = `L${counter}00`
    }
    
    return newId
  }

  const handleToggleLine = (lineId: string, active: boolean) => {
    setLines((prev) =>
      prev.map((line) =>
        line.lineId === lineId
          ? {
              ...line,
              isActive: active,
              currentPower: active ? line.currentPower : 0,
              voltage: active ? 240 : 0,
              current: active ? (line.currentPower / 240) * 1000 : 0,
              status: active ? ("online" as const) : ("offline" as const),
            }
          : line,
      ),
    )
  }

  const handlePowerAdjust = (lineId: string, power: number) => {
    setLines((prev) =>
      prev.map((line) =>
        line.lineId === lineId
          ? {
              ...line,
              currentPower: power,
              current: (power / 240) * 1000,
            }
          : line,
      ),
    )
  }

  const handleAddLine = (lineName: string) => {
    const newLineId = generateLineId()
    const newLine = {
      lineId: newLineId,
      lineName: lineName,
      isActive: false,
      currentPower: 0,
      maxPower: 200,
      voltage: 0,
      current: 0,
      status: "offline" as const,
      lastUpdate: "Just created",
    }
    
    setLines((prev) => [...prev, newLine])
  }

  const handleEditLine = (lineId: string, newName: string) => {
    setLines((prev) =>
      prev.map((line) =>
        line.lineId === lineId
          ? {
              ...line,
              lineName: newName,
              lastUpdate: "Just updated",
            }
          : line,
      ),
    )
  }

  const handleRemoveLine = (lineId: string) => {
    setLines((prev) => prev.filter((line) => line.lineId !== lineId))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 space-y-6">
        {/* Distribution Overview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">Distribution Control</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Schedule
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DistributionScheduleCard schedules={schedules} />
            <LineControlPanel 
              lines={lines} 
              onToggleLine={handleToggleLine} 
              onPowerAdjust={handlePowerAdjust} 
              onAddLine={handleAddLine}
              onEditLine={handleEditLine}
              onRemoveLine={handleRemoveLine}
            />
          </div>
        </section>

        {/* Distribution Analytics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Distribution Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Power Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Current Power Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={powerDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}kW`}
                    >
                      {powerDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Distribution Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>24-Hour Distribution Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="L1" stackId="a" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="L2" stackId="a" fill="hsl(var(--chart-2))" />
                    <Bar dataKey="L3" stackId="a" fill="hsl(var(--chart-3))" />
                    <Bar dataKey="L4" stackId="a" fill="hsl(var(--chart-4))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Distribution Timeline */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Today's Distribution Timeline</h2>
          <DistributionTimeline events={timelineEvents} />
        </section>
      </main>

      <DashboardFooter activeTab="distribution" />
    </div>
  )
}
