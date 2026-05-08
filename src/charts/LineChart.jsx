import * as d3 from "d3";
import { energyData } from "../data/energy";

const W = 600;
const H = 200;
const MARGIN = { top: 10, right: 10, bottom: 30, left: 45 };

const RENEWABLES = [
  { key: "solar", color: "#f59e0b", label: "Solar" },
  { key: "wind", color: "#10b981", label: "Wind" },
  { key: "hydro", color: "#3b82f6", label: "Hydro" },
  { key: "nuclear", color: "#8b5cf6", label: "Nuclear" },
];

function LineChartInner({ hoveredSource, onHoverSource }) {
  const worldData = energyData.filter((d) => d.country === "World");

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(worldData, (d) => d.year))
    .range([MARGIN.left, W - MARGIN.right]);

  const maxVal = d3.max(worldData, (d) => Math.max(d.solar, d.wind, d.hydro, d.nuclear));
  const yScale = d3
    .scaleLinear()
    .domain([0, maxVal])
    .range([H - MARGIN.bottom, MARGIN.top]);

  const line = (key) =>
    d3.line().x((d) => xScale(d.year)).y((d) => yScale(d[key])).curve(d3.curveBumpX);

  const xTicks = worldData.map((d) => d.year);
  const yTicks = yScale.ticks(4);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {yTicks.map((t) => (
        <line key={t} x1={MARGIN.left} x2={W - MARGIN.right} y1={yScale(t)} y2={yScale(t)} stroke="#ffffff10" />
      ))}

      {RENEWABLES.map(({ key, color }) => {
        const isHovered = key === hoveredSource;
        const isDimmed = hoveredSource && !isHovered;

        return (
          <path
            key={key}
            d={line(key)(worldData)}
            fill="none"
            stroke={color}
            strokeWidth={isHovered ? 3 : 2}
            opacity={isDimmed ? 0.2 : 1}
            style={{ 
              cursor: "pointer",
              transition: "stroke-width 0.15s, opacity 0.15s",
              filter: isHovered ? "brightness(1.2)" : "none"
            }}
            onMouseEnter={() => onHoverSource(key)}
            onMouseLeave={() => onHoverSource(null)}
          />
        );
      })}

      <g transform={`translate(0, ${H - MARGIN.bottom})`}>
        <line x1={MARGIN.left} x2={W - MARGIN.right} stroke="#ffffff30" />
        {xTicks.map((t) => (
          <text key={t} x={xScale(t)} y={18} textAnchor="middle" fill="#ffffff80" fontSize={10}>
            {t}
          </text>
        ))}
      </g>
      <g>
        {yTicks.map((t) => (
          <text key={t} x={MARGIN.left - 6} y={yScale(t)} textAnchor="end" dominantBaseline="middle" fill="#ffffff80" fontSize={10}>
            {t >= 1000 ? `${t / 1000}k` : t}
          </text>
        ))}
      </g>
    </svg>
  );
}

export function LineChart({ hoveredSource, onHoverSource }) {
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h3>Rise of Clean Energy</h3>
        <p>Global production by source (TWh)</p>
      </div>
      <div className="chart-legend">
        {RENEWABLES.map(({ key, color, label }) => (
          <span
            key={key}
            className={`legend-item ${hoveredSource && hoveredSource !== key ? "dimmed" : ""}`}
            onMouseEnter={() => onHoverSource(key)}
            onMouseLeave={() => onHoverSource(null)}
          >
            <span className="legend-dot" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
      <LineChartInner hoveredSource={hoveredSource} onHoverSource={onHoverSource} />
    </div>
  );
}
