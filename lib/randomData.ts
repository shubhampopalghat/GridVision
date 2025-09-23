export function randomLineData() {
  const now = new Date().toLocaleTimeString();
  return {
    lineId: crypto.randomUUID().slice(0, 8),
    lineName: "Sim Line " + Math.floor(Math.random() * 10),
    isActive: Math.random() > 0.3,
    currentPower: Math.floor(Math.random() * 50),
    maxPower: 50,
    voltage: 220 + Math.floor(Math.random() * 20),
    current: Math.floor(Math.random() * 20),
    status: ["online","offline","maintenance","fault"][Math.floor(Math.random()*4)] as
       "online"|"offline"|"maintenance"|"fault",
    lastUpdate: now,
  };
}
