import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { getChildrenForParent, fees, assignments } from "../../data/mockData";

const nairaFmt = (n) => `₦${n.toLocaleString()}`;

export default function ParentChildrenOverview() {
  const { user } = useAuth();
  const children = getChildrenForParent(user?.childrenIds || []);
  const [activeChild, setActiveChild] = useState(children[0]?.id);
  const child = children.find((c) => c.id === activeChild) || children[0];
  const childFee = fees.find((f) => f.studentId === child?.id);
  const childAssignments = assignments.filter((a) => a.class === child?.class);
  const avgAttendance = Math.round(children.reduce((sum, c) => sum + c.attendanceRate, 0) / (children.length || 1));
  const outstandingCount = children.filter((c) => {
    const f = fees.find((fe) => fe.studentId === c.id);
    return f && f.status !== "Paid";
  }).length;

  return (
    <DashboardLayout title="Children Overview">
      <PageHeader title="My Children" subtitle={`Welcome back, ${user?.name}`} />

      <div className="ea-stat-grid ea-stat-grid-3">
        <StatCard icon="bi-people" label="Children Enrolled" value={children.length} accent="green" />
        <StatCard icon="bi-calendar-check" label="Avg. Attendance" value={`${avgAttendance}%`} accent="green" />
        <StatCard icon="bi-exclamation-circle" label="Outstanding Fee Alerts" value={outstandingCount} accent="red" />
      </div>

      <div className="ea-child-switcher mt-3">
        {children.map((c) => (
          <button key={c.id} className={`ea-child-chip ${activeChild === c.id ? "ea-child-chip-active" : ""}`} onClick={() => setActiveChild(c.id)}>
            <span className="ea-avatar" style={{ background: c.avatarColor }}>{c.initials}</span>
            {c.name}
          </button>
        ))}
      </div>

      {child && (
        <div className="row g-3 mt-1">
          <div className="col-lg-4">
            <div className="ea-card ea-panel text-center">
              <span className="ea-avatar ea-avatar-lg mx-auto" style={{ background: child.avatarColor }}>{child.initials}</span>
              <h3 className="mt-2 mb-0">{child.name}</h3>
              <p className="text-muted">{child.class} · {child.admissionNo}</p>
              <StatusBadge status={child.status} />
              <dl className="ea-detail-list mt-3 text-start">
                <div><dt>Attendance</dt><dd>{child.attendanceRate}%</dd></div>
                <div><dt>Gender</dt><dd>{child.gender}</dd></div>
                <div><dt>Date of Birth</dt><dd>{child.dob}</dd></div>
              </dl>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="ea-card ea-panel">
              <div className="ea-panel-header"><h3>Fee Status</h3></div>
              {childFee ? (
                <>
                  <div className="ea-fee-summary">
                    <div><span>Total Fees</span><strong>{nairaFmt(childFee.totalFees)}</strong></div>
                    <div><span>Paid</span><strong>{nairaFmt(childFee.paid)}</strong></div>
                    <div><span>Balance</span><strong className={childFee.balance > 0 ? "text-danger" : ""}>{nairaFmt(childFee.balance)}</strong></div>
                  </div>
                  <StatusBadge status={childFee.status} />
                </>
              ) : <p className="text-muted">No fee record found.</p>}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="ea-card ea-panel">
              <div className="ea-panel-header"><h3>Pending Assignments</h3></div>
              <ul className="ea-simple-list">
                {childAssignments.map((a) => (
                  <li key={a.id}>
                    <span>{a.title}</span>
                    <StatusBadge status={a.status} />
                  </li>
                ))}
                {childAssignments.length === 0 && <li className="text-muted">No assignments for this class.</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
