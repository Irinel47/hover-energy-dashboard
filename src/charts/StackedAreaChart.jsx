import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { energyData, SOURCES, SOURCE_LABELS, SOURCE_COLORS } from "../data/energy";

const worldData = energyData
  .filter((d) => d.country === "World")
  .sort((a, b) => a.year - b.year);

export default function StackedAreaChart() {
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

      const m = { top: 8, right: 16, bottom: 26, left: 50 };
      const w = W - m.left - m.right;
      const h = H - m.top - m.bottom;

      d3.select(svgRef.current).selectAll("*").remove();

      const svg = d3
        .select(svgRef.current)
        .attr("width", W)
        .attr("height", H)
        .append("g")
        .attr("transform", `translate(${m.left},${m.top})`);

      const stack = d3.stack().keys(SOURCES)(worldData);

      const x = d3
        .scaleLinear()
        .domain(d3.extent(worldData, (d) => d.year))
        .range([0, w]);

      const yMax = d3.max(stack[stack.length - 1], (d) => d[1]);
      const y = d3.scaleLinear().domain([0, yMax * 1.02]).range([h, 0]);

      // Grid
      svg
        .append("g")
        .call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat(""))
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll("line").attr("stroke", "#e4e7ec").attr("stroke-dasharray", "3,3");
        });

      // Areas
      const area = d3
        .area()
        .x((d) => x(d.data.year))
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1]))
        .curve(d3.curveCatmullRom);

      svg
        .selectAll(".layer")
        .data(stack)
        .enter()
        .append("path")
        .attr("class", "layer")
        .attr("fill", (d) => SOURCE_COLORS[d.key])
        .attr("opacity", 0.87)
        .attr("d", area);

      // X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${h})`)
        .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format("d")))
        .call((g) => {
          g.select(".domain").attr("stroke", "#e4e7ec");
          g.selectAll("line").remove();
          g.selectAll("text").attr("fill", "#9ca3af").attr("font-size", "10px");
        });

      // Y axis
      svg
        .append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat((d) => (d >= 1000 ? `${d / 1000}k` : d)))
        .call((g) => {
          g.select(".domain").remove();
          g.selectAll("line").remove();
          g.selectAll("text").attr("fill", "#9ca3af").attr("font-size", "10px");
        });

      // Hover crosshair
      const vline = svg
        .append("line")
        .attr("y1", 0).attr("y2", h)
        .attr("stroke", "#6b7280").attr("stroke-width", 1)
        .attr("stroke-dasharray", "4,3").attr("opacity", 0)
        .attr("pointer-events", "none");

      const bisect = d3.bisector((d) => d.year).left;

      svg
        .append("rect")
        .attr("width", w).attr("height", h)
        .attr("fill", "transparent")
        .style("cursor", "crosshair")
        .on("mousemove", function (event) {
          const [mx] = d3.pointer(event);
          const year = Math.round(x.invert(mx));
          const idx = Math.min(bisect(worldData, year, 1), worldData.length - 1);
          const d = worldData[idx];
          vline.attr("x1", x(d.year)).attr("x2", x(d.year)).attr("opacity", 1);
          const rect = el.getBoundingClientRect();
          setTooltip({
            cx: event.clientX - rect.left,
            cy: event.clientY - rect.top,
            year: d.year,
            total: d.primary_energy,
            rows: SOURCES
              .map((k) => ({ label: SOURCE_LABELS[k], color: SOURCE_COLORS[k], v: d[k] || 0 }))
              .filter((r) => r.v > 0)
              .sort((a, b) => b.v - a.v),
          });
        })
        .on("mouseleave", () => {
          vline.attr("opacity", 0);
          setTooltip(null);
        });
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, position: "relative" }}>
      <div className="legend">
        {SOURCES.map((k) => (
          <div key={k} className="legend-item">
            <div className="legend-dot" style={{ background: SOURCE_COLORS[k] }} />
            {SOURCE_LABELS[k]}
          </div>
        ))}
      </div>
      <div ref={wrapRef} style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <svg ref={svgRef} style={{ display: "block" }} />
        {tooltip && (
          <div style={{
            position: "absolute",
            left: tooltip.cx > (wrapRef.current?.clientWidth ?? 0) / 2 ? tooltip.cx - 180 : tooltip.cx + 14,
            top: Math.max(tooltip.cy - 10, 4),
            background: "#fff",
            border: "1px solid #e4e7ec",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 11,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            zIndex: 10,
            minWidth: 160,
          }}>
            <div style={{ fontWeight: 700, marginBottom: 7, color: "#111827", fontSize: 12 }}>
              {tooltip.year} · {(tooltip.total / 1000).toFixed(0)}k TWh
            </div>
            {tooltip.rows.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                <span style={{ color: "#6b7280", flex: 1 }}>{r.label}</span>
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {r.v >= 1000 ? `${(r.v / 1000).toFixed(1)}k` : r.v}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
