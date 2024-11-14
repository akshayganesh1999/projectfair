import { useContext, useState } from 'react'
import './bootstrap.min.css';
import './App.css'
import Landing from './assets/pages/Landing'
import Dashboard from './assets/pages/Dashboard'
import Auth from './assets/pages/Auth'
import AllProjects from './assets/pages/AllProjects'
import Footer from './assets/components/Footer'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logContext } from './contextapi/AuthContext';

function App() {

  const { logStatus } = useContext(logContext)

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dash" element={logStatus ? <Dashboard /> : <Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/projects" element={logStatus ? <AllProjects /> : <Auth />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
