import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import Pagination from "../../components/common/Pagination";
import Modal from "../../components/common/Modal";
import { students as seedStudents, classesList } from "../../data/mockData";

const PAGE_SIZE = 8;
const emptyForm = { name: "", admissionNo: "", class: classesList[0], gender: "Female", dob: "", parentName: "", parentPhone: "", status: "Active" };

export default function AdminStudents() {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState(seedStudents);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState(null); // 'add' | 'edit' | 'view' | 'delete'
  const [activeStudent, setActiveStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => {
    return studentList.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) || s.admissionNo.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === "All" || s.class === classFilter;
      const matchesGender = genderFilter === "All" || s.gender === genderFilter;
      const matchesStatus = statusFilter === "All" || s.status === statusFilter;
      return matchesSearch && matchesClass && matchesGender && matchesStatus;
    });
  }, [studentList, search, classFilter, genderFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openAdd() {
    setForm(emptyForm);
    setModal("add");
  }

  function openEdit(s) {
    setActiveStudent(s);
    setForm({ name: s.name, admissionNo: s.admissionNo, class: s.class, gender: s.gender, dob: s.dob, parentName: s.parentName, parentPhone: s.parentPhone, status: s.status });
    setModal("edit");
  }

  function openView(s) {
    setActiveStudent(s);
    setModal("view");
  }

  function openDelete(s) {
    setActiveStudent(s);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setActiveStudent(null);
  }

  function handleSave(e) {
    e.preventDefault();
    if (modal === "add") {
      const newStudent = {
        id: `STU-${String(studentList.length + 1).padStart(3, "0")}`,
        initials: form.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase(),
        attendanceRate: 95,
        avatarColor: form.gender === "Female" ? "var(--ea-red)" : "var(--ea-green)",
        ...form,
      };
      setStudentList((list) => [newStudent, ...list]);
    } else if (modal === "edit" && activeStudent) {
      setStudentList((list) => list.map((s) => (s.id === activeStudent.id ? { ...s, ...form } : s)));
    }
    closeModal();
  }

  function handleDelete() {
    setStudentList((list) => list.filter((s) => s.id !== activeStudent.id));
    closeModal();
  }

  return (
    <DashboardLayout title="Students">
      <PageHeader
        title="Student Directory"
        subtitle={`${filtered.length} students found`}
        actions={
          <button className="ea-btn ea-btn-primary" onClick={openAdd}>
            <i className="bi bi-person-plus" /> Add Student
          </button>
        }
      />

      <div className="ea-card">
        <div className="ea-filter-bar">
          <div className="ea-search-box">
            <i className="bi bi-search" />
            <input placeholder="Search by name or admission no..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select value={classFilter} onChange={(e) => { setClassFilter(e.target.value); setPage(1); }}>
            <option value="All">All Classes</option>
            {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={genderFilter} onChange={(e) => { setGenderFilter(e.target.value); setPage(1); }}>
            <option value="All">All Genders</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="ea-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Admission No.</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Parent Contact</th>
                <th>Attendance</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="ea-table-person">
                      <span className="ea-avatar" style={{ background: s.avatarColor }}>{s.initials}</span>
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td>{s.admissionNo}</td>
                  <td>{s.class}</td>
                  <td>{s.gender}</td>
                  <td>
                    <div className="ea-table-sub">
                      <span>{s.parentName}</span>
                      <span className="text-muted">{s.parentPhone}</span>
                    </div>
                  </td>
                  <td>{s.attendanceRate}%</td>
                  <td><StatusBadge status={s.status} /></td>
                  <td className="text-end">
                    <button className="ea-icon-btn" title="View" onClick={() => openView(s)}><i className="bi bi-eye" /></button>
                    <button className="ea-icon-btn" title="Report Sheet" onClick={() => navigate(`/admin/students/${s.id}/report`)}><i className="bi bi-file-earmark-text" /></button>
                    <button className="ea-icon-btn" title="Edit" onClick={() => openEdit(s)}><i className="bi bi-pencil" /></button>
                    <button className="ea-icon-btn ea-icon-btn-danger" title="Delete" onClick={() => openDelete(s)}><i className="bi bi-trash" /></button>
                  </td>
                </tr>
              ))}
              {pageItems.length === 0 && (
                <tr><td colSpan={8} className="text-center text-muted py-4">No students match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
      </div>

      {(modal === "add" || modal === "edit") && (
        <Modal
          title={modal === "add" ? "Add New Student" : "Edit Student"}
          onClose={closeModal}
          footer={
            <>
              <button className="ea-btn ea-btn-outline" onClick={closeModal}>Cancel</button>
              <button className="ea-btn ea-btn-primary" form="student-form" type="submit">{modal === "add" ? "Add Student" : "Save Changes"}</button>
            </>
          }
        >
          <form id="student-form" onSubmit={handleSave}>
            <div className="ea-form-grid">
              <div className="ea-form-group">
                <label>Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Admission Number</label>
                <input value={form.admissionNo} onChange={(e) => setForm({ ...form, admissionNo: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Class</label>
                <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}>
                  {classesList.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="ea-form-group">
                <label>Gender</label>
                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>
              <div className="ea-form-group">
                <label>Date of Birth</label>
                <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
              </div>
              <div className="ea-form-group">
                <label>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="ea-form-group">
                <label>Parent / Guardian Name</label>
                <input value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} required />
              </div>
              <div className="ea-form-group">
                <label>Parent Phone</label>
                <input value={form.parentPhone} onChange={(e) => setForm({ ...form, parentPhone: e.target.value })} required />
              </div>
            </div>
          </form>
        </Modal>
      )}

      {modal === "view" && activeStudent && (
        <Modal title="Student Details" onClose={closeModal} footer={<button className="ea-btn ea-btn-outline" onClick={closeModal}>Close</button>}>
          <div className="ea-detail-view">
            <div className="ea-detail-avatar">
              <span className="ea-avatar ea-avatar-lg" style={{ background: activeStudent.avatarColor }}>{activeStudent.initials}</span>
              <div>
                <h4>{activeStudent.name}</h4>
                <span>{activeStudent.admissionNo}</span>
              </div>
            </div>
            <dl className="ea-detail-list">
              <div><dt>Class</dt><dd>{activeStudent.class}</dd></div>
              <div><dt>Gender</dt><dd>{activeStudent.gender}</dd></div>
              <div><dt>Date of Birth</dt><dd>{activeStudent.dob}</dd></div>
              <div><dt>Status</dt><dd><StatusBadge status={activeStudent.status} /></dd></div>
              <div><dt>Attendance Rate</dt><dd>{activeStudent.attendanceRate}%</dd></div>
              <div><dt>Parent / Guardian</dt><dd>{activeStudent.parentName}</dd></div>
              <div><dt>Parent Phone</dt><dd>{activeStudent.parentPhone}</dd></div>
            </dl>
          </div>
        </Modal>
      )}

      {modal === "delete" && activeStudent && (
        <Modal
          title="Delete Student"
          onClose={closeModal}
          footer={
            <>
              <button className="ea-btn ea-btn-outline" onClick={closeModal}>Cancel</button>
              <button className="ea-btn ea-btn-danger" onClick={handleDelete}>Delete</button>
            </>
          }
        >
          <p>Are you sure you want to remove <strong>{activeStudent.name}</strong> from the student directory? This action cannot be undone.</p>
        </Modal>
      )}
    </DashboardLayout>
  );
}
