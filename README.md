# Excellence Academy — School Management SaaS

A production-styled school management dashboard for **Excellence Nursery and
Primary School**, built with React (Vite), React Router v6 and Bootstrap 5.
Every screen is backed by a rich, fully-populated mock dataset, so the whole
app is interactive out of the box — no backend required.

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Demo Logins

The login screen pre-fills demo credentials for whichever role you pick —
just click **Sign In**. Any non-empty email/password combination also works.

| Role    | Email                                   | Password   |
|---------|------------------------------------------|-----------|
| Admin   | admin@excellenceacademy.edu.ng           | admin123  |
| Teacher | t.bakare@excellenceacademy.edu.ng        | teach123  |
| Parent  | parent@excellenceacademy.edu.ng          | parent123 |

## Features

- **Auth flow**: Login (role selector), Forgot Password, School Setup onboarding
- **Admin dashboard**: Overview, Students, Teachers, Classes, Subjects,
  Attendance, Results, Fees, Assignments, Communication, Settings
- **Teacher dashboard**: Overview, My Classes, Attendance & Results Entry,
  Assignments
- **Parent dashboard**: Children Overview, Attendance & Results, Fees & Messages
- **Dark mode**: toggle in the top bar or Settings; preference is saved
  per-browser and respects your OS setting on first visit
- Fully responsive: collapsible sidebar on tablet/mobile, responsive tables

## Project Structure

```
src/
  components/
    layout/     Sidebar, Topbar, DashboardLayout, ProtectedRoute, Logo
    common/     StatCard, StatusBadge, Modal, Pagination, charts, etc.
  context/      AuthContext, ThemeContext
  data/         mockData.js — single source of truth for all mock data
  pages/
    auth/       Login, ForgotPassword, SchoolSetup
    admin/      11 admin pages
    teacher/    4 teacher pages
    parent/     3 parent pages
  styles/       custom.css — full design system (light + dark themes)
```

## Notes

- All data is in-memory (seeded from `src/data/mockData.js`). Adding,
  editing or deleting records (students, teachers, fees, etc.) updates the
  UI for the session but resets on reload, since there's no backend here.
- Swap in a real API by replacing the mock data imports with fetch calls —
  the component structure is already organized by resource, so this is a
  drop-in change page by page.
