import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import CustomerLayout from "./layouts/customerLayout";
import AdminLayout from "./layouts/adminLayout";
import React from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom'

import Navbar from './layouts/navbar'
import Footer from './layouts/footer'
import Homepage from './pages/customer/homepage'
import CategoryPage from './pages/customer/CategoryPage'
import Signup from './layouts/signup'
import Login from './layouts/login'

import Home from "./pages/customer/homepage";
import SignUp from "./layouts/signup";
import Login from "./layouts/login";

function App() {
  return (
    <AuthProvider>
       <BrowserRouter>
          <Routes>
            
            {/* Customer pages */}
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/:slug" element={<CategoryPage />} />
            </Route>

          {/* Admin pages */}
          <Route path="/admin" element={<AdminLayout />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;