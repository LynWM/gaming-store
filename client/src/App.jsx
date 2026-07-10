import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerLayout from "./layouts/customerLayout";
import AdminLayout from "./layouts/adminLayout";
import React from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom'

import Navbar from './layouts/navbar'
import Footer from './layouts/footer'

import Home from "./pages/customer/homepage";
import SignUp from "./layouts/signup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <main className='min-h-screen'>
          {/* Routes */}
        </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;