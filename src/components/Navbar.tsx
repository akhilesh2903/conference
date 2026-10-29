'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface SubLink {
  label: string;
  href: string;
  desc?: string;
  icon?: React.ReactNode;
}

interface NavLinkItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: SubLink[];
}

const navLinks: NavLinkItem[] = [
  { 
    label: 'About', 
    href: '/about', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    children: [
      { 
        label: 'About Conference', 
        href: '/about',
        desc: 'Scope, objectives & themes',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
          </svg>
        )
      },
      { 
        label: 'About AIET', 
        href: '/about#aiet',
        desc: "Alva's Institute & campus",
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
          </svg>
        )
      },
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
      { 
        label: 'Publication Info', 
        href: '/publication',
        desc: 'Scopus indexed proceedings',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        )
      },
      { 
        label: 'Review Process', 
        href: '/publication#review',
        desc: 'Peer review & ethics policy',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
    ]
  },
  {
    label: 'For Authors',
    href: '/for-authors',
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.14l-2.81.936.935-2.81a4.5 4.5 0 011.14-1.89l12.656-12.657zm0 0L19.5 7.125" /></svg>,
    children: [
      { 
        label: 'Submit Abstract', 
        href: '/for-authors#submission',
        desc: 'Online abstract text entry',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
          </svg>
        )
      },
      { 
        label: 'Call for Papers', 
        href: '/for-authors#call-for-papers',
        desc: 'Scope & submission criteria',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        )
      },
      { 
        label: 'Important Dates', 
        href: '/important-dates',
        desc: 'Deadlines & timelines',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        )
      },
      { 
        label: 'Downloads', 
        href: '/for-authors#downloads',
        desc: 'Templates & brochure',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        )
      },
    ],
  },
  { 
    label: 'Committees', 
    href: '/committees', 
    icon: <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    children: [
      { 
        label: 'Leadership', 
        href: '/committees#leadership',
        desc: 'Patrons & conference chairs',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        )
      },
      { 
        label: 'Advisory Board', 
        href: '/committees#international',
        desc: 'International & national experts',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.999-3.199a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        )
      },
      { 
        label: 'Organising Committee', 
        href: '/committees#organising',
        desc: 'Host institution execution team',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
        )
      },
      { 
        label: 'Editorial Board', 
        href: '/committees#editorial',
        desc: 'Technical program committee',
        icon: (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        )
      },
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
  const [authorName, setAuthorName] = useState('');
  const pathname = usePathname();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 90);
  };

  const handleLinkClick = (href: string, e?: React.MouseEvent) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(null);
    setIsOpen(false);

    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const isSamePath = pathname === path || (path === '' && (pathname === '/committees' || pathname === '/for-authors' || pathname === '/about' || pathname === '/publication'));
      if (isSamePath) {
        if (e) e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    }
  };

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    
    const checkAuth = () => {
      const cmt = localStorage.getItem('cmtUser');
      const reg = localStorage.getItem('isRegistered') === 'true';
      const logged = localStorage.getItem('isLoggedIn') === 'true';
      setIsRegistered(reg || logged || !!cmt);
      if (cmt) {
        try {
          const parsed = JSON.parse(cmt);
          const name = parsed.firstName ? `${parsed.firstName} ${parsed.lastName || ''}`.trim() : (parsed.email || 'Author');
          setAuthorName(name);
        } catch {
          setAuthorName(localStorage.getItem('registeredName') || 'Author');
        }
      } else if (localStorage.getItem('registeredName')) {
        setAuthorName(localStorage.getItem('registeredName') || 'Author');
      } else {
        setAuthorName('');
      }
    };
    checkAuth();
    window.addEventListener('registrationStatusChanged', checkAuth);
    window.addEventListener('authStatusChanged', checkAuth);

    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('registrationStatusChanged', checkAuth);
      window.removeEventListener('authStatusChanged', checkAuth);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('registeredName');
    localStorage.removeItem('cmtUser');
    localStorage.removeItem('isLoggedIn');
    window.dispatchEvent(new Event('registrationStatusChanged'));
    window.dispatchEvent(new Event('authStatusChanged'));
    setIsRegistered(false);
    setAuthorName('');
  };

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transform-gpu" style={{ transform: 'translateZ(0)' }}>
      {/* ─── Top Info Bar ─── */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out border-b border-slate-200/80 bg-[#f8fafc]/90 backdrop-blur-md ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-[46px] opacity-100'
        }`}
      >
        <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 lg:px-6 flex items-center justify-between py-2">
          {/* Left: date + location */}
          <div className="flex items-center gap-4 text-[11px] md:text-[12px]">
            <span className="flex items-center gap-1.5 text-teal-700 font-semibold">
              <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              16–18 September 2027
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-600 border-l border-slate-300 pl-4">
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Hybrid Mode | Moodbidri, Karnataka, India
            </span>
          </div>

          {/* Right: social + url */}
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-3">
              <a href="mailto:icmems2027@gmail.com" className="text-slate-500 hover:text-slate-900 transition-colors" title="Email">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors" title="LinkedIn">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors" title="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
            <span className="text-slate-600 text-[11px] md:text-[12px] hidden md:block border-l border-slate-300 pl-4 tracking-wide font-medium">
              aiet.org.in/icmems2027
            </span>
          </div>
        </div>
      </div>

      {/* ─── Main Navigation Bar ─── */}
      <nav
        className={`relative transition-all duration-300 w-full overflow-visible bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-[inset_0_-20px_36px_-10px_rgba(0,0,0,0.13),0_4px_14px_rgba(0,0,0,0.06)]`}
        aria-label="Main navigation"
      >
        {/* Upward Shadow & Glow Gradient moving upwards throughout the navbar */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/[0.09] via-slate-900/[0.02] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-500/[0.12] via-teal-500/[0.02] to-transparent pointer-events-none" />
        
        {/* Horizontal bottom highlight line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-85 shadow-[0_0_12px_rgba(45,212,191,0.8)] pointer-events-none" />

        <div className="w-full mx-auto px-4 lg:px-6 relative z-10 2xl:max-w-none">
          <div className="flex items-center justify-between h-[60px] xl:h-[72px]">
            
            {/* Logo + Branding */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 mr-1 xl:mr-3">
              <img
                src="/alvas-org-logo.png"
                alt="Alva's Education Foundation Logo"
                className="h-9 sm:h-10 xl:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
              <div className="border-l border-slate-300 pl-2.5">
                <div className="flex items-center gap-1 font-bold text-[13px] sm:text-[14px] xl:text-[15px] tracking-tight leading-none group-hover:text-teal-700 transition-colors">
                  <span className="text-slate-900">IC-MEMS</span>
                  <span className="text-teal-600 font-extrabold">2027</span>
                </div>
                <div className="hidden min-[420px]:block text-slate-500 text-[10px] xl:text-[11px] font-medium tracking-wide mt-1 leading-none">
                  AIET, Moodbidri
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden xl:flex items-center gap-0 2xl:gap-1 justify-center flex-1">
              {navLinks.map((link) => {
                const getClasses = () => {
                  if (isActive(link.href)) {
                    return 'bg-slate-100 text-teal-700 font-semibold rounded-xl border border-slate-200/80 shadow-sm';
                  }
                  return 'text-slate-800 hover:text-black hover:bg-slate-100/80 rounded-xl';
                };

                return link.children ? (
                  <div
                    key={link.label}
                    className="relative group py-1.5"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      className={`flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 ${getClasses()} text-[12.5px] 2xl:text-[13px] font-medium transition-colors duration-150 whitespace-nowrap group-hover:text-teal-700`}
                    >
                      {link.icon}
                      {link.label}
                      <svg
                        className={`w-3 h-3 ml-0.5 text-slate-400 transition-transform duration-200 ease-out ${
                          activeDropdown === link.label ? 'rotate-180 text-teal-600' : 'group-hover:rotate-180 group-hover:text-teal-600'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Ultra-Smooth Dropdown Container */}
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          key={`paper-dropdown-${link.label}`}
                          initial={{ opacity: 0, y: 4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 2, scale: 0.98, transition: { duration: 0.1, ease: 'easeOut' } }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 pt-1.5 w-[285px] z-50 pointer-events-auto transform-gpu"
                          onMouseEnter={() => handleMouseEnter(link.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {/* Continuous Safety hit bridge */}
                          <div className="absolute -top-2 left-0 right-0 h-3" />

                          {/* Paper Card */}
                          <div className="paper-card rounded-2xl p-2.5 border border-slate-200/90 relative overflow-hidden bg-white shadow-xl">
                            {/* Paper Top Roll Rim / Curl Accent */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-teal-500/30 via-teal-400 to-teal-500/30 rounded-t-xl mb-2 paper-curl-top" />

                            {/* Subtabs with Box and Underline one after the other */}
                            <div className="flex flex-col">
                              {link.children.map((child, idx) => (
                                <React.Fragment key={child.href}>
                                  {/* Boxed Subtab */}
                                  <Link
                                    href={child.href}
                                    onClick={(e) => handleLinkClick(child.href, e)}
                                    className="group/item relative flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-teal-400 hover:shadow-[0_4px_14px_rgba(13,148,136,0.12)] transition-all duration-150 overflow-hidden"
                                  >
                                    {/* Left icon inside mini box */}
                                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-teal-600 group-hover/item:bg-teal-600 group-hover/item:text-white group-hover/item:border-teal-600 transition-all duration-150 shrink-0 shadow-2xs">
                                      {child.icon}
                                    </div>

                                    {/* Text content */}
                                    <div className="flex-1 min-w-0 text-left">
                                      <div className="text-[12.5px] font-semibold text-slate-800 group-hover/item:text-teal-900 transition-colors leading-tight">
                                        {child.label}
                                      </div>
                                      {child.desc && (
                                        <div className="text-[10.5px] text-slate-500 group-hover/item:text-slate-600 transition-colors truncate mt-0.5">
                                          {child.desc}
                                        </div>
                                      )}
                                    </div>

                                    {/* Micro Arrow Indicator */}
                                    <svg
                                      className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-teal-600 group-hover/item:translate-x-0.5 transition-all duration-150 shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>

                                    {/* Animated Underline highlight inside each box */}
                                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-teal-500 to-teal-300 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-150 origin-left rounded-full" />
                                  </Link>

                                  {/* Underline separator one after the other */}
                                  {idx < (link.children?.length ?? 0) - 1 && (
                                    <div className="py-1 px-2 flex items-center justify-center">
                                      <div className="h-[1px] w-full subtab-underline" />
                                    </div>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>

                            {/* Paper Bottom Curled Hem */}
                            <div className="mt-1.5 pt-0.5 flex justify-center">
                              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-slate-300/80 to-transparent rounded-full" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : link.label === 'Programme' ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1 px-2.5 2xl:px-3 py-1.5 rounded-xl text-[12.5px] 2xl:text-[13px] font-medium text-slate-600 hover:text-black hover:bg-slate-100/80 transition-all duration-300 whitespace-nowrap"
                  >
                    {link.icon}
                    {link.label === 'Programme' ? 'Program' : link.label}
                    <span className="text-[9px] bg-amber-500 text-white px-1 py-0.5 rounded-sm font-bold tracking-wider ml-1 leading-none shadow-sm">TBA</span>
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
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11.5px] font-medium shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="max-w-[120px] truncate" title={authorName || 'Author'}>{authorName || 'Author'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11.5px] font-semibold transition-all shadow-2xs"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50/80 border border-slate-300 transition-all shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    Author Sign In
                  </Link>
                  <Link
                    href="/registration"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[12px] font-bold transition-all shadow-md hover:shadow-lg text-white whitespace-nowrap bg-teal-600 hover:bg-teal-500"
                  >
                    Register Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}

              <button
                className="xl:hidden p-2 rounded-lg text-slate-800 hover:text-black hover:bg-slate-100 transition-colors ml-2"
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
              className="xl:hidden mt-2 py-4 space-y-1 bg-white border-t border-b border-slate-200 shadow-2xl rounded-b-2xl absolute left-0 right-0 w-full max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain pb-6 z-50 text-slate-800"
            >
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="mx-2 mb-2 p-2 bg-slate-50/70 rounded-2xl border border-slate-200/80">
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      className="px-2 py-1.5 text-xs font-bold text-teal-800 hover:text-teal-900 uppercase tracking-wider flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{link.icon}</span>
                        {link.label}
                      </span>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        View Page &rarr;
                      </span>
                    </Link>
                    <div className="mt-1 flex flex-col">
                      {link.children.map((child, idx) => (
                        <React.Fragment key={child.href}>
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={(e) => handleLinkClick(child.href, e)}
                            className="group/mob relative flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200/90 bg-white hover:border-teal-400 hover:shadow-2xs transition-colors"
                          >
                            <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                              {child.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-semibold text-slate-800 leading-tight">
                                {child.label}
                              </div>
                              {child.desc && (
                                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                  {child.desc}
                                </div>
                              )}
                            </div>
                            <svg className="w-3.5 h-3.5 text-slate-400 group-hover/mob:text-teal-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          {idx < (link.children?.length ?? 0) - 1 && (
                            <div className="py-1 px-2 flex items-center justify-center">
                              <div className="h-[1px] w-full subtab-underline" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ) : link.label === 'Programme' ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-5 py-3 rounded-lg text-sm text-slate-600 hover:bg-slate-100 mx-2"
                  >
                    <span className="flex items-center gap-2.5">
                      {link.icon}
                      {link.label}
                    </span>
                    <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">TBA</span>
                  </Link>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-medium transition-colors mx-2 ${
                      isActive(link.href)
                        ? 'text-teal-700 bg-teal-50 font-semibold'
                        : 'text-slate-800 hover:text-black hover:bg-slate-100'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 px-5 space-y-2">
                {isRegistered ? (
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2 text-xs font-semibold text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Logged in: {authorName || 'Author'}
                    </div>
                    <button
                      onClick={() => { setIsOpen(false); handleLogout(); }}
                      className="block w-full text-center px-4 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors shadow-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-teal-800 text-sm font-semibold border border-teal-300 hover:bg-teal-50 transition-colors"
                    >
                      <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                      Author Sign In
                    </Link>
                    <Link
                      href="/registration"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-white text-sm font-bold transition-colors bg-teal-600 hover:bg-teal-500 shadow-md"
                    >
                      Register Now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
