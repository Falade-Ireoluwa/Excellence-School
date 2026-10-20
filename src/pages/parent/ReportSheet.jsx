import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import ReportSheet from "../../components/common/ReportSheet";
import { useAuth } from "../../context/AuthContext";
import { getChildrenForParent } from "../../data/mockData";

export default function ParentReportSheet() {
  const { user } = useAuth();
  const children = getChildrenForParent(user?.childrenIds || []);
  const [activeChild, setActiveChild] = useState(children[0]?.id);
  const child = children.find((c) => c.id === activeChild) || children[0];

  function handleDownload() {
    window.print();
  }

  return (
    <DashboardLayout title="Report Sheet">
      <PageHeader
        title="Term Report Sheet"
        subtitle="View and download your child's result for the term"
        actions={
          <button className="ea-btn ea-btn-primary no-print" onClick={handleDownload}>
            <i className="bi bi-download" /> Download Report Sheet
          </button>
        }
      />

      <div className="ea-child-switcher no-print">
        {children.map((c) => (
          <button
            key={c.id}
            className={`ea-child-chip ${activeChild === c.id ? "ea-child-chip-active" : ""}`}
            onClick={() => setActiveChild(c.id)}
          >
            <span className="ea-avatar" style={{ background: c.avatarColor }}>{c.initials}</span>
            {c.name}
          </button>
        ))}
      </div>

      <div className="ea-card mt-3 ea-report-card-wrap">
        <ReportSheet student={child} />
      </div>
    </DashboardLayout>
  );
}