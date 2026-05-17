import { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle mb-0">We're here to help. Reach out anytime.</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div className="row g-4 mb-5">
            {[
  { icon:<FaMapMarkerAlt size={24} color="#0a7c6e"/>, title:'Our Address',  info:'123 Health Street, Bandra West, Mumbai — 400050' },
  { icon:<FaPhone        size={24} color="#0a7c6e"/>, title:'Phone',        info:'+91 98765 43210 · Mon–Sat, 9am–7pm' },
  { icon:<FaEnvelope     size={24} color="#0a7c6e"/>, title:'Email',        info:'care@vivantcare.in' },
  { icon:<FaClock        size={24} color="#0a7c6e"/>, title:'Working Hours',info:'Mon–Sat: 9am–8pm · Sun: 10am–4pm' },
].map(c => (
  <div key={c.title} className="col-md-3 col-sm-6">
    <div className="contact-card">
      <div className="contact-icon">{c.icon}</div>
      <h6 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.5rem'}}>{c.title}</h6>
      <p style={{color:'#6b7280', fontSize:'0.875rem', margin:0}}>{c.info}</p>
    </div>
  </div>
))}
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="form-card">
                <h3 className="section-title text-start mb-1" style={{fontSize:'1.6rem'}}>Send us a Message</h3>
                <p style={{color:'#6b7280', marginBottom:'2rem', fontSize:'0.9rem'}}>We'll get back to you within 24 hours.</p>

                {sent ? (
                  <div style={{textAlign:'center', padding:'2rem'}}>
                    <div style={{fontSize:'3rem', marginBottom:'1rem'}}>✅</div>
                    <h5 style={{fontFamily:'Playfair Display,serif'}}>Message Sent!</h5>
                    <p style={{color:'#6b7280'}}>Thank you for reaching out. Our team will contact you soon.</p>
                    <button className="btn-primary-vivant mt-3" onClick={() => { setSent(false); setForm({name:'',email:'',subject:'',message:''}) }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label-vivant">Your Name *</label>
                        <input className="form-control-vivant" required placeholder="Rahul Kumar"
                          value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label-vivant">Email *</label>
                        <input className="form-control-vivant" type="email" required placeholder="rahul@example.com"
                          value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} />
                      </div>
                      <div className="col-12">
                        <label className="form-label-vivant">Subject</label>
                        <input className="form-control-vivant" placeholder="How can we help?"
                          value={form.subject} onChange={e => setForm(f=>({...f,subject:e.target.value}))} />
                      </div>
                      <div className="col-12">
                        <label className="form-label-vivant">Message *</label>
                        <textarea className="form-control-vivant" rows={4} required
                          placeholder="Write your message here..."
                          value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn-primary-vivant w-100" style={{textAlign:'center'}}>
                          Send Message →
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}