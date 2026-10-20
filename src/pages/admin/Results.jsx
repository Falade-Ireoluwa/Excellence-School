import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import { classesList, subjectsList, results, schoolInfo } from "../../data/mockData";

export default function AdminResults() {
  const [selectedClass, setSelectedClass] = useState(classesList[4]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");

  const availableSubjects = subjectsList.filter((s) => s.classes.includes(selectedClass));

  const filtered = useMemo(() => {
    return results.filter((r) => {
      const matchesClass = r.class === selectedClass;
      const matchesSubject = selectedSubject === "All" || r.subject === selectedSubject;
      const matchesSearch = r.studentName.toLowerCase().includes(search.toLowerCase());
      return matchesClass && matchesSubject && matchesSearch;
    });
  }, [selectedClass, selectedSubject, search]);

  const classAverage = filtered.length ? Math.round(filtered.reduce((sum, r) => sum + r.total, 0) / filtered.length) : 0;
  const topScore = filtered.length ? Math.max(...filtered.map((r) => r.total)) : 0;

  return (
    <DashboardLayout title="Results">
      <PageHeader
        title="Academic Results"
        subtitle={`${schoolInfo.session} · ${schoolInfo.term}`}
        actions={
          <select className="ea-select-inline" value={selectedClass} onChange={(e) => { setSelectedClass(e.target.value); setSelectedSubject("All"); }}>
            {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      />

      <div className="ea-stat-grid ea-stat-grid-3">
        <div className="ea-card ea-mini-stat"><span>{filtered.length}</span><p>Result Entries</p></div>
        <div className="ea-card ea-mini-stat ea-mini-stat-green"><span>{classAverage}</span><p>Class Average</p></div>
        <div className="ea-card ea-mini-stat"><span>{topScore}</span><p>Top Score</p></div>
      </div>

      <div className="ea-card mt-3">
        <div className="ea-filter-bar">
          <div className="ea-search-box">
            <i className="bi bi-search" />
            <input placeholder="Search student name..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="All">All Subjects</option>
            {availableSubjects.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </div>

        <div className="table-responsive">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th className="text-center">CA (30)</th>
                <th className="text-center">Exam (70)</th>
                <th className="text-center">Total (100)</th>
                <th className="text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={`${r.studentId}-${r.subject}-${i}`}>
                  <td>{r.studentName}</td>
                  <td>{r.subject}</td>
                  <td className="text-center">{r.ca}</td>
                  <td className="text-center">{r.exam}</td>
                  <td className="text-center"><strong>{r.total}</strong></td>
                  <td className="text-center">
                    <span className={`ea-grade-pill ea-grade-${r.grade}`}>{r.grade}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center text-muted py-4">No results found for this selection.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
