import { useState, useEffect } from 'react'
import axios from 'axios'

const ADMIN_PASSWORD = 'admin123'

export default function AdminDashboard() {
  const [isLoggedIn,   setIsLoggedIn]   = useState(false)
  const [password,     setPassword]     = useState('')
  const [pwError,      setPwError]      = useState('')
  const [appointments, setAppointments] = useState([])
  const [filtered,     setFiltered]     = useState([])
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const [search,       setSearch]       = useState('')
  const [filterDoctor, setFilterDoctor] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Check if already logged in this session
    const session = sessionStorage.getItem('vivant_admin')
    if (session === 'true') setIsLoggedIn(true)
  }, [])

  useEffect(() => {
    if (isLoggedIn) fetchAll()
  }, [isLoggedIn])

  useEffect(() => {
    applyFilters()
  }, [search, filterDoctor, filterStatus, appointments])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('vivant_admin', 'true')
      setIsLoggedIn(true)
      setPwError('')
    } else {
      setPwError('❌ Incorrect password. Please try again.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('vivant_admin')
    setIsLoggedIn(false)
    setAppointments([])
    setPassword('')
  }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/appointments`)

      setAppointments(res.data)
      setFiltered(res.data)
    } catch {
      setError('Failed to load appointments.')
    } finally {
      setLoading(false)
    }
  }

  const getStatus = (dateStr) => {
    const today = new Date()
    today.setHours(0,0,0,0)
    const apptDate = new Date(dateStr)
    return apptDate >= today ? 'upcoming' : 'completed'
  }

  const applyFilters = () => {
    let data = [...appointments]
    if (search) {
      const s = search.toLowerCase()
      data = data.filter(a =>
        a.patient_name.toLowerCase().includes(s) ||
        a.email.toLowerCase().includes(s) ||
        a.doctor.toLowerCase().includes(s)
      )
    }
    if (filterDoctor !== 'all') data = data.filter(a => a.doctor === filterDoctor)
    if (filterStatus !== 'all') data = data.filter(a => getStatus(a.appointment_date) === filterStatus)
    setFiltered(data)
  }

  const doctors = [...new Set(appointments.map(a => a.doctor))]
  const total     = appointments.length
  const upcoming  = appointments.filter(a => getStatus(a.appointment_date) === 'upcoming').length
  const completed = appointments.filter(a => getStatus(a.appointment_date) === 'completed').length
  const depts     = [...new Set(appointments.map(a => a.department))].length

  // ── Login Screen ──
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight:'80vh', display:'flex',
        alignItems:'center', justifyContent:'center',
        background:'#f8fffe', padding:'2rem'
      }}>
        <div className="form-card" style={{maxWidth:420, width:'100%'}}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="logo-icon" style={{fontSize:'1.5rem'}}>🔐</div>
            <div>
              <h3 style={{fontFamily:'Playfair Display,serif', margin:0}}>Admin Access</h3>
              <p style={{color:'#6b7280', margin:0, fontSize:'0.875rem'}}>VivantCare staff only</p>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label-vivant">Admin Password</label>
              <input
                className="form-control-vivant"
                type="password"
                required
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {pwError && (
              <div style={{
                background:'#fef2f2', border:'1px solid #fecaca',
                color:'#dc2626', borderRadius:10,
                padding:'0.75rem 1rem', fontSize:'0.875rem', marginBottom:'1rem'
              }}>
                {pwError}
              </div>
            )}

            <button type="submit" className="btn-primary-vivant w-100" style={{textAlign:'center'}}>
              Login to Dashboard →
            </button>
          </form>

          <p style={{
            color:'#9ca3af', fontSize:'0.78rem',
            textAlign:'center', marginTop:'1.5rem'
          }}>
            🔒 This area is restricted to VivantCare administrators only.
          </p>
        </div>
      </div>
    )
  }

  // ── Dashboard Screen ──
  return (
    <>
      <div className="page-hero">
        <div className="container d-flex align-items-center justify-content-between">
          <div>
            <h1 className="section-title">Admin Dashboard</h1>
            <p className="section-subtitle mb-0">Manage and monitor all VivantCare appointments.</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-outline-vivant"
            style={{padding:'0.5rem 1.2rem', fontSize:'0.875rem'}}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">

          {/* Stats */}
          <div className="row g-4 mb-5">
            {[
              { icon:'📋', label:'Total Bookings',    num:total,     bg:'#e6f4f2' },
              { icon:'🗓️', label:'Upcoming',           num:upcoming,  bg:'#eff6ff' },
              { icon:'✅', label:'Completed',          num:completed, bg:'#f0fdf4' },
              { icon:'🏥', label:'Departments Active', num:depts,     bg:'#fef9ec' },
            ].map(s => (
              <div key={s.label} className="col-md-3 col-6">
                <div className="stat-box">
                  <div className="stat-box-icon" style={{background:s.bg}}>{s.icon}</div>
                  <div>
                    <div className="stat-box-num">{s.num}</div>
                    <div className="stat-box-label">{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="filter-bar">
            <div style={{flex:1, minWidth:200}}>
              <input className="form-control-vivant"
                placeholder="🔍 Search by name, email or doctor..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="form-control-vivant" style={{width:'auto'}}
              value={filterDoctor} onChange={e => setFilterDoctor(e.target.value)}>
              <option value="all">All Doctors</option>
              {doctors.map(d => <option key={d} value={d}>Dr. {d}</option>)}
            </select>
            <select className="form-control-vivant" style={{width:'auto'}}
              value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
            <button className="btn-outline-vivant"
              style={{whiteSpace:'nowrap', padding:'0.6rem 1.2rem'}}
              onClick={() => { setSearch(''); setFilterDoctor('all'); setFilterStatus('all') }}>
              Clear
            </button>
            <button className="btn-primary-vivant"
              style={{whiteSpace:'nowrap', padding:'0.6rem 1.2rem'}}
              onClick={fetchAll}>
              🔄 Refresh
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div style={{textAlign:'center', padding:'4rem', color:'#6b7280'}}>
              <div style={{fontSize:'3rem', marginBottom:'1rem'}}>⏳</div>
              <p>Loading appointments...</p>
            </div>
          ) : error ? (
            <div style={{textAlign:'center', padding:'4rem', color:'#dc2626'}}>
              <div style={{fontSize:'3rem', marginBottom:'1rem'}}>❌</div>
              <p>{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{textAlign:'center', padding:'4rem', color:'#6b7280'}}>
              <div style={{fontSize:'3rem', marginBottom:'1rem'}}>📭</div>
              <p>No appointments found.</p>
            </div>
          ) : (
            <>
              <p style={{color:'#6b7280', fontSize:'0.875rem', marginBottom:'1rem'}}>
                Showing <strong>{filtered.length}</strong> of <strong>{total}</strong> appointments
              </p>
              <div className="admin-table-wrap">
                <div style={{overflowX:'auto'}}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Department</th>
                        <th>Date & Time</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Booked On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((appt) => {
                        const status = getStatus(appt.appointment_date)
                        return (
                          <tr key={appt.id}>
                            <td style={{color:'#9ca3af', fontWeight:600}}>
                              #{appt.id.slice(0,6).toUpperCase()}
                            </td>
                            <td>
                              <div style={{fontWeight:600, color:'#0f1f1c'}}>{appt.patient_name}</div>
                              <div style={{fontSize:'0.78rem', color:'#9ca3af'}}>{appt.patient_age} yrs</div>
                            </td>
                            <td>
                              <div style={{fontWeight:600}}>Dr. {appt.doctor}</div>
                            </td>
                            <td>
                              <span style={{
                                background:'#e6f4f2', color:'#0a7c6e',
                                fontSize:'0.75rem', fontWeight:600,
                                padding:'0.25rem 0.6rem', borderRadius:6
                              }}>
                                {appt.department}
                              </span>
                            </td>
                            <td>
                              <div style={{fontWeight:600}}>{appt.appointment_date}</div>
                              <div style={{fontSize:'0.78rem', color:'#9ca3af'}}>{appt.appointment_time}</div>
                            </td>
                            <td>
                              <div style={{fontSize:'0.82rem'}}>{appt.email}</div>
                              <div style={{fontSize:'0.78rem', color:'#9ca3af'}}>{appt.phone || '—'}</div>
                            </td>
                            <td>
                              <span className={`appt-badge ${status === 'upcoming' ? 'badge-upcoming' : 'badge-completed'}`}>
                                {status === 'upcoming' ? '🗓 Upcoming' : '✅ Completed'}
                              </span>
                            </td>
                            <td style={{color:'#9ca3af', fontSize:'0.78rem'}}>
                              {new Date(appt.created_at).toLocaleDateString('en-IN')}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}