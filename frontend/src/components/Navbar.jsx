import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar-vivant">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="navbar-brand-vivant">
          <div className="logo-icon">✚</div>
          <span className="brand-name">Vivant<span>Care</span></span>
        </Link>

        <div className="d-flex align-items-center gap-1">
          <Link to="/"        className={`nav-link-vivant ${pathname === '/'        ? 'active' : ''}`}>Home</Link>
          <Link to="/about"   className={`nav-link-vivant ${pathname === '/about'   ? 'active' : ''}`}>About Us</Link>
          <Link to="/contact" className={`nav-link-vivant ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
          <Link to="/appointments" className={`nav-link-vivant ${pathname === '/appointments' ? 'active' : ''}`}>My Appointments</Link>
          <Link to="/admin" className={`nav-link-vivant ${pathname === '/admin' ? 'active' : ''}`}>Admin</Link>

          <Link to="/book"    className={`nav-link-vivant btn-book-nav ms-2 ${pathname === '/book' ? 'active' : ''}`}>
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  )
}