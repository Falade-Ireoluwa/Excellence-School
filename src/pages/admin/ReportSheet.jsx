import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import ReportSheet from "../../components/common/ReportSheet";
import { students } from "../../data/mockData";

export default function AdminReportSheet() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = students.find((s) => s.id === studentId);

  function handleDownload() {
    window.print();
  }

  if (!student) {
    return (
      <DashboardLayout title="Report Sheet">
        <p className="text-muted">Student not found.</p>
        <button className="ea-btn ea-btn-outline" onClick={() => navigate("/admin/students")}>
          Back to Students
        </button>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Report Sheet">
      <PageHeader
        title={`${student.name}'s Report Sheet`}
        subtitle={`${student.class} · ${student.admissionNo}`}
        actions={
          <div className="d-flex gap-2 no-print">
            <button className="ea-btn ea-btn-outline" onClick={() => navigate(-1)}>Back</button>
            <button className="ea-btn ea-btn-primary" onClick={handleDownload}>
              <i className="bi bi-download" /> Download Report Sheet
            </button>
          </div>
        }
      />
      <div className="ea-card ea-report-card-wrap">
        <ReportSheet student={student} />
      </div>
    </DashboardLayout>
  );
}