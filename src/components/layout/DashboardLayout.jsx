import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="ea-app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="ea-main">
        <Topbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="ea-content">{children}</main>
      </div>
    </div>
  );
}
