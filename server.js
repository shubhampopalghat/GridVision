// server.js
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import os from 'os';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const nodemcuClients = new Map(); // NODEMCU connections
const browserClients = new Set(); // Browser dashboards
const PYTHON_API_URL = 'http://127.0.0.1:5000/predict/anomaly';

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

wss.on('connection', (ws) => {
  ws.on('message', async (msg) => {
    const message = msg.toString();

    if (message.startsWith('NODEMCU:')) {
      const id = message.split(':')[1];
      ws.isNodeMCU = true;
      nodemcuClients.set(id, ws);
      console.log(`NodeMCU connected: ${id}`);
      return;
    }

    if (message === 'BROWSER') {
      browserClients.add(ws);
      console.log('Browser connected');
      return;
    }

    // NODEMCU data (sensor readings)
    if (ws.isNodeMCU) {
      try {
        const sensorData = JSON.parse(message);
        let aiResponse = { system_status: 'unknown', explanation: 'AI server could not be reached.' };

        try {
          const response = await axios.post(PYTHON_API_URL, sensorData);
          aiResponse = response.data;
        } catch (err) {
          console.error("⚠️ AI server error:", err.message);
        }

        // Random data for cards that have no hardware
        const randomCards = {
          random_temp: (20 + Math.random()*10).toFixed(1),
          random_voltage: (210 + Math.random()*20).toFixed(1)
        };

        const messageToSend = JSON.stringify({ ...sensorData, ...aiResponse, ...randomCards });
        for (let browser of browserClients) browser.send(messageToSend);
      } catch (e) {
        console.log("Non-JSON message from NodeMCU:", message);
      }
    } else {
      // Browser control messages (toggle line / set power)
      for (const n of nodemcuClients.values()) n.send(message);
    }
  });

  ws.on('close', () => {
    for (const [id, client] of nodemcuClients.entries()) {
      if (client === ws) {
        nodemcuClients.delete(id);
        console.log(`NodeMCU disconnected: ${id}`);
      }
    }
    browserClients.delete(ws);
  });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at ws://${getLocalIP()}:${PORT}`);
});
