"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { SensorDataCard } from "@/components/sensor-data-card";
import { MLAdviceCard } from "@/components/ml-advice-card";
import { WeatherPredictionCard } from "@/components/weather-prediction-card";
import { LineControlPanel } from "@/components/line-control-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { randomLineData } from "@/lib/randomData";

// Shape of a line
type Line = ReturnType<typeof randomLineData>;

// Type for live data
interface LiveData {
  Voltage?: number;
  Current?: number;
  Power?: number;
  explanation?: string;
}

export default function DashboardPage() {
  const [live, setLive] = useState<LiveData>({});
  const [lines, setLines] = useState<Line[]>([randomLineData(), randomLineData()]);

  // WebSocket connection to backend
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); // Update if your backend IP/port is different

    ws.onopen = () => {
      console.log("[DASHBOARD] Connected to WS");
      ws.send("BROWSER");
    };

    ws.onmessage = (msg) => {
      try {
        const parsed = JSON.parse(msg.data);
        setLive({
          Voltage: parsed.supply_voltage ?? live.Voltage,
          Current: parsed.supply_current ?? live.Current,
          Power: parsed.battery_current ?? live.Power,
          explanation: parsed.explanation ?? "",
        });
      } catch (err) {
        console.error("[DASHBOARD] WS parse error:", err);
      }
    };

    ws.onclose = () => console.log("[DASHBOARD] WS disconnected");
    ws.onerror = (err) => console.error("[DASHBOARD] WS error:", err);

    return () => ws.close();
  }, []);

  // Periodically refresh simulated line data
  useEffect(() => {
    const id = setInterval(() => {
      setLines((old) =>
        old.map((l) => ({
          ...l,
          currentPower: Math.floor(Math.random() * l.maxPower),
          lastUpdate: new Date().toLocaleTimeString(),
        }))
      );
    }, 10_000);
    return () => clearInterval(id);
  }, []);

  // Line control handlers
  const toggleLine = (id: string, active: boolean) =>
    setLines((prev) =>
      prev.map((l) => (l.lineId === id ? { ...l, isActive: active } : l))
    );
  const adjustPower = (id: string, p: number) =>
    setLines((prev) =>
      prev.map((l) => (l.lineId === id ? { ...l, currentPower: p } : l))
    );
  const addLine = (name: string) =>
    setLines((prev) => [...prev, { ...randomLineData(), lineName: name }]);
  const editLine = (id: string, name: string) =>
    setLines((prev) =>
      prev.map((l) => (l.lineId === id ? { ...l, lineName: name } : l))
    );
  const removeLine = (id: string) =>
    setLines((prev) => prev.filter((l) => l.lineId !== id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 space-y-8">

        {/* ---------- Real-time Sensor Data ---------- */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Real-time Sensor Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <SensorDataCard
              title="Voltage"
              value={live?.Voltage?.toFixed(2) ?? "—"}
              unit="V"
              trend="stable"
              trendValue="±0.2V"
              status="normal"
            />
            <SensorDataCard
              title="Current"
              value={live?.Current?.toFixed(2) ?? "—"}
              unit="A"
              trend="up"
              trendValue="+0.5A"
              status="normal"
            />
            <SensorDataCard
              title="Power"
              value={live?.Power?.toFixed(2) ?? "—"}
              unit="kW"
              trend="up"
              trendValue="+0.1kW"
              status="normal"
            />
          </div>
        </section>

        {/* ---------- Grid Line Management ---------- */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Grid Line Management</h2>
          <LineControlPanel
            lines={lines}
            onToggleLine={toggleLine}
            onPowerAdjust={adjustPower}
            onAddLine={addLine}
            onEditLine={editLine}
            onRemoveLine={removeLine}
          />
        </section>

        {/* ---------- AI & Weather Insights ---------- */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Insights & Predictions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MLAdviceCard
              recommendations={[
                {
                  type: live?.explanation ? "warning" : "info",
                  message:
                    live?.explanation ?? "Waiting for AI server to provide analysis...",
                },
              ]}
            />
            <WeatherPredictionCard
              temperature={22}
              cloudCover={35}
              windSpeed={8.5}
              prediction="Moderate cloud cover expected. Solar generation ~20% below optimal."
              efficiency={75}
            />
          </div>
        </section>

        {/* ---------- Example static analytics ---------- */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Energy Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add your Recharts charts here if needed.
              </p>
            </CardContent>
          </Card>
        </section>

      </main>
    </div>
  );
}
