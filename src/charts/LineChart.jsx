import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { energyData } from "../data/energy";

const LINES = [
  { key: "solar",   label: "Solar",   color: "#f59e0b" },
  { key: "wind",    label: "Wind",    color: "#10b981" },
  { key: "hydro",   label: "Hydro",   color: "#3b82f6" },
  { key: "nuclear", label: "Nuclear", color: "#8b5cf6" },
];

const worldRows = energyData
  .filter((d) => d.country === "World")
  .sort((a, b) => a.year - b.year);

export default function LineChart() {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const draw = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      if (W < 20 || H < 20) return;

      const m = { top: 8, right: 14, bottom: 24, left: 44 };
      const w = W - m.left - m.right;
      const h = H - m.top - m.bottom;

      d3.select(svgRef.current).selectAll("*").remove();
      const svg = d3
        .select(svgRef.current)
        .attr("width", W).attr("height", H)
        .append("g")
        .attr("transform", `translate(${m.left},${m.top})`);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(worldRows, (d) => d.year))
        .range([0, w]);

      const yMax = d3.max(LINES, (ln) => d3.max(worldRows, (d) => d[ln.key] || 0));
      const y = d3.scaleLinear().domain([0, yMax * 1.05]).range([h, 0]);

      // Grid
      svg
        .append("g")
        .call(d3.axisLeft(y).ticks(4).tickSize(-w).tickFormat(""))
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll("line").attr("stroke", "#e4e7ec").attr("stroke-dasharray", "3,3");
        });

      const lineGen = d3.line().x((d) => x(d.year)).y((d) => y(d.value)).curve(d3.curveCatmullRom);
      const areaGen = d3.area().x((d) => x(d.year)).y0(h).y1((d) => y(d.value)).curve(d3.curveCatmullRom);

      LINES.forEach((ln) => {
        const pts = worldRows.map((d) => ({ year: d.year, value: d[ln.key] || 0 }));
        svg.append("path").datum(pts).attr("fill", ln.color).attr("opacity", 0.08).attr("d", areaGen);
        svg.append("path").datum(pts).attr("fill", "none").attr("stroke", ln.color).attr("stroke-width", 2).attr("d", lineGen);
        const last = pts[pts.length - 1];
        svg.append("circle").attr("cx", x(last.year)).attr("cy", y(last.value)).attr("r", 3.5).attr("fill", ln.color);
      });

      // Axes
      svg
        .append("g")
        .attr("transform", `translate(0,${h})`)
        .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")))
        .call((g) => {
          g.select(".domain").attr("stroke", "#e4e7ec");
          g.selectAll("line").remove();
          g.selectAll("text").attr("fill", "#9ca3af").attr("font-size", "10px");
        });

      svg
        .append("g")
        .call(d3.axisLeft(y).ticks(4).tickFormat((d) => (d >= 1000 ? `${d / 1000}k` : d)))
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll("line").remove();
          g.selectAll("text").attr("fill", "#9ca3af").attr("font-size", "10px");
        });

      // Hover vline
      const vline = svg
        .append("line")
        .attr("y1", 0).attr("y2", h)
        .attr("stroke", "#6b7280").attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,3").attr("opacity", 0)
        .attr("pointer-events", "none");

      // Hover dots (one per line, hidden initially)
      const hoverDots = LINES.map((ln) =>
        svg.append("circle")
          .attr("r", 5)
          .attr("fill", ln.color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("opacity", 0)
          .attr("pointer-events", "none")
      );

      const bisect = d3.bisector((d) => d.year).left;

      svg
        .append("rect")
        .attr("width", w).attr("height", h)
        .attr("fill", "transparent")
        .style("cursor", "crosshair")
        .on("mousemove", function (event) {
          const [mx] = d3.pointer(event);
          const year = Math.round(x.invert(mx));
          const idx = Math.min(bisect(worldRows, year, 1), worldRows.length - 1);
          const d = worldRows[idx];

          vline.attr("x1", x(d.year)).attr("x2", x(d.year)).attr("opacity", 1);

          LINES.forEach((ln, i) => {
            const val = d[ln.key] || 0;
            hoverDots[i].attr("cx", x(d.year)).attr("cy", y(val)).attr("opacity", 1);
          });

          const rect = el.getBoundingClientRect();
          setTooltip({
            cx: event.clientX - rect.left,
            cy: event.clientY - rect.top,
            year: d.year,
            rows: LINES.map((ln) => ({ label: ln.label, color: ln.color, v: d[ln.key] || 0 }))
              .sort((a, b) => b.v - a.v),
          });
        })
        .on("mouseleave", () => {
          vline.attr("opacity", 0);
          hoverDots.forEach((dot) => dot.attr("opacity", 0));
          setTooltip(null);
        });
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <div className="legend">
        {LINES.map((l) => (
          <div key={l.key} className="legend-item">
            <div className="legend-dot" style={{ background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
      <div ref={wrapRef} style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <svg ref={svgRef} style={{ display: "block" }} />
        {tooltip && (
          <div style={{
            position: "absolute",
            left: tooltip.cx > (wrapRef.current?.clientWidth ?? 0) / 2 ? tooltip.cx - 150 : tooltip.cx + 14,
            top: Math.max(tooltip.cy - 10, 4),
            background: "#fff",
            border: "1px solid #e4e7ec",
            borderRadius: 8,
            padding: "9px 13px",
            fontSize: 11,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            zIndex: 10,
            minWidth: 140,
          }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: "#111827", fontSize: 12 }}>
              {tooltip.year}
            </div>
            {tooltip.rows.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: 50, background: r.color, flexShrink: 0 }} />
                <span style={{ color: "#6b7280", flex: 1 }}>{r.label}</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {r.v >= 1000 ? `${(r.v / 1000).toFixed(1)}k` : r.v} TWh
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
