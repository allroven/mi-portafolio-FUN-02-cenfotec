"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Chart: new (ctx: CanvasRenderingContext2D, config: any) => { destroy: () => void };
  }
}

export function PostGISChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const initChart = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      if (chartRef.current) chartRef.current.destroy();

      const xValues: number[] = [];
      const yValues: number[] = [];
      for (let x = 0; x <= 50; x += 5) {
        xValues.push(x);
        yValues.push(parseFloat((0.48 * x + 2).toFixed(2)));
      }

      chartRef.current = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Tamaño en Disco (GB)",
              data: yValues,
              borderColor: "#14b8a6",
              backgroundColor: "rgba(20, 184, 166, 0.12)",
              borderWidth: 2.5,
              pointBackgroundColor: "#f59e0b",
              pointBorderColor: "#fef3c7",
              pointRadius: 5,
              fill: true,
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 800 },
          scales: {
            x: {
              title: {
                display: true,
                text: "Millones de Geometrías (x)",
                color: "#94a3b8",
                font: { size: 12 },
              },
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(148,163,184,0.08)" },
            },
            y: {
              title: {
                display: true,
                text: "Gigabytes en Disco (y)",
                color: "#94a3b8",
                font: { size: 12 },
              },
              min: 0,
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(148,163,184,0.08)" },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: { parsed: { x: number; y: number } }) =>
                  `f(${context.parsed.x}) = ${context.parsed.y} GB`,
              },
            },
            legend: { labels: { color: "#e2e8f0" } },
          },
        },
      });
    };

    if (typeof window !== "undefined" && window.Chart) {
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

  return (
    <div className="bg-slate-950/60 rounded-2xl p-5 border border-emerald-500/20 shadow-inner">
      <canvas ref={canvasRef} />
    </div>
  );
}
