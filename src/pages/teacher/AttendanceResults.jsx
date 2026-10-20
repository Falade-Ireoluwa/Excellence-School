import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { teachers, weekDays, attendanceByClass, getStudentsByClass, results as seedResults } from "../../data/mockData";

const cycle = { P: "A", A: "L", L: "P" };
const iconFor = { P: "bi-check-lg", A: "bi-x-lg", L: "bi-clock-history" };
const classFor = { P: "ea-att-present", A: "ea-att-absent", L: "ea-att-late" };

export default function TeacherAttendanceResults() {
  const { user } = useAuth();
  const teacher = teachers.find((t) => t.id === user?.teacherId) || teachers[0];
  const [tab, setTab] = useState("attendance");
  const [selectedClass, setSelectedClass] = useState(teacher.classes[0]);
  const [selectedSubject, setSelectedSubject] = useState(teacher.subjects[0]);
  const [records, setRecords] = useState(attendanceByClass);
  const [scores, setScores] = useState(seedResults);
  const [saved, setSaved] = useState(false);

  const roster = records[selectedClass] || [];

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

  const classStudents = getStudentsByClass(selectedClass);
  const scoreRows = useMemo(() => {
    return classStudents.map((s) => {
      const existing = scores.find((r) => r.studentId === s.id && r.subject === selectedSubject && r.class === selectedClass);
      return existing || { studentId: s.id, studentName: s.name, class: selectedClass, subject: selectedSubject, ca: 0, exam: 0, total: 0, grade: "F" };
    });
  }, [classStudents, scores, selectedSubject, selectedClass]);

  function gradeFor(total) {
    if (total >= 75) return "A";
    if (total >= 65) return "B";
    if (total >= 55) return "C";
    if (total >= 45) return "D";
    if (total >= 40) return "E";
    return "F";
  }

  function updateScore(studentId, field, value) {
    setSaved(false);
    setScores((prev) => {
      const idx = prev.findIndex((r) => r.studentId === studentId && r.subject === selectedSubject && r.class === selectedClass);
      const num = Math.max(0, Number(value) || 0);
      if (idx === -1) {
        const student = classStudents.find((s) => s.id === studentId);
        const base = { studentId, studentName: student.name, class: selectedClass, subject: selectedSubject, ca: 0, exam: 0, total: 0, grade: "F", [field]: num };
        base.total = base.ca + base.exam;
        base.grade = gradeFor(base.total);
        return [...prev, base];
      }
      const updated = [...prev];
      const row = { ...updated[idx], [field]: num };
      row.total = row.ca + row.exam;
      row.grade = gradeFor(row.total);
      updated[idx] = row;
      return updated;
    });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <DashboardLayout title="Attendance & Results">
      <PageHeader
        title="Attendance & Results Entry"
        subtitle="Record daily attendance and enter CA / Exam scores for your classes"
        actions={
          <select className="ea-select-inline" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {teacher.classes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      />

      <div className="ea-tabs mb-3">
        <button className={`ea-tab ${tab === "attendance" ? "ea-tab-active" : ""}`} onClick={() => setTab("attendance")}>Attendance</button>
        <button className={`ea-tab ${tab === "results" ? "ea-tab-active" : ""}`} onClick={() => setTab("results")}>Results Entry</button>
      </div>

      {saved && <div className="ea-alert-success mb-3"><i className="bi bi-check-circle" /> Changes saved for {selectedClass}.</div>}

      {tab === "attendance" ? (
        <div className="ea-card">
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
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="ea-btn ea-btn-primary" onClick={handleSave}><i className="bi bi-save" /> Save Attendance</button>
          </div>
        </div>
      ) : (
        <div className="ea-card">
          <div className="ea-filter-bar">
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
              {teacher.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="table-responsive">
            <table className="ea-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th className="text-center">CA (30)</th>
                  <th className="text-center">Exam (70)</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {scoreRows.map((r) => (
                  <tr key={r.studentId}>
                    <td>{r.studentName}</td>
                    <td className="text-center">
                      <input type="number" className="ea-cell-input" min="0" max="30" value={r.ca} onChange={(e) => updateScore(r.studentId, "ca", e.target.value)} />
                    </td>
                    <td className="text-center">
                      <input type="number" className="ea-cell-input" min="0" max="70" value={r.exam} onChange={(e) => updateScore(r.studentId, "exam", e.target.value)} />
                    </td>
                    <td className="text-center"><strong>{r.total}</strong></td>
                    <td className="text-center"><span className={`ea-grade-pill ea-grade-${r.grade}`}>{r.grade}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="ea-btn ea-btn-primary" onClick={handleSave}><i className="bi bi-save" /> Save Results</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
