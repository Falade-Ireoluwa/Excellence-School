import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const roleTitle = {
  admin: "Administrator",
  teacher: "Teacher",
  parent: "Parent",
};

export default function Topbar({ onMenuClick, title }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="ea-topbar">
      <button className="ea-menu-btn d-lg-none" onClick={onMenuClick} aria-label="Open menu">
        <i className="bi bi-list" />
      </button>

      <div className="ea-topbar-title">
        <h1>{title}</h1>
      </div>

      <div className="ea-topbar-actions">
        <button className="ea-icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode" title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`} />
        </button>

        <button className="ea-icon-btn" aria-label="Notifications">
          <i className="bi bi-bell" />
          <span className="ea-badge-dot">3</span>
        </button>

        <div className="ea-user-menu">
          <button className="ea-user-trigger" onClick={() => setMenuOpen((v) => !v)}>
            <span className="ea-avatar" style={{ background: "var(--ea-green)" }}>{user?.initials}</span>
            <span className="ea-user-name d-none d-md-inline">{user?.name}</span>
            <i className="bi bi-chevron-down d-none d-md-inline" />
          </button>
          {menuOpen && (
            <div className="ea-user-dropdown">
              <div className="ea-user-dropdown-header">
                <strong>{user?.name}</strong>
                <span>{roleTitle[user?.role]}</span>
              </div>
              <button className="ea-dropdown-item" onClick={() => setMenuOpen(false)}>
                <i className="bi bi-person" /> My Profile
              </button>
              <button className="ea-dropdown-item" onClick={() => setMenuOpen(false)}>
                <i className="bi bi-gear" /> Settings
              </button>
              <hr />
              <button className="ea-dropdown-item ea-dropdown-item-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
