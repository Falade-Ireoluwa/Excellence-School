const classFor = {
  Active: "ea-badge-green",
  Inactive: "ea-badge-red",
  Paid: "ea-badge-green",
  "Partially Paid": "ea-badge-amber",
  NO: "ea-badge-red",
  Published: "ea-badge-green",
  Pending: "ea-badge-amber",
  Draft: "ea-badge-gray",
  P: "ea-badge-green",
  A: "ea-badge-red",
  L: "ea-badge-amber",
};

export default function StatusBadge({ status }) {
  const cls = classFor[status] || "ea-badge-gray";
  return (
    <span className={`ea-badge-pill ${cls}`}>
      {status === "NO" ? "Not Paid" : status}
    </span>
  );
}
