// layouts/CustomerLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/customer/navbar";
import Footer from "../components/customer/footer";
import EmailAssistant from "../components/customer/EmailAssistant";

export default function CustomerLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <EmailAssistant />
    </>
  );
}