import Link from 'next/link';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Tracks', href: '/tracks' },
  { label: 'Publication', href: '/publication' },
  { label: 'For Authors', href: '/for-authors' },
  { label: 'Committees', href: '/committees' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Registration', href: '/registration' },
  { label: 'Venue & Contact', href: '/venue-contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#050d1f] text-white border-t border-white/10 mt-12 sm:mt-20 lg:mt-24">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 xl:px-12 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 pr-0 lg:pr-10">
            <div className="flex items-center gap-4 mb-6">
              <img src="/alvaslogo.png" alt="AIET Logo" className="h-25 sm:h-25 w-auto object-contain rounded" />
              <div>
                <div className="font-bold text-xl leading-tight">IC-MEMS 2027</div>
                <div className="text-white/50 text-sm font-medium tracking-wide mt-1">AIET, Moodbidri</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-full lg:max-w-2xl">
              International Conference on Materials, Energy and Management for Sustainability
            </p>
            <p className="text-white/50 text-sm mb-1">
              <span className="text-teal-400 font-medium">Organised by:</span> Alva&rsquo;s Institute of Engineering and Technology
            </p>
            <p className="text-white/50 text-sm">
              Shobhavana Campus, Mijar, Moodbidri – 574225<br />
              Dakshina Kannada, Karnataka, India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-teal-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:icmems2027@gmail.com"
                className="flex items-start gap-3 text-sm text-white/60 hover:text-teal-400 transition-colors group"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                icmems2027@gmail.com
              </a>
              <a
                href="tel:+918904142098"
                className="flex items-start gap-3 text-sm text-white/60 hover:text-teal-400 transition-colors group"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col gap-1">
                  <span>+91 89041 42098</span>
                  <span>+91 96119 45201</span>
                  <span>+91 98928 18760</span>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/40 text-xs">16 to 18 September 2027</p>
              <p className="text-white/40 text-xs mt-0.5">Hybrid Mode</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 xl:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            &copy; {currentYear} IC-MEMS 2027 | Alva&rsquo;s Institute of Engineering and Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-white/40 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 hover:text-white/60 text-xs transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
