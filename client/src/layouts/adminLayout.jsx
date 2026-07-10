// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminTopBar from "../components/admin/adminTopBar";
import Sidebar from "../components/admin/adminSidebar";

export default function AdminLayout() {
  return (
    <>
      <AdminTopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}