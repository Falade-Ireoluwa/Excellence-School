import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import { announcements as seedAnnouncements } from "../../data/mockData";

const tabs = ["All Parents", "Class Teachers"];

export default function AdminCommunication() {
  const [list, setList] = useState(seedAnnouncements);
  const [tab, setTab] = useState(tabs[0]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const filtered = list.filter((a) => a.audience === tab).sort((a, b) => new Date(b.date) - new Date(a.date));

  function handleSend(e) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setList((prev) => [
      { id: `ANN-${String(prev.length + 1).padStart(3, "0")}`, audience: tab, sender: "Admin Office", subject, message, date: new Date().toISOString() },
      ...prev,
    ]);
    setSubject("");
    setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <DashboardLayout title="Communication">
      <PageHeader title="Communication & Announcements" subtitle="Broadcast updates to parents or class teachers" />

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="ea-card">
            <div className="ea-tabs">
              {tabs.map((t) => (
                <button key={t} className={`ea-tab ${tab === t ? "ea-tab-active" : ""}`} onClick={() => setTab(t)}>
                  {t}
                </button>
              ))}
            </div>
            <ul className="ea-message-list">
              {filtered.map((a) => (
                <li key={a.id}>
                  <div className="ea-message-list-head">
                    <strong>{a.subject}</strong>
                    <span>{new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <p>{a.message}</p>
                  <span className="text-muted small">— {a.sender}</span>
                </li>
              ))}
              {filtered.length === 0 && <li className="text-muted text-center py-4">No messages sent to {tab} yet.</li>}
            </ul>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="ea-card">
            <h3 className="ea-panel-title">Compose Message</h3>
            {sent && <div className="ea-alert-success mb-3"><i className="bi bi-check-circle" /> Message sent to {tab}.</div>}
            <form onSubmit={handleSend}>
              <div className="ea-form-group">
                <label>Audience</label>
                <select value={tab} onChange={(e) => setTab(e.target.value)}>
                  {tabs.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Subject</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Resumption Date Reminder" required />
              </div>
              <div className="ea-form-group">
                <label>Message</label>
                <textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your announcement..." required />
              </div>
              <button type="submit" className="ea-btn ea-btn-primary ea-btn-block"><i className="bi bi-send" /> Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
