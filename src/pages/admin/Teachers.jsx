import { useMemo, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Pagination from "../../components/common/Pagination";
import Modal from "../../components/common/Modal";
import { teachers as seedTeachers, subjectsList, classesList } from "../../data/mockData";

const PAGE_SIZE = 8;
const departments = ["Early Years", "Lower Primary", "Upper Primary"];
const emptyForm = { name: "", department: departments[0], subjects: [], classes: [], phone: "", email: "", status: "Active" };

export default function AdminTeachers() {
  const [teacherList, setTeacherList] = useState(seedTeachers);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState(null);
  const [activeTeacher, setActiveTeacher] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    return teacherList.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchesDept = deptFilter === "All" || t.department === deptFilter;
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [teacherList, search, deptFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openAdd() { setForm(emptyForm); setModal("add"); }
  function openEdit(t) {
    setActiveTeacher(t);
    setForm({ name: t.name, department: t.department, subjects: t.subjects, classes: t.classes, phone: t.phone, email: t.email, status: t.status });
    setModal("edit");
  }
  function openView(t) { setActiveTeacher(t); setModal("view"); }
  function openDelete(t) { setActiveTeacher(t); setModal("delete"); }
  function closeModal() { setModal(null); setActiveTeacher(null); }

  function handleSave(e) {
    e.preventDefault();
    if (modal === "add") {
      const newTeacher = {
        id: `TCH-${String(teacherList.length + 1).padStart(3, "0")}`,
        initials: form.name.split(" ").filter(Boolean).map((w) => w[0]).slice(-2).join("").toUpperCase(),
        gender: "Female",
        joined: new Date().toISOString().slice(0, 10),
        ...form,
      };
      setTeacherList((list) => [newTeacher, ...list]);
    } else if (modal === "edit" && activeTeacher) {
      setTeacherList((list) => list.map((t) => (t.id === activeTeacher.id ? { ...t, ...form } : t)));
    }
    closeModal();
  }

  function handleDelete() {
    setTeacherList((list) => list.filter((t) => t.id !== activeTeacher.id));
    closeModal();
  }

  return (
    <DashboardLayout title="Teachers">
      <PageHeader
        title="Teacher Directory"
        subtitle={`${filtered.length} teachers found`}
        actions={<button className="ea-btn ea-btn-primary" onClick={openAdd}><i className="bi bi-person-badge" /> Add Teacher</button>}
      />

      <div className="ea-card">
        <div className="ea-filter-bar">
          <div className="ea-search-box">
            <i className="bi bi-search" />
            <input placeholder="Search teacher name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select value={deptFilter} onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}>
            <option value="All">All Departments</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="All">All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Department</th>
                <th>Subjects</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="ea-table-person">
                      <span className="ea-avatar" style={{ background: "var(--ea-green)" }}>{t.initials}</span>
                      <div>
                        <div>{t.name}</div>
                        <span className="text-muted small">{t.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{t.department}</td>
                  <td>
                    <div className="ea-tag-group">
                      {t.subjects.map((s) => <span key={s} className="ea-tag">{s}</span>)}
                    </div>
                  </td>
                  <td>{t.phone}</td>
                  <td><StatusBadge status={t.status} /></td>
                  <td className="text-end">
                    <button className="ea-icon-btn" title="View" onClick={() => openView(t)}><i className="bi bi-eye" /></button>
                    <button className="ea-icon-btn" title="Edit" onClick={() => openEdit(t)}><i className="bi bi-pencil" /></button>
                    <button className="ea-icon-btn ea-icon-btn-danger" title="Delete" onClick={() => openDelete(t)}><i className="bi bi-trash" /></button>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr><td colSpan={6} className="text-center text-muted py-4">No teachers match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </div>

      {(modal === "add" || modal === "edit") && (
        <Modal
          title={modal === "add" ? "Add New Teacher" : "Edit Teacher"}
          onClose={closeModal}
          footer={<>
            <button className="ea-btn ea-btn-outline" onClick={closeModal}>Cancel</button>
            <button className="ea-btn ea-btn-primary" form="teacher-form" type="submit">{modal === "add" ? "Add Teacher" : "Save Changes"}</button>
          </>}
        >
          <form id="teacher-form" onSubmit={handleSave}>
            <div className="ea-form-grid">
              <div className="ea-form-group">
                <label>Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Department</label>
                <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                  {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Classes Assigned</label>
                <select
                  multiple
                  value={form.classes}
                  onChange={(e) => setForm({ ...form, classes: Array.from(e.target.selectedOptions, (o) => o.value) })}
                >
                  {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Subjects</label>
                <select
                  multiple
                  value={form.subjects}
                  onChange={(e) => setForm({ ...form, subjects: Array.from(e.target.selectedOptions, (o) => o.value) })}
                >
                  {subjectsList.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {modal === "view" && activeTeacher && (
        <Modal title="Teacher Details" onClose={closeModal} footer={<button className="ea-btn ea-btn-outline" onClick={closeModal}>Close</button>}>
          <div className="ea-detail-view">
            <div className="ea-detail-avatar">
              <span className="ea-avatar ea-avatar-lg" style={{ background: "var(--ea-green)" }}>{activeTeacher.initials}</span>
              <div>
                <h4>{activeTeacher.name}</h4>
                <span>{activeTeacher.email}</span>
              </div>
            </div>
            <dl className="ea-detail-list">
              <div><dt>Department</dt><dd>{activeTeacher.department}</dd></div>
              <div><dt>Subjects</dt><dd>{activeTeacher.subjects.join(", ")}</dd></div>
              <div><dt>Classes</dt><dd>{activeTeacher.classes.join(", ")}</dd></div>
              <div><dt>Phone</dt><dd>{activeTeacher.phone}</dd></div>
              <div><dt>Status</dt><dd><StatusBadge status={activeTeacher.status} /></dd></div>
              <div><dt>Joined</dt><dd>{activeTeacher.joined}</dd></div>
            </dl>
          </div>
        </Modal>
      )}

      {modal === "delete" && activeTeacher && (
        <Modal
          title="Delete Teacher"
          onClose={closeModal}
          footer={<>
            <button className="ea-btn ea-btn-outline" onClick={closeModal}>Cancel</button>
            <button className="ea-btn ea-btn-danger" onClick={handleDelete}>Delete</button>
          </>}
        >
          <p>Are you sure you want to remove <strong>{activeTeacher.name}</strong> from the staff directory?</p>
        </Modal>
      )}
    </DashboardLayout>
  );
}
