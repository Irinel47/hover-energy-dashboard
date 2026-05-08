import { useState } from "react";
import * as d3 from "d3";
import { energyData } from "../data/energy";

const W = 500;
const H = 240;
const MARGIN = { top: 10, right: 50, bottom: 10, left: 110 };
const YEAR = 2024;

function BarChartInner() {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const data = energyData
    .filter((d) => d.year === YEAR && d.country !== "World" && d.country !== "European Union")
    .sort((a, b) => b.primary_energy - a.primary_energy)
    .slice(0, 8);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([MARGIN.top, H - MARGIN.bottom])
    .padding(0.25);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.primary_energy)])
    .range([MARGIN.left, W - MARGIN.right]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {data.map((d) => {
        const isHovered = d.country === hoveredCountry;
        const isDimmed = hoveredCountry && !isHovered;

        return (
          <g key={d.country}>
            <rect
              x={MARGIN.left}
              y={yScale(d.country)}
              width={xScale(d.primary_energy) - MARGIN.left}
              height={yScale.bandwidth()}
              fill="#f59e0b"
              opacity={isDimmed ? 0.3 : isHovered ? 1 : 0.8}
              rx={2}
              style={{ 
                cursor: "pointer", 
                transition: "opacity 0.15s",
                filter: isHovered ? "brightness(1.15)" : "none"
              }}
              onMouseEnter={() => setHoveredCountry(d.country)}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            <text
              x={MARGIN.left - 6}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fill={isDimmed ? "#ffffff60" : "#ffffffcc"}
              fontSize={11}
              style={{ transition: "fill 0.15s" }}
            >
              {d.country.replace("United States", "USA").replace("United Kingdom", "UK")}
            </text>
            <text
              x={xScale(d.primary_energy) + 4}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              dominantBaseline="middle"
              fill={isDimmed ? "#f59e0b60" : "#f59e0b"}
              fontSize={10}
              style={{ transition: "fill 0.15s" }}
            >
              {Math.round(d.primary_energy / 1000)}k
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BarChart() {
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h3>Energy Consumption by Country</h3>
        <p>Top 8 consumers in {YEAR} (TWh)</p>
      </div>
      <BarChartInner />
    </div>
  );
}
