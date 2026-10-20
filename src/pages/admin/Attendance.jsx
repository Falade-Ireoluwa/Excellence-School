import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import { classesList, weekDays, attendanceByClass } from "../../data/mockData";

const cycle = { P: "A", A: "L", L: "P" };
const iconFor = { P: "bi-check-lg", A: "bi-x-lg", L: "bi-clock-history" };
const classFor = { P: "ea-att-present", A: "ea-att-absent", L: "ea-att-late" };

export default function AdminAttendance() {
  const [selectedClass, setSelectedClass] = useState(classesList[4]);
  const [records, setRecords] = useState(attendanceByClass);
  const [saved, setSaved] = useState(false);

  const roster = records[selectedClass] || [];

  const todayStats = useMemo(() => {
    const lastCol = roster.map((r) => r.marks[r.marks.length - 1]);
    const present = lastCol.filter((m) => m === "P").length;
    const absent = lastCol.filter((m) => m === "A").length;
    const late = lastCol.filter((m) => m === "L").length;
    return { present, absent, late, total: roster.length };
  }, [roster]);

  function toggleMark(studentId, dayIndex) {
    setSaved(false);
    setRecords((prev) => {
      const updated = { ...prev };
      updated[selectedClass] = updated[selectedClass].map((r) => {
        if (r.studentId !== studentId) return r;
        const marks = [...r.marks];
        marks[dayIndex] = cycle[marks[dayIndex]];
        return { ...r, marks };
      });
      return updated;
    });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <DashboardLayout title="Attendance">
      <PageHeader
        title="Attendance Tracker"
        subtitle="Click a mark to cycle Present → Absent → Late"
        actions={
          <select className="ea-select-inline" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      />

      <div className="ea-stat-grid ea-stat-grid-4">
        <div className="ea-card ea-mini-stat"><span>{todayStats.total}</span><p>Total Students</p></div>
        <div className="ea-card ea-mini-stat ea-mini-stat-green"><span>{todayStats.present}</span><p>Present Today</p></div>
        <div className="ea-card ea-mini-stat ea-mini-stat-red"><span>{todayStats.absent}</span><p>Absent Today</p></div>
        <div className="ea-card ea-mini-stat ea-mini-stat-amber"><span>{todayStats.late}</span><p>Late Today</p></div>
      </div>

      <div className="ea-card mt-3">
        {saved && <div className="ea-alert-success mb-3"><i className="bi bi-check-circle" /> Attendance saved for {selectedClass}.</div>}
        <div className="table-responsive">
          <table className="ea-table ea-attendance-table">
            <thead>
              <tr>
                <th>Student</th>
                {weekDays.map((d) => <th key={d} className="text-center">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {roster.map((r) => (
                <tr key={r.studentId}>
                  <td>
                    <div className="ea-table-person">
                      <span className="ea-avatar" style={{ background: "var(--ea-green)" }}>{r.initials}</span>
                      <span>{r.name}</span>
                    </div>
                  </td>
                  {r.marks.map((m, i) => (
                    <td key={i} className="text-center">
                      <button className={`ea-att-mark ${classFor[m]}`} onClick={() => toggleMark(r.studentId, i)}>
                        <i className={`bi ${iconFor[m]}`} />
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
              {roster.length === 0 && (
                <tr><td colSpan={weekDays.length + 1} className="text-center text-muted py-4">No students in this class.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button className="ea-btn ea-btn-primary" onClick={handleSave}><i className="bi bi-save" /> Save Attendance</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
