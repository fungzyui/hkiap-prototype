import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpen, Calendar as CalendarIcon, Info, Mail, Menu, X, User, LogOut,
  ChevronRight, Download, CheckCircle, Bell, Shield, GraduationCap, Globe,
  Award, Users, Target, ArrowRight, Clock, ChevronDown, Phone, FileText, Upload, Check
} from 'lucide-react';
import './App.css';

const COURSES = [
  { id: 1, title: 'Strategic Leadership Programme', duration: '12 Weeks', format: 'Hybrid', fee: 'HK$ 15,000', description: 'Advanced leadership training for senior officers and organizational leaders.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', badge: 'Flagship' },
  { id: 2, title: 'Cyber Security & Forensics', duration: '8 Weeks', format: 'In-Person', fee: 'HK$ 12,000', description: 'Comprehensive training on modern cyber threats and digital evidence handling.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', badge: 'Popular' },
  { id: 3, title: 'Crisis Negotiation & Management', duration: '4 Weeks', format: 'In-Person', fee: 'HK$ 8,000', description: 'Specialized techniques for critical incident management and resolution.', image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800', badge: null },
  { id: 4, title: 'Public Order Management', duration: '6 Weeks', format: 'Hybrid', fee: 'HK$ 10,000', description: 'Strategic planning and operational tactics for large-scale public events.', image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=800', badge: 'New' },
];

const EVENTS = [
  { id: 1, title: 'Bauhinia International Forum', date: 'October 15, 2026', type: 'Conference', desc: 'Annual gathering of law enforcement leaders across Asia-Pacific.' },
  { id: 2, title: 'Annual Academy Open Day', date: 'November 2, 2026', type: 'Exhibition', desc: 'Explore HKIAP facilities and meet instructors.' }
];

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920',
    badge: 'Now Accepting Q3 2026 Applications',
    title: 'Shaping the Future of',
    highlight: 'Policing Excellence',
    subtitle: 'The Hong Kong International Academy of Policing delivers world-class training programmes for law enforcement leaders across the Asia-Pacific region.',
  },
  {
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920',
    badge: 'Cyber Security & Digital Forensics',
    title: 'Defending the',
    highlight: 'Digital Frontier',
    subtitle: 'Master cutting-edge cyber investigation techniques and digital evidence handling with our internationally accredited programme.',
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920',
    badge: 'Strategic Leadership Programme',
    title: "Developing Tomorrow's",
    highlight: 'Leaders Today',
    subtitle: 'A 12-week hybrid programme designed for senior officers seeking to enhance their strategic command and organizational leadership capabilities.',
  },
];

const STATS = [
  { value: 17, suffix: '', label: 'Hallmark Programmes' },
  { value: 2500, suffix: '+', label: 'Alumni Network' },
  { value: 30, suffix: '+', label: 'Partner Nations' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

const CONTACT_COUNTRIES = [
  { code: 'SG', name: 'Singapore', office: 'Singapore Police Academy Office', phone: '+65 6465 3333' },
  { code: 'HK', name: 'Hong Kong SAR', office: 'Hong Kong Police College', phone: '+852 2814 4299' },
  { code: 'CN', name: 'Mainland China', office: 'People\'s Public Security University', phone: '+86 10 8390 1111' },
  { code: 'JP', name: 'Japan', office: 'National Police Academy Japan', phone: '+81 42 369 6111' },
  { code: 'KR', name: 'South Korea', office: 'Korean National Police University', phone: '+82 41 536 2114' },
  { code: 'AU', name: 'Australia', office: 'Australian Institute of Police Management', phone: '+61 2 9932 2000' },
  { code: 'NZ', name: 'New Zealand', office: 'Royal New Zealand Police College', phone: '+64 4 238 3000' },
  { code: 'MY', name: 'Malaysia', office: 'Royal Malaysia Police College', phone: '+60 3 9205 2222' },
  { code: 'TH', name: 'Thailand', office: 'Royal Thai Police Cadet Academy', phone: '+66 34 312 0099' },
  { code: 'ID', name: 'Indonesia', office: 'Indonesian National Police Academy', phone: '+62 21 829 5611' }
];

/* ===== ANIMATED COUNTER HOOK ===== */
function useCountUp(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
}

/* ===== INTERSECTION OBSERVER HOOK ===== */
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.2, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

/* ===== STAT ITEM ===== */
function StatItem({ value, suffix, label, startCounting }) {
  const count = useCountUp(value, 1800, startCounting);
  return (
    <div className="stat-item text-center px-6 py-2">
      <p className="text-4xl sm:text-5xl font-display font-bold text-gradient-gold tracking-tight">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-gold-300/60 text-sm mt-2 font-medium tracking-wider uppercase">{label}</p>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [applications, setApplications] = useState([]);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const navItems = [
    { key: 'about', label: 'About Us' },
    { key: 'courses', label: 'Programmes' },
    { key: 'events', label: 'Events' },
    { key: 'contact', label: 'Contact' },
  ];

  /* ===== NAVBAR ===== */
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-glass shadow-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('home')}>
            <div className="w-10 h-10 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center justify-center mr-3 group-hover:bg-gold-500/30 transition-all">
              <BookOpen className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-white tracking-wider block leading-tight">HKIAP</span>
              <span className="text-[10px] text-gold-400/70 tracking-[0.2em] uppercase">International Academy</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button key={item.key} onClick={() => navigate(item.key)}
                className={`nav-link px-4 py-2 text-sm font-medium tracking-wide transition-colors ${activeTab === item.key ? 'text-gold-400' : 'text-white/70 hover:text-white'}`}>
                {item.label}
              </button>
            ))}
            <div className="ml-6 pl-6 border-l border-white/10">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate('portal')} className="flex items-center gap-2 glass text-xs text-gold-300 px-4 py-2 rounded-full hover:bg-white/10 transition-all font-semibold tracking-wide">
                    <User className="w-4 h-4" /> My Portal
                  </button>
                  <button onClick={() => { setIsLoggedIn(false); navigate('home'); }} className="text-white/40 hover:text-red-400 transition" title="Logout"><LogOut className="w-4 h-4" /></button>
                </div>
              ) : (
                <button onClick={() => navigate('registration')}
                  className="btn-gold bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-gold">
                  Login / Apply
                </button>
              )}
            </div>
          </div>

          <button className="md:hidden text-white/80" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden nav-glass border-t border-white/5 px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item, i) => (
            <button key={item.key} onClick={() => navigate(item.key)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all animate-fade-in-up opacity-0`}
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards', color: activeTab === item.key ? '#C9A96E' : 'rgba(255,255,255,0.7)' }}>
              {item.label}
            </button>
          ))}
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate('portal')} className="block w-full text-center mt-3 bg-navy-800 text-gold-400 font-bold py-3 rounded-lg animate-fade-in-up opacity-0" style={{ animationDelay: '320ms', animationFillMode: 'forwards' }}>
                My Portal
              </button>
              <button onClick={() => { setIsLoggedIn(false); navigate('home'); }} className="block w-full text-center mt-2 text-red-400 font-semibold py-2 rounded-lg animate-fade-in-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate('registration')}
              className="block w-full text-center mt-3 bg-gold-500 text-navy-950 font-bold py-3 rounded-lg animate-fade-in-up opacity-0"
              style={{ animationDelay: '320ms', animationFillMode: 'forwards' }}>
              Login / Apply
            </button>
          )}
        </div>
      )}
    </nav>
  );

  const PopupBanner = () => {
    if (!showBanner) return null;
    return (
      <div className="fixed top-20 left-0 right-0 z-40 animate-fade-in-up">
        <div className="bg-navy-800/95 backdrop-blur-md border-b border-gold-500/20 px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-gold-400 rounded-full mr-3 animate-shimmer" />
            <p className="font-body text-sm text-white/80">
              <span className="text-gold-400 font-semibold">What's New:</span> Applications open for Q3 2026 Strategic Leadership Programme.
              <button onClick={() => navigate('courses')} className="ml-2 text-gold-400 underline underline-offset-2 hover:text-gold-300 font-semibold">View Course →</button>
            </p>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-white/40 hover:text-white/80 transition ml-4"><X className="h-4 w-4" /></button>
        </div>
      </div>
    );
  };

  const ContactModal = () => {
    const [selectedCountry, setSelectedCountry] = useState(CONTACT_COUNTRIES[0]);

    if (!showContactModal) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden animate-scale-in">
          <button onClick={() => setShowContactModal(false)} className="absolute top-4 right-4 text-navy-300 hover:text-navy-600 transition"><X className="w-5 h-5" /></button>
          <div className="p-8 text-center">
            <div className="mx-auto bg-navy-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border border-navy-100">
              <Phone className="w-7 h-7 text-navy-600" />
            </div>
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">Enrollment</h3>
            <p className="text-navy-500 font-body text-sm mb-4 leading-relaxed">
              If you are interested in this programme, please contact:
            </p>
            
            <div className="text-left mb-6">
              <label className="block text-xs font-semibold text-navy-600 mb-2 tracking-wide uppercase">Select Region</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-ivory-50 border border-ivory-300 text-navy-900 text-sm rounded-lg focus:ring-gold-500 focus:border-gold-500 block p-3 pr-10 font-medium transition-all"
                  value={selectedCountry.code}
                  onChange={(e) => setSelectedCountry(CONTACT_COUNTRIES.find(c => c.code === e.target.value))}
                >
                  {CONTACT_COUNTRIES.map(country => (
                    <option key={country.code} value={country.code}>{country.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-navy-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="bg-ivory-100 border border-ivory-300 p-4 rounded-xl text-left bg-gradient-to-br from-ivory-50 to-ivory-100 shadow-inner">
              <p className="font-bold text-navy-800 text-sm animate-fade-in" key={selectedCountry.code + '-office'}>{selectedCountry.office}</p>
              <p className="text-navy-600 mt-1.5 flex items-center text-sm font-medium animate-fade-in" key={selectedCountry.code + '-phone'}>
                <Phone className="w-4 h-4 mr-2 text-gold-500" /> {selectedCountry.phone}
              </p>
            </div>
            <button onClick={() => setShowContactModal(false)} className="mt-8 w-full bg-navy-900 text-white py-3 rounded-lg hover:bg-gold-500 hover:text-navy-950 transition-all font-semibold">Close</button>
          </div>
        </div>
      </div>
    );
  };

  /* ===== HOME PAGE ===== */
  const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [statsRef, statsInView] = useInView();
    const [missionRef, missionInView] = useInView();
    const [coursesRef, coursesInView] = useInView();
    const [eventsRef, eventsInView] = useInView();

    useEffect(() => {
      const timer = setInterval(() => goToSlide((currentSlide + 1) % HERO_SLIDES.length), 6000);
      return () => clearInterval(timer);
    }, [currentSlide]);

    const goToSlide = (i) => { if (isTransitioning) return; setIsTransitioning(true); setCurrentSlide(i); setTimeout(() => setIsTransitioning(false), 700); };

    return (
      <div>
        {/* HERO */}
        <div className="hero-section relative bg-navy-950 flex items-center">
          {HERO_SLIDES.map((s, i) => (
            <img key={i} src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out" style={{ opacity: i === currentSlide ? 1 : 0, zIndex: 1 }} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-900/85 to-navy-800/60 z-[2]" />
          {/* Decorative diagonal lines */}
          <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(201,169,110,1) 80px, rgba(201,169,110,1) 81px)' }} />

          <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-28">
            <div className="max-w-2xl">
              <div key={`b-${currentSlide}`} className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
                <span className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-[0.15em] uppercase mb-8">
                  <span className="w-8 h-[1px] bg-gold-500" />
                  {HERO_SLIDES[currentSlide].badge}
                </span>
              </div>
              <h1 key={`t-${currentSlide}`} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] animate-fade-in-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                {HERO_SLIDES[currentSlide].title}<br />
                <span className="text-gradient-gold">{HERO_SLIDES[currentSlide].highlight}</span>
              </h1>
              <p key={`s-${currentSlide}`} className="text-lg text-white/60 mb-10 leading-relaxed max-w-xl font-body animate-fade-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                {HERO_SLIDES[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                <button onClick={() => navigate('courses')} className="btn-gold bg-gold-500 hover:bg-gold-400 text-navy-950 text-base px-8 py-4 rounded-lg font-bold transition-all shadow-gold-lg flex items-center justify-center group">
                  Explore Programmes <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigate('about')} className="border border-white/20 hover:border-gold-500/40 text-white/90 text-base px-8 py-4 rounded-lg font-medium transition-all hover:bg-white/5 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button onClick={() => goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition" aria-label="Previous">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <button onClick={() => goToSlide((currentSlide + 1) % HERO_SLIDES.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-[4] flex gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => goToSlide(i)}
                className={`rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-gold-400 w-8 h-2.5' : 'bg-white/20 hover:bg-white/40 w-2.5 h-2.5'}`} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* STATS */}
        <div ref={statsRef} className="bg-mesh-dark noise-overlay relative">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s, i) => <StatItem key={i} {...s} startCounting={statsInView} />)}
            </div>
          </div>
        </div>

        {/* MISSION */}
        <div ref={missionRef} className="bg-ivory relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className={`text-center mb-16 transition-all duration-700 ${missionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-gold-600 font-semibold text-xs tracking-[0.2em] uppercase">Our Foundation</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 mt-3">Mission & Values</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 mx-auto mt-5" />
              <p className="text-navy-400 mt-5 max-w-2xl mx-auto font-body text-lg">Committed to excellence in every dimension of law enforcement education.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { icon: Shield, title: 'Professional Integrity', desc: 'Upholding the highest ethical standards in policing through rigorous professional development.', num: '01', color: 'navy' },
                { icon: Globe, title: 'International Perspective', desc: 'Fostering cross-border collaboration and knowledge exchange among law enforcement agencies.', num: '02', color: 'gold' },
                { icon: Target, title: 'Operational Excellence', desc: 'Equipping officers with cutting-edge skills to address evolving security challenges.', num: '03', color: 'navy' },
              ].map((item, i) => (
                <div key={i} className={`relative text-center p-8 rounded-2xl bg-white border border-ivory-300 hover:border-gold-200 transition-all duration-500 group hover:shadow-card-hover ${missionInView ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}>
                  <span className="section-number">{item.num}</span>
                  <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all ${item.color === 'gold' ? 'bg-gold-100 group-hover:bg-gold-200' : 'bg-navy-50 group-hover:bg-navy-100'}`}>
                    <item.icon className={`w-7 h-7 ${item.color === 'gold' ? 'text-gold-700' : 'text-navy-600'}`} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                  <p className="text-navy-400 text-sm leading-relaxed font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COURSES */}
        <div ref={coursesRef} className="bg-ivory-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4 transition-all duration-700 ${coursesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div>
                <span className="text-gold-600 font-semibold text-xs tracking-[0.2em] uppercase">Academy Prospectus</span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 mt-3">Featured Programmes</h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 mt-5" />
              </div>
              <button onClick={() => navigate('courses')} className="text-navy-600 hover:text-gold-600 font-semibold flex items-center text-sm group bg-white px-5 py-2.5 rounded-lg border border-ivory-300 hover:border-gold-300 transition-all shadow-sm">
                View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COURSES.map((course, i) => (
                <div key={course.id} className={`card-premium bg-white rounded-2xl overflow-hidden border border-ivory-300 ${coursesInView ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}>
                  <div className="h-48 relative overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                    {course.badge && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase bg-gold-500/90 text-navy-950 px-2.5 py-1 rounded-md backdrop-blur-sm">{course.badge}</span>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <span className="text-white/90 font-semibold text-xs bg-navy-900/60 px-2.5 py-1 rounded backdrop-blur-sm">{course.format}</span>
                      <span className="text-white/60 text-xs flex items-center"><Clock className="w-3 h-3 mr-1" /> {course.duration}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold text-navy-900 mb-2 leading-snug">{course.title}</h3>
                    <p className="text-navy-400 text-sm mb-4 line-clamp-2 leading-relaxed font-body">{course.description}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-ivory-200">
                      <span className="text-gold-700 font-bold text-sm font-display">{course.fee}</span>
                      <button onClick={() => navigate('registration')} className="text-xs bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950 px-4 py-2 rounded-lg font-semibold transition-all">Apply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EVENTS */}
        <div ref={eventsRef} className="bg-ivory relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-700 ${eventsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="text-gold-600 font-semibold text-xs tracking-[0.2em] uppercase">What's Coming</span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 mt-3 mb-3">Upcoming Events</h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 mb-10" />
                <div className="space-y-5 timeline-line pl-2">
                  {EVENTS.map((event, i) => (
                    <div key={event.id} onClick={() => navigate('events')}
                      className={`flex items-start gap-5 p-5 rounded-xl bg-white border border-ivory-300 hover:border-gold-300 hover:shadow-card transition-all cursor-pointer group ${eventsInView ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`}
                      style={{ animationDelay: `${i * 150 + 200}ms`, animationFillMode: 'forwards' }}>
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-navy-50 flex items-center justify-center group-hover:bg-gold-100 transition-all relative z-10">
                        <CalendarIcon className="w-6 h-6 text-navy-600 group-hover:text-gold-700 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-gold-600 uppercase tracking-[0.15em]">{event.type}</span>
                        <h3 className="font-display text-lg font-bold text-navy-900 mt-0.5">{event.title}</h3>
                        <p className="text-navy-400 text-sm mt-1 flex items-center font-body"><Clock className="w-3.5 h-3.5 mr-1.5 text-gold-500" /> {event.date}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-ivory-300 group-hover:text-gold-500 transition mt-4 flex-shrink-0" />
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate('events')} className="mt-8 text-navy-600 hover:text-gold-600 font-semibold flex items-center text-sm group">
                  View Full Calendar <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className={`relative transition-all duration-700 delay-200 ${eventsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="absolute -inset-4 bg-gradient-to-br from-gold-200/40 to-navy-100/30 rounded-3xl -z-10" />
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="Conference" className="rounded-2xl w-full h-80 object-cover shadow-navy" />
                <div className="absolute -bottom-5 -left-5 bg-navy-900 text-white font-display font-bold px-6 py-4 rounded-xl shadow-navy-lg text-sm border border-navy-700">
                  <GraduationCap className="w-5 h-5 inline mr-2 text-gold-400" /> Next: Oct 15, 2026
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-mesh-navy noise-overlay relative overflow-hidden">
          <div className="absolute inset-0 z-[1] opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(201,169,110,1) 60px, rgba(201,169,110,1) 61px)' }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <span className="text-gold-400 font-semibold text-xs tracking-[0.2em] uppercase">Take the Next Step</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-4 mb-5">Ready to Advance Your Career?</h2>
            <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto font-body">Join hundreds of law enforcement leaders who have transformed their careers through our internationally recognised programmes.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('registration')} className="btn-gold bg-gold-500 hover:bg-gold-400 text-navy-950 text-lg px-10 py-4 rounded-lg font-bold transition-all shadow-gold-lg flex items-center justify-center group">
                Apply Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('contact')} className="border border-white/15 hover:border-gold-500/30 text-white/80 text-lg px-10 py-4 rounded-lg font-medium transition-all hover:bg-white/5">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ===== REGISTRATION PAGE ===== */
  const RegistrationPage = () => {
    const [formData, setFormData] = useState({ surname: '', firstName: '', organization: '', postHeld: '', email: '', telephone: '', selectedCourse: COURSES[0].title });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleLogin = (e) => { e.preventDefault(); setIsLoggedIn(true); };
    const handleApplicationSubmit = (e) => {
      e.preventDefault();
      setApplications([...applications, { ...formData, id: Date.now(), submissionDate: new Date().toLocaleDateString() }]);
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setFormData({ ...formData, surname: '', firstName: '', email: '', telephone: '' }); }, 3000);
    };
    const exportToCSV = () => {
      if (!applications.length) { alert("No applications to export yet."); return; }
      const headers = ['ID', 'Date', 'Surname', 'First Name', 'Organization', 'Post Held', 'Email', 'Telephone', 'Course'];
      const rows = [headers.join(','), ...applications.map(a => [a.id, `"${a.submissionDate}"`, `"${a.surname}"`, `"${a.firstName}"`, `"${a.organization}"`, `"${a.postHeld}"`, `"${a.email}"`, `"${a.telephone}"`, `"${a.selectedCourse}"`].join(','))];
      const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.setAttribute('hidden', ''); a.setAttribute('href', url); a.setAttribute('download', 'applications_export.csv'); document.body.appendChild(a); a.click(); document.body.removeChild(a);
    };

    if (!isLoggedIn) {
      return (
        <div className="min-h-screen bg-ivory flex items-center justify-center pt-20 pb-16 px-4">
          <div className="max-w-md w-full animate-fade-in-up">
            <div className="bg-white p-10 rounded-2xl shadow-card border border-ivory-300">
              <div className="text-center mb-8">
                <div className="mx-auto bg-navy-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-5">
                  <User className="w-7 h-7 text-navy-600" />
                </div>
                <h2 className="font-display text-2xl font-bold text-navy-900">Applicant Login</h2>
                <p className="text-navy-400 mt-2 text-sm font-body">Login to access registration and application functions.</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5 tracking-wide uppercase">Username / ID</label>
                  <input type="text" required className="form-input w-full px-4 py-3 rounded-lg text-sm" placeholder="Enter ID" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy-600 mb-1.5 tracking-wide uppercase">Password</label>
                  <input type="password" required className="form-input w-full px-4 py-3 rounded-lg text-sm" placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full btn-gold bg-navy-900 hover:bg-navy-800 text-white font-bold py-3.5 rounded-lg transition-all shadow-navy mt-4 text-sm tracking-wide">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-ivory pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-ivory-300">
            <div className="bg-mesh-navy noise-overlay relative px-8 py-7 flex justify-between items-center">
              <div className="relative z-10">
                <h2 className="font-display text-2xl font-bold text-white">Course Registration</h2>
                <p className="text-white/40 text-sm mt-1 font-body">Fill in your details. Data is CSV compatible.</p>
              </div>
              <div className="relative z-10 glass p-3 rounded-xl flex flex-col items-center cursor-pointer hover:bg-white/10 transition" onClick={exportToCSV} title="Export CSV">
                <Download className="w-5 h-5 text-gold-400 mb-1" />
                <span className="text-[10px] font-semibold text-white/60">Export</span>
              </div>
            </div>
            {isSubmitted ? (
              <div className="p-16 text-center animate-scale-in">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h3 className="font-display text-3xl font-bold text-navy-900 mb-2">Application Submitted</h3>
                <p className="text-navy-400 mb-8 font-body">Successfully recorded and grouped to specific folder.</p>
                <button onClick={() => setIsSubmitted(false)} className="bg-navy-50 text-navy-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-100 transition text-sm">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="p-8">
                <div className="mb-8 pb-6 border-b border-ivory-200">
                  <label className="block text-xs font-semibold text-navy-600 mb-2 tracking-wide uppercase">Select Programme</label>
                  <select value={formData.selectedCourse} onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value })}
                    className="form-input w-full px-4 py-3 rounded-lg text-sm font-medium text-navy-800">
                    {COURSES.map(c => <option key={c.id} value={c.title}>{c.title} ({c.format})</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Surname', key: 'surname', type: 'text' },
                    { label: 'First Name', key: 'firstName', type: 'text' },
                    { label: 'Organization', key: 'organization', type: 'text', ph: 'e.g. Police Bureau / Major Formation' },
                    { label: 'Post Held', key: 'postHeld', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email' },
                    { label: 'Telephone', key: 'telephone', type: 'tel' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-navy-600 mb-1.5 tracking-wide uppercase">{f.label}</label>
                      <input required type={f.type} value={formData[f.key]} onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                        className="form-input w-full px-4 py-3 rounded-lg text-sm" placeholder={f.ph || ''} />
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-navy-300 max-w-md font-body">By submitting, you agree to Academy Prospectus terms. Data processed for course placement.</p>
                  <button type="submit" className="btn-gold bg-gold-500 hover:bg-gold-400 text-navy-950 px-8 py-3.5 rounded-lg font-bold text-base shadow-gold transition-all flex-shrink-0">Submit Application</button>
                </div>
              </form>
            )}
          </div>
          {applications.length > 0 && (
            <div className="mt-10 bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-lg font-bold text-navy-800">Admin View <span className="text-xs font-body text-navy-300 ml-1">(Prototype)</span></h3>
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">{applications.length} Received</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-navy-400">
                  <thead className="text-[10px] text-navy-600 uppercase tracking-wider bg-ivory-100">
                    <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Org & Post</th><th className="px-4 py-3">Course</th></tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id} className="bg-white border-b border-ivory-200">
                        <td className="px-4 py-3 font-medium text-navy-800">{app.surname}, {app.firstName}</td>
                        <td className="px-4 py-3">{app.organization} — {app.postHeld}</td>
                        <td className="px-4 py-3">{app.selectedCourse}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ===== PORTAL PAGE ===== */
  const PortalPage = () => {
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
    const fileInputRef = useRef(null);

    useEffect(() => {
      if (!isLoggedIn) navigate('registration');
    }, [isLoggedIn]);

    const handleUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setUploadStatus('uploading');
      // Simulate network request
      setTimeout(() => setUploadStatus('success'), 1500);
    };

    if (!isLoggedIn) return null;

    return (
      <div className="min-h-screen bg-ivory pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <div className="flex items-center mb-8 pb-6 border-b border-ivory-300">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mr-4">
              <User className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-navy-900">Student Portal</h1>
              <p className="text-navy-500 mt-1 text-sm font-body">Welcome back. Manage your applications, documents, and course materials here.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* CURRENT PROGRAMME */}
              <div className="bg-white rounded-2xl shadow-sm border border-ivory-300 overflow-hidden">
                <div className="bg-navy-900 px-6 py-4 flex justify-between items-center">
                  <h3 className="font-display font-bold text-white text-lg">Enrolled Programmes</h3>
                  <span className="bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30 line-clamp-1">Active</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <img src={COURSES[0].image} alt="Course" className="w-full sm:w-32 h-24 object-cover rounded-lg border border-ivory-200" />
                    <div>
                      <h4 className="font-display font-bold text-navy-900 text-lg">{COURSES[0].title}</h4>
                      <p className="text-navy-500 text-sm mt-1">{COURSES[0].format} • {COURSES[0].duration}</p>
                      <div className="mt-3 flex gap-2">
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-semibold border border-green-200">Admitted</span>
                        <span className="text-xs bg-navy-50 text-navy-600 px-2 py-1 rounded font-semibold border border-navy-200">Starts Q3 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* COURSE MATERIALS */}
              <div className="bg-white rounded-2xl shadow-sm border border-ivory-300 overflow-hidden">
                <div className="px-6 py-5 border-b border-ivory-200 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-navy-500" />
                  <h3 className="font-display font-bold text-navy-900 text-lg">Course Materials</h3>
                </div>
                <div className="divide-y divide-ivory-200">
                  {[
                    { title: "Pre-course Reading materials", size: "2.4 MB", type: "PDF", date: "Oct 1, 2026" },
                    { title: "Orientation Guide & Schedule", size: "1.1 MB", type: "PDF", date: "Sep 28, 2026" },
                    { title: "Academy Handbook 2026", size: "5.7 MB", type: "PDF", date: "Sep 15, 2026" },
                  ].map((doc, i) => (
                    <div key={i} className="p-4 hover:bg-ivory-50 transition-colors flex items-center justify-between group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-navy-800 group-hover:text-gold-600 transition-colors">{doc.title}</h4>
                          <p className="text-xs text-navy-400 mt-0.5">{doc.type} • {doc.size} • Uploaded {doc.date}</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full border border-ivory-300 flex items-center justify-center text-navy-400 hover:text-gold-600 hover:border-gold-300 transition-all bg-white" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
               {/* DOCUMENT UPLOAD */}
               <div className="bg-white rounded-2xl shadow-sm border border-ivory-300 overflow-hidden">
                <div className="px-6 py-5 border-b border-ivory-200">
                  <h3 className="font-display font-bold text-navy-900 text-lg">Identity Verification</h3>
                  <p className="text-xs text-navy-500 mt-1">Upload required documents for vetting</p>
                </div>
                <div className="p-6">
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-sm font-semibold text-navy-800">Personal Identity Document</span>
                       <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100">Required</span>
                    </div>
                    <p className="text-xs text-navy-400 leading-relaxed mb-4">
                      Please upload a copy of your valid passport or HKID. Max size: 10MB. Formats: PDF, JPG, PNG.
                    </p>
                    
                    {uploadStatus === 'success' ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-green-800">Document Uploaded</p>
                          <p className="text-xs text-green-600 mt-0.5">Undergoing verification process</p>
                        </div>
                        <button onClick={() => setUploadStatus('idle')} className="ml-auto text-xs font-semibold text-green-700 underline underline-offset-2">Replace</button>
                      </div>
                    ) : (
                      <label className={`block border-2 border-dashed ${uploadStatus === 'uploading' ? 'border-navy-400 bg-navy-50' : 'border-ivory-300 bg-ivory-50 hover:bg-ivory-100 hover:border-gold-300'} rounded-xl p-6 text-center cursor-pointer transition-colors relative`}>
                        <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept=".pdf,.jpg,.jpeg,.png" disabled={uploadStatus === 'uploading'} />
                        {uploadStatus === 'uploading' ? (
                           <div className="flex flex-col items-center justify-center">
                             <div className="w-8 h-8 border-2 border-navy-200 border-t-navy-600 rounded-full animate-spin mb-3"></div>
                             <p className="text-sm font-bold text-navy-700">Uploading securely...</p>
                           </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-ivory-200 flex items-center justify-center mx-auto mb-3">
                              <Upload className="w-5 h-5 text-navy-500" />
                            </div>
                            <p className="text-sm font-bold text-navy-700">Click to browse or drag file here</p>
                            <p className="text-xs text-navy-400 mt-1">Encrypted & secure storage</p>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                </div>
               </div>

               {/* PROFILE INFO */}
               <div className="bg-navy-950 rounded-2xl shadow-sm border border-navy-800 overflow-hidden relative">
                <div className="absolute inset-0 bg-mesh-dark noise-overlay opacity-30 pointer-events-none" />
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                      <User className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">John Doe</h3>
                      <p className="text-gold-400/80 text-xs tracking-wider uppercase">ID: APP-26-8092</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-1">Organization</p>
                      <p className="text-white/90 text-sm">International Police Force</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-1">Email</p>
                      <p className="text-white/90 text-sm">john.doe@ipf.gov</p>
                    </div>
                  </div>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ===== GENERIC PAGE ===== */
  const GenericPage = ({ title, icon: Icon, children }) => (
    <div className="min-h-screen bg-ivory pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 animate-fade-in-up">
        <div className="flex items-center mb-10 pb-6 border-b border-ivory-300">
          <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center mr-4">
            <Icon className="w-6 h-6 text-navy-600" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-navy-900">{title}</h1>
            <div className="w-12 h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 mt-2" />
          </div>
        </div>
        <div className="text-navy-500 font-body">{children}</div>
      </div>
    </div>
  );

  /* ===== RENDER ===== */
  return (
    <div className="min-h-screen bg-ivory font-body flex flex-col">
      <Navbar />
      {showBanner && activeTab === 'home' && <PopupBanner />}
      <ContactModal />

      <main className="flex-grow">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'registration' && <RegistrationPage />}
        {activeTab === 'portal' && <PortalPage />}

        {activeTab === 'courses' && (
          <GenericPage title="Academy Prospectus & Courses" icon={BookOpen}>
            <p className="mb-10 text-lg">Browse our 17 hallmark programmes designed for various specializations.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COURSES.map((course, i) => (
                <div key={course.id} className="card-premium bg-white rounded-2xl border border-ivory-300 flex flex-col overflow-hidden animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}>
                  <div className="h-52 relative overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  </div>
                  <div className="p-7 flex flex-col flex-grow">
                    <h3 className="font-display text-xl font-bold text-navy-900 mb-2">{course.title}</h3>
                    <p className="text-navy-400 flex-grow mb-5 font-body">{course.description}</p>
                    <div className="bg-ivory-100 p-4 rounded-xl mb-5 grid grid-cols-3 gap-3 text-sm">
                      <div><span className="font-semibold block text-navy-600 text-xs uppercase tracking-wider">Duration</span><span className="text-navy-800">{course.duration}</span></div>
                      <div><span className="font-semibold block text-navy-600 text-xs uppercase tracking-wider">Format</span><span className="text-navy-800">{course.format}</span></div>
                      <div><span className="font-semibold block text-navy-600 text-xs uppercase tracking-wider">Fee</span><span className="text-gold-700 font-bold">{course.fee}</span></div>
                    </div>
                    <button onClick={() => setShowContactModal(true)} className="bg-navy-900 text-white py-3 rounded-lg hover:bg-gold-500 hover:text-navy-950 transition-all shadow-sm font-semibold text-sm">Enroll</button>
                  </div>
                </div>
              ))}
            </div>
          </GenericPage>
        )}

        {activeTab === 'events' && (
          <GenericPage title="Events Calendar" icon={CalendarIcon}>
            <div className="space-y-5">
              {EVENTS.map(event => (
                <div key={event.id} className="bg-white p-7 rounded-2xl border border-ivory-300 border-l-4 border-l-gold-500 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-card transition-all">
                  <div>
                    <span className="text-[10px] font-bold text-gold-600 uppercase tracking-[0.15em]">{event.type}</span>
                    <h3 className="font-display text-xl font-bold text-navy-900 mt-1">{event.title}</h3>
                    <p className="text-navy-400 mt-1 flex items-center text-sm font-body"><CalendarIcon className="w-4 h-4 mr-2 text-gold-500" /> {event.date}</p>
                  </div>
                  <button onClick={() => navigate('registration')} className="border border-navy-900 text-navy-900 px-5 py-2.5 rounded-lg hover:bg-navy-900 hover:text-white transition-all text-sm font-semibold flex-shrink-0">Register</button>
                </div>
              ))}
            </div>
          </GenericPage>
        )}

        {activeTab === 'about' && (
          <GenericPage title="About HKIAP" icon={Info}>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 text-lg leading-relaxed">
                <p className="mb-5">The Hong Kong International Academy of Policing (HKIAP) serves as a premier institution for the development of law enforcement leadership and specialized skills.</p>
                <p className="mb-5">Our rigorous curriculum addresses modern security challenges, equipping professionals with deep regional knowledge combined with international best practices.</p>
                <button onClick={() => navigate('courses')} className="mt-4 btn-gold bg-navy-900 hover:bg-navy-800 text-white font-semibold py-3 px-7 rounded-lg transition-all shadow-navy text-sm">View Prospectus</button>
              </div>
              <div className="flex-1 relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-gold-200/30 to-navy-100/20 rounded-3xl" />
                <img src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=800" alt="Training" className="relative rounded-2xl shadow-navy w-full object-cover h-72 border border-ivory-300" />
              </div>
            </div>
          </GenericPage>
        )}

        {activeTab === 'contact' && (
          <GenericPage title="Contact Us" icon={Mail}>
            <div className="bg-white p-8 rounded-2xl border border-ivory-300 max-w-2xl shadow-sm">
              <h3 className="font-display text-xl font-bold text-navy-900 mb-5">Get in Touch</h3>
              <div className="space-y-3 text-base">
                <p><span className="font-semibold text-navy-700">Contact Name:</span> SP ML</p>
                <p><span className="font-semibold text-navy-700">Telephone:</span> +852 2860 XXXX</p>
                <p><span className="font-semibold text-navy-700">Email:</span> <a href="#" className="text-gold-600 hover:text-gold-700 underline underline-offset-2">enquiries@hkiap.gov.hk</a></p>
              </div>
            </div>
          </GenericPage>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-mesh-dark noise-overlay relative">
        <div className="divider-gold" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/25 flex items-center justify-center mr-2.5">
                <BookOpen className="h-4 w-4 text-gold-400" />
              </div>
              <span className="font-display font-bold text-lg text-white">HKIAP</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed font-body">Hong Kong International Academy<br />Phase One Web Portal</p>
          </div>
          <div>
            <h4 className="text-gold-400 font-display font-bold text-sm tracking-wider uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => navigate('courses')} className="text-white/40 hover:text-gold-400 transition font-body">Academy Prospectus</button></li>
              <li><button onClick={() => navigate('events')} className="text-white/40 hover:text-gold-400 transition font-body">Events Calendar</button></li>
              <li><button onClick={() => navigate('registration')} className="text-white/40 hover:text-gold-400 transition font-body">Online Application</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold-400 font-display font-bold text-sm tracking-wider uppercase mb-5">Contact</h4>
            <p className="text-sm flex items-center text-white/40 font-body"><Mail className="w-4 h-4 mr-2 text-gold-500/60" /> admin@hkiap.gov.hk</p>
          </div>
        </div>
        <div className="divider-gold" />
        <div className="relative z-10 text-center py-6 text-white/20 text-xs font-body tracking-wide">
          © 2026 Hong Kong International Academy of Policing. All rights reserved.
        </div>
      </footer>
    </div>
  );
}