import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/common/StatCard";
import LineChart from "../../components/common/LineChart";
import RingChart from "../../components/common/RingChart";
import {
  students,
  teachers,
  schoolInfo,
  overallAttendanceTrend,
  feeCollectionRate,
  totalFeesCollected,
  totalFeesExpected,
  recentActivities,
  upcomingEvents,
} from "../../data/mockData";

const nairaFmt = (n) => `₦${n.toLocaleString()}`;

const quickActions = [
  { label: "Add Student", icon: "bi-person-plus", to: "/admin/students" },
  { label: "Add Teacher", icon: "bi-person-badge", to: "/admin/teachers" },
  { label: "Create Assignment", icon: "bi-journal-plus", to: "/admin/assignments" },
  { label: "Record Attendance", icon: "bi-calendar-check", to: "/admin/attendance" },
  { label: "Send Message", icon: "bi-send", to: "/admin/communication" },
];

const eventTypeIcon = { holiday: "bi-airplane", meeting: "bi-people", event: "bi-trophy", exam: "bi-pencil-square" };

export default function AdminOverview() {
  const navigate = useNavigate();
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const activeTeachers = teachers.filter((t) => t.status === "Active").length;
  const avgAttendance = Math.round(overallAttendanceTrend.reduce((a, b) => a + b.rate, 0) / overallAttendanceTrend.length);

  return (
    <DashboardLayout title="Dashboard Overview">
      <div className="ea-stat-grid">
        <StatCard icon="bi-people" label="Total Students" value={activeStudents} trend="+4.2% this term" accent="green" />
        <StatCard icon="bi-person-badge" label="Total Teachers" value={activeTeachers} trend="+1 this month" accent="red" />
        <StatCard icon="bi-calendar-check" label="Attendance Rate" value={`${avgAttendance}%`} trend="+1.8% vs last week" accent="green" />
        <StatCard icon="bi-cash-stack" label="Fees Collected" value={nairaFmt(totalFeesCollected)} trend={`${feeCollectionRate}% of target`} accent="red" />
      </div>

      <div className="row g-3 mt-1">
        <div className="col-lg-8">
          <div className="ea-card ea-panel">
            <div className="ea-panel-header">
              <h3>Weekly Attendance Overview</h3>
              <span className="ea-badge-pill ea-badge-green">This Week</span>
            </div>
            <LineChart data={overallAttendanceTrend} />
          </div>

          <div className="ea-card ea-panel mt-3">
            <div className="ea-panel-header">
              <h3>Recent Activities</h3>
            </div>
            <ul className="ea-activity-list">
              {recentActivities.map((a) => (
                <li key={a.id}>
                  <span className="ea-activity-icon"><i className={`bi ${a.icon}`} /></span>
                  <div>
                    <p>{a.text}</p>
                    <span>{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="ea-card ea-panel text-center">
            <div className="ea-panel-header ea-panel-header-center">
              <h3>Fee Collection</h3>
            </div>
            <RingChart percent={feeCollectionRate} label="Collected" sub={`${nairaFmt(totalFeesCollected)} of ${nairaFmt(totalFeesExpected)}`} />
          </div>

          <div className="ea-card ea-panel mt-3">
            <div className="ea-panel-header">
              <h3>School Info</h3>
            </div>
            <ul className="ea-info-list">
              <li><i className="bi bi-geo-alt" /> {schoolInfo.address}</li>
              <li><i className="bi bi-telephone" /> {schoolInfo.phone}</li>
              <li><i className="bi bi-envelope" /> {schoolInfo.email}</li>
              <li><i className="bi bi-mortarboard" /> {schoolInfo.session} · {schoolInfo.term}</li>
            </ul>
          </div>

          <div className="ea-card ea-panel mt-3">
            <div className="ea-panel-header">
              <h3>Upcoming Events</h3>
            </div>
            <ul className="ea-event-list">
              {upcomingEvents.map((ev) => (
                <li key={ev.id}>
                  <span className="ea-event-icon"><i className={`bi ${eventTypeIcon[ev.type]}`} /></span>
                  <div>
                    <p>{ev.title}</p>
                    <span>{new Date(ev.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="ea-card ea-panel mt-3">
        <div className="ea-panel-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="ea-quick-actions">
          {quickActions.map((qa) => (
            <button key={qa.label} className="ea-quick-action" onClick={() => navigate(qa.to)}>
              <i className={`bi ${qa.icon}`} />
              <span>{qa.label}</span>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
