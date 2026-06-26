import { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { energyData, SOURCES, SOURCE_LABELS, SOURCE_COLORS } from "../data/energy";

const world2024 = energyData.find((d) => d.country === "World" && d.year === 2024);
const total = SOURCES.reduce((s, k) => s + (world2024[k] || 0), 0);

const slices = SOURCES.map((k) => ({
  label: SOURCE_LABELS[k],
  color: SOURCE_COLORS[k],
  value: world2024[k] || 0,
  pct: Math.round(((world2024[k] || 0) / total) * 100),
}))
  .filter((s) => s.value > 0)
  .sort((a, b) => b.value - a.value);

export default function DonutChart() {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const draw = () => {
      const sz = Math.min(el.clientWidth, el.clientHeight);
      if (sz < 40) return;

      d3.select(svgRef.current).selectAll("*").remove();

      const r = sz / 2 - 6;
      const inner = r * 0.56;

      const svg = d3
        .select(svgRef.current)
        .attr("width", sz).attr("height", sz)
        .append("g")
        .attr("transform", `translate(${sz / 2},${sz / 2})`);

      const pie = d3.pie().value((d) => d.value).sort(null);
      const arc     = d3.arc().innerRadius(inner).outerRadius(r).padAngle(0.02).cornerRadius(3);
      const arcHover = d3.arc().innerRadius(inner).outerRadius(r + 7).padAngle(0.02).cornerRadius(3);

      // Center labels (mutated on hover)
      const centerTop = svg
        .append("text")
        .attr("text-anchor", "middle").attr("dy", "-0.2em")
        .attr("font-size", sz * 0.13).attr("font-weight", "700")
        .attr("fill", "#111827").text("2024");

      const centerBot = svg
        .append("text")
        .attr("text-anchor", "middle").attr("dy", "1.1em")
        .attr("font-size", sz * 0.075).attr("fill", "#9ca3af")
        .text("World Mix");

      svg
        .selectAll("path")
        .data(pie(slices))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.data.color)
        .attr("opacity", 0.88)
        .style("cursor", "pointer")
        .on("mouseenter", function (_, d) {
          d3.select(this)
            .transition().duration(150)
            .attr("d", arcHover)
            .attr("opacity", 1);

          // Dim all others
          svg.selectAll("path")
            .filter((p) => p !== d)
            .transition().duration(150)
            .attr("opacity", 0.3);

          centerTop
            .transition().duration(100)
            .text(`${d.data.pct}%`)
            .attr("fill", d.data.color);
          centerBot
            .transition().duration(100)
            .text(d.data.label);
        })
        .on("mouseleave", function () {
          svg.selectAll("path")
            .transition().duration(150)
            .attr("d", arc)
            .attr("opacity", 0.88);

          centerTop.transition().duration(100).text("2024").attr("fill", "#111827");
          centerBot.transition().duration(100).text("World Mix");
        });
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="donut-body">
      <div ref={wrapRef} style={{ width: "44%", aspectRatio: "1", flexShrink: 0 }}>
        <svg ref={svgRef} style={{ display: "block" }} />
      </div>
      <div className="donut-legend">
        {slices.map((s) => (
          <div key={s.label} className="donut-legend-row">
            <div className="donut-legend-dot" style={{ background: s.color }} />
            <span className="donut-legend-name">{s.label}</span>
            <span className="donut-legend-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
