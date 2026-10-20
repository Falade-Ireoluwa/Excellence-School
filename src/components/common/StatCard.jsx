const accentClass = {
  green: "ea-stat-icon-green",
  red: "ea-stat-icon-red",
  success: "ea-stat-icon-success",
  amber: "ea-stat-icon-amber",
};

export default function StatCard({ icon, label, value, trend, trendUp = true, accent = "green" }) {
  return (
    <div className="ea-card ea-stat-card">
      <div className={`ea-stat-icon ${accentClass[accent] || accentClass.green}`}>
        <i className={`bi ${icon}`} />
      </div>
      <div className="ea-stat-body">
        <span className="ea-stat-label">{label}</span>
        <span className="ea-stat-value">{value}</span>
        {trend && (
          <span className={`ea-stat-trend ${trendUp ? "ea-trend-up" : "ea-trend-down"}`}>
            <i className={`bi ${trendUp ? "bi-arrow-up-right" : "bi-arrow-down-right"}`} />
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
