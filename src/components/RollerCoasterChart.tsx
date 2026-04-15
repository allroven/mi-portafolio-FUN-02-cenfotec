"use client";
import { useEffect, useRef, useState } from "react";

// Función a trozos r(x) — trayectoria de la montaña rusa
function r(x: number): number {
  if (x >= 0 && x <= 3) return -Math.pow(x, 2) + 2 * x;
  if (x > 3 && x <= 7) return x - 6;
  if (x > 7 && x <= 10) return Math.pow(x, 2) - 16 * x + 64;
  if (x > 10 && x <= 14) return 14 - x;
  if (x > 14 && x <= 18) return 0;
  return 0;
}

function getState(x: number): { text: string; color: string } {
  if (x < 1) return { text: "Subiendo ↗️", color: "#22c55e" };
  if (x === 1) return { text: "Vértice Local ⛰️", color: "#a855f7" };
  if (x > 1 && x <= 3) return { text: "Bajando ↘️", color: "#ef4444" };
  if (x > 3 && x <= 7) return { text: "Subiendo ↗️", color: "#22c55e" };
  if (x > 7 && x < 8) return { text: "Bajando ↘️", color: "#ef4444" };
  if (x === 8) return { text: "Valle Local 🕳️", color: "#94a3b8" };
  if (x > 8 && x < 10) return { text: "Subiendo ↗️", color: "#22c55e" };
  if (x === 10) return { text: "Vértice Máximo Absoluto 🏔️", color: "#f59e0b" };
  if (x > 10 && x < 14) return { text: "Bajando ↘️", color: "#ef4444" };
  return { text: "Constante ➡️", color: "#94a3b8" };
}

export function RollerCoasterChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [state, setState] = useState(getState(0));

  useEffect(() => {
    const initChart = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      if (chartRef.current) chartRef.current.destroy();

      const trackData: { x: number; y: number }[] = [];
      for (let x = 0; x <= 18; x += 0.1) {
        trackData.push({
          x: parseFloat(x.toFixed(1)),
          y: parseFloat(r(x).toFixed(3)),
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const W = window as any;
      chartRef.current = new W.Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Trayectoria r(x)",
              data: trackData,
              showLine: true,
              borderColor: "#14b8a6",
              borderWidth: 3,
              pointRadius: 0,
              tension: 0,
              fill: false,
            },
            {
              label: "Vagón 🚃",
              data: [{ x: 0, y: r(0) }],
              backgroundColor: "#ef4444",
              borderColor: "#fff",
              borderWidth: 2,
              pointRadius: 10,
              pointHoverRadius: 13,
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 0 },
          scales: {
            x: {
              type: "linear",
              min: 0,
              max: 18,
              title: {
                display: true,
                text: "Posición horizontal (x)",
                color: "#94a3b8",
                font: { size: 12 },
              },
              ticks: { color: "#94a3b8", stepSize: 2 },
              grid: { color: "rgba(148,163,184,0.08)" },
            },
            y: {
              min: -4,
              max: 6,
              title: {
                display: true,
                text: "Altura (y)",
                color: "#94a3b8",
                font: { size: 12 },
              },
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(148,163,184,0.08)" },
            },
          },
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
          },
        },
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).Chart) {
      initChart();
    } else {
      const existing = document.getElementById("chartjs-cdn");
      if (existing) {
        existing.addEventListener("load", initChart);
      } else {
        const script = document.createElement("script");
        script.id = "chartjs-cdn";
        script.src = "https://cdn.jsdelivr.net/npm/chart.js";
        script.onload = initChart;
        document.head.appendChild(script);
      }
    }

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const x = parseFloat(e.target.value);
    const y = r(x);
    setXPos(x);
    setYPos(y);
    setState(getState(x));
    if (chartRef.current) {
      chartRef.current.data.datasets[1].data = [{ x, y }];
      chartRef.current.update();
    }
  };

  return (
    <div className="bg-slate-950/60 rounded-2xl p-5 border border-sky-500/20 shadow-inner space-y-4">
      <canvas ref={canvasRef} />

      {/* Panel de control interactivo */}
      <div className="bg-slate-900/60 rounded-xl p-4 border border-sky-500/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Coordenadas:</span>
            <span className="font-mono bg-slate-800 px-2 py-1 rounded text-sky-300 text-xs font-bold">
              ({xPos.toFixed(2)}, {yPos.toFixed(2)})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Estado:</span>
            <span className="font-bold text-sm" style={{ color: state.color }}>
              {state.text}
            </span>
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-2 block font-semibold uppercase tracking-widest">
            Posición del vagón — x = <span className="text-sky-300">{xPos.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min={0}
            max={18}
            step={0.1}
            value={xPos}
            onChange={handleSlider}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1 select-none">
            <span>0</span>
            <span>3</span>
            <span>7</span>
            <span>10</span>
            <span>14</span>
            <span>18</span>
          </div>
        </div>
      </div>
    </div>
  );
}
