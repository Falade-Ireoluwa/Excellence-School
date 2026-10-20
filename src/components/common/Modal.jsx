export default function Modal({ title, onClose, children, footer, size = "" }) {
  return (
    <div className="ea-modal-backdrop" onClick={onClose}>
      <div className={`ea-modal-dialog ${size}`} onClick={(e) => e.stopPropagation()}>
        <div className="ea-modal-header">
          <h3>{title}</h3>
          <button className="ea-icon-btn" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="ea-modal-body">{children}</div>
        {footer && <div className="ea-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
