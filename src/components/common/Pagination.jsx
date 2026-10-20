export default function Pagination({ page, totalPages, onChange, totalItems, pageSize }) {
  if (totalPages <= 1) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="ea-pagination">
      <span className="ea-pagination-info">
        Showing {start}–{end} of {totalItems}
      </span>
      <div className="ea-pagination-controls">
        <button className="ea-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          <i className="bi bi-chevron-left" />
        </button>
        {pages.map((p, i) => (
          <span key={p} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && pages[i - 1] !== p - 1 && <span className="ea-page-ellipsis">…</span>}
            <button className={`ea-page-btn ${p === page ? "ea-page-btn-active" : ""}`} onClick={() => onChange(p)}>
              {p}
            </button>
          </span>
        ))}
        <button className="ea-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          <i className="bi bi-chevron-right" />
        </button>
      </div>
    </div>
  );
}
