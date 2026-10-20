// ============================================================================
// Excellence Nursery and Primary School — Mock / Static Dataset
// All screens read from this single source of truth so the app is fully
// interactive out of the box without a backend.
// ============================================================================

export const schoolInfo = {
  name: "Excellence Nursery and Primary School",
  shortName: "Excellence Nursery and PrimarySchool",
  tagline: "Light, Love, Peace",
  address: "10 Italapo, Oyingbo (Ajebo Building), Ijebu-Ode, Ogun State",
  phone: "+234 805 560 7731",
  email: "excellencenurseryprimary@gmail.com",
  session: "2025/2026",
  term: "First Term",
  motto: "Knowledge, Character, Excellence",
  establishedYear: 2009,
  principalName: "Dr. Olumide Fashanu",
  nextTermBegins: "2026-11-02",
};

export const classesList = [
  "Creche",
  "Pre-Nursery",
  "Nursery 1",
  "Nursery 2",
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
];

export const subjectsList = [
  { id: "SUB-01", name: "English Language", code: "ENG", classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
  { id: "SUB-02", name: "Mathematics", code: "MTH", classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
  { id: "SUB-03", name: "Basic Science", code: "SCI", classes: ["Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
  { id: "SUB-04", name: "Social Studies", code: "SOS", classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
  { id: "SUB-05", name: "Phonics", code: "PHO", classes: ["Nursery 1", "Nursery 2", "Pre-Nursery"] },
  { id: "SUB-06", name: "Numeracy", code: "NUM", classes: ["Nursery 1", "Nursery 2", "Pre-Nursery"] },
  { id: "SUB-07", name: "Creative Arts", code: "ART", classes: ["Creche", "Pre-Nursery", "Nursery 1", "Nursery 2", "Primary 1", "Primary 2"] },
  { id: "SUB-08", name: "Physical Education", code: "PHE", classes: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
  { id: "SUB-09", name: "Computer Studies", code: "ICT", classes: ["Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
  { id: "SUB-10", name: "French", code: "FRE", classes: ["Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"] },
];

// ---------------------------------------------------------------------------
// Teachers
// ---------------------------------------------------------------------------
export const teachers = [
  { id: "TCH-001", name: "Mrs. Adaeze Okonkwo", initials: "AO", department: "Lower Primary", subjects: ["English Language", "Social Studies"], classes: ["Primary 1"], phone: "+234 806 213 4471", email: "a.okonkwo@excellenceacademy.edu.ng", status: "Active", gender: "Female", joined: "2018-09-03" },
  { id: "TCH-002", name: "Mr. Tunde Bakare", initials: "TB", department: "Upper Primary", subjects: ["Mathematics"], classes: ["Primary 5", "Primary 6"], phone: "+234 803 771 2290", email: "t.bakare@excellenceacademy.edu.ng", status: "Active", gender: "Male", joined: "2016-01-12" },
  { id: "TCH-003", name: "Mrs. Grace Ifeanyi", initials: "GI", department: "Early Years", subjects: ["Phonics", "Numeracy"], classes: ["Nursery 1"], phone: "+234 705 992 1183", email: "g.ifeanyi@excellenceacademy.edu.ng", status: "Active", gender: "Female", joined: "2020-08-24" },
  { id: "TCH-004", name: "Mr. Chidi Umeh", initials: "CU", department: "Upper Primary", subjects: ["Basic Science", "Computer Studies"], classes: ["Primary 4"], phone: "+234 812 004 5567", email: "c.umeh@excellenceacademy.edu.ng", status: "Active", gender: "Male", joined: "2019-03-15" },
  { id: "TCH-005", name: "Mrs. Funmilayo Adeyemi", initials: "FA", department: "Lower Primary", subjects: ["English Language", "Creative Arts"], classes: ["Primary 2"], phone: "+234 701 448 9932", email: "f.adeyemi@excellenceacademy.edu.ng", status: "Active", gender: "Female", joined: "2017-06-01" },
  { id: "TCH-006", name: "Mr. Emeka Nwosu", initials: "EN", department: "Upper Primary", subjects: ["Mathematics", "Basic Science"], classes: ["Primary 3"], phone: "+234 809 662 7741", email: "e.nwosu@excellenceacademy.edu.ng", status: "Active", gender: "Male", joined: "2015-09-10" },
  { id: "TCH-007", name: "Mrs. Blessing Etim", initials: "BE", department: "Early Years", subjects: ["Phonics", "Creative Arts"], classes: ["Nursery 2"], phone: "+234 802 337 8814", email: "b.etim@excellenceacademy.edu.ng", status: "Active", gender: "Female", joined: "2021-01-18" },
  { id: "TCH-008", name: "Mr. Kolawole Ajayi", initials: "KA", department: "Upper Primary", subjects: ["Social Studies", "French"], classes: ["Primary 6"], phone: "+234 815 220 6693", email: "k.ajayi@excellenceacademy.edu.ng", status: "Active", gender: "Male", joined: "2014-04-22" },
  { id: "TCH-009", name: "Mrs. Ngozi Eze", initials: "NE", department: "Early Years", subjects: ["Numeracy"], classes: ["Pre-Nursery"], phone: "+234 803 118 5540", email: "n.eze@excellenceacademy.edu.ng", status: "Inactive", gender: "Female", joined: "2019-11-05" },
  { id: "TCH-010", name: "Mr. Segun Oladipo", initials: "SO", department: "Upper Primary", subjects: ["Physical Education"], classes: ["Primary 4", "Primary 5", "Primary 6"], phone: "+234 807 664 2218", email: "s.oladipo@excellenceacademy.edu.ng", status: "Active", gender: "Male", joined: "2020-02-17" },
  { id: "TCH-011", name: "Mrs. Chiamaka Obi", initials: "CO", department: "Lower Primary", subjects: ["Computer Studies", "Mathematics"], classes: ["Primary 3"], phone: "+234 810 993 4426", email: "c.obi@excellenceacademy.edu.ng", status: "Active", gender: "Female", joined: "2022-08-29" },
  { id: "TCH-012", name: "Mr. David Asuquo", initials: "DA", department: "Early Years", subjects: ["Creative Arts"], classes: ["Creche"], phone: "+234 806 557 3301", email: "d.asuquo@excellenceacademy.edu.ng", status: "Active", gender: "Male", joined: "2023-01-09" },
];

// ---------------------------------------------------------------------------
// Students
// ---------------------------------------------------------------------------
const firstNamesF = ["Amara", "Chiamaka", "Zainab", "Folake", "Ifeoma", "Bisi", "Ada", "Halima", "Temitope", "Chinwe", "Rita", "Mary", "Precious", "Kemi", "Sandra"];
const firstNamesM = ["Chukwuemeka", "Ibrahim", "Oluwaseun", "David", "Samuel", "Michael", "Tobenna", "Yusuf", "Daniel", "Victor", "Peter", "Josiah", "Ikenna", "Femi", "Kayode"];
const surnames = ["Adeyemi", "Okafor", "Balogun", "Nwachukwu", "Mohammed", "Eze", "Okoro", "Abubakar", "Ogunleye", "Chukwu", "Adeleke", "Onyeka", "Bello", "Ibe", "Uche", "Anyanwu", "Fashola", "Nwankwo", "Suleiman", "Ojo"];
const parentFirst = ["Mr. & Mrs.", "Mr.", "Mrs.", "Dr.", "Engr.", "Barr."];

function makeStudents() {
  let list = [];
  let sid = 1;
  classesList.forEach((cls, ci) => {
    const count = cls === "Creche" ? 3 : cls.startsWith("Primary") ? 5 : 4;
    for (let i = 0; i < count; i++) {
      const isFemale = (sid + i) % 2 === 0;
      const first = isFemale ? firstNamesF[(sid * 3 + i) % firstNamesF.length] : firstNamesM[(sid * 5 + i) % firstNamesM.length];
      const last = surnames[(sid + ci * 2 + i) % surnames.length];
      const admissionNo = `EN/${2019 + (ci % 6)}/${String(sid).padStart(3, "0")}`;
      const attendanceRate = 82 + ((sid * 7 + i * 3) % 18); // 82-99
      const statusPool = ["Active", "Active", "Active", "Active", "Inactive"];
      const status = statusPool[(sid + i) % statusPool.length];
      list.push({
        id: `STU-${String(sid).padStart(3, "0")}`,
        admissionNo,
        name: `${first} ${last}`,
        initials: `${first[0]}${last[0]}`,
        class: cls,
        gender: isFemale ? "Female" : "Male",
        dob: `${2021 - ci}-0${(1 + (sid % 9))}-1${(sid % 8)}`,
        parentName: `${parentFirst[(sid + i) % parentFirst.length]} ${last}`,
        parentPhone: `+234 8${(sid % 9)}${(i + 1)} ${String(100 + sid).slice(-3)} ${String(1000 + sid * 7).slice(-4)}`,
        status,
        attendanceRate,
        avatarColor: isFemale ? "var(--ea-red)" : "var(--ea-green)",
      });
      sid++;
    }
  });
  return list;
}

export const students = makeStudents();

export const getStudentsByClass = (cls) => students.filter((s) => s.class === cls);

// ---------------------------------------------------------------------------
// Attendance — current week, per class
// ---------------------------------------------------------------------------
export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function makeAttendance() {
  const record = {};
  classesList.forEach((cls) => {
    const roster = getStudentsByClass(cls);
    record[cls] = roster.map((s) => {
      const marks = weekDays.map((_, di) => {
        const roll = (s.id.charCodeAt(4) + di * 13) % 10;
        if (roll < 8) return "P";
        if (roll === 8) return "L";
        return "A";
      });
      return { studentId: s.id, name: s.name, initials: s.initials, marks };
    });
  });
  return record;
}

export const attendanceByClass = makeAttendance();

export const overallAttendanceTrend = [
  { day: "Mon", rate: 94 },
  { day: "Tue", rate: 91 },
  { day: "Wed", rate: 96 },
  { day: "Thu", rate: 89 },
  { day: "Fri", rate: 93 },
];

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------
function gradeFor(total) {
  if (total >= 75) return "A";
  if (total >= 65) return "B";
  if (total >= 55) return "C";
  if (total >= 45) return "D";
  if (total >= 40) return "E";
  return "F";
}

function makeResults() {
  const list = [];
  students.forEach((s, si) => {
    const subs = subjectsList.filter((sub) => sub.classes.includes(s.class));
    subs.forEach((sub, subi) => {
      const ca = 15 + ((si * 3 + subi * 5) % 16); // 15-30
      const exam = 35 + ((si * 7 + subi * 11) % 36); // 35-70
      const total = ca + exam;
      list.push({
        studentId: s.id,
        studentName: s.name,
        class: s.class,
        subject: sub.name,
        ca,
        exam,
        total,
        grade: gradeFor(total),
      });
    });
  });
  return list;
}

export const results = makeResults();

export const getResultsByStudent = (studentId) => results.filter((r) => r.studentId === studentId);
export const getResultsByClass = (cls) => results.filter((r) => r.class === cls);

// ---------------------------------------------------------------------------
// Fees
// ---------------------------------------------------------------------------
const feeByLevel = (cls) => {
  if (cls === "Creche" || cls === "Pre-Nursery") return 145000;
  if (cls.startsWith("Nursery")) return 165000;
  return 185000;
};

function makeFees() {
  return students.map((s, i) => {
    const totalFees = feeByLevel(s.class);
    const payRoll = (i * 13) % 10;
    let paid;
    let status;
    if (payRoll < 6) {
      paid = totalFees;
      status = "Paid";
    } else if (payRoll < 9) {
      paid = Math.round(totalFees * (0.4 + (i % 4) * 0.1));
      status = "Partially Paid";
    } else {
      paid = 0;
      status = "NO";
    }
    return {
      studentId: s.id,
      studentName: s.name,
      class: s.class,
      term: schoolInfo.term,
      totalFees,
      paid,
      balance: totalFees - paid,
      status,
      lastPaymentDate: status === "Paid" ? `2026-09-${10 + (i % 15)}` : status === "Partially Paid" ? `2026-09-${5 + (i % 10)}` : null,
    };
  });
}

export const fees = makeFees();

export const totalFeesExpected = fees.reduce((sum, f) => sum + f.totalFees, 0);
export const totalFeesCollected = fees.reduce((sum, f) => sum + f.paid, 0);
export const feeCollectionRate = Math.round((totalFeesCollected / totalFeesExpected) * 100);

// ---------------------------------------------------------------------------
// Assignments
// ---------------------------------------------------------------------------
export const assignments = [
  { id: "ASG-001", title: "Fractions & Decimals Worksheet", subject: "Mathematics", class: "Primary 5", teacher: "Mr. Tunde Bakare", dueDate: "2026-10-02", status: "Published", submissions: 18, totalStudents: 21 },
  { id: "ASG-002", title: "My Family Comprehension", subject: "English Language", class: "Primary 1", teacher: "Mrs. Adaeze Okonkwo", dueDate: "2026-09-30", status: "Published", submissions: 14, totalStudents: 16 },
  { id: "ASG-003", title: "States of Matter Project", subject: "Basic Science", class: "Primary 4", teacher: "Mr. Chidi Umeh", dueDate: "2026-10-05", status: "Pending", submissions: 0, totalStudents: 19 },
  { id: "ASG-004", title: "Letter Sound Tracing Sheet", subject: "Phonics", class: "Nursery 1", teacher: "Mrs. Grace Ifeanyi", dueDate: "2026-09-29", status: "Published", submissions: 12, totalStudents: 14 },
  { id: "ASG-005", title: "Map Reading Exercise", subject: "Social Studies", class: "Primary 6", teacher: "Mr. Kolawole Ajayi", dueDate: "2026-10-08", status: "Draft", submissions: 0, totalStudents: 20 },
  { id: "ASG-006", title: "Basic Shapes Colouring", subject: "Creative Arts", class: "Pre-Nursery", teacher: "Mrs. Ngozi Eze", dueDate: "2026-09-28", status: "Published", submissions: 9, totalStudents: 12 },
  { id: "ASG-007", title: "Spreadsheet Basics Practical", subject: "Computer Studies", class: "Primary 3", teacher: "Mrs. Chiamaka Obi", dueDate: "2026-10-10", status: "Pending", submissions: 0, totalStudents: 18 },
  { id: "ASG-008", title: "French Greetings Dialogue", subject: "French", class: "Primary 2", teacher: "Mr. Kolawole Ajayi", dueDate: "2026-10-03", status: "Draft", submissions: 0, totalStudents: 17 },
];

// ---------------------------------------------------------------------------
// Communication / Announcements / Messages
// ---------------------------------------------------------------------------
export const announcements = [
  { id: "ANN-001", audience: "All Parents", sender: "Admin Office", subject: "Mid-Term Break Notice", message: "School will be closed for mid-term break from Oct 15 to Oct 19. Classes resume Oct 20.", date: "2026-09-25T09:00:00" },
  { id: "ANN-002", audience: "Class Teachers", sender: "Admin Office", subject: "Result Entry Deadline", message: "Please submit all First Term CA scores on the portal on or before Oct 1st.", date: "2026-09-24T14:30:00" },
  { id: "ANN-003", audience: "All Parents", sender: "Admin Office", subject: "Inter-House Sports Day", message: "Our annual Inter-House Sports Day holds on Oct 24 at the school field. Parents are welcome.", date: "2026-09-22T11:15:00" },
  { id: "ANN-004", audience: "All Parents", sender: "Admin Office", subject: "Fee Payment Reminder", message: "A gentle reminder that First Term fees balances should be cleared before Oct 6.", date: "2026-09-20T08:00:00" },
];

export const parentMessages = [
  { id: "MSG-001", from: "Mrs. Adaeze Okonkwo", to: "Mr. & Mrs. Adeyemi", childName: "Amara Adeyemi", subject: "Great improvement in reading", body: "Amara has shown wonderful progress with her phonics blending this week. Keep encouraging home reading!", date: "2026-09-25T15:20:00", read: true, direction: "in" },
  { id: "MSG-002", from: "Mr. & Mrs. Adeyemi", to: "Mrs. Adaeze Okonkwo", childName: "Amara Adeyemi", subject: "Re: Great improvement in reading", body: "Thank you Ma, we really appreciate your effort with her.", date: "2026-09-25T18:05:00", read: true, direction: "out" },
  { id: "MSG-003", from: "Admin Office", to: "All Parents", childName: null, subject: "Fee balance for Primary 3", body: "Kindly note there is an outstanding balance on your ward's account for this term.", date: "2026-09-23T10:00:00", read: false, direction: "in" },
  { id: "MSG-004", from: "Mr. Tunde Bakare", to: "Parent", childName: "Chukwuemeka Okafor", subject: "Missed assignment", body: "Chukwuemeka has not submitted the Fractions worksheet yet. Please remind him at home.", date: "2026-09-22T16:40:00", read: false, direction: "in" },
];

// ---------------------------------------------------------------------------
// Events & Activities (Admin overview widgets)
// ---------------------------------------------------------------------------
export const upcomingEvents = [
  { id: "EV-01", title: "Mid-Term Break Begins", date: "2026-10-15", type: "holiday" },
  { id: "EV-02", title: "PTA General Meeting", date: "2026-10-03", type: "meeting" },
  { id: "EV-03", title: "Inter-House Sports Day", date: "2026-10-24", type: "event" },
  { id: "EV-04", title: "First Term Exams Begin", date: "2026-11-16", type: "exam" },
];

export const recentActivities = [
  { id: "ACT-01", text: "Mrs. Adaeze Okonkwo recorded attendance for Primary 1", time: "10 minutes ago", icon: "bi-clipboard-check" },
  { id: "ACT-02", text: "New student Precious Ibe was admitted into Nursery 2", time: "45 minutes ago", icon: "bi-person-plus" },
  { id: "ACT-03", text: "Fee payment of ₦185,000 received from Okoro family", time: "1 hour ago", icon: "bi-cash-coin" },
  { id: "ACT-04", text: "Mr. Chidi Umeh published a new Basic Science assignment", time: "2 hours ago", icon: "bi-journal-plus" },
  { id: "ACT-05", text: "Mr. Kolawole Ajayi submitted First Term results for Primary 6", time: "3 hours ago", icon: "bi-file-earmark-bar-graph" },
  { id: "ACT-06", text: "Admin sent an announcement about Mid-Term Break", time: "Yesterday", icon: "bi-megaphone" },
];

// ---------------------------------------------------------------------------
// Auth — demo accounts (mock, no real backend)
// ---------------------------------------------------------------------------
export const demoAccounts = {
  admin: { email: "admin@excellenceacademy.edu.ng", password: "admin123", name: "Mrs. Patience Umeadi", role: "admin", title: "School Administrator", initials: "PU" },
  teacher: { email: "t.bakare@excellenceacademy.edu.ng", password: "teach123", name: "Mr. Tunde Bakare", role: "teacher", title: "Mathematics Teacher", initials: "TB", teacherId: "TCH-002" },
  parent: { email: "parent@excellenceacademy.edu.ng", password: "parent123", name: "Mr. & Mrs. Adeyemi", role: "parent", title: "Parent", initials: "AD", childrenIds: ["STU-001", "STU-002"] },
};

// Ensure the demo parent's children exist and belong to different classes for variety
if (students.length >= 2) {
  demoAccounts.parent.childrenIds = [students[0].id, students[8] ? students[8].id : students[1].id];
}

export const getChildrenForParent = (childrenIds) => students.filter((s) => childrenIds.includes(s.id));

// ---------------------------------------------------------------------------
// Report Sheet helpers
// ---------------------------------------------------------------------------

// Tallies this term's Present / Absent / Late marks for one student from the
// weekly attendance register, and derives an attendance rate from them.
export function getAttendanceSummaryForStudent(student) {
  const row = (attendanceByClass[student.class] || []).find((r) => r.studentId === student.id);
  if (!row) return { present: 0, absent: 0, late: 0, total: 0, rate: student.attendanceRate };
  const present = row.marks.filter((m) => m === "P").length;
  const absent = row.marks.filter((m) => m === "A").length;
  const late = row.marks.filter((m) => m === "L").length;
  const total = row.marks.length;
  const rate = total ? Math.round(((present + late) / total) * 100) : student.attendanceRate;
  return { present, absent, late, total, rate };
}

// Ranks every student in the same class by their term average to work out
// this student's position (1st, 2nd, ...) in class.
export function getClassPosition(studentId) {
  const student = students.find((s) => s.id === studentId);
  if (!student) return null;
  const classmates = getStudentsByClass(student.class);
  const ranked = classmates
    .map((s) => {
      const r = getResultsByStudent(s.id);
      const total = r.reduce((sum, x) => sum + x.total, 0);
      const average = r.length ? Math.round(total / r.length) : 0;
      return { id: s.id, average };
    })
    .sort((a, b) => b.average - a.average);
  const position = ranked.findIndex((r) => r.id === studentId) + 1;
  return { position, outOf: ranked.length };
}

// Picks a canned teacher / principal remark based on the term average —
// stands in for a real free-text remark a teacher would type in.
export function getRemark(average) {
  if (average >= 75) return { teacher: "An outstanding result. Keep up the excellent work!", principal: "Excellent! A truly commendable performance this term." };
  if (average >= 65) return { teacher: "A very good result. Consistent effort will push this even higher.", principal: "Very good performance. Well done." };
  if (average >= 55) return { teacher: "A good result overall. More focus on weaker subjects will help.", principal: "Good effort this term. There is room to improve." };
  if (average >= 45) return { teacher: "A fair result. More commitment to study is encouraged.", principal: "Fair performance. Needs to put in more effort next term." };
  return { teacher: "Needs significant improvement. Extra support is recommended at home.", principal: "This result needs urgent attention. Please see the class teacher." };
}
