import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { schoolInfo } from "../../data/mockData";
import Logo from "../../components/layout/Logo";

const steps = ["School Profile", "Academic Session", "Confirm"];

export default function SchoolSetup() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: schoolInfo.name,
    address: schoolInfo.address,
    phone: schoolInfo.phone,
    session: schoolInfo.session,
    term: schoolInfo.term,
  });
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleNext(e) {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else navigate("/login");
  }

  return (
    <div className="ea-centered-screen">
      <div className="ea-auth-form-card ea-setup-card">
        <div className="ea-recovery-logo"><Logo compact /></div>
        <h2>Let's set up your school</h2>
        <p className="ea-auth-subtitle">A few quick details before your dashboard is ready.</p>

        <div className="ea-setup-steps">
          {steps.map((s, i) => (
            <div key={s} className={`ea-setup-step ${i === step ? "ea-setup-step-active" : ""} ${i < step ? "ea-setup-step-done" : ""}`}>
              <span className="ea-setup-step-num">{i < step ? <i className="bi bi-check" /> : i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleNext}>
          {step === 0 && (
            <>
              <div className="ea-form-group">
                <label>School Name</label>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} required />
              </div>
              <div className="ea-form-group">
                <label>School Address</label>
                <input value={form.address} onChange={(e) => update("address", e.target.value)} required />
              </div>
              <div className="ea-form-group">
                <label>Phone Number</label>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
              </div>
              <div className="ea-form-group">
                <label>School Logo</label>
                <div className="ea-upload-box">
                  <i className="bi bi-cloud-arrow-up" />
                  <span>Click to upload, or drag and drop (PNG, JPG)</span>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="ea-form-group">
                <label>Current Academic Session</label>
                <input value={form.session} onChange={(e) => update("session", e.target.value)} required />
              </div>
              <div className="ea-form-group">
                <label>Current Term</label>
                <select value={form.term} onChange={(e) => update("term", e.target.value)}>
                  <option>First Term</option>
                  <option>Second Term</option>
                  <option>Third Term</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="ea-setup-summary">
              <div><span>School Name</span><strong>{form.name}</strong></div>
              <div><span>Address</span><strong>{form.address}</strong></div>
              <div><span>Phone</span><strong>{form.phone}</strong></div>
              <div><span>Session</span><strong>{form.session}</strong></div>
              <div><span>Term</span><strong>{form.term}</strong></div>
            </div>
          )}

          <div className="d-flex gap-2 mt-3">
            {step > 0 && (
              <button type="button" className="ea-btn ea-btn-outline ea-btn-block" onClick={() => setStep(step - 1)}>
                Back
              </button>
            )}
            <button type="submit" className="ea-btn ea-btn-primary ea-btn-block">
              {step < steps.length - 1 ? "Continue" : "Finish Setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
