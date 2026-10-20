import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/layout/Logo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="ea-centered-screen">
      <div className="ea-auth-form-card ea-recovery-card">
        <div className="ea-recovery-logo"><Logo compact /></div>

        {!sent ? (
          <>
            <h2>Forgot your password?</h2>
            <p className="ea-auth-subtitle">
              Enter the email address linked to your account and we'll send a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="ea-form-group">
                <label>Email Address</label>
                <div className="ea-input-icon">
                  <i className="bi bi-envelope" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@excellenceacademy.edu.ng" required />
                </div>
              </div>
              <button type="submit" className="ea-btn ea-btn-primary ea-btn-block">Send Reset Link</button>
            </form>
          </>
        ) : (
          <div className="ea-recovery-success">
            <i className="bi bi-check-circle-fill" />
            <h2>Check your inbox</h2>
            <p>We've sent a password reset link to <strong>{email}</strong>.</p>
          </div>
        )}

        <Link to="/login" className="ea-link ea-back-link">
          <i className="bi bi-arrow-left" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
