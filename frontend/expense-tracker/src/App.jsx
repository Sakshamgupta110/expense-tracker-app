import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  } from "react-router-dom";
import Login from './pages/Auth/login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/dashboard/Home';
import Income from './pages/dashboard/Income';
import Expense from './pages/dashboard/Expense';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expense />} />

      </Routes>
    </Router>
  )
}

export default App

const Root=()=>{
  // check if token exist in local storage
  const isAuthenticated=!!localStorage.getItem("token");

  // if token exist, redirect to dashboard else redirect to login
  if(isAuthenticated){
    return <Navigate to="/dashboard" />
  }
  return (
    <Navigate to="/login" />
  )
}