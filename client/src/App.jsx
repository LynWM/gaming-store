import React from 'react'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'

import Navbar from './layouts/navbar'
import Footer from './layouts/footer'
import Homepage from './pages/customer/homepage'
import CategoryPage from './pages/customer/CategoryPage'
import Signup from './layouts/signup'
import Login from './layouts/login'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <main className='min-h-screen'>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Homepage /> } />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:slug" element={<CategoryPage />} />
          </Routes>
          
        </main>
      <Footer />
    </BrowserRouter>
  )
}
