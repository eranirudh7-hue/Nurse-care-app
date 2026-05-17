import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'
import AdminDashboard from './pages/AdminDashboard'



export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/book"       element={<BookAppointment />} />
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/admin"        element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  )
}