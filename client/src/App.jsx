import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'
import Register from "./Pages/Register"
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import EditTodo from "./Pages/EditTodo"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditTodo/>
          </ProtectedRoute>
        } />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App

