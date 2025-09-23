// hooks/useLineWebSocket.ts
import { useEffect, useRef } from "react";

export function useLineWebSocket(onMessage: (data: any) => void) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("✅ Line WebSocket connected");
      ws.current?.send("BROWSER"); // register as browser client
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data); // update React state
    };

    ws.current.onclose = () => console.log("❌ Line WebSocket disconnected");
    ws.current.onerror = (err) => console.error(err);

    return () => ws.current?.close();
  }, []);

  const sendMessage = (msg: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msg));
    }
  };

  return sendMessage;
}
