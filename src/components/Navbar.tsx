'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { 
    label: 'About', 
    href: '/about', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    children: [
      { label: 'About Conference', href: '/about' },
      { label: 'About AIET', href: '/about#aiet' },
    ]
  },
  { 
    label: 'Tracks', 
    href: '/tracks', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" /></svg> 
  },
  { 
    label: 'Publication', 
    href: '/publication', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>,
    children: [
      { label: 'Publication Info', href: '/publication' },
      { label: 'Review Process', href: '/publication#review' },
    ]
  },
  {
    label: 'For Authors',
    href: '/for-authors',
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.14l-2.81.936.935-2.81a4.5 4.5 0 011.14-1.89l12.656-12.657zm0 0L19.5 7.125" /></svg>,
    children: [
      { label: 'Call for Papers', href: '/for-authors#call-for-papers' },
      { label: 'Important Dates', href: '/important-dates' },
      { label: 'Downloads', href: '/for-authors#downloads' },
    ],
  },
  { 
    label: 'Committees', 
    href: '/committees', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    children: [
      { label: 'Leadership', href: '/committees#leadership' },
      { label: 'Advisory Board', href: '/committees#international' },
      { label: 'Editorial Board', href: '/committees#editorial' },
    ]
  },
  { 
    label: 'Speakers', 
    href: '/speakers', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg> 
  },
  { 
    label: 'Venue & Contact', 
    href: '/venue-contact', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> 
  },
  { 
    label: 'Programme', 
    href: '/programme', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg> 
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    
    const checkReg = () => setIsRegistered(localStorage.getItem('isRegistered') === 'true');
    checkReg();
    window.addEventListener('registrationStatusChanged', checkReg);

    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('registrationStatusChanged', checkReg);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('registeredName');
    window.dispatchEvent(new Event('registrationStatusChanged'));
  };

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ─── Top Info Bar ─── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-[46px] opacity-100'
        }`}
        style={{ background: '#0a192f' }}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 lg:px-6 flex items-center justify-between py-2">
          {/* Left: date + location */}
          <div className="flex items-center gap-4 text-[11px] md:text-[12px]">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              16–17 September 2027
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-white/50 border-l border-white/20 pl-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Hybrid Mode | Moodbidri, Karnataka, India
            </span>
          </div>

          {/* Right: social + url */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-3">
              <a href="mailto:icmems2027@gmail.com" className="text-teal-400 hover:text-white transition-colors" title="Email">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              </a>
              <a href="#" className="text-teal-400 hover:text-white transition-colors" title="LinkedIn">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="text-teal-400 hover:text-white transition-colors" title="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
            <span className="text-white/60 text-[11px] md:text-[12px] hidden md:block border-l border-white/20 pl-4 tracking-wide">
              aiet.org.in/icmems2027
            </span>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Bar ─── */}
      <nav
        className={`relative transition-all duration-300 w-full overflow-visible ${
          scrolled ? 'shadow-2xl' : ''
        }`}
        style={{
          background: `linear-gradient(90deg, rgba(3,11,26,1) 0%, rgba(8,28,58,0.95) 40%, rgba(3,11,26,0.9) 100%), url('/Alvas.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
        aria-label="Main navigation"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#030a17] via-[#051426] to-[#030a17] opacity-90 mix-blend-multiply pointer-events-none" />

        <div className="w-full mx-auto px-4 lg:px-6 relative z-10 2xl:max-w-none">
          <div className="flex items-center justify-between h-[60px] xl:h-[72px]">
            
            {/* Logo + Branding */}
            <Link href="/" className="flex items-center gap-2 group shrink-0 mr-1 xl:mr-3">
              <img
                src="/alvaslogo.png"
                alt="AIET Logo"
                className="h-9 xl:h-11 w-auto object-contain rounded-sm"
              />
              <div className="hidden sm:block border-l border-white/10 pl-2">
                <div className="flex items-center gap-1 font-bold text-[14px] xl:text-[15px] tracking-tight leading-none group-hover:text-blue-200 transition-colors">
                  <span className="text-white">IC-MEMS</span>
                  <span className="text-teal-400">2027</span>
                </div>
                <div className="text-white/40 text-[11px] font-medium tracking-wide mt-1 leading-none">
                  AIET, Moodbidri
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden xl:flex items-center gap-0 2xl:gap-1 justify-center flex-1">
              {navLinks.map((link) => {
                const getClasses = () => {
                  if (isActive(link.href)) {
                    return 'bg-[#0f2a4a] text-white rounded-xl border border-teal-500/20 shadow-[inset_0_-2px_0_rgba(45,212,191,1),0_5px_15px_rgba(45,212,191,0.25)]';
                  }
                  return 'text-white/60 hover:text-white hover:bg-white/5 rounded-xl';
                };

                return link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 ${getClasses()} text-[12.5px] 2xl:text-[13px] font-medium transition-all duration-300 whitespace-nowrap`}
                    >
                      {link.icon}
                      {link.label}
                      <svg className="w-3 h-3 ml-0.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 pt-2 w-52 z-50">
                        <div className="bg-[#050f20] border border-white/10 rounded-xl shadow-2xl py-1.5 backdrop-blur-xl">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-[13px] text-white/65 hover:text-white hover:bg-white/[0.07] transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : link.label === 'Programme' ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 rounded-xl text-[12.5px] 2xl:text-[13px] font-medium text-white/40 hover:text-white/60 transition-all duration-300 whitespace-nowrap"
                  >
                    {link.icon}
                    {link.label === 'Programme' ? 'Program' : link.label}
                    <span className="text-[9px] bg-amber-500 text-[#2b1700] px-1 py-0.5 rounded-sm font-bold tracking-wider ml-1 leading-none shadow-sm shadow-amber-500/20">TBA</span>
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 ${getClasses()} text-[12.5px] 2xl:text-[13px] font-medium transition-all duration-300 whitespace-nowrap`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button + Hamburger */}
              <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-2 xl:ml-3">
              {isRegistered ? (
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500/90 hover:bg-red-500 text-white text-[12px] font-bold tracking-wide transition-all shadow-lg hover:shadow-red-500/30"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/registration"
                  className="hidden sm:inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full text-[12px] font-bold transition-all shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] text-[#021024] whitespace-nowrap"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #2dd4bf)' }}
                >
                  Register Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}

              <button
                className="xl:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div
              className="xl:hidden mt-2 py-4 space-y-1 bg-[#050f20] border-t border-white/10 shadow-2xl rounded-b-xl absolute left-0 right-0 w-full"
            >
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div className="px-5 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
                      <span className="text-sm">{link.icon}</span>
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block pl-11 pr-5 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors mx-2"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : link.label === 'Programme' ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-5 py-3 rounded-lg text-sm text-white/50 mx-2"
                  >
                    <span className="flex items-center gap-2.5">
                      {link.icon}
                      {link.label}
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">TBA</span>
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-medium transition-colors mx-2 ${
                      isActive(link.href)
                        ? 'text-teal-400 bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 px-5">
                {isRegistered ? (
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="block w-full text-center px-4 py-3 rounded-full bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/registration"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-[#021024] text-sm font-bold transition-colors"
                    style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #2dd4bf)' }}
                  >
                    Register Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
