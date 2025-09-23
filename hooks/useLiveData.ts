"use client";
import { useEffect, useState } from "react";

export function useLiveData() {
  const [data, setData] = useState<any>({
    Voltage: undefined,
    Current: undefined,
    Power: undefined,
    explanation: "",
  });

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.6:8080"); // match your simulator/server

    ws.onopen = () => {
      console.log("[DASHBOARD] Connected to WebSocket");
      ws.send("BROWSER");
    };

    ws.onmessage = (msg) => {
      try {
        const parsed = JSON.parse(msg.data);
        setData({
          Voltage: parsed.supply_voltage ?? data.Voltage,
          Current: parsed.supply_current ?? data.Current,
          Power: parsed.battery_current ?? data.Power,
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

  return data;
}
