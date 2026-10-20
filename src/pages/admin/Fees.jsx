import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Pagination from "../../components/common/Pagination";
import Modal from "../../components/common/Modal";
import StatCard from "../../components/common/StatCard";
import { fees as seedFees, students, classesList, schoolInfo } from "../../data/mockData";

const PAGE_SIZE = 8;
const nairaFmt = (n) => `₦${n.toLocaleString()}`;

function statusFor(paid, total) {
  if (paid <= 0) return "NO";
  if (paid >= total) return "Paid";
  return "Partially Paid";
}

export default function AdminFees() {
  const [feeList, setFeeList] = useState(seedFees);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [payModal, setPayModal] = useState(null);
  const [payAmount, setPayAmount] = useState(0);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ studentId: students[0]?.id || "", totalFees: 150000, dueDate: "" });

  const filtered = useMemo(() => {
    return feeList.filter((f) => {
      const matchesSearch = f.studentName.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === "All" || f.class === classFilter;
      const matchesStatus = statusFilter === "All" || f.status === statusFilter;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [feeList, search, classFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalExpected = feeList.reduce((s, f) => s + f.totalFees, 0);
  const totalCollected = feeList.reduce((s, f) => s + f.paid, 0);
  const totalOutstanding = totalExpected - totalCollected;
  const collectionRate = Math.round((totalCollected / totalExpected) * 100);

  function openPay(f) {
    setPayModal(f);
    setPayAmount(f.balance);
  }

  function handleRecordPayment(e) {
    e.preventDefault();
    setFeeList((list) =>
      list.map((f) => {
        if (f.studentId !== payModal.studentId) return f;
        const newPaid = Math.min(f.totalFees, f.paid + Number(payAmount));
        return { ...f, paid: newPaid, balance: f.totalFees - newPaid, status: statusFor(newPaid, f.totalFees), lastPaymentDate: new Date().toISOString().slice(0, 10) };
      })
    );
    setPayModal(null);
  }

  function handleCreateInvoice(e) {
    e.preventDefault();
    const student = students.find((s) => s.id === invoiceForm.studentId);
    if (!student) return;
    setFeeList((list) => {
      const exists = list.find((f) => f.studentId === student.id);
      const record = {
        studentId: student.id,
        studentName: student.name,
        class: student.class,
        term: schoolInfo.term,
        totalFees: Number(invoiceForm.totalFees),
        paid: 0,
        balance: Number(invoiceForm.totalFees),
        status: "NO",
        lastPaymentDate: null,
      };
      return exists ? list.map((f) => (f.studentId === student.id ? record : f)) : [record, ...list];
    });
    setInvoiceModal(false);
  }

  return (
    <DashboardLayout title="Fees">
      <PageHeader
        title="Fee Management"
        subtitle={`${schoolInfo.session} · ${schoolInfo.term}`}
        actions={<button className="ea-btn ea-btn-primary" onClick={() => setInvoiceModal(true)}><i className="bi bi-receipt" /> Create Invoice</button>}
      />

      <div className="ea-stat-grid">
        <StatCard icon="bi-cash-stack" label="Total Expected" value={nairaFmt(totalExpected)} accent="green" />
        <StatCard icon="bi-check-circle" label="Total Collected" value={nairaFmt(totalCollected)} trend={`${collectionRate}% collected`} accent="success" />
        <StatCard icon="bi-exclamation-circle" label="Outstanding Balance" value={nairaFmt(totalOutstanding)} accent="red" />
        <StatCard icon="bi-people" label="Students Billed" value={feeList.length} accent="green" />
      </div>

      <div className="ea-card mt-3">
        <div className="ea-filter-bar">
          <div className="ea-search-box">
            <i className="bi bi-search" />
            <input placeholder="Search student name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select value={classFilter} onChange={(e) => { setClassFilter(e.target.value); setPage(1); }}>
            <option value="All">All Classes</option>
            {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Partially Paid">Partially Paid</option>
            <option value="NO">Not Paid</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th className="text-end">Total Fees</th>
                <th className="text-end">Paid</th>
                <th className="text-end">Balance</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((f) => (
                <tr key={f.studentId}>
                  <td>{f.studentName}</td>
                  <td>{f.class}</td>
                  <td className="text-end">{nairaFmt(f.totalFees)}</td>
                  <td className="text-end">{nairaFmt(f.paid)}</td>
                  <td className="text-end">{nairaFmt(f.balance)}</td>
                  <td><StatusBadge status={f.status} /></td>
                  <td className="text-end">
                    <button className="ea-btn ea-btn-outline ea-btn-sm" disabled={f.status === "Paid"} onClick={() => openPay(f)}>
                      <i className="bi bi-cash" /> Record Payment
                    </button>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr><td colSpan={7} className="text-center text-muted py-4">No fee records match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </div>

      {payModal && (
        <Modal
          title={`Record Payment · ${payModal.studentName}`}
          onClose={() => setPayModal(null)}
          footer={<>
            <button className="ea-btn ea-btn-outline" onClick={() => setPayModal(null)}>Cancel</button>
            <button className="ea-btn ea-btn-primary" form="pay-form" type="submit">Record Payment</button>
          </>}
        >
          <form id="pay-form" onSubmit={handleRecordPayment}>
            <p className="text-muted">Outstanding balance: <strong>{nairaFmt(payModal.balance)}</strong></p>
            <div className="ea-form-group">
              <label>Amount Received</label>
              <input type="number" min="0" max={payModal.balance} value={payAmount} onChange={(e) => setPayAmount(e.target.value)} required />
            </div>
          </form>
        </Modal>
      )}

      {invoiceModal && (
        <Modal
          title="Create Invoice"
          onClose={() => setInvoiceModal(false)}
          footer={<>
            <button className="ea-btn ea-btn-outline" onClick={() => setInvoiceModal(false)}>Cancel</button>
            <button className="ea-btn ea-btn-primary" form="invoice-form" type="submit">Create Invoice</button>
          </>}
        >
          <form id="invoice-form" onSubmit={handleCreateInvoice}>
            <div className="ea-form-group">
              <label>Student</label>
              <select value={invoiceForm.studentId} onChange={(e) => setInvoiceForm({ ...invoiceForm, studentId: e.target.value })}>
                {students.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.class}</option>)}
              </select>
            </div>
            <div className="ea-form-group">
              <label>Total Fees (₦)</label>
              <input type="number" min="0" value={invoiceForm.totalFees} onChange={(e) => setInvoiceForm({ ...invoiceForm, totalFees: e.target.value })} required />
            </div>
            <div className="ea-form-group">
              <label>Due Date</label>
              <input type="date" value={invoiceForm.dueDate} onChange={(e) => setInvoiceForm({ ...invoiceForm, dueDate: e.target.value })} />
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
