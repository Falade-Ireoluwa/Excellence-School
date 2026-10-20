import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import { subjectsList } from "../../data/mockData";

export default function AdminSubjects() {
  return (
    <DashboardLayout title="Subjects">
      <PageHeader title="Subjects" subtitle={`${subjectsList.length} subjects offered across all classes`} />

      <div className="ea-card">
        <div className="table-responsive">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Classes</th>
              </tr>
            </thead>
            <tbody>
              {subjectsList.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.name}</strong></td>
                  <td><span className="ea-badge-pill ea-badge-neutral">{s.code}</span></td>
                  <td>
                    <div className="ea-tag-group">
                      {s.classes.map((c) => <span key={c} className="ea-tag">{c}</span>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}