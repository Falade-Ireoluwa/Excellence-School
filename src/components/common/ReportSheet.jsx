import {
  schoolInfo,
  getResultsByStudent,
  getAttendanceSummaryForStudent,
  getClassPosition,
  getRemark,
  fees,
} from "../../data/mockData";

export default function ReportSheet({ student }) {
  if (!student) return null;

  const results = getResultsByStudent(student.id);
  const attendance = getAttendanceSummaryForStudent(student);
  const positionInfo = getClassPosition(student.id);
  const totalScore = results.reduce((sum, r) => sum + r.total, 0);
  const average = results.length ? Math.round(totalScore / results.length) : 0;
  const remark = getRemark(average);
  const fee = fees.find((f) => f.studentId === student.id);

  return (
    <div className="ea-report-sheet" id="report-sheet">
      <div className="ea-report-header">
        <div className="ea-logo-crest">EN</div>
        <div className="ea-report-header-text">
          <h2>{schoolInfo.name}</h2>
          <p>{schoolInfo.address} &middot; {schoolInfo.phone}</p>
          <span className="ea-report-title">
            Term Result Report &mdash; {schoolInfo.session} &middot; {schoolInfo.term}
          </span>
        </div>
      </div>

      <div className="ea-report-bio">
        <div><span>Student Name</span><strong>{student.name}</strong></div>
        <div><span>Admission No.</span><strong>{student.admissionNo}</strong></div>
        <div><span>Class</span><strong>{student.class}</strong></div>
        <div><span>Gender</span><strong>{student.gender}</strong></div>
        <div>
          <span>Position in Class</span>
          <strong>{positionInfo ? `${positionInfo.position} of ${positionInfo.outOf}` : "—"}</strong>
        </div>
        <div><span>Overall Average</span><strong>{average}%</strong></div>
      </div>

      <table className="ea-report-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th className="text-center">CA (30)</th>
            <th className="text-center">Exam (70)</th>
            <th className="text-center">Total (100)</th>
            <th className="text-center">Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.subject}</td>
              <td className="text-center">{r.ca}</td>
              <td className="text-center">{r.exam}</td>
              <td className="text-center"><strong>{r.total}</strong></td>
              <td className="text-center">
                <span className={`ea-grade-pill ea-grade-${r.grade}`}>{r.grade}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total / Average</strong></td>
            <td colSpan={2}></td>
            <td className="text-center"><strong>{totalScore}</strong></td>
            <td className="text-center"><strong>{average}%</strong></td>
          </tr>
        </tfoot>
      </table>

      <div className="ea-report-grid">
        <div className="ea-report-box">
          <h4>Attendance This Term</h4>
          <div className="ea-report-attendance">
            <div><span>Present</span><strong>{attendance.present}</strong></div>
            <div><span>Absent</span><strong>{attendance.absent}</strong></div>
            <div><span>Late</span><strong>{attendance.late}</strong></div>
            <div><span>Attendance Rate</span><strong>{attendance.rate}%</strong></div>
          </div>
        </div>
        <div className="ea-report-box">
          <h4>Fee Status</h4>
          {fee ? (
            <div className="ea-report-attendance">
              <div><span>Total Fees</span><strong>₦{fee.totalFees.toLocaleString()}</strong></div>
              <div><span>Balance</span><strong>₦{fee.balance.toLocaleString()}</strong></div>
              <div><span>Status</span><strong>{fee.status === "NO" ? "Not Paid" : fee.status}</strong></div>
            </div>
          ) : (
            <p className="text-muted">No fee record on file.</p>
          )}
        </div>
      </div>

      <div className="ea-report-remarks">
        <div>
          <h4>Class Teacher's Remark</h4>
          <p>{remark.teacher}</p>
        </div>
        <div>
          <h4>Principal's Remark</h4>
          <p>{remark.principal}</p>
        </div>
      </div>

      <div className="ea-report-footer">
        <div className="ea-report-signature"><span>Class Teacher's Signature</span></div>
        <div className="ea-report-signature"><span>Principal &mdash; {schoolInfo.principalName}</span></div>
        <div className="ea-report-signature">
          <span>
            Next Term Begins:{" "}
            {new Date(schoolInfo.nextTermBegins).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}