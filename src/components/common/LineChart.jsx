export default function LineChart({ data, height = 180, color = "var(--ea-green-ink)", valueKey = "rate", labelKey = "day" }) {
  const width = 560;
  const padding = 28;
  const values = data.map((d) => d[valueKey]);
  const max = Math.max(...values, 100);
  const min = Math.min(...values, 0);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i * (width - padding * 2)) / (data.length - 1 || 1);
    const y = height - padding - ((d[valueKey] - min) / range) * (height - padding * 2);
    return { x, y, ...d };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${path} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="ea-linechart" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ea-area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.22 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={padding}
          x2={width - padding}
          y1={padding + f * (height - padding * 2)}
          y2={padding + f * (height - padding * 2)}
          style={{ stroke: "var(--ea-border)" }}
          strokeWidth="1"
        />
      ))}
      <path d={areaPath} fill="url(#ea-area-fill)" stroke="none" />
      <path d={path} fill="none" style={{ stroke: color }} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" style={{ fill: "var(--ea-surface)", stroke: color }} strokeWidth="2.5" />
          <text x={p.x} y={height - 6} textAnchor="middle" className="ea-chart-label">
            {p[labelKey]}
          </text>
        </g>
      ))}
    </svg>
  );
}
