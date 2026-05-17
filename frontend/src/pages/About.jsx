import { FaHeartbeat, FaTrophy, FaMicroscope, FaUserMd, FaHospital, FaAward } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
export default function About() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="section-title">About VivantCare</h1>
          <p className="section-subtitle mb-0">Caring for India since 2008 — with trust, expertise, and heart.</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div style={{
                background: 'linear-gradient(135deg, #e6f4f2, #f0faf8)',
                borderRadius: 20, height: 380,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '8rem', boxShadow: '0 16px 50px rgba(10,124,110,0.12)'
              }}>🩺</div>
            </div>
            <div className="col-lg-6">
              <div className="hero-badge mb-3">Our Story</div>
              <h2 className="section-title text-start mb-3">Healing with Heart Since 2008</h2>
              <p style={{color:'#6b7280', lineHeight:1.8, marginBottom:'2rem'}}>
                VivantCare was founded with a single mission — to make quality healthcare accessible to every Indian. We started with a small clinic in Mumbai and have grown to a network of 50+ specialists across 10 cities.
              </p>
              {[
  { icon:<FaHeartbeat color="#0a7c6e"/>, title:"Patient-First Philosophy", desc:"Every decision we make is centered around patient comfort, safety, and outcomes." },
  { icon:<FaTrophy    color="#0a7c6e"/>, title:"Award-Winning Care",       desc:"Recognised as India's Top Healthcare Provider by the Ministry of Health, 2023." },
  { icon:<FaMicroscope color="#0a7c6e"/>,title:"Cutting-Edge Technology",  desc:"We invest in the latest medical technology to ensure accurate diagnoses." },
].map(({ icon, title, desc }) => (
  <div key={title} className="value-item">
    <div className="value-dot">{icon}</div>
    <div>
      <strong style={{color:'#0f1f1c'}}>{title}</strong>
      <p style={{color:'#6b7280', fontSize:'0.9rem', margin:0, marginTop:2}}>{desc}</p>
    </div>
  </div>
))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{background:'#f8fffe'}}>
        <div className="container text-center">
          <h2 className="section-title">Our Leadership Team</h2>
          <p className="section-subtitle">Visionary leaders committed to transforming healthcare in India.</p>
          <div className="row g-4 justify-content-center">
            {[
              {emoji:'👨‍⚕️', name:'Dr. Vikram Mehta',   role:'Founder & CEO',        desc:'30+ years in medicine, former AIIMS director.'},
              {emoji:'👩‍⚕️', name:'Dr. Ananya Singh',   role:'Chief Medical Officer', desc:'Harvard-trained physician, specialises in internal medicine.'},
              {emoji:'👨‍💼', name:'Mr. Rajesh Kumar',    role:'Chief Operating Officer',desc:'IIM Bangalore alumnus with 20 years in healthcare ops.'},
            ].map(p => (
              <div key={p.name} className="col-md-4">
                <div className="service-card text-center">
                  <div style={{fontSize:'4rem', marginBottom:'1rem'}}>{p.emoji}</div>
                  <h5 style={{fontFamily:'Playfair Display,serif'}}>{p.name}</h5>
                  <div style={{color:'var(--teal)', fontSize:'0.85rem', fontWeight:600, marginBottom:'0.5rem'}}>{p.role}</div>
                  <p style={{color:'#6b7280', fontSize:'0.875rem'}}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}