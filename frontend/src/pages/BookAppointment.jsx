import { useState } from 'react'
import axios from 'axios'
import emailjs from '@emailjs/browser'


const DOCTORS = [
  { name: 'Sharma',  dept: 'General Medicine' },
  { name: 'Patel',   dept: 'Cardiology'       },
  { name: 'Gupta',   dept: 'Orthopedics'      },
  { name: 'Reddy',   dept: 'Pediatrics'       },
  { name: 'Verma',   dept: 'Dermatology'      },
  { name: 'Singh',   dept: 'Neurology'        },
]

const TIMES = [
  '9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM'
]

export default function BookAppointment() {
  const [form, setForm] = useState({
    patient_name:'', patient_age:'', email:'', phone:'',
    doctor:'', department:'', appointment_date:'',
    appointment_time:'', symptoms:''
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [result,  setResult]  = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'doctor') {
      const sel = DOCTORS.find(d => d.name === value)
      setForm(f => ({ ...f, doctor: value, department: sel?.dept || '' }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Step 1: Save to backend
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/appointments`, {
        ...form, patient_age: parseInt(form.patient_age)
      })

      // Step 2: Send confirmation email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          patient_name:       form.patient_name,
          email:              form.email,
          doctor:             form.doctor,
          department:         form.department,
          appointment_date:   form.appointment_date,
          appointment_time:   form.appointment_time,
          confirmation_message: res.data.confirmation_message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setResult(res.data)

    } catch {
      setError('Booking failed. Please check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="confirm-wrap">
        <div className="confirm-card">
          <div className="check-circle">✓</div>
          <h2 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.5rem'}}>Appointment Confirmed!</h2>
          <p style={{color:'#6b7280', fontSize:'0.9rem'}}>Your booking has been successfully registered.</p>

          {/* Email notice */}
          <div style={{
            background:'#f0fdf4', border:'1px solid #bbf7d0',
            borderRadius:10, padding:'0.75rem 1rem',
            fontSize:'0.85rem', color:'#16a34a', marginTop:'1rem'
          }}>
            📧 Confirmation email sent to <strong>{form.email}</strong>
          </div>

          <div className="ai-msg-box">
            <div style={{fontSize:'0.75rem', fontWeight:700, color:'var(--teal)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem'}}>
              Message from VivantCare
            </div>
            {result.confirmation_message}
          </div>
          <div style={{background:'#f9fafb', borderRadius:10, padding:'1rem', marginBottom:'1.5rem'}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem', color:'#374151'}}>
              <span>Appointment ID</span>
              <strong>#{result.appointment_id.slice(0,8).toUpperCase()}</strong>
            </div>
            <div style={{borderTop:'1px solid #e5e7eb', marginTop:'0.75rem', paddingTop:'0.75rem', fontSize:'0.8rem', color:'#9ca3af'}}>
              Please arrive 10 minutes early with a valid photo ID.
            </div>
          </div>
          <button className="btn-primary-vivant w-100"
            onClick={() => { setResult(null); setForm({patient_name:'',patient_age:'',email:'',phone:'',doctor:'',department:'',appointment_date:'',appointment_time:'',symptoms:''}) }}>
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  const F = 'form-control-vivant'
  const L = 'form-label-vivant'

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="section-title">Book an Appointment</h1>
          <p className="section-subtitle mb-0">Fill in your details and we'll confirm your slot instantly.</p>
        </div>
      </div>

      <section className="form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="form-card">
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="logo-icon">✚</div>
                  <div>
                    <h3 style={{fontFamily:'Playfair Display,serif', margin:0}}>Patient Information</h3>
                    <p style={{color:'#6b7280', margin:0, fontSize:'0.875rem'}}>All fields marked * are required</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className={L}>Full Name *</label>
                      <input className={F} name="patient_name" required placeholder="Rahul Kumar"
                        value={form.patient_name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className={L}>Age *</label>
                      <input className={F} name="patient_age" type="number" required
                        placeholder="28" min="1" max="120"
                        value={form.patient_age} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className={L}>Email Address *</label>
                      <input className={F} name="email" type="email" required
                        placeholder="rahul@example.com"
                        value={form.email} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className={L}>Phone Number</label>
                      <input className={F} name="phone" type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone} onChange={handleChange} />
                    </div>

                    <div className="col-12 mt-2">
                      <div style={{borderTop:'1px solid #e5e7eb', paddingTop:'1.5rem', marginBottom:'0.5rem'}}>
                        <p style={{fontSize:'0.75rem', fontWeight:700, color:'var(--teal)', textTransform:'uppercase', letterSpacing:'0.08em', margin:0}}>
                          Appointment Details
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className={L}>Choose Doctor *</label>
                      <select className={F} name="doctor" required
                        value={form.doctor} onChange={handleChange}>
                        <option value="">Select a doctor</option>
                        {DOCTORS.map(d => (
                          <option key={d.name} value={d.name}>Dr. {d.name} — {d.dept}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className={L}>Department</label>
                      <input className={F} style={{background:'#f3f4f6', color:'#9ca3af', cursor:'not-allowed'}}
                        readOnly value={form.department} placeholder="Auto-filled on doctor selection" />
                    </div>
                    <div className="col-md-6">
                      <label className={L}>Preferred Date *</label>
                      <input className={F} name="appointment_date" type="date" required
                        min={new Date().toISOString().split('T')[0]}
                        value={form.appointment_date} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className={L}>Preferred Time *</label>
                      <select className={F} name="appointment_time" required
                        value={form.appointment_time} onChange={handleChange}>
                        <option value="">Select time slot</option>
                        {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className={L}>Describe Your Symptoms</label>
                      <textarea className={F} name="symptoms" rows={3}
                        placeholder="e.g. Fever for 2 days, mild headache, fatigue..."
                        value={form.symptoms} onChange={handleChange} />
                    </div>

                    {error && (
                      <div className="col-12">
                        <div style={{background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', borderRadius:10, padding:'0.75rem 1rem', fontSize:'0.9rem'}}>
                          {error}
                        </div>
                      </div>
                    )}

                    <div className="col-12">
                      <button type="submit" disabled={loading}
                        className="btn-primary-vivant w-100"
                        style={{opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer', textAlign:'center'}}>
                        {loading ? '⏳ Confirming your appointment...' : 'Confirm Appointment →'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}