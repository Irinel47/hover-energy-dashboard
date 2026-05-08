import * as d3 from "d3";
import { energyData, SOURCES, SOURCE_COLORS, SOURCE_LABELS } from "../data/energy";

const W = 600;
const H = 220;
const MARGIN = { top: 10, right: 10, bottom: 30, left: 50 };

function StackedAreaInner({ hoveredSource, onHoverSource }) {
  const worldData = energyData.filter((d) => d.country === "World");

  const stack = d3.stack().keys(SOURCES);
  const series = stack(worldData);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(worldData, (d) => d.year))
    .range([MARGIN.left, W - MARGIN.right]);

  const maxVal = d3.max(series, (s) => d3.max(s, (d) => d[1]));
  const yScale = d3
    .scaleLinear()
    .domain([0, maxVal])
    .range([H - MARGIN.bottom, MARGIN.top]);

  const area = d3
    .area()
    .x((d) => xScale(d.data.year))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]))
    .curve(d3.curveBumpX);

  const xTicks = worldData.map((d) => d.year);
  const yTicks = yScale.ticks(4);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {yTicks.map((t) => (
        <line key={t} x1={MARGIN.left} x2={W - MARGIN.right} y1={yScale(t)} y2={yScale(t)} stroke="#ffffff10" />
      ))}
      {series.map((s) => {
        const isHovered = s.key === hoveredSource;
        const isDimmed = hoveredSource && !isHovered;
        
        return (
          <path
            key={s.key}
            d={area(s)}
            fill={SOURCE_COLORS[s.key]}
            opacity={isDimmed ? 0.2 : isHovered ? 1 : 0.85}
            style={{ 
              cursor: "pointer",
              transition: "opacity 0.15s",
              filter: isHovered ? "brightness(1.1)" : "none"
            }}
            onMouseEnter={() => onHoverSource(s.key)}
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

export function StackedAreaChart({ hoveredSource, onHoverSource }) {
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h3>Global Energy Mix Over Time</h3>
        <p>Total consumption by source (TWh)</p>
      </div>
      <div className="chart-legend">
        {SOURCES.map((s) => (
          <span
            key={s}
            className={`legend-item ${hoveredSource && hoveredSource !== s ? "dimmed" : ""}`}
            onMouseEnter={() => onHoverSource(s)}
            onMouseLeave={() => onHoverSource(null)}
          >
            <span className="legend-dot" style={{ background: SOURCE_COLORS[s] }} />
            {SOURCE_LABELS[s]}
          </span>
        ))}
      </div>
      <StackedAreaInner hoveredSource={hoveredSource} onHoverSource={onHoverSource} />
    </div>
  );
}
