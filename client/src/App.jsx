import React from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom'

import Navbar from './layouts/navbar'
import Footer from './layouts/footer'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <main className='min-h-screen'>
          {/* Routes */}
        </main>
      <Footer />
    </BrowserRouter>
  )
}
