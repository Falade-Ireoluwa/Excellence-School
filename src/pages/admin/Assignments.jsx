import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { assignments as seedAssignments, subjectsList, classesList, teachers } from "../../data/mockData";

const emptyForm = { title: "", subject: subjectsList[0].name, class: classesList[4], teacher: teachers[0].name, dueDate: "", status: "Draft" };

export default function AdminAssignments() {
  const [list, setList] = useState(seedAssignments);
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    return list.filter((a) => {
      const matchesStatus = statusFilter === "All" || a.status === statusFilter;
      const matchesClass = classFilter === "All" || a.class === classFilter;
      return matchesStatus && matchesClass;
    });
  }, [list, statusFilter, classFilter]);

  function handleCreate(e) {
    e.preventDefault();
    const cls = classesList.indexOf(form.class);
    const total = 12 + (cls % 10);
    setList((prev) => [
      { id: `ASG-${String(prev.length + 1).padStart(3, "0")}`, submissions: 0, totalStudents: total, ...form },
      ...prev,
    ]);
    setForm(emptyForm);
    setModal(false);
  }

  return (
    <DashboardLayout title="Assignments">
      <PageHeader
        title="Assignment Tracker"
        subtitle={`${filtered.length} assignments`}
        actions={<button className="ea-btn ea-btn-primary" onClick={() => setModal(true)}><i className="bi bi-journal-plus" /> Create Assignment</button>}
      />

      <div className="ea-card">
        <div className="ea-filter-bar">
          <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            <option value="All">All Classes</option>
            {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option>Published</option>
            <option>Pending</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Teacher</th>
                <th>Due Date</th>
                <th>Submissions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.subject}</td>
                  <td>{a.class}</td>
                  <td>{a.teacher}</td>
                  <td>{new Date(a.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
                  <td>{a.submissions}/{a.totalStudents}</td>
                  <td><StatusBadge status={a.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center text-muted py-4">No assignments match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal
          title="Create Assignment"
          onClose={() => setModal(false)}
          footer={<>
            <button className="ea-btn ea-btn-outline" onClick={() => setModal(false)}>Cancel</button>
            <button className="ea-btn ea-btn-primary" form="assignment-form" type="submit">Create Assignment</button>
          </>}
        >
          <form id="assignment-form" onSubmit={handleCreate}>
            <div className="ea-form-grid">
              <div className="ea-form-group ea-form-group-full">
                <label>Assignment Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                  {subjectsList.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Class</label>
                <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
                  {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Teacher</label>
                <select value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })}>
                  {teachers.map((t) => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Due Date</label>
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
              </div>
              <div className="ea-form-group ea-form-group-full">
                <label>Status</label>
                <div className="ea-radio-group">
                  {["Draft", "Pending", "Published"].map((s) => (
                    <label key={s} className="ea-checkbox">
                      <input type="radio" name="status" checked={form.status === s} onChange={() => setForm({ ...form, status: s })} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
