import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import { classesList, teachers, getStudentsByClass } from "../../data/mockData";

const rooms = ["Block A · Room 1", "Block A · Room 2", "Block A · Room 3", "Block A · Room 4", "Block B · Room 1", "Block B · Room 2", "Block B · Room 3", "Block B · Room 4", "Block C · Room 1", "Block C · Room 2"];
const capacities = [15, 15, 18, 18, 22, 22, 24, 24, 24, 25];

// Start from whoever is already linked to each class in the mock data
const initialAssignments = Object.fromEntries(
  classesList.map((cls) => [cls, teachers.find((t) => t.classes.includes(cls))?.id || ""])
);

export default function AdminClasses() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [rosterClass, setRosterClass] = useState(null);
  const [assignClass, setAssignClass] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [saved, setSaved] = useState("");

  const activeTeachers = teachers.filter((t) => t.status === "Active");
  const teacherFor = (cls) => teachers.find((t) => t.id === assignments[cls]);

  function openAssign(cls) {
    setAssignClass(cls);
    setSelectedTeacher(assignments[cls] || "");
  }

  function handleAssign(e) {
    e.preventDefault();
    setAssignments((prev) => ({ ...prev, [assignClass]: selectedTeacher }));
    const t = teachers.find((x) => x.id === selectedTeacher);
    setSaved(t ? `${t.name} is now the class teacher of ${assignClass}.` : `${assignClass} now has no class teacher.`);
    setAssignClass(null);
    setTimeout(() => setSaved(""), 3000);
  }

  return (
    <DashboardLayout title="Classes">
      <PageHeader title="Class Management" subtitle={`${classesList.length} classes across the school`} />

      {saved && <div className="ea-alert-success mb-3"><i className="bi bi-check-circle" /> {saved}</div>}

      <div className="row g-3">
        {classesList.map((cls, i) => {
          const roster = getStudentsByClass(cls);
          const teacher = teacherFor(cls);
          const pct = Math.round((roster.length / capacities[i]) * 100);
          return (
            <div className="col-md-6 col-xl-4" key={cls}>
              <div className="ea-card ea-class-card">
                <div className="ea-class-card-head">
                  <h3>{cls}</h3>
                  <span className="ea-badge-pill ea-badge-neutral">{rooms[i]}</span>
                </div>

                <div className="ea-class-teacher">
                  <span className="ea-avatar" style={{ background: teacher ? "var(--ea-red)" : "var(--ea-text-muted)" }}>
                    {teacher ? teacher.initials : "—"}
                  </span>
                  <div>
                    <span className="text-muted small">Class Teacher</span>
                    <p>{teacher ? teacher.name : "Unassigned"}</p>
                  </div>
                </div>

                <div className="ea-class-capacity">
                  <div className="d-flex justify-content-between">
                    <span>{roster.length} students</span>
                    <span className="text-muted">of {capacities[i]}</span>
                  </div>
                  <div className="ea-progress">
                    <div className="ea-progress-bar" style={{ width: `${pct}%`, background: pct > 90 ? "var(--ea-red)" : "var(--ea-green)" }} />
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button className="ea-btn ea-btn-outline flex-fill" onClick={() => setRosterClass(cls)}>
                    <i className="bi bi-eye" /> Roster
                  </button>
                  <button className="ea-btn ea-btn-primary flex-fill" onClick={() => openAssign(cls)}>
                    <i className="bi bi-person-check" /> {teacher ? "Change Teacher" : "Assign Teacher"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {assignClass && (
        <Modal
          title={`Assign Teacher · ${assignClass}`}
          onClose={() => setAssignClass(null)}
          footer={
            <>
              <button className="ea-btn ea-btn-outline" onClick={() => setAssignClass(null)}>Cancel</button>
              <button className="ea-btn ea-btn-primary" form="assign-form" type="submit">Save Assignment</button>
            </>
          }
        >
          <form id="assign-form" onSubmit={handleAssign}>
            <div className="ea-form-group">
              <label>Class Teacher</label>
              <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                <option value="">— No class teacher —</option>
                {activeTeachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.department})
                  </option>
                ))}
              </select>
            </div>
            <p className="text-muted small mb-0">
              The selected teacher becomes responsible for taking attendance and entering results for {assignClass}.
            </p>
          </form>
        </Modal>
      )}

      {rosterClass && (
        <Modal
          title={`${rosterClass} · Roster`}
          onClose={() => setRosterClass(null)}
          footer={<button className="ea-btn ea-btn-outline" onClick={() => setRosterClass(null)}>Close</button>}
          size="ea-modal-lg"
        >
          <div className="table-responsive">
            <table className="ea-table">
              <thead>
                <tr><th>Student</th><th>Admission No.</th><th>Gender</th><th>Attendance</th><th>Status</th></tr>
              </thead>
              <tbody>
                {getStudentsByClass(rosterClass).map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="ea-table-person">
                        <span className="ea-avatar" style={{ background: s.avatarColor }}>{s.initials}</span>
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td>{s.admissionNo}</td>
                    <td>{s.gender}</td>
                    <td>{s.attendanceRate}%</td>
                    <td><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}