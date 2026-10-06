'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Themes', href: '/themes' },
  { label: 'Publication', href: '/publication' },
  {
    label: 'For Authors',
    href: '/for-authors',
    children: [
      { label: 'Call for Papers', href: '/for-authors#call-for-papers' },
      { label: 'Important Dates', href: '/important-dates' },
      { label: 'Downloads', href: '/for-authors#downloads' },
    ],
  },
  { label: 'Committees', href: '/committees' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Registration', href: '/registration' },
  { label: 'Venue & Contact', href: '/venue-contact' },
  { label: 'Programme', href: '/programme' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    
    // Check registration status
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050d1f] shadow-2xl' : 'bg-[#050d1f]/95 backdrop-blur-md'
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-white/5">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 xl:px-12 flex items-center justify-between py-2.5">
          <span className="text-teal-400 text-[11px] md:text-xs font-medium tracking-wide">
            16–17 September 2027 | Hybrid Mode | Moodbidri, Karnataka, India
          </span>
          <span className="text-white/50 text-xs hidden md:block">aiet.org.in/icmems2027</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 xl:px-12" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0 mr-2 xl:mr-6">
            <img src="/alvaslogo.png" alt="AIET Logo" className="h-10 sm:h-12 xl:h-14 w-auto object-contain rounded transition-all duration-300" />
            <div className="hidden sm:block">
              <div className="text-white font-bold text-sm tracking-wide leading-tight group-hover:text-teal-400 transition-colors">IC-MEMS 2027</div>
              <div className="text-white/50 text-[11px] font-medium tracking-wider mt-0.5 leading-tight">AIET, Moodbidri</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0.5 2xl:gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-teal-400 bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-[#0a192f] border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.label === 'Programme' ? (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium tracking-wide text-white/50 hover:text-white/70 transition-all duration-300"
                  >
                    {link.label}
                    <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full font-semibold">TBA</span>
                  </Link>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                    isActive(link.href)
                      ? 'text-teal-400 bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            {isRegistered ? (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white text-[13px] font-bold tracking-wide transition-all shadow-md hover:shadow-red-500/25"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/registration"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-teal-500/90 hover:bg-teal-400 text-white text-[13px] font-bold tracking-wide transition-all shadow-md hover:shadow-teal-500/25"
              >
                Register
              </Link>
            )}
            <button
              className="xl:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
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

        {/* Mobile menu */}
        {isOpen && (
          <div className="xl:hidden border-t border-white/10 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-4 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">{link.label}</div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setIsOpen(false)}
                      className="block pl-8 pr-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-white/50"
                >
                  {link.label}
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">TBA</span>
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-teal-400 bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2 px-4">
              {isRegistered ? (
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="block w-full text-center px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/registration"
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold transition-colors"
                >
                  Register Now
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
