import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";

const navByRole = {
  admin: [
    { to: "/admin", label: "Overview", icon: "bi-speedometer2", end: true },
    { to: "/admin/students", label: "Students", icon: "bi-people" },
    { to: "/admin/teachers", label: "Teachers", icon: "bi-person-badge" },
    { to: "/admin/classes", label: "Classes", icon: "bi-door-open" },
    { to: "/admin/subjects", label: "Subjects", icon: "bi-journal-bookmark" },
    { to: "/admin/attendance", label: "Attendance", icon: "bi-calendar-check" },
    { to: "/admin/results", label: "Results", icon: "bi-bar-chart-line" },
    { to: "/admin/fees", label: "Fees", icon: "bi-cash-stack" },
    { to: "/admin/assignments", label: "Assignments", icon: "bi-clipboard-data" },
    { to: "/admin/communication", label: "Communication", icon: "bi-megaphone" },
    { to: "/admin/settings", label: "Settings", icon: "bi-gear" },
  ],
  teacher: [
    { to: "/teacher", label: "Overview", icon: "bi-speedometer2", end: true },
    { to: "/teacher/classes", label: "My Classes", icon: "bi-door-open" },
    { to: "/teacher/attendance-results", label: "Attendance & Results", icon: "bi-clipboard-check" },
    { to: "/teacher/assignments", label: "Assignments", icon: "bi-clipboard-data" },
  ],
  parent: [
    { to: "/parent", label: "Children Overview", icon: "bi-people", end: true },
    { to: "/parent/attendance-results", label: "Attendance & Results", icon: "bi-clipboard-check" },
    { to: "/parent/fees-messages", label: "Fees & Messages", icon: "bi-cash-stack" },
    { to: "/parent/report", label: "Report Sheet", icon: "bi-file-earmark-text" },
  ],
};

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const items = navByRole[user?.role] || [];

  return (
    <>
      <aside className={`ea-sidebar ${open ? "ea-sidebar-open" : ""}`}>
        <div className="ea-sidebar-brand">
          <Logo light />
          <button className="ea-sidebar-close d-lg-none" onClick={onClose} aria-label="Close menu">
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <nav className="ea-sidebar-nav">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `ea-nav-link ${isActive ? "ea-nav-link-active" : ""}`}
              onClick={onClose}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="ea-sidebar-footer">
          <i className="bi bi-shield-check" />
          <span>{new Date().getFullYear()} © Excellence Academy</span>
        </div>
      </aside>
      {open && <div className="ea-sidebar-backdrop d-lg-none" onClick={onClose} />}
    </>
  );
}
