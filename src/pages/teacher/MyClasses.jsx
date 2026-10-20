import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import Modal from "../../components/common/Modal";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { teachers, getStudentsByClass } from "../../data/mockData";

export default function TeacherMyClasses() {
  const { user } = useAuth();
  const teacher = teachers.find((t) => t.id === user?.teacherId) || teachers[0];
  const [activeClass, setActiveClass] = useState(null);

  return (
    <DashboardLayout title="My Classes">
      <PageHeader title="My Classes" subtitle={`${teacher.classes.length} classes assigned to ${teacher.name}`} />

      <div className="row g-3">
        {teacher.classes.map((cls) => {
          const roster = getStudentsByClass(cls);
          return (
            <div className="col-md-6 col-xl-4" key={cls}>
              <div className="ea-card ea-class-card">
                <div className="ea-class-card-head">
                  <h3>{cls}</h3>
                  <span className="ea-badge-pill ea-badge-neutral">{teacher.subjects.join(", ")}</span>
                </div>
                <p className="text-muted">{roster.length} students enrolled</p>
                <button className="ea-btn ea-btn-outline ea-btn-block" onClick={() => setActiveClass(cls)}>
                  <i className="bi bi-eye" /> View Roster
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeClass && (
        <Modal title={`${activeClass} · Roster`} onClose={() => setActiveClass(null)} footer={<button className="ea-btn ea-btn-outline" onClick={() => setActiveClass(null)}>Close</button>} size="ea-modal-lg">
          <div className="table-responsive">
            <table className="ea-table">
              <thead><tr><th>Student</th><th>Admission No.</th><th>Attendance</th><th>Status</th></tr></thead>
              <tbody>
                {getStudentsByClass(activeClass).map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="ea-table-person">
                        <span className="ea-avatar" style={{ background: s.avatarColor }}>{s.initials}</span>
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td>{s.admissionNo}</td>
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
