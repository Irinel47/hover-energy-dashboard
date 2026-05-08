import * as d3 from "d3";
import { energyData, SOURCES, SOURCE_COLORS, SOURCE_LABELS } from "../data/energy";

const YEAR = 2024;
const W = 500;
const H = 260;

function DonutInner({ hoveredSource, onHoverSource }) {
  const worldRow = energyData.find((d) => d.country === "World" && d.year === YEAR);

  const pieData = SOURCES.map((key) => ({ key, value: worldRow[key] })).filter((d) => d.value > 0);

  const radius = Math.min(W * 0.4, H / 2) - 10;
  const cx = W * 0.35;
  const cy = H / 2;

  const pie = d3.pie().value((d) => d.value).sort(null);
  const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);
  const hoverArc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius * 1.05);
  const labelArc = d3.arc().innerRadius(radius * 0.75).outerRadius(radius * 0.75);

  const slices = pie(pieData);
  const total = d3.sum(pieData, (d) => d.value);

  const legendX = W * 0.65;
  const legendStartY = 20;
  const legendLineH = 22;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <g transform={`translate(${cx}, ${cy})`}>
        {slices.map((s) => {
          const isHovered = s.data.key === hoveredSource;
          const isDimmed = hoveredSource && !isHovered;

          return (
            <path
              key={s.data.key}
              d={isHovered ? hoverArc(s) : arc(s)}
              fill={SOURCE_COLORS[s.data.key]}
              opacity={isDimmed ? 0.3 : 0.9}
              stroke="#0f172a"
              strokeWidth={1}
              style={{
                cursor: "pointer",
                transition: "opacity 0.15s",
                filter: isHovered ? "brightness(1.15)" : "none"
              }}
              onMouseEnter={() => onHoverSource(s.data.key)}
              onMouseLeave={() => onHoverSource(null)}
            />
          );
        })}
        {slices
          .filter((s) => s.data.value / total > 0.06)
          .map((s) => {
            const [lx, ly] = labelArc.centroid(s);
            const isDimmed = hoveredSource && s.data.key !== hoveredSource;
            
            return (
              <text
                key={s.data.key}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={9}
                fontWeight="bold"
                opacity={isDimmed ? 0.3 : 1}
                style={{ transition: "opacity 0.15s", pointerEvents: "none" }}
              >
                {Math.round((s.data.value / total) * 100)}%
              </text>
            );
          })}
        <text textAnchor="middle" fill="white" fontSize={13} dy={-7}>
          {YEAR}
        </text>
        <text textAnchor="middle" fill="#ffffff80" fontSize={9} dy={9}>
          World Mix
        </text>
      </g>

      {pieData.map((d, i) => {
        const isDimmed = hoveredSource && d.key !== hoveredSource;

        return (
          <g
            key={d.key}
            transform={`translate(${legendX}, ${legendStartY + i * legendLineH})`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onHoverSource(d.key)}
            onMouseLeave={() => onHoverSource(null)}
          >
            <rect
              width={10}
              height={10}
              y={-1}
              fill={SOURCE_COLORS[d.key]}
              rx={2}
              opacity={isDimmed ? 0.3 : 1}
              style={{ transition: "opacity 0.15s" }}
            />
            <text
              x={14}
              y={8}
              fill={isDimmed ? "#ffffff60" : "#ffffffcc"}
              fontSize={10}
              style={{ transition: "fill 0.15s" }}
            >
              {SOURCE_LABELS[d.key]}
            </text>
            <text
              x={115}
              y={8}
              fill={isDimmed ? "#ffffff30" : "#ffffff60"}
              fontSize={9}
              textAnchor="end"
              style={{ transition: "fill 0.15s" }}
            >
              {Math.round((d.value / total) * 100)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DonutChart({ hoveredSource, onHoverSource }) {
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h3>Energy Mix Breakdown</h3>
        <p>World {YEAR} share by source</p>
      </div>
      <DonutInner hoveredSource={hoveredSource} onHoverSource={onHoverSource} />
    </div>
  );
}
