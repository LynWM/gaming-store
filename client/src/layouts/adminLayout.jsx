import { Outlet } from "react-router-dom";
import AdminTopBar from "../components/admin/adminTopBar";
import Sidebar from "../components/admin/adminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0B0712]">
      <AdminTopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}