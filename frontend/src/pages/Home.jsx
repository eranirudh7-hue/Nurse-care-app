import { Link } from 'react-router-dom'
import {
  FaHeartbeat, FaBrain, FaBone, FaBaby,
  FaMicroscope, FaStethoscope, FaUserMd,
  FaAmbulance, FaClock, FaShieldAlt, FaStar, FaPhoneAlt
} from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

const SERVICES = [
  { icon: <FaHeartbeat size={24} color="#0a7c6e"/>, title:'Cardiology',       desc:'Expert heart care with advanced diagnostics and personalised treatment plans.' },
  { icon: <FaBrain     size={24} color="#0a7c6e"/>, title:'Neurology',        desc:'Comprehensive brain and nervous system care from specialist neurologists.' },
  { icon: <FaBone      size={24} color="#0a7c6e"/>, title:'Orthopedics',      desc:'Bone, joint, and muscle care including surgery and physiotherapy.' },
  { icon: <FaBaby      size={24} color="#0a7c6e"/>, title:'Pediatrics',       desc:'Dedicated care for infants, children, and adolescents.' },
  { icon: <FaMicroscope size={24} color="#0a7c6e"/>,title:'Diagnostics',      desc:'State-of-the-art lab and imaging services for accurate results.' },
  { icon: <FaStethoscope size={24} color="#0a7c6e"/>,title:'General Medicine',desc:'Holistic primary care for all ages, from routine checkups to illness.' },
]

const DOCTORS = [
  { emoji:'👨‍⚕️', name:'Dr. Arjun Sharma',  spec:'Cardiologist',  exp:'15 yrs', rating:4.9 },
  { emoji:'👩‍⚕️', name:'Dr. Priya Patel',   spec:'Neurologist',   exp:'12 yrs', rating:4.8 },
  { emoji:'👨‍⚕️', name:'Dr. Rohan Gupta',   spec:'Orthopedic',    exp:'10 yrs', rating:4.7 },
  { emoji:'👩‍⚕️', name:'Dr. Sneha Reddy',   spec:'Pediatrician',  exp:'8 yrs',  rating:4.9 },
]

const STEPS = [
  { icon:<FaUserMd size={28} color="#0a7c6e"/>,    step:'01', title:'Choose a Doctor',    desc:'Browse our specialists and pick the right doctor for your needs.' },
  { icon:<FaClock  size={28} color="#0a7c6e"/>,    step:'02', title:'Book a Slot',        desc:'Select your preferred date and time from available slots.' },
  { icon:<FaHeartbeat size={28} color="#0a7c6e"/>, step:'03', title:'Get Treated',        desc:'Visit the clinic and receive world-class medical care.' },
]

const TESTIMONIALS = [
  { name:'Ananya Sharma', text:'VivantCare helped me find the right cardiologist within minutes. Excellent service!', rating:5 },
  { name:'Rohan Mehta',   text:'Booking was super easy and the doctors are very professional. Highly recommend!',    rating:5 },
  { name:'Priya Nair',    text:'The pediatrician was so gentle with my child. We are very happy with the care.',     rating:5 },
]

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge fade-up">
                <MdVerified style={{marginRight:6, verticalAlign:'middle'}}/>
                Trusted Healthcare in India
              </div>
              <h1 className="hero-title fade-up delay-1">
                Your Health,<br />Our <span>Priority</span>
              </h1>
              <p className="hero-subtitle fade-up delay-2">
                VivantCare connects you with India's top specialists. Book appointments, get expert care, and take control of your health — all in one place.
              </p>

              {/* Trust badges */}
              <div className="d-flex gap-3 mb-4 flex-wrap fade-up delay-2">
                {[
                  [<FaShieldAlt color="#0a7c6e"/>, 'HIPAA Compliant'],
                  [<FaStar color="#c9a84c"/>,       '4.9 Rated'],
                  [<FaAmbulance color="#0a7c6e"/>,  '24/7 Support'],
                ].map(([icon, label]) => (
                  <div key={label} style={{
                    display:'flex', alignItems:'center', gap:6,
                    background:'white', borderRadius:20,
                    padding:'0.4rem 0.9rem', fontSize:'0.8rem',
                    fontWeight:600, color:'#374151',
                    boxShadow:'0 2px 10px rgba(0,0,0,0.06)'
                  }}>
                    {icon} {label}
                  </div>
                ))}
              </div>

              <div className="d-flex gap-3 flex-wrap fade-up delay-3">
                <Link to="/book"  className="btn-primary-vivant">Book Appointment →</Link>
                <Link to="/about" className="btn-outline-vivant">Learn More</Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image-wrapper">
                {/* Main illustration */}
                <div style={{
                  width:'100%', maxWidth:520, borderRadius:24,
                  background:'linear-gradient(135deg, #e6f4f2 0%, #f0faf8 100%)',
                  height:420, display:'flex', alignItems:'center',
                  justifyContent:'center', flexDirection:'column', gap:16,
                  boxShadow:'0 20px 60px rgba(10,124,110,0.15)',
                  position:'relative', overflow:'hidden'
                }}>
                  {/* Background pattern */}
                  <div style={{
                    position:'absolute', inset:0,
                    backgroundImage:'radial-gradient(circle, #0a7c6e18 1px, transparent 1px)',
                    backgroundSize:'24px 24px'
                  }}/>

                  {/* Center icon */}
                  <div style={{
                    width:120, height:120, borderRadius:'50%',
                    background:'white', display:'flex',
                    alignItems:'center', justifyContent:'center',
                    boxShadow:'0 8px 30px rgba(10,124,110,0.2)',
                    fontSize:'3.5rem', zIndex:1
                  }}>
                    🏥
                  </div>

                  {/* Floating medical icons */}
                  {[
                    { icon:'💊', top:'10%',  left:'10%'  },
                    { icon:'🩺', top:'10%',  right:'10%' },
                    { icon:'🩸', bottom:'15%', left:'10%' },
                    { icon:'💉', bottom:'15%', right:'10%'},
                    { icon:'🧬', top:'45%',  left:'5%'   },
                    { icon:'❤️', top:'45%',  right:'5%'  },
                  ].map((item, i) => (
                    <div key={i} style={{
                      position:'absolute',
                      top:item.top, left:item.left,
                      right:item.right, bottom:item.bottom,
                      width:52, height:52, borderRadius:14,
                      background:'white', display:'flex',
                      alignItems:'center', justifyContent:'center',
                      fontSize:'1.5rem', zIndex:1,
                      boxShadow:'0 4px 15px rgba(0,0,0,0.08)',
                      animation:`float${i%2===0?'A':'B'} 3s ease-in-out infinite`,
                      animationDelay:`${i*0.4}s`
                    }}>
                      {item.icon}
                    </div>
                  ))}
                </div>

                {/* Stat cards */}
                <div className="hero-stat-card card-1">
                  <div className="stat-icon"><FaUserMd color="#0a7c6e" size={20}/></div>
                  <div>
                    <div className="stat-num">200+</div>
                    <div className="stat-label">Specialist Doctors</div>
                  </div>
                </div>
                <div className="hero-stat-card card-2">
                  <div className="stat-icon"><FaHeartbeat color="#0a7c6e" size={20}/></div>
                  <div>
                    <div className="stat-num">50k+</div>
                    <div className="stat-label">Happy Patients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section-pad bg-white">
        <div className="container text-center">
          <h2 className="section-title">Our Specialities</h2>
          <p className="section-subtitle">World-class medical care across all major specialities, delivered with compassion.</p>
          <div className="row g-4">
            {SERVICES.map(s => (
              <div key={s.title} className="col-md-4 col-sm-6">
                <div className="service-card">
                  <div className="service-icon">{s.icon}</div>
                  <h5 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.5rem'}}>{s.title}</h5>
                  <p style={{color:'#6b7280', fontSize:'0.9rem', lineHeight:1.6}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="section-pad" style={{background:'#f8fffe'}}>
        <div className="container text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Book your appointment in 3 simple steps.</p>
          <div className="row g-4 justify-content-center">
            {STEPS.map((s, i) => (
              <div key={s.title} className="col-md-4">
                <div style={{position:'relative'}}>
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div style={{
                      position:'absolute', top:36, left:'60%',
                      width:'80%', height:2,
                      background:'linear-gradient(90deg, #0a7c6e44, transparent)',
                      zIndex:0
                    }}/>
                  )}
                  <div className="service-card" style={{position:'relative', zIndex:1}}>
                    <div style={{
                      width:72, height:72, borderRadius:'50%',
                      background:'var(--teal-light)',
                      display:'flex', alignItems:'center',
                      justifyContent:'center', margin:'0 auto 1rem',
                      position:'relative'
                    }}>
                      {s.icon}
                      <div style={{
                        position:'absolute', top:-8, right:-8,
                        width:26, height:26, borderRadius:'50%',
                        background:'var(--teal)', color:'white',
                        fontSize:'0.7rem', fontWeight:700,
                        display:'flex', alignItems:'center', justifyContent:'center'
                      }}>
                        {s.step}
                      </div>
                    </div>
                    <h5 style={{fontFamily:'Playfair Display,serif', marginBottom:'0.5rem'}}>{s.title}</h5>
                    <p style={{color:'#6b7280', fontSize:'0.875rem', lineHeight:1.6}}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctors ── */}
      <section className="section-pad bg-white">
        <div className="container text-center">
          <h2 className="section-title">Meet Our Doctors</h2>
          <p className="section-subtitle">Experienced, compassionate specialists dedicated to your wellbeing.</p>
          <div className="row g-4 justify-content-center">
            {DOCTORS.map(d => (
              <div key={d.name} className="col-lg-3 col-md-6">
                <div className="doctor-card">
                  <div className="doctor-img" style={{
                    background:'linear-gradient(135deg, #e6f4f2, #f0faf8)',
                    flexDirection:'column', gap:8
                  }}>
                    {d.emoji}
                    {/* Rating */}
                    <div style={{
                      background:'white', borderRadius:20,
                      padding:'0.2rem 0.6rem', fontSize:'0.75rem',
                      fontWeight:700, color:'#c9a84c',
                      display:'flex', alignItems:'center', gap:4
                    }}>
                      <FaStar size={10}/> {d.rating}
                    </div>
                  </div>
                  <div className="doctor-info">
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <div className="doctor-name">{d.name}</div>
                      <MdVerified color="#0a7c6e" size={16}/>
                    </div>
                    <div className="doctor-spec">{d.spec}</div>
                    <div style={{fontSize:'0.8rem', color:'#9ca3af', marginTop:4}}>
                      <FaClock size={10} style={{marginRight:4}}/>{d.exp} experience
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link to="/book" className="btn-primary-vivant">Book an Appointment →</Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-pad" style={{background:'#f8fffe'}}>
        <div className="container text-center">
          <h2 className="section-title">What Patients Say</h2>
          <p className="section-subtitle">Real stories from our happy patients.</p>
          <div className="row g-4 justify-content-center">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="col-md-4">
                <div className="service-card" style={{textAlign:'left'}}>
                  {/* Stars */}
                  <div className="d-flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} color="#c9a84c" size={14}/>
                    ))}
                  </div>
                  <p style={{color:'#374151', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'1.25rem'}}>
                    "{t.text}"
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <div style={{
                      width:36, height:36, borderRadius:'50%',
                      background:'var(--teal-light)',
                      display:'flex', alignItems:'center',
                      justifyContent:'center', fontSize:'1rem'
                    }}>👤</div>
                    <div>
                      <div style={{fontWeight:600, fontSize:'0.875rem', color:'#0f1f1c'}}>{t.name}</div>
                      <div style={{fontSize:'0.75rem', color:'#9ca3af'}}>Verified Patient</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{background:'var(--teal)', padding:'60px 0'}}>
        <div className="container text-center text-white">
          <h2 style={{fontFamily:'Playfair Display,serif', fontSize:'2rem', marginBottom:'1rem'}}>
            Ready to Take Control of Your Health?
          </h2>
          <p style={{opacity:0.85, marginBottom:'2rem', fontSize:'1rem'}}>
            Join 50,000+ patients who trust VivantCare for their healthcare needs.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/book" className="btn-primary-vivant" style={{background:'white', color:'var(--teal)'}}>
              Book Appointment →
            </Link>
            <a href="tel:+919876543210" className="btn-outline-vivant" style={{borderColor:'white', color:'white'}}>
              <FaPhoneAlt style={{marginRight:8}}/>Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section-pad" style={{background:'var(--dark)'}}>
        <div className="container">
          <div className="row text-center text-white g-4">
            {[
              [<FaUserMd   size={24}/>, '200+',   'Specialist Doctors'  ],
              [<FaHeartbeat size={24}/>, '50,000+','Patients Served'     ],
              [<FaClock    size={24}/>, '15+',    'Years of Care'       ],
              [<FaStar     size={24}/>, '4.9/5',  'Patient Rating'      ],
            ].map(([icon, num, label]) => (
              <div key={label} className="col-md-3 col-6">
                <div style={{
                  color:'var(--teal)', marginBottom:'0.75rem',
                  display:'flex', justifyContent:'center'
                }}>
                  {icon}
                </div>
                <div style={{fontSize:'2rem', fontFamily:'Playfair Display,serif', fontWeight:700}}>{num}</div>
                <div style={{opacity:0.6, fontSize:'0.875rem', marginTop:4}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}