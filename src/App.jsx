import { useState } from "react";
import { StackedAreaChart } from "./charts/StackedAreaChart";
import { BarChart } from "./charts/BarChart";
import { LineChart } from "./charts/LineChart";
import { DonutChart } from "./charts/DonutChart";
import "./App.css";

export default function App() {
  const [hoveredSource, setHoveredSource] = useState(null);

  return (
    <div className="app">
      <header className="dashboard-header">
        <h1>World Energy</h1>
        <p>60 years of the global energy mix · 1965 – 2024</p>
      </header>

      <div className="dashboard-grid">
        <div className="span-full">
          <StackedAreaChart 
            hoveredSource={hoveredSource}
            onHoverSource={setHoveredSource}
          />
        </div>
        <div>
          <BarChart />
        </div>
        <div>
          <LineChart 
            hoveredSource={hoveredSource}
            onHoverSource={setHoveredSource}
          />
        </div>
        <div className="span-full">
          <DonutChart 
            hoveredSource={hoveredSource}
            onHoverSource={setHoveredSource}
          />
        </div>
      </div>

      <footer className="dashboard-footer">
        Data: Our World in Data · Charts: React + D3
      </footer>
    </div>
  );
}
