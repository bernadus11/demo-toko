import React, { useState, useEffect, useRef } from 'react'

/* ================================================================
   DATA
================================================================ */
const slides = [
  {
    label: 'New Collection',
    title: 'Style Simpel,\nEveryday.',
    desc: 'Koleksi pakaian premium dengan desain minimalis dan kualitas terbaik untuk menunjang gaya harianmu.',
    bg: '#e8e0d5', imgBg: '#c9bdb1',
    img: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Exclusive Drop',
    title: 'Clean Lines,\nBold Soul.',
    desc: 'Temukan koleksi eksklusif dengan potongan modern yang cocok untuk berbagai kesempatan.',
    bg: '#dde4db', imgBg: '#b8c8b5',
    img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Summer 2025',
    title: 'Light &\nUnforgettable.',
    desc: 'Koleksi musim panas kami hadir dengan warna-warna segar dan bahan yang ringan dan nyaman.',
    bg: '#e4ddd3', imgBg: '#c8bdb0',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
]

const categories = [
  { name: 'Celana Panjang', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', bg: '#f0ece7' },
  { name: 'Celana Pendek', img: '/assets/short-chino.jpeg', bg: '#ece9e4' },
  { name: 'Kemeja Lengan Panjang', img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', bg: '#f0ece7' },
  { name: 'Kemeja Lengan Pendek', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', bg: '#ece9e4' },
  { name: 'Kaos / T-Shirt', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', bg: '#f0ece7' },
]

const products = [
  { id: 1, name: 'Loose Fit Pants', price: 199000, originalPrice: null, badge: 'BEST SELLER', badgeType: 'black', rating: 4.8, reviews: 120, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', imgBg: '#1a1a1a' },
  { id: 2, name: 'Basic Chino Shorts', price: 144500, originalPrice: 170000, badge: '-15%', badgeType: 'red', rating: 4.7, reviews: 98, img: '/assets/short-chino.jpeg', imgBg: '#e8e0d5' },
  { id: 3, name: 'Oxford Long Sleeve Shirt', price: 219000, originalPrice: null, badge: 'BEST SELLER', badgeType: 'black', rating: 4.9, reviews: 76, img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', imgBg: '#3a3a3a' },
  { id: 4, name: 'Relax Short Sleeve Shirt', price: 179100, originalPrice: 199000, badge: '-10%', badgeType: 'red', rating: 4.6, reviews: 54, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', imgBg: '#ddd5c8' },
  { id: 5, name: 'Essential Oversize Tee', price: 129000, originalPrice: null, badge: 'BEST SELLER', badgeType: 'black', rating: 4.8, reviews: 201, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', imgBg: '#222222' },
  { id: 6, name: 'Slim Chino Pants', price: 189000, originalPrice: 220000, badge: '-14%', badgeType: 'red', rating: 4.7, reviews: 88, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', imgBg: '#c8b89a' },
]

const navLinks = ['Beranda', 'Shop', 'Koleksi', 'New Arrivals', 'Promo', 'Tentang Kami']
const avatars = ['https://i.pravatar.cc/32?img=11', 'https://i.pravatar.cc/32?img=12', 'https://i.pravatar.cc/32?img=13']
const formatIDR = (n) => 'Rp' + n.toLocaleString('id-ID')

/* ================================================================
   SHARED STYLES
================================================================ */
const C = {
  container: {
    width: '100%', maxWidth: '1280px',
    marginLeft: 'auto', marginRight: 'auto',
    paddingLeft: '20px', paddingRight: '20px',
  },
  btn: {
    backgroundColor: '#000', color: '#fff', border: 'none',
    cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase',
    transition: 'background-color 0.15s',
  },
  btnOutline: {
    backgroundColor: 'transparent', color: '#000', border: '2px solid #000',
    cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'all 0.15s',
  },
}

/* ================================================================
   GLOBAL STYLES
================================================================ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root {
      font-family: 'Outfit', 'Segoe UI', sans-serif;
      background: #fff; color: #111;
      overflow-x: hidden; width: 100%;
    }
    ::-webkit-scrollbar { display: none; }
    * { -ms-overflow-style: none; scrollbar-width: none; }

    /* Scroll reveal */
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }

    /* Navbar */
    @media (min-width: 768px) {
      #hamburger-btn { display: none !important; }
      #desktop-nav { display: flex !important; }
      #hero-img-wrap { display: flex !important; }
    }
    @media (max-width: 767px) {
      #hamburger-btn { display: flex !important; }
      #desktop-nav { display: none !important; }
      #hero-img-wrap { display: none !important; }
      #promo-img { width: 120px !important; min-height: 160px !important; }
    }

    /* Feature grid 4-col on desktop */
    @media (min-width: 768px) {
      #feature-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 0 !important; }
      #feature-grid > div { padding: 0 28px; border-right: 1px solid #f3f4f6; }
      #feature-grid > div:first-child { padding-left: 0; }
      #feature-grid > div:last-child { padding-right: 0; border-right: none; }
    }

    /* Category center on desktop */
    @media (min-width: 640px) {
      #cat-row { justify-content: center !important; min-width: unset !important; }
    }

    /* Promo row on desktop */
    @media (min-width: 640px) {
      #promo-wrap { flex-direction: row !important; }
      #promo-img { min-height: unset !important; }
    }

    /* Footer grid */
    @media (min-width: 768px) {
      #footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
    }

    /* Footer bottom bar */
    @media (min-width: 640px) {
      #footer-bottom { flex-direction: row !important; }
    }

    /* Toast */
    #toast {
      position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(80px);
      background: #000; color: #fff; padding: 12px 24px; border-radius: 4px;
      font-size: 13px; font-weight: 600; letter-spacing: 0.03em;
      z-index: 9999; transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.35s ease;
      opacity: 0; white-space: nowrap; pointer-events: none;
    }
    #toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

    /* Back to top */
    #back-to-top {
      position: fixed; bottom: 28px; right: 24px;
      width: 42px; height: 42px; background: #000; color: #fff;
      border: none; border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transform: translateY(12px);
      transition: opacity 0.3s, transform 0.3s;
      z-index: 999;
    }
    #back-to-top.visible { opacity: 1; transform: translateY(0); }
    #back-to-top:hover { background: #333; }

    /* Navbar shadow on scroll */
    #main-nav { transition: box-shadow 0.3s; }
    #main-nav.scrolled { box-shadow: 0 2px 16px rgba(0,0,0,0.08); }

    /* Category hover scale */
    .cat-btn:hover .cat-img { transform: scale(1.08); }
    .cat-img { transition: transform 0.4s ease; }

    /* Product card */
    .product-wishlist {
      position: absolute; top: 10px; right: 10px;
      width: 30px; height: 30px; background: rgba(255,255,255,0.9);
      border: none; border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.2s, transform 0.2s;
      z-index: 2;
    }
    .product-card-wrap:hover .product-wishlist { opacity: 1; }
    .product-wishlist.liked svg { fill: #ef4444; stroke: #ef4444; }
    .product-wishlist:hover { transform: scale(1.15); }

    /* Footer link hover */
    .footer-link { transition: color 0.15s; cursor: pointer; }
    .footer-link:hover { color: #fff !important; }

    /* Input focus */
    .footer-input:focus { outline: none; border-color: #fff !important; }

    /* Payment icons */
    .payment-icon {
      background: #1e1e1e; border: 1px solid #333;
      border-radius: 4px; padding: 4px 10px;
      font-size: 11px; font-weight: 700; color: #ccc;
      letter-spacing: 0.05em;
    }
  `}</style>
)

/* ================================================================
   HOOKS
================================================================ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}

function useToast() {
  const show = (msg) => {
    let el = document.getElementById('toast')
    if (!el) return
    el.textContent = msg
    el.classList.add('show')
    setTimeout(() => el.classList.remove('show'), 2500)
  }
  return show
}

/* ================================================================
   TOP BAR
================================================================ */
function TopBar() {
  return (
    <div style={{ backgroundColor: '#111', color: '#fff' }}>
      <div style={C.container}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', paddingBottom: '10px', fontSize: '11px', letterSpacing: '0.06em' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ opacity: 0.7, flexShrink: 0 }}>
              <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span style={{ color: '#ccc' }}>Gratis Ongkir untuk semua pesanan!</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#aaa', cursor: 'pointer' }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
              <span>Dukungan 24/7</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#aaa', cursor: 'pointer' }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              <span>Lacak Pesanan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   NAVBAR
================================================================ */
function Navbar() {
  const [active, setActive] = useState('Beranda')
  const [cartCount, setCartCount] = useState(2)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = document.getElementById('main-nav')
    const handleScroll = () => {
      if (!nav) return
      nav.classList.toggle('scrolled', window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav id="main-nav" style={{ backgroundColor: '#fff', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={C.container}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <button id="hamburger-btn" onClick={() => setMenuOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} aria-label="Menu">
            {menuOpen
              ? <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            }
          </button>

          <span style={{ fontWeight: 900, letterSpacing: '0.22em', fontSize: '1.05rem', color: '#000', userSelect: 'none' }}>URBAN.CO</span>

          <ul id="desktop-nav" style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '28px', margin: 0, padding: 0 }}>
            {navLinks.map(link => (
              <li key={link}>
                <button onClick={() => setActive(link)} style={{ background: 'none', border: 'none', borderBottom: active === link ? '2px solid #000' : '2px solid transparent', color: active === link ? '#000' : '#6b7280', fontSize: '13px', fontWeight: 500, cursor: 'pointer', paddingBottom: '2px', fontFamily: 'inherit', letterSpacing: '0.02em', transition: 'color 0.15s' }}>
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000', padding: '4px', display: 'flex' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000', padding: '4px', display: 'flex' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </button>
            <button onClick={() => setCartCount(c => c + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000', padding: '4px', display: 'flex', position: 'relative' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#000', color: '#fff', fontSize: '9px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div style={{ borderTop: '1px solid #f3f4f6', backgroundColor: '#fff' }}>
          <div style={{ ...C.container, paddingTop: '8px', paddingBottom: '8px' }}>
            {navLinks.map(link => (
              <button key={link} onClick={() => { setActive(link); setMenuOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', background: active === link ? '#f9fafb' : 'none', border: 'none', color: active === link ? '#000' : '#4b5563', fontSize: '14px', fontWeight: active === link ? 600 : 400, cursor: 'pointer', padding: '10px 8px', borderRadius: '6px', fontFamily: 'inherit' }}>
                {link}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

/* ================================================================
   HERO
================================================================ */
function Hero() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => { setCurrent(p => (p + 1) % slides.length); setFade(true) }, 300)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const goTo = (i) => {
    if (i === current) return
    setFade(false)
    setTimeout(() => { setCurrent(i); setFade(true) }, 200)
  }

  const slide = slides[current]

  return (
    <section style={{ backgroundColor: slide.bg, transition: 'background-color 0.7s ease', position: 'relative', overflow: 'hidden' }}>
      <div style={C.container}>
        <div style={{ display: 'flex', alignItems: 'center', minHeight: '480px', paddingTop: '48px', paddingBottom: '64px', gap: '32px' }}>
          <div style={{ flex: 1, opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease', zIndex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: '#6b7280', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              {slide.label}
            </span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#000', lineHeight: 1.1, marginBottom: '20px', whiteSpace: 'pre-line' }}>
              {slide.title}
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '320px' }}>
              {slide.desc}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button style={{ ...C.btn, padding: '12px 28px', fontSize: '11px' }}>SHOP NOW</button>
              <button style={{ ...C.btnOutline, padding: '10px 24px', fontSize: '11px' }}>LIHAT KOLEKSI</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex' }}>
                {avatars.map((src, i) => (
                  <div key={i} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid #fff', overflow: 'hidden', backgroundColor: '#d1d5db', marginLeft: i > 0 ? '-8px' : 0 }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 900, color: '#000', margin: 0 }}>10K+</p>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>Pelanggan Puas</p>
              </div>
            </div>
          </div>

          <div id="hero-img-wrap" style={{ flexShrink: 0, width: '360px', height: '460px', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: slide.imgBg, overflow: 'hidden', opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease' }}>
              <img key={current} src={slide.img} alt="Model" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} onError={e => { e.target.style.display = 'none' }} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '9999px', backgroundColor: i === current ? '#000' : '#9ca3af', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </section>
  )
}

/* ================================================================
   FEATURE BAR
================================================================ */
const featureItems = [
  { title: 'Gratis Ongkir', desc: 'Untuk semua pesanan', icon: <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { title: 'Kualitas Premium', desc: 'Bahan pilihan terbaik dan nyaman', icon: <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg> },
  { title: 'Gratis Retur', desc: 'Retur mudah dan tanpa ribet', icon: <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> },
  { title: 'Customer Support', desc: 'Layanan 24/7 siap membantu kamu', icon: <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}><path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg> },
]

function FeatureBar() {
  return (
    <section className="reveal" style={{ borderTop: '1px solid #f3f4f6', backgroundColor: '#fff', paddingTop: '40px', paddingBottom: '40px' }}>
      <div style={C.container}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }} id="feature-grid">
          {featureItems.map((f, i) => (
            <div key={f.title} className={`reveal reveal-delay-${i + 1}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ color: '#000', opacity: 0.75, flexShrink: 0 }}>{f.icon}</div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#000', marginBottom: '3px' }}>{f.title}</h4>
                <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   CATEGORY SECTION
================================================================ */
function CategorySection() {
  return (
    <section style={{ backgroundColor: '#fff', paddingTop: '56px', paddingBottom: '56px' }}>
      <div style={C.container}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Kategori</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: '#000', margin: 0 }}>Pilih Kategori Favoritmu</h2>
        </div>
        <div style={{ overflowX: 'auto', marginBottom: '36px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', paddingBottom: '4px', minWidth: 'max-content' }} id="cat-row">
            {categories.map((cat, i) => (
              <button key={cat.name} className={`cat-btn reveal reveal-delay-${Math.min(i + 1, 4)}`} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', fontFamily: 'inherit', flexShrink: 0 }}>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', overflow: 'hidden', backgroundColor: cat.bg, border: '2px solid transparent', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <img src={cat.img} alt={cat.name} className="cat-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.4, maxWidth: '84px' }}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="reveal" style={{ textAlign: 'center' }}>
          <button style={{ ...C.btn, padding: '14px 0', fontSize: '11px', width: '100%', maxWidth: '300px' }}>LIHAT SEMUA PRODUK</button>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   BEST SELLER
================================================================ */
function ProductCard({ product }) {
  const [hov, setHov] = useState(false)
  const [liked, setLiked] = useState(false)
  const showToast = useToast()

  const handleAddCart = (e) => {
    e.stopPropagation()
    showToast(`✓ ${product.name} ditambahkan ke keranjang`)
  }

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(l => !l)
    showToast(liked ? 'Dihapus dari wishlist' : '♥ Ditambahkan ke wishlist')
  }

  return (
    <div className="product-card-wrap" style={{ flexShrink: 0, width: '180px', cursor: 'pointer', position: 'relative' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', marginBottom: '12px', backgroundColor: product.imgBg }}>
        {product.badge && (
          <span style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: product.badgeType === 'red' ? '#ef4444' : '#000', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', zIndex: 1, letterSpacing: '0.05em' }}>
            {product.badge}
          </span>
        )}
        {/* Wishlist button */}
        <button className={`product-wishlist ${liked ? 'liked' : ''}`} onClick={handleLike}>
          <svg width="14" height="14" fill={liked ? '#ef4444' : 'none'} viewBox="0 0 24 24" stroke={liked ? '#ef4444' : '#000'} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} onError={e => { e.target.style.display = 'none' }} />
        <div onClick={handleAddCart} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#000', color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textAlign: 'center', padding: '10px', transform: hov ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
          + TAMBAH KE KERANJANG
        </div>
      </div>
      <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#000', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        {product.originalPrice ? (
          <>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ef4444' }}>{formatIDR(product.price)}</span>
            <span style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through' }}>{formatIDR(product.originalPrice)}</span>
          </>
        ) : (
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#000' }}>{formatIDR(product.price)}</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <svg style={{ width: '12px', height: '12px', fill: '#facc15', flexShrink: 0 }} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{product.rating} ({product.reviews})</span>
      </div>
    </div>
  )
}

function BestSeller() {
  const scrollRef = useRef(null)
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir === 'left' ? -220 : 220, behavior: 'smooth' })
  return (
    <section style={{ backgroundColor: '#fff', borderTop: '1px solid #f9fafb', paddingTop: '56px', paddingBottom: '56px' }}>
      <div style={C.container}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Best Seller</span>
            <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 900, color: '#000', margin: 0 }}>Produk Terlaris</h2>
          </div>
          <a href="#" style={{ fontSize: '13px', fontWeight: 600, color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>Lihat Semua <span>→</span></a>
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => scroll('left')} style={{ position: 'absolute', left: '-18px', top: '40%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div ref={scrollRef} style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '8px', paddingLeft: '4px', paddingRight: '4px', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <button onClick={() => scroll('right')} style={{ position: 'absolute', right: '-18px', top: '40%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   PROMO BANNER
================================================================ */
function PromoBanner() {
  const [copied, setCopied] = useState(false)
  const showToast = useToast()
  const handleCopy = () => {
    navigator.clipboard?.writeText('URBAN10').catch(() => {})
    setCopied(true)
    showToast('Kode URBAN10 berhasil disalin!')
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section style={{ backgroundColor: '#fff', paddingTop: '16px', paddingBottom: '56px' }}>
      <div style={C.container}>
        <div className="reveal" style={{ display: 'flex', overflow: 'hidden', backgroundColor: '#f5f1ec', border: '1px solid #f3f4f6' }} id="promo-wrap">
          <div style={{ width: '220px', flexShrink: 0, backgroundColor: '#c4b8a8', position: 'relative', overflow: 'hidden', minHeight: '200px' }} id="promo-img">
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Promo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} onError={e => { e.target.style.display = 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: '#000', opacity: 0.1 }} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: '32px 40px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', fontWeight: 900, color: '#000', lineHeight: 1.3, margin: '0 0 16px 0' }}>
                Dapatkan Diskon 10%<br />Untuk Pembelian Pertamamu!
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Gunakan kode voucher:</span>
                <button onClick={handleCopy} style={{ backgroundColor: '#fff', color: copied ? '#16a34a' : '#000', fontSize: '13px', fontWeight: 800, padding: '6px 20px', letterSpacing: '0.15em', border: '1px solid #d1d5db', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                  {copied ? '✓ TERSALIN!' : 'URBAN10'}
                </button>
              </div>
            </div>
            <button style={{ ...C.btn, padding: '12px 32px', fontSize: '11px', flexShrink: 0 }}>BELANJA SEKARANG</button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   FOOTER
================================================================ */
const footerLinks = {
  'Belanja': ['Pria', 'Wanita', 'Aksesoris', 'Sale', 'New Arrivals'],
  'Bantuan': ['Lacak Pesanan', 'Pengembalian', 'FAQ', 'Ukuran & Panduan', 'Hubungi Kami'],
  'Perusahaan': ['Tentang Kami', 'Karir', 'Blog', 'Kebijakan Privasi', 'Syarat & Ketentuan'],
}

const socialLinks = [
  { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { name: 'TikTok', path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  { name: 'WhatsApp', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
]

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const showToast = useToast()

  const handleSubscribe = () => {
    if (!email.includes('@')) { showToast('Masukkan email yang valid'); return }
    setSubscribed(true)
    showToast('🎉 Terima kasih sudah subscribe!')
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer style={{ backgroundColor: '#0f0f0f', color: '#fff', paddingTop: '64px', paddingBottom: '0' }}>
      <div style={C.container}>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', paddingBottom: '48px', borderBottom: '1px solid #1e1e1e' }} id="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ fontWeight: 900, letterSpacing: '0.22em', fontSize: '1.2rem', color: '#fff', marginBottom: '16px' }}>URBAN.CO</div>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8, maxWidth: '280px', marginBottom: '24px' }}>
              Pakaian premium dengan desain minimalis untuk gaya hidup modern. Dibuat dengan bahan pilihan, dirancang untuk kenyamanan sehari-hari.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map(s => (
                <a key={s.name} href="#" aria-label={s.name} style={{ width: '36px', height: '36px', backgroundColor: '#1e1e1e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#333' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1e1e1e' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#aaa"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>{title}</h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer-link" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ paddingTop: '40px', paddingBottom: '40px', borderBottom: '1px solid #1e1e1e' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Subscribe & Dapatkan Promo Eksklusif</h4>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Daftarkan email kamu dan dapatkan penawaran terbaik setiap minggu.</p>
            </div>
            <div style={{ display: 'flex', gap: '0', flex: '1', maxWidth: '420px', minWidth: '240px' }}>
              <input
                className="footer-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                placeholder="Masukkan email kamu..."
                style={{ flex: 1, padding: '11px 16px', fontSize: '13px', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', borderRight: 'none', color: '#fff', fontFamily: 'inherit', outline: 'none' }}
              />
              <button onClick={handleSubscribe} style={{ ...C.btn, padding: '11px 20px', fontSize: '11px', flexShrink: 0, backgroundColor: subscribed ? '#16a34a' : '#fff', color: subscribed ? '#fff' : '#000', transition: 'all 0.2s' }}>
                {subscribed ? '✓ OK!' : 'SUBSCRIBE'}
              </button>
            </div>
          </div>
        </div>

        {/* App download */}
        <div style={{ paddingTop: '32px', paddingBottom: '32px', borderBottom: '1px solid #1e1e1e', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
           <h1 className="font-bold text-xl shadow-lg">Nikmati belanja aman dan nyaman - <span className="text-orange-600 cursor-pointer">Urban.Co</span></h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: '#4b5563' }}>PEMBAYARAN:</span>
            {['VISA', 'Mastercard', 'GoPay', 'OVO', 'DANA', 'COD'].map(p => (
              <span key={p} className="payment-icon">{p}</span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div id="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '20px', paddingBottom: '20px' }}>
          <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>
            © 2025 URBAN.CO. Hak Cipta Dilindungi.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Kebijakan Privasi', 'Syarat & Ketentuan', 'Cookie'].map(link => (
              <a key={link} href="#" className="footer-link" style={{ fontSize: '12px', color: '#4b5563', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

/* ================================================================
   FLOATING UI — Toast + Back to Top
================================================================ */
function FloatingUI() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Toast notification */}
      <div id="toast" />

      {/* Back to top */}
      <button
        id="back-to-top"
        className={showTop ? 'visible' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </>
  )
}

/* ================================================================
   APP
================================================================ */
function App() {
  useScrollReveal()

  return (
    <>
      <GlobalStyles />
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <FeatureBar />
        <CategorySection />
        <BestSeller />
        <PromoBanner />
      </main>
      <Footer />
      <FloatingUI />
    </>
  )
}

export default App