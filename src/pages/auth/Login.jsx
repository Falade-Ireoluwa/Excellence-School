import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { schoolInfo, demoAccounts } from "../../data/mockData";
import Logo from "../../components/layout/Logo";

const roles = [
  { key: "admin", label: "Admin", icon: "bi-person-gear" },
  { key: "teacher", label: "Teacher", icon: "bi-person-workspace" },
  { key: "parent", label: "Parent", icon: "bi-people" },
];

export default function Login() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState(demoAccounts.admin.email);
  const [password, setPassword] = useState(demoAccounts.admin.password);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleRoleChange(key) {
    setRole(key);
    setEmail(demoAccounts[key].email);
    setPassword(demoAccounts[key].password);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(role, email, password);
    if (result.success) {
      navigate(`/${role}`);
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="ea-auth-screen">
      <button className="ea-icon-btn ea-theme-toggle-floating" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode">
        <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon-stars"}`} />
      </button>
      <div className="ea-auth-brand">
        <Logo light />
        <div className="ea-auth-brand-content">
          <h1>Manage your school, all in one place.</h1>
          <p>
            Attendance, results, fees and communication for {schoolInfo.name} — built for administrators,
            teachers and parents alike.
          </p>
          <ul className="ea-auth-brand-list">
            <li><i className="bi bi-check-circle" /> Real-time attendance & academic tracking</li>
            <li><i className="bi bi-check-circle" /> Transparent fee & payment history</li>
            <li><i className="bi bi-check-circle" /> Direct messaging between school and home</li>
          </ul>
        </div>
        <span className="ea-auth-brand-footer">© {new Date().getFullYear()} {schoolInfo.shortName}</span>
      </div>

      <div className="ea-auth-form-wrap">
        <div className="ea-auth-form-card">
          <h2>Welcome back</h2>
          <p className="ea-auth-subtitle">Sign in to continue to your dashboard</p>

          <div className="ea-role-selector">
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                className={`ea-role-btn ${role === r.key ? "ea-role-btn-active" : ""}`}
                onClick={() => handleRoleChange(r.key)}
              >
                <i className={`bi ${r.icon}`} />
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div className="ea-alert-error">{error}</div>}

            <div className="ea-form-group">
              <label>Email Address</label>
              <div className="ea-input-icon">
                <i className="bi bi-envelope" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@excellenceacademy.edu.ng" required />
              </div>
            </div>

            <div className="ea-form-group">
              <label>Password</label>
              <div className="ea-input-icon">
                <i className="bi bi-lock" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
            </div>

            <div className="ea-form-row-between">
              <label className="ea-checkbox">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <Link to="/forgot-password" className="ea-link">Forgot password?</Link>
            </div>

            <button type="submit" className="ea-btn ea-btn-primary ea-btn-block">Sign In</button>
          </form>

          <div className="ea-demo-hint">
            <i className="bi bi-info-circle" /> Demo credentials are pre-filled for the <strong>{role}</strong> role — just click Sign In.
          </div>
        </div>
      </div>
    </div>
  );
}
