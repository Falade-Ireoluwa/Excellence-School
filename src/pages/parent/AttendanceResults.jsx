import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { getChildrenForParent, attendanceByClass, weekDays, getResultsByStudent } from "../../data/mockData";

const iconFor = { P: "bi-check-lg", A: "bi-x-lg", L: "bi-clock-history" };
const classFor = { P: "ea-att-present", A: "ea-att-absent", L: "ea-att-late" };

export default function ParentAttendanceResults() {
  const { user } = useAuth();
  const children = getChildrenForParent(user?.childrenIds || []);
  const [activeChild, setActiveChild] = useState(children[0]?.id);
  const child = children.find((c) => c.id === activeChild) || children[0];

  const attendanceRow = child ? (attendanceByClass[child.class] || []).find((r) => r.studentId === child.id) : null;
  const results = child ? getResultsByStudent(child.id) : [];
  const average = results.length ? Math.round(results.reduce((s, r) => s + r.total, 0) / results.length) : 0;

  return (
    <DashboardLayout title="Attendance & Results">
      <PageHeader title="Attendance & Results" subtitle="Track attendance history and termly academic performance" />

      <div className="ea-child-switcher">
        {children.map((c) => (
          <button key={c.id} className={`ea-child-chip ${activeChild === c.id ? "ea-child-chip-active" : ""}`} onClick={() => setActiveChild(c.id)}>
            <span className="ea-avatar" style={{ background: c.avatarColor }}>{c.initials}</span>
            {c.name}
          </button>
        ))}
      </div>

      {child && (
        <div className="row g-3 mt-1">
          <div className="col-lg-5">
            <div className="ea-card ea-panel">
              <div className="ea-panel-header"><h3>This Week's Attendance</h3></div>
              {attendanceRow ? (
                <div className="ea-week-attendance">
                  {weekDays.map((d, i) => (
                    <div key={d} className="ea-week-attendance-item">
                      <span>{d}</span>
                      <span className={`ea-att-mark ${classFor[attendanceRow.marks[i]]}`}>
                        <i className={`bi ${iconFor[attendanceRow.marks[i]]}`} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-muted">No attendance record found.</p>}
              <p className="text-muted mt-3 mb-0">Term-to-date attendance rate: <strong>{child.attendanceRate}%</strong></p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="ea-card ea-panel">
              <div className="ea-panel-header">
                <h3>Termly Grade Report</h3>
                <span className="ea-badge-pill ea-badge-neutral">Average: {average}</span>
              </div>
              <div className="table-responsive">
                <table className="ea-table">
                  <thead>
                    <tr><th>Subject</th><th className="text-center">CA</th><th className="text-center">Exam</th><th className="text-center">Total</th><th className="text-center">Grade</th></tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td>{r.subject}</td>
                        <td className="text-center">{r.ca}</td>
                        <td className="text-center">{r.exam}</td>
                        <td className="text-center"><strong>{r.total}</strong></td>
                        <td className="text-center"><span className={`ea-grade-pill ea-grade-${r.grade}`}>{r.grade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
