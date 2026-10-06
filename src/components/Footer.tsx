import Link from 'next/link';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Themes', href: '/themes' },
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
    <footer className="bg-[#050d1f] text-white border-t border-white/10">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 xl:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 pr-0 lg:pr-10">
            <div className="flex items-center gap-4 mb-6">
              <img src="/alvaslogo.png" alt="AIET Logo" className="h-25 sm:h-25 w-auto object-contain rounded" />
              <div>
                <div className="font-bold text-xl leading-tight">IC-MEMS 2027</div>
                <div className="text-white/50 text-sm font-medium tracking-wide mt-1">AIET, Moodbidri</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-xs">
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
                href="tel:+919611945201"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-teal-400 transition-colors group"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 96119 45201
              </a>
              <a
                href="https://wa.me/919892818760"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-teal-400 transition-colors group"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.098.548 4.07 1.504 5.782L.057 23.5 6 22.01A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.012-1.374l-.36-.214-3.727.988 1.003-3.67-.234-.374A9.821 9.821 0 012.182 12C2.182 6.551 6.551 2.182 12 2.182S21.818 6.551 21.818 12 17.449 21.818 12 21.818z" />
                </svg>
                WhatsApp: +91 98928 18760
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white/40 text-xs">16–17 September 2027</p>
              <p className="text-white/40 text-xs mt-0.5">Hybrid Mode</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 xl:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
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
