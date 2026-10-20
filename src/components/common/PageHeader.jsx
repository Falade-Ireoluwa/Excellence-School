export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="ea-page-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="ea-page-header-actions">{actions}</div>}
    </div>
  );
}
