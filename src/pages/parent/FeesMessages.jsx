import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { useAuth } from "../../context/AuthContext";
import { getChildrenForParent, fees as seedFees, parentMessages } from "../../data/mockData";

const nairaFmt = (n) => `₦${n.toLocaleString()}`;

export default function ParentFeesMessages() {
  const { user } = useAuth();
  const children = getChildrenForParent(user?.childrenIds || []);
  const [feeList, setFeeList] = useState(seedFees);
  const [payModal, setPayModal] = useState(null);
  const [messages, setMessages] = useState(parentMessages);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  const childFees = children.map((c) => ({ child: c, fee: feeList.find((f) => f.studentId === c.id) }));

  function handlePay(e) {
    e.preventDefault();
    setFeeList((list) => list.map((f) => (f.studentId === payModal.studentId ? { ...f, paid: f.totalFees, balance: 0, status: "Paid", lastPaymentDate: new Date().toISOString().slice(0, 10) } : f)));
    setPayModal(null);
  }

  function handleReply(e) {
    e.preventDefault();
    if (!reply.trim()) return;
    setMessages((prev) => [
      { id: `MSG-${prev.length + 1}`, from: user?.name, to: "Admin Office", childName: children[0]?.name, subject: "Re: School Update", body: reply, date: new Date().toISOString(), read: true, direction: "out" },
      ...prev,
    ]);
    setReply("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <DashboardLayout title="Fees & Messages">
      <PageHeader title="Fees & Messages" subtitle="Track fee payments and stay in touch with the school" />

      <div className="row g-3">
        <div className="col-lg-5">
          <div className="ea-card ea-panel">
            <div className="ea-panel-header"><h3>Fee Payment Tracking</h3></div>
            {childFees.map(({ child, fee }) => fee && (
              <div className="ea-fee-child-row" key={child.id}>
                <div className="ea-table-person">
                  <span className="ea-avatar" style={{ background: child.avatarColor }}>{child.initials}</span>
                  <div>
                    <div>{child.name}</div>
                    <span className="text-muted small">{child.class}</span>
                  </div>
                </div>
                <div className="text-end">
                  <div>{nairaFmt(fee.balance)} due</div>
                  <StatusBadge status={fee.status} />
                </div>
                <button className="ea-btn ea-btn-primary ea-btn-sm" disabled={fee.status === "Paid"} onClick={() => setPayModal(fee)}>
                  Pay Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-7">
          <div className="ea-card ea-panel">
            <div className="ea-panel-header"><h3>Messages</h3></div>
            {sent && <div className="ea-alert-success mb-3"><i className="bi bi-check-circle" /> Message sent to the admin office.</div>}
            <ul className="ea-message-list ea-message-list-inbox">
              {messages.map((m) => (
                <li key={m.id} className={m.direction === "out" ? "ea-message-out" : ""}>
                  <div className="ea-message-list-head">
                    <strong>{m.direction === "out" ? `You → ${m.to}` : `${m.from}`}</strong>
                    <span>{new Date(m.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                  </div>
                  <p className="mb-1"><em>{m.subject}</em></p>
                  <p>{m.body}</p>
                </li>
              ))}
            </ul>
            <form onSubmit={handleReply} className="ea-reply-box">
              <input placeholder="Type a message to the school..." value={reply} onChange={(e) => setReply(e.target.value)} />
              <button type="submit" className="ea-btn ea-btn-primary"><i className="bi bi-send" /></button>
            </form>
          </div>
        </div>
      </div>

      {payModal && (
        <Modal
          title={`Pay Fees · ${payModal.studentName}`}
          onClose={() => setPayModal(null)}
          footer={<>
            <button className="ea-btn ea-btn-outline" onClick={() => setPayModal(null)}>Cancel</button>
            <button className="ea-btn ea-btn-primary" form="parent-pay-form" type="submit">Confirm Payment</button>
          </>}
        >
          <form id="parent-pay-form" onSubmit={handlePay}>
            <p>Outstanding balance for {payModal.term}:</p>
            <h2 className="mb-3">{nairaFmt(payModal.balance)}</h2>
            <div className="ea-form-group">
              <label>Payment Method</label>
              <select defaultValue="card">
                <option value="card">Debit / Credit Card</option>
                <option value="transfer">Bank Transfer</option>
                <option value="ussd">USSD</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
