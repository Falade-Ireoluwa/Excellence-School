import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SchoolSetup from "./pages/auth/SchoolSetup";

import AdminOverview from "./pages/admin/Overview";
import AdminStudents from "./pages/admin/Students";
import AdminTeachers from "./pages/admin/Teachers";
import AdminClasses from "./pages/admin/Classes";
import AdminSubjects from "./pages/admin/Subjects";
import AdminAttendance from "./pages/admin/Attendance";
import AdminResults from "./pages/admin/Results";
import AdminFees from "./pages/admin/Fees";
import AdminAssignments from "./pages/admin/Assignments";
import AdminCommunication from "./pages/admin/Communication";
import AdminSettings from "./pages/admin/Settings";
import AdminReportSheet from "./pages/admin/ReportSheet";

import TeacherOverview from "./pages/teacher/Overview";
import TeacherMyClasses from "./pages/teacher/MyClasses";
import TeacherAttendanceResults from "./pages/teacher/AttendanceResults";
import TeacherAssignments from "./pages/teacher/Assignments";

import ParentChildrenOverview from "./pages/parent/ChildrenOverview";
import ParentAttendanceResults from "./pages/parent/AttendanceResults";
import ParentFeesMessages from "./pages/parent/FeesMessages";
import ParentReportSheet from "./pages/parent/ReportSheet";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/school-setup" element={<SchoolSetup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminOverview /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute role="admin"><AdminStudents /></ProtectedRoute>} />
          <Route path="/admin/teachers" element={<ProtectedRoute role="admin"><AdminTeachers /></ProtectedRoute>} />
          <Route path="/admin/classes" element={<ProtectedRoute role="admin"><AdminClasses /></ProtectedRoute>} />
          <Route path="/admin/subjects" element={<ProtectedRoute role="admin"><AdminSubjects /></ProtectedRoute>} />
          <Route path="/admin/attendance" element={<ProtectedRoute role="admin"><AdminAttendance /></ProtectedRoute>} />
          <Route path="/admin/results" element={<ProtectedRoute role="admin"><AdminResults /></ProtectedRoute>} />
          <Route path="/admin/fees" element={<ProtectedRoute role="admin"><AdminFees /></ProtectedRoute>} />
          <Route path="/admin/assignments" element={<ProtectedRoute role="admin"><AdminAssignments /></ProtectedRoute>} />
          <Route path="/admin/communication" element={<ProtectedRoute role="admin"><AdminCommunication /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/students/:studentId/report" element={<ProtectedRoute role="admin"><AdminReportSheet /></ProtectedRoute>} />


          <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherOverview /></ProtectedRoute>} />
          <Route path="/teacher/classes" element={<ProtectedRoute role="teacher"><TeacherMyClasses /></ProtectedRoute>} />
          <Route path="/teacher/attendance-results" element={<ProtectedRoute role="teacher"><TeacherAttendanceResults /></ProtectedRoute>} />
          <Route path="/teacher/assignments" element={<ProtectedRoute role="teacher"><TeacherAssignments /></ProtectedRoute>} />

          <Route path="/parent" element={<ProtectedRoute role="parent"><ParentChildrenOverview /></ProtectedRoute>} />
          <Route path="/parent/attendance-results" element={<ProtectedRoute role="parent"><ParentAttendanceResults /></ProtectedRoute>} />
          <Route path="/parent/fees-messages" element={<ProtectedRoute role="parent"><ParentFeesMessages /></ProtectedRoute>} />
          <Route path="/parent/report" element={<ProtectedRoute role="parent"><ParentReportSheet /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
