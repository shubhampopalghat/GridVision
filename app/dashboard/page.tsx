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
type Line = ReturnType<typeof createDeterministicLineData>;

// Type for live data
interface LiveData {
  Voltage?: number;
  Current?: number;
  Power?: number;
  explanation?: string;
  system_status?: string;
  [key: string]: any; // Allow for any additional properties from WebSocket
}

// Create deterministic line data to avoid hydration mismatch
function createDeterministicLineData(index: number) {
  return {
    lineId: `Line${index + 1}`,
    lineName: `Line ${index + 1}`,
    isActive: true, // Start with all lines active
    currentPower: 25, // Default power
    maxPower: 50,
    voltage: 240, // Standard voltage
    current: 10, // Default current
    status: "online" as "online" | "offline" | "maintenance" | "fault",
    lastUpdate: "--:--:--", // Will be updated after hydration
  };
}

export default function DashboardPage() {
  const [live, setLive] = useState<LiveData>({});
  const [rawSensorData, setRawSensorData] = useState<any>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  // Initialize with 20 lines using deterministic data to avoid hydration issues
  const [lines, setLines] = useState<Line[]>(() => {
    return Array.from({ length: 20 }, (_, i) => createDeterministicLineData(i));
  });

  // WebSocket connection to backend - hardcoded IP and auto-connect
  useEffect(() => {
    const websocket = new WebSocket("ws://10.54.194.247:8080"); // Hardcoded IP and port
    setWs(websocket);

    websocket.onopen = () => {
      console.log("[DASHBOARD] Connected to WS at 10.54.194.247:8080");
      websocket.send("BROWSER");
    };

    websocket.onmessage = (msg) => {
      try {
        const parsed = JSON.parse(msg.data);
        // Store raw data for display like in demo.html
        setRawSensorData(parsed);
        // Update live data for individual sensor cards
        setLive({
          Voltage: parsed.supply_voltage ? (parsed.supply_voltage / 2.5) : live.Voltage, // Scale 608V to ~243V
          Current: parsed.supply_current ?? live.Current,
          Power: parsed.battery_current ?? live.Power,
          explanation: parsed.explanation ?? "",
          system_status: parsed.system_status,
        });
      } catch (err) {
        console.error("[DASHBOARD] WS parse error:", err);
      }
    };

    websocket.onclose = () => console.log("[DASHBOARD] WS disconnected");
    websocket.onerror = (err) => console.error("[DASHBOARD] WS error:", err);

    return () => websocket.close();
  }, []);

  // Initialize random data after hydration to avoid mismatch
  useEffect(() => {
    // Set initial random values after component mounts (client-side only)
    setLines((old) =>
      old.map((l) => ({
        ...l,
        currentPower: Math.floor(Math.random() * l.maxPower),
        voltage: 235 + Math.floor(Math.random() * 10), // 235-244V range around 240V
        current: Math.floor(Math.random() * 20),
        lastUpdate: new Date().toLocaleTimeString(),
      }))
    );
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

  // Function to send WebSocket commands
  const sendCommand = (command: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(command);
      console.log(`[DASHBOARD] Sent command: ${command}`);
    } else {
      console.error("[DASHBOARD] WebSocket not connected!");
    }
  };

  // Line control handlers with WebSocket commands
  const toggleLine = (id: string, active: boolean) => {
    setLines((prev) =>
      prev.map((l) => (l.lineId === id ? { ...l, isActive: active } : l))
    );
    // Send WebSocket command like in demo.html
    const command = active ? `${id}_ON` : `${id}_OFF`;
    sendCommand(command);
  };
  const adjustPower = (id: string, p: number) =>
    setLines((prev) =>
      prev.map((l) => (l.lineId === id ? { ...l, currentPower: p } : l))
    );
  const addLine = (name: string) => {
    const newIndex = lines.length;
    setLines((prev) => [...prev, { ...createDeterministicLineData(newIndex), lineName: name }]);
  };
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

        {/* ---------- Live Sensor Data (like demo.html) ---------- */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Live Sensor Data</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Anomaly Alert */}
            {live.system_status === 'anomaly' && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    Anomaly Detected!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-700">
                    {live.explanation || 'Unusual sensor activity detected.'}
                  </p>
                </CardContent>
              </Card>
            )}
            
            {/* Raw Sensor Data Display */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Raw Sensor Data Stream</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono whitespace-pre-wrap">
                  {rawSensorData ? JSON.stringify(rawSensorData, null, 2) : 'Waiting for data...'}
                </pre>
              </CardContent>
            </Card>
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
