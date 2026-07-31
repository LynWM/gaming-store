import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AdminTopBar from "../components/admin/adminTopBar";
import Sidebar from "../components/admin/adminSidebar";

export default function AdminLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

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