import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      aria-label="Conference Hero"
    >
      {/* Background Campus Image Layer with Academic Navy Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Alvas.jpg')" }}
        />
        {/* Deep navy gradient overlay for academic prestige and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030a17]/95 via-[#051426]/90 to-[#030c1c]/95" />
      </div>

      <div className="container-custom relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-24 w-full">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          {/* Institution Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-950/60 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="text-teal-300 text-xs sm:text-sm font-semibold tracking-wide">
              Alva&rsquo;s Institute of Engineering and Technology, Moodbidri
            </span>
          </div>

          {/* Conference Acronym */}
          <div className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 leading-none">
            IC-MEMS <span className="text-teal-400 font-black">2027</span>
          </div>

          {/* Full Official Title (Single Line) */}
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-slate-100 w-full max-w-full mx-auto leading-normal mb-8 tracking-tight whitespace-normal md:whitespace-nowrap">
            International Conference on{' '}
            <span className="text-white font-bold border-b border-teal-400/50 pb-0.5">Materials, Energy</span>{' '}
            and{' '}
            <span className="text-white font-bold border-b border-teal-400/50 pb-0.5">Management for Sustainability</span>
          </h1>

          {/* Conference Key Meta Bar (Dates, Venue, Mode, Indexing) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-4xl mb-10 text-left">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0 text-teal-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-teal-300/90">Dates</div>
                <div className="text-xs sm:text-sm font-bold text-white">16–18 Sept 2027</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 text-blue-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-300/90">Venue</div>
                <div className="text-xs sm:text-sm font-bold text-white">Moodbidri, India</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300/90">Format</div>
                <div className="text-xs sm:text-sm font-bold text-white">Hybrid Mode</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300/90">Proceedings</div>
                <div className="text-xs sm:text-sm font-bold text-white">Scopus Indexed</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/registration"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Register for Conference
            </Link>

            <Link
              href="/for-authors#call-for-papers"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <svg className="w-4 h-4 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Call for Papers
            </Link>

            <Link
              href="#dates"
              className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-colors"
            >
              View Deadlines &rarr;
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#030a17]/80 backdrop-blur-md py-3 text-center text-xs text-slate-400">
        <div className="container-custom flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            Organized by Alva&rsquo;s Institute of Engineering and Technology (AIET)
          </span>
          <span className="hidden md:inline text-white/30">&bull;</span>
          <span>Shobhavana Campus, Mijar, Moodbidri, Karnataka</span>
          <span className="hidden md:inline text-white/30">&bull;</span>
          <span className="text-teal-300">Abstract Deadline: 16 June 2027</span>
        </div>
      </div>
    </section>
  );
}
