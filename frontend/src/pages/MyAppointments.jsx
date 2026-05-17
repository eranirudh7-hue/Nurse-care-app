import { useState } from 'react'
import axios from 'axios'

const TIMES = [
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM'
]

export default function MyAppointments() {
  const [email,        setEmail]        = useState('')
  const [appointments, setAppointments] = useState([])
  const [loading,      setLoading]      = useState(false)
  const [searched,     setSearched]     = useState(false)
  const [error,        setError]        = useState('')

  // Cancel modal
  const [cancelModal,  setCancelModal]  = useState(null)
  const [cancelling,   setCancelling]   = useState(false)

  // Reschedule modal
  const [rescheduleModal, setRescheduleModal] = useState(null)
  const [newDate,          setNewDate]         = useState('')
  const [newTime,          setNewTime]         = useState('')
  const [rescheduling,     setRescheduling]    = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSearched(false)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointments?email=${email}`)

      setAppointments(res.data)
      setSearched(true)
    } catch {
      setError('Could not fetch appointments. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatus = (appt) => {
    if (appt.status === 'cancelled') return 'cancelled'
    const today = new Date()
    today.setHours(0,0,0,0)
    return new Date(appt.appointment_date) >= today ? 'upcoming' : 'completed'
  }

  const STATUS_STYLE = {
    upcoming:  { bg:'#e6f4f2', color:'#0a7c6e', label:'🗓 Upcoming'  },
    completed: { bg:'#f0fdf4', color:'#16a34a', label:'✅ Completed' },
    cancelled: { bg:'#fef2f2', color:'#dc2626', label:'❌ Cancelled' },
  }

  // Cancel
  const handleCancel = async () => {
    setCancelling(true)
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/appointments/${cancelModal.id}/cancel`)

      setAppointments(prev =>
        prev.map(a => a.id === cancelModal.id ? { ...a, status: 'cancelled' } : a)
      )
      setCancelModal(null)
    } catch {
      alert('Failed to cancel. Please try again.')
    } finally {
      setCancelling(false)
    }
  }

  // Reschedule
  const handleReschedule = async (e) => {
    e.preventDefault()
    setRescheduling(true)
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/appointments/${rescheduleModal.id}/reschedule`, {
        appointment_date: newDate,
        appointment_time: newTime
      })
      setAppointments(prev =>
        prev.map(a => a.id === rescheduleModal.id
          ? { ...a, appointment_date: newDate, appointment_time: newTime, status: 'upcoming' }
          : a
        )
      )
      setRescheduleModal(null)
      setNewDate('')
      setNewTime('')
    } catch {
      alert('Failed to reschedule. Please try again.')
    } finally {
      setRescheduling(false)
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="section-title">My Appointments</h1>
          <p className="section-subtitle mb-0">View, cancel, or reschedule your bookings.</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">

          {/* Search */}
          <div className="row justify-content-center mb-5">
            <div className="col-lg-6">
              <div className="form-card">
                <h5 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.5rem'}}>
                  Find Your Appointments
                </h5>
                <p style={{color:'#6b7280', fontSize:'0.875rem', marginBottom:'1.5rem'}}>
                  Enter the email you used when booking.
                </p>
                <form onSubmit={handleSearch}>
                  <div className="d-flex gap-3">
                    <input
                      className="form-control-vivant"
                      type="email" required
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{flex:1}}
                    />
                    <button type="submit" className="btn-primary-vivant"
                      disabled={loading} style={{whiteSpace:'nowrap'}}>
                      {loading ? '🔍 Searching...' : 'Search →'}
                    </button>
                  </div>
                </form>
                {error && <p style={{color:'#dc2626', fontSize:'0.875rem', marginTop:'0.75rem'}}>{error}</p>}
              </div>
            </div>
          </div>

          {/* Results */}
          {searched && (
            appointments.length === 0 ? (
              <div style={{textAlign:'center', padding:'3rem'}}>
                <div style={{fontSize:'4rem', marginBottom:'1rem'}}>📭</div>
                <h5 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.5rem'}}>No Appointments Found</h5>
                <p style={{color:'#6b7280'}}>No bookings found for <strong>{email}</strong></p>
                <a href="/book" className="btn-primary-vivant mt-3" style={{display:'inline-block'}}>
                  Book an Appointment →
                </a>
              </div>
            ) : (
              <>
                <p style={{color:'#6b7280', marginBottom:'1.5rem', textAlign:'center'}}>
                  Found <strong>{appointments.length}</strong> appointment{appointments.length > 1 ? 's' : ''} for <strong>{email}</strong>
                </p>
                <div className="row g-4">
                  {appointments.map(appt => {
                    const status = getStatus(appt)
                    const s = STATUS_STYLE[status]
                    const isUpcoming = status === 'upcoming'

                    return (
                      <div key={appt.id} className="col-lg-6">
                        <div className="service-card" style={{position:'relative'}}>

                          {/* Status badge */}
                          <div style={{
                            position:'absolute', top:'1.25rem', right:'1.25rem',
                            background:s.bg, color:s.color,
                            fontSize:'0.75rem', fontWeight:600,
                            padding:'0.3rem 0.8rem', borderRadius:20
                          }}>
                            {s.label}
                          </div>

                          {/* Doctor info */}
                          <div className="d-flex align-items-center gap-3 mb-3">
                            <div style={{
                              width:48, height:48, borderRadius:12,
                              background:'var(--teal-light)',
                              display:'flex', alignItems:'center',
                              justifyContent:'center', fontSize:'1.5rem'
                            }}>👨‍⚕️</div>
                            <div>
                              <div style={{fontFamily:'Playfair Display,serif', fontWeight:600}}>
                                Dr. {appt.doctor}
                              </div>
                              <div style={{color:'var(--teal)', fontSize:'0.82rem', fontWeight:500}}>
                                {appt.department}
                              </div>
                            </div>
                          </div>

                          {/* Details */}
                          <div style={{
                            display:'grid', gridTemplateColumns:'1fr 1fr',
                            gap:'0.75rem', marginBottom:'1rem'
                          }}>
                            {[
                              ['👤','Patient',  appt.patient_name],
                              ['📅','Date',     appt.appointment_date],
                              ['🕐','Time',     appt.appointment_time],
                              ['👥','Age',      appt.patient_age + ' yrs'],
                            ].map(([icon, label, value]) => (
                              <div key={label} style={{
                                background:'#f8fffe', borderRadius:10,
                                padding:'0.6rem 0.75rem'
                              }}>
                                <div style={{fontSize:'0.72rem', color:'#9ca3af', marginBottom:2}}>{icon} {label}</div>
                                <div style={{fontSize:'0.875rem', fontWeight:600, color:'#0f1f1c'}}>{value}</div>
                              </div>
                            ))}
                          </div>

                          {/* Symptoms */}
                          {appt.symptoms && (
                            <div style={{
                              background:'#f8fffe', borderRadius:10,
                              padding:'0.75rem', marginBottom:'1rem',
                              fontSize:'0.85rem', color:'#6b7280'
                            }}>
                              <span style={{fontWeight:600, color:'#374151'}}>🩺 Symptoms: </span>
                              {appt.symptoms}
                            </div>
                          )}

                          {/* Action buttons — only for upcoming */}
                          {isUpcoming && (
                            <div className="d-flex gap-2 mb-3">
                              <button
                                className="btn-outline-vivant"
                                style={{flex:1, padding:'0.6rem', fontSize:'0.85rem', textAlign:'center'}}
                                onClick={() => {
                                  setRescheduleModal(appt)
                                  setNewDate(appt.appointment_date)
                                  setNewTime(appt.appointment_time)
                                }}
                              >
                                🔄 Reschedule
                              </button>
                              <button
                                className="btn-danger-vivant"
                                style={{flex:1, padding:'0.6rem', fontSize:'0.85rem'}}
                                onClick={() => setCancelModal(appt)}
                              >
                                ❌ Cancel
                              </button>
                            </div>
                          )}

                          {/* Booking ID */}
                          <div style={{
                            borderTop:'1px solid #e8f0ef', paddingTop:'0.75rem',
                            fontSize:'0.78rem', color:'#9ca3af',
                            display:'flex', justifyContent:'space-between'
                          }}>
                            <span>ID: <strong style={{color:'#374151'}}>#{appt.id.slice(0,8).toUpperCase()}</strong></span>
                            <span>{new Date(appt.created_at).toLocaleDateString('en-IN')}</span>
                          </div>

                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )
          )}
        </div>
      </section>

      {/* ── Cancel Modal ── */}
      {cancelModal && (
        <div className="modal-overlay" onClick={() => setCancelModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
              <div style={{fontSize:'3rem', marginBottom:'0.75rem'}}>⚠️</div>
              <h4 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.5rem'}}>
                Cancel Appointment?
              </h4>
              <p style={{color:'#6b7280', fontSize:'0.9rem'}}>
                Are you sure you want to cancel your appointment with{' '}
                <strong>Dr. {cancelModal.doctor}</strong> on{' '}
                <strong>{cancelModal.appointment_date}</strong> at{' '}
                <strong>{cancelModal.appointment_time}</strong>?
              </p>
              <p style={{color:'#dc2626', fontSize:'0.82rem', marginTop:'0.5rem'}}>
                This action cannot be undone.
              </p>
            </div>
            <div className="d-flex gap-3">
              <button className="btn-gray-vivant" style={{flex:1}}
                onClick={() => setCancelModal(null)}>
                Keep Appointment
              </button>
              <button className="btn-danger-vivant" style={{flex:1}}
                disabled={cancelling} onClick={handleCancel}>
                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reschedule Modal ── */}
      {rescheduleModal && (
        <div className="modal-overlay" onClick={() => setRescheduleModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h4 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.25rem'}}>
              🔄 Reschedule Appointment
            </h4>
            <p style={{color:'#6b7280', fontSize:'0.875rem', marginBottom:'1.5rem'}}>
              Choose a new date and time for Dr. {rescheduleModal.doctor}
            </p>
            <form onSubmit={handleReschedule}>
              <div className="mb-3">
                <label className="form-label-vivant">New Date *</label>
                <input className="form-control-vivant" type="date" required
                  min={new Date().toISOString().split('T')[0]}
                  value={newDate} onChange={e => setNewDate(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="form-label-vivant">New Time *</label>
                <select className="form-control-vivant" required
                  value={newTime} onChange={e => setNewTime(e.target.value)}>
                  <option value="">Select time slot</option>
                  {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="d-flex gap-3">
                <button type="button" className="btn-gray-vivant" style={{flex:1}}
                  onClick={() => setRescheduleModal(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-vivant" style={{flex:1, textAlign:'center'}}
                  disabled={rescheduling}>
                  {rescheduling ? 'Saving...' : 'Confirm Reschedule →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}