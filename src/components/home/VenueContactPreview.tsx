import Link from 'next/link';

export default function VenueContactPreview() {
  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-200" aria-label="Venue and Secretariat Contact">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left 6 Columns: Venue & Travel Accessibility */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-4">
                Conference Venue
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight mb-2">
                Alva&rsquo;s Institute of Engineering &amp; Technology
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Shobhavana Campus, Mijar, Moodbidri – 574225, Dakshina Kannada, Karnataka, India
              </p>

              {/* Transit Details */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/80 text-teal-800 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0a192f]">Mangaluru International Airport (IXE)</div>
                    <div className="text-xs text-slate-500">24 km from campus (~35 mins via NH 169)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-800 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0a192f]">Railway Stations</div>
                    <div className="text-xs text-slate-500">Surathkal (28 km) &bull; Mangaluru Central / Junction (34 km)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0a192f]">Road &amp; Transit</div>
                    <div className="text-xs text-slate-500">Regular express bus services from Mangaluru to Moodbidri</div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/venue-contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-teal-500 hover:text-teal-700 bg-white text-slate-700 text-xs sm:text-sm font-semibold transition-colors shadow-xs w-fit"
            >
              View Maps, Travel &amp; Accommodation Guide
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right 6 Columns: Conference Secretariat & Organizing Office */}
          <div className="lg:col-span-6 bg-[#050d1f] rounded-3xl p-8 md:p-10 text-white flex flex-col justify-between shadow-lg">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 border border-white/15 text-xs font-semibold uppercase tracking-wider mb-4">
                Conference Secretariat
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Contact &amp; Assistance
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Have questions regarding abstract submission, track scope, or delegate registration? Reach out to the organizing team.
              </p>

              <div className="space-y-4 mb-8">
                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Official Correspondence</div>
                    <a href="mailto:icmems2027@gmail.com" className="text-sm font-semibold text-white hover:text-teal-300 transition-colors">
                      icmems2027@gmail.com
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Secretariat Helplines</div>
                    <div className="text-sm font-semibold text-white flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                      <a href="tel:+919611945201" className="hover:text-teal-300 transition-colors">+91 96119 45201</a>
                      <span className="text-white/30">&bull;</span>
                      <a href="tel:+918904142098" className="hover:text-teal-300 transition-colors">+91 89041 42098</a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.098.548 4.07 1.504 5.782L.057 23.5 6 22.01A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.82 9.82 0 01-5.012-1.374l-.36-.214-3.727.988 1.003-3.67-.234-.374A9.821 9.821 0 012.182 12C2.182 6.551 6.551 2.182 12 2.182S21.818 6.551 21.818 12 17.449 21.818 12 21.818z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Delegate WhatsApp Desk</div>
                    <a href="https://wa.me/919892818760" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors">
                      +91 98928 18760 (Click to Chat)
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between border-t border-white/10">
              <span>Office Hours: 9:00 AM – 5:00 PM IST</span>
              <span className="text-teal-300">AIET Campus, Mijar</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
