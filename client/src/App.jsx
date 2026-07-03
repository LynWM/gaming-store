import React from 'react'
import {BrowserRouter, Route, Router} from 'react-router-dom'

import Navbar from './layouts/navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <main className='min-h-screen'>

        </main>
      </Navbar>
    </BrowserRouter>
  )
}
