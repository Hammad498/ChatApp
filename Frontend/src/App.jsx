import './App.css'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register.jsx'
import SetProfilePic from './pages/SetProfilePic.jsx'

import React from 'react'

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         {/* <Route path='/'element={<ProtectedRoute>Chat_Page</ProtectedRoute>}/> */}
         <Route path='/set-avatar' element={<ProtectedRoute><SetProfilePic/></ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
