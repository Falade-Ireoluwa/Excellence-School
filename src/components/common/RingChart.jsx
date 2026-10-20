export default function RingChart({ percent, color = "var(--ea-red)", size = 160, label, sub }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const style = {
    width: size,
    height: size,
    background: `conic-gradient(${color} ${clamped * 3.6}deg, var(--ea-surface-alt) 0deg)`,
  };

  return (
    <div className="ea-ring-wrap">
      <div className="ea-ring" style={style}>
        <div className="ea-ring-hole">
          <span className="ea-ring-value">{clamped}%</span>
          {label && <span className="ea-ring-label">{label}</span>}
        </div>
      </div>
      {sub && <p className="ea-ring-sub">{sub}</p>}
    </div>
  );
}
