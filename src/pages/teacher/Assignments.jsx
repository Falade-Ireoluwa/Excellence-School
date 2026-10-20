import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { useAuth } from "../../context/AuthContext";
import { teachers, assignments as seedAssignments } from "../../data/mockData";

export default function TeacherAssignments() {
  const { user } = useAuth();
  const teacher = teachers.find((t) => t.id === user?.teacherId) || teachers[0];
  const [list, setList] = useState(seedAssignments);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", subject: teacher.subjects[0], class: teacher.classes[0], dueDate: "", status: "Draft" });

  const mine = list.filter((a) => a.teacher === teacher.name);

  function handleCreate(e) {
    e.preventDefault();
    setList((prev) => [
      { id: `ASG-${String(prev.length + 1).padStart(3, "0")}`, teacher: teacher.name, submissions: 0, totalStudents: 20, ...form },
      ...prev,
    ]);
    setForm({ title: "", subject: teacher.subjects[0], class: teacher.classes[0], dueDate: "", status: "Draft" });
    setModal(false);
  }

  function togglePublish(id) {
    setList((prev) => prev.map((a) => (a.id === id ? { ...a, status: a.status === "Published" ? "Draft" : "Published" } : a)));
  }

  return (
    <DashboardLayout title="Assignments">
      <PageHeader
        title="My Assignments"
        subtitle={`${mine.length} assignments created`}
        actions={<button className="ea-btn ea-btn-primary" onClick={() => setModal(true)}><i className="bi bi-journal-plus" /> Create Assignment</button>}
      />

      <div className="ea-card">
        <div className="table-responsive">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Due Date</th>
                <th>Submissions</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mine.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.subject}</td>
                  <td>{a.class}</td>
                  <td>{new Date(a.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
                  <td>{a.submissions}/{a.totalStudents}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className="text-end">
                    <button className="ea-btn ea-btn-outline ea-btn-sm" onClick={() => togglePublish(a.id)}>
                      {a.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
              {mine.length === 0 && <tr><td colSpan={7} className="text-center text-muted py-4">You haven't created any assignments yet.</td></tr>}
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
            <button className="ea-btn ea-btn-primary" form="t-assignment-form" type="submit">Create Assignment</button>
          </>}
        >
          <form id="t-assignment-form" onSubmit={handleCreate}>
            <div className="ea-form-grid">
              <div className="ea-form-group ea-form-group-full">
                <label>Assignment Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                  {teacher.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Class</label>
                <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
                  {teacher.classes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Due Date</label>
                <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Draft</option>
                  <option>Pending</option>
                  <option>Published</option>
                </select>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
