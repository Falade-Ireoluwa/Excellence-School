import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import { useTheme } from "../../context/ThemeContext";
import { schoolInfo } from "../../data/mockData";

export default function AdminSettings() {
  const [form, setForm] = useState({ ...schoolInfo });
  const [saved, setSaved] = useState(false);
  const { theme, toggleTheme } = useTheme();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <DashboardLayout title="Settings">
      <PageHeader title="School Profile Settings" subtitle="Update your school's core information" />

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="ea-card">
            {saved && <div className="ea-alert-success mb-3"><i className="bi bi-check-circle" /> School profile updated successfully.</div>}
            <form onSubmit={handleSave}>
              <div className="ea-form-grid">
                <div className="ea-form-group ea-form-group-full">
                  <label>School Name</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div className="ea-form-group ea-form-group-full">
                  <label>School Address</label>
                  <input value={form.address} onChange={(e) => update("address", e.target.value)} />
                </div>
                <div className="ea-form-group">
                  <label>Phone Number</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="ea-form-group">
                  <label>Email Address</label>
                  <input value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
                <div className="ea-form-group">
                  <label>Academic Session</label>
                  <input value={form.session} onChange={(e) => update("session", e.target.value)} />
                </div>
                <div className="ea-form-group">
                  <label>Current Term</label>
                  <select value={form.term} onChange={(e) => update("term", e.target.value)}>
                    <option>First Term</option>
                    <option>Second Term</option>
                    <option>Third Term</option>
                  </select>
                </div>
                <div className="ea-form-group ea-form-group-full">
                  <label>School Motto</label>
                  <input value={form.motto} onChange={(e) => update("motto", e.target.value)} />
                </div>
              </div>
              <button type="submit" className="ea-btn ea-btn-primary mt-2"><i className="bi bi-save" /> Save Changes</button>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="ea-card text-center">
            <h3 className="ea-panel-title">School Logo</h3>
            <div className="ea-logo-crest ea-logo-crest-lg mx-auto">EN</div>
            <div className="ea-upload-box mt-3">
              <i className="bi bi-cloud-arrow-up" />
              <span>Click to upload a new logo</span>
            </div>
            <p className="text-muted small mt-2">Recommended size: 512×512px, PNG or JPG.</p>
          </div>

          <div className="ea-card mt-3">
            <h3 className="ea-panel-title">Preferences</h3>
            <label className="ea-switch-row">
              <span><i className="bi bi-moon-stars me-2" />Dark mode</span>
              <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} className="ea-switch" />
            </label>
            <label className="ea-switch-row">
              <span>Email notifications</span>
              <input type="checkbox" defaultChecked className="ea-switch" />
            </label>
            <label className="ea-switch-row">
              <span>SMS alerts to parents</span>
              <input type="checkbox" defaultChecked className="ea-switch" />
            </label>
            <label className="ea-switch-row">
              <span>Auto-publish term results</span>
              <input type="checkbox" className="ea-switch" />
            </label>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
