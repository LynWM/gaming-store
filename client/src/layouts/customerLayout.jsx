// layouts/CustomerLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/navbar";
import Footer from "../components/customer/footer";

export default function CustomerLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}