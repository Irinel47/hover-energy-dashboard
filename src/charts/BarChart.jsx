import { useState } from "react";
import { energyData, SOURCES } from "../data/energy";

const latest = ["China", "United States", "India", "European Union"]
  .map((country) => {
    const rows = energyData.filter((d) => d.country === country).sort((a, b) => b.year - a.year);
    const d = rows[0];
    const total = SOURCES.reduce((s, k) => s + (d[k] || 0), 0);
    return {
      country:
        country === "United States" ? "USA" : country === "European Union" ? "EU" : country,
      total,
    };
  })
  .sort((a, b) => b.total - a.total);

const countries = [
  ...latest,
  { country: "Russia",  total: 7100 },
  { country: "Japan",   total: 5000 },
  { country: "Germany", total: 3200 },
  { country: "Brazil",  total: 3100 },
  { country: "Canada",  total: 2900 },
]
  .sort((a, b) => b.total - a.total)
  .slice(0, 8);

const worldTotal = 176737;
const BLUES = ["#0369a1","#0284c7","#0ea5e9","#38bdf8","#7dd3fc","#bae6fd","#e0f2fe","#f0f9ff"];

export default function BarChart() {
  const max = countries[0].total;
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bar-list">
      {countries.map((c, i) => (
        <div
          key={c.country}
          className="bar-row"
          style={{ position: "relative" }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <span className="bar-label" style={{ color: hovered === i ? "#111827" : undefined, fontWeight: hovered === i ? 600 : undefined }}>
            {c.country}
          </span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${(c.total / max) * 100}%`,
                background: BLUES[i],
                opacity: hovered === null || hovered === i ? 1 : 0.45,
                transition: "opacity 0.15s",
              }}
            >
              {c.total >= 3000 && (
                <span className="bar-value">
                  {c.total >= 1000 ? `${(c.total / 1000).toFixed(0)}k` : c.total}
                </span>
              )}
            </div>
          </div>
          <span className="bar-pct" style={{ color: hovered === i ? "#111827" : undefined, fontWeight: hovered === i ? 600 : undefined }}>
            {Math.round((c.total / worldTotal) * 100)}%
          </span>
          {hovered === i && (
            <div style={{
              position: "absolute",
              left: "calc(56px + 10px)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#111827",
              color: "#fff",
              borderRadius: 5,
              padding: "3px 9px",
              fontSize: 11,
              fontWeight: 600,
              pointerEvents: "none",
              zIndex: 10,
              whiteSpace: "nowrap",
              marginLeft: `${(c.total / max) * 100}%`,
            }}>
              {(c.total / 1000).toFixed(1)}k TWh · {Math.round((c.total / worldTotal) * 100)}% of world
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
