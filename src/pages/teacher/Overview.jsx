import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";
import { useAuth } from "../../context/AuthContext";
import { teachers, getStudentsByClass, assignments } from "../../data/mockData";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function TeacherOverview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const teacher = teachers.find((t) => t.id === user?.teacherId) || teachers[0];

  const totalStudents = teacher.classes.reduce((sum, cls) => sum + getStudentsByClass(cls).length, 0);
  const myAssignments = assignments.filter((a) => a.teacher === teacher.name);
  const pendingAssignments = myAssignments.filter((a) => a.status !== "Published").length;
  const toGrade = myAssignments.reduce((sum, a) => sum + Math.max(0, a.submissions), 0);

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div className="ea-card ea-greeting-card">
        <div>
          <h2>{greeting()}, {teacher.name.split(" ").slice(-1)[0]} 👋</h2>
          <p>You teach {teacher.subjects.join(" & ")} across {teacher.classes.length} class{teacher.classes.length > 1 ? "es" : ""}. Here's today's snapshot.</p>
        </div>
      </div>

      <div className="ea-stat-grid mt-3">
        <StatCard icon="bi-door-open" label="Active Classes" value={teacher.classes.length} accent="green" />
        <StatCard icon="bi-people" label="Total Students" value={totalStudents} accent="red" />
        <StatCard icon="bi-journal-x" label="Pending Assignments" value={pendingAssignments} accent="green" />
        <StatCard icon="bi-pencil-square" label="Submissions to Grade" value={toGrade} accent="red" />
      </div>

      <div className="row g-3 mt-1">
        <div className="col-lg-7">
          <div className="ea-card ea-panel">
            <div className="ea-panel-header"><h3>My Classes</h3></div>
            <ul className="ea-simple-list">
              {teacher.classes.map((cls) => (
                <li key={cls}>
                  <span><i className="bi bi-door-open me-2" />{cls}</span>
                  <span className="text-muted">{getStudentsByClass(cls).length} students</span>
                </li>
              ))}
            </ul>
            <button className="ea-btn ea-btn-outline mt-2" onClick={() => navigate("/teacher/classes")}>View My Classes</button>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="ea-card ea-panel">
            <div className="ea-panel-header"><h3>My Assignments</h3></div>
            <ul className="ea-simple-list">
              {myAssignments.map((a) => (
                <li key={a.id}>
                  <span>{a.title}</span>
                  <span className="text-muted">{a.submissions}/{a.totalStudents} submitted</span>
                </li>
              ))}
              {myAssignments.length === 0 && <li className="text-muted">No assignments yet.</li>}
            </ul>
            <button className="ea-btn ea-btn-outline mt-2" onClick={() => navigate("/teacher/assignments")}>Manage Assignments</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
