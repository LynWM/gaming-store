import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "./layouts/customerLayout";
import AdminLayout from "./layouts/adminLayout";

import Home from "./pages/customer/homepage";
import SignUp from "./layouts/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer pages */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;